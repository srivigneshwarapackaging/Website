import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "../public");
async function optimize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) { await optimize(source); continue; }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const output = source.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(source).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(output);
    const [before, after] = await Promise.all([stat(source), stat(output)]);
    console.log(`${path.relative(root, source)}: ${before.size} → ${after.size} bytes`);
  }
}
await optimize(root);
