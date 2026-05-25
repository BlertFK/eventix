import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const event = await Event.findById(id).lean();
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
