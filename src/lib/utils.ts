import katex from "katex";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderMath(formula: string, displayMode = false) {
  return katex.renderToString(formula, {
    displayMode,
    strict: "ignore",
    throwOnError: false
  });
}
