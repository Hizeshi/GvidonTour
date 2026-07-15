"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Check, TriangleAlert, X } from "lucide-react";
import { cx } from "@/lib/ui";

type ToastKind = "success" | "error";

interface ToastItem {
  id: number;
  kind: ToastKind;
  text: string;
}

const DURATION_MS = 4000;

const ToastContext = createContext<(kind: ToastKind, text: string) => void>(() => {});

/** Fire-and-forget notifications: toast.success("Тур сохранён").
 *  The provider sits in the panel layout, above the pages, so a toast raised
 *  right before router.push() survives the navigation and is still on screen
 *  when the list renders. */
export function useToast() {
  const show = useContext(ToastContext);
  return {
    success: (text: string) => show("success", text),
    error: (text: string) => show("error", text),
  };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (kind: ToastKind, text: string) => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list, { id, kind, text }]);
      setTimeout(() => remove(id), DURATION_MS);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-[min(360px,calc(100vw-40px))] flex-col gap-2.5"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cx(
              "pointer-events-auto flex animate-toast-in items-start gap-3 rounded-[5px] border bg-panel px-4 py-3.5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)]",
              toast.kind === "success" ? "border-gold/40" : "border-red-400/45"
            )}
          >
            <span
              className={cx(
                "lic mt-0.5 flex-none text-[17px]",
                toast.kind === "success" ? "text-gold" : "text-red-400"
              )}
            >
              {toast.kind === "success" ? <Check /> : <TriangleAlert />}
            </span>
            <span className="flex-1 text-[14px] font-semibold leading-snug text-content/85">{toast.text}</span>
            <button
              type="button"
              onClick={() => remove(toast.id)}
              aria-label="Закрыть"
              className="lic flex-none cursor-pointer text-[15px] text-content/35 transition-colors hover:text-content"
            >
              <X />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
