import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mu123",      // tomer MySQL password
  database: "college_attendance",
});
