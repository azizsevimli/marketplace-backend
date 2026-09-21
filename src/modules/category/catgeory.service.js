import Pool from "../../db/pool.js";

async function createCategory({ title, slug }) {
  const query = `INSERT INTO categories (title, slug) VALUES ($1, $2) RETURNING *`;
  const values = [title, slug];
  const result = await Pool.query(query, values);

  const category = result.rows[0];
  return category;
}

async function getCategories() {
  const query = `SELECT * FROM categories ORDER BY title asc`;
  const result = await Pool.query(query);

  const categories = result.rows;
  return categories;
}

async function getCategoryById({ id }) {
  const query = `SELECT * FROM categories WHERE id = $1 LIMIT 1`;
  const values = [id];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("ID'ye sahip kategori bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const category = result.rows[0];
  return category;
}

async function updateCategory({ id, title, slug }) {
  const query = `
    UPDATE categories SET title = $1, slug = $2, updated_at = now() WHERE id = $3 RETURNING *`;
  const values = [title, slug, id];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("ID'ye sahip kategori bulunamadı.");
    error.code = "NOT_FOUND";
    throw error;
  }

  const category = result.rows[0];
  return category;
}

export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};
