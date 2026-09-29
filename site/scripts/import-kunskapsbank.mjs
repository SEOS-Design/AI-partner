// Engångsimport av kunskapsbankens artiklar från Douglas Drive-mapp (AI-Partner-blogg)
// till Astro content collections: src/content/sv/kunskapsbank/<slug>/index.md.
// Körs: node scripts/import-kunskapsbank.mjs "<sökväg till mappen>"
// Efter importen är filerna i repot källan — redigera dem där, inte i Drive.
//
// Gör: frontmatter → schemats fält (title, description, h1, category, publishedAt),
// H1-raden flyttas ur brödtexten till `h1`, [LÄNK: …]-platshållare byts
// (bokning/tjänstesidor → /kontakt, fristående agent-produktsidor tas bort),
// interna fält (eyebrow, not, slug) tas bort. /ai-konsult importeras INTE (hör inte
// hemma på aipartner.se, Björn 2026-09-28).
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2];
if (!SRC) throw new Error('Ange mappen med .md-filerna');
const OUT = path.resolve('src/content/sv/kunskapsbank');

// eyebrow i Drive-filerna → en av de fem kategorierna (Björn 2026-09-29)
const CATEGORY = {
  'AI-grunder': 'ai-grunder',
  'AI-utbildning': 'ai-grunder',
  'AI-agenter': 'ai-agenter',
  Automation: 'automation',
  'AI på egen data': 'ai-pa-egen-data',
  'AI & regelverk': 'regelverk-sakerhet',
  'AI-säkerhet': 'regelverk-sakerhet',
};

const report = [];
const q = (s) => JSON.stringify(s);

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.md'))) {
  if (file === 'ai-konsult-landningssida.md') continue;
  const raw = fs.readFileSync(path.join(SRC, file), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: saknar frontmatter`);

  const fm = Object.fromEntries(
    m[1].split('\n').map((l) => {
      const i = l.indexOf(':');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')];
    }),
  );
  const slug = fm.slug.replace(/^\/kunskapsbank\//, '').replace(/\/$/, '');
  const category = CATEGORY[fm.eyebrow];
  if (!category) throw new Error(`${file}: okänd eyebrow "${fm.eyebrow}"`);

  let body = m[2].replace(/^\s+/, '');
  const h1 = body.match(/^# (.+)\n/);
  if (!h1) throw new Error(`${file}: saknar H1 först i texten`);
  body = body.slice(h1[0].length).replace(/^\s+/, '');

  // [text]([LÄNK: …]) → [text](/kontakt)
  body = body.replace(/\]\(\[LÄNK: ([^\]]+)\]\)/g, (_, what) => {
    report.push(`${slug}: länk → /kontakt (var: ${what})`);
    return '](/kontakt)';
  });
  // Fristående bokning: meningen före står redan som uppmaning ("Boka en kostnadsfri
  // AI-kartläggning. …") → gör den meningen till länken och ta bort platshållaren.
  body = body.replace(
    /Boka en kostnadsfri AI-kartläggning\. ([^\n]*?) ?\[LÄNK: bokningssida AI-kartläggning\]/g,
    (_, rest) => {
      report.push(`${slug}: fristående bokning → meningen "Boka en kostnadsfri AI-kartläggning" länkad till /kontakt`);
      return `[Boka en kostnadsfri AI-kartläggning](/kontakt). ${rest}`;
    },
  );
  // Fristående agent-produktsidor → bort tills sidorna finns
  body = body.replace(/ ?\[LÄNK: (agent-produktsida [^\]]+)\]/g, (_, what) => {
    report.push(`${slug}: borttagen platshållare (${what}) — lägg till länk när sidan finns`);
    return '';
  });
  if (body.includes('[LÄNK:')) throw new Error(`${file}: oväntad platshållare kvar`);

  // Publiceringsdatum = filens ändringsdatum i Drive tills vidare (sätts vid lansering).
  const date = fs.statSync(path.join(SRC, file)).mtime.toISOString().slice(0, 10);

  const out = [
    '---',
    `title: ${q(fm.title)}`,
    `description: ${q(fm['meta-description'])}`,
    `h1: ${q(h1[1].trim())}`,
    `category: ${category}`,
    `publishedAt: ${date}`,
    '---',
    '',
    body.trimEnd(),
    '',
  ].join('\n');
  fs.mkdirSync(path.join(OUT, slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, slug, 'index.md'), out);
  console.log(`${file} → ${slug}/index.md (${category}, ${date})`);
}
console.log('\nPlatshållare:\n' + report.join('\n'));
