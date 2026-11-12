---
term: "Arbetsflöde"
former: ["arbetsflöden", "arbetsflödet", "arbetsflödena", "workflow", "workflows"]
title: "Vad är ett arbetsflöde? Workflow förklarat med exempel"
description: "Ett arbetsflöde är stegen som tar en uppgift från start till mål. Här förklaras triggers, villkor och överlämningar, och när ett flöde bör automatiseras."
h1: "Vad är ett arbetsflöde?"
definition: "Ett arbetsflöde är en kedja av steg som i en bestämd ordning tar en uppgift från start till färdigt resultat. Det engelska ordet workflow används ofta även på svenska."
group: automation
guide: processkartlaggning
related: [processautomation, automatisering, human-in-the-loop]
publishedAt: 2026-11-13
---

## Vad består ett arbetsflöde av?

Ett arbetsflöde består av en start, ett antal steg och regler för vad som händer mellan dem. I verktyg för automatisering har delarna egna namn, och samma begrepp återkommer i de flesta verktyg.

- **Trigger.** Händelsen som startar flödet, till exempel ett nytt mejl, ett ifyllt formulär eller en tidpunkt.
- **Steg.** Det som ska göras, i tur och ordning. Verktygen kallar dem ofta actions eller åtgärder.
- **Villkor.** Vägval i flödet. Är beloppet över en viss gräns går ärendet till chefen, annars direkt vidare.
- **Överlämning.** Punkten där ansvaret byter ägare, från ett system till ett annat eller från en maskin till en människa.

En ledighetsansökan visar delarna. En medarbetare fyller i ett formulär (trigger). Systemet kontrollerar saldot (steg). Är saldot för lågt får medarbetaren besked direkt, annars går ansökan vidare (villkor). Chefen godkänner (överlämning), och kalendern uppdateras.

## Vad är skillnaden mellan ett arbetsflöde och en process?

Orden används ofta om samma sak, men de brukar skiljas åt så här. En process är vad verksamheten gör och varför, till exempel att ta in en ny kund. Arbetsflödet är hur det går till i detalj, alltså vilka steg som utförs, av vem och i vilken ordning. En process kan därför bestå av flera arbetsflöden.

Skillnaden spelar roll vid processautomation. Det är arbetsflödena som byggs i verktygen, men det är processen som avgör om resultatet blir till nytta. Hur ett flöde ritas upp innan något automatiseras beskrivs i guiden om [processkartläggning](/kunskapsbank/processkartlaggning).

## När är det värt att automatisera ett arbetsflöde?

Det är värt det när flödet körs ofta och stegen går att beskriva utan att svaret blir "det beror på". Varje steg där någon måste minnas något, leta upp en uppgift eller skicka vidare ett mejl är en plats där ärenden kan bli liggande.

Allt behöver inte automatiseras. Ett flöde kan gå av sig självt fram till ett beslut som en människa ska fatta, och fortsätta när beslutet är fattat. Upplägget kallas human in the loop. Det passar steg där ett fel får följder för en kund eller en anställd.

En rimlig start är att skriva ner flödet som det ser ut i dag, med alla undantag. Redan det kan visa vilka steg som går att ta bort helt.
