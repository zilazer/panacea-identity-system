import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.62;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  RectAreaLightUniformsLib.init();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd7d5cf);
  scene.fog = new THREE.Fog(0xd7d5cf, 9, 22);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.42;
  controls.target.set(0, 0.45, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.78));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9bbb8, 1.45));

  const studioTopLight = new THREE.RectAreaLight(0xffffff, 4.4, 7.5, 4.8);
  studioTopLight.position.set(0, 5.3, 0.8);
  studioTopLight.lookAt(0, 0.25, 0);
  scene.add(studioTopLight);

  const studioFrontLight = new THREE.RectAreaLight(0xffffff, 2.7, 8, 3.2);
  studioFrontLight.position.set(0, 2.7, 5.6);
  studioFrontLight.lookAt(0, 0.35, 0);
  scene.add(studioFrontLight);

  const studioSideLight = new THREE.RectAreaLight(0xf7f5ef, 2.1, 5.2, 3);
  studioSideLight.position.set(4.5, 2.3, 1.2);
  studioSideLight.lookAt(0, 0.25, 0);
  scene.add(studioSideLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
  keyLight.position.set(3.5, 6.2, 4.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 28;
  keyLight.shadow.camera.left = -8;
  keyLight.shadow.camera.right = 8;
  keyLight.shadow.camera.top = 8;
  keyLight.shadow.camera.bottom = -8;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.95);
  fillLight.position.set(-4, 2.4, 5);
  scene.add(fillLight);

  const frontSoftLight = new THREE.DirectionalLight(0xf8f6ef, 0.72);
  frontSoftLight.position.set(0, 2.2, 7);
  scene.add(frontSoftLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.85);
  rimLight.position.set(-4, 4.8, -5);
  scene.add(rimLight);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshStandardMaterial({ color: 0xf2f0eb, roughness: 0.82, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  function resizeRenderer() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  function render() {
    resizeRenderer();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resizeRenderer);
  render();

  return { scene, camera, controls, ground, canvas };
}
