import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ['beverage', 'snack', 'meal', 'dessert'],
      default: 'snack',
    },
    availability: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Food', foodSchema);
