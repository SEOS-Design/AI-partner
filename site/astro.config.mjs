// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Sajtens adress: används för canonical, og:url och strukturerad data.
  site: 'https://www.aipartner.se',
  // URL:er utan avslutande snedstreck (/kontakt, inte /kontakt/) – samma format som
  // gamla aipartner.se har i Googles index. vercel.json 308:ar /kontakt/ → /kontakt.
  trailingSlash: 'never',
  // Vercel-adaptern (2026-10-19): alla sidor förblir statiska; bara src/pages/api/lead.ts
  // (kontaktformuläret → Resend) körs on-demand via `export const prerender = false`.
  adapter: vercel(),
  // Gamla URL:er som inte får ge 404 (docs/innehall-utan-cms.md punkt 5).
  // OBS: i ett statiskt bygge blir detta en HTML-omdirigering (meta refresh). Den
  // äkta 301:an ligger i vercel.json – lägg varje ny omdirigering på båda ställena.
  redirects: {
    '/kunskapsbank/ai-agenter---nasta-steg-i-den-digitala-transformationen': {
      status: 301,
      destination: '/kunskapsbank/vad-ar-en-ai-agent',
    },
    // De fem artiklar som inte flyttades över (2026-10-19). ai-seo-… går till seosdesign.se
    // och ligger bara i vercel.json.
    '/kunskapsbank/ai-for-smaforetag': { status: 301, destination: '/kunskapsbank/vad-betyder-ai' },
    '/kunskapsbank/ai-policy-i-foretag-darfor-behover-ni-en-strategi-for-ansvarsfull-ai': {
      status: 301,
      destination: '/kunskapsbank/skugg-ai',
    },
    '/kunskapsbank/ai-strategi-for-ditt-foretag': { status: 301, destination: '/kunskapsbank/processkartlaggning' },
    '/kunskapsbank/sa-anvander-foretag-ai-i-redovisning-hr-och-marknadsforing': { status: 301, destination: '/tjanster' },
  },
});
