---
term: "Power Automate"
former: ["Microsoft Power Automate"]
title: "Vad är Power Automate? Microsofts verktyg för automatisering"
description: "Power Automate är Microsofts verktyg för att automatisera arbetsflöden. Så fungerar molnflöden och skrivbordsflöden, och så vet ni när verktyget räcker."
h1: "Vad är Power Automate?"
definition: "Power Automate är Microsofts verktyg för att bygga automatiserade arbetsflöden mellan appar och tjänster, med liten eller ingen kod. Det hör till Microsoft Power Platform."
group: verktyg
guide: vad-ar-rpa
related: [n8n, copilot, arbetsflode]
publishedAt: 2026-11-12
---

## Hur fungerar Power Automate?

Ni bygger ett flöde av en utlösare och en eller flera åtgärder. Utlösaren är händelsen som startar flödet, till exempel att ett mejl kommer in eller att någon fyller i ett formulär. Åtgärderna är det som sedan ska hända, som att spara bilagan, skapa en uppgift och skicka ett meddelande i Teams. Kopplingen till andra system går genom färdiga anslutningar, som Microsoft kallar anslutningsprogram (connectors).

[Microsofts dokumentation](https://learn.microsoft.com/sv-se/power-automate/flow-types) delar in flödena i typer. Molnflöden och skrivbordsflöden är grunden:

- **Molnflöden** körs i molnet och startar vid en händelse, med en knapptryckning eller enligt ett schema. De går också att [skapa med Copilot](https://learn.microsoft.com/en-us/power-automate/create-cloud-flow-using-copilot) genom att beskriva dem i vanlig text.
- **Skrivbordsflöden** styr program och webbsidor på en Windows-dator, på samma sätt som en människa klickar och skriver. Det är Microsofts variant av RPA.

I november 2026 räknar Microsoft också upp generativa åtgärder, där ni anger vad som ska uppnås och låter AI välja stegen. Funktionen är en förhandsversion.

Ett flöde kan också innehålla [godkännanden](https://learn.microsoft.com/en-us/power-automate/get-started-approvals). Då får en person en förfrågan i Outlook eller Teams, och flödet väntar på svaret. Det är ett enkelt sätt att bygga in human in the loop.

## När räcker Power Automate för ett litet företag?

Verktyget passar bäst när arbetet redan sker i Microsoft 365 och stegen följer tydliga regler. Ett exempel är en offertförfrågan från hemsidan som ska bli en rad i en lista, ett mejl till säljaren och en påminnelse efter tre dagar. Sådana arbetsflöden går att bygga utan utvecklare.

Vad som ingår beror på licensen. Enligt Microsofts [jämförelse av kontotyper](https://learn.microsoft.com/en-us/power-automate/desktop-flows/requirements#sign-in-account-comparison) krävs ett premiumkonto för bland annat premiumanslutningar och för skrivbordsflöden som ska startas eller schemaläggas från ett molnflöde. Kontrollera vad er nuvarande licens omfattar innan ni planerar ett större flöde.

## Var går gränserna?

Tre situationer talar för ett annat verktyg eller för egen kod.

Den första är när systemen inte kommer från Microsoft och saknar färdiga anslutningar. Det går att bygga egna, men då kan ett fristående verktyg som n8n eller en integration direkt mot systemets API vara enklare. Den andra är skrivbordsflöden i stor skala. De följer knappar och fält på skärmen och är därför känsliga för ändringar i gränssnittet. Den tredje är uppgifter som kräver bedömning, till exempel att tolka fritext i ett kundmejl. Där behövs en språkmodell i flödet, eller en AI-agent.

När skrivbordsautomatisering är värd insatsen går vi igenom i guiden om [RPA](/kunskapsbank/vad-ar-rpa).
