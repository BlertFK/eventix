import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventsClient from "./EventsClient";

// SSR: Always fetch fresh data on each request
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let serialized = [];

  try {
    await connectDB();
    const events = await Event.find({ status: { $in: ["published", "active"] } })
      .sort({ date: 1 })
      .lean();
    serialized = JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return <EventsClient initialEvents={serialized} />;
}
