"use client";

import StatsCounter from "./StatsCounter";

const stats = [
  { value: 10, suffix: "K+", label: "Events" },
  { value: 500, suffix: "K+", label: "Tickets Sold" },
  { value: 50, suffix: "+", label: "Cities" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];

export default function Stats() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl bg-navy-light/80 border border-glass-border md:backdrop-blur-md md:bg-glass/50 p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <StatsCounter key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
