import Pool from "../../db/pool.js";

async function createReview({
  customerId,
  productId,
  orderItemId,
  description,
  star,
}) {
  const purchaseCheckQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM orders o
            JOIN order_items oi ON oi.order_id = o.id
            WHERE o.customer_id = $1
              AND oi.product_id = $2
              AND o.status = 'COMPLETED'
        ) AS has_purchased
    `;

  const purchaseResult = await Pool.query(purchaseCheckQuery, [
    customerId,
    productId,
  ]);

  if (!purchaseResult.rows[0].has_purchased) {
    const error = new Error(
      "Yorum yapabilmek için bu ürünü almış olmanız gerekiyor.",
    );
    error.code = "FORBIDDEN";
    throw error;
  }

  const query = `INSERT INTO reviews (customer_id, product_id, order_item_id, description, star) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [customerId, productId, orderItemId, description, star];
  const result = await Pool.query(query, values);

  const review = result.rows[0];
  return review;
}

async function getReview({ id, customerId }) {
  const query = `SELECT * FROM reviews WHERE id = $1 AND customer_id = $2 LIMIT 1`;
  const values = [id, customerId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Ürün için yorum bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const review = result.rows[0];
  return review;
}

async function getReviewsByProductId({ productId }) {
  const query = `SELECT * FROM reviews WHERE product_id = $1 ORDER BY updated_at desc`;
  const values = [productId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Ürün için yorum bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const reviews = result.rows;
  return reviews;
}

async function getReviewsByCustomerId({ customerId }) {
  const query = `SELECT * FROM reviews WHERE customer_id = $1 ORDER BY updated_at desc`;
  const values = [customerId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Kullanıcının yaptığı yorumlar bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const reviews = result.rows;
  return reviews;
}

async function updateReviews({
  id,
  customerId,
  description = null,
  star = null,
}) {
  const query = `
    UPDATE reviews 
    SET 
        description = COALESCE($1, description),
        star = COALESCE($2, star),
        updated_at = now()
    WHERE id = $3 AND customer_id = $4
    RETURNING *
  `;
  const values = [description, star, id, customerId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Yorum bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const review = result.rows[0];
  return review;
}

async function deleteReview({ id, customerId }) {
  const query = `DELETE FROM reviews WHERE id = $1 AND customerId = $2`;
  const values = [id, customerId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Yorum bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }
}

export default {
  createReview,
  getReview,
  getReviewsByProductId,
  getReviewsByCustomerId,
  updateReviews,
  deleteReview,
};
