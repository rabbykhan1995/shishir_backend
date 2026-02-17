import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

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

    price: {
      type: Number,
      defualt: 0,
      required: true,
    },
    stock: {
      type: Number,
      defualt: 0,
    },
    // total reviewrs number only
    reviewers: {
      type: Number,
      default: 0,
    },

    averageReview: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ slug: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
