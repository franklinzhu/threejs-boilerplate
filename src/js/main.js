// import { TweenMax, Power2, TimelineLite } from 'gsap';

import 'three/OrbitControls';
import {
  Actors
} from './webgl/scene/actors.js';

export class Main {
  constructor() {
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(10, 5, -10);
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.enabled = true;
    this.initContents();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('rgb(255,255,255)');
    this.renderer.shadowMap.Enabled = true;
    container.appendChild(this.renderer.domElement);

    this.eventListeners();
  }

  render() {
    this.actors.render();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  initContents() {
    this.actors = new Actors(this.scene);
  }

  eventListeners() {
    document.addEventListener('mousemove', this.mouseMove.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('touchmove', this.mouseMove.bind(this));
    document.addEventListener('touchstart', this.mouseDown.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  mouseMove() {}
  mouseDown() {}
  keyDown() {}

  resize() {
    this.w = window.innerWidth / 1;
    this.h = window.innerHeight / 1;

    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.w, this.h);
  }
}
