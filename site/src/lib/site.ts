// Gemensamma uppgifter om AI Partner (2026-10-14). Kontaktsidan och den strukturerade
// datan (Organization på startsidan, utgivare på artiklarna) läser HÄRIFRÅN, så att de
// aldrig visar olika uppgifter.
//
// KONTAKTUPPGIFTER = PLATSHÅLLARE från SEOS (Björn): e-post kontakt@seosdesign.se
// (troligen kontakt@aipartner.se senare), telefon och kontor som SEOS.

export const SITE_URL = 'https://www.aipartner.se';

export const CONTACT = {
  email: 'kontakt@seosdesign.se',
  phone: '+46 8 490 096 20',
  phoneHref: 'tel:+46849009620',
  street: 'Fridhemsgatan 45',
  city: 'Stockholm',
};

/** Samma id överallt, så att Google kopplar ihop organisationen mellan sidorna. */
export const ORG_ID = `${SITE_URL}/#org`;

/** Kort referens till organisationen (författare/utgivare i artiklarnas schema). */
export const orgRef = { '@type': 'Organization', '@id': ORG_ID, name: 'AI Partner', url: `${SITE_URL}/` };

/** Organization + WebSite – ligger på startsidan. */
export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...orgRef,
      description: 'AI-agenter och automation för svenska företag.',
      telephone: CONTACT.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.city,
        addressCountry: 'SE',
      },
      // AI Partner är ett varumärke inom SEOS Design, inte ett eget bolag.
      parentOrganization: { '@type': 'Organization', name: 'SEOS Design', url: 'https://www.seosdesign.se/' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'AI Partner',
      url: `${SITE_URL}/`,
      inLanguage: 'sv-SE',
      publisher: { '@id': ORG_ID },
    },
  ],
};

/** Kanonisk adress utan avslutande snedstreck (/kontakt, inte /kontakt/); startsidan = "/". */
export function canonicalUrl(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return new URL(path, SITE_URL).href;
}
