import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db";

dotenv.config();

const app = express(); // 👈 app is created HERE
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "Backend is running" });
});

// Search beneficiaries
app.get("/api/beneficiaries", async (req: Request, res: Response) => {
  const { hhid } = req.query;

  if (!hhid) {
    return res.json([]);
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM sample_react_view WHERE HOUSEHOLD_ID LIKE ?",
      [`%${hhid}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

// ✅ UPDATE beneficiary (PUT)
app.put("/api/beneficiaries/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ACADEMIC_DISTINCTION, EMPLOYED, FACILITY_EMPLOYMENT, COMPANY_REFERRED, CURRENT_AGENCY, POSITION, SUBSIDY_AVAILED, USER_ID, DATE_MODIFIED, HIGHEST_EDUC_ATTAINMENT, YEAR_GRADUATED, PRC_LICENSED_HOLDER, SPECIFIC_LICENSURE_EXAM} = req.body;

  // if (!hhid) {
  //   return res.status(400).json({
  //     message: "Required fields are missing",
  //   });
  // }

  try {
    const [result]: any = await pool.query(
      `UPDATE tbl_household_roster
       SET ACADEMIC_DISTINCTION = ?, EMPLOYED = ?, FACILITY_EMPLOYMENT = ?, COMPANY_REFERRED = ?, CURRENT_AGENCY = ?, POSITION = ?, SUBSIDY_AVAILED = ?, USER_ID = ?, DATE_MODIFIED = ?, HIGHEST_EDUC_ATTAINMENT = ?, YEAR_GRADUATED = ?, PRC_LICENSED_HOLDER = ?, SPECIFIC_LICENSURE_EXAM = ?
       WHERE roster_id = ?`,
      [ACADEMIC_DISTINCTION, EMPLOYED, FACILITY_EMPLOYMENT, COMPANY_REFERRED, CURRENT_AGENCY, POSITION, SUBSIDY_AVAILED, USER_ID, DATE_MODIFIED, HIGHEST_EDUC_ATTAINMENT, YEAR_GRADUATED, PRC_LICENSED_HOLDER, SPECIFIC_LICENSURE_EXAM, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Beneficiary not found",
      });
    }

    res.json({ message: "Beneficiary updated successfully" });
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`🚀 Test running on http://localhost:${PORT}`);
});