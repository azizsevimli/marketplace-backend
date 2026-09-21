import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import subcategoryController from "./subcategory.controller.js";

const router = express.Router();

router.get("/parent", subcategoryController.getSubcategoriesByParentId);
router.get("/:id", subcategoryController.getSubcategoryById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware.adminMiddleware,
  subcategoryController.createSubcategory,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware.adminMiddleware,
  subcategoryController.updateSubcategory,
);

export default router;
