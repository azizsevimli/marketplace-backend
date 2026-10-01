import Pool from "../../db/pool.js";

async function createCartItem({ cartId, productId, quantity, unitPrice }) {
  const query = `
    INSERT INTO cart_items (cart_id, product_id, quantity, unit_price) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;
  const values = [cartId, productId, quantity, unitPrice];
  const result = await Pool.query(query, values);

  const cartItem = result.rows[0];
  return cartItem;
}

async function getCartItemsByCartId({ cartId }) {
  const query = `SELECT * FROM cart_items WHERE cart_id = $1`;
  const values = [cartId];
  const result = await Pool.query(query, values);

  const cartItems = result.rows;
  return cartItems;
}

async function updateCartItem({ id, quantity = null, unitPrice = null }) {
  const query = `
    UPDATE cart_items 
    SET 
        quantity = COALESCE($1, quantity), 
        unit_price = COALESCE($2, unit_price) 
    WHERE id = $3 
    RETURNING *
    `;
  const values = [quantity, unitPrice, id];
  const result = await Pool.query(query, values);

  const cartItem = result.rows[0];
  return cartItem;
}

async function deleteCartItem({ id }) {
  const query = `DELETE FROM cart_items WHERE id = $1`;
  const values = [id];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Sepet ürünü bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }
}

export default {
  createCartItem,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
};
