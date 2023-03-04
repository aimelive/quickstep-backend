import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGO_DB_URL!;

export async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log(`MongoDB connected ⭐️`);
  } catch (error) {
    console.log("Connecting DB failed: ", error);
  }
}
