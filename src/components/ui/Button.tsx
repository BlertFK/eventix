"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-gradient-to-r from-purple via-pink to-cyan text-white hover:shadow-lg hover:shadow-purple/25 hover:brightness-110",
  secondary:
    "border border-glass-border text-gray-300 hover:text-white hover:border-purple/30 hover:bg-glass",
  danger:
    "border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300",
};

export default function Button({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
