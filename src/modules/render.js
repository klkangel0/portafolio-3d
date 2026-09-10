/**
 * ============================================================================
 * RENDER DEL CONTENIDO
 * ----------------------------------------------------------------------------
 * Coge los datos de `src/data/content.js` y construye el HTML de cada seccion.
 * Asi el contenido esta en un unico sitio y el markup no se repite a mano.
 * ============================================================================
 */

import {
  profile,
  nav,
  socials,
  sobremi,
  stack,
  marquesina,
  proyectos,
  filtros,
  videoCV,
  contacto,
} from '../data/content.js';
import { iconos } from './iconos.js';

const $ = (selector) => document.querySelector(selector);

/** URL del icono de una tecnologia en el CDN de Simple Icons. */
const iconoTech = (slug) => `https://cdn.simpleicons.org/${slug}`;

/* -------------------------------------------------------------------------- */

function pintarNavegacion() {
  $('#nav').innerHTML = nav
    .map(
      (item) => `
      <a class="navLink" href="#${item.id}" data-nav="${item.id}">
        <span class="navLink__text">${item.label}</span>
      </a>`
    )
    .join('');

  $('#menuNav').innerHTML = nav
    .map(
      (item, i) => `
      <a class="menuLink" href="#${item.id}" data-nav-menu="${item.id}">
        <small>0${i + 1}</small>
        <span>${item.label}</span>
      </a>`
    )
    .join('');

  $('#menuSocials').innerHTML = socials
    .map(
      (red) =>
        `<a href="${red.url}" target="_blank" rel="noopener noreferrer">${red.label}</a>`
    )
    .join('');
}

function pintarHero() {
  $('#heroTagline').textContent = profile.tagline;
  $('#heroLocation').textContent = profile.ubicacion;
  $('#cvBtn').setAttribute('href', profile.cv);
  $('#heroStatus').textContent = profile.disponible
    ? 'Disponible para nuevos proyectos'
    : profile.rol;

  $('#heroSocials').innerHTML = socials
    .map(
      (red) => `
      <a class="socialBtn magnetic" href="${red.url}" target="_blank" rel="noopener noreferrer"
         aria-label="${red.label}" data-cursor="${red.label}">
        ${iconos[red.id] ?? ''}
      </a>`
    )
    .join('');
}

/**
 * Las fotos ya vienen puestas en el HTML para que empiecen a cargar cuanto
 * antes; aqui solo las sincronizamos con content.js, que es donde se cambian.
 * Si la ruta es la misma el navegador no lanza ninguna peticion extra.
 */
function pintarImagenes() {
  const avatar = document.querySelector('.header__avatar');
  if (avatar) avatar.src = profile.avatar;

  const retrato = document.querySelector('.about__photo img');
  if (retrato) retrato.src = profile.foto;
}

function pintarBanda() {
  const palabras = [
    'Full Stack Developer',
    'Vue',
    'JavaScript',
    'PHP',
    'MySQL',
    'Node.js',
    'Interfaces con carácter',
    'Disponible para trabajar',
  ];

  const grupo = `<div class="band__group">${palabras
    .map((p) => `<span>${p}</span><i class="band__star">✦</i>`)
    .join('')}</div>`;

  // Dos grupos identicos: el bucle CSS mueve el track un 50% y no se nota el corte
  $('#bandTrack').innerHTML = grupo + grupo;
}

function pintarSobreMi() {
  $('#aboutTitle').textContent = sobremi.titulo;

  $('#aboutText').innerHTML = sobremi.parrafos
    .map((p) => `<p class="reveal">${p}</p>`)
    .join('');

  $('#aboutLangs').innerHTML = sobremi.idiomas
    .map(
      (l) => `
      <li class="reveal">
        <span class="about__lang">${l.idioma}</span>
        <span class="about__level">${l.nivel}</span>
      </li>`
    )
    .join('');

  $('#stats').innerHTML = sobremi.datos
    .map(
      (d) => `
      <li class="stat reveal">
        <span class="stat__num" data-contador="${d.valor}" data-sufijo="${d.sufijo}">0${d.sufijo}</span>
        <span class="stat__label">${d.label}</span>
      </li>`
    )
    .join('');
}

function pintarStack() {
  $('#stackGrid').innerHTML = stack
    .map(
      (grupo, i) => `
      <article class="stackGroup reveal" style="--c:${grupo.color}">
        <header class="stackGroup__head">
          <span class="stackGroup__num">0${i + 1}</span>
          <h3>${grupo.grupo}</h3>
        </header>
        <ul class="stackGroup__list">
          ${grupo.items
            .map(
              (item) => `
            <li class="skill" data-nivel="${item.nivel}">
              <div class="skill__head">
                <img src="${iconoTech(item.icono)}" alt="" loading="lazy" width="18" height="18"
                     onerror="this.remove()" />
                <span class="skill__name">${item.nombre}</span>
                <span class="skill__pct">${item.nivel}%</span>
              </div>
              <div class="skill__bar"><i></i></div>
            </li>`
            )
            .join('')}
        </ul>
      </article>`
    )
    .join('');
}

