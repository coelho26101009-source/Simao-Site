// Renders one language of the site to a full HTML page.
import { profile } from "../content/profile.mjs";

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const pad = (n) => String(n).padStart(2, "0");

// Splits text into words wrapped for the scroll reveal.
const words = (text) =>
  text
    .split(" ")
    .map((w) => `<span class="w"><span>${esc(w)}</span></span>`)
    .join(" ");

// Splits a word into letters for the hero reveal.
const letters = (word) =>
  [...word].map((ch) => `<span class="l"><span>${esc(ch)}</span></span>`).join("");

const arrow = `<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

const socials = () => profile.socials.filter((s) => s.url);

const linkBtn = (href, label, cls = "") =>
  href
    ? `<a class="btn magnetic ${cls}" href="${esc(href)}" target="_blank" rel="noopener"><span>${esc(label)}</span>${arrow}</a>`
    : "";

export function render(c, { other }) {
  const url = profile.siteUrl + c.path;
  const otherUrl = profile.siteUrl + other.path;
  const nano = c.work.nano;
  const vuxio = c.work.vuxio;
  const pn = profile.projects.nano;
  const pv = profile.projects.vuxio;
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="${c.htmlLang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.meta.title)}</title>
<meta name="description" content="${esc(c.meta.description)}">
<meta name="theme-color" content="#050505">
<meta name="color-scheme" content="dark">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${c.htmlLang}" href="${url}">
<link rel="alternate" hreflang="${other.htmlLang}" href="${otherUrl}">
<link rel="alternate" hreflang="x-default" href="${profile.siteUrl}/">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(c.meta.title)}">
<meta property="og:description" content="${esc(c.meta.description)}">
<meta property="og:image" content="${profile.siteUrl}/assets/img/og.jpg">
<meta property="og:locale" content="${c.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jetbrains-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css">
<script>
// Language: Portuguese browsers go to /pt/ once; "?lang=en" remembers English.
(function(){var d=document.documentElement;window.__fs=setTimeout(function(){d.classList.add("failsafe")},5000);try{d.classList.remove("no-js");d.classList.add("js");
var q=new URLSearchParams(location.search).get("lang");if(q){localStorage.setItem("simao-lang",q);}
var s=localStorage.getItem("simao-lang");
${c.lang === "en" ? `if(!s&&!q&&/^pt\\b/i.test(navigator.language||"")){location.replace("/pt/");}` : `if(q==="en"){location.replace("/");}`}
if(sessionStorage.getItem("simao-seen")){d.classList.add("seen");}
}catch(e){d.classList.add("js");}})();
</script>
<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    image: profile.siteUrl + "/assets/img/simao.jpg",
    sameAs: socials().map((s) => s.url),
  })}</script>
</head>
<body data-lang="${c.lang}">
<a class="skip" href="#main">${esc(c.skip)}</a>

<div class="loader" aria-hidden="true">
  <div class="loader__top mono"><span>~/${esc(profile.firstName.toLowerCase())}</span><span>${esc(c.hero.kicker)}</span></div>
  <div class="loader__word" data-words='${esc(JSON.stringify(c.loader.words))}'>${esc(c.loader.words[0])}</div>
  <div class="loader__bottom mono"><span>${esc(c.loader.label)}<span class="dots"></span></span><span class="loader__count">000</span></div>
  <div class="loader__bar"><span></span></div>
</div>

<canvas class="bg-gl" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<div class="cursor is-hidden" aria-hidden="true"><span class="cursor__dot"></span><span class="cursor__ring"><span class="cursor__label"></span></span></div>

<header class="header">
  <a class="brand magnetic" href="${c.path}#top" aria-label="${esc(profile.name)}">${esc(profile.name)}<sup>©</sup></a>
  <nav class="nav" aria-label="${c.lang === "pt" ? "Principal" : "Main"}">
    ${c.nav.map((n, i) => `<a class="nav__link" href="${n.href}"><span class="mono">(${pad(i + 1)})</span> <span class="roll" data-text="${esc(n.label)}">${esc(n.label)}</span></a>`).join("\n    ")}
  </nav>
  <div class="header__right mono">
    <span class="clock" data-tz="${profile.timeZone}">--:--</span>
    <a class="lang magnetic" href="${c.other.href}" hreflang="${c.other.hrefLang}" aria-label="${esc(c.other.aria)}">${c.other.label}</a>
  </div>
</header>

<main id="main">
<section class="hero" id="top">
  <div class="hero__meta mono">
    <span>${esc(c.hero.kicker)}</span>
    <span>${esc(c.hero.location)}</span>
    <span class="status"><i></i>${esc(c.hero.status)}</span>
  </div>
  <div class="hero__stage">
  <h1 class="hero__name" aria-label="${esc(profile.name)}">
    ${profile.heroName.map((w) => `<span class="hero__word" aria-hidden="true">${letters(w)}</span>`).join("")}
  </h1>
    <div class="hero__text">
      <p class="hero__role"><span class="serif">${esc(c.hero.role[0])}</span><br>${esc(c.hero.role[1])}</p>
      <p class="hero__lines">${c.hero.lines.map((l) => `<span class="line"><span>${esc(l)}</span></span>`).join("")}</p>
    </div>
    <figure class="hero__photo" data-cursor="${esc(profile.firstName)}">
      <div class="hero__photo-inner">
        <picture>
          <source srcset="/assets/img/simao.webp" type="image/webp">
          <img src="/assets/img/simao.jpg" width="417" height="423" alt="${esc(c.hero.photoAlt)}" fetchpriority="high">
        </picture>
      </div>
      <figcaption class="mono">[ ${esc(profile.city)}, PT — ${year} ]</figcaption>
    </figure>
  </div>
  <a class="hero__scroll mono" href="#about"><span>${esc(c.hero.scroll)}</span><i></i></a>
</section>

<section class="about section" id="about">
  <p class="label mono">(${esc(c.about.label)})</p>
  <p class="about__text reveal-words">${words(c.about.text)}</p>
  <div class="about__grid">
    <dl class="facts">
      ${c.about.facts.map((f) => `<div class="fact reveal"><dt class="mono">${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("\n      ")}
    </dl>
    <div class="about__side">
      <div class="reveal">
        <p class="label mono">${esc(c.about.stackLabel)}</p>
        <ul class="chips">${profile.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    ${Array.from({ length: 4 }, () => c.marquee.map((m, i) => `<span class="${i % 2 ? "serif" : "outline"}">${esc(m)}</span><span class="star">✳</span>`).join("")).join("")}
  </div>
</div>

<section class="work section" id="work">
  <div class="work__head">
    <p class="label mono">(${esc(c.work.label)})</p>
    <p class="label mono">${esc(c.work.count)}</p>
  </div>

  <article class="case" aria-labelledby="nano-title">
    <div class="case__top">
      <span class="case__index mono">01</span>
      <span class="case__badge mono"><i></i>${esc(c.work.featured)}</span>
      <span class="case__year mono">./${esc(nano.year)}</span>
    </div>
    <h2 class="case__title" id="nano-title" aria-label="${esc(nano.title)}"><img class="case__symbol" src="/assets/img/nano-symbol.webp" alt="" width="360" height="360"><span aria-hidden="true">${letters(nano.title)}</span></h2>
    <p class="case__kind"><span class="serif">${esc(nano.kind)}</span></p>
    <div class="case__media" data-cursor="NANO">
      <figure class="shot shot--main"><img src="/assets/img/nano-home.webp" alt="${esc(nano.imgAlt)}" loading="lazy" width="1920" height="1200"></figure>
      <figure class="shot shot--phone"><img src="/assets/img/nano-phone.webp" alt="${esc(nano.img3Alt)}" loading="lazy" width="1082" height="2340"></figure>
    </div>
    <div class="case__body">
      <p class="case__text reveal">${esc(nano.text)}</p>
      <ul class="case__bullets mono reveal">${nano.bullets.map((b, i) => `<li><span>${pad(i + 1)}</span>${esc(b)}</li>`).join("")}</ul>
      <div class="case__foot reveal">
        <ul class="tags mono">${nano.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="case__links">${linkBtn(pn.site, c.work.live, "btn--solid")}${linkBtn(pn.code, c.work.code)}</div>
      </div>
    </div>
  </article>

  <article class="case case--second" aria-labelledby="vuxio-title">
    <div class="case__top">
      <span class="case__index mono">02</span>
      <span class="case__year mono">./${esc(vuxio.year)}</span>
    </div>
    <h2 class="case__title case__title--sm" id="vuxio-title" aria-label="${esc(vuxio.title)}"><img class="case__symbol case__symbol--plain" src="/assets/img/vuxio-symbol.webp" alt="" width="256" height="256"><span aria-hidden="true">${letters(vuxio.title)}</span></h2>
    <p class="case__kind"><span class="serif">${esc(vuxio.kind)}</span></p>
    <div class="case__media case__media--duo" data-cursor="Vuxio">
      <figure class="shot"><img src="/assets/img/vuxio-chat.webp" alt="${esc(vuxio.imgAlt)}" loading="lazy" width="1920" height="1200"></figure>
      <figure class="shot"><img src="/assets/img/vuxio-home.webp" alt="${esc(vuxio.img2Alt)}" loading="lazy" width="1920" height="1200"></figure>
    </div>
    <div class="case__body">
      <p class="case__text reveal">${esc(vuxio.text)}</p>
      <ul class="case__bullets mono reveal">${vuxio.bullets.map((b, i) => `<li><span>${pad(i + 1)}</span>${esc(b)}</li>`).join("")}</ul>
      <div class="case__foot reveal">
        <ul class="tags mono">${vuxio.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="case__links">${linkBtn(pv.site, c.work.live, "btn--solid")}${linkBtn(pv.code, c.work.code)}${linkBtn(pv.cli, vuxio.cli)}</div>
      </div>
    </div>
  </article>
</section>

<section class="contact section" id="contact">
  <p class="label mono">(${esc(c.contact.label)})</p>
  <h2 class="contact__title">${c.contact.title.map((t, i) => `<span class="line"><span${i ? ` class="serif"` : ""}>${esc(t)}</span></span>`).join("")}</h2>
  <p class="contact__text reveal">${esc(c.contact.text)}</p>
  ${profile.email ? `<div class="email reveal"><a class="email__link" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a><button class="email__copy mono magnetic" type="button" data-copy="${esc(profile.email)}" data-done="${esc(c.contact.copied)}">${esc(c.contact.copy)}</button></div>` : ""}
  <ul class="socials">
    ${socials().map((s, i) => `<li class="reveal"><a href="${esc(s.url)}" target="_blank" rel="me noopener"><span class="mono">${pad(i + 1)}</span><span class="socials__name roll" data-text="${esc(s.label)}">${esc(s.label)}</span>${arrow}</a></li>`).join("\n    ")}
  </ul>
</section>
</main>

<footer class="footer mono">
  <div><span class="footer__k">${esc(c.footer.local)}</span><span class="clock" data-tz="${profile.timeZone}" data-seconds>--:--:--</span></div>
  <div><span class="footer__k">${esc(c.footer.made)}</span><span>${esc(profile.name)}</span></div>
  <div><span class="footer__k">©</span><span>${year}</span></div>
  <a class="footer__top magnetic" href="#top">${esc(c.footer.top)} ↑</a>
</footer>

<noscript><p class="noscript">${esc(c.noscript)}</p></noscript>
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}
