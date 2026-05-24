"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  titleHighlight?: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function PageHero({
  label,
  title,
  titleHighlight,
  description,
  gradientFrom = "from-purple",
  gradientTo = "to-pink",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-purple/20 blur-[120px]"
        style={{ animation: "float 15s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-pink/15 blur-[120px]"
        style={{ animation: "float 18s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan/8 blur-[150px]"
        style={{ animation: "float 22s ease-in-out infinite 2s" }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 mb-6 text-xs font-semibold tracking-[0.25em] uppercase text-purple-light"
        >
          <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-purple to-pink" />
          {label}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          {title}{" "}
          {titleHighlight && (
            <span
              className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
            >
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
