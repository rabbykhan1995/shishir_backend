import express from "express";
import { validate } from "../middlewares/validation.middleware.ts";
// import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator.ts";
import { BlogController } from "../controllers/blog.controller.ts";

const router = express.Router();

router
  .post(
    "/create",
    validate(createBlogSchema),
    asyncHandler(BlogController.create),
  )
  .put(
    "/update/:id",
    validate(updateBlogSchema),
    asyncHandler(BlogController.update),
  )
  .get("/list", asyncHandler(BlogController.list))
  .get("/blogBySlug/:slug", asyncHandler(BlogController.blogBySlug));

export default router;
