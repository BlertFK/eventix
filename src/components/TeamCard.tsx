"use client";

import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  bio: string;
  index: number;
}

export default function TeamCard({
  name,
  role,
  initials,
  gradient,
  bio,
  index,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-glass/40 border border-glass-border hover:border-purple/30 backdrop-blur-sm hover:bg-glass/60 transition-all duration-500 text-center overflow-hidden"
    >
      {/* Avatar */}
      <div className="relative mx-auto mb-4 w-20 h-20">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-105 transition-transform duration-300`}>
          <div className="w-full h-full rounded-full bg-navy-light flex items-center justify-center">
            <span className={`text-xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
              {initials}
            </span>
          </div>
        </div>
        {/* Online indicator */}
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-cyan border-2 border-navy" />
      </div>

      <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-light transition-colors duration-300">
        {name}
      </h3>
      <p className={`text-xs font-semibold tracking-widest uppercase mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {role}
      </p>
      <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
        {bio}
      </p>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />
    </motion.div>
  );
}
