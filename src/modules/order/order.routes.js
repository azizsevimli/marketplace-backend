import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import orderController from "./order.controller.js";

const router = express.Router();

router.get("/:id", authMiddleware, orderController.getOrder);
router.get("/my-orders", authMiddleware, orderController.getOrdersByCustomerId);

router.post("/", authMiddleware, orderController.createOrder);

router.patch("/:id", authMiddleware, orderController.updateOrder);

export default router;
