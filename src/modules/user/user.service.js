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

export default { getUserStats };
