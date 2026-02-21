import express from "express";
import { TrainingController } from "../controllers/training.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createTrainingSchema,
  updateTrainingSchema,
} from "../validators/training.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  validate(createTrainingSchema),
  asyncHandler(TrainingController.create),
);

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateTrainingSchema),
  asyncHandler(TrainingController.update),
);

router.get("/list", asyncHandler(TrainingController.list));
router.get(
  "/trainingBySlug/:slug",
  asyncHandler(TrainingController.trainingBySlug),
);

export default router;
