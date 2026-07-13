"use client";

/** Dual-thumb numeric range slider. Two overlapping native <input type="range">
 *  elements share one track; each is pointer-events:none except its thumb
 *  (styled via the .range-input CSS in globals.css), so both thumbs stay
 *  independently draggable without a dedicated slider library. */
interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  minLabel?: string;
  maxLabel?: string;
}

export default function RangeSlider({ min, max, step = 1, value, onChange, minLabel, maxLabel }: RangeSliderProps) {
  const [lo, hi] = value;
  const span = max - min || 1;
  const pct = (n: number) => ((n - min) / span) * 100;

  return (
    <div className="relative h-[48px] w-full">
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-content/15" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-gold"
        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
      />
      <input
        type="range"
        className="range-input"
        min={min}
        max={max}
        step={step}
        value={lo}
        aria-label={minLabel}
        onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
      />
      <input
        type="range"
        className="range-input z-[1]"
        min={min}
        max={max}
        step={step}
        value={hi}
        aria-label={maxLabel}
        onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
      />
    </div>
  );
}
