"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

const words = ["Discover.", "Book.", "Experience."];

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating gradient orbs — hidden on mobile via CSS */}
        <div
          className="blur-orb absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple/20 blur-[120px]"
          style={{ animation: "float 15s ease-in-out infinite" }}
        />
        <div
          className="blur-orb absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-pink/20 blur-[120px]"
          style={{ animation: "float 18s ease-in-out infinite reverse" }}
        />
        <div
          className="blur-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan/10 blur-[150px]"
          style={{ animation: "float 20s ease-in-out infinite 2s" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Headline */}
          <div className="mb-6">
            {words.map((word, i) => (
              <m.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: "easeOut",
                }}
                className={`inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mr-4 md:mr-6 ${
                  i === 0
                    ? "text-white"
                    : i === 1
                      ? "bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-pink to-cyan bg-clip-text text-transparent"
                }`}
              >
                {word}
              </m.span>
            ))}
          </div>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Your gateway to the best events - concerts, festivals, sports, and
            more.
          </m.p>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <a
              href="#events"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-purple via-pink to-cyan hover:shadow-lg hover:shadow-purple/25 hover:brightness-110 transition-all duration-300"
            >
              Explore Events
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-purple to-pink" />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
