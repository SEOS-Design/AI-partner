# Byggstatus — aipartner.se

> Senast uppdaterad: 2026-09-25

---

## Var vi är nu

Startsidan är byggd som one-pager med alla sektioner och **finslipas** (video-bakgrunder, enhetliga knappar, prestanda). Undersidorna är inte påbörjade. Inget är driftsatt — det sker i Fas 4 efter Douglas granskning.

- **Driftsatt:** Nej. Det finns **ingen deploy-pipeline** (ingen netlify/vercel/actions-config) — push till `master` är bara backup till GitHub och går inte live.
- **Repo:** github.com/SEOS-Design/AI-partner, branch `master`
- **Dev-server:** `cd site && npm run dev` → http://localhost:4321
- **Senast pushat:** `d4a02b6` (2026-09-23). **Committat lokalt, ej pushat:** `3244b47` (ny footer).

### Tjänsterutorna — IMPLEMENTERADE 2026-09-25 (`Services.astro`, aktiv i index)

`Departments.astro` ligger kvar orörd (återställ via kommentaren i `index.astro`). Media i `site/public/tjanster/`: videorna beskurna 640→540 (`crop=540:540:50:50`, större motiv utan omrendering) + `*-slut.webp` (sista rutan, reduced motion). Avvikelser från prototypen: `mix-blend-mode: lighten` i stället för radiell mask (masken gav stapeldiagrammet en suddig vit gloria), videon når aldrig rutans kant (en uppskalad video åt upp hårlinjen vid 820 px), container query ger smala rutor mer textplats, "AI-assistent" bryts inte vid bindestrecket. Brytpunkter: 12 kol ≥960 · 2 kol (sista full bredd) · 1 kol <640. Touch: rutan aktiveras vid 60 % synlig och ligger kvar. Verifierat i Playwright (Chrome-kanalen — bundlade Chromium startar inte på nya datorn, "spawn UNKNOWN"): alla 5 spelar en gång och stannar på 1,6 s, 0 tappade rutor, återställs efter mouseleave, fokus = hover, 0 konsolfel. Länkarna `/tjanster/<slug>` är platshållare (404).
**Stäm av med Douglas:** marknadsföring utgår · länkmål/slugar · copy (H2 + ingress återanvända från Departments).

### StartFlow → StartProcess (2026-09-25, aktiv i index, ocommittat)

Björns val: consolidator.aero "Our process". `StartProcess.astro`, v2 efter Björns feedback (långsammare, skarpare, mer finess, inget bryt vid CTA, scroll-indikator):
- **Hela vyn låses som EN enhet** (`.proc__pin` sticky 100svh, sektionen 100svh + 2×70svh + 40svh). Stegen flyttas med transform inne i en maskad viewport med VILOLÄGE (HOLD 0,28: varje steg står still och skarpt, byter med smoothstep; ett steg är helt skarpt under ~80 % av scrollen), tonas och suddas (max 3 px) först när det lämnar mitten och släpper samtidigt med bilden. v1 hade två sticky-kolumner som släppte vid olika tider, med CTA:n hängande efter → "konstigt bryt". CTA:n ligger nu i steg 3 + "Vill ni förstå AI först? Vi kan också komma ut och föreläsa för ert team." (Björns formulering). Scroll-indikatorn = smal kapsel med ett segment per steg (aktivt lyser). Kubens skärpa: crf 23 → 16 höjer SSIM bara 0,963 → 0,966 (2,8 → 6,4 MB); källan (Wannathis 4K ~2,5 Mbit/s) är taket.
- **Kuben** (Wannathis Cube, dark) spolas med scrollen via en utjämnad progress. Bara **0–4 s** av klippet (8 s var för snabbt; provat och förkastat: scroll-snap per steg och kuben låst till stegen). `proc-cube.mp4` 1080 px, crf 23, -g 10, **1,4 MB** (v1 var 720 px/crf 28 och såg suddig ut). Scenen = min(kolumnbredd, höjd) via container query. Indigo-sken bakom kuben som skiftar ~40° i nyans med scrollen.
- **Kuben ritas på CANVAS ur en bildsekvens** (2026-09-27, Björn: "laggigt", och den dämpade scrollen gav ett konstigt skifte i kanterna). Uppmätt: videosökningen gav bara ~25 kubuppdateringar/s med glapp upp till 200 ms; all-intra-video (-g 1) hjälpte inte (videon har bara 120 lägen och en sökning tar ≥1 bildruta). Nu: `public/proc-cube/f001–f120.webp` (900 px, q75, 2,7 MB), laddas 1000 px före sektionen (var 8:e bild först), avkodas i förväg, ritas med övertoning mellan grannbilder → kuben ritas i ~80 % av bildrutorna medan den rör sig, sidan ~58–60 fps, ritkostnad ≤0,2 ms. **Dämpningen av hjulet är borttagen** — vanlig scroll överallt. Mobil/reduced motion: stillbild (sekvensen laddas inte). `proc-cube.mp4` borttagen.
- **Scroll-indikator**: liten kapsel vid vänsterkanten med ett streck som vandrar.
- Låst läge bara ≥860 px utan reduced motion (JS sätter `.is-pinned`). Annars vanligt flöde; mobilen loopar videon, vid reduced motion visas postern.
- Lärdomar: sticky/isolation → egen `background` krävs för att `mix-blend-mode: lighten` ska dölja videons svarta ruta. Videokanten tonas ut med en mask (annars en hårlinje på 7 mot 10). Fps-mätningen är brusig: en ny webbläsare per körning, jämfört mot en baslinje med sektionen dold (5–14 mot 4–5 tappade av ~235).
- Gamla varianterna (StartFlowRail, vågen, kaskaden) ligger kvar.

