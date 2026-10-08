// Innehållskollektioner (2026-09-29). Motsvarar CMS-kollektioner: schemat är
// "fälten", och bygget stoppar om ett obligatoriskt fält saknas eller har fel typ.
// Upplägg enligt docs/innehall-utan-cms.md del B: en mapp per artikel, språket överst.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const kategorier = defineCollection({
  loader: file('src/content/kategorier.yaml'),
  schema: z.object({
    name: z.string(),
  }),
});

const kunskapsbank = defineCollection({
  // id = mappnamnet = URL:en (/kunskapsbank/<id>)
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/sv/kunskapsbank',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().max(70), // <title>
    description: z.string().min(50).max(170), // meta description + ingress
    h1: z.string(), // sidans rubrik (skild från title)
    category: reference('kategorier'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    // Fäster artikeln som utvald överst på /kunskapsbank. Saknas det: den nyaste.
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

// Tjänsteområdena (2026-09-30). Visas som sektioner på /tjanster (#<id>); samma fält
// blir mallen när ett område får en egen sida (/tjanster/<id>, brödtexten i index.md).
const tjanster = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/sv/tjanster',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    name: z.string(), // områdets namn, som på startsidans tjänsterutor
    order: z.number(),
    heading: z.string(),
    takesTime: z.string(), // "Det som tar tid"
    build: z.string(), // "Det vi bygger"
    example: z.string(), // "Så kan det se ut"
  }),
});

export const collections = { kategorier, kunskapsbank, tjanster };
