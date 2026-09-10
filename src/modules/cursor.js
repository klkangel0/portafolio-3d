/**
 * Cursor personalizado: un punto que sigue al raton al instante y un anillo que
 * llega con retraso. Al pasar por encima de algo interactivo el anillo crece y
 * muestra la etiqueta que se indique en `data-cursor`.
 * En pantallas tactiles no se activa.
 */

import gsap from 'gsap';

export function iniciarCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  if (window.matchMedia('(hover: none)').matches) return;

  document.body.classList.add('cursor-activo');

  const punto = cursor.querySelector('.cursor__dot');
  const anillo = cursor.querySelector('.cursor__ring');
  const texto = cursor.querySelector('.cursor__text');

  gsap.set([punto, anillo], { xPercent: -50, yPercent: -50 });

  // quickTo crea funciones muy optimizadas para animar la misma propiedad
  const puntoX = gsap.quickTo(punto, 'x', { duration: 0.1, ease: 'power3' });
  const puntoY = gsap.quickTo(punto, 'y', { duration: 0.1, ease: 'power3' });
  const anilloX = gsap.quickTo(anillo, 'x', { duration: 0.45, ease: 'power3' });
  const anilloY = gsap.quickTo(anillo, 'y', { duration: 0.45, ease: 'power3' });

  let visible = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (!visible) {
        visible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
      puntoX(e.clientX);
      puntoY(e.clientY);
      anilloX(e.clientX);
      anilloY(e.clientY);
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    visible = false;
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });

  // Estado "activo" sobre elementos interactivos
  document.addEventListener('pointerover', (e) => {
    const objetivo = e.target.closest('a, button, [data-cursor], input, .card__media');
    if (!objetivo) return;

    const etiqueta = objetivo.dataset?.cursor ?? '';
    texto.textContent = etiqueta;
    cursor.classList.add('is-active');
    cursor.classList.toggle('has-text', Boolean(etiqueta));
  });

  document.addEventListener('pointerout', (e) => {
    const objetivo = e.target.closest('a, button, [data-cursor], input, .card__media');
    if (!objetivo) return;
    if (objetivo.contains(e.relatedTarget)) return;

    cursor.classList.remove('is-active', 'has-text');
    texto.textContent = '';
  });

  // Pequeno "clic" visual
  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
}
