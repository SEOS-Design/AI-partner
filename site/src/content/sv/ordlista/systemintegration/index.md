---
term: "Systemintegration"
former: ["systemintegrationer", "systemintegrationen"]
title: "Vad är systemintegration? Så pratar systemen med varandra"
description: "Systemintegration kopplar ihop ett företags system så att uppgifter flyttas automatiskt. Här förklaras punkt-till-punkt, plattform och när det behövs."
h1: "Vad är systemintegration?"
definition: "Systemintegration är att koppla ihop separata it-system så att de utbyter uppgifter automatiskt, i stället för att någon skriver in samma information på flera ställen."
group: automation
guide: ai-pa-egen-data
related: [api, ipaas]
publishedAt: 2026-11-12
---

## Hur fungerar systemintegration?

En integration låter ett system skicka eller hämta uppgifter hos ett annat när något händer. När en order läggs i webbutiken skapas kunden i affärssystemet, lagersaldot räknas ner och leveransen bokas, utan att någon kopierar uppgifter mellan fönster.

Tekniskt sker utbytet oftast genom systemens API:er. Integrationen bestämmer vad som startar överföringen, vilka uppgifter som följer med och hur fälten i det ena systemet översätts till fälten i det andra. Det sista är ofta det svåra. Ett system lagrar namnet i ett fält och ett annat i två, och ett tredje kräver organisationsnummer där det första tillåter tomt.

## Vad är skillnaden mellan punkt-till-punkt och en integrationsplattform?

Skillnaden är var kopplingarna finns. Vid punkt-till-punkt byggs en direkt koppling mellan två system. Det går fort när systemen är få. Med fem system som alla ska dela uppgifter med varandra kan det bli upp till tio kopplingar, en för varje par av system. När ett system byts ut måste alla dess kopplingar byggas om.

En integrationsplattform samlar kopplingarna på ett ställe. Varje system ansluts en gång till plattformen, och flödena mellan dem byggs och övervakas där. När plattformen köps som molntjänst kallas den iPaaS.

| | Punkt-till-punkt | Integrationsplattform |
|---|---|---|
| Passar när | Två eller tre system ska kopplas ihop | Många system och flöden ska hållas ihop |
| Styrka | Snabbt att komma igång | Överblick, loggning och felhantering på ett ställe |
| Svaghet | Svårt att överblicka när kopplingarna blir fler | Ytterligare ett system att förvalta |

Många affärssystem och CRM-system har dessutom färdiga kopplingar till vanliga tjänster. De är punkt-till-punkt-integrationer som leverantören redan har byggt, och de är en rimlig första lösning.

## När behöver ett litet företag integrera sina system?

Ett tydligt tecken är dubbelarbete. Om samma kunduppgift skrivs in i CRM-systemet, affärssystemet och projektverktyget finns det tre ställen där den kan bli fel. Ett annat tecken är att rapporter byggs genom att exportera listor till Excel och klistra ihop dem.

Integration är också en förutsättning för AI på företagets egna uppgifter. En AI-assistent som ska svara på frågor om kunder, ordrar eller rutiner kan bara göra det om den når systemen där uppgifterna finns. Mer om det står i guiden om [AI på egen data](/kunskapsbank/ai-pa-egen-data).

En rimlig start är det flöde där flest uppgifter skrivs in för hand. Integrera det, se att det håller i drift och ta sedan nästa.
