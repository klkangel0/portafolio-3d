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
  // Retrato vertical (4:5) para la seccion "Sobre mi"
  foto: `${base}img/angel.jpg`,
  // Recorte cuadrado de la cara para la cabecera
  avatar: `${base}img/angel-avatar.jpg`,
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
    { valor: '4', sufijo: '+', label: 'Proyectos construidos' },
    { valor: '17', sufijo: '', label: 'Tecnologías en el stack' },
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
      { nombre: 'TypeScript', icono: 'typescript', nivel: 82 },
      { nombre: 'React', icono: 'react', nivel: 82 },
      { nombre: 'Next.js', icono: 'nextdotjs', nivel: 80 },
      { nombre: 'Vue.js', icono: 'vuedotjs', nivel: 80 },
      { nombre: 'HTML5', icono: 'html5', nivel: 95 },
      { nombre: 'CSS3 y Tailwind', icono: 'tailwindcss', nivel: 90 },
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
      { nombre: 'PostgreSQL', icono: 'postgresql', nivel: 80 },
      { nombre: 'MySQL', icono: 'mysql', nivel: 82 },
      // Simple Icons ya no sirve los logos de Microsoft: va sin icono
      { nombre: 'SQL Server', icono: '', nivel: 75 },
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
  { nombre: 'TypeScript', icono: 'typescript' },
  { nombre: 'React', icono: 'react' },
  { nombre: 'Next.js', icono: 'nextdotjs' },
  { nombre: 'Tailwind CSS', icono: 'tailwindcss' },
  { nombre: 'PostgreSQL', icono: 'postgresql' },
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
 * CASO DE ESTUDIO: CONSMAN HUB
 * ---------------------------------------------------------------------------
 * Lo que se despliega al pulsar la tarjeta del proyecto. Va aparte porque es
 * largo: cabecera, cifras, capitulos con captura y los problemas tecnicos que
 * hubo que resolver.
 *
 * Las capturas son de la aplicacion real en produccion, con los datos de la
 * empresa (personas, clientes, matriculas e importes) difuminados.
 */
