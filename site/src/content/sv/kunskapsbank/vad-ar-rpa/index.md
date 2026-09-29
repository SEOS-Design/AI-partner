---
title: "Vad är RPA? Guide till robotstyrd processautomation 2026"
description: "RPA automatiserar regelbaserade processer – men 2026 är det inte enda vägen. Ärlig guide: exempel, kostnad, RPA vs AI-agenter och när det är fel verktyg."
h1: "Vad är RPA? Guide för företag som vill automatisera processer"
category: automation
publishedAt: 2026-08-04
---

RPA (Robotic Process Automation, på svenska robotstyrd processautomation) är mjukvarurobotar som utför regelbaserade, repetitiva arbetsuppgifter i era befintliga system – de klickar, kopierar och registrerar på samma sätt som en människa, men utan pauser och utan slarvfel. RPA passar processer som följer exakt samma regler varje gång, till exempel fakturaregistrering eller dataflytt mellan system.

Frågan är mer aktuell än på länge, men av ett annat skäl än när RPA var som hetast. 2026 är RPA inte längre den enda vägen till automatisering – AI-agenter tar över uppgifter som kräver bedömning, och de stora RPA-leverantörerna bygger själva om sina plattformar runt dem. Det gör valet svårare, inte enklare. Den här guiden går igenom vad RPA faktiskt är, vad det klarar, vad det inte klarar, och hur ni avgör om det är rätt verktyg för just era processer.

## Vad är RPA?

RPA är programvara som imiterar hur en människa arbetar i ett gränssnitt. En RPA-bot loggar in i ett system, öppnar rätt vy, läser av fält, kopierar värden, klistrar in dem någon annanstans, klickar på knappar och sparar. Den arbetar alltså *ovanpå* era befintliga system – den kräver ingen ombyggnad av affärssystemet och inget API.

Det är samtidigt RPA:s definierande begränsning: boten följer ett manus. Varje steg är fördefinierat. Möter den något som inte står i manuset – ett fält som flyttats, ett fakturaformat den inte sett, en oväntad dialogruta – stannar den eller gör fel. RPA är deterministiskt: samma indata ger alltid samma utfall. Det är en styrka i processer där ni vill ha exakt förutsägbarhet, och en svaghet i processer med många undantag.

På svenska används robotstyrd processautomation eller processrobotar, men i praktiken säger de flesta i branschen RPA.

## Vilka processer kan automatiseras med RPA?

RPA lämpar sig för uppgifter som är regelbaserade, repetitiva och volymtunga – där en människa i dag gör samma sak i samma system, dag efter dag. Några konkreta exempel per funktion:

**Ekonomi**
- Fakturaregistrering: läsa av leverantörsfakturor och registrera dem i ekonomisystemet.
- Avstämningar: jämföra poster mellan bankfil och bokföring och flagga avvikelser.
- Påminnelsehantering: identifiera förfallna fakturor och skapa påminnelser enligt fasta regler.

**Administration och registervård**
- Uppdatera kund- eller leverantörsuppgifter i flera system samtidigt.
- Onboarding-administration: skapa konton och behörigheter enligt en checklista när någon anställs.
- Rensa och kvalitetssäkra register mot en definierad regeluppsättning.

**Rapportering**
- Hämta siffror ur flera system, sammanställa i en mall och distribuera enligt schema.
- Fylla i återkommande myndighets- eller koncernrapporter där formatet är fast.

**Dataflytt mellan system**
- Föra över ordrar från e-handel till affärssystem när ingen färdig integration finns.
- Synkronisera data mellan äldre system som saknar API:er.

Mönstret i alla exempel: reglerna går att skriva ned fullständigt. Kan ni beskriva processen som ett flödesschema utan rutan "här gör Anna en bedömning", är den en RPA-kandidat. Finns den rutan behöver ni något annat – vilket leder till nästa fråga.

## RPA vs AI-agenter – vad är skillnaden?

Kort: RPA följer regler, en AI-agent arbetar mot ett mål.

En RPA-bot exekverar ett fördefinierat flöde, steg för steg. Den är snabb, billig i drift och helt förutsägbar – men den går sönder när verkligheten avviker från manuset. Ändras ett gränssnitt, ett filformat eller en fältplacering måste boten byggas om. Det är den klassiska förvaltningskostnaden i RPA-projekt, och den underskattas ofta.

