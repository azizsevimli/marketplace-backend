import Pool from "../../db/pool.js";

async function createPayment({ orderId, price }) {
  const query = `INSERT INTO payments (order_id, price) VALUES ($1, $2) RETURNING *`;
  const values = [orderId, price];
  const result = await Pool.query(query, values);

  const payment = result.rows[0];
  return payment;
}

async function getPayment({ id }) {
  const query = `SELECT * FROM payments WHERE id = $1 LIMIT 1`;
  const values = [id];
  const result = await Pool.query(query, values);

  const payment = result.rows[0];
  return payment;
}

async function updatePayment({ id, status }) {
  const query = `
    UPDATE payments 
    SET status = $1, updated_at = now()
    WHERE id = $2
    RETURNING *
  `;
  const values = [status, id];
  const result = await Pool.query(query, values);

  const payment = result.rows[0];
  return payment;
}

export default { createPayment, getPayment, updatePayment };
