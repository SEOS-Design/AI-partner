---
term: "Human in the loop"
former: ["human-in-the-loop", "människa i loopen"]
title: "Vad betyder human in the loop? Människan i AI-flödet"
description: "Human in the loop innebär att en människa granskar eller godkänner steg i ett automatiserat flöde. Så fungerar det, och så förhåller det sig till AI-förordningen."
h1: "Vad betyder human in the loop?"
definition: "Human in the loop betyder att en människa granskar, godkänner eller rättar ett steg i ett automatiserat flöde, oftast innan resultatet används. På svenska sägs ibland människa i loopen."
group: arbetssatt
guide: vad-ar-en-ai-agent
related: [arbetsflode, ai-policy]
publishedAt: 2026-11-13
---

## Hur fungerar human in the loop i praktiken?

Flödet stannar vid en bestämd punkt och väntar på en människa. En AI-agent kan till exempel läsa ett inkommande kundmejl, föreslå ett svar och lägga det som utkast. Handläggaren läser, ändrar vid behov och skickar. Agenten gör förarbetet och människan fattar beslutet.

Det finns tre vanliga nivåer:

- **Godkännande före åtgärd.** Inget skickas, bokas eller betalas förrän någon har sagt ja.
- **Granskning av undantag.** Flödet sköter rutinfallen och lämnar över det som är osäkert eller avviker.
- **Stickprov i efterhand.** Flödet agerar självständigt, och en människa kontrollerar ett urval.

Var granskningen ska ligga bestäms när arbetsflödet ritas upp. Verktyg som Power Automate och n8n har färdiga steg för godkännande.

## När behövs en människa i flödet?

En rimlig tumregel är att granskningen ska stå i proportion till vad ett fel kostar. Ett felsorterat mejl är lätt att rätta. En offert med fel pris eller ett avslag till en arbetssökande är det inte. Lägg godkännandet före de steg som är svåra att ångra, som påverkar en enskild person eller som lämnar företaget.

Granskningen måste också vara verklig. Den som godkänner hundra förslag i rad utan att läsa dem fyller ingen funktion. Håll därför antalet granskningspunkter lågt, och ge granskaren det underlag som behövs för att kunna säga nej.

## Vad säger AI-förordningen om mänsklig kontroll?

För AI-system med hög risk är mänsklig kontroll ett lagkrav. Det är förordningens svenska term för det som i dagligt tal ofta kallas mänsklig tillsyn. Artikel 14 i [AI-förordningen](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/swe) kräver att sådana system utformas så att fysiska personer på ett effektivt sätt kan utöva kontroll över dem när de används. Personerna ska bland annat kunna förstå systemets begränsningar, bortse från dess resultat och stoppa det. Enligt artikel 26.2 ska företaget som använder systemet, i förordningen kallat tillhandahållaren, ge uppgiften till personer med nödvändig kompetens, utbildning och auktoritet.

Kraven gäller inte än. Enligt [förordning (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/swe) börjar de tillämpas den 2 december 2027 för högrisksystem enligt AI-förordningens bilaga III, och den 2 augusti 2028 för AI-system i produkter som omfattas av bilaga I.

Ett AI-verktyg som sammanfattar möten eller skriver utkast till mejl hör normalt inte till högrisksystemen. Där är människa i loopen ett arbetssätt ni väljer själva, och det hör hemma i företagets AI-policy. Hur agenter arbetar och var de behöver styrning beskriver vi i guiden om [AI-agenter](/kunskapsbank/vad-ar-en-ai-agent).
