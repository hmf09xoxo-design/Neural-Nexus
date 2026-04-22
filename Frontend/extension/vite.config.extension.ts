import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

function copyManifestPlugin(): Plugin {
  return {
    name: "copy-manifest",
    closeBundle() {
      const outDir = resolve(__dirname, "dist");
      mkdirSync(outDir, { recursive: true });
      copyFileSync(resolve(__dirname, "manifest.json"), resolve(outDir, "manifest.json"));
    },
  };
}

export default defineConfig({
  plugins: [react(), copyManifestPlugin()],
  // Use "./" so all asset paths are relative — required for Chrome extensions
  base: "./",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        popup:      resolve(__dirname, "popup.html"),
        background: resolve(__dirname, "src/background.ts"),
        content:    resolve(__dirname, "src/content.ts"),
      },
      output: {
        // Extension requires stable filenames — no content hash
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
