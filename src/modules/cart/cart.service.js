import Pool from "../../db/pool.js";

async function createCart({ customerId }) {
  const query = `INSERT INTO carts (customer_id) VALUES ($1) RETURNING *`;
  const values = [customerId];
  const result = await Pool.query(query, values);

  const cart = result.rows[0];
  return cart;
}

async function getCart({ customerId }) {
  const query = `SELECT * FROM carts WHERE customer_id = $1`;
  const values = [customerId];
  const result = await Pool.query(query, values);

  const cart = result.rows[0];
  return cart;
}

async function updateCart({ customerId, totalPrice }) {
  const query = `UPDATE carts SET total_price = $1, updated_at = now() WHERE customer_id = $2 RETURNING *`;
  const values = [totalPrice, customerId];
  const result = await Pool.query(query, values);

  const cart = result.rows[0];
  return cart;
}

export default { createCart, getCart, updateCart };
