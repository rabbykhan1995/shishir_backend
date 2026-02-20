import express from "express";
import { validate } from "../middlewares/validation.middleware";
// import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";
import { ProductController } from "../controllers/product.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .post(
    "/create",
    authMiddleware,
    adminMiddleware,
    validate(createProductSchema),
    asyncHandler(ProductController.create),
  )
  .put(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateProductSchema),
    asyncHandler(ProductController.update),
  )
  .get("/list", asyncHandler(ProductController.list))
  .get("/productBySlug/:slug", asyncHandler(ProductController.productBySlug));

export default router;
