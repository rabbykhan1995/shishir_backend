import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error: any) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // exit process if DB connection fails
  }
};
