# Innehåll & kunskapsbank — överlämning (mottagen 2026-09-24)

> Från kollega via Björn. Två delar: (A) överlämning av 12 artiklar + landningssida,
> skriven med Sanity som antagande; (B) struktur för innehåll UTAN CMS (lärdomar från
> seos-web). Själva innehållsfilerna (13 st .md) + `AI-Partner-produktsidor-briefar-2026-08.md`
> finns ännu inte i repot — Björn har dem / ett delat Google Drive-dokument.
>
> **OBS (Björn 2026-09-28): `/ai-konsult`-landningssidan hör INTE hemma på aipartner.se** — AI-konsult är inte samma sak som AI Partner och ska inte kopplas till seosdesign.se. Bygg bara de 12 artiklarna. Allt nedan om `/ai-konsult` gäller alltså inte här.
>
> **Status:** Sanity ifrågasatt — troligen Astro content collections i stället (stackbeslut → Douglas).

---

## A. Överlämning: 12 artiklar till kunskapsbanken + landningssida /ai-konsult

Allt är skrivet, faktagranskat och tonalitetsgranskat.

### 1. Frontmatter styr fälten
- `title` = title-taggen (INTE H1). H1 = raden som börjar med `#` i texten.
- `meta-description` = meta description. `slug` = URL. `eyebrow` = det lilla ämnesordet ovanför rubriken.
- Filnamn och slug skiljer sig i `vad-ar-ai.md`: ska ligga på `/kunskapsbank/vad-betyder-ai` och ersätter befintliga artikeln på samma URL.
- Fälten `typ` och `not` är interna anteckningar — publiceras inte.
- `ai-konsult-landningssida.md` är en landningssida på `/ai-konsult`, inte en artikel.
- Brödtexten ska inte hårdkodas i komponenterna.

### 2. `[LÄNK: …]` är platshållare (28 st)
Pekar på sidor som inte finns än: bokningssidan för kartläggning och föreläsning (13 st), agentsidorna och agentöversikten, processautomation, AI-policy/rådgivning, RAG-assistenten och utbildning.
- Byt mot riktiga URL:er när sidstrukturen är låst.
- Finns inte målsidan vid lansering → länka till `/kontakt`, aldrig en död länk.
- **Inget publiceras med en platshållare kvar. Sökning på `[LÄNK:` ska ge 0 träffar.**

### 3. Stryk anteckningsblocket
Längst ner i `ai-konsult-landningssida.md` finns en "Not till Douglas" — tas bort före publicering.

### 4. Interna länkar
Artiklarna länkar till varandra via `/kunskapsbank/[slug]` → kunskapsbanken MÅSTE ligga på `/kunskapsbank/`. Två länkar går till den befintliga ai-policy-artikeln på dess långa slug; kortas sluggen → uppdatera länkarna + 301.

### 5. Gamla URL:er — ingen får ge 404
- `/kunskapsbank/ai-agenter---nasta-steg-i-den-digitala-transformationen` → **301** till `/kunskapsbank/vad-ar-en-ai-agent`
- `/kunskapsbank/vad-betyder-ai` → samma URL, nytt innehåll
- Flyttas över som de är tills vidare: `ai-for-smaforetag`, `ai-policy-i-foretag-…`, `ai-seo-framtidssakra-…`, `ai-strategi-for-ditt-foretag`, `sa-anvander-foretag-ai-i-redovisning-hr-och-marknadsforing`.

### 6. Teknik och SEO
- En H1 per sida. Behåll H2:orna som de står — frågeformen är medveten (AI-svar).
- Tabellerna i `ai-forordningen.md` och `ai-utbildning-foretag.md` ska bli riktiga HTML-tabeller.
- Varje sida: egen title, meta description, canonical, og-taggar.
- Artikelschema utan namngiven person: author/publisher = organisationen AI Partner, plus `datePublished` och `dateModified`. FAQPage på `/ai-konsult` går bra men ger inga rich results i Google längre.
- **Länka inte till eller från aiakademien.se.**
- `ai-forordningen.md` ska faktakollas på nytt.

