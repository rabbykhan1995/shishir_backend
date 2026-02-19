import express from "express";
import { validate } from "../middlewares/validation.middleware";
// import { createProductSchema } from "../validators/product.validator";
import { asyncHandler } from "../utils/asyncHandler";
import { updateCartSchema } from "../validators/cart.validator";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .get("/google-auth-api", asyncHandler(UserController.getGoogleAuthAPI))
  .get(
    "/google-auth-callback",
    asyncHandler(UserController.googleAuthCallbackAPI),
  )
  .get(
    "/get-profile",
    authMiddleware,
    asyncHandler(UserController.getProfileData),
  );

export default router;
