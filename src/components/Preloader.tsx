"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  className?: string;
  onComplete?: () => void;
}

export function Preloader({ className, onComplete }: PreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true);
      onComplete?.();
      return;
    }

    // Counter animation 0-100
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          setShowCurtain(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 30);

    // Curtain wipe and complete
    const curtainTimeout = setTimeout(() => {
      setIsLoaded(true);
      onComplete?.();
    }, 2000);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(curtainTimeout);
    };
  }, [prefersReducedMotion, onComplete]);

  if (isLoaded) return null;

  return (
    <AnimatePresence mode="wait">
      <div
        className={cn(
          "fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a]",
          className
        )}
        role="status"
        aria-label="Loading portfolio"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tight text-white">
            Abdul Rahman
          </div>

          <div className="font-mono text-8xl md:text-[10rem] font-bold text-white/80">
            {counter}%
          </div>

          <div className="h-px w-48 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Initializing portfolio...
          </p>
        </div>

        {/* Curtain wipe */}
        <AnimatePresence mode="wait">
          {showCurtain && (
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1, originY: 0 }}
              exit={{ scaleY: 0, originY: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#0a0a0a] z-10"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}