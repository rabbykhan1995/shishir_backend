import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  openID: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  email: z.string().email("Invalid email address").nullable().optional(),
  addresss: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().nonempty("Name cannot be empty").optional(),
  image: z.string().url().nullable().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  email: z.string().email("Invalid email address").nullable().optional(),
  addresss: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
});
