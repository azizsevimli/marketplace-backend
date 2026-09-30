import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import orderItemController from "./orderItem.controller.js";

const router = express.Router();

router.get(
  "/:orderId",
  authMiddleware,
  orderItemController.getOrderItemsByOrderId,
);

router.post("/", authMiddleware, orderItemController.createOrderItem);

router.patch("/:id", authMiddleware, orderItemController.updateOrderItem);

export default router;
