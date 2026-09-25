import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import favoriteController from "./favorite.controller.js";

const router = express.Router();

router.get("/", authMiddleware, favoriteController.getFavorites);

router.post("/", authMiddleware, favoriteController.createFavorite);

router.delete("/", authMiddleware, favoriteController.deleteFavorite);

export default router;
