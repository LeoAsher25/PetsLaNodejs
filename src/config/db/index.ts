import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost/PetsLa");
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log("Connect DB error: ", error);
  }
}
export default connectDB;
