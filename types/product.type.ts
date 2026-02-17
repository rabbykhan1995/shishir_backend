import { Document } from "mongoose";
import z from "zod";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";

export interface IProduct extends Document {
  title: string;
  slug: string;
  rating: number;
  description?: string;
  shortDescription?: string;
  thumbnail?: string | null;
  images: string[];
  price: number;
  stock: number;
  reviewers: number;
  averageReview: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
