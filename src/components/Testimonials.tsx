"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Concert Enthusiast",
    quote:
      "Eventix made my festival experience seamless. From discovering the event to getting my digital ticket, everything was incredibly smooth. The best ticketing platform I have ever used!",
    rating: 5,
    avatar: "",
  },
  {
    name: "James Rodriguez",
    role: "Sports Fan",
    quote:
      "I have been using Eventix for all my sports events. The seat selection is intuitive, prices are fair, and the instant confirmation gives me peace of mind every time.",
    rating: 5,
    avatar: "",
  },
  {
    name: "Emily Chen",
    role: "Event Organizer",
    quote:
      "As an event organizer, Eventix has been a game-changer. The dashboard analytics are powerful, and our attendees love how easy it is to purchase and manage their tickets.",
    rating: 4,
    avatar: "",
  },
  {
    name: "Marcus Thompson",
    role: "Music Producer",
    quote:
      "The checkout flow is lightning fast and the digital tickets work flawlessly at the door. I recommend Eventix to every artist and venue I work with.",
    rating: 5,
    avatar: "",
  },
  {
    name: "David Kim",
    role: "Venue Manager",
    quote:
      "We switched to Eventix last year and ticket sales went up 40%. The platform is clean, the support team is responsive, and our customers love the experience.",
    rating: 5,
    avatar: "",
  },
  {
    name: "Mei Lin",
    role: "Student",
    quote:
      "As a student on a budget, I love the price alerts feature. Eventix notified me when tickets dropped for a show I wanted to see and I saved over 30% compared to other platforms.",
    rating: 5,
    avatar: "",
  },
];

const total = testimonials.length;

function wrap(i: number) {
  return ((i % total) + total) % total;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragging, setDragging] = useState(false);

  const visibleIndices = [
    wrap(activeIndex),
    wrap(activeIndex + 1),
    wrap(activeIndex + 2),
  ];

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActiveIndex((prev) => wrap(prev + dir));
    },
    []
  );

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    setDragging(false);
    const swipe =
      Math.abs(info.velocity.x) > 300 || Math.abs(info.offset.x) > 40;
    if (!swipe) return;
    go(info.offset.x < 0 ? 1 : -1);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 404 : -404,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -404 : 404,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Testimonials"
          title="What Our Users Say"
          description="Join thousands of happy event-goers who trust Eventix for their ticketing needs."
        />
      </div>

      {/* Carousel */}
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="relative overflow-x-clip">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Cards container - fixed height to prevent layout shift */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing h-[340px] md:h-[300px] overflow-visible relative"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute inset-0"
              >
                {visibleIndices.map((idx, i) => (
                  <div
                    key={`${activeIndex}-${idx}`}
                    className={i === 0 ? "h-full" : "hidden md:block h-full"}
                  >
                    <TestimonialCard
                      {...testimonials[idx]}
                      index={i}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-gray-500 hover:text-white hover:border-purple/30 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? "w-7 h-2 bg-gradient-to-r from-purple to-pink"
                    : "w-2 h-2 bg-gray-700 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-gray-500 hover:text-white hover:border-purple/30 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
