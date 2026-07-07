"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";

interface Rates {
  USD: number;
  EUR: number;
  RUB: number;
}

const CACHE_KEY = "gv_fx_v1";
const CACHE_MS = 6 * 60 * 60 * 1000; // 6h

export default function CurrencyTicker() {
  const { t } = useLang();
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as { rates: Rates; ts: number };
        if (Date.now() - cached.ts < CACHE_MS) {
          setRates(cached.rates);
          return;
        }
      }
    } catch {
      // ignore malformed cache
    }

    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || data.result !== "success") return;
        const kzt = data.rates?.KZT;
        const eur = data.rates?.EUR;
        const rub = data.rates?.RUB;
        if (!kzt || !eur || !rub) return;
        const next: Rates = { USD: kzt, EUR: kzt / eur, RUB: kzt / rub };
        setRates(next);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ rates: next, ts: Date.now() }));
        } catch {
          // ignore quota errors
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!rates) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-content/55">
      <span className="font-bold uppercase tracking-[0.1em] text-gold/85">{t.currencyLabel}</span>
      <span>USD 1 = {rates.USD.toFixed(2)} ₸</span>
      <span>EUR 1 = {rates.EUR.toFixed(2)} ₸</span>
      <span>RUB 1 = {rates.RUB.toFixed(2)} ₸</span>
    </div>
  );
}
