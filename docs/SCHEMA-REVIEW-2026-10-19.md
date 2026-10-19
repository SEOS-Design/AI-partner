# Schema markup-översyn – aipartner.se (2026-10-19)

> Fas 1: analys utan ändringar. Underlag: alla 17 URL:er i sitemap.xml på staging
> (https://ai-partner-sepia.vercel.app/) crawlade 2026-10-19, JSON-LD extraherat ur
> renderad HTML, källkoden i `site/src` (lib/site.ts, layouts/Layout.astro,
> pages/kunskapsbank/[slug].astro, components/FAQ.astro), strukturell kontroll + vokabulärkoll
> mot `schemaorg-current-https.jsonld` (skript), Schema Markup Validator (validator.schema.org)
> på alla sex sidtyper. Metod: `schema-review-prompt.md` (SEOS Design).

---

## 1. Nuläge – vad som finns var

| Sidtyp | Antal | Typ(er) i dag | Källa | validator.schema.org |
|---|---|---|---|---|
| Startsida `/` | 1 | `@graph`: `Organization` (`#org`) + `WebSite` (`#website`) | `lib/site.ts` via `Layout.astro` (`isHome`) | 0 fel / 0 varningar |
| `/tjanster` | 1 | `FAQPage` (5 frågor) | `components/FAQ.astro` | 0 / 0 |
| `/om-oss` | 1 | `FAQPage` (5 frågor) | `components/FAQ.astro` | 0 / 0 |
| `/kontakt` | 1 | **ingen** | – | "Inga objekt" |
| `/kunskapsbank` | 1 | **ingen** | – | "Inga objekt" |
| Artikelmall `/kunskapsbank/[slug]` | 12 | `Article` + `BreadcrumbList` (2 nivåer) | `pages/kunskapsbank/[slug].astro` | 0 / 0 (`vad-ar-rpa`) |

Ingen microdata/RDFa. Inget schema i övriga komponenter. Alla block är giltig JSON, server-renderade.

**Strukturell kontroll (skript, alla 17 sidor):** absoluta URL:er överallt · `mainEntityOfPage`
och sista brödsmulan = canonical · datum ISO 8601, `datePublished ≤ dateModified` på alla 12 ·
author/publisher ifyllda (Organization med `@id`, namn, url) · inga tomma fält · inga olösta
bindningar · inga `@id`-referenser utan definition · brödsmulepositioner 1–2 korrekta ·
`inLanguage: sv-SE` · headline ≤ 110 tecken på alla 12 · telefon/namn konsekvent (en källa).

**Vokabulärkoll mot schema.org:** 0 okända typer, 0 okända egenskaper, 0 egenskaper utanför
sin domän.

**Rich Results Test:** kräver inloggat Google-konto – gick inte att köra i den inbyggda
browsern (anonym körning svarar "Log in and try again"). Täcks av vokabulärkollen och
validatorn; förväntat RRT-utfall enligt Googles dokumentation: Artiklar ✅ med en icke-kritisk
anmärkning per sida (`image` saknas), Menysökvägar ✅, Organisation ✅ (icke-kritisk: `logo`
saknas), FAQ: inget (ingen rich result sedan maj 2026). **Kör RRT i inloggad Chrome i fas 3.**

**Ahrefs Site Audit:** inte tillämpligt än – staging är noindex och aipartner.se pekar på
gamla Webflow-sajten. Kör efter lansering (~1 vecka).

Kort sagt: **inget är trasigt.** Det som finns är giltigt. Luckorna är sådant som *saknas*.

---

## 2. Luckor och svagheter – prioritetsordning

### 2.1 `og:image` saknas på alla 17 sidor, `Article.image` saknas på alla 12 artiklar
`Layout.astro` renderar ingen `og:image` alls. Det är det enda som ger en "icke-kritisk"
anmärkning i Rich Results Test (Article) och det syns direkt vid delning på LinkedIn/Slack.
Kräver en bild (PNG/JPG, 1200×630) som inte finns i repot i dag – se fråga 1.
Obs: `Layout.astro` rörs i en parallell gren (titlar). Lägg `og:image` som *en* rad, lätt
att merga, eller låt den grenen ta det.

### 2.2 Organization-noden är tunn
Saknar `logo` (Googles rekommenderade fält för Organisation-rich result och Knowledge Panel),
`sameAs`, `email`, `contactPoint`, `areaServed`, `knowsAbout`. `telephone` har mellanslag
(`+46 8 490 096 20`); SEOS schema använder E.164 utan mellanslag (`+46849009620`) – samma
format gör entitetsmatchningen säkrare. `parentOrganization` är en anonym nod
(`{name, url}`); SEOS live-schema har `@id: https://www.seosdesign.se/#organization` och listar
AI Partner som `brand` – referera det `@id`:t så att graferna hänger ihop åt båda håll.
Ingen AI Partner-logotyp finns i repot (bara textwordmarken "AI PARTNER" och `seos-logo.png`).

### 2.3 Artikelmallen: brödsmulor med 2 nivåer, ingen `Hem`, kategori utan URL
Synlig brödsmula: *Kunskapsbank / Kategori* (kategorin är ren text, ingen länk – kategorisidor
finns inte, filtret på `/kunskapsbank` är knappar utan URL). Schemat: *Kunskapsbank › Artikel*.
Google vill att listan speglar sajthierarkin; ett mellanled utan `item` går inte. Förslag:
*Hem › Kunskapsbank › Artikel* (sista utan `item`). Kategorin kan bara in om den får en URL –
rekommenderas inte bara för schemats skull. `articleSection` bär redan kategorin.

Artikeln saknar `@id`, `isPartOf` (WebSite), `image` och en `WebPage`-nod med `breadcrumb`.
`author` = Organization är giltigt för Google; `Person` ger E-E-A-T-signal (fråga 3).

### 2.4 FAQPage på `/tjanster` och `/om-oss`
Giltigt och server-renderat. Google visar inga FAQ rich results sedan maj 2026, så markupen
ger inga rich results – värdet ligger i den synliga texten. SEOS valde att ta bort FAQPage
2026-09-01 (Webflow: driftrisk mellan fält och schema). I Astro loopas frågorna från samma
källa som HTML:en, så driftrisken finns inte och underhållet är noll. Beslut: fråga 4.
Om den behålls: gör den till en nod i sidans `@graph` (bredvid `WebPage`), inte ett fristående
block, så att sidans huvudentitet förblir sidan.

### 2.5 Sidor utan sidtyp
`/kontakt` och `/kunskapsbank` saknar schema helt; `/`, `/tjanster`, `/om-oss` saknar
`WebPage`-nod. Inget `Service`-schema finns trots fem tjänsteområden på `/tjanster`.
Teamet (Douglas Ekman, Anton Sahibzada, Elliot Eslander, Björn Wildenstam) syns med namn och
titel på `/om-oss` (godkänt 2026-10-19) men finns inte som `Person`-noder.

### 2.6 Organisationsgrafen renderas bara på startsidan
Artiklarna bär en inbäddad kopia (`orgRef` med namn/url), så inget är brutet. Men i Astro finns
ingen anledning att begränsa: rendera `Organization` + `WebSite` på *alla* sidor, så att varje
`@id`-referens (`publisher`, `isPartOf`, `provider`) löses på den sida Google läser.

---

## 3. Målmodell (förslag, fas 2)

En entitetsgraf med stabila `@id` i `lib/site.ts`, renderad på alla sidor via `Layout.astro`,
plus sidnoder per route via `<slot name="head">`. Ingen synlig text ändras.

### 3.1 Alla sidor (Layout.astro → `@graph`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.aipartner.se/#org",
      "name": "AI Partner",
      "url": "https://www.aipartner.se/",
      "logo": { "@type": "ImageObject", "@id": "https://www.aipartner.se/#logo", "url": "https://www.aipartner.se/<logo>.png", "width": 512, "height": 512 },
      "image": { "@id": "https://www.aipartner.se/#logo" },
      "description": "AI-agenter och automation för svenska företag.",
      "telephone": "+46849009620",
      "email": "<CONTACT.email>",
      "address": { "@type": "PostalAddress", "streetAddress": "Fridhemsgatan 45", "addressLocality": "Stockholm", "addressCountry": "SE" },
      "contactPoint": [{ "@type": "ContactPoint", "contactType": "sales", "telephone": "+46849009620", "email": "<CONTACT.email>", "availableLanguage": ["sv", "en"], "areaServed": "SE" }],
      "areaServed": [{ "@type": "Country", "name": "Sverige" }, { "@type": "City", "name": "Stockholm" }],
      "knowsAbout": ["AI-agenter", "AI-automation", "RPA", "RAG", "AI-strategi", "AI-utbildning"],
      "parentOrganization": { "@type": "Organization", "@id": "https://www.seosdesign.se/#organization", "name": "SEOS Design", "url": "https://www.seosdesign.se/" },
      "founder": [{ "@id": "https://www.aipartner.se/#douglas-ekman" }, …],
      "employee": [ … ],
      "sameAs": [ "<LinkedIn om den finns>" ]
    },
    { "@type": "WebSite", "@id": "https://www.aipartner.se/#website", "name": "AI Partner", "url": "https://www.aipartner.se/", "inLanguage": "sv-SE", "publisher": { "@id": "https://www.aipartner.se/#org" } },
    { "@type": "WebPage", "@id": "<canonical>", "url": "<canonical>", "name": "<title>", "description": "<description>", "inLanguage": "sv-SE", "isPartOf": { "@id": "https://www.aipartner.se/#website" }, "about": { "@id": "https://www.aipartner.se/#org" }, "primaryImageOfPage": { "@id": "<og-bild>" } }
  ]
}
```
`WebPage` byts till `AboutPage` på `/om-oss`, `ContactPage` på `/kontakt`, `CollectionPage` på
`/tjanster` och `/kunskapsbank`. Person-noderna (fyra, från `AboutTeam.astro`) definieras på
`/om-oss` med `@id` `#fornamn-efternamn`, `jobTitle` (= titeln på sidan), `worksFor` → `#org`,
`image` (porträtten finns), `sameAs` LinkedIn (fråga 3).

