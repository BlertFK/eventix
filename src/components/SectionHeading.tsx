"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      <span className="inline-flex items-center gap-2.5 mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-purple-light">
        <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-purple to-pink" />
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
