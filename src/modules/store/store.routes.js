import express from "express";

import controller from "./store.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddlewares from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/register",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  controller.createStore,
);

router.get(
  "/my/:id",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  controller.getMyStore,
);

router.patch(
  "/my/update",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  controller.updateMyStore,
);

export default router;
