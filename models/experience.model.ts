import { Schema, model, Types } from "mongoose";

export interface ExperienceItem {
  name: string;
}

const experienceSchema = new Schema<ExperienceItem>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Experience = model<ExperienceItem>("Experience", experienceSchema);
