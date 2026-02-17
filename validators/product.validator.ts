import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  thumbnail: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  stock: z.number().optional(),
});

export const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  thumbnail: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  stock: z.number().optional(),
});
