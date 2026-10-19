/**
 * POST /api/lead – kontaktformuläret på /kontakt (2026-10-19).
 *
 * Tar emot `namn`, `epost`, `process` (+ honungsfällan `webbplats`, som ska vara tom),
 * validerar, och skickar ett mejl via Resends REST-API till LEADS_TO_EMAIL. Inget lagras:
 * mejlet är enda kopian. Loggar aldrig fältvärden, bara händelser.
 *
 * Miljövariabler (Vercel, Production + Preview): RESEND_API_KEY · LEADS_FROM_EMAIL
 * (t.ex. "AI Partner <formular@notiser.seosdesign.se>") · LEADS_TO_EMAIL (kommaseparerad).
 * Saknas någon → 503 och besökaren får e-postadressen i stället. Nyckeln är låst till
 * avsändardomänen i Resend; en annan avsändare ger 403 från Resend → samma 503.
 *
 * `prerender = false` gör detta till byggets enda on-demand-route (Vercel-adaptern i
 * astro.config.mjs). Alla sidor är fortfarande statiska. Astros security.checkOrigin
 * (standard: på) avvisar formulärposter från andra origins innan koden här körs – sätt
 * därför aldrig `Referrer-Policy: no-referrer` på sajten.
 */
import type { APIRoute } from 'astro';
import { CONTACT } from '../../lib/site';

export const prerender = false;

const MAX_BODY = 16_000; // bytes
const LIMITS = { namn: 120, epost: 254, process: 4000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND = 'https://api.resend.com/emails';

type Fields = { namn: string; epost: string; process: string; webbplats: string };

const log = (event: string, data: Record<string, unknown> = {}) =>
  console.log(JSON.stringify({ event, ...data }));

function wantsJson(req: Request): boolean {
  return (req.headers.get('accept') ?? '').includes('application/json');
}

/** JSON eller urlencoded – samma fält. null vid fel innehållstyp/för stor kropp. */
async function readFields(req: Request): Promise<{ fields: Fields } | { error: number }> {
  const type = req.headers.get('content-type') ?? '';
  const raw = await req.text();
  if (raw.length > MAX_BODY) return { error: 413 };
  let get: (k: string) => string;
  if (type.includes('application/json')) {
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return { error: 400 };
    }
    if (typeof body !== 'object' || body === null) return { error: 400 };
    const o = body as Record<string, unknown>;
    get = (k) => (typeof o[k] === 'string' ? (o[k] as string) : '');
  } else if (type.includes('application/x-www-form-urlencoded')) {
    const params = new URLSearchParams(raw);
    get = (k) => params.get(k) ?? '';
  } else {
    return { error: 415 };
  }
  const clean = (s: string) => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim();
  return {
    fields: {
      namn: clean(get('namn')),
      epost: clean(get('epost')),
      process: clean(get('process')),
      webbplats: clean(get('webbplats')),
    },
  };
}

function validate(f: Fields): string | null {
  if (f.webbplats) return 'spam'; // honungsfällan – svara som om allt gick bra
  if (!f.namn || f.namn.length > LIMITS.namn) return 'namn';
  if (!f.epost || f.epost.length > LIMITS.epost || !EMAIL.test(f.epost)) return 'epost';
  if (f.process.length > LIMITS.process) return 'process';
  return null;
}

function readEnv(): { apiKey: string; from: string; to: string[] } | null {
  const apiKey = process.env.RESEND_API_KEY ?? '';
  const from = process.env.LEADS_FROM_EMAIL ?? '';
  const to = (process.env.LEADS_TO_EMAIL ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to };
}

async function send(f: Fields, env: NonNullable<ReturnType<typeof readEnv>>): Promise<boolean> {
  const text = [
    `Namn: ${f.namn}`,
    `E-post: ${f.epost}`,
    '',
    'Vad vill ni automatisera?',
    f.process || '(inget skrivet)',
    '',
    `Skickat ${new Date().toISOString()} via aipartner.se/kontakt`,
  ].join('\n');
  const signal = AbortSignal.timeout(8000);
  try {
    const res = await fetch(RESEND, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: env.from,
        to: env.to,
        reply_to: f.epost,
        subject: `Ny förfrågan via aipartner.se – ${f.namn}`,
        text,
      }),
      signal,
    });
    if (!res.ok) {
      log('lead.send-failed', { status: res.status });
      return false;
    }
    return true;
  } catch {
    log('lead.send-failed', { status: 0, reason: signal.aborted ? 'timeout' : 'network' });
    return false;
  }
}

const NO_STORE = { 'Cache-Control': 'no-store' };

/** Svar: JSON till fetch-klienten, en enkel HTML-sida till en post utan JavaScript. */
function respond(kind: 'ok' | 'invalid' | 'down', json: boolean, field?: string): Response {
  const status = kind === 'ok' ? 200 : kind === 'invalid' ? 400 : 503;
  if (json) {
    return new Response(JSON.stringify({ ok: kind === 'ok', kind, field: field ?? null, email: CONTACT.email }), {
      status,
      headers: { ...NO_STORE, 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  const msg =
    kind === 'ok'
      ? 'Tack, vi återkommer inom kort.'
      : kind === 'invalid'
        ? 'Något fält saknas eller är felaktigt. Gå tillbaka och kontrollera namn och e-post.'
        : `Formuläret kunde inte skickas just nu. Mejla oss direkt på ${CONTACT.email}.`;
  const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><title>${kind === 'ok' ? 'Tack' : 'Fel'} – AI Partner</title><meta name="robots" content="noindex"></head><body style="font-family:system-ui;background:#0a0a0a;color:#fff;padding:48px;max-width:40em"><p>${msg}</p><p><a href="/kontakt" style="color:#fff">Tillbaka till kontaktsidan</a></p></body></html>`;
  return new Response(html, { status, headers: { ...NO_STORE, 'Content-Type': 'text/html; charset=utf-8' } });
}

export const POST: APIRoute = async ({ request }) => {
  const json = wantsJson(request);
  const read = await readFields(request);
  if ('error' in read) {
    log('lead.refused', { status: read.error });
    return new Response(null, { status: read.error, headers: NO_STORE });
  }
  const problem = validate(read.fields);
  if (problem === 'spam') {
    log('lead.spam');
    return respond('ok', json);
  }
  if (problem) {
    log('lead.invalid', { field: problem });
    return respond('invalid', json, problem);
  }
  const env = readEnv();
  if (!env) {
    log('lead.config', { error: 'missing env: RESEND_API_KEY, LEADS_FROM_EMAIL or LEADS_TO_EMAIL' });
    return respond('down', json);
  }
  const sent = await send(read.fields, env);
  log(sent ? 'lead.sent' : 'lead.down');
  return respond(sent ? 'ok' : 'down', json);
};

/** Alla andra metoder (GET, HEAD, OPTIONS …). */
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST', ...NO_STORE } });
