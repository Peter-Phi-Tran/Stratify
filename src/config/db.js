import mongoose from 'mongoose';
import { config } from './environment.js';

export const connectDB = async () => {
    try {
        const connection = await mongoose.default.connect(mongoUri);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1 means error exit, 0 means success
    }
}