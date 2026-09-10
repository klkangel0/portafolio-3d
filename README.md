# Portafolio 3D · Ángel Motos

Portafolio personal construido como una **experiencia audiovisual interactiva**:
un fondo WebGL en tiempo real que reacciona al ratón, al scroll y a la sección
que estás mirando, con animaciones de entrada en todos los textos.

> Reconstrucción desde cero del portafolio original ([klkangel0/portafolio](https://github.com/klkangel0/portafolio)),
> manteniendo todo su contenido: sobre mí, stack, proyectos, videocurrículum y contacto.

---

## Qué lleva dentro

| Pieza | Tecnología | Para qué |
|---|---|---|
| Escena 3D | [Three.js](https://threejs.org) | Núcleo deformado por ruido, jaula de alambre y ~7.000 partículas |
| Postprocesado | EffectComposer + UnrealBloom + shader propio | Brillo, aberración cromática, grano y viñeta |
| Animaciones | [GSAP](https://gsap.com) + ScrollTrigger | Textos que suben letra a letra, contadores, barras, parallax |
| Scroll suave | [Lenis](https://lenis.darkroom.engineering) | Inercia sincronizada con GSAP |
| Build | [Vite](https://vite.dev) | Desarrollo instantáneo y build optimizado |

Sin frameworks de UI: JavaScript moderno, módulos ES y CSS a mano.

## Detalles de la experiencia

- **Paleta reactiva**: cada sección tiene su color (oro → violeta → cian) y la
  escena 3D hace la transición al entrar en ella.
- **Impulso por velocidad**: si bajas rápido, el núcleo "late".
- **Cursor propio** con etiquetas contextuales (`data-cursor`).
- **Preloader** con contador y telón.
- **Rendimiento**: menos partículas en móvil, `pixelRatio` limitado, el render se
  detiene si la pestaña no está visible.
- **Accesibilidad**: respeta `prefers-reduced-motion`, foco visible, navegación por
  teclado y fondo de reserva si el navegador no soporta WebGL.

---

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros comandos:

```bash
npm run build    # genera dist/
npm run preview  # sirve dist/ en local
```

---

## Cómo editar el contenido

**Todo el texto vive en un único fichero: [`src/data/content.js`](src/data/content.js).**
No hace falta tocar el HTML ni el CSS para actualizar la web.

```
profile      → nombre, rol, tagline, ubicación, email, CV, foto y avatar
socials      → enlaces a redes
sobremi      → título, párrafos, estadísticas, idiomas
stack        → grupos de tecnologías con su nivel (0-100)
marquesina   → iconos que giran en bucle
proyectos    → cada proyecto con su descripción, tags y color
videoCV      → id del vídeo de YouTube
contacto     → textos de la última sección
```

### Añadir un proyecto

Copia un bloque del array `proyectos` y cambia los campos. `categoria` debe ser
`fullstack`, `frontend` o `backend` para que los filtros funcionen.

### Poner capturas reales

Cada proyecto genera un póster por código si `imagen` está vacío. Para usar una
captura real:

1. Guarda la imagen en `public/img/proyectos/nombre.jpg`
2. En `content.js` pon `imagen: '/img/proyectos/nombre.jpg'`

---

## Estructura

```
├── index.html              Estructura de la página
├── public/                 Ficheros servidos tal cual (foto, CV, favicon)
└── src/
    ├── main.js             Punto de entrada: ordena el arranque
    ├── style.css           Todos los estilos
    ├── data/content.js     ← EL CONTENIDO
    ├── gl/
    │   ├── escena.js       Escena Three.js, cámara y postprocesado
    │   └── shaders.js      Código GLSL (ruido, núcleo, partículas, acabado)
    └── modules/
        ├── render.js       Construye el HTML a partir de los datos
        ├── animaciones.js  GSAP + ScrollTrigger
        ├── scroll.js       Lenis y sección activa
        ├── interfaz.js     Filtros, menú, vídeo, copiar email
        ├── preloader.js    Pantalla de carga
        ├── cursor.js       Cursor personalizado
        └── iconos.js       SVG de redes en línea
```

---

## Despliegue

El repositorio incluye un flujo de GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) que construye y
publica en **GitHub Pages** en cada push a `main`.

Para activarlo: **Settings → Pages → Source: GitHub Actions**.

El flujo pasa `VITE_BASE=/nombre-del-repo/` al build, así que las rutas funcionan
tanto en local como publicado. Si algún día usas dominio propio o publicas en la
raíz, no hace falta cambiar nada: en local `base` siempre es `/`.

---

## Pendiente de revisar

Un par de cosas que vienen del portafolio original y conviene que confirmes:

- **PepePhone**: en el original este proyecto tenía pegada por error la
  descripción de SafeHolder. Aquí hay un texto provisional coherente con un
  proyecto frontend — revísalo en `content.js` y ajústalo a lo que hiciste.
- **Ubicación**: aparece "Barcelona, España", deducido del catalán. Cámbialo en
  `profile.ubicacion` si no encaja.
- **Enlaces de proyectos**: todos apuntan a tu perfil de GitHub. Cuando cada
  proyecto tenga su repositorio o su demo, rellena `repo` y `enlace`.
- **Niveles del stack**: los porcentajes son una estimación, ajústalos a tu criterio.

---

## Créditos

- Ruido simplex 3D: [Ashima Arts / Ian McEwan](https://github.com/ashima/webgl-noise) (MIT)
- Iconos de tecnologías: [Simple Icons](https://simpleicons.org)
- Tipografías: Syne, Inter y JetBrains Mono (Google Fonts)
