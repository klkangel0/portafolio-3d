/**
 * ============================================================================
 * ESCENA 3D (Three.js)
 * ----------------------------------------------------------------------------
 * El fondo vivo de toda la web. Se compone de:
 *
 *   1. Un NUCLEO: una esfera deformada por ruido que parece respirar.
 *   2. Una JAULA: un icosaedro de alambre que gira al reves que el nucleo.
 *   3. PARTICULAS: miles de puntos girando como una galaxia.
 *   4. POSTPROCESADO: bloom (el brillo), aberracion cromatica, grano y vineta.
 *
 * La escena reacciona a tres cosas: el raton (parallax), el scroll (la camara
 * viaja y las particulas se abren) y la seccion visible (cambia la paleta).
 * ============================================================================
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import gsap from 'gsap';

import {
  nucleoVertex,
  nucleoFragment,
  particulasVertex,
  particulasFragment,
  shaderAcabado,
} from './shaders.js';

/** Paletas de color: una por seccion de la pagina. */
export const PALETAS = {
  oro: { a: '#b45309', b: '#ffd60a', c: '#fff3b0', p1: '#ffd60a', p2: '#ff5f6d' },
  violeta: { a: '#4c1d95', b: '#7c5cff', c: '#e9d5ff', p1: '#7c5cff', p2: '#ff4ecd' },
  cian: { a: '#0e7490', b: '#22d3ee', c: '#cffafe', p1: '#22d3ee', p2: '#3b82f6' },
};

export class Escena {
  constructor(canvas) {
    this.canvas = canvas;
    // Control de tiempo propio (THREE.Clock esta deprecado)
    this.tiempoInicio = performance.now() / 1000;
    this.tiempoAnterior = this.tiempoInicio;
    this.raton = new THREE.Vector2(0, 0);
    this.ratonSuave = new THREE.Vector2(0, 0);
    this.progreso = 0;
    this.activa = true;
    this.soportada = true;

    this.esMovil = window.matchMedia('(max-width: 820px)').matches;
    this.movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.#crearRenderer();
    if (!this.soportada) return;

    this.#crearEscena();
    this.#crearNucleo();
    this.#crearJaula();
    this.#crearParticulas();
    this.#crearPostprocesado();
    this.#escuchar();
    this.setPaleta('oro', 0);
  }

  /* ---------------------------------------------------------------------- */
  /* Construccion                                                            */
  /* ---------------------------------------------------------------------- */

