// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Sajtens adress: används för canonical, og:url och strukturerad data.
  site: 'https://www.aipartner.se',
  // URL:er utan avslutande snedstreck (/kontakt, inte /kontakt/) – samma format som
  // gamla aipartner.se har i Googles index. vercel.json 308:ar /kontakt/ → /kontakt.
  trailingSlash: 'never',
  // Gamla URL:er som inte får ge 404 (docs/innehall-utan-cms.md punkt 5).
  // OBS: i ett statiskt bygge blir detta en HTML-omdirigering (meta refresh). Den
  // äkta 301:an ligger i vercel.json – lägg varje ny omdirigering på båda ställena.
  redirects: {
    '/kunskapsbank/ai-agenter---nasta-steg-i-den-digitala-transformationen': {
      status: 301,
      destination: '/kunskapsbank/vad-ar-en-ai-agent',
    },
  },
});
