import { Document, HydratedDocument, Types } from "mongoose";
import z from "zod";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator";

export interface IUser extends Document {
  name: string;
  openID?: string | null;
  address?: string | null;
  image?: string | null;
  admin: boolean;
  password?: string | null;
  email?: string | null;
  mobile?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = HydratedDocument<IUser>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type UserInToken = Pick<IUser, "name" | "email" | "mobile" | "admin"> & {
  _id: Types.ObjectId;
};
