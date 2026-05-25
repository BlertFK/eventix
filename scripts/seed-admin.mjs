import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://Eventixadmin:Eventixadmin@cluster0.hcgmsjp.mongodb.net/eventix?retryWrites=true&w=majority";

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

  const existing = await User.findOne({ email: "admin@eventix.com" });
  if (existing) {
    console.log("Admin user already exists");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  await User.create({
    name: "Admin",
    email: "admin@eventix.com",
    password: hashedPassword,
    role: "admin",
    provider: "credentials",
  });

  console.log("Admin user created!");
  console.log("Email: admin@eventix.com");
  console.log("Password: Admin123!");
  await mongoose.disconnect();
}

seed().catch(console.error);
