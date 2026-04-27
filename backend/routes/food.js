import express from 'express';
import Food from '../models/Food.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({ availability: true });
    res.json({ foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get food by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.find({ category, availability: true });
    res.json({ foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single food item
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json({ food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create food item (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, price, category, description, image, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const food = new Food({
      name,
      price,
      category,
      description,
      image,
      quantity: quantity || 100,
    });

    await food.save();
    res.status(201).json({ message: 'Food item created successfully', food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update food item (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, price, category, description, image, quantity, availability } = req.body;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        description,
        image,
        quantity,
        availability,
      },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item updated successfully', food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete food item (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
