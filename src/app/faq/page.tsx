"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["General", "Tickets", "Payments", "Account"];

const faqs = [
  { category: "General", question: "What is Eventix?", answer: "Eventix is a platform for discovering, booking, and managing event tickets. From concerts to sports, we connect you with unforgettable experiences." },
  { category: "General", question: "How do I find events near me?", answer: "Use the search bar or browse the Events page. You can filter by category, city, and date to find events in your area." },
  { category: "General", question: "Can I organize my own event?", answer: "Yes! Contact our team to become an event organizer. We provide tools for ticketing, promotion, and attendee management." },
  { category: "Tickets", question: "How do I purchase tickets?", answer: "Find an event you like, select your ticket type and quantity, add to cart, and complete checkout. Your tickets will appear in your dashboard." },
  { category: "Tickets", question: "Can I get a refund on my tickets?", answer: "Refund policies vary by event. Generally, tickets can be refunded up to 48 hours before the event. Check the specific event page for details." },
  { category: "Tickets", question: "Are tickets transferable?", answer: "Yes, you can transfer tickets to another person through your profile. The recipient will need an Eventix account." },
  { category: "Payments", question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards, PayPal, and Apple Pay. All transactions are secured with industry-standard encryption." },
  { category: "Payments", question: "When will I be charged?", answer: "You are charged immediately upon completing your purchase. A confirmation email is sent with your receipt and ticket details." },
  { category: "Account", question: "How do I create an account?", answer: "Click the Register button, fill in your details, and verify your email. You can also sign up with Google or Facebook." },
  { category: "Account", question: "I forgot my password. What do I do?", answer: "Click 'Forgot password?' on the login page. We will send a reset link to your registered email address." },
  { category: "Account", question: "How do I delete my account?", answer: "Go to Profile > Security and click 'Delete Account'. Note that this action is permanent and cannot be undone." },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((faq) => {
    const matchCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch = !search || faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h1>
            <p className="text-gray-400 mb-6">Find answers to common questions about Eventix.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple to-pink text-white"
                    : "bg-glass/50 border border-glass-border text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl bg-glass/50 border border-glass-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No questions match your search.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
