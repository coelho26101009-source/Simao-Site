// Gera index.html a partir de src/data.mjs.  Uso: node build.mjs
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { site, menu, preinscricao, shortcuts, access, news, ranking, partners, formation, O } from "./src/data.mjs";

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const hash = (f) => createHash("sha1").update(readFileSync(new URL(f, import.meta.url))).digest("hex").slice(0, 10);
const ext = `target="_blank" rel="noopener"`;
const a = (href, label, cls = "") => `<a${cls ? ` class="${cls}"` : ""} href="${esc(href)}" ${ext}>${esc(label)}</a>`;

const ic = {
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>`,
  grid: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`,
  book: `<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 7h6"/>`,
  pencil: `<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>`,
  briefcase: `<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>`,
  archive: `<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>`,
  cloud: `<path d="M7 18a4 4 0 1 1 .9-7.9A5.5 5.5 0 0 1 18.5 11 3.5 3.5 0 0 1 18 18z"/>`,
  download: `<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>`,
  search: `<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>`,
  arrow: `<path d="M7 17 17 7M8 7h9v9"/>`,
  chev: `<path d="m6 9 6 6 6-6"/>`,
  doc: `<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>`,
  pin: `<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>`,
  phone: `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,
};
const svg = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ic[n]}</svg>`;

// ───── navegação
const panel = (m, id) => `<div class="panel" id="${id}" hidden><div class="panel__in">${m.groups
  .map((g) => `<div class="panel__col">${g.title ? `<p class="panel__title">${esc(g.title)}</p>` : ""}<ul>${g.items.map((i) => `<li>${a(i.href, i.label)}</li>`).join("")}</ul></div>`)
  .join("")}</div></div>`;

const desktopNav = menu
  .map((m, n) =>
    m.groups
      ? `<li class="nav__item"><button class="nav__btn" aria-expanded="false" aria-controls="p${n}">${esc(m.label)}${svg("chev", "i i--s")}</button>${panel(m, "p" + n)}</li>`
      : `<li class="nav__item">${a(m.href, m.label, "nav__link")}</li>`
  )
  .join("");

const mobileNav = menu
  .map((m) =>
    m.groups
      ? `<details class="acc"><summary>${esc(m.label)}${svg("chev", "i i--s")}</summary>${m.groups
          .map((g) => `${g.title ? `<p class="acc__title">${esc(g.title)}</p>` : ""}<ul>${g.items.map((i) => `<li>${a(i.href, i.label)}</li>`).join("")}</ul>`)
          .join("")}</details>`
      : `<div class="acc acc--link">${a(m.href, m.label)}</div>`
  )
  .join("");

const footerCols = menu
  .filter((m) => m.groups)
  .map((m) => `<div class="fcol"><p class="fcol__t">${esc(m.label)}</p>${m.groups
    .map((g) => `${g.title ? `<p class="fcol__s">${esc(g.title)}</p>` : ""}<ul>${g.items.map((i) => `<li>${a(i.href, i.label)}</li>`).join("")}</ul>`)
    .join("")}</div>`)
  .join("");

// ───── notícias
const newsCards = news
  .map((n, i) => {
    const media = n.img
      ? `<div class="card__img${n.contain ? " card__img--c" : ""}"><img src="/assets/img/${n.img}.webp" width="${n.w}" height="${n.h}" alt="${esc(n.alt)}" loading="${i < 2 ? "eager" : "lazy"}"></div>`
      : "";
    return `<article class="card${i === 0 ? " card--big" : ""}${n.img ? "" : " card--text"} reveal"><a class="card__a" href="${esc(n.href)}" ${ext}>${media}<div class="card__body">${n.img ? "" : `<span class="card__ico">${svg("doc")}</span>`}<time class="card__date">${esc(n.date)}</time><h3>${esc(n.title)}</h3>${n.text ? `<p>${esc(n.text)}</p>` : ""}</div></a></article>`;
  })
  .join("");

const partnerCards = partners
  .map((p) => `<li class="part reveal"><a href="${esc(p.href)}" ${ext}><span class="part__logo">${p.img ? `<img src="/assets/img/${p.img}.webp" width="${p.w}" height="${p.h}" alt="Logótipo ${esc(p.name)}" loading="lazy">` : `<span class="part__q" aria-hidden="true">${esc(p.text)}</span>`}</span><span class="part__t">${esc(p.name)}</span><span class="part__n">${esc(p.note)}</span></a></li>`)
  .join("");

const css = hash("assets/css/style.css");
const js = hash("assets/js/app.js");

const html = `<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(site.name)} · ${esc(site.city)}</title>
<meta name="description" content="${esc(site.lead)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#003d84">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(site.name)}">
<meta property="og:description" content="${esc(site.lead)}">
<meta property="og:locale" content="pt_PT">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="preload" href="/assets/fonts/public-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=${css}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip" href="#main">Saltar para o conteúdo</a>

<div class="util">
  <p class="util__info">${svg("clock", "i i--s")}<span>Serviços Administrativos: ${esc(site.hours)}</span><a href="${site.phoneHref}">${svg("phone", "i i--s")}${esc(site.phone)}</a></p>
  <p class="util__links">
    ${a(site.facebook, "Facebook")}${a(site.instagram, "Instagram")}${a(site.login, "Área reservada", "util__login")}
  </p>
</div>

<header class="header" id="header">
  <a class="brand" href="#top" aria-label="${esc(site.name)}, início"><img src="/assets/img/logo-aetp.png" width="292" height="65" alt="${esc(site.name)}, ${esc(site.city)}"></a>
  <nav class="nav" aria-label="Principal"><ul class="nav__list">${desktopNav}</ul></nav>
  <div class="header__right">
    <button class="iconbtn" id="searchBtn" aria-label="Pesquisar no site">${svg("search")}</button>
    ${a(preinscricao.href, preinscricao.label, "btn btn--gold btn--sm hide-m")}
    <button class="menu" id="menuBtn" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile"><span></span><span></span></button>
  </div>
</header>

<div class="mobile" id="mobile" hidden>
  <form class="msearch" action="${site.search}" method="get" role="search" target="_blank"><input type="search" name="s" placeholder="Pesquisar no site" aria-label="Pesquisar no site"><button aria-label="Pesquisar">${svg("search")}</button></form>
  ${mobileNav}
  ${a(preinscricao.href, preinscricao.label, "btn btn--gold btn--block")}
</div>

<dialog class="search" id="searchDlg" aria-label="Pesquisar">
  <form action="${site.search}" method="get" role="search" target="_blank">
    <label class="sr" for="q">Pesquisar no site</label>
    <input id="q" type="search" name="s" placeholder="Pesquisar no site do Agrupamento…" autocomplete="off">
    <button class="btn btn--blue" type="submit">Pesquisar</button>
  </form>
  <button class="search__x" id="searchX" aria-label="Fechar">Esc</button>
</dialog>

<main id="main">
<!-- ───── Início ───── -->
<section class="hero" id="top">
  <div class="hero__text">
    <p class="eyebrow">${esc(site.city)} <i></i> Ano Letivo 2026/2027</p>
    <h1>Agrupamento de Escolas <em>Tomaz Pelayo</em></h1>
    <p class="lead">${esc(site.lead)}</p>
    <div class="hero__cta">
      ${a(preinscricao.href, preinscricao.label, "btn btn--blue")}
      ${a("http://home.tomazpelayo.com/oferta-formativa", "Oferta Formativa 2026-2027", "btn btn--line")}
    </div>
    <ul class="chips" aria-label="Oferta formativa">${formation.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
  </div>
  <figure class="hero__fig">
    <img src="/assets/img/escola.webp" width="1200" height="539" alt="Edifício da Escola Secundária Tomaz Pelayo" fetchpriority="high">
    <figcaption>Escola Secundária Tomaz Pelayo</figcaption>
    <div class="hero__card">
      <p class="hero__card-t">Serviços Administrativos</p>
      <p>${esc(site.hours)}</p>
      <a href="${site.phoneHref}">${esc(site.phone)}</a>
    </div>
  </figure>
</section>

<!-- ───── Em destaque ───── -->
<section class="section section--tight" id="destaques" aria-labelledby="t-dest">
  <h2 class="sr" id="t-dest">Em destaque</h2>
  <ul class="tiles">
    ${shortcuts.map((s) => `<li><a class="tile reveal" href="${esc(s.href)}" ${ext}>${svg(s.icon, "i i--l")}<span>${esc(s.label)}</span>${svg("arrow", "i i--s tile__go")}</a></li>`).join("\n    ")}
  </ul>
</section>

<!-- ───── Acessos ───── -->
<section class="section section--tint" id="acessos">
  <div class="head"><p class="kicker">Acessos</p><h2 class="h2">As plataformas do dia a dia.</h2></div>
  <ul class="access">
    ${access.map((x) => `<li><a class="acc-card reveal" href="${esc(x.href)}" ${ext}><span class="acc-card__t">${esc(x.label)}</span><span class="acc-card__n">${esc(x.note)}</span>${svg("arrow", "i acc-card__go")}</a></li>`).join("\n    ")}
  </ul>
</section>

<!-- ───── Notícias ───── -->
<section class="section" id="noticias">
  <div class="head head--row"><div><p class="kicker">Notícias</p><h2 class="h2">Últimas notícias.</h2></div>${a(O + "/noticias/", "Ver todas as notícias →", "more")}</div>
  <div class="news">${newsCards}</div>
</section>

<!-- ───── Ranking ───── -->
<section class="rank" id="ranking">
  <div class="rank__in">
    <div class="rank__text">
      <p class="kicker kicker--light">${esc(ranking.title)}</p>
      <h2 class="h2 h2--light">Entre as melhores escolas públicas do país.</h2>
      <p>${esc(ranking.text)}</p>
      <p class="rank__links">${a(ranking.media.href, ranking.media.label + " →", "more more--light")}${a(ranking.page.href, ranking.page.label + " →", "more more--light")}</p>
    </div>
    <ol class="places">
      ${ranking.places.map((p) => `<li><a href="${esc(p.href)}" ${ext}><strong>${esc(p.n)}</strong><span>${esc(p.label)}</span></a></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<!-- ───── Projetos e parceiros ───── -->
<section class="section" id="projetos">
  <div class="head"><p class="kicker">Projetos e parceiros</p><h2 class="h2">Uma escola ligada ao mundo.</h2><p class="head__text">Programas, selos e entidades com que o Agrupamento trabalha, com os respetivos logótipos.</p></div>
  <ul class="partners">${partnerCards}</ul>
</section>

<!-- ───── Contactos ───── -->
<section class="section section--tint" id="contactos">
  <div class="head"><p class="kicker">Contactos</p><h2 class="h2">Fale connosco.</h2></div>
  <div class="contact">
    <div class="contact__card">
      <p class="contact__t">Serviços Administrativos</p>
      <ul class="contact__list">
        <li>${svg("clock")}<span>${esc(site.hours)}</span></li>
        <li>${svg("pin")}<span>${site.address.map(esc).join("<br>")}</span></li>
        <li>${svg("phone")}<span><a href="${site.phoneHref}">${esc(site.phone)}</a><small>Chamada para a rede fixa nacional</small></span></li>
      </ul>
      <div class="contact__cta">${a(site.mapsHref, "Ver no mapa", "btn btn--blue")}${a(site.contacts, "Página de contactos", "btn btn--line")}</div>
    </div>
    <div class="contact__card contact__card--soft">
      <p class="contact__t">Siga-nos</p>
      <ul class="social">
        <li>${a(site.facebook, "Facebook")}</li>
        <li>${a(site.facebook2, "Facebook · Aetpface")}</li>
        <li>${a(site.instagram, "Instagram · @agrupamentotomazpelayo")}</li>
      </ul>
      <p class="contact__t contact__t--2">Área reservada</p>
      <p class="contact__p">Entre com o email institucional para aceder à área reservada.</p>
      ${a(site.login, "Entrar com o email institucional", "btn btn--line")}
    </div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="footer__top">
    <div class="footer__brand">
      <img src="/assets/img/logo-aetp.png" width="292" height="65" alt="${esc(site.name)}" loading="lazy">
      <p>${site.address.map(esc).join("<br>")}<br><a href="${site.phoneHref}">${esc(site.phone)}</a></p>
      <p class="footer__soc">${a(site.facebook, "Facebook")}${a(site.instagram, "Instagram")}</p>
    </div>
    ${footerCols}
  </div>
  <div class="footer__logos" aria-label="Entidades financiadoras e parceiras">
    <img src="/assets/img/logo-republica.webp" width="463" height="82" alt="República Portuguesa, Educação, Ciência e Inovação" loading="lazy">
    <img class="wide" src="/assets/img/banner-prr.webp" width="1800" height="260" alt="Pessoas 2030, Portugal 2030, Cofinanciado pela União Europeia, PRR, República Portuguesa, Financiado pela União Europeia NextGenerationEU" loading="lazy">
    <img src="/assets/img/logo-2030.webp" width="1061" height="120" alt="Pessoas 2030, Portugal 2030, Cofinanciado pela União Europeia" loading="lazy">
  </div>
  <div class="footer__bottom">
    <p>Copyright © 2024 Agrupamento de Escolas Tomaz Pelayo. Todos os direitos reservados.</p>
    ${a(site.privacy, "Politica de Privacidade")}
    <a href="#top">Voltar ao topo ↑</a>
  </div>
</footer>

<script type="module" src="/assets/js/app.js?v=${js}"></script>
</body>
</html>
`;

writeFileSync(new URL("index.html", import.meta.url), html);
console.log("index.html gerado", html.length, "bytes; css", css, "js", js);
