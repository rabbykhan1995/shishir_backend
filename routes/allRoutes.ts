import { Router } from "express";
import productRoute from "./product.route";
import blogRoute from "./blog.route";
import cartRoute from "./cart.route";
import userRoute from "./user.route";
import trainingRoute from "./training.route";

const router = Router();
router.use("/product", productRoute);
router.use("/blog", blogRoute);
router.use("/cart", cartRoute);
router.use("/user", userRoute);
router.use("/training", trainingRoute);

export default router;
