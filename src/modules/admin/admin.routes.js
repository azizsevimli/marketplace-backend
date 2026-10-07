import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddlewares from "../../middlewares/role.middleware.js";
import adminController from "./admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getDashboardStats,
);

export default router;
