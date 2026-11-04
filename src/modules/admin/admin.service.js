import bcrypt from "bcrypt";

import Pool from "../../db/pool.js";
import orderService from "../order/order.service.js";
import orderItemService from "../order_item/orderItem.service.js";
import productService from "../product/product.service.js";
import userService from "../user/user.service.js";
import catgeoryService from "../category/catgeory.service.js";
import storeService from "../store/store.service.js";

async function registerAdmin({ client, userId }) {
  const query = `INSERT INTO admins (user_id) VALUES ($1)`;
  const values = [userId];
  await client.query(query, values);
}

async function register({ firstName, lastName, email, phone, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const client = await Pool.connect();

  try {
    await client.query(`BEGIN`);
    const query = `
      INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [firstName, lastName, email, phone, hashedPassword, "ADMIN"];
    const result = await client.query(query, values);

    const userId = result.rows[0].id;

    await registerAdmin({ client, userId });

    await client.query(`COMMIT`);

    return userId;
  } catch (e) {
    console.log(e);
    await client.query(`ROLLBACK`);
    throw e;
  } finally {
    client.release;
  }
}

async function getDashboardStats() {
  const [userStats, productStats, orderStats] = await Promise.all([
    userService.getUserStats(),
    productService.getProductStats(),
    orderService.getOrderStats(),
  ]);

  return { users: userStats, products: productStats, orders: orderStats };
}

async function getAdmins() {
  const query = `
    SELECT id, first_name, last_name, email, phone, role, created_at 
    FROM users 
    WHERE role = 'ADMIN'
  `;
  const result = await Pool.query(query);

  const admins = result.rows;
  return admins;
}

async function getCustomers() {
  const customers = await userService.getCustomers();

  return customers;
}

async function getVendors() {
  const query = `
    SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.role, u.created_at, u.updated_at, v.status, v.rejected_message
    FROM users u
    LEFT JOIN vendors v ON v.user_id = u.id
    WHERE u.role = 'VENDOR'
  `;
  const result = await Pool.query(query);

  const vendors = result.rows;
  return vendors;
}

async function getVendorById({ id }) {
  const query = `
    SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.role, u.created_at, u.updated_at, v.status, v.rejected_message
    FROM users u
    LEFT JOIN vendors v ON v.user_id = u.id
    WHERE u.id = $1 
    LIMIT 1
  `;
  const values = [id];
  const result = await Pool.query(query, values);

  const vendor = result.rows[0];
  return vendor;
}

async function updateVendorStatus({ id, status, rejectedMessage = null }) {
  const query = `
    UPDATE vendors 
    SET status = $1, rejected_message = $2
    WHERE user_id = $3
  `;
  const values = [status, rejectedMessage, id];
  await Pool.query(query, values);
}

async function getCategoriesWithSub() {
  const categories = await catgeoryService.getCategoriesWithSub();

  return categories;
}

async function getStores() {
  const stores = await storeService.getStores();

  return stores;
}

async function getOrders() {
  const orders = await orderService.getOrders();

  return orders;
}

async function getOrderItemsByOrderId({ orderId }) {
  const orderItems = await orderItemService.getOrderItemsByOrderId({ orderId });

  return orderItems;
}

async function getProducts() {
  const products = await productService.getProducts();

  return products;
}

async function getProductsByStatus({ status }) {
  const products = await productService.getProductsByStatus({ status });

  return products;
}

async function getProductDetail({ id }) {
  const product = await productService.getProductById({ id });

  return product;
}

async function updateProductStatus({ id, status }) {
  const product = await productService.updateProductDetail({ id, status });

  return product;
}

export default {
  register,
  getDashboardStats,
  getAdmins,
  getCustomers,
  getVendors,
  getVendorById,
  updateVendorStatus,
  getCategoriesWithSub,
  getStores,
  getOrders,
  getOrderItemsByOrderId,
  getProducts,
  getProductsByStatus,
  getProductDetail,
  updateProductStatus,
};
