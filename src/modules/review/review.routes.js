import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import reviewController from "./review.controller.js";

const router = express.Router();

router.get("/product/:productId", reviewController.getReviewsByProductId);
router.get("/:id", authMiddleware, reviewController.getReview);
router.get("/", authMiddleware, reviewController.getReviewsByCustomerId);

router.post("/", authMiddleware, reviewController.createReview);

router.patch("/:id", authMiddleware, reviewController.updateReview);

router.delete("/:id", authMiddleware, reviewController.deleteReview);

export default router;
