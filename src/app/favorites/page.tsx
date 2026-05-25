"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useToast } from "@/components/ui/Toast";

interface FavoriteEvent {
  _id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  image: string;
  price: number;
  category: string;
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/favorites")
        .then((r) => r.json())
        .then((data) => {
          setFavorites(data.favorites || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const handleRemove = async (eventId: string) => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
    setFavorites((prev) => prev.filter((f) => f._id !== eventId));
    toast("Removed from favorites", "info");
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
          <LoadingSkeleton count={6} />
        </main>
      </>
    );
  }

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
            <h1 className="text-3xl font-bold text-white mb-1">My Favorites</h1>
            <p className="text-gray-400">Events you have saved for later.</p>
          </motion.div>

          {favorites.length === 0 ? (
            <EmptyState
              icon={<Heart className="w-16 h-16" />}
              title="No favorites yet"
              description="Start exploring events and save your favorites to find them easily later."
              actionLabel="Browse Events"
              actionHref="/events"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favorites.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-xl bg-glass/50 border border-glass-border overflow-hidden hover:border-purple/30 transition-all duration-300"
                >
                  <Link href={`/events/${event._id}`}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs text-white">
                        {event.category}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/events/${event._id}`}>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-purple-light transition-colors truncate">
                        {event.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-light to-pink bg-clip-text text-transparent">
                        ${event.price}
                      </span>
                      <button
                        onClick={() => handleRemove(event._id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
