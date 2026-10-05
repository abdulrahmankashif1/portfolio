"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export function MagneticButton({
  children,
  className,
  asChild = false,
  href,
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const ref = href ? linkRef : buttonRef;

  useEffect(() => {
    if (prefersReducedMotion || !ref.current || disabled) return;

    const element = ref.current;

    const onMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const onLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovering(false);
    };

    const onEnter = () => {
      setIsHovering(true);
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    element.addEventListener("mouseenter", onEnter);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      element.removeEventListener("mouseenter", onEnter);
    };
  }, [prefersReducedMotion, href, disabled]);

  const style = {
    transform: prefersReducedMotion ? undefined : `translate(${position.x}px, ${position.y}px)`,
    transition: prefersReducedMotion ? "none" : "transform 0.15s ease-out",
  };

  const baseClassName = cn(
    "relative inline-flex items-center justify-center overflow-hidden",
    "rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a]",
    "hover:bg-white/90 transition-colors duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <a
        ref={linkRef}
        href={href}
        className={baseClassName}
        style={style}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (asChild) {
    return (
      <button
        ref={buttonRef}
        type={type}
        disabled={disabled}
        className={baseClassName}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className={baseClassName}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}