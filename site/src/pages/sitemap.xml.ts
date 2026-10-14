// /sitemap.xml (2026-10-14). Byggs automatiskt: alla sidor i src/pages (utom dynamiska
// mallar och 404) + alla publicerade artiklar som inte är noindex. En ny sida hamnar
// alltså i sitemapen utan att någon behöver komma ihåg det. Länkas från robots.txt.
import type { APIRoute } from 'astro';
import { getArticles } from '../lib/kunskapsbank';
import { canonicalUrl } from '../lib/site';

// './om-oss.astro' → '/om-oss', './tjanster/index.astro' → '/tjanster'
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('[') && !file.endsWith('/404.astro'))
  .map((file) => file.slice(1).replace(/\.astro$/, '').replace(/\/index$/, '') || '/');

export const GET: APIRoute = async () => {
  const articles = (await getArticles()).filter((a) => !a.data.noindex);
  const entries = [
    ...pages.map((path) => ({ loc: canonicalUrl(path) })),
    ...articles.map((a) => ({
      loc: canonicalUrl(`/kunskapsbank/${a.id}`),
      lastmod: (a.data.updatedAt ?? a.data.publishedAt).toISOString().slice(0, 10),
    })),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map((e) => `  <url><loc>${e.loc}</loc>${'lastmod' in e ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
