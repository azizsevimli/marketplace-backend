import Pool from "../../db/pool.js";
import imageService from "./image.service.js";

async function createProduct({
  storeId,
  categoryId,
  subcategoryId,
  title,
  description,
  price,
  stockQuantity,
  sku = null,
  images,
}) {
  const client = await Pool.connect();
  try {
    await client.query(`BEGIN`);
    const query = `
      INSERT INTO products (store_id, category_id, subcategory_id, title, description, price, stock_quantity, sku) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [
      storeId,
      categoryId,
      subcategoryId,
      title,
      description,
      price,
      stockQuantity,
      sku,
    ];
    const result = await client.query(query, values);

    const product = result.rows[0];

    const createdImages = await imageService.createImages({
      client: client,
      productId: product.id,
      images: images,
    });

    await client.query(`COMMIT`);

    return { product, createdImages };
  } catch (e) {
    await client.query(`ROLLBACK`);
    throw e;
  } finally {
    client.release();
  }
}

async function getProductById({ id }) {
  const query = `
    SELECT 
      p.*,
      COALESCE(
        json_agg(
          json_build_object('id', pi.id, 'imageUrl', pi.image_url, 'sortOrder', pi.sort_order) ORDER BY pi.sort_order ASC
        ) FILTER (WHERE pi.id IS NOT NULL),
        '[]'
      ) AS product_images
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE p.id = $1
    GROUP BY p.id
  `;
  const values = [id];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("ID'ye sahip ürün bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const product = result.rows[0];
  return product;
}

async function getProductsByStoreId({ storeId }) {
  const query = `
    SELECT 
      p.*,
      COALESCE(
        json_agg(
          json_build_object('id', pi.id, 'imageUrl', pi.image_url, 'sortOrder', pi.sort_order) ORDER BY pi.sort_order ASC
        ) FILTER (WHERE pi.id IS NOT NULL),
        '[]'
      ) AS product_images
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE p.store_id = $1
    GROUP BY p.id
  `;
  const values = [storeId];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Mağaza ID'ye ait ürün bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const products = result.rows;
  return products;
}

async function updateProductDetail({
  id,
  title = null,
  description = null,
  sku = null,
  status = null,
}) {
  const query = `UPDATE products SET title = COALESCE($1, title), description = COALESCE($2, description), sku = COALESCE($3, sku), status = COALESCE($4, status) WHERE id = $5 RETURNING *`;
  const values = [title, description, sku, status, id];
  const result = await Pool.query(query, values);

  const product = result.rows[0];
  return product;
}

async function updateProductStock({ id, stockQuantity }) {
  const query = `UPDATE products SET stock_quantity = $1 WHERE id = $2 RETURNING *`;
  const values = [stockQuantity, id];
  const result = await Pool.query(query, values);

  const product = result.rows[0];
  return product;
}

async function updateProductPrice({ id, price = null, discountPrice = null }) {
  const query = `UPDATE products SET price = COALESCE($1, price), discount_price = COALESCE($2, discount_price) WHERE id = $3 RETURNING *`;
  const values = [price, discountPrice, id];
  const result = await Pool.query(query, values);

  const product = result.rows[0];
  return product;
}

export default {
  createProduct,
  getProductById,
  getProductsByStoreId,
  updateProductDetail,
  updateProductStock,
  updateProductPrice,
};
