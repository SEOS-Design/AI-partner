---
term: "Kunskapsbas"
former: ["kunskapsbasen", "kunskapsbaser"]
title: "Vad är en kunskapsbas? Intern och extern kunskapsbas förklarad"
description: "En kunskapsbas samlar svar, rutiner och instruktioner på ett sökbart ställe. Så skiljer sig intern och extern, och därför avgör den hur bra en AI svarar."
h1: "Vad är en kunskapsbas?"
definition: "En kunskapsbas är en samlad och sökbar plats för en organisations svar, instruktioner och rutiner, så att kunder eller anställda hittar informationen själva."
group: automation
guide: ai-pa-egen-data
related: [arendehanteringssystem, systemintegration]
publishedAt: 2026-11-13
---

## Vad är skillnaden mellan en intern och en extern kunskapsbas?

Skillnaden är vem som läser. En extern kunskapsbas vänder sig till kunder och ligger öppet på hemsidan, ofta under namn som hjälpcenter, support eller vanliga frågor. En intern kunskapsbas vänder sig till de anställda och rymmer rutiner, mallar, produktfakta och svar som kundtjänsten använder.

| | Extern kunskapsbas | Intern kunskapsbas |
|---|---|---|
| Läsare | Kunder och andra besökare | Anställda |
| Innehåll | Guider, felsökning, villkor, vanliga frågor | Rutiner, checklistor, produktfakta, svarsmallar |
| Syfte | Kunden löser frågan själv | Alla ger samma svar och nyanställda kommer snabbare in i arbetet |

Det som gör en samling dokument till en kunskapsbas är strukturen. I en välskött kunskapsbas svarar varje artikel på en fråga, har en ägare och ett datum för när den senast granskades. En delad mapp med hundratals filer utan ordning uppfyller inte det.

## Varför avgör kunskapsbasen kvaliteten på en AI-assistent?

En AI-assistent som ska svara om just ert företag kan bara bli så bra som underlaget den får. Språkmodellen känner inte till era priser, villkor eller rutiner. Vid varje fråga hämtas därför relevanta texter ur företagets underlag och läggs till frågan, en metod som kallas [RAG](https://www.seosdesign.se/kunskapsbank/rag). Svaret formuleras utifrån det som hämtades.

Följden är att brister i kunskapsbasen blir brister i svaren. Tre problem är värda att känna till.

- **Motsägelser.** Två artiklar anger olika returvillkor, och AI:n väljer den ena.
- **Inaktuellt innehåll.** En gammal rutin ligger kvar och presenteras som gällande.
- **Luckor.** Det som bara finns i en erfaren kollegas huvud kan AI:n inte svara på.

Hur uppgifterna görs tillgängliga för en AI, och vilka säkerhetsfrågor det väcker, beskrivs i guiden om [AI på egen data](/kunskapsbank/ai-pa-egen-data).

## När är det värt att bygga en kunskapsbas i ett litet företag?

Det är värt det när samma frågor besvaras om och om igen, av kunder eller av kollegor. Börja där frågorna redan finns samlade. Ett ärendehanteringssystem visar vilka frågor som återkommer oftast, och svaren på dem blir de första artiklarna.

Håll basen liten och aktuell hellre än stor. Utse en ägare för varje område och bestäm hur ofta innehållet ska ses över. Om uppgifterna finns i flera system, till exempel prislistor i affärssystemet och rutiner i ett dokumentverktyg, krävs systemintegration för att en AI-assistent ska nå alltihop.
