"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let destroyed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        if (destroyed) return;
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      const cleanup = () => lenis.destroy();
      (SmoothScroll as unknown as Record<string, () => void>)._cleanup = cleanup;
    });

    return () => {
      destroyed = true;
      const cleanup = (SmoothScroll as unknown as Record<string, (() => void) | undefined>)._cleanup;
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}
