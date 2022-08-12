import mongoose from "mongoose";
import { MongoClient } from "mongodb";

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://leoasher:leoasher2507@cluster0.fawanbe.mongodb.net/test");
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log("Connect DB error: ", error);
  }
}

export const mongoClient = new MongoClient("mongodb+srv://leoasher:leoasher2507@cluster0.fawanbe.mongodb.net/test");
export default connectDB;
