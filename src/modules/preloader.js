/**
 * Pantalla de carga. Cuenta hasta 100 mientras se cargan fuentes e imagenes y
 * despues sube como un telon dejando ver el hero.
 */

import gsap from 'gsap';

/** Espera a las fuentes con un tope de tiempo para no bloquear nunca la entrada. */
function esperarRecursos(msMaximo = 2500) {
  const fuentes = document.fonts ? document.fonts.ready : Promise.resolve();
  const tope = new Promise((resolve) => setTimeout(resolve, msMaximo));
  return Promise.race([fuentes, tope]);
}

/**
 * @param {Function} alTerminar callback que arranca la animacion del hero
 */
export async function iniciarPreloader(alTerminar) {
  const preloader = document.getElementById('preloader');
  const contador = document.getElementById('preloaderCount');
  const relleno = document.getElementById('preloaderFill');

  if (!preloader) {
    alTerminar?.();
    return;
  }

  await esperarRecursos();

  const progreso = { valor: 0 };
  const tl = gsap.timeline();

  tl.to('.preloader__name .letra > i', {
    y: 0,
    duration: 1,
    ease: 'expo.out',
    stagger: 0.025,
  })
    .to(
      progreso,
      {
        valor: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(progreso.valor);
          contador.textContent = v;
          relleno.style.transform = `scaleX(${v / 100})`;
        },
      },
      0.25
    )
    .to('.preloader__inner', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, '-=0.1')
    .to(preloader, {
      yPercent: -100,
      duration: 1.1,
      ease: 'expo.inOut',
      onStart: () => document.body.classList.remove('is-loading'),
      onComplete: () => preloader.remove(),
    })
    .add(() => alTerminar?.(), '-=0.65');
}
