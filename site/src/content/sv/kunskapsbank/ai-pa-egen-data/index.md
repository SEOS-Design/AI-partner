---
title: "AI på er egen data – så fungerar en intern AI-assistent"
description: "Kan AI svara utifrån era egna dokument utan att data läcker? Så fungerar en intern AI-assistent – och tre saker leverantörerna sällan berättar."
h1: "AI på er egen data – så fungerar en intern AI-assistent"
category: ai-pa-egen-data
publishedAt: 2026-08-03
---

Ja, det går att låta AI svara utifrån företagets egna dokument – med rätt arkitektur och rätt avtal. En intern AI-assistent svarar ur era avtal, manualer och ert intranät i stället för ur internet, med källhänvisning till dokumentet svaret kommer från. Och er data behöver aldrig bli träningsdata för någon modell – det är ett avtalsvillkor, inte ett löfte.

Men det finns tre saker leverantörerna sällan berättar: vem som faktiskt ser vad när dokumenten indexeras, att AI:n kan svara fel även ur ert eget material, och att ni i vissa lägen inte behöver en egen lösning alls. Den här guiden går igenom alla tre.

## Hur får man AI att svara på företagets egna dokument?

Principen är enklare än den låter. Ert innehåll – dokument, avtal, manualer, intranätssidor – indexeras i ett sökbart format. När någon ställer en fråga hämtar systemet de stycken som är mest relevanta för just den frågan och skickar dem till AI-modellen som underlag. Modellen formulerar sedan svaret utifrån det underlaget, med hänvisning till källdokumenten.

Det viktiga att förstå: modellen "kan" inte era dokument utantill. Den slår upp. Varje fråga får ett färskt underlag ur era källor, och svaret grundas i det som hämtades – inte i vad modellen råkar ha lärt sig från internet. Det är därför en intern assistent kan svara på frågor om ert senaste avtal eller er interna prislista, sådant ingen publik AI-tjänst vet något om.

Det är också därför källhänvisning är möjlig. Systemet vet exakt vilka stycken svaret byggdes på och kan visa dem. Den som får ett svar kan alltid kontrollera mot originalet.

## Vad är RAG – enkelt förklarat?

RAG står för retrieval-augmented generation och är teknikbegreppet för det som beskrivs ovan: hämta först, svara sedan. Retrieval betyder hämtning – systemet söker fram rätt underlag ur era dokument. Generation betyder att modellen formulerar ett svar utifrån det som hämtades.

Rent tekniskt delas dokumenten upp i mindre stycken som lagras i ett sökindex, ofta en så kallad vektordatabas. Poängen med den är att sökningen matchar betydelse, inte bara exakta ord – frågan "vad gäller vid uppsägning?" hittar rätt avsnitt även om avtalet skriver "avslut av anställning".

Mer teknik än så behöver ni inte kunna för att kravställa en lösning. RAG är inte en produkt utan en metod – kvaliteten avgörs av hur hämtningen, behörigheterna och kontrollpunkterna byggs. Det är dit vi ska nu.

## Läcker vår data om vi använder AI på egna dokument?

Kort svar: inte om avtalen och driftformen är rätt. "Er data stannar hos er" är inte teknisk magi – det är ett avtalsfaktum som ni ska kunna peka på i tre dokument.

