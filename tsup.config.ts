import {defineConfig} from "tsup";


export default defineConfig({
  entry: {
    background: "background/index.ts",
    content: "content/index.ts",
  },
  format: "iife",
  platform: "browser",
  target: "firefox115",
  bundle: true,
  sourcemap: true,
  clean: false,
  outDir: "dist",
  splitting: false,
  dts: false,
  minify: false,
});
