import mongoose, { Types } from "mongoose";
import { ICart } from "../types/cart.type";

const cartSchema = new mongoose.Schema<ICart>(
  {
    itemID: {
      type: Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemSlug: {
      type: String,
      required: true,
    },

    itemTitle: {
      type: String,
    },

    thumbnail: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
    },
    stock: { type: Number },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.index({ userID: 1, itemID: 1 }, { unique: true });

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
