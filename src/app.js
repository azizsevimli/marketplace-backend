import express from "express";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/store/store.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import subcategoryRoutes from "./modules/subcategory/subcategory.routes.js";

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

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzeinde aktif`);
});