function pintarMarquesina() {
  const grupo = `<div class="marquee__group">${marquesina
    .map(
      (t) => `
      <span class="marquee__item" title="${t.nombre}">
        <img src="${iconoTech(t.icono)}" alt="${t.nombre}" loading="lazy" width="32" height="32"
             onerror="this.replaceWith(document.createTextNode('${t.nombre}'))" />
      </span>`
    )
    .join('')}</div>`;

  $('#marqueeTrack').innerHTML = grupo + grupo;
}

/** Poster generado por CSS cuando un proyecto todavia no tiene captura real. */
function poster(p) {
  if (p.imagen) {
    return `<img class="poster__img" src="${p.imagen}" alt="Captura de ${p.titulo}" loading="lazy" />`;
  }

  return `
    <div class="poster">
      <div class="poster__glow"></div>
      <div class="poster__grid"></div>
      <div class="poster__chrome"><i></i><i></i><i></i><b>${p.id}.app</b></div>
      <span class="poster__mono">${p.titulo.charAt(0)}</span>
      <div class="poster__lines">
        ${p.tags.map((t) => `<span>${t}</span>`).join('')}
      </div>
    </div>`;
}

function pintarProyectos() {
  $('#filters').innerHTML = filtros
    .map(
      (f, i) => `
      <button class="filter${i === 0 ? ' is-active' : ''}" data-filtro="${f.id}"
              role="tab" aria-selected="${i === 0}" data-cursor="Filtrar">
        ${f.label}
      </button>`
    )
    .join('');

  $('#projectsList').innerHTML = proyectos
    .map(
      (p) => `
      <article class="card" data-cat="${p.categoria}" data-id="${p.id}" style="--c:${p.color}">
        <div class="card__media" data-tilt>
          ${poster(p)}
          <span class="card__index">${p.indice}</span>
        </div>

        <div class="card__body">
          <div class="card__meta">
            <span class="card__cat">${p.categoriaLabel}</span>
            <span class="card__year">${p.anio}</span>
          </div>

          <h3 class="card__title">${p.titulo}</h3>
          <p class="card__subtitle">${p.subtitulo}</p>
          <p class="card__desc">${p.descripcion}</p>

          <ul class="card__details">
            ${p.detalles.map((d) => `<li>${d}</li>`).join('')}
          </ul>

          <ul class="card__tags">
            ${p.tags.map((t) => `<li>${t}</li>`).join('')}
          </ul>

          <div class="card__links">
            ${
              p.enlace
                ? `<a href="${p.enlace}" target="_blank" rel="noopener noreferrer" class="card__link magnetic" data-cursor="Abrir">${iconos.enlace}<span>Ver en vivo</span></a>`
                : ''
            }
            ${
              p.repo
                ? `<a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="card__link magnetic" data-cursor="Código">${iconos.github}<span>Código</span></a>`
                : ''
            }
          </div>
        </div>
      </article>`
    )
    .join('');
}

function pintarVideo() {
  $('#videoEyebrow').textContent = videoCV.etiqueta;
  $('#videoTitle').textContent = videoCV.titulo;
  $('#videoText').textContent = videoCV.texto;
  $('#videoLink').setAttribute('href', videoCV.url);

  const player = $('#videoPlayer');
  player.style.backgroundImage = `url(https://i.ytimg.com/vi/${videoCV.youtubeId}/maxresdefault.jpg)`;
}

function pintarContacto() {
  $('#contactEyebrow').textContent = contacto.etiqueta;
  $('#contactTitle').textContent = contacto.titulo;
  $('#contactText').textContent = contacto.texto;
  $('#mailText').textContent = profile.email;
  $('#mailBtn').setAttribute('href', `mailto:${profile.email}`);

  $('#contactSocials').innerHTML = socials
    .map(
      (red) => `
      <li>
        <a class="socialRow" href="${red.url}" target="_blank" rel="noopener noreferrer"
           data-cursor="Abrir">
          <span class="socialRow__icon">${iconos[red.id] ?? ''}</span>
          <span class="socialRow__label">${red.label}</span>
          <span class="socialRow__handle">${red.handle}</span>
          <span class="socialRow__arrow">${iconos.flecha}</span>
        </a>
      </li>`
    )
    .join('');
}

function pintarPie() {
  $('#footerLeft').innerHTML = `© ${new Date().getFullYear()} ${profile.nombre} · Todos los derechos reservados`;
}

/** Construye toda la pagina a partir de los datos. */
export function pintarTodo() {
  pintarNavegacion();
  pintarHero();
  pintarImagenes();
  pintarBanda();
  pintarSobreMi();
  pintarStack();
  pintarMarquesina();
  pintarProyectos();
  pintarVideo();
  pintarContacto();
  pintarPie();
}
