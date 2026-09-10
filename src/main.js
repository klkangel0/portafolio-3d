/**
 * ============================================================================
 * PORTAFOLIO · ÁNGEL MOTOS
 * Punto de entrada de la aplicacion.
 * ----------------------------------------------------------------------------
 * El orden importa:
 *   1. Se pinta el contenido a partir de los datos.
 *   2. Se trocean los textos que se van a animar.
 *   3. Arranca la escena 3D y su bucle de render.
 *   4. Se conecta el scroll (Lenis) con la escena y con ScrollTrigger.
 *   5. Se activan las interacciones (cursor, menu, filtros, video...).
 *   6. El preloader da paso al hero cuando todo esta listo.
 * ============================================================================
 */

import './style.css';
import gsap from 'gsap';

import { Escena } from './gl/escena.js';
import { pintarTodo } from './modules/render.js';
import { prepararTextos, entradaHero, iniciarAnimaciones } from './modules/animaciones.js';
import { iniciarPreloader } from './modules/preloader.js';
import { iniciarCursor } from './modules/cursor.js';
import { iniciarScroll } from './modules/scroll.js';
import {
  iniciarFiltros,
  iniciarMenu,
  iniciarVideo,
  iniciarCopiarEmail,
  iniciarBotonArriba,
} from './modules/interfaz.js';

/* 1 y 2. Contenido y textos ------------------------------------------------ */
pintarTodo();
prepararTextos();

/* 3. Escena 3D ------------------------------------------------------------- */
const escena = new Escena(document.getElementById('gl'));

// Un unico bucle para todo: GSAP ya nos da un ticker sincronizado con la pantalla
gsap.ticker.add(() => escena.render());

/* 4. Scroll ---------------------------------------------------------------- */
const lenis = iniciarScroll({
  alProgreso: (progreso) => escena.setProgreso(progreso),
  alVelocidad: (velocidad) => escena.impulso(velocidad),
  alSeccion: (paleta) => escena.setPaleta(paleta ?? 'oro'),
});

/* 5. Interacciones --------------------------------------------------------- */
iniciarCursor();
iniciarMenu();
iniciarFiltros();
iniciarVideo();
iniciarCopiarEmail();
iniciarBotonArriba(lenis);

/* 6. Entrada --------------------------------------------------------------- */
iniciarPreloader(() => {
  entradaHero();
  iniciarAnimaciones();
});

// Saludo para quien abra la consola
console.log(
  '%c¡Hola! 👋 Portafolio de Ángel Motos — hecho con Three.js, GSAP y Vite.',
  'color:#ffd60a;font-family:monospace;font-size:12px'
);
