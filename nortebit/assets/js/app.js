// NorteBit: tabela de preços, formulário de orçamento e envio para o Google Sheets.
import { DEFAULT_PRICES, FAULT_CATALOG } from "./data.js";

const CONFIG = {
  // Web App do Google Apps Script que guarda os pedidos e devolve os preços.
  GOOGLE_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbyutObsN-puvz8akVdMv_q0POUrtqVEN_M4IeChGYG5ldK_znKfckPMQ6H0FAKL36nS/exec",
  WHATSAPP_NUMBER: "351935491538",
};

const DIAGNOSIS = 15;
const DELIVERY_EXTRA = 15;
const URGENT_EXTRA = 25;

const state = {
  prices: [...DEFAULT_PRICES],
  cat: "all",
  services: new Set(), // ids da tabela de preços
  faults: new Set(), // ids do catálogo de avarias
  query: "",
  open: new Set(), // grupos de avarias abertos
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]);
const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const euro = (n) => `${n} €`;
const allFaults = FAULT_CATALOG.flatMap((c) => c.items);

const icons = {
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>`,
  chev: `<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
};

/* ───────── Header, menu e navegação ───────── */
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
  matchMedia("(min-width: 901px)").addEventListener("change", (e) => e.matches && setMenu(false));

  // Marca a secção visível no menu.
  const links = new Map($$('a[href^="#"]', nav).map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        links.get(en.target.id)?.classList.add("active");
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Botões "pedir orçamento" que já escolhem o equipamento.
  $$("[data-device]").forEach((a) => a.addEventListener("click", () => selectDevice(a.dataset.device)));
}

function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { rootMargin: "0px 0px -10% 0px" }
  );
  els.forEach((e) => io.observe(e));
}

/* ───────── Tabela de preços ───────── */
function renderPrices() {
  const list = state.cat === "all" ? state.prices : state.prices.filter((p) => norm(p.category) === norm(state.cat));
  const groups = {};
  list.forEach((p) => (groups[p.category] ||= []).push(p));

  $("#priceList").innerHTML = Object.entries(groups)
    .map(
      ([cat, items]) => `
    <div class="price-group">
      <div class="price-group__title mono"><span>${esc(cat)}</span><span>${String(items.length).padStart(2, "0")}</span></div>
      ${items
        .map((p) => {
          const on = state.services.has(p.id);
          const long = String(p.priceLabel).length > 12;
          return `
        <div class="price${on ? " selected" : ""}" data-id="${esc(p.id)}">
          <div class="price__name">${esc(p.service)}${p.badge ? `<span class="price__tag">${esc(p.badge)}</span>` : ""}</div>
          <p class="price__desc">${esc(p.description)}</p>
          <div class="price__value${long ? " price__value--long" : ""}">${esc(p.priceLabel)}</div>
          <button type="button" class="price__add" aria-pressed="${on}" aria-label="${on ? "Remover do" : "Juntar ao"} orçamento: ${esc(p.service)}">${icons.plus}</button>
        </div>`;
        })
        .join("")}
    </div>`
    )
    .join("");
}

function initPrices() {
  $$("#priceTabs button").forEach((tab) =>
    tab.addEventListener("click", () => {
      state.cat = tab.dataset.cat;
      $$("#priceTabs button").forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      renderPrices();
    })
  );
  $("#priceList").addEventListener("click", (e) => {
    const row = e.target.closest(".price");
    if (!row) return;
    const id = row.dataset.id;
    state.services.has(id) ? state.services.delete(id) : state.services.add(id);
    renderPrices();
    updateSummary();
  });
  renderPrices();
  syncPrices();
}

