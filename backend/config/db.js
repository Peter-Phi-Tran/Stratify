import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connection = await mongoose.default.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error: ${error.message}');
        process.exit(1); // 1 means error exit, 0 means success
    }
}