import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "./db";
import { users } from "@shared/schema";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "admin")
    });
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }
    
    // Create admin user with password "admin123"
    const hashedPassword = await hashPassword("admin123");
    
    const [newAdmin] = await db
      .insert(users)
      .values({
        username: "admin",
        password: hashedPassword
      })
      .returning();
    
    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();