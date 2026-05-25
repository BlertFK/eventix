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
    const userId = (session.user as { id?: string }).id;
    const user = await User.findById(userId).populate("favorites").lean();
    return NextResponse.json({ favorites: user?.favorites || [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { eventId } = await req.json();
    const userId = (session.user as { id?: string }).id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const index = user.favorites.indexOf(eventId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(eventId);
    }
    await user.save();

    return NextResponse.json({ favorites: user.favorites });
  } catch {
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 });
  }
}
