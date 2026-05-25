import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventDetailClient from "./EventDetailClient";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// SSG: Generate static params for known events
export async function generateStaticParams() {
  await connectDB();
  const events = await Event.find({ status: { $in: ["published", "active"] } })
    .select("_id")
    .limit(20)
    .lean();
  return events.map((event) => ({ id: String(event._id) }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  await connectDB();
  const { id } = await params;
  const event = await Event.findById(id).lean();
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${(event as { name: string }).name} - Eventix`,
    description: (event as { description: string }).description?.slice(0, 160),
  };
}

// Server Component: fetches data at build time (SSG) and revalidates (ISR)
export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const event = await Event.findById(id).lean();

  if (!event) notFound();

  const serialized = JSON.parse(JSON.stringify(event));

  return <EventDetailClient event={serialized} />;
}
