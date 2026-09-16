/**
 * ============================================================================
 * CASO DE ESTUDIO
 * ----------------------------------------------------------------------------
 * La capa que se abre al pulsar una tarjeta de proyecto: el panel entra desde
 * abajo, el contenido aparece por bloques segun se baja y el scroll de la
 * pagina se congela mientras tanto.
 *
 * El contenido se inyecta al abrir (no vive en el HTML) para que la primera
 * carga de la web no se lleve el peso de todas las capturas.
 * ============================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { proyectos } from '../data/content.js';
import { htmlCaso } from './render.js';
import { iconos } from './iconos.js';
import { lightboxAbierto } from './lightbox.js';

const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let capa;
let panel;
let cuerpo;
let abierto = null;
let disparadores = [];
let devolverFoco = null;

/** La capa vive fuera de <main>, para que nada de la pagina la recorte. */
function crearCapa() {
  capa = document.createElement('div');
  capa.className = 'caso';
  capa.id = 'caso';
  capa.hidden = true;
  capa.innerHTML = `
    <div class="caso__fondo" data-cerrar-caso></div>
    <section class="caso__panel" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Caso de estudio" tabindex="-1">
      <header class="caso__barra">
        <span class="caso__barraTitulo"></span>
        <button type="button" class="caso__cerrar magnetic" data-cerrar-caso
                aria-label="Cerrar el caso" data-cursor="Cerrar">${iconos.cerrar}</button>
      </header>
      <div class="caso__cuerpo"></div>
    </section>`;

  document.body.appendChild(capa);
  panel = capa.querySelector('.caso__panel');
  cuerpo = capa.querySelector('.caso__cuerpo');

  capa.addEventListener('click', (e) => {
    if (e.target.closest('[data-cerrar-caso]')) cerrar();
  });
}

/**
 * Los bloques aparecen al entrar en el panel. Usamos ScrollTrigger con el
 * panel como contenedor de scroll, no la ventana.
 */
function animarContenido() {
  const bloques = [...cuerpo.querySelectorAll('[data-caso-anim]')];

  if (movimientoReducido) {
    gsap.set(bloques, { opacity: 1, y: 0 });
    return;
  }

  bloques.forEach((bloque) => {
    disparadores.push(
      gsap.from(bloque, {
        y: 46,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bloque,
          scroller: panel,
          start: 'top 92%',
          once: true,
        },
      }).scrollTrigger
    );
  });

  ScrollTrigger.refresh();
}

/** Apertura: fondo, panel desde abajo y las primeras piezas escalonadas. */
export function abrir(id) {
  const proyecto = proyectos.find((p) => p.id === id);
  if (!proyecto?.caso || abierto === id) return;

  devolverFoco = document.activeElement;
  abierto = id;

  cuerpo.innerHTML = htmlCaso(proyecto);
  capa.querySelector('.caso__barraTitulo').textContent = proyecto.titulo;
  capa.style.setProperty('--c', proyecto.color);
  capa.hidden = false;
  panel.scrollTop = 0;
  document.body.classList.add('caso-abierto');

  const primeros = [...cuerpo.querySelectorAll('.casoHero [data-caso-anim]')];

  gsap
    .timeline({ defaults: { ease: 'expo.out' }, onComplete: animarContenido })
    .fromTo(
      capa.querySelector('.caso__fondo'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(
      panel,
      { yPercent: movimientoReducido ? 0 : 8, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: movimientoReducido ? 0.2 : 0.9 },
      '-=0.3'
    )
    .fromTo(
      primeros,
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
      '-=0.55'
    );

  // Se enfoca el panel, no el boton: asi el lector de pantalla entra en el
  // dialogo pero no aparece el anillo de foco encima de la cruz
  panel.focus({ preventScroll: true });
}

/** Cierre: se limpia el contenido para no dejar imagenes ni triggers vivos. */
export function cerrar() {
  if (!abierto) return;
  abierto = null;

  disparadores.forEach((t) => t?.kill());
  disparadores = [];

  gsap.to(panel, {
    yPercent: movimientoReducido ? 0 : 5,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
  });

  gsap.to(capa.querySelector('.caso__fondo'), {
    opacity: 0,
    duration: 0.45,
    onComplete: () => {
      capa.hidden = true;
      cuerpo.innerHTML = '';
      document.body.classList.remove('caso-abierto');
      gsap.set(panel, { clearProps: 'all' });
      if (devolverFoco) devolverFoco.focus({ preventScroll: true });
    },
  });
}

export function iniciarCasos() {
  if (!proyectos.some((p) => p.caso)) return;

  crearCapa();

  document.addEventListener('click', (e) => {
    const gatillo = e.target.closest('[data-abrir-caso]');
    if (!gatillo) return;
    e.preventDefault();
    abrir(gatillo.dataset.abrirCaso);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto && !lightboxAbierto()) cerrar();
  });
}
