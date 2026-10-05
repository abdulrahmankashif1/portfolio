"use client";

import { useEffect, ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();

  useEffect(() => {
    // Ensure scroll position is restored on navigation
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return <>{children}</>;
}