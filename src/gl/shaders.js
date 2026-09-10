/**
 * ============================================================================
 * SHADERS (GLSL)
 * ----------------------------------------------------------------------------
 * Aqui vive todo el codigo que se ejecuta en la tarjeta grafica. Es lo que hace
 * que el nucleo se deforme como si respirara y que las particulas floten.
 *
 * - vertex shader   -> decide DONDE se dibuja cada punto de la geometria
 * - fragment shader -> decide DE QUE COLOR se pinta cada pixel
 * ============================================================================
 */

/**
 * Ruido simplex 3D de Ashima Arts (Ian McEwan) - licencia MIT.
 * Devuelve un valor continuo entre -1 y 1 a partir de un punto del espacio.
 * Es lo que da el aspecto organico: sin ruido todo seria una esfera perfecta.
 */
export const ruidoGLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

/* ---------------------------------------------------------------------------
 * NUCLEO: esfera deformada por ruido (el objeto central que "respira")
 * ------------------------------------------------------------------------ */

export const nucleoVertex = /* glsl */ `
uniform float uTime;      // segundos desde el arranque
uniform float uAmp;       // cuanto se deforma
uniform float uFreq;      // tamano de las montanas del ruido
uniform float uPulso;     // impulso extra al hacer scroll rapido

varying vec3 vNormal;
varying vec3 vView;
varying float vDesplazamiento;

${ruidoGLSL}

void main() {
  // Dos octavas de ruido: una grande y lenta, otra pequena y rapida
  float n1 = snoise(position * uFreq + uTime * 0.18);
  float n2 = snoise(position * uFreq * 2.4 - uTime * 0.12) * 0.45;
  float desplazamiento = (n1 + n2) * uAmp * (1.0 + uPulso);

  vec3 nuevaPos = position + normal * desplazamiento;

  vec4 mvPosition = modelViewMatrix * vec4(nuevaPos, 1.0);

  vNormal = normalize(normalMatrix * normal);
  vView = -mvPosition.xyz;
  vDesplazamiento = desplazamiento;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const nucleoFragment = /* glsl */ `
uniform vec3 uColorA;   // color de los valles
uniform vec3 uColorB;   // color de las crestas
uniform vec3 uColorC;   // color del halo (borde)
uniform float uTime;
uniform float uOpacidad;

varying vec3 vNormal;
varying vec3 vView;
varying float vDesplazamiento;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 vista = normalize(vView);

  // Fresnel: los bordes que miran "de canto" a la camara brillan mas
  float fresnel = pow(1.0 - abs(dot(normal, vista)), 2.6);

  // Degradado segun lo deformada que este esa zona
  float mezcla = smoothstep(-0.35, 0.45, vDesplazamiento * 2.2);
  vec3 color = mix(uColorA, uColorB, mezcla);

  // Halo luminoso en el contorno (solo en el borde real, no en toda la cara)
  color = mix(color, uColorC, pow(fresnel, 1.6) * 0.75);

  // Un punto de luz especular suave que se mueve con el tiempo
  vec3 luz = normalize(vec3(sin(uTime * 0.2) * 0.6, 0.8, 1.0));
  float brillo = pow(max(dot(normal, luz), 0.0), 16.0);
  color += brillo * 0.16;

  // El cuerpo se mantiene oscuro y es el contorno el que da el volumen:
  // asi el nucleo nunca tapa el texto que va por delante
  color *= 0.16 + fresnel * 1.25;

  gl_FragColor = vec4(color, uOpacidad);
}
`;

/* ---------------------------------------------------------------------------
 * PARTICULAS: el polvo estelar que envuelve el nucleo
 * ------------------------------------------------------------------------ */

export const particulasVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uScroll;      // 0 arriba del todo, 1 al final de la pagina
uniform vec3 uColorA;
uniform vec3 uColorB;

attribute float aEscala;
attribute float aSemilla;

varying vec3 vColor;
varying float vFade;

${ruidoGLSL}

void main() {
  vec3 pos = position;

  // Rotacion tipo galaxia: lo que esta cerca del centro gira mas rapido
  float radio = length(pos.xz);
  float angulo = uTime * 0.05 / (radio * 0.3 + 0.6);
  float c = cos(angulo);
  float s = sin(angulo);
  pos.xz = vec2(pos.x * c - pos.z * s, pos.x * s + pos.z * c);

  // Deriva organica con ruido para que nada se mueva en linea recta
  pos.y += snoise(vec3(pos.xz * 0.16, uTime * 0.07 + aSemilla)) * 0.55;
  pos.x += snoise(vec3(pos.yz * 0.19, uTime * 0.05)) * 0.22;

  // Al bajar por la pagina las particulas se abren hacia la camara
  pos.z += uScroll * 3.5;
  pos.xy *= 1.0 + uScroll * 0.25;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float profundidad = max(-mvPosition.z, 1.0);

  // Tamano en pantalla con atenuacion por distancia. El tope evita que una
  // particula que pase cerca de la camara se convierta en una mancha enorme.
  gl_PointSize = min(uSize * aEscala * uPixelRatio * (6.0 / profundidad), 22.0 * uPixelRatio);

  vColor = mix(uColorA, uColorB, clamp(radio / 8.0, 0.0, 1.0));

  // Las que quedan pegadas a la camara o muy lejos se desvanecen
  vFade = smoothstep(1.5, 6.0, profundidad) * (1.0 - smoothstep(14.0, 40.0, profundidad));
}
`;

export const particulasFragment = /* glsl */ `
varying vec3 vColor;
varying float vFade;

void main() {
  // gl_PointCoord va de 0 a 1 dentro de cada punto: lo usamos para dibujar
  // un circulo suave en lugar de un cuadrado
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = pow(1.0 - smoothstep(0.0, 0.5, d), 2.4);
  vec3 color = vColor + vec3(pow(alpha, 8.0)) * 0.5;

  gl_FragColor = vec4(color, alpha * vFade * 0.4);
}
`;

/* ---------------------------------------------------------------------------
 * POSTPROCESADO: el "acabado de cine" que se aplica a la imagen ya renderizada
 * (aberracion cromatica en los bordes + grano de pelicula + vineta)
 * ------------------------------------------------------------------------ */

export const shaderAcabado = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAberracion: { value: 0.0022 },
    uGrano: { value: 0.022 },
    uVineta: { value: 0.75 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberracion;
    uniform float uGrano;
    uniform float uVineta;

    varying vec2 vUv;

    void main() {
      vec2 dir = vUv - 0.5;
      float dist = length(dir);

      // Aberracion cromatica: separamos los canales R y B segun la distancia
      // al centro, como hace una lente real
      float cantidad = uAberracion * dist * dist * 4.0;
      vec4 color;
      color.r = texture2D(tDiffuse, vUv - dir * cantidad).r;
      color.g = texture2D(tDiffuse, vUv).g;
      color.b = texture2D(tDiffuse, vUv + dir * cantidad).b;
      color.a = 1.0;

      // Grano animado
      float g = fract(sin(dot(vUv * (1.0 + fract(uTime * 0.4)), vec2(12.9898, 78.233))) * 43758.5453);
      color.rgb += (g - 0.5) * uGrano;

      // Vineta
      float vineta = mix(1.0, 1.0 - smoothstep(0.25, 1.05, dist), uVineta);
      color.rgb *= vineta;

      gl_FragColor = color;
    }
  `,
};