async function syncPrices() {
  try {
    const res = await fetch(`${CONFIG.GOOGLE_SCRIPT_URL}?action=getPrices`);
    if (!res.ok) return;
    const data = await res.json();
    if (!Array.isArray(data?.prices) || !data.prices.length) return;
    state.prices = data.prices.map((p) => {
      const label = String(p.priceLabel ?? "").trim();
      return { ...p, priceValue: Number(p.priceValue) || 0, priceLabel: /^\d+(\.\d+)?$/.test(label) ? euro(label) : label };
    });
    renderPrices();
    updateSummary();
  } catch {
    // Sem ligação ao Sheets: ficam os preços de referência.
  }
}

/* ───────── Avarias ───────── */
function renderFaults() {
  const q = norm(state.query.trim());
  let shown = 0;
  $("#faults").innerHTML = FAULT_CATALOG.map((cat) => {
    const items = cat.items.filter((f) => !q || norm(`${f.title} ${f.sub} ${cat.categoryTitle}`).includes(q));
    if (!items.length) return "";
    shown += items.length;
    const picked = cat.items.filter((f) => state.faults.has(f.id)).length;
    return `
    <details class="fgroup" data-cat="${cat.categoryId}"${q || state.open.has(cat.categoryId) ? " open" : ""}>
      <summary>${esc(cat.categoryTitle)}<span class="fgroup__count">${picked || ""}</span>${icons.chev}</summary>
      <div class="fgroup__items">
        ${items
          .map(
            (f) => `
        <label class="fault">
          <input type="checkbox" value="${f.id}"${state.faults.has(f.id) ? " checked" : ""}>
          <span><i class="box">${icons.check}</i><b>${esc(f.title)}</b><small>${esc(f.sub)}</small><em>${esc(f.refLabel)}</em></span>
        </label>`
          )
          .join("")}
      </div>
    </details>`;
  }).join("");
  $("#faultsEmpty").hidden = shown > 0;
}

function initFaults() {
  renderFaults();
  const input = $("#faultSearch");
  input.addEventListener("input", () => { state.query = input.value; renderFaults(); });
  // Lembra os grupos abertos para os manter assim depois de uma pesquisa.
  $("#faults").addEventListener("toggle", (e) => {
    if (state.query) return;
    const g = e.target;
    g.open ? state.open.add(g.dataset.cat) : state.open.delete(g.dataset.cat);
  }, true);
  $("#faults").addEventListener("change", (e) => {
    const box = e.target.closest('input[type="checkbox"]');
    if (!box) return;
    box.checked ? state.faults.add(box.value) : state.faults.delete(box.value);
    const group = box.closest(".fgroup");
    const id = group.dataset.cat;
    const n = FAULT_CATALOG.find((c) => c.categoryId === id).items.filter((f) => state.faults.has(f.id)).length;
    $(".fgroup__count", group).textContent = n || "";
    updateSummary();
  });
}

/* ───────── Equipamento ───────── */
function selectDevice(value) {
  const radio = $(`input[name="deviceType"][value="${CSS.escape(value)}"]`);
  if (radio) { radio.checked = true; onDeviceChange(); }
}

function onDeviceChange() {
  const device = $('input[name="deviceType"]:checked').value;
  $("#consoleModels").hidden = device !== "Consola";
  // Abre o grupo de avarias que faz mais sentido para o equipamento.
  const open = device === "Consola" || device === "Comando / Periférico" ? "consolas" : null;
  if (open && !state.query) {
    state.open = new Set([open]);
    $$(".fgroup").forEach((g) => (g.open = g.dataset.cat === open));
  }
  updateSummary();
}

function initDevice() {
  $$('input[name="deviceType"]').forEach((r) => r.addEventListener("change", onDeviceChange));
  $$("#consoleModels button").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$("#consoleModels button").forEach((c) => c.classList.toggle("on", c === chip));
      $("#deviceBrandModel").value = chip.dataset.model;
      updateSummary();
    })
  );
  $("#deviceBrandModel").addEventListener("input", () => {
    $$("#consoleModels button").forEach((c) => c.classList.remove("on"));
    updateSummary();
  });
}

