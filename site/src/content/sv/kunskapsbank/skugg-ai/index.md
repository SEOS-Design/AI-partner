---
title: "Skugg-AI: när anställda använder AI utan att någon vet"
description: "Skugg-AI är AI-användning utan företagets vetskap. Så vanligt är shadow AI, vad GDPR kräver – och fem steg som ger kontroll utan förbud."
h1: "Skugg-AI: när anställda använder AI utan att någon vet om det"
category: regelverk-sakerhet
publishedAt: 2026-08-04
---

Skugg-AI (engelska: shadow AI) är när anställda använder AI-verktyg i jobbet utan företagets vetskap, godkännande eller riktlinjer. Det låter som ett disciplinproblem. Det är det inte. Skugg-AI är ett styrningsgap: medarbetare löser ett verkligt problem – tidsbrist – med de verktyg som faktiskt finns tillgängliga, eftersom företaget inte har gett dem något godkänt alternativ.

Den här guiden går igenom hur vanligt fenomenet är i Sverige och internationellt, vilka risker det innebär för AI-säkerheten i ett mindre företag, vad GDPR kräver – och en åtgärdstrappa i fem steg som ger kontroll utan att ni behöver agera poliser.

## Vad är skugg-AI?

Skugg-AI är all användning av AI-verktyg i arbetet som sker utanför företagets kontroll – privata ChatGPT-konton, gratisverktyg för översättning eller bildgenerering, AI-tillägg i webbläsaren som ingen på företaget har granskat eller godkänt.

Begreppet är ett syskon till "skugg-IT", som beskrev samma mönster med molntjänster för tio år sedan. Skillnaden är tempot. AI-verktygen är gratis, kräver ingen installation och ger nytta första minuten. En säljare klistrar in mötesanteckningar och får ett utkast till uppföljningsmejl. En ekonom sammanfattar ett avtal. En marknadsförare skriver om en text. Var och en av dem sparar en halvtimme – och ingen av dem uppfattar det som ett säkerhetsbeslut.

Det är därför skugg-AI uppstår. Inte för att anställda struntar i reglerna, utan för att verktygen löser en verklig tidsbrist och företagets processer inte hänger med. När det inte finns någon godkänd väg tar folk den väg som finns.

## Hur vanligt är skugg-AI?

Skugg-AI är inte ett undantag – det är normalläget, både internationellt och i Sverige.

Internationellt: enligt [Microsofts Work Trend Index 2024](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part) tar 78 % av de som använder AI på jobbet med sig egna AI-verktyg – Microsoft kallar det "BYOAI", bring your own AI. På små och medelstora företag är siffran 80 %. Samma undersökning visar något mer besvärande: 52 % är obekväma med att berätta för chefen att de använder AI för sina viktigaste uppgifter.