### 3.2 `/tjanster` – CollectionPage + Service per område
Fem `Service`-noder ur kollektionen `tjanster` (`@id` `…/tjanster#<id>`, `name`, `serviceType`,
`description` = `build`-fältet, `provider` → `#org`, `areaServed` Sverige, `url`
`…/tjanster#<id>`), samlade i `hasOfferCatalog` på organisationen. Ingen `inLanguage` på
Service. `BreadcrumbList` Hem › Tjänster. FAQPage enligt beslut.

### 3.3 Artikelmallen
```json
[
  { "@type": "Article", "@id": "<url>#article", "headline": "<h1>", "description": "<description>",
    "image": "<og-bild>", "datePublished": "<publishedAt>", "dateModified": "<updatedAt ?? publishedAt>",
    "author": { "@id": "#org" | "#douglas-ekman" }, "publisher": { "@id": "#org" },
    "mainEntityOfPage": { "@id": "<url>" }, "isPartOf": { "@id": "#website" },
    "articleSection": "<kategori>", "inLanguage": "sv-SE" },
  { "@type": "BreadcrumbList", "@id": "<url>#breadcrumb", "itemListElement": [
      { "position": 1, "name": "Hem", "item": "https://www.aipartner.se/" },
      { "position": 2, "name": "Kunskapsbank", "item": "https://www.aipartner.se/kunskapsbank" },
      { "position": 3, "name": "<h1>" } ] }
]
```
`WebPage`-noden (3.1) får `breadcrumb` → `#breadcrumb` och `mainEntity` → `#article`.
`/kunskapsbank`: `CollectionPage` (ingen hårdkodad artikellista – 12 artiklar som växer).

