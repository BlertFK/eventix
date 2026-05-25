import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const role = (session.user as { role?: string }).role;

    if (role === "admin") {
      const users = await User.find({}).select("-password").lean();
      return NextResponse.json({ users });
    }

    const userId = (session.user as { id?: string }).id;
    const user = await User.findById(userId).select("-password").lean();
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;
    const body = await req.json();

    const allowedFields = ["name", "phone", "bio", "location", "dateOfBirth"];
    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) updates[key] = body[key];
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
