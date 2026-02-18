import express from "express";
import { validate } from "../middlewares/validation.middleware";
// import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import { updateCartSchema } from "../validators/cart.validator";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .post(
    "/create",
    validate(updateCartSchema),
    asyncHandler(ProductController.create),
  )
  .put(
    "/update/:id",
    validate(updateCartSchema),
    asyncHandler(ProductController.update),
  )
  .get("/list", asyncHandler(ProductController.list))
  .get(
    "/test",
    authMiddleware,
    asyncHandler((req: any, res: any) => res.json({ msg: "nice" })),
  );

export default router;
