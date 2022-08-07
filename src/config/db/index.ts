import mongoose from "mongoose";
import { MongoClient } from "mongodb";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost/PetsLa");
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log("Connect DB error: ", error);
  }
}

export const mongoClient = new MongoClient("mongodb://localhost/PetsLa");
export default connectDB;
