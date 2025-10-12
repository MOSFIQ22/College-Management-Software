import { db } from "../../lib/db";

export default async function handler(req, res) {
  try {
    // ---------- GET ----------
    if (req.method === "GET") {
      const [rows] = await db.query(
        "SELECT * FROM teachers ORDER BY teacher_id DESC"
      );
      return res.status(200).json(rows);
    }

    // ---------- POST ----------
    else if (req.method === "POST") {
      const { emp_code, first_name, last_name, email, phone, department } =
        req.body;

      if (!emp_code || !first_name || !department) {
        return res
          .status(400)
          .json({ error: "Required fields: emp_code, first_name, department" });
      }

      const [result] = await db.query(
        `INSERT INTO teachers 
         (emp_code, first_name, last_name, email, phone, department)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          emp_code,
          first_name,
          last_name || null,
          email || null,
          phone || null,
          department,
        ]
      );

      return res.status(200).json({ success: true, id: result.insertId });
    }

    // ---------- PUT ----------
    else if (req.method === "PUT") {
      const {
        teacher_id,
        emp_code,
        first_name,
        last_name,
        email,
        phone,
        department,
      } = req.body;

      if (!teacher_id || !emp_code || !first_name || !department) {
        return res.status(400).json({
          error:
            "Required fields: teacher_id, emp_code, first_name, department",
        });
      }

      const [result] = await db.query(
        `UPDATE teachers
         SET emp_code = ?, first_name = ?, last_name = ?, email = ?, phone = ?, department = ?
         WHERE teacher_id = ?`,
        [
          emp_code,
          first_name,
          last_name || null,
          email || null,
          phone || null,
          department,
          teacher_id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      return res.status(200).json({ success: true });
    }

    // ---------- DELETE ----------
    else if (req.method === "DELETE") {
      const { teacher_id } = req.body;

      if (!teacher_id) {
        return res.status(400).json({ error: "teacher_id is required" });
      }

      const [result] = await db.query(
        "DELETE FROM teachers WHERE teacher_id = ?",
        [teacher_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      return res.status(200).json({ success: true });
    }

    // ---------- INVALID METHOD ----------
    else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({
        error: `Method ${req.method} not allowed`,
      });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
