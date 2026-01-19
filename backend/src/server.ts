import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "Backend is running" });
});

// Get beneficiaries
app.get("/api/beneficiaries", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM sample_react_view");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