Sverige: en HP-undersökning återgiven av [Techtidningen](https://techtidningen.se/rapport-sa-manga-saknar-utbildning-i-ai-anvandning-pa-jobbet-i-sverige/) visar att 59 % av svenska kontorsanställda använder AI på jobbet – och att 77 % uppger att de inte fått någon utbildning eller riktlinjer. Bland akademiker och tjänstemän ser det likadant ut: enligt [Akavias medlemsundersökning](https://www.akavia.se/redaktionellt/framtid-arbetsliv-i-forandring/varannan-anvander-privat-ai-verktyg-i-jobbet/) uppger varannan medlem att de använder privata AI-verktyg i jobbet via personliga e-postkonton.

Slutsatsen för svenska små och medelstora företag är enkel: frågan är inte om AI används i er organisation utan riktlinjer. Frågan är hur mycket, av vem och med vilken data. Sannolikt pågår det redan hos er.

## Vilka risker innebär skugg-AI för ett mindre företag?

Den största risken med skugg-AI är att känslig information hamnar i verktyg med okända villkor – utan att någon i företaget vet om att det skett. Rangordnat efter hur ofta det faktiskt händer:

1. **Känslig data i gratisverktyg.** Gratisversioner av AI-tjänster har konsumentvillkor, inte företagsavtal. Beroende på tjänst och inställningar kan det ni matar in komma att användas för att träna modellerna. Det företaget aldrig skulle mejla till en okänd tredje part klistras in i en chattruta utan att någon reflekterar.
2. **Personuppgifter i promptar.** Kundnamn, personnummer, ärendehistorik, HR-underlag. Så fort personuppgifter matas in i ett AI-verktyg är det personuppgiftsbehandling – och sker det i ett privat konto sker den behandlingen helt utan företagets kontroll. Mer om vad [IMY](https://www.imy.se/verksamhet/dataskydd/innovationsportalen/vagledning-om-gdpr-och-ai/gdpr-och-ai/) säger om det i nästa avsnitt.
3. **Felaktig output som når kund utan granskning.** AI-genererade texter, kalkyler och sammanfattningar innehåller ibland fel. I en styrd process finns granskning. I skuggan går utkastet direkt till kund – med företagets namn som avsändare.
4. **Konton och integrationer ingen avslutar.** När en medarbetare slutar avslutas företagets konton. De privata AI-kontona – med företagsdata i historiken – följer med personen ut genom dörren.

Kostnaden är mätbar. Enligt [IBM:s Cost of a Data Breach Report 2025](https://www.ibm.com/reports/data-breach) kostade dataintrång som involverade skugg-AI i snitt cirka 670 000 USD mer än genomsnittet. 20 % av drabbade organisationer hade intrång kopplade till skugg-AI – och i de fallen involverade 65 % av intrången kunders personuppgifter, mot 53 % i snitt. Skugg-AI-incidenter träffar alltså oftare just den data som skadar kundrelationen mest.

För den som bygger [AI-agenter](/kunskapsbank/vad-ar-en-ai-agent) med åtkomst till interna system tillkommer prompt injection – manipulerade instruktioner i innehåll agenten läser – som en egen riskklass att hantera vid bygget.

Diggs [riktlinjer om informationssäkerhetsrisker vid generativ AI](https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai/identifiera-risker-for-informationssakerhet-vid-anvandningen-av-generativ-ai) är skrivna för offentlig förvaltning, men principerna – identifiera informationstyper, bedöm risk per användningsfall, styr därefter – är användbara även för privata företag.

## Är AI-chattar personuppgiftsbehandling enligt GDPR?

Ja – så fort personuppgifter matas in i ett AI-verktyg är det personuppgiftsbehandling, och ansvaret ligger hos företaget, inte hos den anställda.

Det spelar ingen roll att verktyget var gratis, att kontot var privat eller att ingen chef visste om det. Företaget är personuppgiftsansvarigt för behandling som sker i arbetet. Sker den i ett konsumentkonto saknas det som GDPR kräver: laglig grund, biträdesavtal med leverantören och kontroll över var uppgifterna lagras och hur de används.

[IMY:s vägledning om GDPR och AI](https://www.imy.se/verksamhet/dataskydd/innovationsportalen/vagledning-om-gdpr-och-ai/gdpr-och-ai/) är en bra utgångspunkt för den som vill förstå kraven. Kortversionen: ni behöver veta vilka AI-verktyg som används, vilken data som matas in och på vilken avtalsgrund. Det är exakt det skugg-AI omöjliggör – och därför är styrningen en GDPR-fråga, inte bara en IT-fråga.

## Ska ni förbjuda ChatGPT?

Nej. Ett förbud utan alternativ löser inte problemet – det flyttar användningen till privata konton och mobiltelefoner, där ni har ännu mindre insyn.

Tidsbristen som drev medarbetaren till verktyget försvinner inte för att verktyget förbjuds. Det enda som förändras är att användningen döljs bättre. Och tystnadskulturen finns redan: 52 % är enligt [Microsoft](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part) obekväma med att berätta för chefen att de använder AI för sina viktigaste uppgifter. Ett förbud förstärker den tystnaden – och tystnad är det sämsta tänkbara utgångsläget för AI-säkerhet, eftersom ni då varken kan utbilda, styra eller upptäcka problem i tid.

Det som fungerar är det omvända: gör det godkända alternativet enklare och bättre än skuggvägen. Ett företagskonto med rätt avtal, som är snabbare att nå än det privata kontot, vinner utan tvång.

## Så får ni kontroll utan att bli poliser – fem steg

Målet är inte noll AI-användning. Målet är att användningen sker i verktyg ni valt, med data ni godkänt, av medarbetare som vet var gränserna går. Så här rekommenderar vi att ett mindre företag går tillväga:

1. **Kartlägg – utan skuld.** Fråga medarbetarna vilka AI-verktyg de använder och till vad. En anonym enkät fungerar bättre än loggjakt: ni vill ha sanningen, inte syndabockar. Gör det tydligt att svaren inte får konsekvenser för individen. Kartläggningen visar var behoven finns – och det är behoven ni ska bygga styrningen kring.
2. **Skriv en AI-policy i klarspråk – på en sida.** Det viktigaste är inte ett långt dokument utan en lista alla förstår: vad som aldrig får matas in i ett AI-verktyg, vilka verktyg som är godkända och vem man frågar när man är osäker. En policy ingen läser styr ingenting.
3. **Ge godkända verktyg med rätt avtal.** Teamlicenser där leverantören avtalar bort träning på er data och där biträdesavtal finns på plats. Det är skillnaden mellan konsumentversionen och företagsversionen av samma verktyg – och ofta det enskilt viktigaste steget, eftersom det gör rätt väg lika enkel som skuggvägen.
4. **Utbilda.** Kort, konkret och återkommande – vad verktygen är bra på, var de brister och varför datareglerna finns. [AI-utbildning för företag](/kunskapsbank/ai-utbildning-foretag) är dessutom inte längre frivillig: artikel 4 i [AI-förordningen](/kunskapsbank/ai-forordningen) ställer krav på AI-kunskap hos personal som använder AI-system i verksamheten.
5. **Teknisk kontroll – bara där det motiveras.** Blockering, DLP-verktyg och nätverksfilter har sin plats i verksamheter med särskilt känslig data. För de flesta små och medelstora företag räcker steg 1–4. Börja inte i tekniken – börja i behovet, policyn och verktygen.

## Vad får inte matas in i ett AI-verktyg?

I ett verktyg utan företagsavtal bör följande aldrig matas in:

- **Personuppgifter** – namn, personnummer, kontaktuppgifter, HR-ärenden, allt som kan knytas till en person
- **Kunddata som omfattas av sekretess** – avtal, ärenden, uppgifter ni fått under NDA
- **Ej offentliggjord ekonomisk information** – resultat, prognoser, förvärvsplaner, prissättning
- **Källkod och affärshemligheter** – egen kod, metoder, recept, teknisk dokumentation
- **Inloggningsuppgifter** – lösenord, API-nycklar, åtkomsttokens, i någon form

Notera att listan gäller ogodkända verktyg. I ett godkänt verktyg med rätt avtal – där er data inte används för träning och behandlingen är avtalad – ändras kalkylen, och AI kan arbeta även med interna underlag. Det är hela poängen med att bygga [AI på egen data](/kunskapsbank/ai-pa-egen-data) i stället för att förbjuda.

## Vanliga frågor om skugg-AI

### Vad betyder shadow AI?

Shadow AI är den engelska termen för skugg-AI: anställdas användning av AI-verktyg i arbetet utan att företaget känner till, har godkänt eller styr användningen. Begreppet bygger vidare på "shadow IT", som beskrev samma mönster med ogodkända molntjänster och appar.

### Hur vet jag om mina anställda använder AI i smyg?

Fråga dem – utan konsekvenser. En anonym enkät om vilka verktyg som används och till vilka uppgifter ger en ärligare bild än logganalys, och signalerar att målet är att hjälpa, inte att straffa. Statistiskt är svaret nästan säkert ja: 59 % av svenska kontorsanställda använder AI på jobbet, de flesta utan riktlinjer.

### Vad ska en AI-policy innehålla?

En användbar AI-policy ryms på en sida: vilka verktyg som är godkända, vilken data som aldrig får matas in, krav på granskning av AI-genererat material innan det når kund, och vem medarbetare frågar vid osäkerhet. Vi har skrivit en egen genomgång i [AI-policy i företag – därför behöver ni en strategi för ansvarsfull AI](/kunskapsbank/ai-policy-i-foretag-darfor-behover-ni-en-strategi-for-ansvarsfull-ai).

### Vad kostar det att ta fram en AI-policy?

Det beror på verksamhetens storlek och hur känslig data ni hanterar – därför offererar vi mot behovet i stället för att sätta ett listpris. Kartläggningen som visar vad ni faktiskt behöver är kostnadsfri.

## Skaffa er en bild av läget först

Skugg-AI försvinner inte av att man tittar bort, och inte av förbud. Den försvinner när det godkända alternativet är bättre än skuggvägen – rätt verktyg, rätt avtal, en policy folk förstår och utbildning som gör gränserna självklara.

Första steget är att veta var ni står. Vi erbjuder en kostnadsfri AI-kartläggning: vi kartlägger hur AI redan används hos er, var riskerna sitter och vad som behöver styras upp – och ni får en konkret bild att fatta beslut på. [Boka en kartläggning här](/kontakt).
