import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import cartItemController from "./cartItem.controller.js";

const router = express.Router();

router.get("/:cartId", authMiddleware, cartItemController.getCartItemsByCartId);

router.post("/", authMiddleware, cartItemController.createCartItem);

router.patch("/:id", authMiddleware, cartItemController.updateCartItem);

router.delete("/:id", authMiddleware, cartItemController.deleteCartItem);

export default router;
