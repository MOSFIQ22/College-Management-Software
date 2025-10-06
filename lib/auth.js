import jwt from "jsonwebtoken";

const SECRET = "YOUR_SECRET_KEY"; // replace with env var in production

export function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
