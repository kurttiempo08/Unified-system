import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * GET all beneficiaries
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sample_react_view ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch beneficiaries" });
  }
});

/**
 * UPDATE beneficiary
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, middlename, ext_name } = req.body;

  try {
    await pool.query(
      `
      UPDATE beneficiaries
      SET firstname=?, lastname=?, middlename=?, ext_name=?
      WHERE id=?
      `,
      [firstname, lastname, middlename, ext_name, id]
    );

    res.json({ message: "Beneficiary updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