### 3.4 Brödsmulor på statiska sidor
Hem › Tjänster / Om oss / Kontakt / Kunskapsbank (sista utan `item`). Menysökvägar är fortfarande
en aktiv rich result-typ.

---

## 4. Åtgärdslista

| # | Åtgärd | Sidor | Insats | Effekt | Kräver beslut |
|---|---|---|---|---|---|
| 1 | Organization: logo, email, contactPoint, areaServed, knowsAbout, E.164-telefon, `parentOrganization` via SEOS `@id`, sameAs | alla | Liten | Hög (entitet, Knowledge Panel) | Fråga 1, 2, 5, 6 |
| 2 | Rendera org-graf + `WebPage`-nod på alla sidor; AboutPage/ContactPage/CollectionPage | 5 | Liten | Medel | – |
| 3 | Artikelmall: `@id`, `isPartOf`, `image`, breadcrumb Hem › Kunskapsbank › Artikel, WebPage-nod | 12 | Liten | Medel–hög (12 av 17 sidor) | Fråga 1, 3 |
| 4 | `og:image` i Layout.astro (+ `Article.image`) | 17 | Trivial när bilden finns | Hög (delning + RRT) | Fråga 1 |
| 5 | `/tjanster`: Service × 5 + hasOfferCatalog + breadcrumb | 1 | Liten | Medel | – |
| 6 | `/om-oss`: Person × 4 | 1 | Liten | Medel (E-E-A-T) | Fråga 3 |
| 7 | FAQPage: behåll som graf-nod / ta bort | 2 | Trivial | Låg | Fråga 4 |
| 8 | Brödsmulor på statiska sidor | 4 | Trivial | Låg–medel | – |

