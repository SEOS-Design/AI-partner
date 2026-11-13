// Ordlistan: hämtning, byggkontroller och autolänkaren (2026-11-12).
//
// AUTOLÄNKAREN länkar ordlistans begrepp i färdig HTML (artiklarnas och termernas
// brödtext) till /ordlista/<id>, med definitionen i data-tooltip så att den visas som
// popup (global.css .term-link + scripts/tooltip.ts). Samma upplägg som kunskapsbanken
// på seosdesign.se och ordlistorna på allamallar.se och rekryteringskartan.se.
//
// VARFÖR PÅ FÄRDIG HTML OCH INTE SOM REHYPE-PLUGIN: Astro sparar den renderade
// markdownen per fil och renderar bara om en fil när just den filen ändrats. En ny term
// skulle då aldrig länkas i artiklar som inte rörts. Sidmallarna körs däremot vid varje
// bygge, så länkningen görs där: `linker.link(entry.rendered.html)`.
//
// REGLER
//  - Högst en länk per term och avsnitt (nytt avsnitt vid varje h2) och högst
//    MAX_PER_PAGE per term och sida. Utan taket blir vanliga ord som "automatisering"
//    länkade i varje avsnitt.
//  - Aldrig i rubriker, befintliga länkar, tabeller eller kod.
//  - Längsta formen vinner ("Microsoft Copilot" före "Copilot").
//  - Bara hela ord: "API" länkas inte inuti "API-nyckel" eller "kapital".
//  - En term länkas aldrig på sin egen sida.
//  - Texten ändras aldrig: länken läggs runt ordet precis som det står.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Term = CollectionEntry<'ordlista'>;

export const GROUPS: Record<Term['data']['group'], string> = {
  'ai-teknik': 'AI-teknik',
  automation: 'Automation',
  'regler-sakerhet': 'Regler och säkerhet',
  verktyg: 'Verktyg',
  arbetssatt: 'Arbetssätt',
};

const MAX_PER_PAGE = 2;

/** Publicerade termer i bokstavsordning. */
export async function getTerms(): Promise<Term[]> {
  const all = await getCollection('ordlista', ({ data }) => !data.draft);
  const articles = new Set((await getCollection('kunskapsbank', ({ data }) => !data.draft)).map((a) => a.id));
  validate(all, articles);
  return all.sort((a, b) => a.data.term.localeCompare(b.data.term, 'sv'));
}

/** Alla ordformer som länkas för en term: uppslagsordet + `former`. */
const formsOf = (t: Term) => [t.data.term, ...t.data.former].map((f) => f.trim()).filter(Boolean);

