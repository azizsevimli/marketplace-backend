import express from "express";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/store/store.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} üzeinde aktif`);
});
