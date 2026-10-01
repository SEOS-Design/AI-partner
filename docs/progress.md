# Byggstatus — aipartner.se

> Senast uppdaterad: 2026-09-29

---

## Var vi är nu

**Byggt:** startsidan, `/kontakt`, `/om-oss`, `/kunskapsbank` (12 artiklar) och `/tjanster` (samlingssidan, 2026-09-30, ej committad). Kvar: enskilda tjänstesidor (kräver Douglas produktbeslut). **Senast:** "Det är där vi kommer in." i Stats animeras nu ord för ord som Story (2026-09-30, väntar på Björns omdöme; se Stats-avsnittet nedan).

- **Driftsatt:** Vercel-projekt i SEOS Pro-teamet (flyttat 2026-09-30), deployar från `master`. Root Directory måste vara `site`. Ingen vercel.json. Äkta 301:or läggs där när det blir aktuellt.
- **Repo:** github.com/SEOS-Design/AI-partner, branch `master`
- **Dev-server:** `cd site && npm run dev` → http://localhost:4321 (Björn kör den själv — starta ingen egen)
- **Senast pushat:** `d6403e8` (2026-09-29: Om oss, kunskapsbanken, hero/nav/footer-justeringar). **Ej committat:** Stats v2 (`Stats.astro`).
- **Medvetet utanför git:** `CLAUDE.md` (Douglas fil, ändrad), `AI-Partner-strategi-brief-2026-07.md` (committas inte utan avstämning), `pexels-…jpg` (testbild).

### Tjänster /tjanster (2026-09-30, EJ committad)

**Upplägg (Björn):** ENKLARE än SEOS nya tjänstekatalog (seos-web-gamma.vercel.app/tjanster, 15 tjänster i 3 grupper). Betoningen är att vi kartlägger och skräddarsyr, inte en lista med AI-produkter. Samlingssidan först; enskilda sidor per område senare med samma fält som mall.

`src/pages/tjanster/index.astro`. Flöde:
- **ServicesHero:** speglar Om oss-heron — glaslådan, "TJÄNSTER" stort i mitten (`clamp(88px, 17vw, 240px)`, masken har luft upptill för Ä-prickarna) och ingressen under: "Vi börjar med er vardag, inte med en produktlista. …". Ingen knapp (som Om oss; Boka kartläggning finns i nav och ContactCta). Video = Wannathis "Displacement" (dark) → `public/tjanster-hero.{mp4,webm}` (1600 px mp4 1,9 MB, 1920 webm 1,6 MB) + poster; skarvkvot 2,3. Kontrast mot rörlig video (värsta pixel): rubrik 5,1 / 6,6 / 5,0 och ingress 6,7 / 8,0 / 5,0 vid 1440 / 1920 / 390 (krav 3,0 resp. 4,5). Först byggd som "Hero 2" (ordet längs nederkanten + knapp) — bytt samma dag för att få plats med budskapet.
- **Hero-video 2026-10-01 (Björn): glasskivorna, SÖMLÖS loop.** Wannathis "Glass cylinders" (dark) → `public/tjanster-skivor.{mp4,webm}` + poster (1920, 30 fps, 363 rutor = 12,1 s, 1,5 MB / 0,6 MB). Källan (718 rutor, 60 fps) är nästan en loop: ~8 rutors rörelse saknas mellan sista och första rutan. I stället för crossfade (gamla `dep-glass.*`: 1 s övertoning där skivorna syns dubbelt) är de saknade rutorna framräknade med ffmpeg `minterpolate` (mci) över skarven, och varannan ruta behållen. Lärdomar: (1) uppskatta gapet i full upplösning — vid 96×54 såg det ut som 3,7 rutor, i verkligheten ~8; (2) gör HELA kedjan i yuv i ett filter-graph — framräknade rutor via PNG fick annan färgmatris och gav ett steg på 2,5× i skarven (blink). Uppmätt slutresultat: stegen runt skarven 0,4–1,0 × medelsteget (klippets egen variation 0,5–2,0). Skivorna är ljusa bakom texten → tinten mörkare än Om oss (`--core` 0,56 / `--flat` 0,10; mobil 0,68 / 0,22) och ingressen vit. Kontrast mot rörlig video, värsta pixel: rubrik 5,7 / 6,8 / 7,1 och ingress 7,2 / 7,4 / 6,0 vid 1440 / 1920 / 390. Displacement (`tjanster-hero.*`) ligger kvar för byte tillbaka; siffrorna i ServicesHero-punkten ovan gäller den.
- **ServicesProcess:** "Hur går det till?" med tre steg (Kartläggning · Bygg · Förvaltning). Statementet "Vi börjar med er vardag. / Inte med en produktlista." som låg ovanför togs bort (upprepade heron och stegen) — budskapet bor i herons ingress.
- **ServicesAreas** (variant B): "Var brukar vi börja?" — fem områden med 3D-stillbilden från startsidans rutor (`/tjanster/<media>-slut.webp`, växlar sida) och tre delar: Det som tar tid / Det vi bygger / Så kan det se ut. Avslutas med "Hittar ni inte ert område?" (glasknapp → /kontakt). Upphöjd yta.
- **Kortstapel med glaskort (GSAP, 2026-09-30) — FÖRSTA GSAP-ANVÄNDNINGEN:** `gsap` 3.15 installerat i site/ (enda beroendet utöver Astro; laddas bara där det importeras, ~40 kB gzip). Björns val "A · Glaskort": varje område är ett opakt glaskort (22px radie, --border-strong, ljus topp, ingen backdrop-filter) med konturnummer 01–05 i hörnet, LITEN ikon (~110px, 3D-stillbilden med lighten + svagt indigosken — Björn: ikonerna ska inte ta fokus) bredvid rubriken, och de tre delarna som kolumner (fs-body) för snabb skumning. På bred skärm utan reduced motion låses korten under nav (--lock 96px), nästa glider upp och täcker, det täckta krymper till 0,94 och tonas ner (55 % svart); 28svh luft mellan korten = hur länge ett kort står låst. Alla kort får samma höjd (den högsta, mätt i scriptet vid varje refresh). Kort högre än vyn låses först när nederkanten når vyns nederkant. Sista kortet låses inte. `pinSpacing: false` → ankarlänkarna fungerar; ScrollTriggers omräkning vid load avbröt webbläsarens mjuka scroll till ankaret halvvägs → scriptet scrollar till ankaret igen efteråt. Verifierat headless (prod-bygge): varje kort helt synligt när det är låst och helt täckt av nästa (0 px sticker ut) vid 1440×900, 1440×720, 1280×600, 1920×1080; ankare från startsidan landar på 96 px (mobil också); 0 konsolfel. Mobil/reduced motion: korten under varandra, delarna i en kolumn. Förkastat samma dag: helskärmspaneler med stor bild (första GSAP-versionen) och biblioteket componentry "case-study-flip-stack" (React + framer-motion + shadcn/Tailwind). Konturnumret utan `tabular-nums` (gav snedstreckad nolla). Dev-servern gav "504 Outdated Optimize Dep" efter installationen → starta om den.
- **FAQ** (5 frågor om hur vi jobbar, FAQPage-schema, `beforeFooter={false}` = vanlig sektionsluft eftersom ContactCta kommer emellan) → **ContactCta** → Footer.

