import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Pool from "../../db/pool.js";

function generateToken({ id, role }) {
  return jwt.sign({ id: id, role: role }, process.env.JWT_TOKEN_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });
}

async function registerCustomer({ client, userId }) {
  const query = `INSERT INTO customers (user_id) VALUES ($1)`;
  const values = [userId];
  await client.query(query, values);
}

async function registerVendor({ client, userId }) {
  const query = `INSERT INTO vendors (user_id, status) VALUES ($1, $2)`;
  const values = [userId, "PENDING"];
  await client.query(query, values);
}

async function register({
  firstName,
  lastName,
  email,
  phone = null,
  password,
  role = "CUSTOMER",
}) {
  if (role == "ADMIN") {
    const error = new Error("Admin oluşturma yetkiniz yok.");
    error.code = "FORBIDDEN";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const client = await Pool.connect();

  try {
    await client.query(`BEGIN`);

    const query = `
      INSERT INTO users (first_name, last_name, email, phone, password_hash, role) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, role
    `;
    const values = [firstName, lastName, email, phone, hashedPassword, role];
    const result = await client.query(query, values);

    const user = result.rows[0];
    const token = generateToken({ id: user.id, role: user.role });

    if (role == "VENDOR") {
      await registerVendor({ client: client, userId: user.id });
    } else {
      await registerCustomer({ client: client, userId: user.id });
    }

    await client.query(`COMMIT`);

    return { token, id: user.id, role: user.role };
  } catch (e) {
    console.log(e);
    await client.query(`ROLLBACK`);
    throw e;
  } finally {
    client.release();
  }
}

async function login({ email, password }) {
  const query = `
    SELECT * 
    FROM users 
    WHERE email = $1 
    LIMIT 1
  `;
  const values = [email];
  const result = await Pool.query(query, values);

  const user = result.rows[0];

  if (!user) {
    const error = new Error("Bu email ile kayıtlı kullanıcı bulunamadı");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  delete user.password_hash;

  if (!isMatch) {
    const error = new Error("Hatalı şifre");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const token = generateToken({ id: user.id, role: user.role });

  return { token, user };
}

async function getMe({ id }) {
  const query = `
    SELECT id, first_name, last_name, email, phone, role, created_at, updated_at 
    FROM users 
    WHERE id = $1 
    LIMIT 1
  `;
  const values = [id];
  const result = await Pool.query(query, values);

  const user = result.rows[0];

  if (!user) {
    const error = new Error("Kullanıcı bulunamadı");
    error.code = "NOT_FOUND";
    throw error;
  }

  return user;
}

export default { register, login, getMe };
