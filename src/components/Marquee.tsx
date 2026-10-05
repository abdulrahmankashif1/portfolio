"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  paused?: boolean;
  direction?: "left" | "right";
}

export function Marquee({
  items,
  className,
  speed = 50,
  paused = false,
  direction = "left",
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [items]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("overflow-x-auto hide-scrollbar", className)} role="list" aria-label="Skills">
        <div className="flex gap-6 px-4 py-2" role="listitem">
          {items.map((item, index) => (
            <span key={index} className="px-4 py-1.5 text-sm uppercase tracking-[0.1em] text-zinc-400 border border-white/10 rounded-full whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const duration = contentWidth / speed;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      aria-label="Skills marquee"
      onMouseEnter={() => paused && contentRef.current?.style.setProperty("animation-play-state", "paused")}
      onMouseLeave={() => paused && contentRef.current?.style.setProperty("animation-play-state", "running")}
    >
      <div
        ref={contentRef}
        className="flex gap-6 px-4 py-2"
        role="list"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="px-4 py-1.5 text-sm uppercase tracking-[0.1em] text-zinc-400 border border-white/10 rounded-full whitespace-nowrap"
            role="listitem"
          >
            {item}
          </span>
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`${index}-duplicate`}
            className="px-4 py-1.5 text-sm uppercase tracking-[0.1em] text-zinc-400 border border-white/10 rounded-full whitespace-nowrap"
            role="listitem"
            aria-hidden="true"
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}