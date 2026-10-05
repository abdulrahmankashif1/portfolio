"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo, createElement, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

interface ToastContextType {
  toasts: Toast[];
  toast: (props: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return createElement(
    ToastContext.Provider,
    { value },
    children,
    createElement(ToastViewport, { toasts, dismiss })
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastViewportProps {
  toasts: Toast[];
  dismiss: (id: string) => void;
}

function ToastViewport({ toasts, dismiss }: ToastViewportProps) {
  return createElement(
    "div",
    { className: "fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none", "aria-live": "polite", "aria-label": "Notifications" },
    createElement(
      AnimatePresence,
      null,
      toasts.map((toast) =>
        createElement(
          motion.div,
          {
            key: toast.id,
            initial: { opacity: 0, x: 100, scale: 0.95 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: 100, scale: 0.95 },
            transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
            className: cn(
              "pointer-events-auto w-full max-w-sm rounded-xl border bg-white/5 p-4 backdrop-blur-md shadow-xl",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]",
              toast.variant === "destructive" && "border-red-500/30 bg-red-500/10",
              toast.variant === "success" && "border-green-500/30 bg-green-500/10",
              toast.variant === "default" && "border-white/10"
            ),
            role: "alert"
          },
          createElement(
            "div",
            { className: "flex items-start gap-3" },
            createElement(
              "div",
              {
                className: cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center mt-0.5",
                  toast.variant === "destructive" && "text-red-400",
                  toast.variant === "success" && "text-green-400",
                  toast.variant === "default" && "text-blue-400"
                )
              },
              toast.variant === "destructive" && createElement(AlertCircle, { className: "h-5 w-5" }),
              toast.variant === "success" && createElement(CheckCircle, { className: "h-5 w-5" }),
              toast.variant === "default" && createElement(Info, { className: "h-5 w-5" })
            ),
            createElement(
              "div",
              { className: "flex-1 min-w-0" },
              createElement("p", { className: "font-medium text-white" }, toast.title),
              toast.description && createElement("p", { className: "mt-1 text-sm text-zinc-400" }, toast.description)
            ),
            createElement(
              "button",
              {
                onClick: () => dismiss(toast.id),
                className: "flex shrink-0 items-center justify-center p-1 text-zinc-500 hover:text-white transition-colors",
                "aria-label": "Dismiss notification"
              },
              createElement(X, { className: "h-4 w-4" })
            )
          )
        )
      )
    )
  );
}