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

router.get(
  "/categories",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getCategoriesWithSub,
);

router.get(
  "/users/admins",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getAdmins,
);

router.get(
  "/users/customers",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getCustomers,
);

router.get(
  "/users/vendors",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getVendors,
);

router.get(
  "/stores",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getStores,
);

router.get(
  "/orders",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getOrders,
);

router.get(
  "/order-items/:orderId",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getOrderItemsByOrderId,
);

router.get(
  "/products",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getProductsByStatus,
);

router.get(
  "/products/:id",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getProductDetail,
);

router.get(
  "/users/vendors/:id",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.getVendorById,
);

router.post(
  "/users/admins/new",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.register,
);

router.post(
  "/users/vendors/:id",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.updateVendorStatus,
);

router.patch(
  "/products/:id",
  authMiddleware,
  roleMiddlewares.adminMiddleware,
  adminController.updateProductStatus,
);

export default router;
