/**
 * ============================================================================
 * CONTENIDO DEL PORTAFOLIO
 * ----------------------------------------------------------------------------
 * Todo el texto, enlaces y datos viven aqui. Si quieres cambiar algo de la web
 * (anadir un proyecto, cambiar un parrafo, actualizar redes) lo haces en este
 * fichero y el resto se genera solo. No hace falta tocar el HTML.
 * ============================================================================
 */

/**
 * Prefijo de las rutas publicas. En local vale '/' y al publicar en GitHub
 * Pages vale '/nombre-del-repo/', asi las imagenes y el PDF nunca se rompen.
 */
const base = import.meta.env.BASE_URL;

export const profile = {
  nombre: 'Ángel Motos',
  nombreCompleto: 'Ángel Motos Zambrano',
  rol: 'Web Developer',
  titular: ['Full Stack', 'Developer'],
  tagline: 'Aspiring Full Stack Developer · Vue · JavaScript · MySQL',
  ubicacion: 'Barcelona, España',
  email: 'angelmotoszambrano11@gmail.com',
  foto: `${base}img/angel.jpg`,
  cv: `${base}cv/CV-Angel-Motos.pdf`,
  disponible: true,
};

export const nav = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobremi', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'video', label: 'Vídeo CV' },
  { id: 'contacto', label: 'Contacto' },
];

export const socials = [
  { id: 'github', label: 'GitHub', handle: '@klkangel0', url: 'https://github.com/klkangel0' },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/angelmotos', url: 'https://www.linkedin.com/in/angelmotos' },
  { id: 'instagram', label: 'Instagram', handle: '@angelmz_12', url: 'https://www.instagram.com/angelmz_12' },
  { id: 'x', label: 'Twitter / X', handle: '@angel6637150429', url: 'https://x.com/angel6637150429' },
];

export const sobremi = {
  etiqueta: 'Sobre mí',
  titulo: 'Código con intención,\ninterfaces con carácter.',
  parrafos: [
    'Soy <b>Ángel Motos Zambrano</b>, desarrollador web apasionado y ambicioso, con experiencia sólida en <b>JavaScript, HTML, CSS, Vue, PHP y MySQL</b>. Ahora mismo estoy ampliando mis habilidades en <b>React</b> y <b>Python</b> para convertirme en un full stack developer altamente versátil y preparado para cualquier reto.',
    'Me destaco por mi <b>comunicación efectiva</b>, <b>proactividad</b> y capacidad de <b>trabajar en equipo</b>, aportando soluciones creativas y eficientes. Hablo <b>español</b>, <b>catalán</b> e <b>inglés intermedio</b> (preparando el FIRST) para colaborar en entornos internacionales.',
    'En mi tiempo libre disfruto de los <b>videojuegos</b>, explorar nuevas tecnologías y compartir momentos con mi pareja: el equilibrio entre pasión profesional y vida personal es parte de cómo trabajo.',
  ],
  datos: [
    { valor: '3', sufijo: '+', label: 'Proyectos construidos' },
    { valor: '12', sufijo: '', label: 'Tecnologías en el stack' },
    { valor: '3', sufijo: '', label: 'Idiomas' },
    { valor: '100', sufijo: '%', label: 'Ganas de crecer' },
  ],
  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Catalán', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'Intermedio · preparando el FIRST' },
  ],
};

/**
 * Stack tecnico. `nivel` es 0-100 y se usa para la barra animada.
 * `icono` es el slug de simpleicons.org (se carga desde su CDN).
 */
export const stack = [
  {
    grupo: 'Frontend',
    color: '#ffd60a',
    items: [
      { nombre: 'JavaScript', icono: 'javascript', nivel: 88 },
      { nombre: 'HTML5', icono: 'html5', nivel: 95 },
      { nombre: 'CSS3', icono: 'css', nivel: 90 },
      { nombre: 'Vue.js', icono: 'vuedotjs', nivel: 80 },
      { nombre: 'Vite', icono: 'vite', nivel: 72 },
    ],
  },
  {
    grupo: 'Backend',
    color: '#7c5cff',
    items: [
      { nombre: 'PHP', icono: 'php', nivel: 78 },
      { nombre: 'Node.js', icono: 'nodedotjs', nivel: 70 },
      { nombre: 'Express', icono: 'express', nivel: 68 },
      { nombre: 'Apache', icono: 'apache', nivel: 65 },
    ],
  },
  {
    grupo: 'Datos y herramientas',
    color: '#22d3ee',
    items: [
      { nombre: 'MySQL', icono: 'mysql', nivel: 82 },
      { nombre: 'MongoDB', icono: 'mongodb', nivel: 70 },
      { nombre: 'Git', icono: 'git', nivel: 85 },
    ],
  },
];

