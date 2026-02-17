import express from "express";
import { validate } from "../middlewares/validation.middleware.ts";
// import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { ProductController } from "../controllers/product.controller";

const router = express.Router();

router
  .post(
    "/create",
    validate(createProductSchema),
    asyncHandler(ProductController.create),
  )
  .put(
    "/update/:id",
    validate(updateProductSchema),
    asyncHandler(ProductController.update),
  )
  .get("/list", asyncHandler(ProductController.list))
  .get("/productBySlug/:slug", asyncHandler(ProductController.productBySlug));

export default router;
