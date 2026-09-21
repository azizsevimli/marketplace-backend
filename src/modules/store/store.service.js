import Pool from "../../db/pool.js";

async function createStore({
  vendorId,
  name,
  slug,
  description,
  phone,
  email,
  address,
  logo = null,
}) {
  const query = `
    INSERT INTO stores (vendor_id, name, slug, description, phone, email, address, logo) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING (id, status, created_at)
  `;
  const values = [
    vendorId,
    name,
    slug,
    description,
    phone,
    email,
    address,
    logo,
  ];
  const result = await Pool.query(query, values);

  return result;
}

async function getMyStore({ id }) {
  const query = `SELECT * FROM stores WHERE id = $1 LIMIT 1`;
  const values = [id];
  const result = await Pool.query(query, values);

  if (result.rowCount == 0) {
    const error = new Error("Mağaza bulunamadı");
    error.code = "NOT_FOUND";
    throw error;
  }

  const store = result.rows[0];
  return store;
}

async function updateMyStore({
  name = null,
  slug = null,
  description = null,
  logo = null,
  phone = null,
  email = null,
  address = null,
  status = null,
  id,
}) {
  const query = `
    UPDATE stores 
    SET 
      name = COALESCE($1, name),
      slug = COALESCE($2, slug),
      description = COALESCE($3, description),
      logo = COALESCE($4, logo),
      phone = COALESCE($5, phone),
      email = COALESCE($6, email),
      address = COALESCE($7, address),
      status =  COALESCE($8, status),
      updated_at = now()
    WHERE id = $9
    RETURNING *
  `;
  const values = [
    name,
    slug,
    description,
    logo,
    phone,
    email,
    address,
    status,
    id,
  ];

  const result = await Pool.query(query, values);

  console.log(result.rowCount);
  if (result.rowCount == 0) {
    const error = new Error("Mağaza bulunamadı");
    error.code = "NOT_FOUND";
    throw error;
  }

  const store = result.rows[0];
  return store;
}

export default { createStore, getMyStore, updateMyStore };