function casoConsmanHub() {
  const img = (n) => `${base}img/proyectos/consman/${n}.webp`;

  return {
    etiqueta: 'Caso de estudio',
    titular: 'Un taller de autobuses\nfuncionando sobre mi código.',
    intro:
      'Consman S.L. repara autobuses, camiones y flotas en <b>tres talleres</b> (Barcelona, Tarragona y Madrid). Su ERP de taller resolvía la parte de facturar, pero todo lo demás vivía en Excels sueltos, correos y libretas. <b>Consman Hub</b> es la aplicación que junta todo eso en un solo sitio y habla con los sistemas que ya había, sin sustituirlos.',
    rol: [
      { label: 'Mi papel', valor: 'Desarrollador único y responsable de IT' },
      { label: 'Ámbito', valor: 'Diseño, desarrollo, base de datos y despliegue' },
      { label: 'Estado', valor: 'En producción y en uso diario' },
      { label: 'Periodo', valor: '2025 — hoy' },
    ],
    metricas: [
      { valor: '20', sufijo: '+', label: 'Módulos en producción' },
      { valor: '3', sufijo: '', label: 'Talleres conectados' },
      { valor: '83', sufijo: '%', label: 'Horas volcadas solas al ERP' },
      { valor: '6', sufijo: ' años', label: 'De histórico migrado' },
    ],
    stack: [
      {
        grupo: 'Aplicación',
        items: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS'],
      },
      {
        grupo: 'Datos',
        items: ['PostgreSQL', 'Drizzle ORM', 'SQL Server (ERP)', 'Access (contabilidad)'],
      },
      {
        grupo: 'Integraciones y despliegue',
        items: ['Microsoft Graph', 'Puppeteer', 'Caddy', 'Servicio de Windows'],
      },
    ],
    capitulos: [
      {
        etiqueta: '01 · Punto de partida',
        titulo: 'Un panel que dice qué hay que mirar hoy',
        texto:
          'Cada persona entra y ve lo suyo: cuántos vehículos hay dentro, qué fichajes están abiertos y qué lleva demasiados días atascado. Los avisos no son decorativos: cada uno es un enlace a la pantalla donde se arregla el problema.',
        puntos: [
          'Los indicadores se calculan en el servidor, contra el ERP y la base propia',
          'Gráficas de entradas al taller y horas fichadas de los últimos 7 días',
          'Accesos rápidos distintos según el grupo de cada usuario',
        ],
        imagen: img('panel'),
        alt: 'Panel principal de Consman Hub con indicadores, avisos y gráficas',
      },
      {
        etiqueta: '02 · El problema difícil',
        titulo: 'Del móvil del mecánico al ERP, sin facturar dos veces',
        texto:
          'Los mecánicos fichan en el móvil. Esas horas tienen que acabar dentro del ERP del taller para poder facturarlas, y ese ERP es de terceros: escribir mal ahí es facturar de más a un cliente. La aplicación vuelca sola lo que ha creado ella y todavía no tiene horas dentro; lo demás se marca a mano. Salen <b>83% automático y 17% revisado por una persona</b>.',
        puntos: [
          'Antes de escribir una hora se busca si ya hay una línea que se solape',
          'Los fichajes que alguien se deja abiertos los cierra un corte automático a las 20:00, y quedan marcados como tales',
          'Cada operario se ve agrupado con su estado: falta crear la OT, horas por volcar o todo en el ERP',
        ],
        imagen: img('fichajes'),
        alt: 'Registro de fichajes agrupado por operario, con su estado de volcado',
      },
      {
        etiqueta: '03 · Cumplimiento',
        titulo: 'Control de jornada con la ley delante',
        texto:
          'El registro horario es obligatorio, así que la pantalla compara lo que cada operario ha fichado contra la jornada de referencia y marca la diferencia. Se filtra por periodo, por operario o sólo por incidencias, y sale a Excel para la gestoría.',
        puntos: [
          'Agrupación por día, semana o mes sobre los mismos datos',
          'Estados calculados: correcto, extra, pendiente o en revisión',
          'Exportación a Excel e impresión del día',
        ],
        imagen: img('jornada'),
        alt: 'Control de jornada con filtros, indicadores por operario y tabla de cumplimiento',
      },
      {
        etiqueta: '04 · Integración',
        titulo: 'Un espejo local del portal de garantías',
        texto:
          'Las reclamaciones de garantía del fabricante se gestionan en un portal externo, lento y sin forma de saber qué está pendiente de cobrar. Un robot diario baja las reclamaciones nuevas y las que han cambiado, y las deja aquí con el estado real: qué ha devuelto el fabricante, por qué y a qué orden de trabajo corresponde.',
        puntos: [
          'Más de 2.000 reclamaciones sincronizadas y buscables al instante',
          'Regla de negocio propia: a los 60 días sin respuesta, la reclamación se puede facturar',
          'Las horas buenas se calculan sumando el desglose por apartados, porque los totales del portal vienen inflados',
        ],
        imagen: img('byd-service'),
        alt: 'Tablero de reclamaciones de garantía con motivos de devolución y estado de facturación',
      },
      {
        etiqueta: '05 · Leer sin romper',
        titulo: 'Qué hay dentro del taller, en tiempo real',
        texto:
          'El listado de vehículos sale directamente de las órdenes de trabajo abiertas del ERP: nada de listas paralelas que se desincronizan. Cuando la orden se cierra, el vehículo pasa solo a «Salidas». El ERP se consulta en <b>sólo lectura</b>, con tres excepciones acotadas y autorizadas.',
        puntos: [
          'Filtros por serie y por sede, búsqueda por orden, matrícula o cliente',
          'Días dentro del taller calculados al vuelo para detectar atascos',
          'Observaciones del equipo guardadas en la base propia, sin tocar el ERP',
        ],
        imagen: img('taller'),
        alt: 'Listado de vehículos en taller con filtros por serie y días dentro',
      },
      {
        etiqueta: '06 · Mantenimiento',
        titulo: 'Lo que toca revisar, antes de que caduque',
        texto:
          'Elevadores, detectores de gas, cadenas, carros de herramienta: todo equipo tiene su ficha, su periodicidad y su histórico firmado. La pantalla ordena por urgencia y deja enviar un equipo al taller o darlo por revisado en un clic.',
        puntos: [
          'Pautas y fichas técnicas generadas a partir de los Excels que ya usaba el equipo',
          'Porcentaje de cumplimiento anual como indicador de cabecera',
          'Vista de lista o de calendario sobre los mismos datos',
        ],
        imagen: img('mantenimiento'),
        alt: 'Plan de mantenimiento preventivo con equipos con retraso y cumplimiento anual',
      },
      {
        etiqueta: '07 · Movilidad',
        titulo: 'La aplicación del mecánico',
        texto:
          'Aparte del Hub hay una aplicación pensada para el móvil, con botones grandes y sin florituras: es la que usan los mecánicos para fichar, crear su orden de reparación e imputar horas. Está hecha para gente que trabaja con guantes y prisa.',
        puntos: [
          'Referencia propia para cada orden, que luego se traduce a la del ERP',
          'Fotos obligatorias antes de cerrar la jornada, con avisos claros de cuáles faltan',
          'Las horas se apuntan por fase, que es como se factura después',
        ],
        imagen: img('operarios'),
        imagenSecundaria: img('operarios-ordenes'),
        alt: 'Aplicación móvil de operarios: pantalla de inicio y alta de una orden de reparación',
        movil: true,
      },
      {
        etiqueta: '08 · Organización',
        titulo: 'El calendario de la empresa, dentro de Microsoft 365',
        texto:
          'Los calendarios compartidos de cada sede se leen y se escriben contra Microsoft 365, así que lo que se toca aquí aparece en el Outlook de todo el mundo. Cada color es una persona, y los eventos se mueven arrastrándolos.',
        puntos: [
          'Conexión por OAuth con Microsoft Graph, por usuario',
          'Calendario corporativo por sede y calendario personal en la misma pantalla',
          'Vistas de mes, semana, día y agenda',
        ],
        imagen: img('calendario'),
        alt: 'Calendario compartido de la empresa con eventos por colores',
      },
      {
        etiqueta: '09 · Seguridad',
        titulo: 'Permisos por grupo, no por persona',
        texto:
          'Cada grupo de trabajo tiene marcados sus apartados y el menú lateral enseña sólo eso; quien no tiene grupo no entra a ninguna pantalla. El clic derecho concede acceso de sólo lectura: ven la pantalla entera pero no pueden cambiar nada.',
        puntos: [
          'La sede es un dato de la persona, no un permiso: son cosas distintas a propósito',
          'Los permisos se comprueban en el servidor, en cada pantalla y en cada acción',
          'Alta de usuarios, grupos y solicitudes de acceso desde la propia aplicación',
        ],
        imagen: img('permisos'),
        alt: 'Matriz de permisos por grupo de trabajo',
      },
    ],
    retos: [
      {
        titulo: 'Escribir en un ERP que no es tuyo',
        texto:
          'El ERP del taller es de sólo lectura salvo tres operaciones autorizadas. Cada una comprueba antes si el trabajo ya estaba apuntado, para que la aplicación nunca duplique lo que se factura a un cliente.',
      },
      {
        titulo: 'Construir sabiendo que el ERP se va a morir',
        texto:
          'La empresa está migrando de ERP. Todo lo que habla con el actual está aislado en su propio módulo de consultas, para que cambiar de sistema sea reescribir esa capa y no la aplicación entera.',
      },
      {
        titulo: 'Interfaz para quien no usa ordenadores',
        texto:
          'Los usuarios son mecánicos, supervisores y oficina. Todo va en español, con botones grandes, estados de colores y textos que dicen qué hacer. Nada de jerga técnica en pantalla.',
      },
      {
        titulo: 'Seis años de histórico que no se podían perder',
        texto:
          'Las horas del equipo vivían en un Excel con años de datos. Se importaron y se verificaron contra el original antes de dar la pantalla por buena.',
      },
      {
        titulo: 'Despliegue sin parar el taller',
        texto:
          'La aplicación corre como servicio de Windows detrás de un proxy, con un entorno de pruebas gemelo en otro puerto y otra base de datos. Se prueba ahí y sólo después se publica.',
      },
    ],
    nota:
      'Las capturas son de la aplicación real en producción. Los datos de la empresa (personas, clientes, matrículas e importes) van difuminados por confidencialidad.',
  };
}

