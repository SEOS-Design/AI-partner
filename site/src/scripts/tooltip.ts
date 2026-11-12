// Ordlistans popup (2026-11-12) – portad från seosdesign.se (seos-web/src/scripts/tooltip.ts).
//
// Själva bubblan är CSS: länkens egen ::after med definitionen ur data-tooltip
// (global.css .term-link). Utan det här skriptet fungerar länkarna ändå, och bubblan
// öppnas vid hover och tangentbordsfokus. Skriptet lägger till det CSS inte klarar:
//
//  1. ESCAPE stänger bubblan utan att pekaren flyttas (WCAG 1.4.13).
//  2. PEKSKÄRM: första trycket visar definitionen, ett andra tryck på samma länk inom
//     2,5 s följer länken, ett tryck någon annanstans stänger.
//  3. SKÄRMLÄSARE: data-tooltip läses inte upp, och title får inte användas (webbläsarens
//     egen tooltip skulle lägga sig över bubblan). En gemensam dold nod fylls med
//     definitionen och pekas ut med aria-describedby.
//  4. KANTEN: bubblan flyttas in om den annars skulle hamna utanför fönstret.

const TIP_ID = 'ordlista-tip';
const TAP_WINDOW = 2500;
const EDGE = 8;

let described: HTMLAnchorElement | null = null;
let armed: HTMLAnchorElement | null = null;
let armedAt = 0;

function tipNode(): HTMLElement {
  let el = document.getElementById(TIP_ID);
  if (!el) {
    el = document.createElement('span');
    el.id = TIP_ID;
    el.className = 'visually-hidden';
    document.body.appendChild(el);
  }
  return el;
}

/** Håller bubblan inom fönstret: den öppnas från länkens vänsterkant och kan annars
    sticka ut till höger. Bredden läses från pseudo-elementets beräknade stil. */
function place(link: HTMLAnchorElement): void {
  link.style.removeProperty('--tip-x');
  const w = parseFloat(getComputedStyle(link, '::after').width);
  if (!w) return;
  const left = link.getBoundingClientRect().left;
  const over = left + w + EDGE - document.documentElement.clientWidth;
  if (over > 0) link.style.setProperty('--tip-x', `${-Math.min(over, Math.max(0, left - EDGE))}px`);
}

function describe(link: HTMLAnchorElement | null): void {
  if (described === link) return;
  if (described) {
    described.removeAttribute('aria-describedby');
    described.style.removeProperty('--tip-x');
  }
  described = link;
  if (!link) return;
  tipNode().textContent = link.dataset.tooltip ?? '';
  link.setAttribute('aria-describedby', TIP_ID);
  place(link);
}

function close(): void {
  if (armed) armed.removeAttribute('data-tip-open');
  armed = null;
  describe(null);
}

const trigger = (target: EventTarget | null): HTMLAnchorElement | null =>
  target instanceof Element ? target.closest<HTMLAnchorElement>('a.term-link') : null;

document.addEventListener(
  'pointerover',
  (e) => {
    if (e.pointerType === 'touch') return;
    describe(trigger(e.target));
  },
  { passive: true },
);
document.addEventListener('focusin', (e) => describe(trigger(e.target)));
document.addEventListener('focusout', () => describe(null));

// Escape döljer bubblan där den är. Nästa pekarrörelse eller fokusbyte slår på den igen.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!document.querySelector('a.term-link:hover, a.term-link:focus-visible, a.term-link[data-tip-open]')) return;
  document.documentElement.dataset.tip = 'off';
  close();
});
document.addEventListener(
  'pointermove',
  () => {
    if (document.documentElement.dataset.tip === 'off') delete document.documentElement.dataset.tip;
  },
  { passive: true },
);

// Pekskärm: första trycket öppnar, andra trycket på samma länk inom fönstret följer den.
// click (inte pointerdown) så att en rullning som börjar på en länk förblir en rullning.
document.addEventListener(
  'click',
  (e) => {
    const link = trigger(e.target);
    if (!link) {
      close();
      return;
    }
    if ((e as PointerEvent).pointerType !== 'touch') return; // mus, penna, tangentbord: följ länken
    if (armed === link && Date.now() - armedAt < TAP_WINDOW) {
      close();
      return;
    }
    e.preventDefault();
    if (armed && armed !== link) armed.removeAttribute('data-tip-open');
    armed = link;
    armedAt = Date.now();
    link.setAttribute('data-tip-open', '');
    describe(link);
  },
  { capture: true },
);

addEventListener('resize', () => { if (described) place(described); }, { passive: true });

export {};
