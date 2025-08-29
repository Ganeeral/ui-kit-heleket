import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distRoot = path.resolve(__dirname, "..");

const src = path.resolve(distRoot, "components/icon/sprites");

const projectRoot = process.env.INIT_CWD || process.cwd();
const dest = path.resolve(projectRoot, "public/ui-kit/sprites");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    fs.copyFileSync(srcFile, destFile);
  }
}
