// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Sajtens adress: används för canonical, og:url och strukturerad data.
  site: 'https://www.aipartner.se',
  // Gamla URL:er som inte får ge 404 (docs/innehall-utan-cms.md punkt 5).
  // OBS: i ett statiskt bygge blir detta en HTML-omdirigering; en äkta 301 läggs
  // hos hostingen (Netlify _redirects / vercel.json) när deploy väljs.
  redirects: {
    '/kunskapsbank/ai-agenter---nasta-steg-i-den-digitala-transformationen': {
      status: 301,
      destination: '/kunskapsbank/vad-ar-en-ai-agent',
    },
  },
});
