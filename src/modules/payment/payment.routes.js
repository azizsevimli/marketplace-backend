import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import paymentController from "./payment.controller.js";

const router = express.Router();

router.get("/:id", authMiddleware, paymentController.getPayment);

router.post("/", authMiddleware, paymentController.createPayment);

router.patch("/:id", authMiddleware, paymentController.updatePayment);

export default router;
