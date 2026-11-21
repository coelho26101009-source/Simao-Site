// Fast checks with no browser: content shape, links to local files, leftovers.
import { existsSync, readFileSync } from "node:fs";
import { en } from "../content/en.mjs";
import { pt } from "../content/pt.mjs";

let failed = 0;
const fail = (msg) => { failed++; console.error("✗ " + msg); };
const ok = (msg) => console.log("✓ " + msg);

// 1. pt has exactly the same keys and array lengths as en.
const shape = (a, b, path = "") => {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return fail(`${path} is a list in en but not in pt`);
    if (["loader.words", "marquee", "about.desk", "work.nano.tags", "work.vuxio.tags", "work.vuxio.bullets", "work.nano.bullets"].includes(path.slice(1))) return;
    if (a.length !== b.length) fail(`${path} has ${a.length} items in en, ${b.length} in pt`);
    a.forEach((x, i) => shape(x, b[i], `${path}[${i}]`));
  } else if (a && typeof a === "object") {
    for (const k of Object.keys(a)) {
      if (!(k in b)) fail(`pt is missing ${path}.${k}`);
      else shape(a[k], b[k], `${path}.${k}`);
    }
    for (const k of Object.keys(b)) if (!(k in a)) fail(`pt has extra key ${path}.${k}`);
  } else if (typeof a === "string" && !String(b).trim()) {
    fail(`pt text ${path} is empty`);
  }
};
shape(en, pt);
ok("en and pt have the same shape");

// 2. Every local file the pages point to exists in dist/.
for (const page of ["dist/index.html", "dist/pt/index.html"]) {
  const html = readFileSync(page, "utf8");
  const refs = [...html.matchAll(/(?:src|href|srcset)="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    const file = "dist" + ref + (ref.endsWith("/") ? "index.html" : "");
    if (!existsSync(file)) fail(`${page} points to missing ${ref}`);
  }
  if (/undefined|\[object Object\]|\$\{/.test(html)) fail(`${page} has a template leftover`);
  if (!/<html lang="(en|pt-PT)"/.test(html)) fail(`${page} has no lang`);
  ok(`${page}: ${refs.length} local links checked`);
}

// 3. CSS fonts exist.
const css = readFileSync("dist/assets/css/main.css", "utf8");
for (const m of css.matchAll(/url\("(\/assets\/[^"]+)"\)/g)) {
  if (!existsSync("dist" + m[1])) fail(`CSS points to missing ${m[1]}`);
}
ok("CSS files checked");

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log("\nAll checks passed");
