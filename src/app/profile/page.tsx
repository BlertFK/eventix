"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Ticket, Shield, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
}

interface Order {
  _id: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "tickets", label: "My Tickets", icon: Ticket },
  { id: "security", label: "Security", icon: Shield },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileForm>();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "",
        bio: "",
        location: "",
      });
      fetch("/api/orders")
        .then((r) => r.json())
        .then((data) => setOrders(data.orders || []))
        .catch(() => {});
    }
  }, [session, reset]);

  const onSaveProfile = async (data: ProfileForm) => {
    setSaving(true);
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast("Profile updated successfully", "success");
    } catch {
      toast("Failed to update profile", "error");
    }
    setSaving(false);
  };

  if (status === "loading") return null;
  if (!session) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white text-xl font-bold">
                {session.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{session.user?.name}</h1>
                <p className="text-gray-400 text-sm">{session.user?.email}</p>
              </div>
            </div>

            <div className="flex gap-1 p-1 rounded-xl bg-glass/50 border border-glass-border w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple to-pink text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-glass/50 border border-glass-border p-6"
          >
            {activeTab === "personal" && (
              <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4 max-w-lg">
                <Input label="Full Name" {...register("name")} />
                <Input label="Email" type="email" {...register("email")} disabled />
                <Input label="Phone" type="tel" placeholder="+1 234 567 890" {...register("phone")} />
                <Input label="Location" placeholder="City, Country" {...register("location")} />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
                  <textarea
                    {...register("bio")}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 resize-none transition-all"
                  />
                </div>
                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No tickets purchased yet.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="flex items-center gap-4 p-4 rounded-lg border border-glass-border">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center shrink-0">
                        <Ticket className="w-5 h-5 text-purple-light" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{order.eventName}</p>
                        <p className="text-xs text-gray-500">{order.ticketType} x{order.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${order.totalPrice}</p>
                        <span className={`text-xs ${order.status === "confirmed" ? "text-green-400" : "text-yellow-400"}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4 max-w-lg">
                <Input label="Current Password" type="password" placeholder="Enter current password" />
                <Input label="New Password" type="password" placeholder="Enter new password" />
                <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                <Button>Update Password</Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
