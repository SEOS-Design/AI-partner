// track.ts – händelsemätning till GA4 (2026-10-20). Importeras från Layout.astro.
//
// Fyra händelser, alla via gtag (scripts/consent.ts definierar window.gtag):
//   generate_lead   kontaktformuläret skickat och Resend svarade ok (GA4:s rekommenderade
//                   namn för leads – markera den som nyckelhändelse i GA4:s admin)
//   lead_error      formuläret kunde inte skickas (routen nere eller nätfel)
//   cta_click       klick på en länk till /kontakt – var på sidan (cta_location) och
//                   vilken text (cta_text), så man ser vilka knappar som faktiskt används
//   contact_click   klick på mailto:/tel: (method = email|phone)
//
// Utlänkar, scrolldjup (90 %) och filnedladdningar mäts av GA4:s förbättrade mätning –
// slå på den i egendomens datastream, den ligger inte i kod.
//
// INGET SKICKAS UTAN SAMTYCKE: en händelse släpps bara igenom när consent.ts har laddat
// gtag.js (aipConsent.loaded()), vilket bara sker efter ja i cookierutan. Händelser som
// inträffar innan dess kastas – de köas inte för att skickas i efterhand.
//
// Fältvärden ur formuläret loggas aldrig; generate_lead bär bara form_id och sidan.

type Params = Record<string, string | number | boolean>;

function send(name: string, params: Params): void {
  if (!window.aipConsent?.loaded() || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Var på sidan ett klick skedde: närmaste sektion med id, annars nav/drawer/footer/page. */
function locationOf(el: Element): string {
  if (el.closest('aside.drawer')) return 'drawer';
  if (el.closest('header#main-nav')) return 'nav';
  if (el.closest('footer')) return 'footer';
  const section = el.closest<HTMLElement>('section[id], section[aria-labelledby], main');
  if (section?.id) return section.id;
  const labelled = section?.getAttribute('aria-labelledby');
  if (labelled) return labelled.replace(/-title$/, '');
  return 'page';
}

const page = (): string => location.pathname;

document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  if (!a) return;
  const href = a.getAttribute('href') ?? '';
  if (href.startsWith('mailto:')) {
    send('contact_click', { method: 'email', link_location: locationOf(a), page_path: page() });
  } else if (href.startsWith('tel:')) {
    send('contact_click', { method: 'phone', link_location: locationOf(a), page_path: page() });
  } else if (href === '/kontakt' || href.startsWith('/kontakt#') || href.startsWith('/kontakt?')) {
    send('cta_click', {
      cta_text: (a.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 60),
      cta_location: locationOf(a),
      page_path: page(),
    });
  }
});

// Contact.astro skickar aip:lead när /api/lead svarat ok och aip:lead-error annars.
document.addEventListener('aip:lead', () => {
  send('generate_lead', { form_id: 'kontakt', page_path: page() });
});
document.addEventListener('aip:lead-error', (e) => {
  const status = (e as CustomEvent<{ status?: number }>).detail?.status ?? 0;
  send('lead_error', { form_id: 'kontakt', status, page_path: page() });
});
