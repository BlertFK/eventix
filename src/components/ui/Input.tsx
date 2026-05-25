"use client";

import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`w-full px-4 py-3 rounded-xl bg-glass border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300 ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : ""} ${isPassword ? "pr-11" : ""} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 animate-[fadeIn_0.2s_ease-in]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
