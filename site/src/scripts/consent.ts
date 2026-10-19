// consent.ts – samtyckesgrinden för Google Analytics 4 (2026-10-19).
//
// GA4-egendomen G-148Q5CPJ2K är samma som gamla aipartner.se (Webflow) använde, så
// historiken fortsätter i samma vy. INGET laddas förrän någon sagt ja till statistik:
// Consent Mode-standardvärdena nedan är "denied", och gtag.js hämtas först i grant().
// Den som säger nej (eller inget) betalar inte en byte, och Lighthouse mäter den rena sidan.
//
// Cookierutan är SEOS egen (seos-cookie-banner.vercel.app, samma som seosdesign.se)
// och läggs in av kollegan. Den exponerar window.SEOS med hasConsent(kategori) och
// onConsentChange(lyssnare). Den här filen väntar på det API:et och gör inget själv
// förrän det finns. Tills rutan finns kan man testa med window.aipConsent.grant() i
// konsolen – på en liveadress.
//
// Bara på liveadresserna (samma princip som seosdesign.se, beslut 191): ett ja på en
// Vercel-förhandsvisning eller localhost laddar ingen tagg, så testtrafik aldrig hamnar
// i den riktiga egendomen. localStorage 'aip:tags' = 'on' slår på taggarna ändå, i den
// webbläsaren, för test.

const GA_ID = 'G-148Q5CPJ2K';
const LIVE_HOSTS = ['www.aipartner.se', 'aipartner.se'];
const TAGS_FLAG = 'aip:tags';

type SeosConsent = { necessary: boolean; analytics: boolean; marketing: boolean; functional: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    SEOS?: {
      hasConsent: (category: keyof SeosConsent) => boolean;
      onConsentChange: (listener: (consent: SeosConsent) => void) => () => void;
    };
    aipConsent?: { grant: () => void; withdraw: () => void; loaded: () => boolean };
  }
}

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]): void {
  // gtag.js läser arguments-objektet, inte en array – därför en riktig funktion.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}
window.gtag = gtag;

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500,
});

function tagsAllowedHere(): boolean {
  if (LIVE_HOSTS.includes(location.hostname)) return true;
  try {
    return localStorage.getItem(TAGS_FLAG) === 'on';
  } catch {
    return false;
  }
}

let loaded = false;

function grant(): void {
  gtag('consent', 'update', { analytics_storage: 'granted' });
  if (loaded || !tagsAllowedHere()) return;
  loaded = true;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: true });
  const s = document.createElement('script');
  s.async = true;
  s.setAttribute('data-seos-own', ''); // släpps igenom cookierutans skriptspärr
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

const GA_COOKIE = /^_ga(?:_\w+)?$/;
function eraseGaCookies(): void {
  const labels = location.hostname.split('.');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]!.trim();
    if (!GA_COOKIE.test(name)) continue;
    for (let i = 0; i < labels.length; i++) {
      const domain = i ? `; domain=${labels.slice(i - 1).join('.')}` : '';
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

function withdraw(): void {
  gtag('consent', 'update', { analytics_storage: 'denied' });
  eraseGaCookies();
  // En laddad tagg går inte att stänga av – sidan laddas om utan den.
  if (loaded) location.reload();
}

window.aipConsent = { grant, withdraw, loaded: () => loaded };

/** Kopplar in SEOS-rutan när (om) den finns. Försöker i 15 s, sedan ger den upp tyst. */
function bind(): boolean {
  const seos = window.SEOS;
  if (!seos) return false;
  if (seos.hasConsent('analytics')) grant();
  seos.onConsentChange((c) => (c.analytics ? grant() : withdraw()));
  return true;
}
if (!bind()) {
  let tries = 0;
  const timer = setInterval(() => {
    if (bind() || ++tries > 30) clearInterval(timer);
  }, 500);
}
