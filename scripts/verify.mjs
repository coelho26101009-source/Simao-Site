// Browser test: loads both languages on desktop and phone sizes and checks
// that nothing errors, nothing scrolls sideways, the intro finishes and the
// language switch works. Usage: npm run build && npm run verify [-- --shots DIR]
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const shotsAt = process.argv.indexOf("--shots");
const shots = shotsAt > -1 ? process.argv[shotsAt + 1] : null;

const port = 4180;
const server = await serve(port);
const base = `http://localhost:${port}`;
const browser = await chromium.launch();
let failed = 0;
const fail = (m) => { failed++; console.error("✗ " + m); };

const sizes = [
  { name: "desktop", viewport: { width: 1440, height: 900 } },
  { name: "phone", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];

for (const lang of ["en", "pt"]) {
  for (const size of sizes) {
    const ctx = await browser.newContext({ ...size, locale: "en-US", deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const url = lang === "en" ? `${base}/` : `${base}/pt/`;
    await page.goto(url, { waitUntil: "load" });
    const tag = `${lang}/${size.name}`;

    // Intro finishes and removes itself.
    await page.waitForSelector(".loader", { state: "detached", timeout: 8000 }).catch(() => fail(`${tag}: intro did not finish`));
    await page.waitForTimeout(1800);
    const heroOk = await page.evaluate(() => {
      const r = document.querySelector(".hero__name .l > span").getBoundingClientRect();
      const box = document.querySelector(".hero__name").getBoundingClientRect();
      return r.top < box.bottom && getComputedStyle(document.querySelector(".hero__photo-inner")).clipPath !== "inset(100% 0px 0px)";
    });
    if (!heroOk) fail(`${tag}: hero did not appear`);
    if (shots) await page.screenshot({ path: `${shots}/${lang}-${size.name}-hero.png` });

    // Scroll to the bottom slowly so every reveal runs.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 500) {
      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(110);
    }
    await page.waitForTimeout(1500);

    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      return [...document.querySelectorAll("body *")]
        .filter((el) => !el.closest(".marquee, .grain, .cursor, .bg-gl, .skip, .shot, .hero__photo-inner"))
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.right > w + 1; })
        .slice(0, 3).map((el) => el.className || el.tagName);
    });
    if (overflow.length) fail(`${tag}: wider than the screen: ${overflow.join(", ")}`);
    const sideways = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (sideways) fail(`${tag}: page scrolls sideways`);

    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".reveal")].filter((el) => getComputedStyle(el).opacity < 0.9).length);
    if (hidden) fail(`${tag}: ${hidden} block(s) never appeared`);

    const imgs = await page.evaluate(() => [...document.images].filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src));
    if (imgs.length) fail(`${tag}: images failed: ${imgs.join(", ")}`);

    if (shots) {
      await page.screenshot({ path: `${shots}/${lang}-${size.name}-full.png`, fullPage: true });
    }
    if (errors.length) fail(`${tag}: console errors: ${errors.join(" | ")}`);
    console.log(`✓ ${tag} checked`);
    await ctx.close();
  }
}

// Language switch and remembered choice.
{
  const ctx = await browser.newContext({ locale: "pt-PT" });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  if (!page.url().endsWith("/pt/")) fail("Portuguese browser was not sent to /pt/");
  await page.goto(`${base}/?lang=en`);
  await page.goto(`${base}/`);
  if (page.url().includes("/pt/")) fail("English choice was not remembered");
  if ((await page.getAttribute("html", "lang")) !== "en") fail("English page has wrong lang");
  console.log("✓ language switch checked");
  await ctx.close();
}

// Reduced motion: everything visible straight away, no intro.
{
  const ctx = await browser.newContext({ reducedMotion: "reduce", locale: "en-US" });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.waitForTimeout(300);
  const loader = await page.$(".loader");
  const op = await page.evaluate(() => getComputedStyle(document.querySelector(".reveal")).opacity);
  if (loader && (await loader.isVisible())) fail("reduced motion still shows the intro");
  if (Number(op) < 1) fail("reduced motion hides content");
  console.log("✓ reduced motion checked");
  await ctx.close();
}

await browser.close();
server.close();
if (failed) { console.error(`\n${failed} problem(s)`); process.exit(1); }
console.log("\nBrowser checks passed");