### Avslutningen omgjord (2026-09-27, ocommittat)

- **Advisory + kortstapeln (StackFlow) borttagna från startsidan** (Björn: Advisory överflödig här, ingen ersättningsrad). Filerna kvar; Advisory sparas till en kommande sida om rådgivning & förvaltning.
- **Team → `Story.astro`** ("Vår historia." + "Ett team. Två varumärken.", berättelse, bio om Douglas Ekman, VD och medgrundare). Syfte: äkthet, det enda personliga på startsidan. Rubrikerna animeras som seosdesign.se/om-oss (varje ord glider upp ur en mask, ett i taget, när rubriken scrollas in). Brödtexten har ingen scrollanimation, bara en inledande intoning. Andra raden #666 (3,45:1, WCAG AA stor text). **Foto saknas** → initialer "DE"; sätt `PHOTO` i komponenten. Copy = utkast till Douglas. `Team.astro` kvar.
- **Typografi enhetlig (Björn)**: `--fs-h2` = clamp(36px, 5.6vw, 72px) = Positioneringens statement → ALLA sektionsrubriker 72 px desktop / 36 px mobil (var 52 resp. 88). `--fs-lead` = clamp(18px, 1.6vw, 22px) (var 18–20). Positionering läser nu token. Story-rubriken i tre rader. "Var börjar ni med AI?" har `text-wrap: balance` (annars ensamt "AI?"). Låsta vyn ryms fortfarande vid 1280×720.
- **Typografi v2 (Björn: större, som SEOS)**: uppmätt att seosdesign.se har rubriker i "Mona Sans Narrow" men BRÖDTEXT i vanlig bredd (vi hade allt smalt). Nu: `p, input, textarea { font-stretch: 100% }` globalt (undantag med 75 %: versala etiketter — Stats .claim/.src, footerns kolumnrubriker — och <p> som fungerar som rubrik — Stats .num/.statement, Story .story__name). `--fs-h2` = clamp(42px, 6.7vw, 96px) (~96 px desktop), `--fs-h3` = clamp(26px, 3.4vw, 48px), alla h2/h3 vikt 700 (var 600/700/800). Tjänsterutornas titlar har egen storlek (≤36 px) så "AI-assistent" ryms. Kubsektionen: steg-slot = max(62 % av vyn, högsta steget + 48), uttoning 22 → 10 %, stramare avstånd vid höjd < 800 px → steg 3 med knappen ryms helt vid 1280×720, 1366×768, 1440×900, 1920×1080 (uppmätt).
- **Story v2**: porträtt till höger (4:5, initialer tills foto finns) med namn, titel och SEOS-länk under.
- **Contact → `ContactCta.astro`** (Björns val "alternativ 1"): centrerad rubrik "Börja med er största tidstjuv." + kort text + "Boka kartläggning" (vit) och "Kontakta oss" (glas), placerad så att footerns klot lyser upp BAKOM knapparna (klotet kommer från conversion.framer.media där det sitter under en CTA; förut lyste det bakom formulärets brödtext). Trust-punkterna borttagna. Formuläret flyttar till kontaktsidan: `Contact.astro` sparad orörd. Knapparna → `/kontakt` (404 tills sidan byggs; ingen e-post finns i projektet). `#boka`-ankaret ligger kvar här. Uppmätt kontrast över skenet: brödtext ~19:1, knappar ≥7,3:1 (1440×900, 1280×720).
- **Glasknapparna enhetliga**: alla tre (nav-CTA:n, "Boka kartläggning" under heron, "Kontakta oss") = samma GRÅA glas som "Kontakta oss" med neutral ljus kant i vila; HOVER = kanten tar accentfärgen (bara kanten). `.btn-glass--accent` har inga egna regler längre (klassen kvar i Nav/Positionering). "Kontakta oss" ser blåare ut enbart för att footerns klot lyser igenom glaset. (Ett försök med indigotonad fyllning samma dag var ett missförstånd och är återställt.) De tidigare pausade knappändringarna är därmed avgjorda. "Mer om oss" förblir vit.
- **Stäm av med Douglas**: berättelsen i Story, CTA-texten, e-postadress/telefon till "Kontakta oss", och att formuläret flyttar från startsidan.

