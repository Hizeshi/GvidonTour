"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode, type TouchEventHandler } from "react";
import { useReveal } from "./useReveal";

interface RevealProps {
  children?: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  immediate?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
  as = "div",
  style,
  onTouchStart,
  onTouchEnd,
}: RevealProps) {
  const { ref, cls } = useReveal<HTMLElement>(immediate);
  const dcls = delay ? ` d${delay}` : "";
  const props = { ref, className: `${className} reveal${dcls}${cls}`.trim(), style, onTouchStart, onTouchEnd };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createElement(as, props as any, children);
}
