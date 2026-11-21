/* Simão — site interactions.
   Works without GSAP/Lenis (everything simply shows). */
(() => {
  "use strict";

  const root = document.documentElement;
  clearTimeout(window.__fs);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ───────── Clocks ───────── */
  const clocks = $$(".clock");
  const tick = () => {
    const now = new Date();
    for (const el of clocks) {
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: el.dataset.tz };
      if (el.hasAttribute("data-seconds")) opts.second = "2-digit";
      try {
        el.textContent = new Intl.DateTimeFormat("en-GB", opts).format(now) + (el.hasAttribute("data-seconds") ? " (PT)" : "");
      } catch {
        el.textContent = now.toTimeString().slice(0, el.hasAttribute("data-seconds") ? 8 : 5);
      }
    }
  };
  tick();
  setInterval(tick, 1000);

  /* ───────── Copy email ───────── */
  for (const b of $$("[data-copy]")) {
    const label = b.textContent;
    b.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        b.textContent = "✓ " + b.dataset.done;
        setTimeout(() => (b.textContent = label), 1800);
      } catch {
        location.href = "mailto:" + b.dataset.copy;
      }
    });
  }

  /* ───────── Simple reveals (IntersectionObserver, no GSAP needed) ───────── */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ───────── Word-by-word reading reveal ───────── */
  const wordBlocks = $$(".reveal-words");
  const updateWords = () => {
    const vh = innerHeight;
    for (const block of wordBlocks) {
      const r = block.getBoundingClientRect();
      const ws = block.__w || (block.__w = $$(".w", block));
      // Progress: 0 when the block's top is at 85% of the screen, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
    }
  };
  if (!reduce) {
    addEventListener("scroll", updateWords, { passive: true });
    addEventListener("resize", updateWords);
    updateWords();
  }

  /* ───────── Without GSAP: show everything and stop here ───────── */
  if (!gsap) {
    root.classList.add("failsafe");
    return;
  }
  if (ST) gsap.registerPlugin(ST);

  /* ───────── Smooth scroll ───────── */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    if (ST) lenis.on("scroll", ST.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // Anchor links go through Lenis so they glide.
    for (const a of $$('a[href^="#"], a[href*="#top"]')) {
      a.addEventListener("click", (ev) => {
        const id = a.getAttribute("href").split("#")[1];
        const target = id && document.getElementById(id);
        if (!target) return;
        ev.preventDefault();
        lenis.scrollTo(id === "top" ? 0 : target, { offset: 0, duration: 1.6 });
        history.replaceState(null, "", "#" + id);
      });
    }
  }

  /* ───────── Intro: loader → hero ───────── */
  const heroIn = () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(".hero__name .l > span", { yPercent: 0, y: 0, duration: 1.5, stagger: 0.06 })
      .to(".hero__photo-inner", { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.inOut" }, 0.1)
      .from(".hero__photo img", { scale: 1.35, duration: 2.2 }, 0.1)
      .to(".hero__lines .line > span, .hero__role", { y: 0, yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.35)
      .from(".hero__meta > *, .header > *, .hero__scroll, .hero__photo figcaption", { opacity: 0, y: -12, duration: 1, stagger: 0.05 }, 0.5);
    return tl;
  };

  const setHeroHidden = () => {
    gsap.set(".hero__name .l > span", { yPercent: 110 });
    gsap.set(".hero__lines .line > span", { yPercent: 110 });
    gsap.set(".hero__role", { opacity: 0, y: 20 });
    gsap.set(".hero__photo-inner", { clipPath: "inset(100% 0 0 0)" });
  };

  const loader = $(".loader");
  const loaderVisible = loader && getComputedStyle(loader).display !== "none";

  if (reduce) {
    root.classList.add("failsafe");
    if (loader) loader.remove();
  } else if (loaderVisible) {
    setHeroHidden();
    lenis && lenis.stop();
    const word = $(".loader__word");
    const list = JSON.parse(word.dataset.words || "[]");
    const count = $(".loader__count");
    const bar = $(".loader__bar span");
    let wi = 0;
    const swap = setInterval(() => {
      wi = (wi + 1) % list.length;
      word.textContent = list[wi];
    }, 260);
    const state = { p: 0 };
    gsap
      .timeline()
      .to(state, {
        p: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          count.textContent = String(Math.round(state.p)).padStart(3, "0");
          bar.style.width = state.p + "%";
        },
      })
      .add(() => {
        clearInterval(swap);
        word.textContent = list[list.length - 1];
      })
      .to(".loader__word, .loader__top, .loader__bottom", { opacity: 0, y: -20, duration: 0.5, stagger: 0.04, ease: "power2.in" }, "+=0.15")
      .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "-=0.1")
      .add(heroIn(), "-=0.55")
      .add(() => {
        loader.remove();
        lenis && lenis.start();
        try { sessionStorage.setItem("simao-seen", "1"); } catch {}
      });
  } else {
    setHeroHidden();
    if (loader) loader.remove();
    heroIn();
  }

  if (reduce || !ST) {
    gsap.set(".marquee__track", { clearProps: "all" });
    startGL(false);
    return;
  }

  /* ───────── Scroll animations ───────── */
  // Hero name drifts and photo parallax on scroll.
  gsap.to(".hero__name", {
    yPercent: 18, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero__photo-inner img", {
    yPercent: 12, ease: "none",
    scrollTrigger: { trigger: ".hero__photo", start: "top bottom", end: "bottom top", scrub: true },
  });

  // Line reveals in the contact title.
  gsap.set(".contact__title .line > span", { yPercent: 110 });
  ST.create({
    trigger: ".contact__title", start: "top 85%", once: true,
    onEnter: () => gsap.to(".contact__title .line > span", { yPercent: 0, duration: 1.3, stagger: 0.1, ease: "expo.out" }),
  });

  // Project titles: letters rise, symbol spins in.
  for (const title of $$(".case__title")) {
    const ls = $$(".l > span", title);
    const sym = $(".case__symbol", title);
    gsap.set(ls, { yPercent: 110 });
    if (sym) gsap.set(sym, { scale: 0, rotate: -90 });
    ST.create({
      trigger: title, start: "top 85%", once: true,
      onEnter: () => {
        gsap.to(ls, { yPercent: 0, duration: 1.4, stagger: 0.07, ease: "expo.out" });
        if (sym) gsap.to(sym, { scale: 1, rotate: 0, duration: 1.4, ease: "expo.out" });
      },
    });
  }

  // Screenshots: clip reveal + inner parallax.
  for (const shot of $$(".shot")) {
    gsap.fromTo(shot, { clipPath: "inset(12% 8% 12% 8% round 14px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 14px)", ease: "none",
      scrollTrigger: { trigger: shot, start: "top 95%", end: "top 45%", scrub: true },
    });
    gsap.fromTo($("img", shot), { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true },
    });
  }

  // Marquee: always moving, faster and reversing with scroll velocity.
  const track = $(".marquee__track");
  if (track) {
    let x = 0;
    let dir = -1;
    let boost = 0;
    const half = () => track.scrollWidth / 2;
    gsap.ticker.add((t, dt) => {
      x += dir * (0.045 + boost) * dt;
      const h = half();
      if (x <= -h) x += h;
      if (x > 0) x -= h;
      track.style.transform = `translate3d(${x}px,0,0)`;
      boost *= 0.92;
    });
    ST.create({
      trigger: ".marquee", start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction === 1 ? -1 : 1;
        boost = Math.min(0.6, Math.abs(self.getVelocity()) / 6000);
      },
    });
  }

  /* ───────── Cursor + magnetic ───────── */
  if (finePointer) {
    root.classList.add("has-cursor");
    const cur = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    const label = $(".cursor__label");
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    addEventListener("pointermove", (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      cur.classList.remove("is-hidden");
    }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.add("is-hidden"));
    document.addEventListener("pointerover", (e) => {
      const view = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button");
      cur.classList.toggle("is-view", !!view && !link);
      cur.classList.toggle("is-link", !!link);
      label.textContent = view && !link ? view.dataset.cursor : "";
    });

    for (const m of $$(".magnetic")) {
      const mx = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const my = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      m.addEventListener("pointermove", (e) => {
        const r = m.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.3);
        my((e.clientY - r.top - r.height / 2) * 0.4);
      });
      m.addEventListener("pointerleave", () => { mx(0); my(0); });
    }
  }

  startGL(true);

  /* ───────── WebGL background: slow dark smoke that follows the mouse ───────── */
  function startGL(animate) {
    const canvas = $(".bg-gl");
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fs = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 q=uv*vec2(r.x/r.y,1.)*1.6;
float s=t*.035;vec2 w=vec2(fbm(q+s),fbm(q+vec2(5.2,1.3)-s));
float f=fbm(q+2.2*w+vec2(s*.6,0.));
float d=distance(uv,m);float glow=smoothstep(.6,0.,d);
vec3 c=vec3(.019)+vec3(.05,.055,.065)*pow(f,2.2)+vec3(.035,.05,.08)*glow*f;
c*=1.-.45*length(uv-.5);
gl_FragColor=vec4(c,1.);}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r");
    const uT = gl.getUniformLocation(pr, "t");
    const uM = gl.getUniformLocation(pr, "m");
    const scale = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };
    resize();
    addEventListener("resize", resize);
    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    addEventListener("pointermove", (e) => { mouse.tx = e.clientX / innerWidth; mouse.ty = 1 - e.clientY / innerHeight; }, { passive: true });
    let start = performance.now();
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    draw();
    canvas.classList.add("on");
    if (!animate) return;
    let raf = 0;
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    const run = () => { cancelAnimationFrame(raf); if (!document.hidden) loop(); };
    document.addEventListener("visibilitychange", run);
    run();
  }
})();
