import {
  GlyphCaptureInfo, GlyphColorMetadata,
  GlyphFontMetadata,
  GlyphMetadata,
  GlyphOutlineMetadata,
  GlyphStrokeMetadata,
} from "../shared";
import {
  getEffectiveElement,
  normalizeColor,
  normalizeFontFamily,
  normalizeFontFeatures,
  resolveEffectiveBackgroundColor
} from "./helper";

export function extractInfoAndMetadata(range: Range): [GlyphCaptureInfo, GlyphMetadata] {
  const text = range.toString();

  const element = getEffectiveElement(range);

  const info: GlyphCaptureInfo = {
    text,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  }

  const metadata: GlyphMetadata = {
    ...extractFontMetadata(element),
    ...extractColorMetadata(element),
    ...extractTextStrokeMetadata(element),
    ...extractOutlineMetadata(element),
  };

  return [info, metadata];
}

function extractFontMetadata(element: Element): GlyphFontMetadata {
  const computed = window.getComputedStyle(element);
  return {
    fontFamily: normalizeFontFamily(computed.fontFamily),
    fontFeatureSettings: normalizeFontFeatures(computed.fontFeatureSettings),
    fontSize: computed.fontSize,
    fontWeight: computed.fontWeight,
    fontStyle: computed.fontStyle,

    lineHeight: computed.lineHeight,
    letterSpacing: computed.letterSpacing,
  };
}

function extractColorMetadata(element: Element): GlyphColorMetadata {
  const computed = window.getComputedStyle(element);
  return {
    color: normalizeColor(computed.color)!,
    backgroundColor: resolveEffectiveBackgroundColor(element),
    colorScheme: computed.colorScheme,
  };
}

function extractTextStrokeMetadata(element: Element): GlyphStrokeMetadata {
  const computed = window.getComputedStyle(element);
  const strokeColor = normalizeColor(computed.getPropertyValue("-webkit-text-stroke-color"));
  const strokeWidth = computed.getPropertyValue("-webkit-text-stroke-width");
  if (strokeColor === null || strokeWidth === "0px") {
    return { textStrokeColor: null, textStrokeWidth: null };
  }
  return {
    textStrokeColor: strokeColor,
    textStrokeWidth: strokeWidth,
  };
}

function extractOutlineMetadata(element: Element): GlyphOutlineMetadata {
  const computed = window.getComputedStyle(element);
  const hasOutline = computed.outlineStyle !== "none";
  if (!hasOutline) {
    return { outlineColor: null, outlineOffset: null, outlineWidth: null, outlineStyle: "none" };
  }
  return {
    outlineColor: normalizeColor(computed.outlineColor)!,
    outlineOffset: computed.outlineOffset,
    outlineStyle: computed.outlineStyle,
    outlineWidth: computed.outlineWidth,
  };
}
