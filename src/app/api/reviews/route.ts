import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    const reviews = await Review.find({ eventId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const userId = (session.user as { id?: string }).id;

    const review = await Review.create({
      ...body,
      userId,
      userName: session.user.name,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
