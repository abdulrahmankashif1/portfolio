"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface CursorProps {
  className?: string;
}

export function Cursor({ className }: CursorProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animateFollower = () => {
      if (!followerRef.current) return;

      const dx = position.x - followerPosition.x;
      const dy = position.y - followerPosition.y;

      const newX = followerPosition.x + dx * 0.15;
      const newY = followerPosition.y + dy * 0.15;

      setFollowerPosition({ x: newX, y: newY });
      animationFrameRef.current = requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateFollower();

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, .cursor-hover"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [prefersReducedMotion, position, followerPosition]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 z-[9999] pointer-events-none h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200",
          isHovering && "scale-150",
          className
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className={cn(
          "fixed top-0 left-0 z-[9998] pointer-events-none h-8 w-8 rounded-full border border-white/30 transition-all duration-300",
          isHovering && "h-16 w-16 border-white/50 bg-white/10",
          className
        )}
        style={{
          transform: `translate(${followerPosition.x}px, ${followerPosition.y}px) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}