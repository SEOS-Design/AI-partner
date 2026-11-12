---
term: "n8n"
former: []
title: "Vad är n8n? Verktyg för arbetsflöden och AI-agenter"
description: "n8n är ett verktyg för automatisering av arbetsflöden med inbyggda AI-funktioner. Så fungerar det, vad fair-code-licensen innebär och när egen drift är rimlig."
h1: "Vad är n8n?"
definition: "n8n är ett verktyg för att bygga automatiserade arbetsflöden och AI-agenter på en visuell yta. Det går att köra i n8n:s molntjänst eller på en egen server."
group: verktyg
guide: vad-ar-rpa
related: [power-automate, ipaas, arbetsflode]
publishedAt: 2026-11-12
---

## Hur fungerar n8n?

Ni bygger ett arbetsflöde genom att koppla ihop noder på en visuell yta. Varje nod gör en sak, som att ta emot ett formulärsvar, hämta en kund ur CRM-systemet eller skicka ett mejl. En startnod, som n8n kallar trigger, avgör när flödet körs. Det kan vara en händelse i ett annat system eller ett schema.

n8n beskriver sig i sin [dokumentation](https://docs.n8n.io/) som ett verktyg som kombinerar AI-funktioner med automatisering av affärsprocesser. Det finns färdiga noder för många vanliga tjänster. Saknas en nod går det att anropa tjänstens API direkt eller skriva egen kod i flödet.

Enligt [n8n:s AI-dokumentation](https://docs.n8n.io/build/integrate-ai) går det också att bygga flöden med språkmodeller från olika leverantörer, agenter, verktyg och minne. Ett flöde kan då innehålla ett steg som kräver tolkning, till exempel att sortera inkommande mejl efter ärende, medan resten förblir regelstyrt. Innan en agent får använda ett visst verktyg kan flödet [kräva ett mänskligt godkännande](https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools), alltså human in the loop.

## Är n8n öppen källkod?

Källkoden är öppet tillgänglig, men n8n kallar sig inte öppen källkod. Programvaran distribueras enligt [n8n:s egen licens](https://docs.n8n.io/n8n-community-license), Sustainable Use License, som bygger på modellen fair-code. Licensen tillåter att ni använder och ändrar programvaran för interna affärsändamål. Den tillåter inte att ni gör n8n tillgängligt för era kunder så att de kopplar in sina egna konton och bygger egna flöden. För det krävs ett separat avtal med n8n.

Ett företag som automatiserar sin egen verksamhet berörs alltså sällan av begränsningen. Läs ändå licensen innan ni bygger något som era kunder ska logga in i.

## Molntjänst eller egen drift?

I november 2026 finns n8n i två former. I molntjänsten sköter n8n drift, uppdateringar och skalning. Med egen drift kör ni programvaran på en egen server. Då stannar er data i er egen miljö, så länge flödena inte skickar den vidare till externa tjänster. Enligt n8n:s [jämförelse](https://docs.n8n.io/choose-how-to-use-n8n) kräver egen drift teknisk kunskap för installation och konfiguration, och underhållet är ert ansvar.

För ett litet företag utan egen it-drift är molntjänsten den enklare starten. Egen drift blir intressant när flödena hanterar känsliga uppgifter som inte bör lämna företagets miljö, och när någon kan ta ansvar för säkerhetsuppdateringar och backuper.

n8n är inte knutet till en viss kontorssvit, till skillnad från Power Automate. Det passar när systemen kommer från många olika leverantörer. Verktyg i kategorin iPaaS löser liknande uppgifter. Bakgrunden till regelstyrd automatisering finns i guiden om [RPA](/kunskapsbank/vad-ar-rpa).
