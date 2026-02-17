import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    itemID: {
      type: Types.ObjectId,
      ref: "Experience",
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

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
