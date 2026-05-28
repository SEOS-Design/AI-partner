# PM: Stackval för nya aipartner.se

> **BESLUT (2026-05-25): Vi kör Astro + Sanity.** AI Partner är en innehålls-/marknadssajt – prestanda, enklare mental modell och lägre friktion på Björns första headless-projekt vägde tyngst. Underlaget nedan står kvar som dokumentation av valet.
>
> Beslutsunderlag för medgrundarsamtal. Kort med flit. 2026-05-25.

## Frågan – och en viktig uppdelning

Det spontana valet var "Next.js + Sanity". Men det blandar ihop två separata beslut:

1. **CMS:** Vilket headless CMS lagrar innehållet?
2. **Frontend-ramverk:** Vad bygger vi själva sajten i?

**CMS är i praktiken redan avgjort: Sanity.** MCP:n är uppkopplad, vi kan låta Claude hantera innehåll agentiskt (samma princip som vi kör mot Webflow för SEOS-kunder), och Sanity funkar lika bra med både Astro och Next.js. Den kopplingen är alltså *inte* ett argument för det ena ramverket.

**Det riktiga beslutet ikväll är frontend-ramverket: Astro eller Next.js.**

---

## Astro – fördelarna (det vi vill väga in)

- **Prestanda by default.** Astro skickar noll JavaScript till webbläsaren om sidan inte behöver det ("islands architecture"). För en marknadssajt = mycket snabba laddtider och starka Core Web Vitals nästan gratis. Det är direkt relevant: prestanda är en rankings- och AEO-faktor, och vi säljer SEO.
- **Byggd för innehåll.** Astro är optimerat för just marketing sites, bloggar och kunskapsbanker – vilket är exakt vad AI Partner är. Mindre overhead, enklare mental modell än ett fullt app-ramverk.
- **Flexibelt när interaktivitet behövs.** Kan plocka in React-/Svelte-/Vue-komponenter som "öar" där det faktiskt krävs (t.ex. ett interaktivt inslag), utan att tynga resten av sidan.
- **Kopplar mot vilket CMS som helst.** Sanity-integration finns färdig – ingen låsning.
- **Enklare för en mid-junior att lyckas med.** Mindre att gå vilse i; svårare att bygga något långsamt av misstag.

## Next.js – fördelarna (motvikten)

- **Skill transfer till kundjobb.** Våra kodade kundprojekt går mot Next.js + headless. Lär han sig Next.js på AI Partner är kompetensen direkt återanvändbar på betalande uppdrag. Astro-kunskap är mer nischad.
- **Skalar till app-funktionalitet.** Om AI Partner i framtiden vill ha interaktiva AI-demos, inloggat läge, dashboards eller produktytor är Next.js byggt för det. Astro får jobba i motvind där.
- **Större ekosystem.** Mer dokumentation, fler exempel, lättare att hitta svar (och att anställa för) – relevant när en junior bygger AI-assisterat.

---

## Beslutslinsen

Det kokar ner till en fråga: **är aipartner.se en ren innehålls-/marknadssajt, eller en plattform som ska växa till interaktiva produktytor?**

| Om vi tror... | ...då lutar valet mot |
|---|---|
| Marknadssajt, content/case/kunskapsbank, prestanda är kung | **Astro** + Sanity |
| Plattform som ska få AI-demos/inloggat/dashboards, max återanvändbarhet mot kundjobb | **Next.js** + Sanity |

**Upplärningsvinkeln drar åt olika håll:** Next.js lär honom en bredare, mer säljbar kompetens. Astro lär honom modern prestanda-först-arkitektur (och är lättare att lyckas med på första projektet).

## Min rekommendation

För *just det här projektet* lutar jag mot **Next.js + Sanity** – men av en specifik anledning: det är ett upplärningsprojekt, och Next.js-kompetensen betalar tillbaka sig direkt på framtida kundleveranser. Det är investeringen i honom som väger tyngst, inte sajten i sig.

**Men** om ni ser AI Partner som en ren marknadssajt de närmaste 1–2 åren och vill ha bästa möjliga prestanda/SEO med minst friktion, är **Astro + Sanity** det tekniskt renare valet – och en fullt rimlig sak att låta honom lära sig.

Det finns inget fel svar här. Den avgörande frågan är produktambitionen för AI Partner, inte tekniken.
