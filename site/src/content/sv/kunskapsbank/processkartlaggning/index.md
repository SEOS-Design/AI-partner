---
title: "Processkartläggning inför AI – kartan är inte målet"
description: "Processkartläggning inför AI och automatisering: så kartlägger ni hur arbetet faktiskt flödar – och prioriterar vad som automatiseras, med vilket verktyg."
h1: "Processkartläggning inför AI och automatisering – kartan är inte målet"
category: automation
publishedAt: 2026-08-04
---

Processkartläggning innebär att beskriva hur ett arbetsflöde faktiskt utförs – vem som gör vad, i vilka system, i vilken ordning och med vilka undantag. Det låter som dokumentation, och i många organisationer stannar det där: en snygg karta i en mapp ingen öppnar.

Inför AI och automatisering är det fel sätt att se på saken. Där är kartan inte målet – den är ett beslutsunderlag. En bra processkartläggning ska svara på tre frågor per process: är den värd att automatisera, med vilket verktyg, och i vilken ordning? Den prioriterade listan är resultatet. Kartan är bara vägen dit.

Den här guiden går igenom hur ni gör en kartläggning som leder till beslut – inte till ett diagram. Och varför den vanligaste fallgropen inte är fel notation, utan att kartan beskriver hur arbetet *borde* fungera i stället för hur det fungerar.

## Vad är processkartläggning?

Processkartläggning är att steg för steg beskriva hur ett arbete flödar genom organisationen: vilka moment som ingår, vem som utför dem, vilka system som används, var information hämtas och lämnas, och vad som händer när något avviker från det normala.

Det är mindre högtidligt än det låter. En användbar processkarta för en fakturaprocess kan vara tio rutor och några pilar: fakturan kommer in via mejl, någon läser av den, registrerar den i ekonomisystemet, matchar mot inköpsorder, skickar för attest, bokför. Plus – och det här är den viktiga delen – vad som händer när fakturan saknar ordernummer, kommer i fel format eller gäller något ingen känner igen.

I automationssammanhang har kartan ett enda syfte: att ge er tillräckligt underlag för att avgöra vad som ska automatiseras, hur och i vilken ordning. Allt som inte bidrar till det beslutet är utsmyckning.

## Behöver ni BPMN och simbanor?

För de flesta små och medelstora företag: nej.

BPMN (Business Process Model and Notation) är en formell standard för att rita processer – med exakta symboler för händelser, beslut, gateways och så kallade simbanor som visar vem som gör vad. Den fyller en funktion i stora organisationer med revisionskrav, certifieringar eller hundratals processer som ska förvaltas över tid.

Men ska ni kartlägga fem processer inför ett automationsbeslut räcker en whiteboard eller en enkel Miro-tavla. Rutor, pilar och ärliga anteckningar om undantag slår korrekt notation varje gång. Inget automationsprojekt misslyckas för att kartan ritades med fel symboler. Däremot misslyckas de när kartan svarar på fel frågor.

Verktyget spelar alltså mindre roll än frågorna ni ställer under kartläggningen. Lägg tiden på att förstå processen, inte på att lära er en notation.

## Varför ljuger processkartan?

Därför att den oftast ritas efter hur processen *borde* fungera – inte hur den fungerar.

Skillnaden brukar beskrivas som as-is mot to-be: nuläget mot börläget. Problemet är att många nulägeskartor i själva verket är förklädda börlägeskartor. Chefen som ritar kartan beskriver processen som den designades. Personen som utför arbetet varje dag vet hur den faktiskt ser ut: att var femte faktura saknar referens och kräver mejlande, att systemet inte klarar vissa tecken så vissa poster registreras för hand, att "det där fixar Anna manuellt" är ett fullvärdigt processteg som inte står i någon rutin.

Det informella arbetet – undantagen, specialfallen, de manuella krokvägarna – är exakt det som avgör om en automation lyckas. En bot eller ett flöde som byggs mot den formella processen fungerar utmärkt i demo och faller i drift, för verkligheten innehåller alla avvikelser kartan utelämnade.

