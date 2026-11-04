import Pool from "../../db/pool.js";

async function getUserStats() {
  const query = `
    SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE role = 'ADMIN') AS admin, 
        COUNT(*) FILTER (WHERE role = 'CUSTOMER') AS customer,
        COUNT(*) FILTER (WHERE role = 'VENDOR') AS vendor
    FROM users
  `;
  const result = await Pool.query(query);

  const userStats = result.rows[0];
  return userStats;
}

async function getCustomers() {
  const query = `
    SELECT id, first_name, last_name, email, phone, role, created_at, updated_at
    FROM users
    WHERE role = 'CUSTOMER'
  `;
  const result = await Pool.query(query);

  const customers = result.rows;
  return customers;
}

export default { getUserStats, getCustomers };
