"use client";

import Image from "next/image";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: string;
  category: string;
  image: string;
  gradient: string;
  index: number;
}

export default function EventCard({
  title,
  date,
  location,
  price,
  category,
  image,
  gradient,
}: EventCardProps) {
  return (
    <div className="group relative cursor-pointer">
      {/* Gradient left border */}
      <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b ${gradient} opacity-60 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2 transition-all duration-500`} />

      {/* Card body */}
      <div className="relative ml-5 p-5 rounded-xl bg-navy-light/60 border border-glass-border hover:border-purple/20 transition-all duration-500 hover:bg-navy-light/80">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden relative">
            <Image
              src={image}
              alt={title}
              fill
              sizes="80px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Category + price row */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className={`flex items-center justify-center w-5 h-5 rounded bg-gradient-to-br ${gradient} text-white`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  {category}
                </span>
              </div>
              <span className={`text-base font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {price}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-purple-light transition-colors duration-300 truncate">
              {title}
            </h3>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {date}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
          <span className="text-sm text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
            View details
          </span>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${gradient} opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
