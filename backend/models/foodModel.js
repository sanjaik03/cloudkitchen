import mongoose from "mongoose";

// Define the schema properly
const foodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodsSchema);

export default foodModel;
