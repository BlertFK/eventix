import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  favorites: string[];
  provider?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    favorites: [{ type: String }],
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
