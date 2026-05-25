"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCart();

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  return (
    <LazyMotion features={domAnimation}>
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 md:bg-background/80 md:backdrop-blur-xl border-b border-purple/10 shadow-lg shadow-purple/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
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
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(link.href) ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple to-pink transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/search" className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search className="w-4 h-4" />
              </Link>
              <Link href="/cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-purple to-pink text-[10px] text-white font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {session ? (
                <div className="flex items-center gap-3 ml-2">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                  <Link href="/admin" className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white text-xs font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link href="/register" className="relative group px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple via-pink to-cyan opacity-100 group-hover:opacity-90 transition-opacity" />
                    <span className="absolute inset-[1px] bg-navy rounded-full group-hover:bg-navy/80 transition-colors" />
                    <span className="relative bg-gradient-to-r from-purple-light via-pink to-cyan bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                      Register
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-[60] p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[8px]" : ""}`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-200 ${mobileOpen ? "opacity-0 -translate-x-5" : ""}`}
                />
                <span
                  className={`block h-0.5 bg-current origin-center ml-auto transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[8px] w-full" : "w-[60%]"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-4xl font-bold py-3 transition-all duration-300 ${
                        isActive(link.href)
                          ? "bg-gradient-to-r from-purple via-pink to-cyan bg-clip-text text-transparent"
                          : "text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple hover:via-pink hover:to-cyan hover:bg-clip-text"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Auth buttons */}
              <div className="flex gap-4 mt-12">
                {session ? (
                  <>
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="px-8 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors rounded-full border border-glass-border hover:border-purple/30"
                    >
                      Admin Panel
                    </Link>
                    <button
                      onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="px-8 py-3 text-base font-semibold text-white rounded-full bg-gradient-to-r from-purple to-pink hover:shadow-lg hover:shadow-purple/25 transition-all duration-300 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-8 py-3 text-base font-medium text-gray-300 hover:text-white transition-colors rounded-full border border-glass-border hover:border-purple/30"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-8 py-3 text-base font-semibold text-white rounded-full bg-gradient-to-r from-purple to-pink hover:shadow-lg hover:shadow-purple/25 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Bottom branding */}
              <p className="absolute bottom-8 text-xs text-gray-600 tracking-widest uppercase">
                Eventix
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
    </LazyMotion>
  );
}
