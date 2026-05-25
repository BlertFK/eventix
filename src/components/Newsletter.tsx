"use client";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-pink/5 to-cyan/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/50 to-transparent" />

      {/* Floating orbs — hidden on mobile */}
      <div
        className="blur-orb absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple/10 blur-[100px]"
        style={{ animation: "float 12s ease-in-out infinite" }}
      />
      <div
        className="blur-orb absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan/10 blur-[100px]"
        style={{ animation: "float 15s ease-in-out infinite reverse" }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-2.5 mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-pink">
          <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-pink to-cyan" />
          Stay Updated
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Never Miss an Event
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-8">
          Subscribe to our newsletter and be the first to know about upcoming
          events, exclusive deals, and early-bird tickets.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 rounded-full bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-7 py-3.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple via-pink to-cyan hover:shadow-lg hover:shadow-purple/25 hover:brightness-110 transition-all duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-600">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