  #crearRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: !this.esMovil,
        powerPreference: 'high-performance',
      });
    } catch (error) {
      // Navegador sin WebGL: avisamos para que el CSS ponga un fondo estatico
      console.warn('WebGL no disponible, se usa el fondo de reserva.', error);
      this.soportada = false;
      document.body.classList.add('sin-webgl');
      return;
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.esMovil ? 1.5 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x05060a, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;
  }

  #crearEscena() {
    this.escena = new THREE.Scene();

    this.camara = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camara.position.set(0, 0, 8);

    // Grupo que agrupa nucleo + jaula para moverlos juntos
    this.grupo = new THREE.Group();
    this.escena.add(this.grupo);
  }

  #crearNucleo() {
    const detalle = this.esMovil ? 12 : 24;
    const geometria = new THREE.IcosahedronGeometry(1.5, detalle);

    this.uniformesNucleo = {
      uTime: { value: 0 },
      uAmp: { value: this.movimientoReducido ? 0.14 : 0.38 },
      uFreq: { value: 0.85 },
      uPulso: { value: 0 },
      uColorA: { value: new THREE.Color(PALETAS.oro.a) },
      uColorB: { value: new THREE.Color(PALETAS.oro.b) },
      uColorC: { value: new THREE.Color(PALETAS.oro.c) },
      uOpacidad: { value: 1 },
    };

    this.nucleo = new THREE.Mesh(
      geometria,
      new THREE.ShaderMaterial({
        vertexShader: nucleoVertex,
        fragmentShader: nucleoFragment,
        uniforms: this.uniformesNucleo,
        transparent: true,
      })
    );
    this.grupo.add(this.nucleo);
  }

  #crearJaula() {
    // Icosaedro de alambre alrededor del nucleo: aporta estructura geometrica
    this.jaula = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.55, 1)),
      new THREE.LineBasicMaterial({
        color: new THREE.Color(PALETAS.oro.b),
        transparent: true,
        opacity: 0.26,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.grupo.add(this.jaula);
  }

  #crearParticulas() {
    const total = this.movimientoReducido ? 2000 : this.esMovil ? 3500 : 7000;

    const posiciones = new Float32Array(total * 3);
    const escalas = new Float32Array(total);
    const semillas = new Float32Array(total);

    for (let i = 0; i < total; i++) {
      // 70% forman un disco tipo galaxia, 30% una esfera envolvente
      const enDisco = Math.random() < 0.7;
      const angulo = Math.random() * Math.PI * 2;

      if (enDisco) {
        const radio = 2.4 + Math.pow(Math.random(), 0.6) * 9;
        posiciones[i * 3] = Math.cos(angulo) * radio;
        posiciones[i * 3 + 1] = (Math.random() - 0.5) * (1.4 + radio * 0.12);
        posiciones[i * 3 + 2] = Math.sin(angulo) * radio;
      } else {
        const radio = 3 + Math.random() * 11;
        const phi = Math.acos(2 * Math.random() - 1);
        posiciones[i * 3] = radio * Math.sin(phi) * Math.cos(angulo);
        posiciones[i * 3 + 1] = radio * Math.cos(phi) * 0.75;
        posiciones[i * 3 + 2] = radio * Math.sin(phi) * Math.sin(angulo);
      }

      escalas[i] = 0.35 + Math.pow(Math.random(), 3) * 1.9;
      semillas[i] = Math.random() * 10;
    }

    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));
    geometria.setAttribute('aEscala', new THREE.BufferAttribute(escalas, 1));
    geometria.setAttribute('aSemilla', new THREE.BufferAttribute(semillas, 1));

    this.uniformesParticulas = {
      uTime: { value: 0 },
      uSize: { value: this.esMovil ? 9 : 12 },
      uPixelRatio: { value: this.renderer.getPixelRatio() },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color(PALETAS.oro.p1) },
      uColorB: { value: new THREE.Color(PALETAS.oro.p2) },
    };

    this.particulas = new THREE.Points(
      geometria,
      new THREE.ShaderMaterial({
        vertexShader: particulasVertex,
        fragmentShader: particulasFragment,
        uniforms: this.uniformesParticulas,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.escena.add(this.particulas);
  }

  #crearPostprocesado() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(window.innerWidth, window.innerHeight);

    this.composer.addPass(new RenderPass(this.escena, this.camara));

    // Bloom: el resplandor que convierte los puntos brillantes en luz
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.esMovil ? 0.4 : 0.55, // fuerza
      0.5, // radio
      0.3 // umbral: solo brilla lo que ya es luminoso
    );
    this.composer.addPass(this.bloom);

    // Acabado de cine
    this.acabado = new ShaderPass(shaderAcabado);
    this.acabado.uniforms.uGrano.value = this.movimientoReducido ? 0.012 : 0.022;
    this.composer.addPass(this.acabado);

    this.composer.addPass(new OutputPass());
  }

  #escuchar() {
    window.addEventListener('resize', () => this.redimensionar());

    window.addEventListener(
      'pointermove',
      (e) => {
        this.raton.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.raton.y = -((e.clientY / window.innerHeight) * 2 - 1);
      },
      { passive: true }
    );

    // Si la pestana no se ve, dejamos de renderizar para no gastar bateria
    document.addEventListener('visibilitychange', () => {
      this.activa = !document.hidden;
      // Al volver reiniciamos la referencia para no dar un salto de animacion
      if (this.activa) this.tiempoAnterior = performance.now() / 1000;
    });
  }

  /* ---------------------------------------------------------------------- */
  /* API publica                                                             */
  /* ---------------------------------------------------------------------- */

  /** Cambia la paleta de color con una transicion suave. */
  setPaleta(nombre, duracion = 1.4) {
    const paleta = PALETAS[nombre];
    if (!paleta || !this.soportada) return;
    if (this.paletaActual === nombre) return;
    this.paletaActual = nombre;

    const transicion = (uniforme, hex) => {
      const destino = new THREE.Color(hex);
      gsap.to(uniforme.value, {
        r: destino.r,
        g: destino.g,
        b: destino.b,
        duration: duracion,
        ease: 'power2.inOut',
        overwrite: true,
      });
    };

    transicion(this.uniformesNucleo.uColorA, paleta.a);
    transicion(this.uniformesNucleo.uColorB, paleta.b);
    transicion(this.uniformesNucleo.uColorC, paleta.c);
    transicion(this.uniformesParticulas.uColorA, paleta.p1);
    transicion(this.uniformesParticulas.uColorB, paleta.p2);
    transicion({ value: this.jaula.material.color }, paleta.b);
  }

  /** Progreso de scroll de 0 a 1: mueve la camara y abre las particulas. */
  setProgreso(progreso) {
    this.progreso = progreso;
  }

  /** Impulso puntual: el nucleo "explota" un poco al hacer scroll rapido. */
  impulso(intensidad) {
    if (!this.soportada || this.movimientoReducido) return;
    gsap.to(this.uniformesNucleo.uPulso, {
      value: Math.min(Math.abs(intensidad), 1.1),
      duration: 0.25,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => {
        gsap.to(this.uniformesNucleo.uPulso, { value: 0, duration: 1.1, ease: 'power2.out' });
      },
    });
  }

  redimensionar() {
    if (!this.soportada) return;
    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    this.camara.aspect = ancho / alto;
    this.camara.updateProjectionMatrix();

    this.renderer.setSize(ancho, alto);
    this.composer.setSize(ancho, alto);
    this.bloom.setSize(ancho, alto);
    this.uniformesParticulas.uPixelRatio.value = this.renderer.getPixelRatio();
  }

  /** Se llama en cada fotograma desde el bucle principal. */
  render() {
    if (!this.soportada || !this.activa) return;

    const ahora = performance.now() / 1000;
    const delta = Math.min(ahora - this.tiempoAnterior, 0.05);
    this.tiempoAnterior = ahora;
    const tiempo = ahora - this.tiempoInicio;

    this.uniformesNucleo.uTime.value = tiempo;
    this.uniformesParticulas.uTime.value = tiempo;
    this.uniformesParticulas.uScroll.value = this.progreso;
    this.acabado.uniforms.uTime.value = tiempo;

    // Parallax suavizado: el raton nunca mueve la camara de golpe
    this.ratonSuave.x += (this.raton.x - this.ratonSuave.x) * Math.min(delta * 3.2, 1);
    this.ratonSuave.y += (this.raton.y - this.ratonSuave.y) * Math.min(delta * 3.2, 1);

    const amplitud = this.movimientoReducido ? 0.25 : 1.15;
    this.camara.position.x = this.ratonSuave.x * amplitud;
    this.camara.position.y = this.ratonSuave.y * amplitud * 0.7;
    // Al avanzar por la pagina la camara se aleja y se eleva un poco
    this.camara.position.z = 8 + this.progreso * 4.5;
    this.camara.lookAt(0, this.progreso * -1.2, 0);

    // El nucleo gira despacio; el scroll lo hace girar mas
    this.grupo.rotation.y = tiempo * 0.08 + this.progreso * 2.4;
    this.grupo.rotation.x = Math.sin(tiempo * 0.15) * 0.12 + this.progreso * 0.5;
    this.grupo.position.y = this.progreso * -1.6;

    // La jaula gira al reves para crear contraste de movimiento
    this.jaula.rotation.y = -tiempo * 0.16;
    this.jaula.rotation.z = tiempo * 0.05;

    this.particulas.rotation.y = tiempo * 0.012;

    this.composer.render();
  }
}

