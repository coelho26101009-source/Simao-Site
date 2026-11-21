# Simão Coelho — personal site

My personal site: who I am, my socials and my two main projects, **NANO** and **Vuxio**.
English at `/`, Portuguese at `/pt/`.

## Change the text

All the words are in `content/`:

| File | What is in it |
|---|---|
| `content/profile.mjs` | Name, age, city, social links, tools, project links. Same in every language. |
| `content/en.mjs` | English text. |
| `content/pt.mjs` | Portuguese text. Must have the same parts as `en.mjs`. |

To add a social network, add one line to `socials` in `profile.mjs`, for example
`{ label: "Instagram", url: "https://instagram.com/..." }`.

Images live in `public/assets/img/`.

## Run it on your PC

Needs Node 20 or newer.

```
npm run build
npm run serve
```

Then open http://localhost:4173.

## Tests

```
npm install
npm test          # builds and checks text, links and files
npm run verify    # opens the site in a real browser (desktop + phone, en + pt)
```

## How it is made

Plain HTML, CSS and JavaScript, built by `build.mjs` into `dist/`. No framework.
Animations use [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering) (both copied into `public/assets/vendor/`),
plus a small WebGL background. Fonts are self-hosted: Inter Tight, Instrument Serif and JetBrains Mono (SIL Open Font License).
Hosted on Vercel; every push to `main` goes live.

Design inspired by the style of creative developer portfolios; all code and text are original.
