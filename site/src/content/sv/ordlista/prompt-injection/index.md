---
term: "Prompt injection"
former: ["promptinjektion", "promptinjektioner"]
title: "Vad är prompt injection? Risken och skyddet förklarat"
description: "Prompt injection är när dolda instruktioner lurar en språkmodell. Så fungerar direkt och indirekt injektion, och det här kan ett företag göra åt risken."
h1: "Vad är prompt injection?"
definition: "Prompt injection är ett angrepp där någon smyger in egna instruktioner i texten som en språkmodell läser, så att modellen gör något annat än det systemets ägare har avsett."
group: regler-sakerhet
guide: vad-ar-en-prompt
related: [ai-policy, human-in-the-loop]
publishedAt: 2026-11-12
---

## Hur går en prompt injection till?

Angreppet utnyttjar att en språkmodell får instruktioner och arbetsmaterial i samma form, som text. Modellen har inget säkert sätt att skilja en order från systemets ägare från innehåll som den bara ska läsa. Den som kan påverka texten kan därför påverka vad modellen gör.

Säkerhetsorganisationen OWASP placerar prompt injection först, som LLM01, i 2026 års utgåva av sin lista [Top 10 for LLM Applications](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/). Där låg risken också i 2025 års utgåva. OWASP skiljer på två varianter:

- **Direkt prompt injection.** Användaren skriver själv något som får modellen att bryta mot sina regler, till exempel en uppmaning att bortse från tidigare instruktioner.
- **Indirekt prompt injection.** Instruktionen ligger i något modellen hämtar från en extern källa, som en hemsida, ett mejl eller ett bifogat dokument. Texten kan vara dold för människor men läsbar för modellen.

## Varför är risken större med AI-agenter?

Skadan av ett lyckat angrepp avgörs av vad systemet får göra. En chattbot som bara svarar med text kan luras att säga fel saker. En AI-agent med tillgång till verktyg kan luras att göra fel saker.

Ta en agent som sorterar inkommande kundmejl och har rätt att svara och slå i kundregistret. Ett mejl innehåller en dold rad som uppmanar agenten att skicka kunduppgifter till en extern adress. Behandlar agenten raden som en instruktion har ett vanligt mejl fått kunduppgifter att läcka. Hur en prompt är uppbyggd beskriver vi i guiden [Vad är en prompt?](/kunskapsbank/vad-ar-en-prompt).

## Vad kan ett företag göra åt prompt injection?

Risken går inte att bygga bort helt. OWASP skriver att det i dag inte finns någon tillförlitlig metod för att förhindra prompt injection. Skyddet byggs därför i flera lager, och OWASP rekommenderar bland annat följande:

- **Minsta möjliga behörighet.** Ge AI-systemet bara de rättigheter uppgiften kräver.
- **Mänskligt godkännande.** Kräv human in the loop för åtgärder som inte går att ångra eller syns utåt, till exempel utskick och radering.
- **Tydlig åtskillnad.** Håll externt innehåll skilt från systemets instruktioner och märk var det kommer ifrån.
- **Kontroll av in- och utdata.** Filtrera det som går in i modellen och kontrollera det som kommer ut.
- **Tester.** Låt någon som känner till skyddet försöka lura systemet innan det tas i drift.

En rimlig start för ett litet företag är de två första punkterna. Låt företagets AI-policy ange vilka system som får agera på egen hand och vilka som bara får lämna förslag.
