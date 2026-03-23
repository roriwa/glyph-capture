import parseRgba from "color-rgba";
import {BBox, RGBATuple} from "../shared";


export function getEffectiveElement(range: Range): Element {
  const container = range.startContainer;

  if (container.nodeType === Node.TEXT_NODE) {
    return container.parentElement ?? document.body;
  }

  if (container instanceof Element) {
    return container;
  }

  return document.body;
}

export function normalizeFontFamily(value: string): string[] {
  return value
      .split(",")
      .map(f => f.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean)
}

export function normalizeFontFeatures(value: string): string[] {
  if (!value || value === "normal") return [];

  return value
      .split(",")
      .map(f => f.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
}

export function resolveEffectiveBackgroundColor(element: Element): RGBATuple {
  let current: Element | null = element;

  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);

    const bg = normalizeColor(style.backgroundColor);

    if (bg && !isTransparent(bg)) {
      return bg;
    }

    current = current.parentElement;
  }

  const rootBg = window
      .getComputedStyle(document.documentElement)
      .backgroundColor;

  console.log("resolveEffectiveBackgroundColor fallback document", rootBg);
  return normalizeColor(rootBg) ?? [0, 0, 0, 0];
}

function isTransparent(color: RGBATuple): boolean {
  const [_r, _g, _b, a] = color;
  return a === 0;
}

export function normalizeColor(color: string): RGBATuple | null {
  const rgba = parseRgba(color);
  return rgba.length > 0 ? rgba as RGBATuple : null;
}
