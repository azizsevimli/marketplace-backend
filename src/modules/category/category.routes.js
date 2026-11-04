import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import categoryController from "./category.controller.js";

const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware.adminMiddleware,
  categoryController.createCategory,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware.adminMiddleware,
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware.adminMiddleware,
  categoryController.deleteCategory,
);

export default router;
