import { db } from "../../lib/db";

export default async function handler(req, res) {
  try {
    // ---------- GET ----------
    if (req.method === "GET") {
      const [students] = await db.query("SELECT * FROM students ORDER BY student_id DESC");

      // Fetch guardians for each student
      for (const student of students) {
        const [guardians] = await db.query(
          "SELECT * FROM guardians WHERE student_id = ?",
          [student.student_id]
        );
        student.guardians = guardians;
      }

      return res.status(200).json(students);
    }

    // ---------- POST ----------
    else if (req.method === "POST") {
      const {
        roll_no,
        first_name,
        last_name,
        email,
        phone,
        admission_year,
        department,
        guardians = [],
      } = req.body;

      if (!roll_no || !first_name || !department) {
        return res.status(400).json({
          error: "Required fields: roll_no, first_name, department",
        });
      }

      const [result] = await db.query(
        `INSERT INTO students 
         (roll_no, first_name, last_name, email, phone, admission_year, department)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          roll_no,
          first_name,
          last_name || null,
          email || null,
          phone || null,
          admission_year || null,
          department,
        ]
      );

      const student_id = result.insertId;

      // Insert guardians
      for (const g of guardians) {
        await db.query(
          `INSERT INTO guardians 
           (student_id, guardian_name, relation, phone, email, address, occupation)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            student_id,
            g.guardian_name,
            g.relation,
            g.phone || null,
            g.email || null,
            g.address || null,
            g.occupation || null,
          ]
        );
      }

      return res.status(200).json({ success: true, id: student_id });
    }

    // ---------- PUT ----------
    else if (req.method === "PUT") {
      const {
        student_id,
        roll_no,
        first_name,
        last_name,
        email,
        phone,
        admission_year,
        department,
        guardians = [],
      } = req.body;

      if (!student_id || !roll_no || !first_name || !department) {
        return res.status(400).json({
          error: "Required fields: student_id, roll_no, first_name, department",
        });
      }

      // Update student
      const [result] = await db.query(
        `UPDATE students 
         SET roll_no = ?, first_name = ?, last_name = ?, email = ?, phone = ?, admission_year = ?, department = ?
         WHERE student_id = ?`,
        [
          roll_no,
          first_name,
          last_name || null,
          email || null,
          phone || null,
          admission_year || null,
          department,
          student_id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Delete old guardians
      await db.query("DELETE FROM guardians WHERE student_id = ?", [student_id]);

      // Insert new guardians
      for (const g of guardians) {
        await db.query(
          `INSERT INTO guardians 
           (student_id, guardian_name, relation, phone, email, address, occupation)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            student_id,
            g.guardian_name,
            g.relation,
            g.phone || null,
            g.email || null,
            g.address || null,
            g.occupation || null,
          ]
        );
      }

      return res.status(200).json({ success: true });
    }

    // ---------- DELETE ----------
    else if (req.method === "DELETE") {
      const { student_id } = req.body;

      if (!student_id) {
        return res.status(400).json({ error: "student_id is required" });
      }

      // Delete guardians first (foreign key)
      await db.query("DELETE FROM guardians WHERE student_id = ?", [student_id]);

      const [result] = await db.query(
        "DELETE FROM students WHERE student_id = ?",
        [student_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json({ success: true });
    }

    // ---------- INVALID METHOD ----------
    else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
