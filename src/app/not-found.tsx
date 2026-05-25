"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-purple/10 blur-[120px]"
          style={{ animation: "float 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-pink/10 blur-[120px]"
          style={{ animation: "float 15s ease-in-out infinite reverse" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-b from-purple-light via-pink to-transparent bg-clip-text text-transparent select-none"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mb-2 -mt-6"
          >
            Page Not Found
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm mb-8 max-w-md mx-auto"
          >
            The page you are looking for does not exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 justify-center"
          >
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
            <Link href="/events">
              <Button variant="secondary">Browse Events</Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
