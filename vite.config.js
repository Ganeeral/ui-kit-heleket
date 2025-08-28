import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import svg from "@neodx/svg/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
      insertTypesEntry: true,
    }),
    svg({
      root: "src/core/assets/icons",
      output: "src/sprites",
      group: true,
      fileName: "{name}.{hash:8}.svg",
      resetColors: false,
      metadata: {
        path: "src/components/types/icon.types.ts",
        runtime: { viewBox: true },
      },
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@styles": resolve(__dirname, "src/core/styles"),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ui-kit-heleket",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es"
          ? "index.esm.js"
          : format === "cjs"
            ? "index.cjs.js"
            : `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "clsx"],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM", clsx: "clsx" },
        assetFileNames: "style.css",
      },
    },
    sourcemap: true,
    minify: "terser",
    outDir: "dist",
  },
  esbuild: {
    banner: `"use client";`,
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, "src/core/styles")],
        additionalData: `@use "@styles/mixins" as *;`,
      },
    },
  },
});
