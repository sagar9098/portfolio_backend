import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

const createAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@portfolio.dev";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const name = process.env.ADMIN_NAME || "Portfolio Admin";

  const existing = await User.findOne({ email });
  const passwordHash = await bcrypt.hash(password, 10);

  if (!existing) {
    await User.create({
      name,
      email,
      password: passwordHash,
      role: "admin"
    });

    console.log(`Admin created: ${email}`);
    process.exit(0);
  }

  existing.name = name;
  existing.password = passwordHash;
  existing.role = "admin";
  await existing.save();

  console.log(`Admin updated: ${email}`);
  process.exit(0);
};

createAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
