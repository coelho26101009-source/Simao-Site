// Builds the site into dist/: one page per language plus the static files.
// Usage: node build.mjs
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { en } from "./content/en.mjs";
import { pt } from "./content/pt.mjs";
import { profile } from "./content/profile.mjs";
import { render } from "./src/template.mjs";

const out = new URL("./dist/", import.meta.url);
rmSync(out, { recursive: true, force: true });
mkdirSync(new URL("pt/", out), { recursive: true });
cpSync(new URL("./public/", import.meta.url), out, { recursive: true });

// Cache busting: the CSS and JS links carry a hash of their content, so a
// change is picked up at once even though assets are cached for a week.
const versioned = ["/assets/css/main.css", "/assets/js/main.js"];
const stamp = (html) =>
  versioned.reduce((h, path) => {
    const hash = createHash("sha1").update(readFileSync(new URL("." + path, out))).digest("hex").slice(0, 10);
    return h.replaceAll(`"${path}"`, `"${path}?v=${hash}"`);
  }, html);

writeFileSync(new URL("index.html", out), stamp(render(en, { other: pt })));
writeFileSync(new URL("pt/index.html", out), stamp(render(pt, { other: en })));
writeFileSync(new URL("404.html", out), stamp(render(en, { other: pt }).replace("<title>", "<title>404 · ")));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  new URL("sitemap.xml", out),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${profile.siteUrl}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${profile.siteUrl}/pt/</loc><lastmod>${today}</lastmod></url>
</urlset>
`
);
writeFileSync(new URL("robots.txt", out), `User-agent: *\nAllow: /\nSitemap: ${profile.siteUrl}/sitemap.xml\n`);
console.log("Built dist/ (en + pt)");