Punkt 2, 5, 8 och större delen av 3 kan göras utan beslut. Resten väntar på svaren nedan.

---

## 5. Beslut som behövs från Douglas

1. **Logotyp och OG-bild.** Det finns ingen AI Partner-logotyp i repot (bara text-wordmarken).
   Behövs: PNG av logotypen ≥ 112×112 (helst 512×512, kvadratisk) för `logo`, och en
   1200×630 PNG/JPG för `og:image`/`Article.image`. Lägg i `site/public/`.
2. **sameAs.** Har AI Partner någon egen LinkedIn-sida eller annan profil? Om inte utelämnas
   `sameAs` (SEOS LinkedIn hör till SEOS-noden, inte hit).
3. **Författare och Person-noder.** Ska artiklarna ha `Person`-författare (E-E-A-T) – i så fall
   vem (Douglas Ekman på alla, eller per artikel via nytt frontmatter-fält `author`)? Och ska
   teamet på `/om-oss` (Douglas, Anton, Elliot, Björn) få Person-noder med LinkedIn-URL:er –
   vilka URL:er? Titlarna tas från sidan (VD och medgrundare / Medgrundare / Utvecklare).
4. **FAQPage** på `/tjanster` och `/om-oss`: **A** behåll som nod i sidans graf (rekommenderas
   här – nollkostnad i Astro, ingen driftrisk, läsbar för AI-crawlers) eller **B** ta bort
   (konsekvent med SEOS-beslutet 2026-09-01).
5. **Kontaktuppgifter.** Telefon `+46 8 490 096 20` och Fridhemsgatan 45 är SEOS-platshållare
   (site.ts). Är det rätt uppgifter för AI Partner? E-posten blir `kontakt@aipartner.se` via den
   parallella grenen – schemat läser `CONTACT.email`, så bytet följer med automatiskt.
   Finns Google Business Profile för AI Partner? Om nej: `Organization`, inte `LocalBusiness`.
6. **Juridisk relation.** site.ts säger "varumärke inom SEOS Design, inte eget bolag"; om-oss-
   copyn säger "systerbolag". Schemat föreslår `parentOrganization` → SEOS `@id` oavsett. Har AI
   Partner eget org.nr (då `vatID`/`identifier`)? Annars utelämnas det.

---

## 6. Fas 2 – plan (efter godkännande)
Gren `seo/schema-review` (från den här worktreens gren). Ändringar bara i strukturerad data:
`lib/site.ts` (graf, konstanter, Person/Service-byggare), `Layout.astro` (en rad: `@graph` på
alla sidor + `og:image`), nya `<slot name="head">`-block i `index.astro`, `tjanster/index.astro`,
`om-oss.astro`, `kontakt.astro`, `kunskapsbank/index.astro`, uppdaterad `kunskapsbank/[slug].astro`,
`FAQ.astro` (schemat lyfts ut till sidans graf eller tas bort). Inga titlar, ingen copy, inga
kontaktuppgifter utöver schemafält. Sedan `npm run build`, strukturell kontroll + vokabulärkoll
på `dist/`, validator.schema.org per sidtyp, RRT i inloggad Chrome, PR mot master.
