import {FinishResponse, PluginMessage} from "../shared";
import {extractInfoAndMetadata} from "./extractors";

browser.runtime.onMessage.addListener(async (message: PluginMessage, _sender, _sendResponse) => {
  console.info(message);
  try {
    if (message.type !== "CAPTURE_REQUEST") return;

    const selection = window.getSelection();
    console.info("Selection: ", selection);
    if (!selection || selection.toString().length !== 1) {
      console.error("No Glyph Selection");
      return { type: "ERROR", reason: "Selection must be exactly one glyph" };
    }

    const range = selection.getRangeAt(0);
    const bbox = range.getBoundingClientRect();
    console.info("BBox:", bbox);

    const devicePixelRatio = window.devicePixelRatio;

    const [info, metadata] = extractInfoAndMetadata(range);

    selection.removeAllRanges();  // otherwise the highlight will be in the screenshot

    // await browser.tabs.sendMessage(sender.tab!.id!, <FinishResponse>{
    await browser.runtime.sendMessage(<FinishResponse>{
      type: "FINISH_RESPONSE",
      devicePixelRatio,
      bbox,
      info,
      metadata,
    });
  } catch (e) {
    console.error("GlyphCapture:", e);
  }
});
