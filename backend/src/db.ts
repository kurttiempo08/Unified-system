import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ DB connection successful:", rows);
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  } finally {
    await pool.end();
  }
};

// Run test if this file is executed directly
if (require.main === module) {
  testConnection();
}