En [AI-agent](/kunskapsbank/vad-ar-en-ai-agent) får i stället ett mål och tillgång till verktyg, och avgör själv hur den tar sig dit. Den kan tolka en faktura den aldrig sett, hantera ett undantag utan att stanna, och ställa en fråga till en människa när den är osäker. Priset för flexibiliteten är att utfallet inte är deterministiskt – agenten behöver ramar, kontroller och mänsklig granskning på rätt ställen.

I praktiken konvergerar branschen mot att de är komplement, inte konkurrenter. En vanlig arkitektur 2026: agenten tar emot, tolkar och beslutar – RPA-botar och integrationer utför de exakta, repetitiva stegen i de system som saknar API:er. RPA blir händerna, agenten blir omdömet. Att ställa dem mot varandra som antingen/eller är oftast fel fråga.

## Är RPA på väg ut?

Nej – men dess roll förändras, och det är värt att vara ärlig om åt båda hållen.

Å ena sidan fortsätter marknaden att växa. Enligt en UiPath-rapport som hänvisar till IDC:s prognoser väntas de globala utgifterna för RPA mer än fördubblas mellan 2024 och 2028, till 8,2 miljarder dollar ([CIO.com](https://www.cio.com/article/4001371/the-future-of-rpa-ties-to-ai-agents.html)). Regelbaserade processer försvinner inte, och för dem är RPA fortfarande det mest beprövade verktyget.

Å andra sidan pekar allt på att RPA blir ett lager under AI-agenterna snarare än en egen strategi. [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) räknar med att 33 % av enterprise-mjukvara innehåller agentic AI 2028, upp från under 1 % 2024. Och tydligast syns skiftet hos RPA-marknadens största bolag: UiPath-grundaren Daniel Dines [återinsattes som VD 2024](https://ir.uipath.com/news/detail/342/uipath-to-re-appoint-daniel-dines-as-chief-executive-officer-rob-enslin-steps-down-as-ceo-and-board-member) och driver sedan dess en uttalad pivot mot "agentic automation", med Agent Builder lanserat 2025 och ett OpenAI-samarbete i september 2025. När den ledande RPA-leverantören bygger om sig runt agenter är det inte en dödförklaring av RPA – det är en signal om var tekniken hör hemma i stacken.

Slutsatsen för er som beställare: köp inte "RPA är dött"-retoriken, men lås er inte heller vid RPA som synonym för automatisering. Rätt fråga är inte vilken teknik som vinner, utan vilken process ni försöker lösa.

## När passar RPA – och när är det fel verktyg?

Innan ni beslutar om RPA, ställ fyra frågor om processen:

1. **Kan processen effektiviseras på annat sätt?** En del processer ska inte automatiseras – de ska tas bort eller göras om. Att sätta en robot på en dålig process ger en snabb dålig process.
2. **Kommer processen att ändras inom kort?** Byter ni affärssystem nästa år, eller görs flödet om? Varje ändring i gränssnitt eller format innebär ombyggnad av boten. RPA lönar sig bäst i stabila processer.
3. **Finns det ett API eller en färdig integration?** Kan systemen prata direkt med varandra är det nästan alltid en bättre lösning än en bot som härmar klick i ett gränssnitt – stabilare, snabbare, billigare i förvaltning. Ibland har ni inget automationsproblem – ni har ett integrationsproblem.
4. **Har ni kontroll över systemen?** Botar som arbetar i externa system ni inte styr över (leverantörsportaler, myndighetsgränssnitt) går sönder när motparten uppdaterar sitt gränssnitt, utan förvarning.

Blir svaren "nej, nej, nej, ja" – stabil, regelbaserad process utan API-alternativ, i system ni kontrollerar – är RPA sannolikt rätt. Innehåller processen bedömningar och undantag pekar det mot en AI-agent, eventuellt med RPA som utförande lager. Och finns ett API är det oftast dit ni ska. Hur vi resonerar kring valet i konkreta uppdrag beskriver vi på vår sida om [processautomation](/kontakt).

## Räcker inte n8n, Make eller Zapier?

Ofta – ja. För enkla flöden mellan moderna molntjänster är verktyg som n8n, Make och Zapier ett rimligt första steg: ett formulärsvar som ska in i CRM:et, ett mejl med bilaga som ska bli en rad i ett kalkylark, en order som ska trigga ett utskick. De är billiga, snabba att sätta upp och kräver ingen konsult. Har ni den typen av behov ska ni inte köpa ett RPA-projekt.

Gränsen går på tre ställen:

- **Äldre system utan API:er.** Verktygen bygger på färdiga kopplingar till molntjänster. Saknar systemet API finns inget att koppla mot – där behövs RPA, som arbetar i gränssnittet.
- **Flöden med bedömningar och undantag.** Ett Zapier-flöde är lika regelstyrt som en RPA-bot. Kräver processen tolkning eller beslut behövs en AI-agent, oavsett vilket verktyg som utför stegen.
- **När antalet flöden växer utan ägarskap.** Tjugo automationer som olika personer byggt vid olika tillfällen, utan dokumentation och utan någon som förvaltar dem, blir ett eget problem den dag något slutar fungera – eller den dag personen slutar.

Logiken är densamma som i resten av den här guiden: välj verktyg per process, inte tvärtom. n8n, Make och Zapier är rätt verktyg för vissa processer – inte en automationsstrategi.

## Vad kostar RPA?

Det ärliga svaret: det beror på processen – och därför publicerar vi ingen prislista. Fyra faktorer styr kostnaden mer än något annat:

- **Antal processer och deras komplexitet.** En bot som flyttar data mellan två system är en liten insats. Tio processer med flera system inblandade är ett projekt.
- **Systemens ålder och stabilitet.** Äldre system utan API:er kräver mer gränssnittsautomation, som är känsligare och dyrare att hålla vid liv.
- **Undantagsfrekvens.** En process där 99 % av ärendena följer regeln är billig att automatisera. En där var femte kräver särskild hantering blir dyr – eller fel verktyg helt.
- **Förvaltning.** Botar kräver övervakning och underhåll när system uppdateras. Den löpande kostnaden underskattas oftare än den initiala.

Vår modell är att offerera mot problemet, inte mot en nivåtabell. Kartläggningen visar vad som faktiskt går att spara – först då går det att säga vad automationen får kosta för att räkna hem sig.

## Hur kommer man igång?

Börja inte med tekniken. Börja med att kartlägga var tiden faktiskt blöder ut – hur ni gör det steg för steg går vi igenom i vår guide om [processkartläggning](/kunskapsbank/processkartlaggning).

1. **Identifiera kandidaterna.** Fråga varje avdelning: vilka uppgifter gör vi manuellt varje vecka som följer samma mönster varje gång? Det är listan.
2. **Prioritera efter volym × regelbarhet.** Hög volym och strikt regelstyrning först – där är effekten störst och risken lägst. Uppgifter med många undantag hamnar längre ned, eller i agent-spåret.
3. **Välj verktyg per process, inte tvärtom.** API-integration där det går, RPA där det inte går, AI-agent där det krävs bedömning. Ofta blir svaret en kombination.
4. **Börja smalt och mät.** En process i drift som bevisligen sparar tid slår tio i planeringsstadiet.

Vill ni ha hjälp med första steget gör vi en kostnadsfri AI-kartläggning: vi går igenom era processer och pekar ut vilka av dem det lönar sig att automatisera – och med vilket verktyg. [Boka en AI-kartläggning](/kontakt).

## Vanliga frågor om RPA

**Vad betyder RPA?**
RPA står för Robotic Process Automation, på svenska robotstyrd processautomation. Det är mjukvarurobotar som utför regelbaserade arbetsuppgifter i befintliga system genom att imitera hur en människa arbetar i gränssnittet.

**Hur lång tid tar det att införa RPA?**
En enskild, väldefinierad process kan ofta automatiseras på några veckor. Det som avgör tidsåtgången är sällan tekniken utan kartläggningen: att dokumentera processens alla regler och undantag innan boten byggs.

**Behöver vi RPA eller räcker en integration?**
Finns ett API eller en färdig integration mellan systemen är det nästan alltid det bättre valet – stabilare och billigare i längden. RPA är rätt när system saknar API:er eller när integration inte är praktiskt möjlig.

**Vad är skillnaden mellan RPA och AI?**
RPA följer fördefinierade regler och ger alltid samma utfall av samma indata. AI – i det här sammanhanget AI-agenter – arbetar mot mål, tolkar innehåll och hanterar undantag, men kräver ramar och mänsklig kontroll. I moderna lösningar kombineras de ofta: agenten bedömer, RPA utför.
