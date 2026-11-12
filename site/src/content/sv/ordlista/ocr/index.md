---
term: "OCR"
former: ["textigenkänning", "optisk teckenläsning"]
title: "Vad är OCR? Så fungerar optisk textigenkänning"
description: "OCR är teknik som läser av text i bilder och inskannade dokument. Så fungerar textigenkänning, och så skiljer den sig från OCR-numret på en faktura."
h1: "Vad är OCR?"
definition: "OCR är teknik som omvandlar text i bilder och inskannade dokument till text som en dator kan söka i, kopiera och bearbeta. Förkortningen står för optical character recognition."
group: automation
guide: vad-ar-rpa
related: [datorseende, automatisering]
publishedAt: 2026-11-13
---

## Hur fungerar OCR?

OCR tolkar formerna i en bild och översätter dem till tecken. På svenska heter tekniken textigenkänning eller optisk teckenläsning. Den här sidan handlar om den tekniken och inte om OCR-numret på en faktura, som förklaras längre ner.

Ett inskannat avtal är från början bara en bild. Datorn ser ljusa och mörka punkter men ingen text, så det går varken att söka i dokumentet eller att kopiera ett stycke. OCR-programmet hittar raderna, delar upp dem i ord och tecken och avgör vilken bokstav eller siffra varje form föreställer. Resultatet blir vanlig text som också kan skickas vidare till andra system.

OCR hör till området datorseende. Kvaliteten beror på underlaget. Skarpa, raka skanningar av tryckt text ger få fel, medan handstil, sneda mobilfoton och dålig kontrast ger fler.

## Vad är skillnaden mellan OCR och OCR-nummer?

OCR-numret är ett referensnummer för betalningar. [Bankgirot](https://www.bankgirot.se/kundservice/vanliga-fragor/) beskriver det som ett särskilt utformat referensnummer som oftast står längst ned på betalningsavin. Numret anges när räkningen betalas.

De två betydelserna delar förkortning men används i olika sammanhang. Den som söker efter OCR i samband med en räkning letar efter numret. Den som vill få in pappersdokument i ett system letar efter tekniken.

## När har ett litet företag nytta av OCR?

OCR är användbart när information kommer in som papper, bild-pdf:er eller foton och sedan ska in i ett system. Det kan vara inskannade avtal som ska bli sökbara, följesedlar som ska stämmas av mot beställningar eller formulär som kunder har fyllt i för hand.

OCR ger bara text. Tekniken vet inte vad i texten som är ett datum, ett belopp eller ett kundnummer. Nästa steg kallas intelligent dokumenttolkning, på engelska intelligent document processing eller IDP. Där kombineras textigenkänning med AI som tolkar dokumentets innehåll och plockar ut rätt uppgifter, även när två leverantörers dokument ser olika ut.

I en automatisering är OCR ofta första länken. Texten läses av, uppgifterna tolkas och resultatet skickas vidare till affärssystemet, via ett API eller med en programrobot. Hur programrobotar arbetar beskrivs i guiden om [RPA](/kunskapsbank/vad-ar-rpa). Låt en människa granska resultatet i början, tills det är tydligt hur ofta avläsningen blir fel.
