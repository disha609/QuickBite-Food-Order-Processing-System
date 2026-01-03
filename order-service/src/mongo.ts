import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      // optional: modern connection options
    });
  } catch (error) {
    throw error; // so it’s caught in index.ts
  }
};

export default connectDB;
