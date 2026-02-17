import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    openID: {
      type: String,
      unique: true,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },

    images: {
      type: [String],
      default: [],
    },

    password: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
    },

    mobile: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  },
);
userSchema.index(
  { mobile: 1 },
  {
    unique: true,
    partialFilterExpression: { mobile: { $type: "string" } },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
