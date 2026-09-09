"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

type Toast = { id: number; message: string; tone: "success" | "error" };

let pushToast: ((message: string, tone?: "success" | "error") => void) | null = null;

export function showAdminToast(message: string, tone: "success" | "error" = "success") {
  pushToast?.(message, tone);
}

export function AdminToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    pushToast = (message, tone = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => {
      pushToast = null;
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-24 right-8 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-xl",
            t.tone === "success"
              ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-100"
              : "border-red-500/30 bg-red-950/90 text-red-100"
          )}
        >
          {t.tone === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
