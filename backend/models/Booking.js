import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true, // Format: "HH:MM"
    },
    endTime: {
      type: String,
      required: true, // Format: "HH:MM"
    },
    duration: {
      type: Number,
      required: true, // Duration in hours
    },
    slots: [
      {
        type: String, // Time slot like "09:00"
      },
    ],
    stationType: {
      type: String,
      enum: ['ps5', 'pc'],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodItems: [
      {
        foodId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: Number,
      },
    ],
    foodTotal: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Common query patterns used by admin and user dashboards.
bookingSchema.index({ date: -1, createdAt: -1 });
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ station: 1, date: 1 });

export default mongoose.model('Booking', bookingSchema);
