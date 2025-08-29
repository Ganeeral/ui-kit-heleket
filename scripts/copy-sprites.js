const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../dist/icon/sprites");
const dest = path.resolve(process.cwd(), "public/icons/ui-kit");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    fs.copyFileSync(srcFile, destFile);
  }

  console.log("✅ Sprites copied to public/icons");
} else {
  console.warn("⚠️ No sprites found in dist/icon/sprites");
}
