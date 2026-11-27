// Alma Lusa: menu, estado "aberto agora", horário do dia e animações de entrada.

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// Horário em minutos desde a meia-noite, por dia da semana (0 = domingo).
const hm = (h, m = 0) => h * 60 + m;
const MORNING = [hm(9, 30), hm(12, 30)];
const SCHEDULE = {
  0: [],
  1: [MORNING, [hm(14, 30), hm(19)]],
  2: [MORNING, [hm(14, 30), hm(17)]],
  3: [MORNING, [hm(14, 30), hm(17)]],
  4: [MORNING, [hm(14, 30), hm(17)]],
  5: [MORNING, [hm(14, 30), hm(19)]],
  6: [MORNING],
};
const DAYS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const fmt = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, "0")}`;

// Hora actual em Portugal continental, independentemente do fuso do telemóvel.
function lisbonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, min: Number(get("hour")) % 24 * 60 + Number(get("minute")) };
}

function status() {
  const { day, min } = lisbonNow();
  const today = SCHEDULE[day];
  const open = today.find(([a, b]) => min >= a && min < b);
  if (open) return { open: true, day, short: `Aberto agora · até às ${fmt(open[1])}`, long: `Estamos abertos até às ${fmt(open[1])}.` };
  const later = today.find(([a]) => min < a);
  if (later) return { open: false, day, short: `Fechado · abre às ${fmt(later[0])}`, long: `Fechado de momento. Abrimos hoje às ${fmt(later[0])}.` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (SCHEDULE[d].length) {
      const when = i === 1 ? "amanhã" : DAYS[d];
      return { open: false, day, short: `Fechado · abre ${when} às ${fmt(SCHEDULE[d][0][0])}`, long: `Fechado de momento. Abrimos ${when} às ${fmt(SCHEDULE[d][0][0])}.` };
    }
  }
  return { open: false, day, short: "Fechado", long: "Fechado de momento." };
}

function renderStatus() {
  const s = status();
  $("#statusText").textContent = s.short;
  $("#statusDot").classList.toggle("on", s.open);
  $("#statusLong").textContent = s.long;
  $$("#hours tr").forEach((tr) => tr.classList.toggle("today", Number(tr.dataset.d) === s.day));
}

function initHeader() {
  const header = $("#header");
  const nav = $("#nav");
  const btn = $("#menuBtn");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
  };
  btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => e.matches && setMenu(false));

  // Sublinha a secção visível no menu.
  const links = new Map($$('a[href^="#"]', nav).map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove("active"));
      links.get(en.target.id)?.classList.add("active");
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // A barra de baixo só aparece depois do início, e some junto à secção de marcação.
  const dock = $("#dock");
  const vis = { hero: true, book: false };
  const sync = () => dock.classList.toggle("show", !vis.hero && !vis.book);
  new IntersectionObserver(([e]) => { vis.hero = e.isIntersecting; sync(); }, { threshold: 0.4 }).observe($("#top"));
  new IntersectionObserver(([e]) => { vis.book = e.isIntersecting; sync(); }).observe($("#marcar"));
}

function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((e) => io.observe(e));
}

$("#year").textContent = new Date().getFullYear();
initHeader();
initReveal();
renderStatus();
setInterval(renderStatus, 60_000);
