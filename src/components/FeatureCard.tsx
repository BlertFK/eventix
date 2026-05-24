"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 md:p-8 rounded-2xl bg-glass/40 border border-glass-border hover:border-purple/30 backdrop-blur-sm hover:bg-glass/60 transition-all duration-500 cursor-default overflow-hidden"
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

      {/* Icon */}
      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <div className="w-full h-full rounded-xl bg-navy flex items-center justify-center text-white">
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-light transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
        {description}
      </p>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />
    </motion.div>
  );
}
