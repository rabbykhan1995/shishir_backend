import mongoose, { Types } from "mongoose";
import { IBlog } from "../types/blog.type";

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, required: true, trim: true },

    description: {
      type: String,
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
  },
  {
    timestamps: true,
  },
);

blogSchema.index({ slug: 1 }, { unique: true });

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