**Innehållet** ligger i kollektionen `tjanster` (`src/content/sv/tjanster/<id>/index.md`, schema i `content.config.ts`: name, order, media, heading, takesTime, build, example). Id = ankaret. **Startsidans tjänsterutor länkar nu till `/tjanster#<id>`** (verifierat: klick landar 90 px ner, under nav-pillen). När ett område får en egen sida: lägg `src/pages/tjanster/[id].astro` och peka om rutan.

**Öppet:** all copy är utkast (Douglas). Bilderna i områdena är stillbilder. Nästa GSAP-test (om Björn vill): Lenis smooth scroll på hela sajten som separat, avstängningsbart test — INTE ScrollSmoother (bryter alla position: sticky). OBS dämpad scroll har valts bort tidigare. Douglas bör veta att SEOS nya sajt har egna sidor för AI-konsult och Automationer (överlapp med AI Partners sökintent).

### Stats-sektionen v2 (2026-09-29, EJ committad) — NÄSTA STEG: gör slutmeningens animation långsammare

`site/src/components/Stats.astro` (Björns val "C" efter skisser A/B/C; v1 i git-historiken).
- **Layout:** två kolumner. Rubriken **"Var står svenska företag med AI?"** (PLATSHÅLLARE, Björn; copy → Douglas) står låst till vänster (`position: sticky`, top clamp(110px, 16vh, 150px)) och släpper exakt i linje med sista siffran (`.stats__side` stretchar till listans höjd). Siffrorna rullar förbi till höger, en per ~58svh. Siffrorna/formuleringarna/källorna LÅSTA som förut.
- **Borttaget på Björns begäran:** räknare (uppräkning), tänd/dämpad-effekten, "(01)–(03)"-etiketterna.
- **"Det är där vi kommer in."** — samma storlek som rubriken (`--fs-h2`), egen rad under kolumnerna, centrerad. På bred skärm utan reduced motion: `.statement-stage` (lika hög som meningen) är sticky med `top: --pin` (= 50svh − fs-h2·0,55 → meningens mitt i vyns mitt) medan meningen glider in RAKT från vänster (`translateX(-100vw)` → 0).
  - Glidningen = **CSS scroll-driven animation**: `view-timeline: --statement` på `.statement-track`, `animation-range: cover calc(100svh − --pin + --gap) cover calc(… + --run)`. En JS-driven transform låg en bildruta efter den trådade scrollningen → rörelsen såg diagonal ut ("snett"). JS finns kvar bara som reserv (`CSS.supports('animation-timeline: --a')`, t.ex. Firefox).
  - Glidsträckan `--run` (16svh) ligger som `::after`-block i spåret — INTE padding (sticky rör sig bara inom förälderns innehållsyta; med padding låste den aldrig).
  - Lika luft upptill/nedtill när den landat: `.stats { padding-bottom: calc(--gap + --run) }` (--gap = space-7). Uppmätt: 192/193 px (1440×900), 163/164 (1280×720), 220/222 (1920×1080).
  - Mobil/reduced motion: statisk, centrerad, ingen animation.
- **2026-09-30 — glidningen ERSATT (Björn: testa något annat än att den flyger in):** meningen animeras nu som Storys "Vår historia." — varje ord i en mask glider upp ur den, ett i taget (0,9 s, 0,11 s mellan orden), när meningen nått ~20 % upp i vyn (IntersectionObserver, en gång). Ingen sticky/scroll-driven animation längre. Slutläget oförändrat: `padding-top` på spåret = `--gap + --run`, sektionens `padding-bottom` samma → uppmätt 192/193 (1440×900), 163/164 (1280×720), 221/222 (1920×1080). Animerar även på mobil; reduced motion/utan JS = statisk. Glidversionen sparad i `site/src/components/Stats.slide.astro.bak` (revert: kopiera tillbaka över Stats.astro).
- (Gammalt) **NÄSTA STEG (Björn):** animationen är "alldeles för snabb". Den går över `--run` = 16svh scroll (~145 px vid 900 px höjd). Att bara höja `--run` ökar också luften (padding = gap + run). Alternativ att pröva: (a) längre `--run` men låt meningen landa tidigare i låsningen och sänk padding så luften ändå blir lika (luften blir då lika först efter en stund), (b) längre `--run` och acceptera mer luft, (c) låt glidningen följa scrollen långsammare genom att skala `animation-range` över en längre sträcka där spåret har extra tomrum ovanför scenen. Mät med Playwright headless (skriptmönster: sticky-mitt = vh/2, luft upp/ner vid landning).

### Justeringar startsida, nav och footer (2026-09-29)

