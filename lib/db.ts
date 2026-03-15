import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DB_URL });

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function initDB() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      openid VARCHAR(128) UNIQUE NOT NULL,
      nickname VARCHAR(100) NOT NULL DEFAULT '游客',
      merit BIGINT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
