# AI Partner-ombyggnad – projektkontext

> Kontextfil för AI-assistans (Claude Code) och referensläsning för Björn.
> Handlingsinriktade reminders och uppgifter till Björn hålls separat i löpande text – den här filen är ren kontext.
> Stackval, designbeslut och slutgiltig copy fastställs av Douglas. Senast uppdaterad 2026-05-25.

---

## 1. Vad AI Partner är – och varför vi bygger om

AI Partner (aipartner.se) är SEOS Designs systervarumärke med fokus på AI-automatisering, RPA, AI-agenter och RAG-system. Juridiskt inte ett eget bolag, men marknadsförs separat. SEOS hanterar allt SEO/AEO-arbete även för AI Partner.

Sidan byggs om från grunden i ett **headless CMS** av två skäl: dels behöver design och budskap uppdateras, dels är projektet Björns upplärning på ett komplett headless-bygge (från repo till driftsatt sida, AI-assisterat med Claude Code). Det här blir AI Partners riktiga webbplats – inte en övning som slängs.

**Systersajterna ska vävas samman.** seosdesign.se och aipartner.se hör ihop. Internlänka från AI Partner till seosdesign.se där det tillför läsaren värde – men **måttfullt, aldrig forcerat** (samma återhållsamhet som vår röst kräver, se avsnitt 4).
- Naturliga bryggor: AI-synlighet / AI SEO / AEO / GEO → SEOS djupare SEO-/AEO-resurser · webb-, CMS- och hemsidebehov → SEOS · definitionella begrepp (llm, rag, mcp, entity, vektordatabas) → SEOS kunskapsbank (dubblera dem inte).
- SEOS äger AI Partners SEO, så länkstrategin samordnas. De två sajterna ska inte konkurrera om samma sökord – se kannibaliserings- och internlänkningskartan i `AI-Partner-SEO-soktermer.md`.

---

## 2. Så arbetar vi på SEOS (metod)

AI Partners sida byggs enligt samma principer som vi använder för betalande kunder.

**Människan bestämmer, AI ger tempo.** Vi bestämmer *vad* som ska skrivas, varför och för vem. AI hjälper oss skala och gå fort. Mänsklig kontroll bakas in: strategi → struktur → kvalitetskontroll → gallring. AI publicerar aldrig själv – en människa granskar alltid innan något går live.

**Vi skriver för både människa och AI (AEO).** Innehållet ska kunna citeras av AI-svar:
- Inled varje sida/sektion med en **kort, självständig mening** som svarar direkt på frågan.
- Formulera **H2-rubriker som faktiska frågor** läsaren eller en AI ställer.
- Skriv så att **varje stycke kan stå för sig självt** (semantic chunking).
- I FAQ och svar: **led med svaret** i första meningen, utveckla sedan.

**Källdisciplin (icke förhandlingsbart).** Varje externt datapåstående länkas till källan. Nämns en källa vid namn ("enligt Gartner") måste en länk följa direkt. Hitta aldrig på siffror.

**Verifiera statistik mot primärkälla.** Alla siffror (procent, kronor, "x av y") kontrolleras mot primärkälla innan publicering – även från välkända namn. Kan en siffra inte verifieras: ta bort den, gör om till kvalitativ formulering, eller markera som uppskattning.

**Ärlig förväntansstyrning.** Vi överlovar aldrig. Inte "förstaplats på Google", inte "revolutionerande AI". Vi beskriver vad något faktiskt gör. Det bygger mer förtroende än superlativ.

**Granskningsflödet (verktygen heter likadant i Claude Code):**
1. **Vinkel-research** – vad säger topprankande sidor, vad missar de, vilka frågor ställer folk?
2. **Skriv** enligt house style (avsnitt 4).
3. **Faktagranska** all statistik mot primärkälla.
4. **Tonalitetsgranska** mot röstspecen (avsnitt 4 / `voice.md`).
5. **Mänsklig granskning** (Douglas) innan publicering.

---

## 3. Nuvarande aipartner.se – baslinje

Idag en **one-pager** (navlänken "Tjänster" är en sektion, `/tjanster` ger 404).