- **Hero:** "AI PARTNER" på EN rad längs nederkanten, vänsterställd (fundamental.bg-ref). Storleken räknas från boxens bredd (`container-type: inline-size`, `font-size: calc(100cqi / 3.47)`) → kant till kant på alla bredder. Underrubriken högerställd ovanför rubriken, en rad från 700 px, glider in 1,15 s (efter rubriken). Tinten mörk nedifrån; kontrast mätt mot rörlig video: H1 värsta 8,7–16,8, underrubrik 6,7–9,8.
- **Nav:** "Hem" först i pillen (markeras bara på /). Ordmärket större (24–30 px), `line-height: 1`, länkar till / (var #top). Nav-CTA:n exakt pillrets höjd (42 px) → samma mittlinje (satt 4,5 px lägre när ordmärket blev större).
- **Footerns klot v2:** sex förskjutna, kraftigt suddade färgmoln i heroens palett (uppmätt ur hero-glass.mp4: indigo 230–249° 67 %, violett 250–279° 25 %, stålblått 210–229° 7 %) + grå indigodimma och blek lavendelvit kärna → "spretigt" och grumligt som conversion.framer.media. Något svagare än v1 — kan ljusas upp.
- **Kubsektionen:** "(03)" borttaget, stegnumret större (22 px, smalt, fetstil).
- **Story:** foto på Douglas (`public/douglas.webp`, från seosdesign.se-bloggens författarkort, beskuret 4:5, 600×750, 17 KB).
- **Positionering:** brödtexten vit (var grå, fg-3).

### Kunskapsbanken /kunskapsbank (2026-09-29)

**Upplägg som en CMS-kollektion** (Astro content collections, inget CMS):
- `src/content.config.ts` — schemat = fälten; bygget stoppar vid fel.
- `src/content/kategorier.yaml` — 5 kategorier: AI-grunder, AI-agenter, Automation, AI på egen data, Regelverk och säkerhet.
- `src/content/sv/kunskapsbank/<slug>/index.md` — en mapp per artikel, mappnamnet = URL:en.
- `src/lib/kunskapsbank.ts` — sortering (nyast överst), utkastfilter, byggkontroller.
- `src/components/KbRow.astro` — artikelraden, delas av listan och "Relaterade artiklar".
- `src/pages/kunskapsbank/index.astro` (listan) och `[slug].astro` (EN artikelmall).
- Fält: title, description, h1, category, publishedAt, updatedAt?, featured?, draft?, noindex?
- Byggkontroller (testade): kvarvarande `[LÄNK:`, döda interna länkar, felstavad kategori, H1 i texten.

**Innehåll:** de 12 artiklarna från Douglas Drive-mapp (AI-Partner-blogg, genväg i `G:\Min enhet`) importerade med `site/scripts/import-kunskapsbank.mjs` — repot är nu källan. `/ai-konsult` importeras INTE (Björn). `publishedAt` = Drive-datum (3–4 aug) tills riktiga datum sätts vid lansering; `featured: true` på vad-ar-en-ai-agent. AI-utbildning ligger i AI-grunder.

**Platshållare:** 15 `[LÄNK:]`-länkar → `/kontakt` (bokning, AI-policy/rådgivning, RAG-assistent, processautomation — peka om när tjänstesidorna finns). Sex fristående agent-produktsidor borttagna i vad-ar-en-ai-agent (kundtjänst, ekonomi, sälj, marknad, projektledning, kvalitetskontroll) — lägg tillbaka länkar när sidorna finns.

**Design (efter Björns feedback):** listan = utvald artikel i kort med loopande glasvideo (Wannathis Glass Cloth_01 dark → `public/kunskapsbank/utvald-cloth.*`, skarv 1,22; kontrast mätt mot rörlig video, värsta 4,86 på lästiden, rubrik 11,8) + kategorifilter med antal + radkort (upphöjd yta `#121212`). Artikel: brödsmulor, H1, datum/lästid/kategori, hårlinje, text med klistrad innehållsförteckning (17 px) + bokningsruta, "Relaterade artiklar" (samma kategori, högst 3). **Förkastat:** rutnät med stora ikonomslag (svårt att skanna), hover-ikoner på rader, ikonomslag på artiklar (KbCover + kategoriikoner borttagna), ingress under H1 (upprepade första stycket).

**Övrigt:** Nav "Blogg" → "Kunskapsbank" (aktiv även på artiklar). Layout har canonical/og-taggar + `<slot name="head">`; `site` satt i astro.config. Omdirigering (HTML i statiskt bygge) `ai-agenter---nasta-steg…` → `vad-ar-en-ai-agent`; äkta 301 läggs hos hostingen.

**VÄNTAR (Björn):** de fem gamla artiklarna på nuvarande aipartner.se (ai-for-smaforetag, ai-policy-i-foretag-…, ai-seo-framtidssakra-… [SEOS-område, Douglas], ai-strategi-for-ditt-foretag, sa-anvander-foretag-ai-…) — kan vara inaktuella. Står i `PENDING_LEGACY` i `lib/kunskapsbank.ts`. **Före lansering:** ai-forordningen och skugg-ai länkar till ai-policy-artikeln → flytta den, peka om eller ta bort länkarna; bestäm 301 för resten så ingen gammal URL ger 404.

**Kvar att granska:** tabellerna (ai-forordningen, ai-utbildning-foretag) och artikelmallen på mobil.

### Om oss /om-oss (2026-09-28, commit bae9574)

`src/pages/om-oss.astro`. Flöde (Björns val efter två skissrundor): **AboutHero** (glaslåda som startsidans hero, jättestort "OM OSS" som seosdesign.se/om-oss, litet ord ovanför som byts var 3:e s, video = Wannathis Glass "Ripples on water" dark → `public/about-ripples.{mp4,webm}` 400/120 KB + poster, skarvkvot 2,19) → **AboutStory** (catchphrase-h2 med ord ur mask + längre text, centrerat) → **AboutOffer** ("Från första samtal till AI i drift.": tre löften = de tre tjänstelagren kartlägger/bygger/förvaltar; accentlinje växer med scrollen och tänder raderna; aktiv rad visar 3D-ikon lamp/pencil/column från `public/tjanster/*-slut.webp`) → **AboutQuote** (ett stort citat från Douglas, orden tänds grått→vitt med scrollen; h2 bara för skärmläsare) → **FAQ** (nu props `heading`/`items`; 6 nya frågor om bolaget, FAQPage-schema, extra luft nedtill för footerns klot) → Footer. **Ingen CTA-sektion** (Björn). Björn förkastade: tre grundare i egen sektion, "Hur vi tänker"-principer (lät som interna copy-regler), "Varför vi gör det här" som rubrik, gamla FAQ-frågorna. Kontrast i heron mätt mot rörlig video: rubrik 12,7 · ingress 4,7 (desktop) / 6,2 (mobil). `.sr-only` tillagd i global.css.
**Justeringar samma kväll (Björn):** ordet ovanför OM OSS borttaget · historien centrerad (som SEOS) · löftesradernas ikoner bytta till egna Blender-stillbilder `public/om-oss/{magnifier,cleaning,arrow}.webp` (Wannathis Charts 49/23/14, pilen i 14 omfärgad till NEW BLUE, pil ned-objektet `Cylinder.029` dolt; skript `motion-grid-bilder/verktyg/blender/still_about.py`) · nytt citat (fortfarande platshållare), större namn/titel · **Robot.astro (verktygen) monterad mellan löftena och citatet**: centrerad rubrik "Rätt verktyg för jobbet. / Ingen inlåsning.", chipsen är inte länkar (ordlistan finns inte), knappen i mitten borttagen, 60 fps · FAQ-frågan om AI-leverantör struken (5 frågor kvar). · Historiens rubrik → "Vi automatiserar / det som tar tid.", linjen AI PARTNER ━ SEOS DESIGN borttagen · ingressen under verktygsrubriken borttagen och flyttad IN i cirkelns mitt ("Vi väljer modell och verktyg efter uppgiften, inte efter leverantör. Här är några av dem vi bygger med."), luft ovanför cirkeln, texten 15–28 px inom 56 % bredd så den håller sig innanför de inre chipsens bana
**Öppet:** CITATET ÄR EN PLATSHÅLLARE skriven av Claude — byt mot Douglas riktiga ord. Douglas copy-granskning av hela sidan. FAQ "Var finns ni?": Stockholm, besök bara i Stockholmsområdet (Björn) — digitala möten för övriga Sverige ej bekräftat.

### (Historik) NÄSTA STEG var: sidan Om oss (`/om-oss`)

Björns val 2026-09-28. Den behövs redan: "Mer om oss" under heron och "Om oss" i navigationen ger 404. Arbetssätt som fungerat: **inspiration först** (Playwright-skärmdumpar av referenssajter) → **skisser** (visualize-widget, flera varianter) → Björn väljer → bygg → verifiera i Playwright.

Referenser att börja med: **seosdesign.se/om-oss** (Björn gillar rubrikanimationen, som redan finns i Story: ord som glider upp ur en mask; har också "Tre grundare" med foto och citat, "Vårt kundlöfte", värderingar i stora rader, "Vår process") + de sajter vi använt tidigare (consolidator.aero, fundamental.bg, anduril.com/lattice).

Material som finns och väntar:
- `Story.astro` ("Vår historia", Douglas-bio) — kan få mer plats här. **Foto på Douglas saknas** (sätt `PHOTO` i komponenten; bilden kan troligen hämtas från seosdesign.se/om-oss, Björn skickar filen).
- `Team.astro` ("Ett team. Två varumärken.", två brand-kolumner, länk till SEOS) — ur startsidan, filen kvar.
- `FAQ.astro` — parkerad sedan juli, planerad för just /om-oss (AEO-värde; stäm av med Douglas).
- `Robot.astro` (Spline-robot) — pausad, "kan återkomma på /om-oss" (se Spline-avsnittet nedan).
- `Advisory.astro` hör snarare hemma på en framtida sida om rådgivning & förvaltning.
Riktlinjer från Björn: enkel och tydlig, äkthet (riktiga människor bakom, inte "fake AI"), inga riktiga foton som krav (utom Douglas), rubriker/typografi enligt de nya tokens, inget "klotter".

### Tjänsterutorna — IMPLEMENTERADE 2026-09-25 (`Services.astro`, aktiv i index)

`Departments.astro` ligger kvar orörd (återställ via kommentaren i `index.astro`). Media i `site/public/tjanster/`: videorna beskurna 640→540 (`crop=540:540:50:50`, större motiv utan omrendering) + `*-slut.webp` (sista rutan, reduced motion). Avvikelser från prototypen: `mix-blend-mode: lighten` i stället för radiell mask (masken gav stapeldiagrammet en suddig vit gloria), videon når aldrig rutans kant (en uppskalad video åt upp hårlinjen vid 820 px), container query ger smala rutor mer textplats, "AI-assistent" bryts inte vid bindestrecket. Brytpunkter: 12 kol ≥960 · 2 kol (sista full bredd) · 1 kol <640. Touch: rutan aktiveras vid 60 % synlig och ligger kvar. Verifierat i Playwright (Chrome-kanalen — bundlade Chromium startar inte på nya datorn, "spawn UNKNOWN"): alla 5 spelar en gång och stannar på 1,6 s, 0 tappade rutor, återställs efter mouseleave, fokus = hover, 0 konsolfel. Länkarna `/tjanster/<slug>` är platshållare (404).
**Stäm av med Douglas:** marknadsföring utgår · länkmål/slugar · copy (H2 + ingress återanvända från Departments).

### StartFlow → StartProcess (2026-09-25–27, historik)

Björns val: consolidator.aero "Our process". `StartProcess.astro`, v2 efter Björns feedback (långsammare, skarpare, mer finess, inget bryt vid CTA, scroll-indikator):
- **Hela vyn låses som EN enhet** (`.proc__pin` sticky 100svh, sektionen 100svh + 2×70svh + 40svh). Stegen flyttas med transform inne i en maskad viewport med VILOLÄGE (HOLD 0,28: varje steg står still och skarpt, byter med smoothstep; ett steg är helt skarpt under ~80 % av scrollen), tonas och suddas (max 3 px) först när det lämnar mitten och släpper samtidigt med bilden. v1 hade två sticky-kolumner som släppte vid olika tider, med CTA:n hängande efter → "konstigt bryt". CTA:n ligger nu i steg 3 + "Vill ni förstå AI först? Vi kan också komma ut och föreläsa för ert team." (Björns formulering). Scroll-indikatorn = smal kapsel med ett segment per steg (aktivt lyser). Kubens skärpa: crf 23 → 16 höjer SSIM bara 0,963 → 0,966 (2,8 → 6,4 MB); källan (Wannathis 4K ~2,5 Mbit/s) är taket.
- **Kuben, v1–v3 (historik, ersatt av canvas nedan)** (Wannathis Cube, dark) spolades med scrollen via en utjämnad progress. Bara **0–4 s** av klippet (8 s var för snabbt; provat och förkastat: scroll-snap per steg och kuben låst till stegen). `proc-cube.mp4` 1080 px, crf 23, -g 10, **1,4 MB** (v1 var 720 px/crf 28 och såg suddig ut). Scenen = min(kolumnbredd, höjd) via container query. Indigo-sken bakom kuben som skiftar ~40° i nyans med scrollen.
- **Kuben ritas på CANVAS ur en bildsekvens** (2026-09-27, Björn: "laggigt", och den dämpade scrollen gav ett konstigt skifte i kanterna). Uppmätt: videosökningen gav bara ~25 kubuppdateringar/s med glapp upp till 200 ms; all-intra-video (-g 1) hjälpte inte (videon har bara 120 lägen och en sökning tar ≥1 bildruta). Nu: `public/proc-cube/f001–f120.webp` (900 px, q75, 2,7 MB), laddas 1000 px före sektionen (var 8:e bild först), avkodas i förväg, ritas med övertoning mellan grannbilder → kuben ritas i ~80 % av bildrutorna medan den rör sig, sidan ~58–60 fps, ritkostnad ≤0,2 ms. **Dämpningen av hjulet är borttagen** — vanlig scroll överallt. Mobil/reduced motion: stillbild (sekvensen laddas inte). `proc-cube.mp4` borttagen.
- **Scroll-indikator**: liten kapsel vid vänsterkanten med ett streck som vandrar.
- Låst läge bara ≥860 px utan reduced motion (JS sätter `.is-pinned`). Annars vanligt flöde med kuben som stillbild.
- Lärdomar: sticky/isolation → egen `background` krävs för att `mix-blend-mode: lighten` ska dölja videons svarta ruta. Videokanten tonas ut med en mask (annars en hårlinje på 7 mot 10). Fps-mätningen är brusig: en ny webbläsare per körning, jämfört mot en baslinje med sektionen dold (5–14 mot 4–5 tappade av ~235).
- Gamla varianterna (StartFlowRail, vågen, kaskaden) ligger kvar.

### Kontaktsidan /kontakt (2026-09-28, `533a26e`)

Björns val "B" (SEOS /kontakt utan "klotter"): `src/pages/kontakt.astro` + `Contact.astro` (ombyggd). Rubrik (h1, samma som startsidans CTA), en mening, tre kontaktvägar (klickbar e-post och telefon), formulär till höger (demo-kvitto, ingen backend), tre korta steg "Ni hör av er → Kartläggning → Åtgärdsplan" under. Kontaktuppgifter = PLATSHÅLLARE från SEOS: kontakt@seosdesign.se (troligen kontakt@aipartner.se senare), +46 8 490 096 20, Fridhemsgatan 45 Stockholm — ändra i `CONTACT` i Contact.astro. Nav-CTA:n, Positioneringens "Boka kartläggning" och steg 3 i kubsektionen pekar nu på /kontakt (var #boka). Extra luft nedtill så footerns klot inte lyser bakom stegtexten (uppmätt 7,5:1 vid 1440/1280/390).

### Avslutningen, typografi och knappar (2026-09-27, `23a40bf`)

- **Advisory + kortstapeln (StackFlow) borttagna från startsidan** (Björn: Advisory överflödig här, ingen ersättningsrad). Filerna kvar; Advisory sparas till en kommande sida om rådgivning & förvaltning.
- **Team → `Story.astro`** ("Vår historia." + "Ett team. Två varumärken.", berättelse, bio om Douglas Ekman, VD och medgrundare). Syfte: äkthet, det enda personliga på startsidan. Rubrikerna animeras som seosdesign.se/om-oss (varje ord glider upp ur en mask, ett i taget, när rubriken scrollas in). Brödtexten har ingen scrollanimation, bara en inledande intoning. Andra raden #666 (3,45:1, WCAG AA stor text). **Foto saknas** → initialer "DE"; sätt `PHOTO` i komponenten. Copy = utkast till Douglas. `Team.astro` kvar.
- **Typografi v1 (ERSATT av v2 nedan)**: `--fs-h2` = clamp(36px, 5.6vw, 72px) = Positioneringens statement → ALLA sektionsrubriker 72 px desktop / 36 px mobil (var 52 resp. 88). `--fs-lead` = clamp(18px, 1.6vw, 22px) (var 18–20). Positionering läser nu token. Story-rubriken i tre rader. "Var börjar ni med AI?" har `text-wrap: balance` (annars ensamt "AI?"). Låsta vyn ryms fortfarande vid 1280×720.
- **Typografi v2 (Björn: större, som SEOS)**: uppmätt att seosdesign.se har rubriker i "Mona Sans Narrow" men BRÖDTEXT i vanlig bredd (vi hade allt smalt). Nu: `p, input, textarea { font-stretch: 100% }` globalt (undantag med 75 %: versala etiketter — Stats .claim/.src, footerns kolumnrubriker — och <p> som fungerar som rubrik — Stats .num/.statement, Story .story__name). `--fs-h2` = clamp(42px, 6.7vw, 96px) (~96 px desktop), `--fs-h3` = clamp(26px, 3.4vw, 48px), alla h2/h3 vikt 700 (var 600/700/800). Tjänsterutornas titlar har egen storlek (≤36 px) så "AI-assistent" ryms. Kubsektionen: steg-slot = max(62 % av vyn, högsta steget + 48), uttoning 22 → 10 %, stramare avstånd vid höjd < 800 px → steg 3 med knappen ryms helt vid 1280×720, 1366×768, 1440×900, 1920×1080 (uppmätt).
- **Story v2**: porträtt till höger (4:5, initialer tills foto finns) med namn, titel och SEOS-länk under.
- **Contact → `ContactCta.astro`** (Björns val "alternativ 1"): centrerad rubrik "Börja med er största tidstjuv." + kort text + "Boka kartläggning" (vit) och "Kontakta oss" (glas), placerad så att footerns klot lyser upp BAKOM knapparna (klotet kommer från conversion.framer.media där det sitter under en CTA; förut lyste det bakom formulärets brödtext). Trust-punkterna borttagna. Formuläret flyttade till kontaktsidan (Contact.astro är nu /kontakt-innehållet). Knapparna → `/kontakt`. `#boka`-ankaret ligger kvar här. Uppmätt kontrast över skenet: brödtext ~19:1, knappar ≥7,3:1 (1440×900, 1280×720).
- **Glasknapparna enhetliga**: alla tre (nav-CTA:n, "Boka kartläggning" under heron, "Kontakta oss") = samma GRÅA glas som "Kontakta oss" med neutral ljus kant i vila; HOVER = kanten tar accentfärgen (bara kanten). `.btn-glass--accent` har inga egna regler längre (klassen kvar i Nav/Positionering). "Kontakta oss" ser blåare ut enbart för att footerns klot lyser igenom glaset. (Ett försök med indigotonad fyllning samma dag var ett missförstånd och är återställt.) De tidigare pausade knappändringarna är därmed avgjorda. "Mer om oss" förblir vit.
- **Stäm av med Douglas**: berättelsen i Story, CTA-texten, att formuläret flyttat från startsidan, kontaktuppgifterna (platshållare).

---

## Vad som är byggt

### Startsidans sektioner (i ordning, `site/src/pages/index.astro`)

| Sektion | Komponent | Kort |
|---|---|---|
| Nav | `Nav.astro` (via `Layout.astro`) | Tre zoner: statiskt ordmärke · fast glas-pill i mitten (bara länkar) · boknings-CTA → `/kontakt`. Länkar: Tjänster/Om oss/Blogg/Kontakt (bara /kontakt finns). Mobil: hamburger + drawer. |
| Hero | `Hero.astro` | Glas-box med loopande glas-video (Wannathis "Abstract objects"). |
| Positionering | `Positionering.astro` | Stort statement + "Boka kartläggning" (glas → /kontakt) och "Mer om oss" (vit → /om-oss, 404). Punktrutnät-video ("Wall"). |
| Stats | `Stats.astro` | v2: låst rubrik vänster, tre källgranskade siffror (LÅSTA) rullar höger, "Det är där vi kommer in." glider in rakt från vänster (scroll-driven). Se avsnittet ovan. |
| Services | `Services.astro` | Tjänsterutorna: 5 rutor (5+7 / 4+3+5), hover spelar en 3D-illustration en gång. Länkar `/tjanster/<slug>` = platshållare. (`Departments.astro` kvar, ej i index.) |
| StartFlow | `StartProcess.astro` | "Var börjar ni med AI?": låst vy, tre steg som vilar i tur och ordning, glaskub ritad på canvas ur bildsekvens, scroll-indikator. Steg 3 → /kontakt. |
| Story | `Story.astro` | "Vår historia." / "Ett team." / "Två varumärken." (ord glider upp), berättelse, porträtt (initialer tills foto) med namn/titel/SEOS-länk. |
| Avslutning | `ContactCta.astro` | Centrerad CTA ovanför footerns klot, två knappar → /kontakt. |
| Footer | `Footer.astro` | Märke + länkkolumner, ordmärke som stiger ur bottenlinjen, "soluppgångs"-klot på topplinjen (låsta färger). Nav säger "Blogg", footern "Kunskapsbank". |

**Undersidor:** `/kontakt` (`kontakt.astro` + `Contact.astro`): rubrik, kontaktuppgifter (PLATSHÅLLARE från SEOS i `CONTACT`), formulär (demo-kvitto, ingen backend), tre steg.

Ej i index men kvar som filer: `Departments`, `StackFlow`, `Advisory`, `Team`, `StartFlowRail`, `StartFlow` (vågen), `Robot`, `FAQ`, `ArcBand`, `BeamCta`.

### Delade byggstenar

- `site/src/styles/global.css` — alla tokens (`--arc-hue` = accentnyansen), knappar (`.btn` + varianter), globala regler.
- `site/src/scripts/inview-video.ts` — bakgrundsvideor spelar bara när de syns.
- `Arrow.astro`, `BeamCta.astro`.

### Media i `site/public/`

- `hero-glass.{mp4,webm}` + poster · `pos-wall.mp4` + poster.
- `tjanster/` — tjänsterutornas videor (`{mobile,column,funnel,lamp,pencil}.{mp4,webm}`, 540×540) + `*-slut.webp`.
- `proc-cube/f001–f120.webp` (kubens bildsekvens, 900 px, 2,7 MB) + `proc-cube-poster.webp`.
- Oanvända men kvar: `dep-glass.*` (Departments), `hero-bg.webp`, `dep-bg.webp`.
- Källfiler (4K-zippar, `Wall.mp4`, `motion-grid-bilder/`) ligger i repo-roten men är **gitignorade**.

---

## Designreferenser (vad som togs varifrån)

Samlad stil: mörkt och avskalat, stora feta smala rubriker + brödtext i full bredd, dämpad indigo-accent använd sparsamt, glasmaterial, hårlinjer, lugn scrollkopplad rörelse. SEOS-DNA men egen identitet.

| Referens | Använd till |
|---|---|
| seosdesign.se | Typografin (smala rubriker, brödtext full bredd). /om-oss: tvåfärgade rubriker där orden glider upp → Story; utgångspunkt för Om oss-sidan. /kontakt → kontaktsidan (variant B). |
| fundamental.bg/en ("Our Services") | Tjänsterutorna (grid 5+7 / 4+3+5, hover-illustration). |
| consolidator.aero ("Our process") | "Var börjar ni med AI?" (låst vy, steg under rubriken, glasobjekt, scroll-indikator). |
| conversion.framer.media | Footerns klot under CTA:n → ContactCta. |
| seapattern.com | Footerns ordmärke som stiger ur bottenlinjen. |
| Linear, Resend | Minimal centrerad avslutning. |
| anduril.com/lattice | Animationsreferens i CLAUDE.md; visad, ej använd direkt. |

Bortvalt: mockups (laptop/telefon), egna UI-kort som illustration, scroll-snap/trög scroll, kortstapel, trust-punktlistor, scrollanimerad brödtext, accentfyllda knappar.

## Tekniska beslut

### Stack
Astro valdes framför Next.js — se `docs/stackval.md`. Kort: noll JS om sidan inte kräver det, islands-arkitektur, idealiskt för en content-first sajt.

### Designtokens
Centraliserade i `global.css` med CSS custom properties. Ingen extern CSS-ram. Använd tokens, inte hårdkodade px/färger.

### Nya datorn (2026-09-24)
`site/node_modules` ominstallerat (npm blockerar installationsskript för esbuild/sharp — bygget fungerar ändå). PowerShell ExecutionPolicy CurrentUser = RemoteSigned. Installerat via winget: ffmpeg 9.0.2 (`Gyan.FFmpeg`, ej i PATH i bash — se memory) och Blender 5.2.

### Innehåll utan CMS
Kollega-överlämning i `docs/innehall-utan-cms.md`: Sanity troligen strukken → Astro content collections; kunskapsbanken på `/kunskapsbank/`, 12 artiklar + `/ai-konsult`, 301-karta. Stackbeslut → Douglas.

### Accentfärg
`--arc-hue: 232` + `--arc-sat: 0.85` = dämpad indigo (Björns val 2026-09-23, "tillsvidare"). Historik: 204 azur → 245 lila-blå (matchade glas-videorna, 244–246°) → 232/0,85 eftersom 245 i full mättnad kändes "disco" (videornas medianmättnad ~0,53). `--arc-sat` är en skala 0–1 som alla accentvärden läser (`calc(var(--arc-sat) * N%)`). Blå/lila är mörkare för ögat än azur: höj **ljusheten** på tunna linjer, inte nyansen. Uppmätt kontrast (kärna mot bakgrund): Stats 5,7 · Team-linjen 3,5 · ArcBand 2,6 · StartFlow-vågen 14,5. Douglas har sista ordet.

### Knappar
Alla glasknappar (`.btn-glass` i `global.css`) = grått glas med neutral ljus kant; **hover = kanten tar accentfärgen**. `.btn-glass--accent` saknar egna regler (klassen kvar i markupen). Vit `.btn-primary` för primära val ("Mer om oss", "Boka kartläggning" i avslutningen, formulärens knappar). Gamla `.btn-glow`, `.btn-comet` och `.btn-azur` ligger kvar oanvända för revert.

### Typografi
Rubriker = smal Mona Sans (`font-stretch: 75%` på html), **brödtext = full bredd** (`p, input, textarea { font-stretch: 100% }`, som seosdesign.se). `<p>` som fungerar som rubrik/siffra/versal etikett måste få `font-stretch: 75%` lokalt. `--fs-h2` ≈ 96 px desktop (alla sektionsrubriker), `--fs-h3` ≈ 48 px, `--fs-lead` 18–22 px, alla rubriker vikt 700.

### Bakgrundsvideor
Hero, Positionering och Departments har loopande videor från Wannathis (Pro Access, commercial-licens). Regler:
- Märk med `data-inview-video`, aldrig `autoplay`. Hero `preload="auto"`, övriga `preload="none"`.
- **Mät skarven** innan en video används (skarvkvot ~1 = sömlös). "Glass cylinders" hade 7,16 → crossfade-loopad till 0,85.
- 4K-källor skalas till 1920 och komprimeras; jämför ett 1:1-utsnitt före/efter. Fina punktrutnät kan ge större webm än mp4 — skicka då bara mp4.
- Postern är fallback och visas vid reduced-motion (videon döljs). Håll den liten — CSS-bakgrunder lazy-laddas inte.
- Mät textkontrasten mot den rörliga videon över hela loopen, inte mot en stillbild.

### Prestanda (uppmätt med Playwright, sept 2026)
- Partikelnätet (canvas, ~12 400 rutor/bildruta) gav 40–70 % tappade rutor → ersatt av video → 0 tappade.
- `backdrop-filter: blur` över hela vyn gav ett 67 ms-glapp i lightboxen → borttaget. På små knappar kostar den inget.
- `body { overflow: hidden }` flyttade sidan ~8 px (Windows-scrollbaren) → `html { scrollbar-gutter: stable }`.
- Appens förhandsvisning kör sidan dold och är blind för rörelse — mät animation och fps med Playwright i synligt fönster.

### Lightbox (Departments)
Morfen animerar ytans faktiska ruta (top/left/width/height/radie) med Web Animations API, och innehållet tonas in först när boxen nästan är framme. Stängning = samma morf baklänges. Ingen GSAP behövdes.

### Robot/Spline (arkiv)
Robot är pausad (ur index sedan 2026-07). Avsnittet nedan sparas ifall den återkommer på /om-oss.

### Spline-integration (Robot.astro) — dokumenteras utförligt eftersom den var komplex

#### Vad Spline är
En 3D-robot inbäddad via `<spline-viewer>` web component. Scen-URL: `https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode`.  
Roboten ska följa muspekaren och titta i den riktning musen befinner sig.

#### Problemet: canvas vs interaktionsyta
`spline-viewer` renderar till en canvas som är 62% av orbit-stage-bredden (innersta cirkeln). Utan extra kod reagerar roboten bara när musen är inne på den lilla canvasen — inte på de yttre ringarna med logotyperna.

#### Lösning: syntetiska canvas-events med korrigerad Y

Vi lyssnar på `pointermove` på **`#orbit-stage`** och dispatchar syntetiska `PointerEvent`-objekt direkt till canvas-elementet i `spline-viewers` **shadow DOM**.

**Varför canvas-dispatch och inte `ec.pointerScreen`-skrivning?**  
Diagnostik (Playwright + runtime-inspektion) visade att `ec.pointerScreen` är ett lagrings-objekt — det driver *inte* animationen. Det som faktiskt styr robotens huvud är `ec.pointerWorld` (3D-världskoordinater beräknade via raycasting). Raycasting körs bara när Splines egna canvas-events triggas. Att skriva till `pointerScreen` utan att trigga events ger ingen visuell effekt.

**Varför inte native canvas-events direkt?**  
Native events bär på fel koordinater eftersom Splines interna Y-formel (`ps_y = (cr.top + cr.height − clientY) / cr.height`) använder viewport-relativa värden — scrollY tar ut sig självt internt. Native events med document-relativa Y-värden ger fel ps_y.

**Slutlig approach — syntetiska events till shadow DOM-canvas:**
```javascript
const canvas = viewer.shadowRoot.querySelector("canvas");
const cr = canvas.getBoundingClientRect();

// Splines formel: ps_y = (cr.top + cr.height − clientY) / cr.height
// scrollY ingår internt men tar ut sig — lägg INTE till window.scrollY här.
// Inverterad: clientY = cr.top + cr.height − ps_y * cr.height
// ps_y > 0 = tittar upp, ps_y < 0 = tittar ned, ps_y = 0 = neutral
const fakeY = cr.top + cr.height - ps_y * cr.height;

// X klampad till [0.15, 0.85] — extremvärden triggar "arms up"-animation
const nx = 0.15 + rawX * 0.7;

canvas.dispatchEvent(new PointerEvent("pointermove", {
  bubbles: false,          // förhindrar oändlig loop tillbaka till stage-lyssnaren
  cancelable: true,
  clientX: cr.left + nx * cr.width,
  clientY: fakeY,
  pointerId: 1, pointerType: "mouse",
}));
```

**CSS `pointer-events: none` på `.orbit-core--spline`:**  
Blockerar *native* events med fel scroll-beroende Y. Syntetiska `dispatchEvent()`-events når alltid målet oavsett CSS pointer-events — så bara våra korrigerade events når canvasen.

**`bubbles: false`:**  
Förhindrar att det syntetiska eventet bubblar tillbaka upp till `#orbit-stage`-lyssnaren och skapar en oändlig loop.

#### Koordinatsystemet (verifierat via Playwright-inspektion av LookAt-handler)

Splines formel är linjär: `pointerWorld.y = 2 × ps_y − 1`

LookAt-konfiguration i scenen: `tilt: "up"`, `axis: "z"`, `plane: "custom"`. Båda objekten ("Head" och "Top part") har `worldQuaternion0 = identity` (ingen rotation = rakt fram).

| ps_y | pointerWorld.y | Visuell effekt |
|------|---------------|----------------|
| 0.9  | +0.8 | Tydligt uppåt |
| 0.5  | 0    | **Neutral/rakt fram = identity quaternion = idle-läge** |
| 0.1  | −0.8 | Tydligt nedåt |

**Kritisk insikt:** Splines `LookAt` är `paused: true` i viloläget. Idle-state har `pointerWorld.y = 0` (oinit.). Neutral för hover = `ps_y = 0.5` → `pointerWorld.y = 0` → identity quaternion (head.x ≈ 0, head.w = 1). Allt annat (`ps_y ≠ 0.5`) roterar från neutralen.

Formula: `ps_y = clamp([0.1, 0.9], (0.5 − rawY) × 0.6 + 0.5)` där `rawY = (clientY − stage.top) / stage.height`.

Splines spring-animations-system animerar roboten mot det aktuella `pointerWorld`-värdet varje render-frame. Splines egna RAF-loop körs kontinuerligt — ingen keep-alive behövs.

### AI-verktygslogotyper
Sparade som SVG i `site/public/logos/`. Leonardo.Ai saknar öppen SVG — visas som lettermark "Le".

---

## Återstår

**Startsidan:**
- [ ] Accentfärgen 232/0,85 — satt tillsvidare; Björn har inte bestämt sig, och footerns klot (låsta färger) skiljer sig lite från accenten. Återkom. Douglas godkänner.
- [x] Foto på Douglas till `Story.astro` (2026-09-29).
- [ ] Copy-granskning av Douglas: Story, CTA, tjänsterutor, kubsektionens steg 3-rad.
- [ ] Tjänsterutornas länkmål (`/tjanster/<slug>`) när tjänstesidorna finns.

**Kontaktsidan:**
- [ ] Riktiga kontaktuppgifter (t.ex. kontakt@aipartner.se) i `CONTACT` i `Contact.astro`.
- [ ] Formulärets backend (beror på deploy: Netlify Forms, e-posttjänst e.d.). Idag demo-kvitto.

**Undersidor (planerad ordning):** ~~Kontakt/bokning~~ (klar) → ~~Om oss~~ (byggd) → ~~Kunskapsbank~~ (byggd, se ovan) → Tjänster (kräver Douglas produktbeslut: vilka agentprodukter får egna sidor) → Rådgivning & förvaltning (Advisory) → Kunskapsbank (kräver innehåll + stackbeslut, se `docs/innehall-utan-cms.md`).

**Infrastruktur:**
- [ ] CMS-beslut — Sanity troligen struken för Astro content collections (`docs/innehall-utan-cms.md`); Douglas beslut.
- [ ] Deploy-pipeline (Netlify/Vercel) — saknas helt.
- [ ] 24 dependabot-sårbarheter i beroendena.
- [ ] Wannathis Pro Access sägs upp i december — ladda ner alla motiv som behövs innan dess.

## Fas 2–4

Se `CLAUDE.md` för full fasöversikt.

---

## Kända begränsningar / att ta upp med Douglas

- Accentfärgen bytt azur → dämpad indigo 232/0,85 (Douglas beslut).
- Knappsystemet ändrat till enhetliga glasknappar (nytt i design-systemet).
- All text är fortfarande hårdkodad i komponenterna (ingen Sanity än).
- Nav/footer-länkarnas slugar (`/tjanster`, `/om-oss`, `/blogg`, `/kontakt`) är förslag — bekräftas mot SEOS URL-plan.
- Kontaktuppgifterna på /kontakt är SEOS (platshållare) och formuläret skickar inget ännu.
- Kuben laddar en bildsekvens på 2,7 MB (desktop, lazy); mobil får stillbild.
- Robot/Spline (om den återkommer): extremanimationen ("arms up") vid `ps_x < 0.15` eller `ps_x > 0.85` — koden klampar X till [0.15, 0.85]; Y-range [0.1, 0.9] med neutral 0.5.
