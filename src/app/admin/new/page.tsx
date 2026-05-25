"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function NewEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session && (session.user as { role?: string })?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    let imageUrl = "";
    const fileInput = form.get("image") as File;
    if (fileInput && fileInput.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", fileInput);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadJson = await uploadRes.json();
      if (uploadRes.ok) {
        imageUrl = uploadJson.url;
      } else {
        toast("Image upload failed", "error");
        return;
      }
    }

    const body = {
      name: form.get("name"),
      date: form.get("date"),
      time: form.get("time"),
      venue: form.get("venue"),
      city: form.get("city"),
      category: form.get("category"),
      price: Number(form.get("price")),
      tickets: Number(form.get("tickets")),
      ticketsAvailable: Number(form.get("tickets")),
      image: imageUrl,
      description: form.get("description"),
      status: "active",
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast("Event created successfully!", "success");
        router.push("/admin");
      } else {
        toast("Failed to create event", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    }
  };

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-glass/50 border border-glass-border p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" label="Event Name" placeholder="Enter event name" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="date" label="Date" type="date" required />
                <Input name="time" label="Time" placeholder="7:00 PM" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="venue" label="Venue" placeholder="Venue name" required />
                <Input name="city" label="City" placeholder="City name" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="category" label="Category" placeholder="music, sports, tech..." required />
                <Input name="price" label="Price ($)" type="number" placeholder="0" required />
              </div>
              <Input name="tickets" label="Total Tickets" type="number" placeholder="100" required />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Event Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple/20 file:text-purple-light file:text-sm file:font-medium file:cursor-pointer transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Describe the event..."
                  className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 resize-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" fullWidth>Create Event</Button>
                <Link href="/admin" className="w-full">
                  <Button type="button" variant="secondary" fullWidth>Cancel</Button>
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
