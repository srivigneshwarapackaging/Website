import assert from "node:assert/strict";

const base = process.env.SEO_CHECK_URL || "http://localhost:3000";
const canonicalOrigin = "https://srivigneshwarapackaging.com";
const routes = ["/", "/about", "/products", "/lab", "/privacy", "/terms"];
const pages = new Map();
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(m => m[0]);
async function get(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, `${path} must return 200`);
  return response;
}

for (const route of routes) {
  const html = await (await get(route)).text();
  pages.set(route, html);
  assert.equal(tags(html, "h1").length, 1, `${route}: expected one H1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: missing title`);
  const metas = tags(html, "meta");
  assert(metas.some(t => attribute(t, "name") === "description" && attribute(t, "content")?.length), `${route}: missing description`);
  assert(!metas.some(t => attribute(t, "name") === "robots" && attribute(t, "content")?.includes("noindex")), `${route}: public page is noindex`);
  const canonical = tags(html, "link").filter(t => attribute(t, "rel") === "canonical");
  assert.equal(canonical.length, 1, `${route}: expected one canonical`);
  assert.equal(new URL(attribute(canonical[0], "href")).href, new URL(route, canonicalOrigin).href);
  assert(metas.some(t => attribute(t, "property") === "og:image"), `${route}: missing OG image`);
  for (const img of tags(html, "img")) assert.notEqual(attribute(img, "alt"), undefined, `${route}: image missing alt`);
  let previous = 0;
  for (const heading of html.matchAll(/<h([1-6])\b/gi)) {
    const level = Number(heading[1]);
    assert(level <= previous + 1, `${route}: heading jumps H${previous} → H${level}`);
    previous = level;
  }
  console.log(`PASS ${route}: title, description, canonical, OG, indexing, H1, headings, alt attributes`);
}

for (const [route, html] of pages) {
  for (const tag of tags(html, "a")) {
    const href = attribute(tag, "href");
    if (!href || (!href.startsWith("/") && !href.startsWith("#")) || href.startsWith("//")) continue;
    const url = new URL(href, new URL(route, base));
    const target = pages.get(url.pathname);
    if (!target) { await get(url.pathname); continue; }
    if (url.hash) assert(tags(target, "[a-z][a-z0-9]*").some(t => attribute(t, "id") === decodeURIComponent(url.hash.slice(1))), `${route}: broken link ${href}`);
  }
}
const sitemap = await (await get("/sitemap.xml")).text();
for (const route of routes) assert(sitemap.includes(new URL(route, canonicalOrigin).href));
assert(!/localhost|\/admin|\/auth/.test(sitemap));
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`${canonicalOrigin}/sitemap.xml`));
assert(!robots.includes("localhost"));
const auth = await (await get("/auth/admin")).text();
assert(tags(auth, "meta").some(t => attribute(t, "name") === "robots" && attribute(t, "content")?.includes("noindex")));
const og = await get("/opengraph-image");
assert(og.headers.get("content-type")?.startsWith("image/"));
assert((await og.arrayBuffer()).byteLength > 1000);
const schemas = [...pages.get("/").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(schemas.length > 0, "Missing business schema");
for (const block of schemas) {
  const schema = JSON.parse(block[1]);
  assert.equal(schema.url, canonicalOrigin);
  assert.equal(schema["@type"], "LocalBusiness");
}
console.log("PASS internal links, anchors, sitemap, robots, private-page noindex, OG image and business schema");
