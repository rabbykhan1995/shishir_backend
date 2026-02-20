import express from "express";
import { BlogController } from "../controllers/blog.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  validate(createBlogSchema),
  asyncHandler(BlogController.create),
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateBlogSchema),
  asyncHandler(BlogController.update),
);

router.get("/list", asyncHandler(BlogController.list));
router.get("/blogBySlug/:slug", asyncHandler(BlogController.blogBySlug));

export default router;
