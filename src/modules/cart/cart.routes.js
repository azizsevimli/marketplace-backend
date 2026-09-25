import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import cartController from "./cart.controller.js";

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);

router.post("/", authMiddleware, cartController.createCart);

router.patch("/", authMiddleware, cartController.updateCart);

export default router;