**Struktur:** Hero → problem + lösning → verktyg/teknik (loggor) → fyra tjänsteområden → statistik/proof ("Ligger ert företag efter?") → kundcitat → FAQ → footer.

**Budskap idag (verbatim):**
- Hero: *"AI är inte längre en trend – det är en konkurrensfaktor. Vi visar vägen och bygger lösningen."*
- Tagline: *"Hate it? Automate it!"*
- Löfte: *"ansvar från start till mål"*

**Fyra tjänsteområden idag:** AI-strategi & rådgivning · AI-implementering & utveckling · AI-analys & optimering · AI-utbildning & föreläsning.

**Proof idag:** Kundcitat – Erik Ellström, vd Ankan & Hästen: *"Kostnaden för projektet sparade vi in efter tre månader."* + allmän statistik (Zalando, Gartner).

**Behåll:** "vi bygger, inte bara pratar"-vinkeln, kundcitatet med konkret ROI, FAQ-formatet, den raka tonen.
**Se över:** allmän tredjepartsstatistik (byt mot egna case), one-pager-formatet (flera dedikerade sidor ger fler SEO/AEO-ingångar), det breda budskapet (landa tydligare i vad köparen får och varför AI Partner).

---

## 4. Röst & tonalitet (voice spec)

> AI Partner ärver SEOS röst-DNA. Det här är referensen all copy granskas mot. Bör bli en egen `voice.md` i nya repot.

### Vår röst
- **Svenska. Professionell men tillgänglig** – skriv som en kunnig kollega, inte en broschyr.
- **Tekniskt precis och ärlig.** Förväntansstyr hellre än överlovar.
- **Koncis.** Inga utfyllnadsord, inga onödiga brasklappar.
- **Konkret före abstrakt.** Exempel, siffror och resultat (med källa) slår adjektiv.
- **Rekommendation, inte självhävdelse.** "Vi rekommenderar X" snarare än "vi gör X". Hedga ärligt där det är sant.
- **Korta meningar.** Dela långa meningar i två.

### Undvik (Douglas tar konsekvent bort det här)
- **Säljigt/reklamigt språk och tomma superlativ** – "marknadsledande", "vi är bäst", "revolutionerande".
- **Hype och floskler.** Skriv vad något faktiskt gör. (Extra viktigt för ett AI-bolag: den som säljer AI utan att hypa AI är mer trovärdig.)
- **Överdrivna garantier.**
- **Anglicismer/jargong → enkel svenska:** "leverabel" → "leverans" · "scanningsbar" → "lättläslig" · "omdesign" → "justering av designen" · "laddtid" → "tid att ladda".
- **Överanvänt "sajt".** Föredra "hemsida"; "webbplats" får varieras in.
- **Idiom/talspråk:** "hoppa av" → "lämna sidan".
- **Forcerad självpromo.** Lägg vinklar (systerbolaget SEOS, plattformsval) bara där de tillför läsaren värde.
- **Emoji och utropstecken** (utropstecken högst sparsamt).

### AI Partners egen ton
Ärver SEOS DNA men får vara en aning mer rättfram och energisk (jfr "Hate it? Automate it!"). Men **aldrig AI-hype.** Sälj resultatet av automationen – tid sparad, process borta, kostnad in – inte "kraften i AI". Visa, berätta inte.

### Bärande argument (sälj-/tjänstenära text)
> Om någon frågar en AI om ert företag kan lösa X och informationen saknas, svarar AI:n hellre "nej" än "vet inte" – och ni tappar affären. Synlighet i AI-svar handlar inte bara om trafik, utan om att AI beskriver er korrekt.

### Budskapsram (skärps med Douglas)
- **Vem vi pratar med:** företag som vill automatisera ineffektiva processer eller bygga AI-lösningar (agenter, RAG, automationer) – både de som vet vad de vill och de som inte vet var de ska börja.
- **Kärnpositionering:** AI Partner bygger AI som *gör jobbet* – inte slide-decks. Ansvar från strategi till driftsatt lösning.
- **Bevis slår löften:** prioritera riktiga case med mätbart resultat och ett tydligt "så jobbar vi"-flöde.

---

## 5. Designspråk & inspiration

**Ledord: modernt, avskalat, förtroendeingivande.** En snabb, lugn sida med tydlig hierarki slår en plottrig "snygg" sida.

