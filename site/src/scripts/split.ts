// split.ts – delar rubriker med `data-split` i ord för rubrik-drapen (CSS i
// global.css, sök "Rubrik-drape"). Importeras i Layout → körs på alla sidor.
//
// Varje ord blir <span class="w" style="--i: n">, rubriken får --n (antal ord) och
// klassen .split, som slår på animationen. Inre element (<br>, dämpade spans) behålls.
// Vid reduced motion delas ingenting → rubriken står som vanlig text.
//
// Webbläsare utan view-timeline (Firefox): samma --scroll-progress räknas här vid
// scroll, med samma sträcka som CSS:ens `entry contain 40vh` (som seosdesign.se).

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function split(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  let i = 0;
  for (const node of nodes) {
    if (!node.data.trim()) continue;
    const frag = document.createDocumentFragment();
    for (const part of node.data.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(part);
        continue;
      }
      const w = document.createElement('span');
      w.className = 'w';
      w.style.setProperty('--i', String(i++));
      w.textContent = part;
      frag.append(w);
    }
    node.replaceWith(frag);
  }
  el.style.setProperty('--n', String(i));
  el.classList.add('split');
}

const heads = Array.from(document.querySelectorAll<HTMLElement>('[data-split]'));

if (heads.length && !reduced.matches) {
  heads.forEach(split);

  if (!CSS.supports('animation-timeline', 'view()')) {
    // Bara rubriker som ligger under vyn vid laddning animeras (som SEOS);
    // de som redan syns står kvar i slutläget (--scroll-progress har 1 som start).
    const live = heads.filter((el) => el.getBoundingClientRect().top >= innerHeight);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      // Samma sträcka som CSS:en: 40vh in i vyn på desktop, 8vh under 860 px.
      const extra = innerWidth < 860 ? 0.08 : 0.4;
      for (const el of live) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * extra + Math.min(r.height, vh))));
        el.style.setProperty('--scroll-progress', p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (live.length) {
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      update();
    }
  }
}
