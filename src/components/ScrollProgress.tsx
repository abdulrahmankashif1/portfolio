"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      bar.style.opacity = scrollTop > 80 ? "1" : "0";
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px]"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 opacity-0"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}