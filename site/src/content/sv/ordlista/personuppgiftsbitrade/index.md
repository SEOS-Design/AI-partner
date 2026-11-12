---
term: "Personuppgiftsbiträde"
former: ["personuppgiftsbiträden", "personuppgiftsbiträdet", "personuppgiftsbiträdesavtal"]
title: "Vad är ett personuppgiftsbiträde? GDPR-rollen förklarad"
description: "Ett personuppgiftsbiträde behandlar personuppgifter för någon annans räkning. Så fungerar rollen enligt GDPR, och därför är AI-leverantören ofta biträde."
h1: "Vad är ett personuppgiftsbiträde?"
definition: "Ett personuppgiftsbiträde är ett företag eller en annan organisation som behandlar personuppgifter för någon annans räkning och enligt dennes instruktioner, till exempel en molntjänstleverantör."
group: regler-sakerhet
guide: skugg-ai
related: [dpia, ai-policy]
publishedAt: 2026-11-13
---

## Vad är skillnaden mellan personuppgiftsbiträde och personuppgiftsansvarig?

Den personuppgiftsansvariga bestämmer, och biträdet utför. Enligt artikel 4.7 i [dataskyddsförordningen (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj/swe) är den personuppgiftsansvariga den som bestämmer ändamålen och medlen för behandlingen. Biträdet behandlar uppgifterna för den ansvarigas räkning, enligt artikel 4.8.

[IMY](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/personuppgiftsansvariga-och-personuppgiftsbitraden/) skriver att ett personuppgiftsbiträde alltid finns utanför den egna organisationen. Anställda är alltså inte biträden. Som exempel nämner myndigheten molntjänstföretag som anlitas för att hantera och lagra personuppgifter.

Ansvaret följer inte med uppdraget. IMY skriver att personuppgiftsansvaret aldrig kan överlåtas. Det är ert företag som ska se till att behandlingen följer GDPR, också när en leverantör sköter den.

## Vad ska ett personuppgiftsbiträdesavtal innehålla?

Artikel 28 kräver ett skriftligt avtal mellan den ansvariga och biträdet. Avtalet ska ange vad behandlingen gäller, hur länge den pågår, dess ändamål, vilka typer av personuppgifter som behandlas och vilka kategorier av registrerade som berörs. Det ska också slå fast bland annat att biträdet:

- bara behandlar uppgifterna enligt dokumenterade instruktioner
- ser till att personalen har tystnadsplikt
- vidtar lämpliga säkerhetsåtgärder
- inte anlitar underbiträden utan skriftligt förhandstillstånd från den ansvariga
- hjälper den ansvariga att tillgodose de registrerades rättigheter
- raderar eller lämnar tillbaka uppgifterna när uppdraget är slut

## Är leverantören av ett AI-verktyg personuppgiftsbiträde?

Ofta, men det beror på vad leverantören gör med uppgifterna. IMY skriver i rapporten [GDPR vid användning av generativ AI](https://www.imy.se/publikationer/gdpr-vid-anvandning-av-generativ-ai/) att leverantören av ett AI-system som utgångspunkt är personuppgiftsbiträde för den behandling den utför för verksamhetens räkning. En förutsättning är att leverantören inte har något eget ändamål med uppgifterna, till exempel att vidareutveckla sin grundmodell med dem. Ett biträde som självt bestämmer ändamål och medel anses enligt artikel 28.10 vara personuppgiftsansvarigt för den behandlingen.

Villkoren avgör alltså rollen. IMY påpekar att allmänt tillgängliga AI-tjänster som är avsedda för privat bruk kan sakna personuppgiftsbiträdesavtal, och att användning i arbetet då kan strida mot GDPR. Rapporten är skriven för offentlig förvaltning, men IMY bedömer att riktlinjerna i huvudsak är vägledande även för privata verksamheter.

För ett litet företag blir kontrollen tre frågor inför varje nytt AI-verktyg. Finns ett biträdesavtal? Får leverantören använda era uppgifter för egna ändamål? Vilka underbiträden anlitas? Svaren hör hemma i företagets AI-policy, och vid behandling med hög risk i en DPIA. Vad som händer när verktyg används utan den kontrollen beskriver vi i guiden om [skugg-AI](/kunskapsbank/skugg-ai).
