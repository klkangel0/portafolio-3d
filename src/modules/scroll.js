/**
 * ============================================================================
 * SCROLL
 * ----------------------------------------------------------------------------
 * Lenis da el scroll suave (inercia) y se sincroniza con GSAP ScrollTrigger.
 * Ademas desde aqui informamos a la escena 3D de:
 *   - el progreso general de la pagina (0 a 1)
 *   - la velocidad (para dar un "golpe" al nucleo cuando se baja rapido)
 *   - la seccion visible (para cambiar la paleta de color)
 * ============================================================================
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function iniciarScroll({ alProgreso, alVelocidad, alSeccion } = {}) {
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !movimientoReducido,
    touchMultiplier: 1.6,
    wheelMultiplier: 1,
  });

  const barra = document.getElementById('scrollProgress');
  const cabecera = document.getElementById('header');

  lenis.on('scroll', ({ progress, velocity, scroll }) => {
    // Barra de progreso de la cabecera
    if (barra) barra.style.transform = `scaleX(${progress || 0})`;

    // La cabecera se compacta al bajar
    cabecera?.classList.toggle('is-scrolled', scroll > 40);

    alProgreso?.(progress || 0);

    // Solo avisamos de velocidades altas para no saturar
    if (Math.abs(velocity) > 25) alVelocidad?.(velocity / 90);

    ScrollTrigger.update();
  });

  // Un unico bucle de tiempo para Lenis y GSAP
  gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
  gsap.ticker.lagSmoothing(0);

  /* --------------------------------------------------------------------- */
  /* Seccion activa: marca el enlace del menu y cambia la paleta 3D          */
  /* --------------------------------------------------------------------- */

  const enlaces = document.querySelectorAll('[data-nav], [data-nav-menu]');

  const marcarActivo = (id) => {
    enlaces.forEach((enlace) => {
      const destino = enlace.dataset.nav ?? enlace.dataset.navMenu;
      enlace.classList.toggle('is-active', destino === id);
    });
  };

  document.querySelectorAll('[data-section]').forEach((seccion) => {
    ScrollTrigger.create({
      trigger: seccion,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (!self.isActive) return;
        marcarActivo(seccion.id);
        alSeccion?.(seccion.dataset.palette);
      },
    });
  });

  /* --------------------------------------------------------------------- */
  /* Enlaces internos: que el salto tambien sea suave                        */
  /* --------------------------------------------------------------------- */

  document.addEventListener('click', (e) => {
    const enlace = e.target.closest('a[href^="#"]');
    if (!enlace) return;

    const id = enlace.getAttribute('href');
    if (!id || id === '#') return;

    const destino = document.querySelector(id);
    if (!destino) return;

    e.preventDefault();
    document.body.classList.remove('menu-abierto');
    lenis.scrollTo(destino, { offset: 0, duration: 1.4 });
  });

  return lenis;
}