**Inspiration (prioritetsordning):**
1. **Nuvarande aipartner.se** – bra grundinspo för struktur och känsla. Utgå härifrån, höj nivån.
2. **Anduril.com** – referens för uttryck och framför allt *animation*. Ta fasta på: mörkt, tekniskt high-tech-uttryck, avskalad palett med sparsam accent, tekniska/mono-typografiska inslag och stramt rutnät. Sidan [anduril.com/lattice/command-and-control](https://www.anduril.com/lattice/command-and-control) har scroll- och datadrivna animationer (HUD-/visualiseringskänsla) som vi enkelt kan AI-utveckla – **den typen av rörelse är inspon.** Det här får ge AI Partner en egen, mer teknisk identitet inom samma familj som SEOS.
   - **OBS – inte bildtungt.** Andurils startsida lutar hårt på stora bilder/foto. Det är **inte** vår väg – AI Partner ska ha lite bilder. Ta designspråket och animationerna, inte den bildtunga layouten.
   - **Animation med måtta och prestanda:** bygg rörelsen performant (CSS/GPU, ladda tungt först när det behövs, respektera `prefers-reduced-motion`). Snygg animation får aldrig döda laddtiden.
3. **SEOS eget designspråk** (studera tjänstesidorna på seosdesign.se) – så här kör vi modern återhållsamhet: versala, flerradiga display-rubriker · små numrerade "eyebrow"-etiketter i mono-känsla (`(02) — SEO`) · em-tankstreck (—) som avdelare · avskalad palett · B&W/desaturerat abstrakt bildspråk · **inga gradienter, ingen emoji, sparsamt med accentfärg.** AI Partner får dela detta DNA med egen identitet.

**Igenkänning, inte kopia.** Det ska finnas en familjekänsla mellan seosdesign.se och aipartner.se – gärna delat design-DNA (därför är SEOS designspråk en referens ovan). Men det är **två separata varumärken**: AI Partner ska kännas besläktat, inte identiskt, och behålla en egen identitet (egen färg, ton och uttryck). Sikta på "uppenbart samma familj" snarare än "samma mall".

**Principer (gäller oavsett uttryck):**
- **Mobil först.** Bygg och testa mobilvyn före desktop.
- **Komponentdrivet.** Allt återkommande (hero, tjänstekort, CTA, FAQ, footer) byggs som återanvändbara komponenter.
- **Hierarki & whitespace** före utsmyckning.
- **Prestanda är design.** En snabb sida känns mer proffsig.
- **Tillgänglighet är inte valfritt.** WCAG 2.1 AA som miniminivå (kontrast, fokus, alt-texter, tangentbord), jfr tillgänglighetsdirektivet/EAA.

**Designbeslut Douglas spikar:** behålla eller uppdatera AI Partners färg/logo · typografi · bildstil · animationsnivå.

---

## 6. Teknisk kontext

**Stack:** **Astro** (beslutat 2026-05-25) + **Sanity** som CMS (MCP uppkopplad, samma agentiska innehållsflöde som SEOS kör mot Webflow). Astros islands-arkitektur ger snabba laddtider och starka Core Web Vitals och passar en innehållssajt; React-/Svelte-/Vue-"öar" plockas in bara där interaktivitet eller animation kräver det (jfr Anduril-animationerna i avsnitt 5). **Deploy:** Netlify eller Vercel (båda stödjer Astro väl). Bakgrund till valet: `AI-Partner-stackval-PM.md`.

**Innehållsmodellering (Sanity).** Tänk i innehållstyper, inte sidor. Förslag:
- `page` (flexibel sida med sektioner)
- `service` (de fyra tjänsteområdena – en post var)
- `caseStudy` (kundcase med resultat/siffror)
- `faqItem` (fråga/svar)
- `testimonial` (kundcitat)
- `siteSettings` (logga, nav, footer, kontaktuppgifter – singleton)

Princip: **ingen brödtext hårdkodas i komponenter.** Allt redaktionellt ska gå att ändra i CMS:et utan deploy – det är hela poängen med headless.

**Repo-princip:** eget repo, `main` = det som är live. Inga hemligheter (API-nycklar, Sanity-token) i repot – `.env`.
