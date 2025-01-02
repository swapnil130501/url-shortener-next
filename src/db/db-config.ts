import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/url-shortener';

export const connectToDatabase = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGO_URI);
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};