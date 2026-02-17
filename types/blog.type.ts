import { Document } from "mongoose";
import z from "zod";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string | null;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBlogInput = z.infer<typeof createBlogSchema>;

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
