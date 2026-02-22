import mongoose, { Types } from "mongoose";
import { ILevel } from "../types/training.type";

const levelSchema = new mongoose.Schema<ILevel>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const Level = mongoose.model<ILevel>("Level", levelSchema);
export default Level;