/** Iconos de la marquesina infinita (mismos que tenias en el portafolio original). */
export const marquesina = [
  { nombre: 'HTML5', icono: 'html5' },
  { nombre: 'CSS3', icono: 'css' },
  { nombre: 'JavaScript', icono: 'javascript' },
  { nombre: 'Vue.js', icono: 'vuedotjs' },
  { nombre: 'Node.js', icono: 'nodedotjs' },
  { nombre: 'Express', icono: 'express' },
  { nombre: 'Vite', icono: 'vite' },
  { nombre: 'MySQL', icono: 'mysql' },
  { nombre: 'MongoDB', icono: 'mongodb' },
  { nombre: 'PHP', icono: 'php' },
  { nombre: 'Apache', icono: 'apache' },
  { nombre: 'Git', icono: 'git' },
];

/**
 * PROYECTOS
 * ---------------------------------------------------------------------------
 * `imagen` es opcional: si lo dejas vacio se genera un poster animado por
 * codigo con el color del proyecto. Cuando tengas capturas reales, metelas en
 * `public/img/proyectos/` y pon aqui la ruta (ej: '/img/proyectos/safeholder.jpg').
 */
export const proyectos = [
  {
    id: 'safeholder',
    indice: '01',
    categoria: 'fullstack',
    categoriaLabel: 'Full Stack',
    titulo: 'SafeHolder',
    subtitulo: 'Plataforma de inversión en tiempo real',
    anio: '2025',
    descripcion:
      'Aplicación de inversión desarrollada en equipo de <b>cuatro personas</b> que permite comprar <b>oro</b>, <b>dólar</b> y <b>bitcoin</b> con precios actualizados en tiempo real mediante <b>APIs externas</b>.',
    detalles: [
      'Autenticación segura y gestión de usuarios y roles',
      'Gráficos en tiempo real conectados a APIs de mercado',
      'Panel dinámico con histórico de operaciones',
    ],
    tags: ['JavaScript', 'PHP', 'MySQL', 'APIs'],
    color: '#ffd60a',
    imagen: '',
    enlace: '',
    repo: 'https://github.com/klkangel0',
  },
  {
    id: 'pokeapi',
    indice: '02',
    categoria: 'fullstack',
    categoriaLabel: 'Full Stack',
    titulo: 'PokeAPI',
    subtitulo: 'Explorador interactivo de Pokémon',
    anio: '2025',
    descripcion:
      'Aplicación web construida sobre la <b>PokeAPI</b> que muestra información detallada de cada Pokémon con una experiencia interactiva y educativa.',
    detalles: [
      'Búsqueda y filtrado por nombre, tipo y habilidades',
      'Interfaz reactiva construida con Vue',
      'Persistencia de favoritos en MongoDB',
    ],
    tags: ['JavaScript', 'Vue', 'MongoDB'],
    color: '#22d3ee',
    imagen: '',
    enlace: '',
    repo: 'https://github.com/klkangel0',
  },
  {
    id: 'pepephone',
    indice: '03',
    categoria: 'frontend',
    categoriaLabel: 'Frontend',
    titulo: 'PepePhone',
    subtitulo: 'Rediseño y maquetación de la interfaz',
    anio: '2025',
    // OJO: en el portafolio original este proyecto tenia pegada por error la
    // descripcion de SafeHolder. Aqui va un texto provisional coherente con un
    // proyecto frontend: revisalo y ajustalo con los detalles reales.
    descripcion:
      'Proyecto <b>frontend</b> de maquetación e interfaz para la operadora <b>PepePhone</b>, centrado en una experiencia limpia, responsive y fiel al diseño original.',
    detalles: [
      'Maquetación responsive desde cero con HTML y CSS',
      'Componentes de interfaz reutilizables e interacciones en JavaScript',
      'Optimización de rendimiento y accesibilidad',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    color: '#7c5cff',
    imagen: '',
    enlace: '',
    repo: 'https://github.com/klkangel0',
  },
];

export const filtros = [
  { id: 'todos', label: 'Todos' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
];

export const videoCV = {
  etiqueta: 'Videocurrículum',
  titulo: 'Conóceme en vídeo',
  texto:
    'Si prefieres conocerme de una forma más cercana y dinámica, te invito a ver mi videocurrículum. En él te cuento quién soy, mis habilidades y qué puedo aportar a tu equipo.',
  youtubeId: 'DlXi3RUt3K8',
  url: 'https://youtu.be/DlXi3RUt3K8',
};

export const contacto = {
  etiqueta: 'Contacto',
  titulo: 'Hablemos',
  texto:
    '¿Tienes un proyecto, una vacante o simplemente quieres saludar? Escríbeme y te respondo lo antes posible.',
};