/** Byggkontroller: stoppar bygget i stället för att publicera en trasig ordlista. */
function validate(all: Term[], articles: Set<string>) {
  const ids = new Set(all.map((t) => t.id));
  const owner = new Map<string, string>();
  const errors: string[] = [];
  for (const t of all) {
    const body = t.body ?? '';
    for (const form of formsOf(t)) {
      const key = form.toLowerCase();
      const first = owner.get(key);
      if (first && first !== t.id) errors.push(`${t.id}: ordformen "${form}" finns redan på ${first}`);
      owner.set(key, t.id);
    }
    if (articles.has(t.id)) errors.push(`${t.id}: samma id som en guide i kunskapsbanken – guiden äger ämnet`);
    if (t.data.guide && !articles.has(t.data.guide.id)) errors.push(`${t.id}: guiden "${t.data.guide.id}" finns inte`);
    for (const r of t.data.related) {
      if (!ids.has(r.id)) errors.push(`${t.id}: relaterad term "${r.id}" finns inte`);
      if (r.id === t.id) errors.push(`${t.id}: termen pekar på sig själv i related`);
    }
    if (!/[.!?]$/.test(t.data.definition.trim())) errors.push(`${t.id}: definitionen ska vara en hel mening med punkt`);
    if (/^# /m.test(body)) errors.push(`${t.id}: en H1 (# …) i texten — H1 ska ligga i frontmatter (h1)`);
    if (body.includes('[LÄNK:') || body.includes('[KOMMANDE]')) errors.push(`${t.id}: platshållare finns kvar`);
    for (const [, slug] of body.matchAll(/\]\(\/kunskapsbank\/([^)#\s/]+)\/?(?:#[^)]*)?\)/g)) {
      if (!articles.has(slug)) errors.push(`${t.id}: död intern länk till /kunskapsbank/${slug}`);
    }
    for (const [, slug] of body.matchAll(/\]\(\/ordlista\/([^)#\s/]+)\/?(?:#[^)]*)?\)/g)) {
      errors.push(`${t.id}: handlagd länk till /ordlista/${slug} – skriv begreppet i löptext, autolänkaren länkar`);
    }
  }
  if (errors.length) throw new Error('Ordlistan:\n  ' + errors.join('\n  '));
}

/* ------------------------------------------------------------------ länkaren */

export interface Linker {
  /** Länkar begreppen i färdig HTML. `selfId` = termen vars egen sida texten står på. */
  link(html: string, selfId?: string): string;
  /** Vilka termer som förekommer i en text (rå markdown går bra). */
  mentions(text: string): Set<string>;
}

/** Bokstäver och siffror, med å, ä, ö och övriga latinska tecken (\b kan inte svenska). */
const W = '0-9A-Za-z\\u00C0-\\u024F';
/** Element vars text aldrig länkas. */
const OPAQUE = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'table', 'script', 'style', 'button']);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s: string) => escapeHtml(s).replace(/"/g, '&quot;');

let cache: { terms: Term[]; linker: Linker } | undefined;

export function createLinker(terms: Term[]): Linker {
  if (cache?.terms === terms) return cache.linker;

  const byForm = new Map<string, Term>();
  for (const t of terms) for (const form of formsOf(t)) byForm.set(escapeHtml(form).toLowerCase(), t);
  // Längst först: alternationen provar grenarna i ordning, så ordningen ÄR regeln.
  const alt = [...byForm.keys()].sort((a, b) => b.length - a.length).map(escapeRe).join('|');
  // Hela ord, och inte som led i en bindestreckssammansättning ("API-nyckel", "icke-API").
  const pattern = alt ? `(?<![${W}])(?<![${W}]-)(${alt})(?![${W}])(?!-[${W}])` : '';

  const link = (html: string, selfId?: string): string => {
    if (!pattern) return html;
    const rx = new RegExp(pattern, 'gi');
    const perPage = new Map<string, number>();
    let section = new Set<string>();
    let opaque = 0;

    return html
      .split(/(<[^>]+>)/)
      .map((part) => {
        if (part.startsWith('<')) {
          const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/.exec(part);
          if (!m) return part; // kommentar, doctype
          const name = m[2].toLowerCase();
          if (m[1]) {
            if (OPAQUE.has(name)) opaque = Math.max(0, opaque - 1);
          } else {
            if (name === 'h2') section = new Set();
            if (OPAQUE.has(name) && !part.endsWith('/>')) opaque += 1;
          }
          return part;
        }
        if (opaque || !part.trim()) return part;
        return part.replace(rx, (matched) => {
          const term = byForm.get(matched.toLowerCase());
          if (!term || term.id === selfId || section.has(term.id)) return matched;
          const n = perPage.get(term.id) ?? 0;
          if (n >= MAX_PER_PAGE) return matched;
          section.add(term.id);
          perPage.set(term.id, n + 1);
          return `<a class="term-link" href="/ordlista/${term.id}" data-tooltip="${escapeAttr(term.data.definition)}">${matched}</a>`;
        });
      })
      .join('');
  };

  const mentions = (text: string): Set<string> => {
    const found = new Set<string>();
    if (!pattern) return found;
    // Länkmål och rubriker räknas inte – där länkar autolänkaren aldrig.
    const plain = escapeHtml(text.replace(/\]\([^)]*\)/g, ']').replace(/^#{1,6} .*$/gm, ''));
    for (const m of plain.matchAll(new RegExp(pattern, 'gi'))) {
      const term = byForm.get(m[1].toLowerCase());
      if (term) found.add(term.id);
    }
    return found;
  };

  const linker = { link, mentions };
  cache = { terms, linker };
  return linker;
}

/** Brödtexten med autolänkar, eller undefined om HTML:en inte går att länka i efterhand
    (lokala bilder renderas av <Content />, då får sidan använda den i stället). */
export function linkedHtml(entry: { rendered?: { html: string } }, linker: Linker, selfId?: string): string | undefined {
  const html = entry.rendered?.html;
  if (!html || html.includes('__ASTRO_IMAGE_')) return undefined;
  return linker.link(html, selfId);
}
