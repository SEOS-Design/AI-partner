// smooth.ts – mjuk scroll med Lenis (2026-10-18, Björn: "likt SEOS").
//
// Grund som seosdesign.se (uppmätt i deras smooth-bundle): Lenis
// 1.3.26, ankarlänkar direkt, bara med mus/styrplatta (utjämningen: se LERPS nedan)
// — aldrig på touch — och avstängt vid prefers-reduced-motion.
//
// Lenis scrollar fönstret på riktigt (window.scrollTo varje bildruta), så CSS
// view-timelines (rubrik-drapen), position: sticky och GSAP ScrollTrigger följer
// med utan extra koppling.
//
// TEST (lokalt): ?lenis=0 stänger av, ?lenis=1 slår på igen. Valet sparas i
// webbläsaren (localStorage) tills det ändras. Dämpad scroll har valts bort en gång
// förut — därför ska det vara lätt att jämföra med och utan.

import Lenis from 'lenis';

const KEY = 'ap-lenis';
const param = new URLSearchParams(location.search).get('lenis');
try {
  if (param === '0') localStorage.setItem(KEY, 'off');
  if (param === '1') localStorage.removeItem(KEY);
} catch {}

let off = false;
try {
  off = localStorage.getItem(KEY) === 'off';
} catch {}

const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Utjämningen: andel av vägen till målet per bildruta. 0.2 = SEOS (lätt),
// 0.1 = Lenis standard, lägre = mer glid men senare respons. TEST lokalt: knappen
// nere till vänster stegar genom LERPS (sparas i webbläsaren).
// Standard = 0.12 "mellan" (Björn 2026-10-18, efter test av alla tre).
const LERPS = [0.2, 0.12, 0.08];
const DEFAULT_LERP = 0.12;
let lerp = DEFAULT_LERP;
try {
  const saved = parseFloat(localStorage.getItem(KEY + '-lerp') ?? '');
  if (LERPS.includes(saved)) lerp = saved;
} catch {}

if (!off && fine && !reduced) {
  const lenis = new Lenis({
    autoRaf: true,
    lerp,
    anchors: { immediate: true },
    allowNestedScroll: true,
  });
  // Synligt i devtools: window.lenis (bra vid felsökning och jämförelse).
  (window as unknown as { lenis: Lenis }).lenis = lenis;
}

// Bara lokalt (dev-servern): en liten knapp nere till vänster som visar läget och
// växlar direkt — för att jämföra med och utan. Byggs aldrig in på hemsidan.
if (import.meta.env.DEV) {
  const on = !off && fine && !reduced;
  const b = document.createElement('button');
  b.type = 'button';
  // Högre lerp = sidan hinner ikapp fortare = MINDRE glid. Därför ord, inte siffror.
  const NAMES: Record<number, string> = { 0.2: 'lätt glid (SEOS)', 0.12: 'mellan', 0.08: 'mycket glid' };
  b.textContent = `Mjuk scroll: ${on ? NAMES[lerp] : off ? 'av' : 'av (touch/reducerad rörelse)'}`;
  b.title = 'Klicka: av → lätt (SEOS) → mellan → mycket → av';
  b.style.cssText =
    'position:fixed;left:12px;bottom:12px;z-index:9999;padding:6px 10px;border-radius:999px;' +
    'border:1px solid rgba(255,255,255,.3);background:rgba(10,10,12,.85);color:#fff;' +
    'font:600 12px/1 system-ui,sans-serif;cursor:pointer';
  b.addEventListener('click', () => {
    // av → 0.2 → 0.12 → 0.08 → av
    try {
      if (off) {
        localStorage.removeItem(KEY);
        localStorage.setItem(KEY + '-lerp', String(LERPS[0]));
      } else {
        const next = LERPS[LERPS.indexOf(lerp) + 1];
        if (next) localStorage.setItem(KEY + '-lerp', String(next));
        else localStorage.setItem(KEY, 'off');
      }
    } catch {}
    // Utan ?lenis= i adressen — annars skulle parametern skriva över valet igen.
    const url = new URL(location.href);
    url.searchParams.delete('lenis');
    location.replace(url.href);
  });
  document.body.append(b);
}
