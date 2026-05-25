"use client";

import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
  index: number;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      { rootMargin: "-100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter({
  value,
  suffix,
  label,
}: StatsCounterProps) {
  return (
    <div className="text-center p-6">
      <div className="mb-2">
        <span className="inline-block text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-light via-pink to-cyan bg-clip-text text-transparent py-2" style={{ lineHeight: 1 }}>
          <Counter value={value} suffix={suffix} />
        </span>
      </div>
      <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
