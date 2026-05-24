"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Events", href: "#events" },
  { name: "About", href: "#how-it-works" },
  { name: "Contact", href: "#newsletter" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-purple/10 shadow-lg shadow-purple/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple to-pink">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-light transition-colors">
                Eventix
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple to-pink group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                Log in
              </button>
              <button className="relative group px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-purple via-pink to-cyan opacity-100 group-hover:opacity-90 transition-opacity" />
                <span className="absolute inset-[1px] bg-navy rounded-full group-hover:bg-navy/80 transition-colors" />
                <span className="relative bg-gradient-to-r from-purple-light via-pink to-cyan bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                  Register
                </span>
              </button>
            </div>

            {/* Hamburger button - animated */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-[60] p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 8, width: "100%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 w-full bg-current origin-center"
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, x: -20 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-full bg-current"
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -8, width: "100%" }
                      : { rotate: 0, y: 0, width: "60%" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block h-0.5 bg-current origin-center ml-auto"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />

            {/* Decorative orbs */}
            <div
              className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-purple/15 blur-[100px]"
              style={{ animation: "float 12s ease-in-out infinite" }}
            />
            <div
              className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-pink/15 blur-[100px]"
              style={{ animation: "float 15s ease-in-out infinite reverse" }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.08,
                      ease: "easeOut",
                    }}
                    className="text-4xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple hover:via-pink hover:to-cyan hover:bg-clip-text transition-all duration-300 py-3"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Auth buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex gap-4 mt-12"
              >
                <button
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors rounded-full border border-glass-border hover:border-purple/30 cursor-pointer"
                >
                  Log in
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 text-base font-semibold text-white rounded-full bg-gradient-to-r from-purple to-pink hover:shadow-lg hover:shadow-purple/25 transition-all duration-300 cursor-pointer"
                >
                  Register
                </button>
              </motion.div>

              {/* Bottom branding */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 text-xs text-gray-600 tracking-widest uppercase"
              >
                Eventix
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
