import {BBox, GlyphCaptureInfo, GlyphMetadata} from "./types";

export type PluginMessage =
  | CaptureRequest
  | FinishResponse

export type CaptureRequest = {
  type: "CAPTURE_REQUEST"
}

export type FinishResponse = {
  type: "FINISH_RESPONSE"
  devicePixelRatio: number
  bbox: BBox
  info: GlyphCaptureInfo
  metadata: GlyphMetadata
}
