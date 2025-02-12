import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  prn: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  breakfast: { type: Number, required: true },
  lunch: { type: Number, required: true },
  dinner: { type: Number, required: true },
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);
