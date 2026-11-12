---
term: "Token"
former: ["tokens", "tokenen"]
title: "Vad är en token i AI? Så räknar språkmodeller text"
description: "En token är den textbit en språkmodell räknar i. Så delas text upp i tokens, och därför styr de både kostnaden och hur mycket text modellen kan ta in."
h1: "Vad är en token i AI?"
definition: "En token är den minsta textenhet en språkmodell arbetar med, ofta ett kort ord eller en del av ett ord. Antalet tokens avgör hur mycket text modellen kan ta in och vad användningen kostar."
group: ai-teknik
guide: generativ-ai
related: [neurala-natverk, prompt-injection]
publishedAt: 2026-11-13
---

## Vad är en token i en språkmodell?

Ordet token används i flera sammanhang. Här gäller det språkmodeller, alltså tekniken bakom AI-assistenter. I kryptovärlden betyder ordet något helt annat.

Innan en språkmodell läser en text delas texten upp i tokens. Ett kort och vanligt ord blir ofta en enda token, medan långa eller ovanliga ord delas i flera. Skiljetecken räknas också. Modellen är ett neuralt nätverk som har tränats på att räkna ut vilken token som sannolikt kommer härnäst, och svaret byggs upp en token i taget.

[Googles dokumentation för Gemini](https://aistudio.google.com/docs/tokens) anger som tumregel för Gemini-modellerna att en token motsvarar ungefär fyra tecken och att 100 tokens blir omkring 60–80 engelska ord. Varje modellfamilj delar upp text på sitt eget sätt, så samma text ger olika antal tokens hos olika leverantörer.

## Varför styr tokens kostnad och gränser?

Tokens är den enhet leverantörerna mäter i, och det får två praktiska följder.

Den första är kostnaden. När en språkmodell kopplas till ett eget system via ett API beror priset på antalet tokens, både i texten som skickas in och i svaret som kommer tillbaka. Ett långt underlag och ett utförligt svar kostar mer än en kort fråga.

Den andra är kontextfönstret, det vill säga hur många tokens modellen kan hantera åt gången. Där ska allt få plats: instruktionen, underlaget ni skickar med, den tidigare konversationen och svaret. Ryms det inte måste underlaget kortas eller delas upp.

## När behöver ett litet företag bry sig om tokens?

Den som använder en färdig AI-assistent med abonnemang märker sällan av tokens, annat än att mycket långa dokument kan vara för stora för ett enda samtal.

Tokens blir viktiga när ni bygger något eget eller låter en leverantör göra det. En AI-agent som läser varje inkommande kundmejl, hämtar underlag ur en kunskapsbas och skriver ett svarsutkast förbrukar tokens i varje steg. Då avgör volymen vad lösningen kostar i drift. En rimlig start är att mäta förbrukningen under en vecka med verkliga ärenden innan lösningen byggs ut.

Några enkla vanor håller nere förbrukningen:

- Skicka bara med det underlag uppgiften kräver.
- Be om korta svar när korta svar räcker.
- Använd en mindre modell för enkla uppgifter som sortering och klassificering.

Hur språkmodeller skapar text går vi igenom i guiden om [generativ AI](/kunskapsbank/generativ-ai).
