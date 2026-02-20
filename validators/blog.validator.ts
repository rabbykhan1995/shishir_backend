import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  thumbnail: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
});
