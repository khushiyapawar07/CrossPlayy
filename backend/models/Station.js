import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['ps5', 'pc'],
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'maintenance'],
      default: 'available',
    },
    price: {
      type: Number,
      required: true,
      default: 200,
    },
    specs: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Station', stationSchema);
