import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use the credentials you just verified in MongoDB Atlas
    await mongoose.connect('mongodb+srv://sanjai:hWeBcfp1cK5U7aMs@cluster0.9xjdejg.mongodb.net/CLOUD_KITCHEN_PROJECT');
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};