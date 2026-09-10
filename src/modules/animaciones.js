/**
 * ============================================================================
 * ANIMACIONES (GSAP + ScrollTrigger)
 * ----------------------------------------------------------------------------
 * Todo lo que se mueve en el DOM: textos que suben letra a letra, secciones que
 * aparecen al hacer scroll, contadores, barras de habilidad, botones magneticos
 * y tarjetas con inclinacion 3D.
 * ============================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esTactil = window.matchMedia('(hover: none)').matches;

/* -------------------------------------------------------------------------- */
/* Utilidades para trocear texto                                               */
/* -------------------------------------------------------------------------- */

/**
 * Envuelve cada palabra en un <span> con overflow oculto para poder hacer el
 * clasico efecto de "las palabras suben desde abajo".
 */
export function dividirEnPalabras(el) {
  const lineas = el.textContent.trim().split('\n');

  el.innerHTML = lineas
    .map((linea) => {
      const palabras = linea
        .trim()
        .split(/\s+/)
        .map((palabra) => `<span class="palabra"><i>${palabra}</i></span>`)
        .join(' ');
      return `<span class="linea">${palabras}</span>`;
    })
    .join('');

  return el.querySelectorAll('.palabra > i');
}

/** Igual que la anterior pero letra a letra. */
export function dividirEnLetras(el) {
  const texto = el.textContent.trim();

  el.innerHTML = [...texto]
    .map((letra) =>
      letra === ' '
        ? '<span class="letra letra--espacio">&nbsp;</span>'
        : `<span class="letra"><i>${letra}</i></span>`
    )
    .join('');

  return el.querySelectorAll('.letra > i');
}

/* -------------------------------------------------------------------------- */
/* Preparacion: se llama antes de mostrar nada para evitar parpadeos           */
/* -------------------------------------------------------------------------- */

export function prepararTextos() {
  document.querySelectorAll('[data-split], [data-split-big]').forEach((el) => {
    if (el.dataset.listo) return;
    dividirEnLetras(el);
    el.dataset.listo = '1';
  });

  document.querySelectorAll('[data-lines]').forEach((el) => {
    if (el.dataset.listo) return;
    dividirEnPalabras(el);
    el.dataset.listo = '1';
  });
}

/* -------------------------------------------------------------------------- */
/* Entrada del hero                                                            */
/* -------------------------------------------------------------------------- */

export function entradaHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.to('.hero__title .letra > i', {
    y: 0,
    duration: 1.5,
    stagger: { each: 0.028, from: 'start' },
  })
    .from(
      '.hero__eyebrow',
      { y: 24, opacity: 0, duration: 1 },
      '-=1.2'
    )
    .from('#heroTagline', { y: 24, opacity: 0, duration: 1 }, '-=0.9')
    .from('.hero__actions .btn', { y: 26, opacity: 0, duration: 1, stagger: 0.09 }, '-=0.85')
    .from('.hero__socials .socialBtn', { y: 20, opacity: 0, duration: 0.8, stagger: 0.06 }, '-=0.8')
    .from('.header', { y: -80, opacity: 0, duration: 1 }, '-=1.3')
    .from('.hero__scroll, .hero__meta', { opacity: 0, duration: 1, stagger: 0.1 }, '-=0.8');

  return tl;
}

/* -------------------------------------------------------------------------- */
/* Revelados al hacer scroll                                                   */
/* -------------------------------------------------------------------------- */

export function revelados() {
  // Bloques simples: suben y aparecen
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      y: movimientoReducido ? 0 : 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Titulos: palabra a palabra
  gsap.utils.toArray('[data-lines]').forEach((titulo) => {
    gsap.to(titulo.querySelectorAll('.palabra > i'), {
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.045,
      scrollTrigger: { trigger: titulo, start: 'top 85%', once: true },
    });
  });

  // Titular grande de contacto: letra a letra
  gsap.utils.toArray('[data-split-big]').forEach((titulo) => {
    gsap.to(titulo.querySelectorAll('.letra > i'), {
      y: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.03,
      scrollTrigger: { trigger: titulo, start: 'top 85%', once: true },
    });
  });

  // Tarjetas de proyecto: entran alternando lado
  gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.from(card, {
      y: 70,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 82%', once: true },
    });

    if (!movimientoReducido) {
      gsap.to(card.querySelector('.card__media'), {
        yPercent: i % 2 === 0 ? -8 : 8,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });
}

/** Contadores numericos de la seccion "Sobre mi". */
export function contadores() {
  gsap.utils.toArray('[data-contador]').forEach((el) => {
    const destino = Number(el.dataset.contador);
    const sufijo = el.dataset.sufijo ?? '';
    const objeto = { valor: 0 };

    gsap.to(objeto, {
      valor: destino,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(objeto.valor) + sufijo;
      },
    });
  });
}

/** Barras de nivel del stack. */
export function barras() {
  gsap.utils.toArray('.skill').forEach((skill) => {
    const nivel = Number(skill.dataset.nivel);
    gsap.fromTo(
      skill.querySelector('.skill__bar > i'),
      { scaleX: 0 },
      {
        scaleX: nivel / 100,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: skill, start: 'top 92%', once: true },
      }
    );
  });
}

/** Parallax vertical suave para elementos con data-parallax. */
export function parallax() {
  if (movimientoReducido) return;

  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const fuerza = Number(el.dataset.parallax) || 0.1;
    gsap.to(el, {
      yPercent: -fuerza * 100,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Interacciones de raton                                                      */
/* -------------------------------------------------------------------------- */

/** Botones que "persiguen" ligeramente al cursor. */
export function magneticos() {
  if (esTactil || movimientoReducido) return;

  document.querySelectorAll('.magnetic').forEach((el) => {
    const fuerza = 0.35;

    el.addEventListener('pointermove', (e) => {
      const caja = el.getBoundingClientRect();
      const x = e.clientX - caja.left - caja.width / 2;
      const y = e.clientY - caja.top - caja.height / 2;
      gsap.to(el, { x: x * fuerza, y: y * fuerza, duration: 0.6, ease: 'power3.out' });
    });

    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/** Inclinacion 3D de las imagenes de proyecto al pasar el raton. */
export function inclinacion() {
  if (esTactil || movimientoReducido) return;

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const caja = el.getBoundingClientRect();
      const x = (e.clientX - caja.left) / caja.width - 0.5;
      const y = (e.clientY - caja.top) / caja.height - 0.5;

      gsap.to(el, {
        rotateY: x * 12,
        rotateX: -y * 12,
        scale: 1.02,
        duration: 0.7,
        ease: 'power3.out',
        transformPerspective: 900,
      });
    });

    el.addEventListener('pointerleave', () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power3.out' });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Reloj en vivo del hero                                                      */
/* -------------------------------------------------------------------------- */

export function reloj() {
  const el = document.getElementById('clock');
  if (!el) return;

  const pintar = () => {
    el.textContent = new Date().toLocaleTimeString('es-ES', { hour12: false });
  };

  pintar();
  setInterval(pintar, 1000);
}

/** Arranca todas las animaciones ligadas al scroll. */
export function iniciarAnimaciones() {
  revelados();
  contadores();
  barras();
  parallax();
  magneticos();
  inclinacion();
  reloj();
  ScrollTrigger.refresh();
}
