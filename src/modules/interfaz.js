/**
 * ============================================================================
 * INTERFAZ
 * ----------------------------------------------------------------------------
 * Piezas sueltas de interaccion: filtros de proyectos, menu movil, reproductor
 * de video bajo demanda, copiar el email y el boton de volver arriba.
 * ============================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videoCV, profile } from '../data/content.js';

/* -------------------------------------------------------------------------- */
/* Filtros de proyectos                                                        */
/* -------------------------------------------------------------------------- */

export function iniciarFiltros() {
  const botones = [...document.querySelectorAll('.filter')];
  const tarjetas = [...document.querySelectorAll('.card')];
  const vacio = document.getElementById('projectsEmpty');
  if (!botones.length) return;

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const filtro = boton.dataset.filtro;

      botones.forEach((b) => {
        const activo = b === boton;
        b.classList.toggle('is-active', activo);
        b.setAttribute('aria-selected', String(activo));
      });

      let visibles = 0;

      tarjetas.forEach((tarjeta) => {
        const coincide = filtro === 'todos' || tarjeta.dataset.cat === filtro;

        if (coincide) {
          visibles += 1;
          tarjeta.hidden = false;
          gsap.fromTo(
            tarjeta,
            { opacity: 0, y: 30, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform' }
          );
        } else {
          gsap.to(tarjeta, {
            opacity: 0,
            y: -12,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              tarjeta.hidden = true;
            },
          });
        }
      });

      if (vacio) vacio.hidden = visibles > 0;
      ScrollTrigger.refresh();
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Menu a pantalla completa (movil)                                            */
/* -------------------------------------------------------------------------- */

export function iniciarMenu() {
  const boton = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  if (!boton || !menu) return;

  const alternar = (abrir) => {
    document.body.classList.toggle('menu-abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    menu.setAttribute('aria-hidden', String(!abrir));

    if (abrir) {
      gsap.fromTo(
        menu.querySelectorAll('.menuLink'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.15 }
      );
    }
  };

  boton.addEventListener('click', () => {
    alternar(!document.body.classList.contains('menu-abierto'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) alternar(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') alternar(false);
  });
}

/* -------------------------------------------------------------------------- */
/* Video bajo demanda                                                          */
/* -------------------------------------------------------------------------- */

export function iniciarVideo() {
  const player = document.getElementById('videoPlayer');
  if (!player) return;

  player.addEventListener(
    'click',
    () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoCV.youtubeId}?autoplay=1&rel=0`;
      iframe.title = 'Videocurrículum de Ángel Motos';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      player.innerHTML = '';
      player.appendChild(iframe);
      player.classList.add('is-playing');
      player.style.backgroundImage = 'none';
    },
    { once: true }
  );
}

/* -------------------------------------------------------------------------- */
/* Copiar email                                                                */
/* -------------------------------------------------------------------------- */

export function iniciarCopiarEmail() {
  const boton = document.getElementById('mailBtn');
  if (!boton) return;

  boton.addEventListener('click', async (e) => {
    // Si el portapapeles no esta disponible dejamos que abra el cliente de correo
    if (!navigator.clipboard) return;

    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      boton.classList.add('is-copied');
      const nota = boton.querySelector('small');
      const original = nota.textContent;
      nota.textContent = '¡Copiado!';

      setTimeout(() => {
        boton.classList.remove('is-copied');
        nota.textContent = original;
      }, 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Volver arriba                                                               */
/* -------------------------------------------------------------------------- */

export function iniciarBotonArriba(lenis) {
  const boton = document.getElementById('toTop');
  if (!boton) return;

  boton.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