#### (Ursprunglig spec för tjänsterutorna)

Bygg en **ny komponent** (t.ex. `Services.astro`) och byt in den i `index.astro` — **radera INTE `Departments.astro`** (behåll den gamla sektionen och lightboxen; byt bara importen/användningen, med kommentar hur man återställer).

Underlag (allt i den gitignorerade mappen `motion-grid-bilder/`):
- `animationer/prototyp.html` — klickbar hover-prototyp (öppna i webbläsaren). Stilen/strukturen att porta.
- `animationer/{mobile,column,funnel,lamp,pencil}.{mp4,webm}` — 1,6 s, 30 fps, 640×640 mot bakgrund #050505, 20–67 kB. `slutbild-*.png` = sista bildrutan (genomskinlig) → stillbild/poster.
- `verktyg/` — Blender- och ffmpeg-skript + README (hur man renderar om).

Design (Fundamental-referensen, fundamental.bg/en "Our Services"): 12-kolumnsgrid **5+7 / 4+3+5**, hårlinjer mellan rutor, ring uppe till vänster, rubrik nere till vänster. Vid hover: videon tonas in och spelar EN gång (stannar på sista rutan), ringen fylls, beskrivning + pil glider upp, svagt indigo-sken; mouseleave tonar ut. Videons kanter tonas ut med radiell mask.

| Ruta | Illustration (Blender-objekt) | Beskrivning (utkast) |
|---|---|---|
| Kundtjänst | Mobile dashboard | Besvarar kundärenden direkt och lämnar över till er när det behövs. |
| Ekonomi & administration | Column chart | Fakturor tolkas, konteras och går vidare till attest. |
| Sälj & offert | Funnel | Leads poängsätts och offerten skrivs fram. |
| Er egen AI-assistent | Lamp | Svarar med källa i era egna dokument. |
| Kvalitet & projekt | Pencil and Grid | Avvikelser flaggas och veckorapporten skriver sig själv. |

Att bygga in: lazy-laddning (videor laddas när sektionen närmar sig), mobil/touch (en kolumn, spela en gång när rutan syns), tangentbordsfokus = hover, reduced motion = slutbilden som stillbild, verifiering i Playwright. Uppskattning ~2–3 h.
Valfritt först: rendera om med tätare inramning (`camera_for(margin≈1.15)`) — illustrationerna blev små i rutorna (~1 h renderingstid, CPU).
**Stäm av med Douglas:** marknadsföring utgår (finns ej i strategin) · vilka tjänstesidor rutorna länkar till (platshållare tills vidare) · slutlig copy.

**Ocommittat (2026-09-25):** knapparna (`.btn-glass--accent` på nav-CTA + "Boka kartläggning", "Mer om oss" vit) — PAUSADE, Björn ej nöjd · `StartFlowRail.astro` (rak rad + ljusskena, aktiv i index; vågen `StartFlow.astro` och kaskaden `.bak` kvar) — PAUSAD, Björn ej nöjd · `.gitignore` (+`/motion-grid-bilder/`) · `docs/innehall-utan-cms.md` · denna fil. `CLAUDE.md` (Douglas) och strategi-briefen committas inte utan avstämning.

---

## Vad som är byggt

### Startsidans sektioner (i ordning, `site/src/pages/index.astro`)

