import express from 'express';
import Station from '../models/Station.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json({ stations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const stations = await Station.find({ type });
    res.json({ stations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single station
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('bookings');
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json({ station });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create station (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, type, price, specs, image, description, location } = req.body;

    if (!name || !type || !price) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const station = new Station({
      name,
      type,
      price,
      specs: specs || [],
      image,
      description,
      location,
    });

    await station.save();
    res.status(201).json({ message: 'Station created successfully', station });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update station (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, type, price, specs, image, status, description, location } = req.body;

    const station = await Station.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        price,
        specs,
        image,
        status,
        description,
        location,
      },
      { new: true, runValidators: true }
    );

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json({ message: 'Station updated successfully', station });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete station (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
