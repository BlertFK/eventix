"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Browse Events",
    description:
      "Explore thousands of events across concerts, festivals, sports, theater, and more. Filter by date, location, or category.",
    gradient: "from-purple to-purple-light",
  },
  {
    number: "02",
    title: "Select & Book",
    description:
      "Choose your seats, pick your tickets, and checkout securely in seconds. Instant confirmation sent to your email.",
    gradient: "from-pink to-purple",
  },
  {
    number: "03",
    title: "Enjoy the Experience",
    description:
      "Show your digital ticket at the door and enjoy an unforgettable experience. Share the moments with friends.",
    gradient: "from-cyan to-pink",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple/5 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          label="How It Works"
          title="Three Simple Steps"
          description="Getting your tickets has never been easier. From discovery to experience, we have got you covered."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group cursor-pointer"
            >

              <div className="relative p-8 md:p-10 rounded-2xl hover:bg-glass/30 transition-all duration-500 h-full">
                {/* Large number */}
                <div className="relative mb-6">
                  <span className={`text-8xl md:text-9xl font-black bg-gradient-to-b ${step.gradient} bg-clip-text text-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-500 select-none leading-none`}>
                    {step.number}
                  </span>
                  <div className={`absolute bottom-1 left-1 w-12 h-1 rounded-full bg-gradient-to-r ${step.gradient} opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-500`} />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-light transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