**Träning.** Både [OpenAI](https://openai.com/enterprise-privacy/) (sedan mars 2023) och [Microsoft Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy) använder inte kunddata som skickas via API för att träna sina modeller, om ni inte aktivt väljer att tillåta det. Era dokument och frågor bakas alltså inte in i någon modell. Detta regleras i leverantörens Data Processing Agreement enligt GDPR artikel 28 – samma typ av personuppgiftsbiträdesavtal som ni redan har med er mejl- eller lönesystemsleverantör.

**Men två nyanser måste med i kravställningen:**

1. **"Ingen träning" är inte samma sak som "ingen lagring".** Azure OpenAI har till exempel ett 30-dagars fönster där frågor och svar kan sparas för missbruksövervakning. Det går att ansöka om undantag från, men det sker inte automatiskt – det är en punkt på er kravlista.
2. **EU-hosting är ett aktivt val, inte standard.** Azures driftform "Global" kan bearbeta data i valfri region i världen. Vill ni att bearbetningen sker inom EU krävs en regional driftform eller [Azures EU Data Zone](https://azure.microsoft.com/en-us/blog/enterprise-trust-in-azure-openai-service-strengthened-with-data-zones/). Skillnaden är en konfigurationsrad – men någon måste ställa kravet.

Så när en leverantör säger "er data är säker": be dem visa DPA:n, villkoret om att er data inte används för träning, och vilken driftform lösningen körs i. Kan de inte svara konkret på alla tre är det ett varningstecken.

## Vem ser vad? Behörigheter – problemet ingen pratar om

Här ligger den risk som säljmaterialen hoppar över. När dokument indexeras för AI-sökning följer dokumentens behörigheter inte automatiskt med. SharePoint vet att bara ekonomiavdelningen får öppna lönefilerna – men vektordatabasen som byggdes av samma filer vet det inte, om ingen byggt in det.

Det här är ingen teoretisk invändning. [OWASP listar "Vector and Embedding Weaknesses" (LLM08:2025)](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/) som en egen riskkategori i sin topp-10 för LLM-applikationer: bristande åtkomstkontroll på vektorlagret kan exponera innehåll för användare som aldrig borde ha sett det. Konkret: ekonomichefens löneunderlag ska inte kunna dyka upp som underlag i receptionens chattsvar – men det är exakt vad som händer om allt indexeras i en gemensam pott utan behörighetsfilter.

Lösningen har två delar:

- **Behörighetsfiltrering vid hämtning.** Varje indexerat stycke bär med sig information om vem som får se källdokumentet, och hämtningen filtrerar på den som frågar. Olika användare får olika underlag – och därmed olika svar.
- **Städade källbehörigheter.** Filtreringen är aldrig bättre än behörigheterna den speglar. Ligger känsliga dokument öppna för "alla på företaget" i källsystemet, hjälper inget filter i världen.

Det viktigaste att ta med sig: detta designas in från början. Behörighetsmodellen är en arkitekturfråga, inte något som läggs till i efterhand. Fråga varje leverantör hur deras lösning hanterar just detta – svaret säger mycket om hur genomtänkt bygget är.

## Kan AI:n hitta på fel svar ur våra egna dokument?

Ja. Det ärliga svaret är att en intern AI-assistent kraftigt minskar risken för påhittade svar jämfört med en fristående chattbot – men den eliminerar den inte, och den som påstår något annat säljer överlöften.

Två datapunkter som visar var ribban ligger:

- [Vectaras hallucinationsleaderboard](https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard), som mäter hur troget modeller sammanfattar dokument de fått, visar att de bästa snabba modellerna idag hallucinerar i låg ensiffrig procent – från 1,8 % upp mot 5 % i toppskiktet. Flera "tänkande" resonemangsmodeller ligger [över 10 % på samma uppgift](https://github.com/vectara/hallucination-leaderboard). Modellvalet spelar alltså roll, och nyast är inte automatiskt bäst för den här typen av uppgift.
- I verklig drift kan felfrekvensen vara betydligt högre. [Stanford RegLabs peer-granskade studie](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/) av kommersiella AI-verktyg för juridisk research ([Journal of Empirical Legal Studies, 2025](https://onlinelibrary.wiley.com/doi/full/10.1111/jels.12413)) uppmätte hallucinationsfrekvenser på 17–33 % – trots att verktygen byggde på just hämtning ur verifierade källor och marknadsfördes som grundade i dem.

Slutsatsen är inte att tekniken är oduglig. Slutsatsen är att skillnaden mellan 2 % och 30 % avgörs av hantverket runt modellen:

- **Bra källdata.** Motstridiga, inaktuella eller dubblerade dokument ger motstridiga svar. Städning av källmaterialet är ofta halva jobbet.
- **Källhänvisning i varje svar.** Ett svar utan källa går inte att kontrollera. Ett svar med källa tar sekunder att verifiera.
- **Utvärdering före lansering.** Assistenten testas mot en uppsättning verkliga frågor med kända rätta svar – innan den möter användare, inte efter.
- **Mänsklig kontrollpunkt för kritiska svar.** Svar som går externt eller ligger till grund för beslut granskas av en människa. AI:n ger tempo; människan äger kvaliteten.

## Räcker inte Microsoft 365 Copilot?

Ibland, ja. Ligger i princip allt ert material i Microsoft-miljön – SharePoint, Teams, Outlook – och behovet är brett internt sök och chatt, kan Copilot vara ett rimligt första steg. [Copilot arbetar mot Microsoft Graph](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/data-privacy-security) och respekterar era befintliga behörigheter: den som frågar kan bara få svar ur material den redan har rätt att se. Copilot skapar inga nya rättigheter.

Men notera Microsofts egen varning: Copilot synliggör den överdelning som redan finns. Gamla delningslänkar och siter som ligger öppna för hela organisationen blir plötsligt sökbara via chatt – [Microsoft rekommenderar själva att behörigheterna städas före utrullning](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/mitigate-oversharing-to-govern-microsoft-365-copilot-and-agents/4448744). Samma behörighetsproblem som i förra avsnittet, alltså – bara i en annan förpackning.

En egen lösning motiveras i tre lägen:

1. **Datan ligger i fler system än Microsoft.** Affärssystem, ärendesystem, egna databaser, filservrar – Copilot ser inte det som inte finns i Graph.
2. **Hämtningen behöver specialanpassas.** Branschspråk, dokumentstrukturer eller precisionskrav som generell sökning inte klarar.
3. **Ni vill styra modellval och hosting själva.** Egen driftform, EU-krav, eller möjligheten att byta modell när en bättre kommer.

Vi tjänar ingenting på att avråda från Copilot där den räcker. Vår rekommendation är krass: börja med det ni redan betalar för om det löser behovet – och bygg eget när det inte gör det.

## Vad kan en intern AI-assistent användas till?

De vanligaste användningsområdena hos små och medelstora företag:

- **Kundtjänst ur eget material.** Assistenten svarar på vanliga kundfrågor utifrån era produktblad, villkor och guider – dygnet runt, med människan som eskaleringspunkt.
- **Internt kunskapsstöd.** Nyanställda får svar på "hur gör vi X här?" ur handböcker och rutindokument, i stället för att avbryta en kollega.
- **Avtals- och dokumentfrågor.** "Vad gäller enligt vårt avtal med leverantör Y?" – med hänvisning till exakt klausul.
- **Teknisk support ur manualer.** Servicetekniker och support slår upp felkoder och åtgärder ur hundratals sidor dokumentation på sekunder.

En intern AI-assistent är i grunden en specialiserad [AI-agent](/kunskapsbank/vad-ar-en-ai-agent) med ett avgränsat uppdrag: svara rätt ur era källor. Vill ni se hur vi paketerar det som tjänst: [RAG-kunskapsassistent](/kontakt).

## Vad kostar en AI-assistent på egen data?

Vi publicerar ingen prislista, av ett enkelt skäl: kostnaden styrs nästan helt av era förutsättningar, inte av tekniken. Fem faktorer avgör:

- **Antal källsystem.** Ett SharePoint-bibliotek är ett litet jobb. SharePoint plus affärssystem plus ärendesystem plus filserver är ett annat.
- **Datakvalitet och städbehov.** Välstrukturerade, aktuella dokument indexeras snabbt. Dubbletter, utkast och inaktuella versioner måste rensas först.
- **Behörighetskrav.** En assistent där alla får se allt är enklare än en med behörighetsfiltrering per roll – men den senare är ofta den ni faktiskt behöver.
- **Utvärderings- och kontrollbehov.** Ju mer kritiska svaren är, desto mer testning före lansering och desto tydligare mänskliga kontrollpunkter.
- **Förvaltning.** Källor uppdateras, frågor förändras, modeller byts. En assistent utan förvaltningsplan blir sämre för varje månad.

Vi offererar mot problemet: först kartläggning, sedan en prioriterad rekommendation med pris – inte tvärtom.

## Vanliga frågor

### Hur lång tid tar det att komma igång?

Det beror på antal källor och behörighetskrav. En avgränsad assistent på ett välstrukturerat dokumentbibliotek går att sätta upp och utvärdera på några veckor. Fler källsystem, städbehov i materialet och behörighetsfiltrering förlänger tidplanen – och det är utvärderingen före lansering som aldrig ska kapas.

### Måste vår data lämna Sverige eller EU?

Nej, men det kräver ett aktivt val av driftform. Standardalternativet "Global" hos exempelvis Azure OpenAI kan bearbeta data i valfri region i världen; EU-bearbetning kräver en regional driftform eller EU Data Zone. Lagring av era dokument styr ni själva. Kravet ska stå i avtalet – be leverantören visa var.

### Vad är skillnaden mellan en intern AI-assistent och ChatGPT?

ChatGPT svarar ur det modellen lärt sig från internet och känner inte till era dokument. En intern AI-assistent hämtar underlag ur era egna källor vid varje fråga och svarar med källhänvisning. Den kan därför svara på frågor om era avtal, rutiner och produkter – och ni styr vem som får se vad.

### Kan assistenten tränas på våra dokument?

Det är en vanlig missuppfattning – assistenten tränas inte på era dokument, den hämtar ur dem. Dokumenten ligger kvar i ett sökindex ni kontrollerar, och modellen får bara relevanta utdrag som underlag vid varje enskild fråga. Det är just därför er data inte bakas in i någon modell: ta bort ett dokument ur indexet, och assistenten kan inte längre svara ur det.

## Vill ni se vad en assistent på era dokument skulle klara?

En intern AI-assistent står och faller med tre saker leverantörer sällan lyfter självmant: behörigheterna, felfrekvensen och frågan om ni ens behöver en egen lösning. Alla tre går att hantera – men de ska hanteras före bygget, inte efter.

Vi erbjuder en kostnadsfri AI-kartläggning: vi går igenom era källor och processer och visar vad en assistent på era dokument skulle kunna svara på – och vad som krävs för att den ska svara rätt. [Boka en AI-kartläggning](/kontakt)