| Sektion | Komponent | Kort |
|---|---|---|
| Nav | `Nav.astro` | Tre zoner: statiskt ordmärke · fast glas-pill i mitten (bara länkar, det enda som följer med vid scroll) · boknings-CTA. Länkar: Tjänster/Om oss/Blogg/Kontakt (404 tills sidorna byggs). Mobil: hamburger + drawer. |
| Hero | `Hero.astro` | Glas-box med loopande glas-video (Wannathis "Abstract objects"). Tint skyddar läsbarheten; kontrast mätt mot den rörliga videon. |
| Positionering | `Positionering.astro` | Stort statement + två glas-CTA:er. Bakgrund: punktrutnät-video ("Wall"). Partikelnätet (canvas) pausat, ej raderat. |
| Stats | `Stats.astro` | Tre källgranskade siffror (LÅSTA) med räknare + accentlinje. |
| Services | `Services.astro` | Tjänsterutorna: 5 rutor (5+7 / 4+3+5), hover spelar en 3D-illustration en gång. Ersatte Departments 2026-09-25 (filen + lightboxen kvar, ej i index). |
| StartFlow | `StartProcess.astro` (aktiv sedan 2026-09-25; före det `StartFlowRail.astro`) | "Var börjar ni med AI?": tre kort på rad + ljusskena med vandrande puls. Vågen (`StartFlow.astro`) och gamla kaskaden (`StartFlow.cascade.astro.bak`, gitignorerad!) kvar. Pausad. |
| StackFlow | `StackFlow.astro` | Pinnad kortstack: Advisory · Team · Contact. |
| Footer | `Footer.astro` | Märke + två länkkolumner, ordmärke som stiger ur bottenlinjen (seapattern.com-mekaniken), "soluppgångs"-klot på topplinjen (conversion.framer.media) med låsta färger. ArcBand borttagen ur index (filen kvar). Nav säger fortfarande "Blogg" — footern "Kunskapsbank". |

Pausade/parkerade: `Robot.astro` (ur index, kan återkomma på /om-oss), `FAQ.astro` (parkerad → /om-oss).

### Delade byggstenar

- `site/src/styles/global.css` — alla tokens (`--arc-hue` = accentnyansen), knappar (`.btn` + varianter), globala regler.
- `site/src/scripts/inview-video.ts` — bakgrundsvideor spelar bara när de syns.
- `Arrow.astro`, `BeamCta.astro`.

### Media i `site/public/`

- `hero-glass.{mp4,webm}` + poster · `dep-glass.{mp4,webm}` + poster · `pos-wall.mp4` + poster.
- `hero-bg.webp` (gamla hero-fotot, sparat för återbruk) och `dep-bg.webp` (oanvänd sedan videon).
- Källfiler (4K-zippar, `Wall.mp4` m.fl.) ligger i repo-roten men är **gitignorade**.

---

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
En enhetlig glasknapp `.btn-glass` i `global.css` för sekundära/accent-CTA:er — ändra på ett ställe. Vit `.btn-primary` används fortfarande längre ner (StartFlow, Team, Contact). Gamla `.btn-glow`, `.btn-comet` och `.btn-azur` ligger kvar oanvända för revert.

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

**Startsidan (finslipning):**
- [ ] Knapparna längre ner (vit `.btn-primary` i StartFlow/Team/Contact) — göra enhetliga med glasknapparna? (Björn avvaktar)
- [ ] Accentfärgen 232/0,85 — satt tillsvidare, Douglas godkänner
- [x] **Tjänsterutorna** — `Services.astro` (2026-09-25). `Departments.astro` behållen. Väntar på Douglas: länkmål + copy.
- [x] Footern (klar 2026-09-24, `3244b47`)
- [ ] StartFlow (pausad, Björn ej nöjd med varken vågen eller raka raden) · knapparna (pausade)
- [ ] Kontaktformulärets backend

**Undersidor (planerad ordning):** Kontakt/bokning → Om oss → Tjänster (kräver Douglas produktbeslut) → Blogg (kräver Sanity + innehåll).

**Infrastruktur:**
- [ ] Sanity-koppling — konto finns, men inget schema, ingen Studio och ingen integration i repot. (CLAUDE.md påstår "Sanity MCP uppkopplad" — det stämmer inte i sessionerna.)
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
- Robot/Spline (om den återkommer): extremanimationen ("arms up") vid `ps_x < 0.15` eller `ps_x > 0.85` — koden klampar X till [0.15, 0.85]; Y-range [0.1, 0.9] med neutral 0.5.
