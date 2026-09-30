import Pool from "../../db/pool.js";

async function createOrderItem({
  orderId,
  storeId,
  productId,
  quantity,
  unitPrice,
}) {
  const query = `
    INSERT INTO
      order_items (order_id, store_id, product_id, quantity, unit_price)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [orderId, storeId, productId, quantity, unitPrice];
  const result = await Pool.query(query, values);

  const orderItem = result.rows[0];
  return orderItem;
}

async function getOrderItemsByOrderId({ orderId }) {
  const query = `
    SELECT * 
    FROM order_items 
    WHERE order_id = $1
  `;
  const values = [orderId];
  const result = await Pool.query(query, values);

  const orderItems = result.rows;
  return orderItems;
}

async function updateOrderItem({ id, status }) {
  const query = `
    UPDATE order_items 
    SET 
      status = $1,
      updated_at = now()
    WHERE id = $2
    RETURNING *
  `;
  const values = [status, id];
  const result = await Pool.query(query, values);

  const orderItem = result.rows[0];
  return orderItem;
}

export default { createOrderItem, getOrderItemsByOrderId, updateOrderItem };
