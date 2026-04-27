import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || typeof mongoUri !== 'string') {
    console.error('MONGODB_URI is missing. Create backend/.env and set a valid MongoDB Atlas connection string.');
    process.exit(1);
  }

  if (mongoUri.includes('<db_password>')) {
    console.error('MONGODB_URI still contains <db_password>. Replace it with your actual MongoDB Atlas DB user password.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
