"use client";

import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

export default function CartPage() {
  const { data: session } = useSession();
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!session) {
      toast("Please sign in to checkout", "error");
      return;
    }

    try {
      for (const item of items) {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: item.eventId,
            eventName: item.eventName,
            ticketType: item.ticketType,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          }),
        });
      }
      clearCart();
      toast("Order confirmed! Check your dashboard for details.", "success");
    } catch {
      toast("Checkout failed. Please try again.", "error");
    }
  };

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
            <h1 className="text-3xl font-bold text-white mb-1">Your Cart</h1>
            <p className="text-gray-400">{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
          </motion.div>

          {items.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag className="w-16 h-16" />}
              title="Your cart is empty"
              description="Browse events and add tickets to your cart to get started."
              actionLabel="Explore Events"
              actionHref="/events"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.eventId}-${item.ticketType}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-4 rounded-xl bg-glass/50 border border-glass-border"
                  >
                    <img
                      src={item.eventImage}
                      alt={item.eventName}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{item.eventName}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{item.ticketType}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(item.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.eventId, item.ticketType, item.quantity - 1)}
                            className="w-7 h-7 rounded-md bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.eventId, item.ticketType, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-purple-light font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item.eventId, item.ticketType)}
                            className="p-1.5 rounded-md hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-28 rounded-xl bg-glass/50 border border-glass-border p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Service fee</span>
                      <span>${(totalPrice * 0.05).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-glass-border flex justify-between">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-light to-pink bg-clip-text text-transparent">
                      ${(totalPrice * 1.05).toFixed(2)}
                    </span>
                  </div>
                  <Button fullWidth onClick={handleCheckout}>
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Link href="/events" className="block text-center text-sm text-gray-500 hover:text-purple-light transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
