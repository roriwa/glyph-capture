export type RGBATuple = [number, number, number, number];

export type BBox = {
  x: number
  y: number
  width: number
  height: number
}

export type GlyphCaptureInfo = {
  text: string
  url: string
  timestamp: string
}

export type GlyphMetadata =
  & GlyphFontMetadata
  & GlyphColorMetadata
  & GlyphStrokeMetadata
  & GlyphOutlineMetadata

export type GlyphFontMetadata = {
  fontFamily: string[]
  fontFeatureSettings: string[]
  fontSize: string
  fontWeight: string
  fontStyle: string

  lineHeight: string
  letterSpacing: string
}

export type GlyphColorMetadata = {
  color: RGBATuple
  backgroundColor: RGBATuple
  colorScheme: string
}

export type GlyphStrokeMetadata = {
  textStrokeColor: null
  textStrokeWidth: null
} | {
  textStrokeColor: RGBATuple
  textStrokeWidth: string
}

export type GlyphOutlineMetadata = {
  outlineColor: null
  outlineOffset: null
  outlineStyle: "none"
  outlineWidth: null
} | {
  outlineColor: RGBATuple
  outlineOffset: string
  outlineStyle: string
  outlineWidth: string
}

export type GlyphCaptureJson = GlyphCaptureInfo & {
  basename: string
  metadata: GlyphMetadata
}
