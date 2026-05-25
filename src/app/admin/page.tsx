"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Users, Calendar, DollarSign, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useToast } from "@/components/ui/Toast";

interface Event {
  _id: string;
  name: string;
  date: string;
  category: string;
  price: number;
  tickets: number;
  ticketsAvailable: number;
  status: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session && (session.user as { role?: string })?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    fetch("/api/events?limit=50")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast("Event deleted", "success");
    } catch {
      toast("Failed to delete event", "error");
    }
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

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar, color: "from-purple to-purple-light" },
    { label: "Revenue", value: `$${events.reduce((s, e) => s + e.price * (e.tickets - e.ticketsAvailable), 0).toLocaleString()}`, icon: DollarSign, color: "from-green-400 to-emerald-400" },
    { label: "Tickets Sold", value: events.reduce((s, e) => s + (e.tickets - e.ticketsAvailable), 0).toLocaleString(), icon: BarChart3, color: "from-pink to-rose-400" },
    { label: "Categories", value: new Set(events.map((e) => e.category)).size, icon: Users, color: "from-cyan to-blue-400" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Admin Panel</h1>
              <p className="text-gray-400">Manage events, users, and orders.</p>
            </div>
            <Link href="/admin/new">
              <Button className="flex items-center gap-2 whitespace-nowrap">
                <Plus className="w-4 h-4" />
                New Event
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-glass/50 border border-glass-border"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-glass/50 border border-glass-border overflow-hidden"
          >
            <div className="p-4 border-b border-glass-border">
              <h2 className="text-lg font-semibold text-white">All Events</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left p-4 text-gray-400 font-medium">Event</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Tickets</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="border-b border-glass-border last:border-0 hover:bg-glass/30">
                      <td className="p-4 text-white font-medium max-w-[200px] truncate">{event.name}</td>
                      <td className="p-4 text-gray-400">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md bg-purple/10 text-purple-light text-xs">
                          {event.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">${event.price}</td>
                      <td className="p-4 text-gray-400">{event.ticketsAvailable}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/edit/${event._id}`}
                            className="p-2 rounded-lg hover:bg-glass text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
