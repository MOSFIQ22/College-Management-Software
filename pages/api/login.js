import { db } from "../../lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../lib/auth";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields required" });

  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user[0]);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, { httpOnly: true, path: "/", maxAge: 3600 })
    );

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
