import Station from '../models/Station.js';
import Food from '../models/Food.js';

const ps5Stations = [
  {
    name: 'PS5 Station 01',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1709587796970-4e6bae1d4c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 02',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 03',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1709587797209-7f3015fc8d35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 04',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1664092815290-545fefded940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 05',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1611829713792-e1841cbe2cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 06',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1651954396816-7a7a59df322e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 07',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1659546565872-063edf45fd18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'PS5 Station 08',
    type: 'ps5',
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
    image: 'https://images.unsplash.com/photo-1709587797203-b28ef0e16e31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
];

const pcStations = [
  {
    name: 'Gaming PC 01',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1771014817844-327a14245bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'Gaming PC 02',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1771014846919-3a1cf73aeea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'Gaming PC 03',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1613442986373-af81e5c618d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'Gaming PC 04',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'Gaming PC 05',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1636036824578-d0d300a4effb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
  {
    name: 'Gaming PC 06',
    type: 'pc',
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
    image: 'https://images.unsplash.com/photo-1636036798069-195bd06f340c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available',
  },
];

const foodItems = [
  { name: 'Energy Drink', price: 100, category: 'beverage', description: 'Red Bull or similar energy drinks', quantity: 50 },
  { name: 'Cold Coffee', price: 80, category: 'beverage', description: 'Iced coffee for the gaming marathon', quantity: 40 },
  { name: 'Gaming Chips', price: 120, category: 'snack', description: 'Lay\'s or similar potato chips', quantity: 60 },
  { name: 'Popcorn', price: 100, category: 'snack', description: 'Buttered popcorn', quantity: 50 },
  { name: 'Burger', price: 300, category: 'meal', description: 'Cheese burger with fries', quantity: 30 },
  { name: 'Biryani', price: 350, category: 'meal', description: 'Chicken biryani', quantity: 25 },
  { name: 'Pizza Slice', price: 200, category: 'meal', description: 'Cheese pizza slice', quantity: 40 },
  { name: 'Ice Cream', price: 150, category: 'dessert', description: 'Vanilla or chocolate ice cream', quantity: 35 },
  { name: 'Brownie', price: 120, category: 'dessert', description: 'Chocolate brownie', quantity: 45 },
];

export async function seedDefaultData({ force = false } = {}) {
  const stationCount = await Station.countDocuments();
  const foodCount = await Food.countDocuments();

  if (!force && stationCount > 0 && foodCount > 0) {
    return { seeded: false, stations: stationCount, foods: foodCount };
  }

  if (force) {
    await Station.deleteMany({});
    await Food.deleteMany({});
  }

  const createdStations = await Station.insertMany([...ps5Stations, ...pcStations]);
  const createdFoods = await Food.insertMany(foodItems);

  return {
    seeded: true,
    stations: createdStations.length,
    foods: createdFoods.length,
  };
}
