import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventDetailClient from "./EventDetailClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// SSG: Generate static params for known events
export async function generateStaticParams() {
  try {
    // If there's no database URI during build time, skip generating static paths entirely
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI is missing. Skipping static param generation during build.");
      return [];
    }

    await connectDB();
    const events = await Event.find({ status: { $in: ["published", "active"] } })
      .select("_id")
      .limit(20)
      .lean();
    return events.map((event) => ({ id: String(event._id) }));
  } catch (error) {
    console.error("Failed to generate static params during build:", error);
    return []; // Return empty array so build doesn't crash
  }
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    if (!process.env.MONGODB_URI) return { title: "Eventix" };

    await connectDB();
    const { id } = await params;
    const event = await Event.findById(id).lean();
    if (!event) return { title: "Event Not Found" };
    return {
      title: `${(event as { name: string }).name} - Eventix`,
      description: (event as { description: string }).description?.slice(0, 160),
    };
  } catch (error) {
    return { title: "Eventix" };
  }
}

// Server Component: fetches data at build time (SSG) and revalidates (ISR)
export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let event = null;

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Database connection string is missing");
    }
    
    await connectDB();
    event = await Event.findById(id).lean();
  } catch (error) {
    console.error("Database connection error in EventDetailPage:", error);
  }

  // If the DB failed or event wasn't found, show a graceful fallback or 404
  if (!event) {
    // If it's live in production and just missing env keys, don't crash with 404 right away
    if (!process.env.MONGODB_URI) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Configuration Missing</h2>
          <p>Please provide the MONGODB_URI environment variable to view this event.</p>
        </div>
      );
    }
    notFound();
  }

  const serialized = JSON.parse(JSON.stringify(event));

  return <EventDetailClient event={serialized} />;
}