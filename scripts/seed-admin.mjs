import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found. Copy .env.example to .env.local and fill in your MongoDB connection string.");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  provider: { type: String, default: "credentials" },
  favorites: [String],
}, { timestamps: true });

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const User = mongoose.models.User || mongoose.model("User", userSchema);

  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  const existing = await User.findOne({ email: "admin@eventix.com" });
  if (existing) {
    await User.updateOne(
      { email: "admin@eventix.com" },
      { password: hashedPassword, role: "admin" }
    );
    console.log("Admin user password reset!");
  } else {
    await User.create({
      name: "Admin",
      email: "admin@eventix.com",
      password: hashedPassword,
      role: "admin",
      provider: "credentials",
    });
    console.log("Admin user created!");
  }

  console.log("Email: admin@eventix.com");
  console.log("Password: Admin123!");
  await mongoose.disconnect();
}

seed().catch(console.error);
