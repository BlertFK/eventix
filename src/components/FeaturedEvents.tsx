"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import EventCard from "./EventCard";

const gradients = [
  "from-purple to-pink",
  "from-pink to-cyan",
  "from-cyan to-purple",
  "from-purple-light to-pink",
  "from-purple to-cyan",
  "from-pink to-purple",
];

interface Event {
  _id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  image: string;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events?limit=6")
      .then((r) => r.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  return (
    <section id="events" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Featured Events"
          title="Trending Right Now"
          description="Don't miss out on the hottest events happening near you. Grab your tickets before they sell out."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <Link key={event._id} href={`/events/${event._id}`} className="block">
              <EventCard
                title={event.name}
                date={new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                location={`${event.venue}, ${event.city}`}
                price={`$${event.price}`}
                category={event.category}
                image={event.image || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop"}
                gradient={gradients[i % gradients.length]}
                index={i}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