/**
 * PROYECTOS
 * ---------------------------------------------------------------------------
 * `imagen` es opcional: si lo dejas vacio se genera un poster animado por
 * codigo con el color del proyecto. Cuando tengas capturas reales, metelas en
 * `public/img/proyectos/` y pon aqui la ruta (ej: '/img/proyectos/safeholder.jpg').
 *
 * `caso` es opcional tambien: si lo tiene, la tarjeta se puede abrir y sale el
 * caso de estudio a pantalla completa.
 */
export const proyectos = [
  {
    id: 'consman-hub',
    indice: '01',
    categoria: 'fullstack',
    categoriaLabel: 'Full Stack',
    titulo: 'Consman Hub',
    subtitulo: 'El ERP interno de un taller de vehículo industrial',
    anio: '2026',
    descripcion:
      'Aplicación web que usan a diario <b>tres talleres</b> de autobuses y camiones: fichajes, mantenimiento, garantías, facturación y permisos. Diseñada, programada y desplegada <b>por mí solo</b>, y en producción desde el primer día.',
    detalles: [
      'Más de 20 módulos sobre Next.js, TypeScript y PostgreSQL',
      'Habla con el ERP del taller (SQL Server) y con Microsoft 365',
      'Una app aparte para el móvil del mecánico',
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'SQL Server', 'Tailwind'],
    color: '#22d3ee',
    imagen: `${base}img/proyectos/consman/panel.webp`,
    enlace: '',
    repo: '',
    privado: 'Código privado de la empresa',
    caso: casoConsmanHub(),
  },
  {
    id: 'safeholder',
    indice: '02',
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
    indice: '03',
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
    indice: '04',
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