### 7. Produktsidorna
`AI-Partner-produktsidor-briefar-2026-08.md` bestämmer sökordsvinkeln (title + H1) för ekonomiagenten (fakturahantering/bokföring), föreläsningssidan och kundtjänstagenten. Behövs innan sidstrukturen låses.

---

## B. Struktur för innehåll utan CMS (lärdomar från seos-web)

När det inte finns något CMS tar innehållsschemat och byggkontrollerna över CMS:ets roll. Billigt att göra rätt från start, dyrt att rätta i efterhand.

1. **Innehåll i filer, aldrig i mallar.** Ett inlägg = en mapp: `src/content/sv/blogg/<slug>/index.mdx`, bilder i samma mapp. Ingen copy i `.astro`-komponenter → ett CMS (Keystatic/Sanity) kan läggas på senare utan omskrivning. Språket som översta mapp redan nu.
2. **Strikt schema i `content.config.ts`** — bygget stoppar om ett obligatoriskt fält saknas. Förslag: `title`, `description`, `h1` (eget fält, skilt från title), `publishedAt`, `updatedAt`, `draft`, `excerpt`, `cover {src, alt}`, `category`, `faq[]`, `noindex`, `primaryKeyword`.
3. **Kategorier och författare som YAML-samlingar med `reference()`** → felstavad kategori stoppar bygget. Författare = organisationen AI Partner.
4. **Datum sätts för hand.** `updatedAt` ändras bara vid faktisk innehållsändring. Aldrig från git/filsystem.
5. **Frys rubrik-id:na.** En slugify från dag ett (å/ä/ö → a/a/o), ändras aldrig. Möjligt att styra id per rubrik i frontmatter.
6. **Länkkontroll i bygget.** Varje intern länk måste gå till en existerande sida, annars stopp. Stoppa även på kvarvarande `[LÄNK:`.
7. **Ingen rå HTML / inga script i innehållet.** Widgets = typade MDX-komponenter. Allt server-renderat (JS-only är osynligt för AI-crawlers).
8. **Meta + JSON-LD genereras från frontmatter i layouten:** BlogPosting, BreadcrumbList, FAQPage (från `faq[]`). Sitemap från samlingarna, utan `draft`/`noindex`.
9. **Utkast/publicering via git.** `draft: true` syns i preview-deployer, inte i produktion. Publicering = merge till main. Schemalagt: `publishedAt` i framtiden + daglig Vercel deploy hook.
10. **Bilder via `astro:assets`** (AVIF/WebP med width/height). Alt obligatoriskt i schemat. Cover = PNG/JPG (og:image kräver raster).
11. **AI:ns instruktioner = redigeringsgränssnittet.** `CLAUDE.md` med innehållsregler + fast publiceringschecklista (fält, datum, länkar, `npm run check` före push). Hårt stopp i bygget → trasig push blir misslyckad deploy, inte trasig sajt.
12. **Bestäm URL:erna före första inlägget.** `/blogg/` eller `/kunskapsbank/` (del A kräver `/kunskapsbank/`), avslutande snedstreck, 301:or för de 7 live-artiklarna i en fil som kontrolleras i CI.

### Mappning av de 13 filerna (skrivna för Sanity) → utan CMS
- `meta-description` → `description`
- H1:an (`# ...`) i brödtexten → fältet `h1` (annars två H1:or)
- `slug` med hela sökvägen → mappnamnet
- `eyebrow` → `category`
- Oförändrat: 301-kartan, de 28 platshållarna, ny faktakoll av `ai-forordningen.md`.
- `primaryKeyword` värt att ha från start — båda sajterna (AI Partner + SEOS) skriver om AI-termer; med fältet kan kannibalisering upptäckas med ett script.
