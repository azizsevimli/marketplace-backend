import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddlewares from "../../middlewares/role.middleware.js";
import productController from "./product.controller.js";

const router = express.Router();

router.get("/store", productController.getProductsByStoreId);
router.get("/:id", productController.getProductsById);

router.post(
  "/",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  productController.createProduct,
);

router.patch(
  "/detail/:id",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  productController.updateProductDetail,
);

router.patch(
  "/stock/:id",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  productController.updateProductStock,
);

router.patch(
  "/price/:id",
  authMiddleware,
  roleMiddlewares.vendorMiddleware,
  productController.updateProductPrice,
);

export default router;
