import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#flowCanvas");
const status = document.querySelector("#modelStatus");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x080b10, 0.13);
const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 30);
camera.position.set(2.8, .55, .62);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 0.02, 0.52);
controls.minDistance = 1.15;
controls.maxDistance = 4.2;

scene.add(new THREE.HemisphereLight(0xcbeaff, 0x10141b, 2.1));
const key = new THREE.DirectionalLight(0xffffff, 3.2);
key.position.set(2.5, 3.2, 1.2);
scene.add(key);
const rim = new THREE.PointLight(0x72d9ff, 9, 5);
rim.position.set(-1.5, .8, -.4);
scene.add(rim);
const plasmaLight = new THREE.PointLight(0xb64cff, 7, 3);
plasmaLight.position.set(.1, .3, .05);
scene.add(plasmaLight);

const stage = new THREE.Group();
stage.rotation.y = -0.16;
stage.position.set(0, -0.18, -0.08);
scene.add(stage);

const modelRoot = new THREE.Group();
modelRoot.scale.setScalar(9);
stage.add(modelRoot);
let shellVisible = true;

const sourceColors = {
  "风机": 0x4cbce8,
  "dbd": 0xb365ff,
  "vapor": 0xe7faff,
  "lid": 0x5f6b76,
  "default": 0xaebbc7
};

new GLTFLoader().load(
  "assets/device/electro-mist-v6/electro-mist-v6.glb",
  (gltf) => {
    gltf.scene.traverse((object) => {
      if (!object.isMesh) return;
      const keyName = Object.keys(sourceColors).find((key) => object.name.toLowerCase().includes(key));
      const isSource = Boolean(keyName && keyName !== "lid");
      object.material = new THREE.MeshPhysicalMaterial({
        color: sourceColors[keyName || "default"],
        metalness: .08,
        roughness: .42,
        transparent: true,
        opacity: isSource ? .52 : .14,
        depthWrite: isSource,
        side: THREE.DoubleSide,
        emissive: isSource ? sourceColors[keyName] : 0x000000,
        emissiveIntensity: isSource ? .12 : 0
      });
      object.userData.isShell = !isSource;
    });
    modelRoot.add(gltf.scene);
    status.textContent = "STEP 派生模型已载入 / MODEL READY";
  },
  undefined,
  () => { status.textContent = "模型载入失败 / MODEL LOAD ERROR"; }
);

const guideMaterial = new THREE.LineBasicMaterial({ color: 0x5d7181, transparent: true, opacity: .34 });
const guideCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, .07, .14), new THREE.Vector3(-.015, .09, .25),
  new THREE.Vector3(-.02, .12, .42), new THREE.Vector3(.02, .15, .72),
  new THREE.Vector3(.02, .17, 1.12)
]);
const guide = new THREE.Line(new THREE.BufferGeometry().setFromPoints(guideCurve.getPoints(90)), guideMaterial);
stage.add(guide);

const emitterPositions = {
  fan: new THREE.Vector3(0, .07, .14),
  vapor: new THREE.Vector3(0, .039, .62),
  dbd: new THREE.Vector3(.06, .21, .272),
  merge: new THREE.Vector3(.012, .15, .56)
};

function addEmitterMarker({ geometry, color, position, rotation = [0, 0, 0] }) {
  const marker = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: .55,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  marker.position.set(...position);
  marker.rotation.set(...rotation);
  stage.add(marker);
  return marker;
}

addEmitterMarker({
  geometry: new THREE.PlaneGeometry(.13, .062),
  color: 0x1fbfff,
  position: emitterPositions.fan.toArray()
});
addEmitterMarker({
  geometry: new THREE.CircleGeometry(.055, 48),
  color: 0xe8fbff,
  position: emitterPositions.vapor.toArray(),
  rotation: [-Math.PI / 2, 0, 0]
});
addEmitterMarker({
  geometry: new THREE.CircleGeometry(.034, 40),
  color: 0xb365ff,
  position: emitterPositions.dbd.toArray()
});

