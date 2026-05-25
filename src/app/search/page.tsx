"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

interface Event {
  _id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  image: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    fetch(`/api/events?search=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-4">Search Events</h1>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for events, artists, venues..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-glass/50 border border-glass-border text-white text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 transition-all"
              />
            </div>
          </motion.div>

          {loading && <LoadingSkeleton count={3} />}

          {!loading && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-1">No results found for "{query}"</p>
              <p className="text-sm text-gray-500">Try a different search term.</p>
            </motion.div>
          )}

          {!loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <p className="text-sm text-gray-500 mb-4">{results.length} result{results.length !== 1 ? "s" : ""} found</p>
              {results.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/events/${event._id}`}>
                    <div className="flex gap-4 p-4 rounded-xl bg-glass/50 border border-glass-border hover:border-purple/30 transition-all group">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium group-hover:text-purple-light transition-colors truncate">
                          {event.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.city}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-glass border border-glass-border">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-purple-light font-bold">${event.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!hasSearched && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16"
            >
              <p className="text-gray-500">Start typing to search for events...</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
