// English copy (default language, served at "/").
// pt.mjs must have exactly the same shape: `npm test` checks it.
import { profile } from "./profile.mjs";

export const en = {
  lang: "en",
  htmlLang: "en",
  ogLocale: "en_US",
  path: "/",
  other: { label: "PT", href: "/pt/", hrefLang: "pt-PT", aria: "Ver o site em português" },
  meta: {
    title: `${profile.name} — Student developer, builder of NANO`,
    description: `${profile.name}, ${profile.age}, student developer from ${profile.city}, Portugal. Builder of NANO, a personal AI assistant for Windows and Android, and of Vuxio.`,
  },
  skip: "Skip to content",
  loader: {
    words: ["Hello", "Olá", "Hola", "Bonjour", "Ciao", "Hallo", "Welcome"],
    label: "Loading",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    kicker: "Portfolio / 2026",
    role: ["Student", "developer"],
    lines: ["I build software that", "thinks, listens and", "gets things done."],
    location: `Based in ${profile.city}, Portugal`,
    status: "Open to ideas",
    scroll: "Scroll",
    photoAlt: `Black and white photo of ${profile.name} sitting in a white armchair`,
  },
  about: {
    label: "About",
    text: `I'm ${profile.firstName}, a ${profile.age}-year-old student from ${profile.city}, Portugal, who would rather build things than just use them. Most of my time goes into NANO, a personal AI assistant I'm shaping into my own JARVIS: one that sees, remembers and helps with everything, from my PC to my phone.`,
    facts: [
      { k: "Based in", v: `${profile.city}, Portugal` },
      { k: "Age", v: `${profile.age}` },
      { k: "Focus", v: "AI assistants, apps, the web" },
      { k: "Main project", v: "NANO" },
      { k: "Languages", v: "Portuguese, English" },
    ],
    stackLabel: "Tools I use",
  },
  work: {
    label: "Selected work",
    count: "02 projects",
    featured: "Main project",
    live: "Visit site",
    code: "Source code",
    soon: "Coming soon",
    nano: {
      title: "NANO",
      year: "2025 — now",
      kind: "Personal AI assistant",
      text: "A free, open-source AI assistant for Windows with an Android companion app. It talks, remembers what matters, controls the PC, works with local or cloud models, and reaches my phone even away from home.",
      bullets: ["Voice and chat", "Long-term memory with a 3D brain", "Windows control with permission", "Android app, end-to-end encrypted link"],
      tags: ["Python", "Electron", "React", "Android"],
      imgAlt: "NANO home screen",
      img3Alt: "NANO on an Android phone",
    },
    vuxio: {
      title: "Vuxio",
      year: "2026",
      kind: "AI chat app, built from scratch",
      text: "A full AI chat app I wrote by hand, with no templates: answers that stream in as they are written, a Code mode for programming, web search with sources, memory and voice. Its sibling VUXIOCODE is a coding assistant for the terminal that runs on local models first.",
      bullets: ["Streaming answers", "Code mode and web search", "Memory with /remember", "Voice in and out"],
      tags: ["React", "TypeScript", "Firebase", "Node"],
      cli: "VUXIOCODE",
      imgAlt: "Vuxio chat screen in dark mode",
      img2Alt: "Vuxio welcome page",
    },
  },
  marquee: ["Build", "Learn", "Ship", "Repeat"],
  contact: {
    label: "Contact",
    title: ["Let's build", "something."],
    text: "Have an idea, a question or just want to say hi? Find me here.",
    copy: "Copy",
    copied: "Copied",
  },
  footer: {
    local: "Local time",
    made: "Designed and built by",
    top: "Back to top",
  },
  noscript: "This site works best with JavaScript turned on.",
};
