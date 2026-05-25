import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const filter: Record<string, unknown> = { status: { $in: ["published", "active"] } };
    if (category && category !== "all") filter.category = category;
    if (city) filter.city = { $regex: city, $options: "i" };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { venue: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Event.countDocuments(filter);
    const events = await Event.find(filter)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      events,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