/* ───────── Resumo e estimativa ───────── */
function selection() {
  const services = state.prices.filter((p) => state.services.has(p.id));
  const faults = allFaults.filter((f) => state.faults.has(f.id));
  return [
    ...services.map((s) => ({ label: s.service, price: s.priceLabel, value: Number(s.priceValue) || 0, consult: !Number(s.priceValue) })),
    ...faults.map((f) => ({ label: f.title, price: f.refLabel, value: f.refPrice || 0, consult: !!f.isConsult })),
  ];
}

function estimate() {
  const items = selection();
  const home = $('input[name="deliveryMode"]:checked').value.startsWith("Deslocação");
  const urgent = $("#urgent24h").checked;
  const base = items.length ? items.reduce((a, i) => a + i.value, 0) : DIAGNOSIS;
  const total = base + (home ? DELIVERY_EXTRA : 0) + (urgent ? URGENT_EXTRA : 0);
  const consult = items.some((i) => i.consult);
  let text, note;
  if (!items.length) {
    text = euro(total);
    note = "Diagnóstico inicial, grátis se aceitares a reparação.";
  } else if (consult && total === 0) {
    text = "Sob consulta";
    note = "Confirmamos mão de obra e peça depois de sabermos o modelo.";
  } else if (consult) {
    text = `~${euro(total)} + consulta`;
    note = "Inclui itens sob consulta. Confirmamos sempre o valor final antes de avançar.";
  } else {
    text = `~${euro(total)}`;
    note = "Valor de referência, sem peças. Confirmamos sempre o valor final antes de avançar.";
  }
  return { items, home, urgent, text, note };
}

function updateSummary() {
  const { items, home, urgent, text, note } = estimate();
  const device = $('input[name="deviceType"]:checked').value;
  const model = $("#deviceBrandModel").value.trim();
  $("#sumDevice").innerHTML = `${esc(device)}${model ? `<small>${esc(model)}</small>` : ""}`;

  const extras = [
    home && `<li class="extra"><span>Deslocação ao domicílio</span><span>+${euro(DELIVERY_EXTRA)}</span></li>`,
    urgent && `<li class="extra"><span>Urgência 24 h</span><span>+${euro(URGENT_EXTRA)}</span></li>`,
    $("#needsBackup").checked && `<li class="extra"><span>Proteger ficheiros</span><span>grátis</span></li>`,
  ].filter(Boolean);
  $("#sumList").innerHTML =
    items.length || extras.length
      ? items.map((i) => `<li><span>${esc(i.label)}</span><span>${esc(i.price)}</span></li>`).join("") + extras.join("")
      : `<li class="muted">Ainda não escolheste nada. Marca sintomas no passo 2 ou serviços na tabela de preços.</li>`;
  $("#sumTotal").textContent = text;
  $("#sumNote").textContent = note;
  $("#clearAll").hidden = !items.length;

  const n = items.length;
  $("#navCount").hidden = !n;
  $("#navCount").textContent = n;
  $("#dockCount").textContent = n === 1 ? "1 item" : `${n} itens`;
  $("#dockTotal").textContent = text;
}

function initSummary() {
  $$('input[name="deliveryMode"], #urgent24h, #needsBackup').forEach((i) => i.addEventListener("change", updateSummary));
  $("#clearAll").addEventListener("click", () => {
    state.services.clear();
    state.faults.clear();
    renderPrices();
    renderFaults();
    updateSummary();
  });

  // Barra fixa em telemóvel: aparece enquanto o formulário está à vista e o resumo não.
  const dock = $("#dock");
  const vis = { form: false, summary: false };
  const sync = () => dock.classList.toggle("show", vis.form && !vis.summary);
  new IntersectionObserver(([e]) => { vis.form = e.isIntersecting; sync(); }, { rootMargin: "-20% 0px -20% 0px" }).observe($(".quote__steps"));
  new IntersectionObserver(([e]) => { vis.summary = e.isIntersecting; sync(); }).observe($("#summary"));
  $("#dockBtn").addEventListener("click", () => $("#summary").scrollIntoView({ behavior: "smooth", block: "start" }));
}

