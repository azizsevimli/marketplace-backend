import Pool from "../../db/pool.js";

async function createOrder({ customerId, shippingAddress, totalPrice }) {
  const query = `INSERT INTO orders (customer_id, shipping_address, total_price) VALUES ($1, $2, $3) RETURNING *`;
  const values = [customerId, shippingAddress, totalPrice];
  const result = await Pool.query(query, values);

  const order = result.rows[0];
  return order;
}

async function getOrder({ id }) {
  const query = `SELECT * FROM orders WHERE id = $1 LIMIT 1`;
  const values = [id];
  const result = await Pool.query(query, values);

  const order = result.rows[0];
  return order;
}

async function getOrdersByCustomerId({ customerId }) {
  const query = `SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at desc`;
  const values = [customerId];
  const result = await Pool.query(query, values);

  const orders = result.rows;
  return orders;
}

async function updateOrder({ id, status }) {
  const query = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`;
  const values = [status, id];
  const result = await Pool.query(query, values);

  const order = result.rows[0];
  return order;
}

export default { createOrder, getOrder, getOrdersByCustomerId, updateOrder };
