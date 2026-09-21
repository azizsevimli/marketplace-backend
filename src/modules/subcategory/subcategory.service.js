import Pool from "../../db/pool.js";

async function createSubcategory({ parentId, title, slug }) {
  const query = `INSERT INTO subcategories (parent_id, title, slug) VALUES ($1, $2, $3) RETURNING *`;
  const values = [parentId, title, slug];
  const result = await Pool.query(query, values);

  const category = result.rows[0];
  return category;
}

async function getSubcategoriesByParentId({ parentId }) {
  const query = `SELECT * FROM subcategories WHERE parent_id = $1`;
  const values = [parentId];
  const result = await Pool.query(query, values);

  const categories = result.rows;
  return categories;
}

async function getSubcategoryById({ id }) {
  const query = `SELECT * FROM subcategories WHERE id = $1`;
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

async function updateSubcategory({ id, parentId, title, slug }) {
  const query = `UPDATE subcategories SET parent_id = $1, title = $2, slug = $3 WHERE id = $4 RETURNING *`;
  const values = [parentId, title, slug, id];
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
  createSubcategory,
  getSubcategoriesByParentId,
  getSubcategoryById,
  updateSubcategory,
};
