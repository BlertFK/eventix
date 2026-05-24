"use client";

import SectionHeading from "./SectionHeading";
import EventCard from "./EventCard";

const events = [
  {
    title: "Neon Nights Festival",
    date: "Jun 15, 2026",
    location: "Madison Square Garden, NY",
    price: "$89",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop",
    gradient: "from-purple to-pink",
  },
  {
    title: "Synthwave Symphony",
    date: "Jul 8, 2026",
    location: "The O2 Arena, London",
    price: "$120",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    gradient: "from-pink to-cyan",
  },
  {
    title: "Champions League Final",
    date: "May 30, 2026",
    location: "Wembley Stadium, London",
    price: "$250",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&h=200&fit=crop",
    gradient: "from-cyan to-purple",
  },
  {
    title: "Digital Art Exhibition",
    date: "Aug 12, 2026",
    location: "MoMA, New York",
    price: "$45",
    category: "Art",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
    gradient: "from-purple-light to-pink",
  },
  {
    title: "Summer Music Fest",
    date: "Jul 22, 2026",
    location: "Central Park, NY",
    price: "$65",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop",
    gradient: "from-purple to-cyan",
  },
  {
    title: "Comedy Night Live",
    date: "Jun 28, 2026",
    location: "The Comedy Store, LA",
    price: "$35",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=200&h=200&fit=crop",
    gradient: "from-pink to-purple",
  },
];

export default function FeaturedEvents() {
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
            <EventCard key={event.title} {...event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
