import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import FeatureCard from "@/components/FeatureCard";
import TeamCard from "@/components/TeamCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Eventix",
  description:
    "Learn about Eventix — the platform built to connect people with the events they love.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const missionPoints = [
  {
    emoji: "🎯",
    title: "Our Mission",
    body: "To make every live experience accessible, memorable, and effortless — connecting millions of fans with the moments that matter most.",
  },
  {
    emoji: "💡",
    title: "Our Vision",
    body: "A world where discovering and attending events is as natural as scrolling your feed — instant, personal, and endlessly inspiring.",
  },
  {
    emoji: "🤝",
    title: "Our Values",
    body: "Transparency, trust, and community. We put attendees and organizers first in every decision we make.",
  },
];

const features = [
  {
    title: "Easy Discovery",
    description:
      "Powerful filters, personalised recommendations, and a beautiful browse experience that surfaces the events you actually care about.",
    gradient: "from-purple to-purple-light",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1 0 5.65 16.65 7 7 0 0 0 16.65 16.65z" />
      </svg>
    ),
  },
  {
    title: "Secure Booking",
    description:
      "End-to-end encryption, fraud detection, and instant digital tickets mean your purchase is always protected.",
    gradient: "from-pink to-purple",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
  },
  {
    title: "Lightning Fast",
    description:
      "From search to seat confirmation in under 60 seconds. Our infrastructure is built for high-demand on-sales and zero downtime.",
    gradient: "from-cyan to-purple",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Trusted Platform",
    description:
      "Over 500K tickets sold across 50+ cities with a 99% satisfaction rate. Trusted by organizers and attendees worldwide.",
    gradient: "from-purple to-pink",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Global Reach",
    description:
      "From intimate gallery openings to stadium concerts — Eventix spans every genre, city, and budget so no one misses out.",
    gradient: "from-pink to-cyan",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description:
      "Real humans, real help. Our support team is available around the clock so you are never left stranded before the show.",
    gradient: "from-cyan to-pink",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Blert Anadolli",
    role: "Co-Founder & CEO",
    initials: "AR",
    gradient: "from-purple to-pink",
    bio: "Former ticketing exec with 12 years building platforms that scale. Passionate about live music and making events accessible to all.",
  },
  {
    name: "Fadil Bajrami",
    role: "Co-Founder & CTO",
    initials: "MC",
    gradient: "from-cyan to-purple",
    bio: "Full-stack architect who led engineering at two unicorn startups. Obsessed with performance, reliability, and beautiful code.",
  },
  {
    name: "Lis Myftari",
    role: "Head of Product",
    initials: "JB",
    gradient: "from-pink to-cyan",
    bio: "Product thinker who has shipped over 30 consumer features loved by millions. Driven by empathy and data in equal measure.",
  },
  {
    name: "Rina Bashota",
    role: "Head of Design",
    initials: "ST",
    gradient: "from-purple to-cyan",
    bio: "Award-winning UX designer obsessed with delightful micro-interactions and interfaces that feel effortless the first time you use them.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          label="Our Story"
          title="We're on a mission to make"
          titleHighlight="every event unforgettable."
          description="Eventix was born from a simple frustration: buying tickets should be as exciting as the event itself. We built the platform we always wished existed."
          gradientFrom="from-purple"
          gradientTo="to-cyan"
        />

        {/* Mission */}
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple/5 blur-[150px] rounded-full" />
          <div className="relative max-w-7xl mx-auto">
            <SectionHeading
              label="Purpose"
              title="Why We Exist"
              description="Great events change lives. We exist to make sure no one ever misses one because of a bad booking experience."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missionPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="relative p-7 rounded-2xl bg-glass/40 border border-glass-border hover:border-purple/30 hover:bg-glass/60 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="text-3xl mb-4 block">{point.emoji}</span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-light transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    {point.body}
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple to-pink group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <Stats />

        {/* Why Choose Us */}
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink/5 blur-[150px] rounded-full" />
          <div className="relative max-w-7xl mx-auto">
            <SectionHeading
              label="Why Eventix"
              title="Built Different"
              description="We didn't patch existing infrastructure — we rebuilt the whole experience from scratch, with you in mind."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feat, i) => (
                <FeatureCard key={feat.title} {...feat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 blur-[150px] rounded-full" />
          <div className="relative max-w-7xl mx-auto">
            <SectionHeading
              label="The Team"
              title="People Behind the Platform"
              description="A small, passionate crew obsessed with live experiences, great design, and reliable software."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <TeamCard key={member.name} {...member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-pink/5 to-cyan/10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/50 to-transparent" />
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-purple/10 blur-[100px]"
            style={{ animation: "float 12s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan/10 blur-[100px]"
            style={{ animation: "float 15s ease-in-out infinite reverse" }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2.5 mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-purple-light">
              <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-purple to-pink" />
              Ready to Join?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Next Great Experience{" "}
              <span className="bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent">
                Is Waiting
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Thousands of events, one simple platform. Start exploring today — no account required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple via-pink to-cyan hover:shadow-lg hover:shadow-purple/25 hover:brightness-110 transition-all duration-300"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              >
                Explore Events
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-gray-300 rounded-full border border-glass-border hover:border-purple/30 hover:text-white transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
