import { Router } from "express";
import productRoute from "./product.route";
import blogRoute from "./blog.route";
import cartRoute from "./cart.route";

const router = Router();
router.use("/product", productRoute);
router.use("/blog", blogRoute);
router.use("/cart", cartRoute);
export default router;
