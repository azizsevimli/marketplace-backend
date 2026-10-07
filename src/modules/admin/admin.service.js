//import Pool from "../../db/pool.js";
import orderService from "../order/order.service.js";
import productService from "../product/product.service.js";
import userService from "../user/user.service.js";

async function getDashboardStats() {
  const [userStats, productStats, orderStats] = await Promise.all([
    userService.getUserStats(),
    productService.getProductStats(),
    orderService.getOrderStats(),
  ]);

  return { users: userStats, products: productStats, orders: orderStats };
}

export default { getDashboardStats };
