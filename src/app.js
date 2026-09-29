import express from "express";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/store/store.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import subcategoryRoutes from "./modules/subcategory/subcategory.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import favoriteRoutes from "./modules/favorite/favorite.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import cartItemRoutes from "./modules/cart_item/cartItem.routes.js";
import orderRoutes from "./modules/order/order.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart-item", cartItemRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzeinde aktif`);
});