/* ───────── Envio ───────── */
async function submit(e) {
  e.preventDefault();
  const err = $("#formError");
  err.hidden = true;
  const val = (id) => $(`#${id}`).value.trim();
  const name = val("clientName");
  const phone = val("clientPhone");
  $("#clientName").setAttribute("aria-invalid", String(!name));
  $("#clientPhone").setAttribute("aria-invalid", String(!phone));
  if (!name || !phone) {
    err.textContent = "Falta o teu nome e telemóvel (passo 4) para te enviarmos o orçamento.";
    err.hidden = false;
    $(!name ? "#clientName" : "#clientPhone").focus();
    return;
  }

  const est = estimate();
  const faults = allFaults.filter((f) => state.faults.has(f.id)).map((f) => f.title);
  const services = state.prices.filter((p) => state.services.has(p.id)).map((p) => `${p.service} (${p.priceLabel})`);
  const description = val("description");
  if (!faults.length && !services.length && !description) faults.push("Diagnóstico Inicial Geral (Avaliação de Avaria)");

  // Mesmo formato que o site anterior, para o Apps Script continuar a funcionar.
  const payload = {
    quoteId: "NB-" + Math.floor(1000 + Math.random() * 9000),
    clientName: name,
    clientPhone: phone,
    clientEmail: val("clientEmail"),
    clientLocation: val("clientLocation"),
    deviceType: $('input[name="deviceType"]:checked').value,
    deviceBrandModel: val("deviceBrandModel"),
    faults,
    services,
    description,
    needsBackup: $("#needsBackup").checked,
    deliveryMode: $('input[name="deliveryMode"]:checked').value,
    urgent24h: est.urgent,
    estimatedPrice: est.text,
  };

  const btn = $("#submitBtn");
  const html = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = "<span>A enviar…</span>";
  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn("Não foi possível contactar o Google Sheets; segue a confirmação por WhatsApp.", error);
  } finally {
    btn.disabled = false;
    btn.innerHTML = html;
  }
  showModal(payload);
}

function showModal(p) {
  const all = [...p.services, ...p.faults];
  $("#modalCode").textContent = `#${p.quoteId}`;
  $("#modalBox").innerHTML = `
    <div><b>${esc(p.clientName)}</b> · ${esc(p.clientPhone)}</div>
    <div>${esc(p.deviceType)}${p.deviceBrandModel ? ` · ${esc(p.deviceBrandModel)}` : ""}</div>
    <div>${esc(all.join(", "))}</div>
    <div>Estimativa: <b>${esc(p.estimatedPrice)}</b>${p.urgent24h ? " · urgente 24 h" : ""}</div>`;

  const text = [
    `Olá NorteBit! Fiz um pedido de orçamento no site (#${p.quoteId}):`,
    "",
    `Nome: ${p.clientName}`,
    `Contacto: ${p.clientPhone}`,
    `Equipamento: ${p.deviceType}${p.deviceBrandModel ? ` (${p.deviceBrandModel})` : ""}`,
    `Avarias/serviços: ${all.join(" | ")}`,
    p.description ? `Notas: ${p.description}` : null,
    `Entrega: ${p.deliveryMode}`,
    p.urgent24h ? `Urgência 24h: sim (+25 €)` : null,
    `Estimativa: ${p.estimatedPrice}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  $("#modalWa").href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const modal = $("#modal");
  modal.showModal ? modal.showModal() : modal.setAttribute("open", "");
}

function initForm() {
  $("#quoteForm").addEventListener("submit", submit);
  $$("#clientName, #clientPhone").forEach((i) => i.addEventListener("input", () => i.removeAttribute("aria-invalid")));
  const modal = $("#modal");
  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => e.target === modal && modal.close());
}

/* ───────── Arranque ───────── */
$("#year").textContent = new Date().getFullYear();
initHeader();
initReveal();
initPrices();
initFaults();
initDevice();
initSummary();
initForm();
updateSummary();
