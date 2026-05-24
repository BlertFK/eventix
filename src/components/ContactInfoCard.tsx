"use client";

import { motion } from "framer-motion";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  gradient: string;
  index: number;
}

export default function ContactInfoCard({
  icon,
  label,
  value,
  subValue,
  gradient,
  index,
}: ContactInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-start gap-4 p-5 rounded-2xl bg-glass/40 border border-glass-border hover:border-purple/30 backdrop-blur-sm hover:bg-glass/60 transition-all duration-300 overflow-hidden relative"
    >
      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />

      {/* Icon */}
      <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
        <div className="w-full h-full rounded-xl bg-navy flex items-center justify-center text-white">
          {icon}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-white group-hover:text-purple-light transition-colors duration-300">
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-gray-500 mt-0.5">{subValue}</p>
        )}
      </div>
    </motion.div>
  );
}