function makeLabelTexture(text) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 256;
  labelCanvas.height = 96;
  const ctx = labelCanvas.getContext("2d");
  ctx.font = "500 44px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,.66)";
  ctx.fillRect(18, 18, 220, 60);
  ctx.fillStyle = "#05070a";
  ctx.fillText(text, 128, 50);
  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addSourceLabel(text, position, scale = [.18, .068, 1]) {
  const label = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeLabelTexture(text),
    transparent: true,
    depthTest: false,
    depthWrite: false
  }));
  label.position.set(...position);
  label.scale.set(...scale);
  label.renderOrder = 20;
  stage.add(label);
  return label;
}

addSourceLabel("dbd", [.055, .225, .272], [.22, .082, 1]);
addSourceLabel("vapor", [0, .052, .62], [.24, .09, 1]);
addSourceLabel("风扇", [0, .09, .035], [.2, .075, 1]);

function glowTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(32,32,1,32,32,31);
  g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(.2,"rgba(255,255,255,.85)"); g.addColorStop(1,"rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
}
const particleTexture = glowTexture();

function makeStream({ count, color, size, route, startSpread, endSpread, aspect = 1, sourcePlane = "xy", sourceShape = "disk", seedOffset = 0, pathStart = 0, pathEnd = 1, phasePower = 1 }) {
  const positions = new Float32Array(count * 3);
  const seeds = Array.from({length: count}, (_, i) => {
    const phase = (i * .61803398875 + seedOffset) % 1;
    if (sourceShape === "rectangle") {
      return { phase, x: ((i * .754877666) % 1) * 2 - 1, y: ((i * .569840296 + .31) % 1) * 2 - 1 };
    }
    const angle = i * 2.39996323;
    const radius = Math.sqrt((i * .754877666) % 1);
    return { phase, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color, size, map: particleTexture, transparent: true, opacity: .9, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  const points = new THREE.Points(geometry, material);
  stage.add(points);
  return { count, positions, seeds, geometry, material, route, startSpread, endSpread, aspect, sourcePlane, pathStart, pathEnd, phasePower };
}

const routes = {
  // 风机只从蓝色矩形口发生气流。
  air: new THREE.CatmullRomCurve3([emitterPositions.fan,new THREE.Vector3(-.015,.09,.25),new THREE.Vector3(-.04,.12,.42),new THREE.Vector3(.02,.15,.76),new THREE.Vector3(.02,.17,1.25)]),
  // vapor 只从白色圆形雾化面发生水雾。
  mist: new THREE.CatmullRomCurve3([emitterPositions.vapor,new THREE.Vector3(.002,.075,.61),new THREE.Vector3(.006,.115,.59),emitterPositions.merge,new THREE.Vector3(.02,.17,1.2)]),
  // DBD 只从紫色圆形出口发生等离子产物。
  plasma: new THREE.CatmullRomCurve3([emitterPositions.dbd,new THREE.Vector3(.052,.19,.34),new THREE.Vector3(.018,.16,.45),emitterPositions.merge,new THREE.Vector3(.02,.17,1.2)]),
  // 混合态不是任何单一模块的出口，只在气流、水雾、DBD 产物汇合后生成。
  mixed: new THREE.CatmullRomCurve3([emitterPositions.merge,new THREE.Vector3(.02,.16,.77),new THREE.Vector3(.02,.17,1.04),new THREE.Vector3(.02,.17,1.28)])
};

const streams = {
  air: makeStream({ count: 520, color: 0x64d4ff, size: .026, route: routes.air, startSpread: .105, endSpread: .075, aspect: .48, sourceShape: "rectangle", phasePower: 1.85 }),
  mist: makeStream({ count: 430, color: 0xf2fbff, size: .021, route: routes.mist, startSpread: .052, endSpread: .105, sourcePlane: "xz", seedOffset: .21, phasePower: 2.25 }),
  plasma: makeStream({ count: 380, color: 0xc06cff, size: .024, route: routes.plasma, startSpread: .029, endSpread: .082, seedOffset: .43, phasePower: 2.1 }),
  mixed: makeStream({ count: 520, color: 0x72ffba, size: .025, route: routes.mixed, startSpread: .035, endSpread: .115, seedOffset: .67, pathStart: .18 })
};

const settings = { airflow: 68, mist: 54, plasma: 46 };
const sliders = ["airflow", "mist", "plasma"];
sliders.forEach((name) => {
  const input = document.querySelector(`#${name}`);
  input.addEventListener("input", () => {
    settings[name] = Number(input.value);
    document.querySelector(`#${name}Value`).textContent = input.value;
    updateMetrics();
  });
});

function updateMetrics() {
  const a = settings.airflow, m = settings.mist, p = settings.plasma;
  const balance = 100 - Math.min(100, Math.abs(m - p) * 1.3);
  const contact = Math.round(Math.sqrt(m * p) * (.42 + a / 175));
  const uniformity = Math.round(Math.min(100, balance * .55 + a * .35 + Math.min(m,p) * .1));
  document.querySelector("#entrainmentMetric").textContent = Math.round(a);
  document.querySelector("#contactMetric").textContent = contact;
  document.querySelector("#uniformityMetric").textContent = uniformity;
  streams.mixed.material.opacity = .25 + Math.min(m,p) / 140;
}
updateMetrics();

const clock = new THREE.Clock();
const point = new THREE.Vector3();
function updateStream(stream, time, intensity, speed, mixing = 0) {
  const visibleCount = Math.floor(stream.count * Math.max(0.02, intensity));
  stream.geometry.setDrawRange(0, visibleCount);
  for (let i = 0; i < stream.count; i++) {
    const seed = stream.seeds[i];
    const normalizedT = (seed.phase + time * speed) % 1;
    const lifecycleT = Math.pow(normalizedT, stream.phasePower);
    const t = THREE.MathUtils.lerp(stream.pathStart, stream.pathEnd, lifecycleT);
    stream.route.getPoint(t, point);
    const expansion = THREE.MathUtils.smoothstep(lifecycleT, .04, .62);
    const spread = THREE.MathUtils.lerp(stream.startSpread, stream.endSpread, expansion);
    const envelope = 1 + Math.sin(Math.PI * t) * mixing * .42;
    const swirl = time * 2.4 + i * 2.399;
    const turn = THREE.MathUtils.smoothstep(lifecycleT, .08, .45);
    const cos = Math.cos(swirl * turn), sin = Math.sin(swirl * turn);
    const localX = seed.x * spread;
    const localY = seed.y * spread * stream.aspect;
    const offsetA = (localX * cos - localY * sin) * envelope;
    const offsetB = (localX * sin + localY * cos) * envelope;
    stream.positions[i*3] = point.x + offsetA;
    stream.positions[i*3+1] = point.y + (stream.sourcePlane === "xy" ? offsetB : 0);
    stream.positions[i*3+2] = point.z + (stream.sourcePlane === "xz" ? offsetB : 0);
  }
  stream.geometry.attributes.position.needsUpdate = true;
}

const views = {
  mix: { position: [1.9,1.5,2.7], target: [0,.02,.52] },
  side: { position: [2.8,.55,.62], target: [0,.02,.52] },
  top: { position: [.02,3.2,.58], target: [0,.02,.55] }
};
document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
  const view = views[button.dataset.view];
  camera.position.set(...view.position); controls.target.set(...view.target); controls.update();
}));
document.querySelector("#toggleShell").addEventListener("click", (event) => {
  shellVisible = !shellVisible;
  modelRoot.traverse((o) => { if (o.isMesh && o.userData.isShell) o.visible = shellVisible; });
  event.currentTarget.setAttribute("aria-pressed", String(shellVisible));
});

function resize() {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width)); const h = Math.max(1, Math.floor(rect.height));
  if (canvas.width !== w || canvas.height !== h) { renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix(); }
}

function animate() {
  const t = clock.getElapsedTime();
  const air = settings.airflow / 100, mist = settings.mist / 100, plasma = settings.plasma / 100;
  const entrain = .18 + air * .82;
  updateStream(streams.air, t, air, .12 + air * .34, air);
  updateStream(streams.mist, t, mist, (.07 + air * .3) * entrain, air);
  updateStream(streams.plasma, t, plasma, (.08 + air * .31) * entrain, air);
  updateStream(streams.mixed, t, Math.sqrt(mist * plasma) * entrain, .09 + air * .32, Math.min(mist, plasma));
  plasmaLight.intensity = 2 + plasma * 10;
  rim.intensity = 3 + air * 9;
  controls.update(); resize(); renderer.render(scene, camera); requestAnimationFrame(animate);
}
animate();

window.electroMistFlow = { settings, streams, scene, camera };
