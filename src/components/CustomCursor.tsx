"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      return interactives;
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    const interactives = addHoverListeners();

    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0, ease: "linear" }}
      >
        <div className={`rounded-full bg-white transition-all duration-200 ${isHovering ? "w-3 h-3" : "w-2 h-2"}`} />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <div className={`w-10 h-10 rounded-full border transition-colors duration-200 ${isHovering ? "border-purple-light/80" : "border-white/30"}`} />
      </motion.div>
    </>
  );
}
