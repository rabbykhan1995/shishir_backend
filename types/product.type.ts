import { Document, HydratedDocument, Types } from "mongoose";
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

export type ProductResponse = HydratedDocument<IProduct>;

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type ProductListItem = Pick<
  IProduct,
  "title" | "slug" | "rating" | "thumbnail"
> & {
  _id: Types.ObjectId;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type ProductListResponse = PaginatedResponse<ProductListItem>;
