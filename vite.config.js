import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import svg from '@neodx/svg/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  fs.readFileSync(resolve(__dirname, "package.json"), "utf8")
);

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
        runtime: {
          viewBox: true,
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "YourUIKit",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") {
          return "index.esm.js";
        }
        if (format === "cjs") {
          return "index.cjs.js";
        }
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "clsx"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          clsx: "clsx",
        },
        assetFileNames: "style.css",
        sourcemap: true,
      },
    },
    sourcemap: true,
    minify: "terser",
    outDir: "dist",
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});
