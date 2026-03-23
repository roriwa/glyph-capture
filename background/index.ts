import {CaptureRequest, GlyphCaptureInfo, GlyphCaptureJson, PluginMessage} from "../shared";
import {applyPadding, dataUriToBlob, downloadBlob, downloadJson} from "./helper";


const IMAGE_PADDING_PX = 2;


browser.runtime.onMessage.addListener(async (message: PluginMessage, sender) => {
  console.info(message);
  try {
    if (message.type === "FINISH_RESPONSE") {
      const dataUrl = await browser.tabs.captureVisibleTab(sender.tab?.windowId!, {
        format: "png",
        rect: applyPadding(message.bbox, IMAGE_PADDING_PX),
        scale: message.devicePixelRatio,
        resetScrollPosition: true,  // todo: validate
      });

      const basename = `glyph-${message.info.timestamp}`.replace(/:/g, "-");

      const blob = dataUriToBlob(dataUrl);
      const json: GlyphCaptureJson = {
        basename,
        ...message.info,
        metadata: message.metadata,
      };
      console.info(json);

      await downloadBlob(blob, `${basename}.png`);
      await downloadJson(json, `${basename}.json`);
    }
  } catch (error) {
    console.error(error);
  }
});


browser.browserAction.onClicked.addListener(async (tab, _info) => {
  if (!tab.id) return;
  try {
    console.log("Requesting Capture")
    await browser.tabs.sendMessage(tab.id!, <CaptureRequest>{
      type: "CAPTURE_REQUEST",
    });
  } catch (e) {
    console.error(e);
  }
});
