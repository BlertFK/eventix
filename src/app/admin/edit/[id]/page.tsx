"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useToast } from "@/components/ui/Toast";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  tickets: number;
  ticketsAvailable: number;
  image: string;
}

export default function EditEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session && (session.user as { role?: string })?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setEvent(data.event || null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!event) return;
    const form = new FormData(e.currentTarget);

    let imageUrl = event.image;
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
      const res = await fetch(`/api/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast("Event updated successfully!", "success");
        router.push("/admin");
      } else {
        toast("Failed to update event", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 px-4 max-w-2xl mx-auto">
          <LoadingSkeleton count={3} />
        </main>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 px-4 flex items-center justify-center">
          <p className="text-gray-400">Event not found.</p>
        </main>
        <Footer />
      </>
    );
  }

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
            <h1 className="text-3xl font-bold text-white">Edit Event</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-glass/50 border border-glass-border p-6"
          >
            {event.image && (
              <div className="mb-6 rounded-lg overflow-hidden h-48">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" label="Event Name" defaultValue={event.name} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="date" label="Date" type="date" defaultValue={event.date?.slice(0, 10)} required />
                <Input name="time" label="Time" defaultValue={event.time} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="venue" label="Venue" defaultValue={event.venue} required />
                <Input name="city" label="City" defaultValue={event.city} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="category" label="Category" defaultValue={event.category} required />
                <Input name="price" label="Price ($)" type="number" defaultValue={event.price} required />
              </div>
              <Input name="tickets" label="Total Tickets" type="number" defaultValue={event.tickets || event.ticketsAvailable} required />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Change Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple/20 file:text-purple-light file:text-sm file:font-medium file:cursor-pointer transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to keep the current image.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  defaultValue={event.description}
                  className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 resize-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" fullWidth>Save Changes</Button>
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
