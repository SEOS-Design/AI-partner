// inview-video.ts – bakgrundsvideor spelas BARA när de syns.
//
// Markera en <video> med `data-inview-video` (och utan `autoplay`). När den är i
// vyn spelas den, utanför pausas den — så sidan inte avkodar flera videor
// samtidigt i bakgrunden (CPU/GPU, batteri). Videor med preload="none" laddas
// inte ens ner förrän de närmar sig vyn.
//
// Utan JS eller vid prefers-reduced-motion spelas ingenting: postern står kvar
// (komponenternas CSS döljer dessutom videon vid reduced-motion).
//
// Importeras från varje komponent som har en sådan video; Astro buntar modulen
// en gång, så den körs en gång och hittar alla videor på sidan.

const videos = document.querySelectorAll<HTMLVideoElement>('video[data-inview-video]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (videos.length && !reduced) {
  // play() returnerar ett promise som kan avvisas (autoplay-policy, avbruten
  // laddning). Videorna är mutade så det ska inte hända, men ett ohanterat
  // avvisande ska inte hamna som fel i konsolen.
  const play = (v: HTMLVideoElement) => v.play().catch(() => {});

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) play(v);
          else v.pause();
        }
      },
      // Börja ladda/spela strax innan videon kommer in, så postern inte
      // hinner synas som stillbild när man scrollar dit.
      { rootMargin: '200px 0px' },
    );
    videos.forEach((v) => io.observe(v));
    document.addEventListener('astro:before-swap', () => io.disconnect(), { once: true });
  } else {
    videos.forEach(play);
  }
}
