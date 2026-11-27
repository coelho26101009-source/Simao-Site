// Menu com painéis, menu de telemóvel, pesquisa e animações de entrada.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const header = $("#header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ───── Painéis do menu (computador) ───── */
const buttons = $$(".nav__btn");
function closePanels(except) {
  buttons.forEach((b) => {
    if (b === except) return;
    b.setAttribute("aria-expanded", "false");
    document.getElementById(b.getAttribute("aria-controls")).hidden = true;
  });
}
buttons.forEach((b) => {
  const panel = document.getElementById(b.getAttribute("aria-controls"));
  b.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = b.getAttribute("aria-expanded") === "true";
    // Com rato, o painel já abriu ao passar por cima: o clique não o fecha (o teclado alterna).
    if (open && e.detail > 0 && matchMedia("(hover: hover)").matches) return;
    closePanels(open ? null : b);
    b.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
  // Com rato, o painel também abre ao passar por cima.
  if (matchMedia("(hover: hover)").matches) {
    const item = b.parentElement;
    let t;
    item.addEventListener("mouseenter", () => {
      clearTimeout(t);
      closePanels(b);
      b.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    });
    item.addEventListener("mouseleave", () => {
      t = setTimeout(() => { b.setAttribute("aria-expanded", "false"); panel.hidden = true; }, 180);
    });
  }
});
document.addEventListener("click", (e) => { if (!e.target.closest(".nav__item")) closePanels(null); });
addEventListener("keydown", (e) => { if (e.key === "Escape") { closePanels(null); setMenu(false); } });

/* ───── Menu (telemóvel) ───── */
const menuBtn = $("#menuBtn");
const mobile = $("#mobile");
function setMenu(open) {
  // O menu começa mesmo por baixo do cabeçalho, esteja a barra de topo visível ou não.
  if (open) mobile.style.top = Math.max(0, header.getBoundingClientRect().bottom) + "px";
  mobile.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", open);
}
menuBtn.addEventListener("click", () => setMenu(mobile.hidden));
matchMedia("(min-width: 1181px)").addEventListener("change", (e) => e.matches && setMenu(false));
// Só uma secção aberta de cada vez.
$$(".acc", mobile).forEach((d) => d.addEventListener("toggle", () => { if (d.open) $$(".acc[open]", mobile).forEach((o) => o !== d && (o.open = false)); }));

/* ───── Pesquisa ───── */
const dlg = $("#searchDlg");
$("#searchBtn").addEventListener("click", () => { dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", ""); $("#q").focus(); });
$("#searchX").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

/* ───── Entrada suave ───── */
const els = $$(".reveal");
if (!("IntersectionObserver" in window)) els.forEach((e) => e.classList.add("in"));
else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((e) => io.observe(e));
}
