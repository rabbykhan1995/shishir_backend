import { Router } from "express";
import productRoute from "./product.route";
import blogRoute from "./blog.route";

const router = Router();
router.use("/product", productRoute);
router.use("/blog", blogRoute);
export default router;
