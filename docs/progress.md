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
- **Dämpad scroll i sektionen** (Björn: snabb scroll = "kaos"): wheel-händelser inne i den låsta sträckan skalas (WHEEL_FACTOR 0,45) och glider med maxfart (MAX_STEP 20 px/bildruta); tangentbord/scrollist orörda, vid gränserna släpps scrollen fri. Mätt: flick på 2000 px → max 20 px/ruta, 0 tappade rutor; ut i båda ändar fungerar. Egen kod i stället för Lenis (som tar över hela sidans scroll). Bugg fixad: glidningen fortsatte mot sitt mål när något annat scrollat (länk, scrollist, vanlig scroll förbi gränsen) → drog tillbaka en till sektionen. Nu avbryts den om sidan inte står där den själv satte den, och landar exakt på gränsen (annars fastnade man 1 px innanför). Testat vid 100/125/150 % skalning.
- **Scroll-indikator**: liten kapsel vid vänsterkanten med ett streck som vandrar.
- Låst läge bara ≥860 px utan reduced motion (JS sätter `.is-pinned`). Annars vanligt flöde; mobilen loopar videon, vid reduced motion visas postern.
- Lärdomar: sticky/isolation → egen `background` krävs för att `mix-blend-mode: lighten` ska dölja videons svarta ruta. Videokanten tonas ut med en mask (annars en hårlinje på 7 mot 10). Fps-mätningen är brusig: en ny webbläsare per körning, jämfört mot en baslinje med sektionen dold (5–14 mot 4–5 tappade av ~235).
- Gamla varianterna (StartFlowRail, vågen, kaskaden) ligger kvar.

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
