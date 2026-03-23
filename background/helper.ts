import {BBox} from "../shared";

export async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  const url = URL.createObjectURL(blob);
  try {
    await browser.downloads.download({
      url,
      filename,
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function downloadJson(obj: unknown, filename: string): Promise<void> {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  return await downloadBlob(blob, filename);
}

export function dataUriToBlob(dataUri: string) {
  const [meta, data] = dataUri.split(",", 2);

  const byteString = atob(data);
  const mimeString = meta.split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

export function applyPadding(rect: BBox, padding: number): BBox {
  return {
    x: rect.x - padding,
    y: rect.y - padding,
    width: rect.width + 2*padding,
    height: rect.height + 2*padding,
  }
}