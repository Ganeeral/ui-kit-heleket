import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);

export default [
  {
    input: "src/index.ts",
    output: [
      { file: packageJson.main, format: "cjs" },
      { file: packageJson.module, format: "esm" },
    ],
    external: ["react", "react-dom"],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.stories.tsx"],
      }),
      postcss({
        extract: "index.css",
        modules: true,
        use: ["sass"],
        minimize: true,
      }),
      url(),
      svgr({ icon: true }),
      terser(),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    external: [/\.(css|scss)$/],
    plugins: [dts()],
  },
];
