import express from "express";
import { TrainingController } from "../controllers/training.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createLevelSchema,
  createTrainingSchema,
  updateTrainingSchema,
} from "../validators/training.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router
  .post(
    "/create",
    authMiddleware,
    adminMiddleware,
    validate(createTrainingSchema),
    asyncHandler(TrainingController.create),
  )
  .put(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateTrainingSchema),
    asyncHandler(TrainingController.update),
  )
  .get("/list", asyncHandler(TrainingController.list))
  .get("/trainingBySlug/:slug", asyncHandler(TrainingController.trainingBySlug))
  .post(
    "/create-level",
    authMiddleware,
    adminMiddleware,
    validate(createLevelSchema),
    asyncHandler(TrainingController.createLevel),
  )
  .put(
    "/update-level/:id",
    authMiddleware,
    adminMiddleware,
    validate(createLevelSchema),
    asyncHandler(TrainingController.updateLevel),
  )
  .get(
    "/level-list",
    authMiddleware,
    adminMiddleware,
    asyncHandler(TrainingController.levelList),
  )
  .delete(
    "/delete-level/:id",
    authMiddleware,
    adminMiddleware,
    asyncHandler(TrainingController.deleteLevel),
  );

export default router;
