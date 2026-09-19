import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.resolve("public/enelle");
const files = await fs.readdir(directory);
let beforeTotal = 0;
let afterTotal = 0;

for (const name of files) {
  const input = path.join(directory, name);
  const extension = path.extname(name).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(extension)) continue;

  const stat = await fs.stat(input);
  const output = `${input}.optimized`;
  beforeTotal += stat.size;

  let pipeline = sharp(input, { animated: false }).rotate().resize({
    width: 1920,
    height: 1920,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (extension === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, quality: 90 });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, progressive: true, mozjpeg: true });
  }

  await pipeline.toFile(output);
  const optimized = await fs.stat(output);
  await fs.rename(output, input);
  afterTotal += optimized.size;
  console.log(`${name}: ${(stat.size / 1024).toFixed(0)} KB → ${(optimized.size / 1024).toFixed(0)} KB`);
}

console.log(`Total: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB → ${(afterTotal / 1024 / 1024).toFixed(2)} MB`);
