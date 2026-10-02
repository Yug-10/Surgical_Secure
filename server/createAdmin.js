import bcrypt from "bcryptjs";
import pool from "./config/db.js";
import "dotenv/config";

const name = "Surgical_Secure Admin";
const email = "admin@surgicalsecure.com";
const password = "SS@1234"; // Change this to a secure password

try {
  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `
    INSERT INTO admins
    (name, email, password_hash)
    VALUES (?, ?, ?)
    `,
    [name, email, passwordHash]
  );

  console.log("Admin created successfully");

  process.exit(0);
} catch (error) {
  console.error("Failed to create admin:", error);

  process.exit(1);
}