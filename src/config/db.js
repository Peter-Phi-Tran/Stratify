import mongoose from 'mongoose';
import { config } from './environment.js';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
