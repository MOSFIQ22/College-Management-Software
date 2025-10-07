import { db } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // GET → সব teacher রেকর্ড রিটার্ন করো
      const [rows] = await db.query("SELECT * FROM teachers ORDER BY teacher_id DESC");
      return res.status(200).json(rows);
    } 

    else if (req.method === "POST") {
      // POST → নতুন teacher ইনসার্ট করো
      const { emp_code, first_name, last_name, email, phone, department } = req.body;

      if (!emp_code || !first_name || !department) {
        return res.status(400).json({ error: "Required fields missing" });
      }

      const [result] = await db.query(
        "INSERT INTO teachers (emp_code, first_name, last_name, email, phone, department) VALUES (?, ?, ?, ?, ?, ?)",
        [emp_code, first_name, last_name || null, email || null, phone || null, department]
      );

      return res.status(200).json({ success: true, id: result.insertId });
    } 

    else if (req.method === "PUT") {
      // PUT → teacher আপডেট করো
      const { teacher_id, emp_code, first_name, last_name, email, phone, department } = req.body;

      if (!teacher_id || !emp_code || !first_name || !department) {
        return res.status(400).json({ error: "Required fields missing" });
      }

      const [result] = await db.query(
        "UPDATE teachers SET emp_code = ?, first_name = ?, last_name = ?, email = ?, phone = ?, department = ? WHERE teacher_id = ?",
        [emp_code, first_name, last_name || null, email || null, phone || null, department, teacher_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      return res.status(200).json({ success: true });
    } 

    else if (req.method === "DELETE") {
      // DELETE → teacher ডিলিট করো
      const { teacher_id } = req.body;

      if (!teacher_id) {
        return res.status(400).json({ error: "teacher_id is required" });
      }

      const [result] = await db.query("DELETE FROM teachers WHERE teacher_id = ?", [teacher_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      return res.status(200).json({ success: true });
    } 

    else {
      // অন্য method হলে 405 (not allowed)
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: err.message });
  }
}
