// IndexNow – meddelar Bing (och Yandex, Naver, Seznam via api.indexnow.org) vilka URL:er
// som finns efter en produktionsdeploy. Körs som `postbuild` på Vercel: bara när
// VERCEL_ENV === 'production', aldrig på previews eller lokalt (utom med --force).
// Nyckeln ligger öppet i public/<nyckel>.txt – så fungerar protokollet, den är ingen hemlighet.
//
// Manuellt: node scripts/indexnow.mjs --force [--dry-run] [--urls https://…,https://…]
// Utan --urls skickas alla URL:er i byggets sitemap (dist/client/sitemap.xml).
// Skriptet får aldrig fälla bygget: alla fel loggas och processen avslutas med 0.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const KEY = '4a2fc639ec5a4542ab54167b8ff06990';
const HOST = 'www.aipartner.se';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const arg = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

async function main() {
  if (process.env.VERCEL_ENV !== 'production' && !has('--force')) {
    console.log(`[indexnow] hoppar över (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'saknas'}; kör med --force lokalt)`);
    return;
  }

  let urls;
  if (arg('--urls')) {
    urls = arg('--urls').split(',').map((u) => u.trim()).filter(Boolean);
  } else {
    const here = dirname(fileURLToPath(import.meta.url));
    const candidates = [join(here, '..', 'dist', 'client', 'sitemap.xml'), join(here, '..', '.vercel', 'output', 'static', 'sitemap.xml')];
    const file = candidates.find((f) => existsSync(f));
    if (!file) { console.log('[indexnow] ingen sitemap i bygget – inget skickat'); return; }
    urls = [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  urls = urls.filter((u) => new URL(u).host === HOST);
  if (urls.length === 0) { console.log('[indexnow] inga URL:er på rätt host – inget skickat'); return; }

  const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };
  if (has('--dry-run')) { console.log('[indexnow] dry-run:', JSON.stringify(body, null, 2)); return; }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  // 200 = mottaget · 202 = mottaget, nyckeln verifieras senare · 4xx = fel i anropet.
  console.log(`[indexnow] ${res.status} ${res.statusText} – ${urls.length} URL:er skickade`);
  if (res.status >= 400) console.log('[indexnow] svar:', (await res.text()).slice(0, 300));
}

main().catch((err) => console.log('[indexnow] fel, bygget påverkas inte:', err?.message ?? err));
