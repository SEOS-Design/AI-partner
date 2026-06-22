# Byggstatus — aipartner.se

> Senast uppdaterad: 2026-06-02

---

## Var vi är nu (Fas 1 pågår)

En fungerande sida med Hero och Robot-sektionen är byggd och körs lokalt. Ingenting är driftsatt än — det sker i Fas 4 efter Douglas granskning.

**Driftsatt:** Nej  
**Repo branch:** master  
**Dev-server:** `cd site && npm run dev`

---

## Vad som är byggt

### Projektstruktur

```
ai-partner/
├── site/                      # Astro-projektet
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav.astro      # Navigationsbar
│   │   │   ├── Hero.astro     # Fullskärms hero-sektion
│   │   │   └── Robot.astro    # "Verktygen vi bygger med"-sektion
│   │   ├── layouts/
│   │   │   └── Layout.astro   # HTML-skal, importerar global.css + Nav
│   │   ├── pages/
│   │   │   └── index.astro    # Startsida: Hero + Robot
│   │   └── styles/
│   │       └── global.css     # Designtokens, typografi, reset
│   └── public/
│       └── logos/             # AI-verktygslogotyper (SVG)
└── docs/                      # Projektdokumentation
```

### Nav.astro
Horisontell navigeringsbar med logotyp till vänster och länkar till höger (Tjänster, Kunskapsbank, FAQ, Kontakt). Responsiv — kollapsas på mobil (ej implementerat ännu).

### Hero.astro
Fullskärmssektion med:
- Animerad canvas-bakgrund (lutad vågyta/partikelnät)
- H1 med slide-up-animation vid inladdning ("AI Partner")
- Undertitel
- Scroll-indikator

### Robot.astro — "Några av verktygen vi bygger med"
Sektionens huvudkomponent. Innehåller:

**Orbit-scen:**
- Tre koncentriska dekorativa ringar (62%, 84%, 100% av scen-diametern)
- Spline 3D-robot i innersta cirkeln (62% av scenen)
- 8 orbiterande AI-logotyper (OpenAI, Claude, Gemini, DeepSeek, Grok, DeepL, Adobe Firefly, Leonardo.Ai) på två ringar med olika radier och rotationsriktningar
- CTA-text och knapp i centrum

**JS — orbit-animation:**
- `requestAnimationFrame`-loop positionerar varje chip varje frame via `transform`
- Chips roterar aldrig — logotyp och namn är alltid läsbara
- Hover pausar rörelsen
- `prefers-reduced-motion` respekteras

**JS — Spline-mustrackning (se nedan för tekniska beslut)**

---

## Tekniska beslut

### Stack
Astro valdes framför Next.js — se `docs/stackval.md` för full motivering. Kort: noll JS om sidan inte kräver det, islands-arkitektur, idealiskt för content-first sajt.

### Designtokens
Centraliserade i `global.css` med CSS custom properties (`--fg-1`, `--bg`, `--accent`, etc.). Ingen extern CSS-ram.

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

## Återstår i Fas 1

- [ ] Footer-komponent
- [ ] Sanity CMS-koppling (schema + query för `siteSettings`, `service`)
- [ ] CMS-drivet innehåll i Robot-sektionen (verktygslistning från Sanity)
- [ ] Responsiv navigation (hamburgermeny mobil)

## Fas 2–4 (ej påbörjad)

Se `CLAUDE.md` för full fasöversikt.

---

## Kända begränsningar / att ta upp med Douglas

- Spline-scenens extremanimation ("arms up") vid `ps_x < 0.15` eller `ps_x > 0.85` är en begränsning i scen-designen. Koden klampar till [0.15, 0.85] för att hålla roboten i sin naturliga zon.
- Roboten spårar musen i både X (vänster/höger) och Y (upp/ned). Y-range: [0.1, 0.9] med neutral 0.5 (= identity quaternion = idle). X klampad till [0.15, 0.85] mot "arms up"-animation.
- Ingen Sanity-koppling ännu. All text är hårdkodad i komponenter.
