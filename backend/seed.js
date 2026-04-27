import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { seedDefaultData } from './config/seedDefaults.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    const result = await seedDefaultData({ force: true });

    console.log('✅ Database seeded successfully!');
    console.log(`✅ Added ${result.stations} stations`);
    console.log(`✅ Added ${result.foods} food items`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
