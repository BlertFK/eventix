"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  eventId: string;
  eventName: string;
  eventImage: string;
  eventDate: string;
  ticketType: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (eventId: string, ticketType: string) => void;
  updateQuantity: (eventId: string, ticketType: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("eventix-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("eventix-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.eventId === item.eventId && i.ticketType === item.ticketType
      );
      if (existing) {
        return prev.map((i) =>
          i.eventId === item.eventId && i.ticketType === item.ticketType
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (eventId: string, ticketType: string) => {
    setItems((prev) => prev.filter((i) => !(i.eventId === eventId && i.ticketType === ticketType)));
  };

  const updateQuantity = (eventId: string, ticketType: string, quantity: number) => {
    if (quantity <= 0) return removeItem(eventId, ticketType);
    setItems((prev) =>
      prev.map((i) =>
        i.eventId === eventId && i.ticketType === ticketType ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
