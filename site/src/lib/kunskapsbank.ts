// Kunskapsbanken: hämtning, sortering och byggkontroller (2026-09-29).
// Motsvarar CMS:ets "collection list": alla sidor hämtar artiklarna HÄRIFRÅN, så att
// sortering (nyast överst), utkastfilter och kontroller gäller överallt.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'kunskapsbank'>;

// Gamla artiklar på aipartner.se som ska flyttas över som de är men ännu inte finns
// i repot (docs/innehall-utan-cms.md, punkt 5). Länkar dit godkänns tills de finns.
// Ta bort en rad när artikeln är inlagd.
const PENDING_LEGACY = new Set([
  'ai-for-smaforetag',
  'ai-policy-i-foretag-darfor-behover-ni-en-strategi-for-ansvarsfull-ai',
  'ai-seo-framtidssakra-din-synlighet-i-en-ai-driven-sokvarld',
  'ai-strategi-for-ditt-foretag',
  'sa-anvander-foretag-ai-i-redovisning-hr-och-marknadsforing',
]);

/** Publicerade artiklar, nyast först (samma dag: alfabetiskt på rubriken). */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('kunskapsbank', ({ data }) => !data.draft);
  const categories = new Set((await getCollection('kategorier')).map((c) => c.id));
  validate(all, categories);
  return all.sort(
    (a, b) =>
      b.data.publishedAt.getTime() - a.data.publishedAt.getTime() ||
      a.data.h1.localeCompare(b.data.h1, 'sv'),
  );
}

/** Lästid i minuter (≈ 200 ord/min, som SEOS). */
export function readingTime(body = ''): number {
  const words = body.replace(/[#>*_`|[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

/** Byggkontroller: stoppar bygget i stället för att publicera trasigt innehåll. */
function validate(all: Article[], categories: Set<string>) {
  const ids = new Set(all.map((a) => a.id));
  const errors: string[] = [];
  for (const a of all) {
    const body = a.body ?? '';
    if (!categories.has(a.data.category.id)) {
      errors.push(`${a.id}: okänd kategori "${a.data.category.id}" (finns: ${[...categories].join(', ')})`);
    }
    if (body.includes('[LÄNK:')) errors.push(`${a.id}: platshållaren [LÄNK: …] finns kvar`);
    for (const [, slug] of body.matchAll(/\]\(\/kunskapsbank\/([^)#\s/]+)\/?(?:#[^)]*)?\)/g)) {
      if (!ids.has(slug) && !PENDING_LEGACY.has(slug)) {
        errors.push(`${a.id}: död intern länk till /kunskapsbank/${slug}`);
      }
    }
    if (/^# /m.test(body)) errors.push(`${a.id}: en H1 (# …) i texten — H1 ska ligga i frontmatter (h1)`);
  }
  if (errors.length) throw new Error('Kunskapsbanken:\n  ' + errors.join('\n  '));
}
