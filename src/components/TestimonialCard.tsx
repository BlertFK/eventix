"use client";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  index: number;
}

export default function TestimonialCard({
  name,
  role,
  quote,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="relative p-6 md:p-8 rounded-2xl bg-navy-light/80 md:bg-glass/50 border border-glass-border md:backdrop-blur-md hover:border-purple/20 transition-all duration-300 h-full">

      {/* Quote mark */}
      <svg
        className="absolute top-4 right-4 w-10 h-10 text-purple/10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
      </svg>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-700"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white font-bold text-sm"
          style={{
            backgroundImage: avatar ? `url(${avatar})` : undefined,
            backgroundSize: "cover",
          }}
        >
          {!avatar && name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
