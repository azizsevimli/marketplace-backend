import Pool from "../../db/pool.js";

async function createFavorite({ customerId, productId }) {
  const query = `INSERT INTO favorites (customer_id, product_id) VALUES ($1, $2) RETURNING *`;
  const values = [customerId, productId];
  const result = await Pool.query(query, values);

  const favorite = result.rows[0];
  return favorite;
}

async function getFavorites({ customerId }) {
  const query = `
    SELECT
        p.*,
        COALESCE(
            json_agg(
                json_build_object(
                    'id', pi.id,
                    'imageUrl', pi.image_url,
                    'sortOrder', pi.sort_order
                ) ORDER BY pi.sort_order ASC
            ) FILTER (WHERE pi.id IS NOT NULL),
            '[]'
        ) AS product_images
    FROM favorites f
    JOIN products p ON p.id = f.product_id
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE f.customer_id = $1
    GROUP BY p.id; 
    `;
  const values = [customerId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Favori ürün bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const favorites = result.rows;
  return favorites;
}

async function deleteFavorite({ customerId, productId }) {
  const query = `DELETE FROM favorites WHERE customer_id = $1 AND product_id = $2`;
  const values = [customerId, productId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Silinecek favori ürün bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }
}

export default { createFavorite, getFavorites, deleteFavorite };
