# CLAUDE.md — AI Partner (aipartner.se)

> Läs den här filen i sin helhet vid varje ny session. Den ger dig tillräcklig kontext för de flesta uppgifter och hänvisar vidare till rätt specialfil när det behövs.

---

## Vad är det här för projekt?

Vi bygger om **aipartner.se** från grunden i **Astro + Sanity**. Det är AI Partners riktiga nya webbplats — inte en övning. Projektet är samtidigt Björns upplärning i ett komplett headless-bygge, från repo till driftsatt sida, AI-assisterat med Claude Code.

AI Partner är SEOS Designs systervarumärke. Fokus: AI-automatisering, RPA, AI-agenter och RAG-system. SEOS hanterar all SEO/AEO även för AI Partner.

**Beslutet är taget: Astro + Sanity.** Bakgrunden finns i `docs/stackval.md` om du vill förstå varför.

---

## Vem bestämmer vad?

| Vad | Vem |
|---|---|
| Kod, struktur, copy-utkast | Björn + Claude Code |
| Stack, designbeslut, färg/logo/typografi, slutgiltig copy | Douglas |
| SEO-strategi och internlänkning | Douglas / SEOS |

**AI publicerar aldrig direkt.** Douglas granskar alltid innan något går live.

---

## Stack & repo

- **Frontend:** Astro (islands-arkitektur — noll JS om sidan inte kräver det)
- **CMS:** Sanity (MCP uppkopplad — Claude kan hantera innehåll agentiskt)
- **Deploy:** Netlify eller Vercel
- **Repo:** eget, `main` = det som är live
- **Hemligheter:** aldrig i repot — använd `.env`

Sanity-schema-förslag: `page`, `service`, `caseStudy`, `faqItem`, `testimonial`, `siteSettings` (singleton). Ingen brödtext hårdkodas i komponenter — allt redigerbart i CMS.

---

## Hur vi arbetar (metod)

Människan bestämmer *vad*, AI ger tempo.

Flödet för varje leverans:
1. **Vinkel-research** — vad rankar, vad saknas, vilka frågor ställer folk?
2. **Skriv** enligt röstspecen (se nedan / `docs/voice.md`)
3. **Faktagranska** — all statistik verifieras mot primärkälla; kan den inte verifieras tas den bort
4. **Tonalitetsgranska** mot `docs/voice.md`
5. **Mänsklig granskning** av Douglas innan publicering

Källdisciplin är **icke förhandlingsbart**: varje externt datapåstående länkas till källan. Hitta aldrig på siffror.

---

## Röst & ton (kortversion)

Fullständig spec i → **`docs/voice.md`** — läs den varje gång du skriver copy.

Kortfattat:
- Svenska. Professionell men tillgänglig — skriv som en kunnig kollega, inte en broschyr.
- Tekniskt precis, ärlig. Inga tomma superlativ, ingen AI-hype.
- Konkret före abstrakt. Siffror och exempel slår adjektiv.
- Korta meningar. Rekommendation, inte självhävdelse.
- AI Partner är en aning mer rättfram och energisk än SEOS — men **aldrig AI-hype**. Sälj resultatet av automation (tid sparad, process borta, kostnad in) — inte "kraften i AI".

Vanliga fel att undvika: "sajt" → "hemsida", "leverabel" → "leverans", "laddtid" → "tid för att ladda", forcerade omnämnanden av SEOS/AI Partner utan att det tillför läsaren värde.

---

## Design (kortversion)

Ledord: **modernt, avskalat, förtroendegivande.**

Inspiration (i prioritetsordning):
1. Nuvarande aipartner.se — bra grundkänsla, höj nivån
2. **Anduril.com/lattice/command-and-control** — referens för animation och rörelsekänsla (HUD-/visualiseringsestetik). OBS: inte den bildtunga startsidan — ta designspråket och animationerna, inte layouten.
3. SEOS egna tjänstesidor på seosdesign.se — delat DNA, men AI Partner ska ha egen identitet

Principer: mobil först, komponentdrivet, prestanda är design, WCAG 2.1 AA minimum.
Beslut om färg/logo/typografi/animationsnivå fattas av Douglas.

---

## SEO & AEO

Vi skriver för både människa och AI. Varje sektion ska inledas med en kort, självständig mening som svarar direkt på frågan. H2-rubriker formuleras som faktiska frågor. Varje stycke ska kunna stå för sig självt (semantic chunking).

För sökordsarbete, sidstruktur och internlänkningsstrategi →  **`docs/seo-soktermer.md`**

Internlänka naturligt från AI Partner till seosdesign.se där det tillför läsaren värde — aldrig forcerat. De två sajterna ska inte konkurrera om samma sökord.

---

## Nuvarande sajt (baslinje)

Idag en one-pager. Struktur: Hero → problem/lösning → verktyg/teknik → fyra tjänsteområden → statistik/proof → kundcitat → FAQ → footer.

Fyra tjänsteområden: AI-strategi & rådgivning · AI-implementering & utveckling · AI-analys & optimering · AI-utbildning & föreläsning.

**Spara ner nuvarande aipartner.se (text, struktur, bilder) som baslinje innan något rivs.**

---

## Faser (grov disposition)

| Fas | Innehåll |
|---|---|
| **Fas 0** | Tomt Astro-projekt + Sanity-koppling + deployad tom sida |
| **Fas 1** | Sanity-schema + grundkomponenter (hero, nav, footer, CTA) |
| **Fas 2** | Alla sidor med CMS-kopplat innehåll |
| **Fas 3** | Animation, polish, teknisk SEO, tillgänglighet |
| **Fas 4** | Douglas-granskning, copy-finslipning, go live |

Stämningar av Douglas sker mellan faserna.

---

## Specialfiler — läs dem när uppgiften gäller det här:

| Uppgift | Fil |
|---|---|
| Skriva copy, headlines, brödtext, FAQ | **`docs/voice.md`** |
| Sidstruktur, URL-plan, sökordsval, internlänkning | **`docs/seo-soktermer.md`** |
| Frågor om varför Astro valdes framför Next.js | **`docs/stackval.md`** |
| Djupare kontext om projektet, metod och design | **`docs/brief.md`** |

---

> Senast uppdaterad: 2026-05-25. Ägs av Douglas Ekman / SEOS Design.
