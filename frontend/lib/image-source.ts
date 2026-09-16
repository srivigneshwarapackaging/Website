// Preserve CMS values and old URLs while serving optimized local equivalents.
const optimized = new Set([
  "/materials/hero-kraft-box.png", "/materials/kraft-roll.png",
  "/materials/kraft-flute.png", "/materials/corrugated-board.png",
  "/materials/open-diecut-box.png", "/box1.jpg", "/box2.jpeg",
  "/brand/logo.png", "/brand/logo-reference.png", "/brand/logo-mark.png",
  "/brand/logo-lockup.png", "/brand/logo-icon.png",
]);

export function imageSource(source: string) {
  return optimized.has(source) ? source.replace(/\.(png|jpe?g)$/, ".webp") : source;
}
