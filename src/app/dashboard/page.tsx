"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Ticket, Heart, Clock, TrendingUp, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

interface Order {
  _id: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
          <LoadingSkeleton count={6} />
        </main>
      </>
    );
  }

  if (!session) return null;

  const stats = [
    { label: "Upcoming Events", value: orders.filter((o) => o.status === "confirmed").length, icon: Calendar, color: "from-purple to-purple-light" },
    { label: "Total Tickets", value: orders.reduce((sum, o) => sum + o.quantity, 0), icon: Ticket, color: "from-pink to-rose-400" },
    { label: "Total Spent", value: `$${orders.reduce((sum, o) => sum + o.totalPrice, 0).toFixed(0)}`, icon: TrendingUp, color: "from-cyan to-blue-400" },
    { label: "Favorites", value: 0, icon: Heart, color: "from-orange-400 to-yellow-400" },
  ];

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
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome back, {session.user?.name?.split(" ")[0]}
            </h1>
            <p className="text-gray-400">Here is your event activity overview.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-glass/50 border border-glass-border backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : orders.length === 0 ? (
              <div className="text-center py-16 rounded-xl bg-glass/30 border border-glass-border">
                <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No orders yet</p>
                <p className="text-sm text-gray-500">Your purchased tickets will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 10).map((order, i) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-glass/50 border border-glass-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center shrink-0">
                      <Ticket className="w-5 h-5 text-purple-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{order.eventName}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.ticketType} x{order.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${order.totalPrice}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === "confirmed"
                          ? "bg-green-500/10 text-green-400"
                          : order.status === "cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
