"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Star, Minus, Plus, ShoppingCart, Edit2, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

interface TicketType {
  name: string;
  price: number;
  available: number;
}

interface EventDetail {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  image: string;
  ticketsAvailable: number;
  ticketTypes: TicketType[];
  organizer: string;
}

interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function EventDetailClient({ event }: { event: EventDetail }) {
  const { data: session } = useSession();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const currentUserId = (session?.user as { id?: string })?.id;

  useEffect(() => {
    fetch(`/api/reviews?eventId=${event._id}`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {});
  }, [event._id]);

  const handleAddToCart = () => {
    const ticket = event.ticketTypes?.[selectedTicket];
    addItem({
      eventId: event._id,
      eventName: event.name,
      eventImage: event.image,
      eventDate: event.date,
      ticketType: ticket?.name || "General",
      price: ticket?.price || event.price,
      quantity,
    });
    toast("Added to cart!", "success");
  };

  const handleCreateReview = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event._id, rating: newRating, comment: newComment }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviews((prev) => [data.review, ...prev]);
        setNewComment("");
        setNewRating(5);
        toast("Review posted!", "success");
      } else {
        toast("Failed to post review", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    }
    setSubmitting(false);
  };

  const handleUpdateReview = async (id: string) => {
    if (!editComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: editRating, comment: editComment }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviews((prev) => prev.map((r) => (r._id === id ? data.review : r)));
        setEditingId(null);
        toast("Review updated!", "success");
      } else {
        toast("Failed to update review", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    }
    setSubmitting(false);
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        toast("Review deleted", "success");
      } else {
        toast("Failed to delete review", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    }
  };

  const startEdit = (review: Review) => {
    setEditingId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 rounded-md bg-purple/80 text-white text-xs font-medium">
                {event.category}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{event.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.venue}, {event.city}
                  </span>
                  {avgRating && (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {avgRating} ({reviews.length} reviews)
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-glass/50 border border-glass-border p-6">
                <h2 className="text-lg font-semibold text-white mb-3">About This Event</h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>

              <div className="rounded-xl bg-glass/50 border border-glass-border p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Reviews</h2>

                {session?.user && (
                  <div className="mb-6 pb-6 border-b border-glass-border">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewRating(i + 1)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${i < newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-600 hover:text-yellow-400"}`}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your review..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 resize-none transition-all mb-3"
                    />
                    <Button onClick={handleCreateReview} disabled={submitting || !newComment.trim()}>
                      {submitting ? "Posting..." : "Post Review"}
                    </Button>
                  </div>
                )}

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="pb-4 border-b border-glass-border last:border-0 last:pb-0">
                        {editingId === review._id ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setEditRating(i + 1)}
                                  className="cursor-pointer"
                                >
                                  <Star
                                    className={`w-4 h-4 transition-colors ${i < editRating ? "fill-yellow-400 text-yellow-400" : "text-gray-600 hover:text-yellow-400"}`}
                                  />
                                </button>
                              ))}
                            </div>
                            <textarea
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg bg-glass/50 border border-glass-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple/30 resize-none text-sm"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdateReview(review._id)}
                                disabled={submitting}
                                className="px-3 py-1.5 rounded-lg bg-purple/20 text-purple-light text-xs font-medium hover:bg-purple/30 transition-colors cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1.5 rounded-lg bg-glass border border-glass-border text-gray-400 text-xs hover:text-white transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white text-xs font-bold">
                                  {review.userName.charAt(0)}
                                </div>
                                <span className="text-white text-sm font-medium">{review.userName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                                    />
                                  ))}
                                </div>
                                {currentUserId === review.userId && (
                                  <div className="flex items-center gap-1 ml-2">
                                    <button
                                      onClick={() => startEdit(review)}
                                      className="p-1 rounded hover:bg-glass text-gray-500 hover:text-white transition-colors cursor-pointer"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteReview(review._id)}
                                      className="p-1 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm">{review.comment}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 rounded-xl bg-glass/50 border border-glass-border p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white">Get Tickets</h3>

                {event.ticketTypes && event.ticketTypes.length > 0 ? (
                  <div className="space-y-2">
                    {event.ticketTypes.map((ticket, i) => (
                      <button
                        key={ticket.name}
                        onClick={() => setSelectedTicket(i)}
                        className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedTicket === i
                            ? "border-purple bg-purple/10"
                            : "border-glass-border hover:border-purple/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium">{ticket.name}</span>
                          <span className="text-purple-light font-bold">${ticket.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{ticket.available} available</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-glass-border">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">General Admission</span>
                      <span className="text-purple-light font-bold">${event.price}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-medium w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-lg bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-glass-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-light to-pink bg-clip-text text-transparent">
                      ${((event.ticketTypes?.[selectedTicket]?.price || event.price) * quantity).toFixed(2)}
                    </span>
                  </div>
                  <Button fullWidth onClick={handleAddToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{event.ticketsAvailable} tickets remaining</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
