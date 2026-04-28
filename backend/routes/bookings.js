import express from 'express';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Station from '../models/Station.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get user's bookings
router.get('/user/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('station')
      .populate('user')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (Admin only)
router.get('/admin/all', auth, adminAuth, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const requestedLimit = parseInt(req.query.limit, 10) || 50;
    const limit = Math.min(Math.max(requestedLimit, 1), 200);
    const skip = (page - 1) * limit;

    const match = {};

    if (req.query.status) {
      match.status = req.query.status;
    }

    if (req.query.dateFrom || req.query.dateTo) {
      match.date = {};

      if (req.query.dateFrom) {
        match.date.$gte = new Date(req.query.dateFrom);
      }

      if (req.query.dateTo) {
        match.date.$lte = new Date(req.query.dateTo);
      }
    }

    const [bookings, totalBookings, statsAgg] = await Promise.all([
      Booking.find(match)
        .select('user station date startTime endTime duration stationType grandTotal status paymentStatus createdAt')
        .populate('station', 'name type status')
        .populate('user', 'username email')
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Booking.countDocuments(match),
      Booking.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            revenue: { $sum: '$grandTotal' },
            avgSession: { $avg: '$duration' },
            activeUsersSet: { $addToSet: '$user' },
          },
        },
        {
          $project: {
            _id: 0,
            revenue: 1,
            avgSession: { $ifNull: ['$avgSession', 0] },
            activeUsers: { $size: '$activeUsersSet' },
          },
        },
      ]),
    ]);

    const stats = statsAgg[0] || { revenue: 0, avgSession: 0, activeUsers: 0 };
    const totalPages = Math.max(Math.ceil(totalBookings / limit), 1);

    res.json({
      bookings,
      pagination: {
        page,
        limit,
        totalBookings,
        totalPages,
      },
      stats: {
        totalBookings,
        revenue: stats.revenue,
        avgSession: Number(stats.avgSession.toFixed(1)),
        activeUsers: stats.activeUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('station')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is owner or admin
    if (booking.user._id.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const {
      stationId,
      date,
      slots,
      stationType,
      pricePerHour,
      foodItems,
      foodTotal,
    } = req.body;

    // Validation
    if (!stationId || !date || !slots || slots.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if station exists
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Calculate duration and price
    const duration = slots.length;
    const totalPrice = duration * pricePerHour;
    const grandTotal = totalPrice + (foodTotal || 0);

    // Create booking
    const booking = new Booking({
      user: req.userId,
      station: stationId,
      date: new Date(date),
      startTime: slots[0],
      endTime: slots[slots.length - 1],
      duration,
      slots,
      stationType,
      pricePerHour,
      totalPrice,
      foodItems: foodItems || [],
      foodTotal: foodTotal || 0,
      grandTotal,
      status: 'pending',
    });

    await booking.save();

    // Add booking to user and station
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { bookings: booking._id } },
      { new: true }
    );

    await Station.findByIdAndUpdate(
      stationId,
      { $push: { bookings: booking._id } },
      { new: true }
    );

    const populatedBooking = await booking.populate(['station', 'user']);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (booking.user.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();
    const updatedBooking = await booking.populate(['station', 'user']);

    res.json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const updatedBooking = await booking.populate(['station', 'user']);

    res.json({ message: 'Booking cancelled successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Remove booking from user
    await User.findByIdAndUpdate(
      booking.user,
      { $pull: { bookings: booking._id } },
      { new: true }
    );

    // Remove booking from station
    await Station.findByIdAndUpdate(
      booking.station,
      { $pull: { bookings: booking._id } },
      { new: true }
    );

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available slots for a station on a specific date
router.get('/slots/:stationId/:date', async (req, res) => {
  try {
    const { stationId, date } = req.params;

    const bookings = await Booking.find({
      station: stationId,
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const bookedSlots = bookings.flatMap((b) => b.slots);

    const allSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
      '21:00', '22:00', '23:00',
    ];

    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    res.json({ availableSlots, bookedSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
