"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  separator?: string;
}

export function Marquee({
  items,
  className,
  speed = 40,
  direction = "left",
  separator = "·",
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  // Duration scales with speed so longer lists don't race
  const duration = Math.max(18, (items.length * 12) / speed) * 2;

  if (prefersReducedMotion) {
    return (
      <div
        className={cn("hide-scrollbar overflow-x-auto", className)}
        role="list"
        aria-label="Skills"
      >
        <ul className="flex w-max items-center gap-3 px-4 py-1" role="list">
          {items.map((item, i) => (
            <li
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 px-4 py-1.5 text-sm uppercase tracking-[0.1em] text-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      aria-label="Skills and technologies"
    >
      {/* Two identical tracks = seamless loop */}
      <div
        className="flex w-max shrink-0 items-center gap-3 py-1 pr-3 group-hover:[animation-play-state:paused] motion-reduce:hidden"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-3"
            role="list"
            aria-hidden={copy === 1}
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 whitespace-nowrap text-sm uppercase tracking-[0.1em] text-zinc-400"
              >
                {item}
                <span className="text-indigo-500/60" aria-hidden="true">
                  {separator}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}