Det här är inte en teoretisk risk. MIT NANDA:s rapport "The GenAI Divide: State of AI in Business 2025" – en genomgång av över 300 AI-initiativ – fann att 95 % av organisationers GenAI-piloter inte gav någon mätbar effekt på resultaträkningen, och att orsaken oftast inte var modellkvalitet utan bristande arbetsflödesintegration ([MIT NANDA](https://www.media.mit.edu/groups/nanda/overview/)). Tekniken fungerar. Det som brister är förståelsen för arbetsflödet den ska in i – alltså det en ärlig kartläggning ska fånga.

Slutsatsen: kartlägg med de som utför arbetet, inte bara de som leder det. Och fråga aktivt efter undantagen. "Hur ofta blir det inte så här?" är kartläggningens viktigaste fråga.

## Hur gör man en processkartläggning – i praktiken?

En lättviktsmetod i fem steg, anpassad för företag som kartlägger inför automatisering:

1. **Välj ett avgränsat område.** En avdelning eller ett flöde – inte hela företaget. Leverantörsfakturor, inte "ekonomi". Ett avgränsat område ger en karta som går att agera på inom veckor.
2. **Håll en workshop med de som utför arbetet.** Inte i stället för chefen, men aldrig utan utförarna. Det är de som känner till undantagen.
3. **Dokumentera det verkliga flödet.** Steg för steg, inklusive undantagen och de manuella krokvägarna. Fråga efter volymer: hur många ärenden per vecka, hur stor andel avviker.
4. **Markera tid och frekvens per steg.** Grova uppskattningar räcker – ni ska prioritera, inte bokföra. Var försvinner mest tid? Vilka steg görs oftast?
5. **Notera system och datakällor.** Vilka system rör processen, var uppstår informationen, och finns det API:er eller sker allt via gränssnitt och mejl? Det här underlaget avgör verktygsvalet senare.

Efter de fem stegen har ni det som faktiskt behövs: en ärlig bild av flödet, en känsla för var tiden går, och tillräcklig teknisk kontext för att välja verktyg. Ingen notation krävdes.

## Hur prioriterar man vad som ska automatiseras?

Det här är kartläggningens egentliga leverans – och sektionen de flesta guider hoppar över.

Vår modell väger fyra faktorer per process:

- **Volym.** Hur ofta utförs processen? Något som görs hundra gånger i veckan slår något som görs en gång i månaden, nästan oavsett hur irriterande det senare är.
- **Regelbarhet.** Går processens regler att skriva ned fullständigt? Ju mer regelstyrd, desto enklare och billigare att automatisera.
- **Undantagsfrekvens.** Hur stor andel av ärendena avviker från huvudflödet? Många undantag gör automationen dyrare – eller kräver ett annat verktyg.
- **Affärspåverkan.** Vad kostar processen i dag, i tid eller i fel? En process som blockerar fakturering eller skapar kundirritation väger tyngre än en som bara är tråkig.

Tumregeln: hög volym, strikt regelstyrd, få undantag – automatisera först. Där är effekten störst och risken lägst. Processer med många bedömningar och undantag hamnar längre ned på listan, inte för att de är oviktiga utan för att de kräver mer av både verktyg och kontroller.

Sedan verktygsvalet – per process, inte för hela företaget på en gång:

- **Finns ett API eller en färdig integration?** Då är en integration nästan alltid rätt: stabilast, billigast i förvaltning.
- **Regelstyrd process i system utan API?** Då är [RPA](/kunskapsbank/vad-ar-rpa) rätt verktyg – mjukvarurobotar som arbetar i gränssnittet som en människa.
- **Kräver processen tolkning eller bedömning?** Då behövs en [AI-agent](/kunskapsbank/vad-ar-en-ai-agent), med ramar och mänsklig kontroll på rätt ställen.

Hur RPA och AI-agenter skiljer sig åt – och varför de oftast är komplement snarare än konkurrenter – går vi igenom i vår guide om RPA. Poängen här är ordningen: först kartan, sedan prioriteringen, sist verktyget. Företag som börjar i andra änden köper en plattform och letar sedan efter problem den kan lösa.

Resultatet av en bra kartläggning är alltså inte ett diagram. Det är en prioriterad lista: process, förväntad effekt, rekommenderat verktyg, ordningsföljd.

## Vilka processer ska ni kartlägga först?

Börja där tiden försvinner. I de flesta små och medelstora företag återkommer samma kandidater:

- **Ekonomi och fakturahantering.** Fakturaregistrering, avstämningar, påminnelser – hög volym, tydliga regler, ofta manuellt trots att det inte behöver vara det.
- **Ärendehantering.** Inkommande mejl och förfrågningar som ska sorteras, besvaras eller vidarebefordras enligt mönster som upprepar sig.
- **Offert- och orderflöden.** Underlag som hämtas ur flera system, sammanställs för hand och skickas – varje gång på nästan samma sätt.
- **Rapportering.** Siffror som varje vecka eller månad plockas ur system, klistras in i mallar och distribueras.
- **Onboarding.** Konton, behörigheter och utskick som skapas enligt checklista varje gång någon anställs eller en kund tillkommer.

Ni behöver inte kartlägga allt. Välj det område där ni redan misstänker att mest tid försvinner – kartläggningen bekräftar eller korrigerar magkänslan, och ger er en första lista att agera på.

## Kan någon göra kartläggningen åt er?

Ja – och det är ofta ett snabbare sätt att komma till beslut, eftersom en utomstående ställer frågorna internt folk slutat ställa.

Vår kostnadsfria AI-kartläggning är exakt det den här guiden beskriver: vi kartlägger era processer tillsammans med de som utför arbetet, och ni får en prioriterad lista med rekommenderat verktyg per process – integration, RPA eller AI-agent. Listan är er, oavsett om ni sedan bygger med oss eller på egen hand.

## Vanliga frågor om processkartläggning

**Hur lång tid tar en processkartläggning?**
En avgränsad process kartläggs normalt i en workshop. Flera processer inom ett område handlar om dagar, inte månader. Tar kartläggningen månader har den fått fel omfattning – avgränsa hårdare.

**Vem ska vara med i kartläggningen?**
Framför allt de som utför arbetet i vardagen – de vet var undantagen och de manuella krokvägarna finns. Chefer bidrar med prioriteringar och affärskontext, men en kartläggning med enbart chefer beskriver processen som den borde fungera, inte som den gör.

**Vilka verktyg behövs för processkartläggning?**
En whiteboard eller en enkel digital tavla som Miro räcker för de flesta. Frågorna avgör kvaliteten, inte verktyget: vad görs, av vem, i vilka system, hur ofta – och hur ofta blir det inte så?

**Vad är skillnaden mellan processkartläggning och process mining?**
Processkartläggning bygger på intervjuer och workshops – människor beskriver flödet. Process mining läser i stället ut det verkliga flödet ur systemens loggdata. Mining kräver system som loggar tillräckligt och passar större organisationer; för små och medelstora företag är kartläggning nästan alltid rätt startpunkt.

## Kartan är klar – vad händer sen?

En processkartläggning är lyckad när den leder till ett beslut: de här processerna automatiserar vi, med de här verktygen, i den här ordningen. Allt annat är dokumentation.

Vill ni ha listan utan att hålla i workshopen själva gör vi det tillsammans. [Boka en kostnadsfri AI-kartläggning](/kontakt) – ni får en prioriterad lista med verktygsrekommendation per process, och äger den oavsett vad ni gör med den.
