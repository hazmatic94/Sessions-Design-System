import * as esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await esbuild.build({
  entryPoints: [path.join(rootDir, "src/docs/showroom/reactDemos/index.jsx")],
  bundle: true,
  format: "esm",
  outfile: path.join(rootDir, "assets/showroom-react-demos.js"),
  publicPath: "/assets/",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  loader: {
    ".css": "css",
    ".svg": "file",
    ".png": "file",
    ".webp": "file",
    ".mp3": "file",
    ".mp4": "file",
    ".mov": "file",
  },
  assetNames: "showroom-react-demos/[name]-[hash]",
  logLevel: "info",
});
