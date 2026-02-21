import mongoose, { Types } from "mongoose";
import { ITraining } from "../types/training.type";

const trainingSchema = new mongoose.Schema<ITraining>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      defualt: 0,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    shortDescription: {
      type: String,
    },

    thumbnail: {
      type: String,
      default: null,
    },

    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },

    levelID: {
      type: Types.ObjectId,
      ref: "Experience",
      required: true,
    },

    reviewers: {
      type: Number,
      default: 0,
    },

    averageReview: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
trainingSchema.index({ slug: 1 }, { unique: true });

const Training = mongoose.model<ITraining>("Training", trainingSchema);

export default Training;
