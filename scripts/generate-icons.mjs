/**
 * Builds the Aye Candy app icons from public/logo.webp.
 *
 * Crops the interlocking AC monogram out of the full logo lockup, drops it on
 * the brand ink background, and writes favicon.ico, icon.png and apple-icon.png
 * into app/ where Next.js picks them up by file convention.
 *
 * Only the monogram is used — the laurel ring and script wordmark turn to mush
 * below about 48px, and the wordmark's "C" overlaps the ring in the artwork.
 *
 * Re-run from the project root whenever the logo changes:
 *   node scripts/generate-icons.mjs
 *
 * Note: `sharp` is not a direct dependency — it comes in with Next.js. If a
 * future install drops it, add it with `npm i -D sharp`.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "logo.webp");
const APP = path.join(ROOT, "app");
const INK = "#121015";

// Bounding window around the AC monogram inside the full logo lockup.
const CROP = { left: 545, top: 120, width: 495, height: 460 };
// Laurel-leaf fragments clip into the top-left of that window; erase them.
const ERASE = { width: 75, height: 125 };

/** Wraps PNG buffers in an ICO container (PNG-in-ICO, supported by every modern browser). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;

  images.forEach((img, i) => {
    const e = 16 * i;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 0); // width
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 1); // height
    dir.writeUInt8(0, e + 2); // palette size
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // colour planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(img.buf.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += img.buf.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

/**
 * Monogram on the ink background, `size` square, mark occupying `inset` of it.
 *
 * At small sizes the thin serif strokes average into the dark background during
 * downscaling, so `lift` brightens the finished tile to pull them back out.
 */
async function tile(mark, size, inset = 0.78, lift = 1) {
  const markPx = Math.round(size * inset);
  const resized = await sharp(mark)
    .resize(markPx, markPx, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const composed = sharp({
    create: { width: size, height: size, channels: 4, background: INK },
  }).composite([{ input: resized }]);

  return (lift === 1 ? composed : composed.modulate({ brightness: lift }))
    .png()
    .toBuffer();
}

(async () => {
  const eraser = Buffer.from(
    `<svg width="${CROP.width}" height="${CROP.height}">` +
      `<rect x="0" y="0" width="${ERASE.width}" height="${ERASE.height}" fill="#fff"/></svg>`,
  );

  const mark = await sharp(SRC)
    .ensureAlpha()
    .extract(CROP)
    .composite([{ input: eraser, blend: "dest-out" }])
    .trim({ threshold: 1 })
    // The gold gradient bottoms out quite dark; lift it so the mark holds at 16px.
    .modulate({ brightness: 1.12, saturation: 1.05 })
    .png()
    .toBuffer();

  // Smaller tiles get proportionally more mark and more lift.
  const ICO_SIZES = [
    { size: 16, inset: 0.96, lift: 1.35 },
    { size: 32, inset: 0.88, lift: 1.14 },
    { size: 48, inset: 0.84, lift: 1.06 },
  ];

  const ico = buildIco(
    await Promise.all(
      ICO_SIZES.map(async ({ size, inset, lift }) => ({
        size,
        buf: await tile(mark, size, inset, lift),
      })),
    ),
  );

  fs.writeFileSync(path.join(APP, "favicon.ico"), ico);
  fs.writeFileSync(path.join(APP, "icon.png"), await tile(mark, 512, 0.78));
  fs.writeFileSync(path.join(APP, "apple-icon.png"), await tile(mark, 180, 0.7));

  console.log("wrote app/favicon.ico, app/icon.png, app/apple-icon.png");
})();
