---
term: "API"
former: ["API:er", "API:et", "API:erna"]
title: "Vad är ett API? Enkel förklaring med exempel"
description: "Ett API låter två program utbyta data och ge varandra uppdrag. Här förklaras hur det fungerar och varför API:er avgör vad ett företag kan automatisera."
h1: "Vad är ett API?"
definition: "Ett API är ett gränssnitt som låter ett program hämta data från eller ge uppdrag till ett annat program, enligt regler som systemets leverantör har bestämt."
group: automation
guide: vad-ar-en-ai-agent
related: [systemintegration, ipaas, arbetsflode]
publishedAt: 2026-11-12
---

## Hur fungerar ett API?

Ett API fungerar som en servitör på en restaurang. Gästen går inte in i köket utan beställer från menyn, och servitören kommer tillbaka med maten. På samma sätt skickar ett program en förfrågan till ett annat programs API och får ett svar i ett bestämt format, utan att behöva veta hur systemet fungerar på insidan.

Förkortningen står för application programming interface, på svenska programmeringsgränssnitt. Menyn i liknelsen motsvarar API:ets dokumentation. Där står vilka frågor som går att ställa, vilka uppgifter som måste följa med och vad som kommer tillbaka. En förfrågan kan vara "hämta alla ordrar från i går" eller "skapa en ny kontakt med det här namnet och den här mejladressen".

Många av de molntjänster ett företag använder har ett API, till exempel affärssystemet, CRM-systemet, kalendern och e-handelsplattformen. Åtkomsten styrs med en nyckel eller en inloggning, så att bara behöriga program kommer åt uppgifterna.

## Varför avgör API:er vad som går att automatisera?

API:et sätter gränsen för vad ett annat program kan göra i ett system. Finns det ett API för att läsa ordrar men inget för att ändra dem, kan en automatisering hämta ordrarna men aldrig rätta en leveransadress.

Systemintegration bygger oftast på API:er. En integrationsplattform är i grunden ett verktyg som anropar olika systems API:er i tur och ordning och skickar uppgifter mellan dem. Detsamma gäller AI. En [AI-agent](/kunskapsbank/vad-ar-en-ai-agent) som ska boka ett möte eller uppdatera ett kundkort gör det genom att anropa API:er. Den öppna standarden [MCP](https://www.seosdesign.se/kunskapsbank/mcp) beskriver hur AI-tillämpningar ansluts till externa system på ett enhetligt sätt.

## När behöver ett litet företag bry sig om API:er?

Frågan blir aktuell vid inköp av nya system. Ett system utan öppet API blir lätt en återvändsgränd, där uppgifterna går att se på skärmen men inte att flytta vidare utan manuellt arbete. Tre frågor till leverantören räcker långt.

- Finns det ett dokumenterat API, och ingår det i den licens ni betalar för?
- Går det både att läsa och skriva uppgifter, eller bara att läsa?
- Finns det färdiga kopplingar till de system ni redan använder?

Ingen i företaget behöver kunna programmera mot ett API för att ha nytta av svaren. Det räcker att veta att möjligheten finns den dag ett arbetsflöde ska automatiseras.
