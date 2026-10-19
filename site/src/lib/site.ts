// Gemensamma uppgifter om AI Partner (2026-10-14). Kontaktsidan och den strukturerade
// datan (Organization på alla sidor, utgivare på artiklarna) läser HÄRIFRÅN, så att de
// aldrig visar olika uppgifter.
//
// Kontaktuppgifter (Douglas 2026-10-19): e-post kontakt@aipartner.se, telefon och kontor som SEOS.
//
// Strukturerad data (schemaöversyn 2026-10-19, docs/SCHEMA-REVIEW-2026-10-19.md): EN
// entitetsgraf med stabila @id. Layout.astro renderar pageGraph() på varje sida:
// Organization + WebSite + Person (Douglas) + sidans WebPage-nod, plus det sidan skickar
// in (brödsmulor, Article, FAQPage, Service …). Alla referenser går via @id.

export const SITE_URL = 'https://www.aipartner.se';

export const CONTACT = {
  email: 'kontakt@aipartner.se',
  phone: '+46 8 490 096 20',
  phoneHref: 'tel:+46849009620',
  street: 'Fridhemsgatan 45',
  city: 'Stockholm',
};

/** Samma id överallt, så att Google kopplar ihop organisationen mellan sidorna. */
export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;
/** Douglas Ekman – författare på artiklarna (Douglas 2026-10-19). */
export const DOUGLAS_ID = `${SITE_URL}/#douglas-ekman`;

/** Delningsbild (1200×630) – samma som og:image i Layout.astro; används som Article/WebPage.image. */
export const OG_IMAGE = `${SITE_URL}/og-default.png`;
/** Logotypen från gamla aipartner.se, lagd på #0a0a0a så att den syns på vit yta (1470×794). */
export const LOGO = { url: `${SITE_URL}/logo.png`, width: 1470, height: 794 };

/** Telefon i E.164 (samma format som SEOS Designs schema). */
const PHONE_E164 = CONTACT.phoneHref.replace('tel:', '');

const SEOS = {
  '@type': 'Organization',
  '@id': 'https://www.seosdesign.se/#organization',
  name: 'SEOS Design',
  url: 'https://www.seosdesign.se/',
};

/** Organisationen. AI Partner är ett varumärke inom SEOS Design AB (org.nr hos SEOS), inte eget bolag. */
export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'AI Partner',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: LOGO.url, contentUrl: LOGO.url, width: LOGO.width, height: LOGO.height, caption: 'AI Partner' },
  image: { '@id': LOGO_ID },
  description: 'AI-agenter och automation för svenska företag.',
  telephone: PHONE_E164,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressCountry: 'SE',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: PHONE_E164,
      email: CONTACT.email,
      availableLanguage: ['sv', 'en'],
      areaServed: 'SE',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'Sverige' },
    { '@type': 'City', name: 'Stockholm' },
  ],
  knowsAbout: ['AI-agenter', 'AI-automation', 'RPA', 'RAG', 'AI-strategi', 'AI-utbildning'],
  parentOrganization: SEOS,
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'AI Partner',
  url: `${SITE_URL}/`,
  inLanguage: 'sv-SE',
  publisher: { '@id': ORG_ID },
};

/** Titeln är den som står på /om-oss (AboutTeam.astro). */
export const douglas = {
  '@type': 'Person',
  '@id': DOUGLAS_ID,
  name: 'Douglas Ekman',
  jobTitle: 'VD och medgrundare',
  worksFor: { '@id': ORG_ID },
  url: `${SITE_URL}/om-oss`,
  sameAs: ['https://www.linkedin.com/in/douglas-ekman/'],
};

/** Kort referens till organisationen (författare/utgivare i artiklarnas schema). */
export const orgRef = { '@id': ORG_ID };

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

/** Ett steg i brödsmulorna. Hem läggs till automatiskt; sista steget skickas utan item. */
export interface Crumb {
  name: string;
  /** Sökväg (/kunskapsbank) eller absolut URL. Utelämnas på sista steget. */
  href?: string;
}

/** Vilken sida som helst: @graph med organisation, sajt, Douglas, sidans nod och extra noder. */
export function pageGraph(opts: {
  url: string;
  title: string;
  description: string;
  image?: string;
  pageType?: PageType;
  breadcrumb?: Crumb[];
  /** Sidans huvudentitet (t.ex. artikelns @id) – sätts som WebPage.mainEntity. */
  mainEntity?: string;
  nodes?: object[];
}) {
  const { url, title, description, image = OG_IMAGE, pageType = 'WebPage', breadcrumb, mainEntity, nodes = [] } = opts;
  const extra: object[] = [];
  const page: Record<string, unknown> = {
    '@type': pageType,
    '@id': url,
    url,
    name: title,
    description,
    inLanguage: 'sv-SE',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
  };
  if (breadcrumb?.length) {
    const id = `${url}#breadcrumb`;
    page.breadcrumb = { '@id': id };
    extra.push(breadcrumbList(id, breadcrumb));
  }
  if (mainEntity) page.mainEntity = { '@id': mainEntity };
  return { '@context': 'https://schema.org', '@graph': [organization, website, douglas, page, ...extra, ...nodes] };
}

/** Hem › … › sista (utan item), enligt Googles riktlinjer för menysökvägar. */
export function breadcrumbList(id: string, crumbs: Crumb[]) {
  const all: Crumb[] = [{ name: 'Hem', href: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href && i < all.length - 1 ? { item: canonicalUrl(c.href) } : {}),
    })),
  };
}

/** FAQPage som nod i sidans graf (Douglas 2026-10-19: behåll). Ger inga rich results sedan maj 2026. */
export function faqPage(url: string, items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Kanonisk adress utan avslutande snedstreck (/kontakt, inte /kontakt/); startsidan = "/". */
export function canonicalUrl(pathname: string): string {
  if (/^https?:\/\//.test(pathname)) return pathname;
  const path = pathname.replace(/\/+$/, '') || '/';
  return new URL(path, SITE_URL).href;
}
