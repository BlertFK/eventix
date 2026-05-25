"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/ui/EmptyState";

interface Event {
  _id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  image: string;
  ticketsAvailable: number;
}

const categories = ["all", "music", "sports", "arts", "tech", "food", "comedy"];
const ITEMS_PER_PAGE = 12;

export default function EventsClient({ initialEvents }: { initialEvents: Event[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = initialEvents.filter((event) => {
    const matchCategory = category === "all" || event.category === category;
    const matchSearch = !search ||
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.city.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Explore Events</h1>
            <p className="text-gray-400">Find your next unforgettable experience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search events, venues, cities..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Filter className="w-4 h-4 text-gray-500 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    category === cat
                      ? "bg-gradient-to-r from-purple to-pink text-white"
                      : "bg-glass/50 border border-glass-border text-gray-400 hover:text-white"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {paginated.length === 0 ? (
            <EmptyState
              icon={<Search className="w-16 h-16" />}
              title="No events found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginated.map((event, i) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/events/${event._id}`}>
                      <div className="group rounded-xl bg-glass/50 border border-glass-border overflow-hidden hover:border-purple/30 transition-all duration-300">
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs text-white font-medium">
                            {event.category}
                          </div>
                          {event.ticketsAvailable < 20 && (
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-red-500/80 text-xs text-white font-medium">
                              Few left
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-semibold mb-2 group-hover:text-purple-light transition-colors truncate">
                            {event.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            <span className="text-gray-600">at</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{event.venue}, {event.city}</span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-light to-pink bg-clip-text text-transparent">
                              ${event.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {event.ticketsAvailable} tickets left
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg bg-glass/50 border border-glass-border text-gray-400 disabled:opacity-30 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                    Math.max(0, page - 3),
                    page + 2
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        p === page
                          ? "bg-gradient-to-r from-purple to-pink text-white"
                          : "bg-glass/50 border border-glass-border text-gray-400 hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg bg-glass/50 border border-glass-border text-gray-400 disabled:opacity-30 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
