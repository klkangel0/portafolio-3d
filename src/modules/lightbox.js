/**
 * ============================================================================
 * LIGHTBOX
 * ----------------------------------------------------------------------------
 * Al pulsar una captura del caso de estudio, una copia de la imagen crece
 * desde su sitio exacto hasta ocupar casi toda la pantalla (estilo FLIP), y
 * se encoge de vuelta al cerrarla.
 * ============================================================================
 */

import gsap from 'gsap';
import { iconos } from './iconos.js';

const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let capa;
let img;
let boton;
let origen = null;
let abierto = false;

function crearCapa() {
  capa = document.createElement('div');
  capa.className = 'lightbox';
  capa.hidden = true;
  capa.setAttribute('data-lenis-prevent', '');
  capa.innerHTML = `
    <div class="lightbox__fondo" data-cerrar-lightbox></div>
    <button type="button" class="lightbox__cerrar" aria-label="Cerrar la vista ampliada"
            data-cursor="Cerrar" data-cerrar-lightbox>${iconos.cerrar}</button>
    <img class="lightbox__img" alt="" />`;

  document.body.appendChild(capa);
  img = capa.querySelector('.lightbox__img');
  boton = capa.querySelector('.lightbox__cerrar');

  capa.addEventListener('click', (e) => {
    if (e.target.closest('[data-cerrar-lightbox]')) cerrar();
  });
}

/** Encaja la imagen dentro de ~92% de la pantalla respetando su proporcion. */
function calcularDestino(rectOrigen) {
  const ratio =
    (img.naturalWidth && img.naturalHeight && img.naturalWidth / img.naturalHeight) ||
    rectOrigen.width / rectOrigen.height;

  // En pantallas estrechas se aprovecha casi todo el ancho: una captura de
  // escritorio ya sale bastante pequena de por si
  const estrecha = window.innerWidth < 700;
  const maxW = window.innerWidth * (estrecha ? 0.96 : 0.92);
  const maxH = window.innerHeight * (estrecha ? 0.86 : 0.92);

  let width = maxW;
  let height = width / ratio;
  if (height > maxH) {
    height = maxH;
    width = height * ratio;
  }

  return {
    width,
    height,
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
  };
}

function abrir(origenImg) {
  if (abierto) return;
  if (!capa) crearCapa();

  origen = origenImg;
  abierto = true;

  const rect = origenImg.getBoundingClientRect();
  img.src = origenImg.currentSrc || origenImg.src;
  img.alt = origenImg.alt || '';

  capa.hidden = false;
  document.body.classList.add('lightbox-abierto');

  gsap.set(img, {
    position: 'fixed',
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: getComputedStyle(origenImg).borderRadius,
  });
  gsap.set(capa.querySelector('.lightbox__fondo'), { opacity: 0 });
  gsap.set(boton, { opacity: 0, scale: 0.8 });

  if (movimientoReducido) {
    gsap.set(capa.querySelector('.lightbox__fondo'), { opacity: 1 });
    gsap.set(img, { ...calcularDestino(rect), borderRadius: 14 });
    gsap.set(boton, { opacity: 1, scale: 1 });
    return;
  }

  gsap
    .timeline({ defaults: { duration: 0.65, ease: 'expo.inOut' } })
    .to(capa.querySelector('.lightbox__fondo'), { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
    .to(img, { ...calcularDestino(rect), borderRadius: 14 }, 0)
    .to(boton, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 0.25);
}

function cerrar() {
  if (!abierto || !origen) return;
  abierto = false;

  const rect = origen.getBoundingClientRect();
  const destino = origen;

  gsap.to(boton, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' });
  gsap.to(capa.querySelector('.lightbox__fondo'), { opacity: 0, duration: 0.35, ease: 'power2.in' });
  gsap.to(img, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: getComputedStyle(destino).borderRadius,
    duration: movimientoReducido ? 0.2 : 0.45,
    ease: 'power3.inOut',
    onComplete: () => {
      capa.hidden = true;
      document.body.classList.remove('lightbox-abierto');
      origen = null;
    },
  });
}

export function lightboxAbierto() {
  return abierto;
}

export function iniciarLightbox() {
  document.addEventListener('click', (e) => {
    const objetivo = e.target.closest('[data-lightbox]');
    if (!objetivo) return;
    abrir(objetivo);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto) cerrar();
  });
}
