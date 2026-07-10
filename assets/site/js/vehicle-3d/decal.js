import * as THREE from "three";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";

export function createDecalController(options) {
  const {
    scene,
    camera,
    canvas,
    carMeshes,
    getModel,
    getModelLoaded,
    getModelRadius,
    setStatus,
    pauseViewMotion = () => {}
  } = options;

  const decalRaycaster = new THREE.Raycaster();
  const cameraRight = new THREE.Vector3();
  const cameraUp = new THREE.Vector3();
  const moveDirection = new THREE.Vector3();
  const probeOrigin = new THREE.Vector3();
  const probeDirection = new THREE.Vector3();
  const fileInput = document.querySelector("#decalFile");
  const sizeInput = document.querySelector("#decalSize");
  const rotateInput = document.querySelector("#decalRotate");
  const opacityInput = document.querySelector("#decalOpacity");
  const moveStepInput = document.querySelector("#decalMoveStep");
  const sizeValue = document.querySelector("#decalSizeValue");
  const rotateValue = document.querySelector("#decalRotateValue");
  const opacityValue = document.querySelector("#decalOpacityValue");
  const moveStepValue = document.querySelector("#decalMoveStepValue");
  const state = {
    texture: null,
    material: null,
    mesh: null,
    hit: null,
    aspect: 1,
    size: Number(sizeInput.value),
    rotation: 0,
    opacity: Number(opacityInput.value),
    moveStep: Number(moveStepInput.value)
  };

  function updateOutputs() {
    sizeValue.textContent = Math.round(state.size * 100);
    rotateValue.textContent = Math.round(THREE.MathUtils.radToDeg(state.rotation));
    opacityValue.textContent = Math.round(state.opacity * 100);
    moveStepValue.textContent = Math.round(state.moveStep);
  }

  function removeDecal() {
    if (!state.mesh) return;
    scene.remove(state.mesh);
    state.mesh.geometry.dispose();
    state.mesh = null;
  }

  function buildDecal() {
    const model = getModel();
    if (!model || !state.texture || !state.hit) return;
    removeDecal();

    const helper = new THREE.Object3D();
    const { position, normal, target } = state.hit;
    helper.position.copy(position).addScaledVector(normal, 0.018);
    helper.lookAt(position.clone().add(normal));
    helper.rotateZ(state.rotation);
    helper.updateMatrixWorld();

    const width = state.size * state.aspect;
    const height = state.size;
    const depth = Math.max(0.08, state.size * 0.32);
    const geometry = new DecalGeometry(target, helper.position, helper.rotation, new THREE.Vector3(width, height, depth));
    state.material.opacity = state.opacity;
    state.mesh = new THREE.Mesh(geometry, state.material);
    state.mesh.renderOrder = 10;
    scene.add(state.mesh);
  }

  function setDefaultHit() {
    const model = getModel();
    if (!model) return;
    const modelRadius = getModelRadius();
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const origin = new THREE.Vector3(box.max.x + modelRadius, center.y - modelRadius * 0.1, center.z);
    const direction = new THREE.Vector3(-1, 0, 0);
    decalRaycaster.set(origin, direction);
    const hit = decalRaycaster.intersectObjects(carMeshes, false).find((item) => item.face);
    if (!hit) return;
    setHitFromIntersection(hit);
    buildDecal();
  }

  function setHitFromIntersection(hit) {
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
    state.hit = {
      position: hit.point.clone(),
      normal,
      target: hit.object
    };
  }

  function nudgeDecal(deltaX, deltaY) {
    if (!state.texture || !state.hit || !getModelLoaded()) return;
    pauseViewMotion();

    const modelRadius = getModelRadius();
    const worldStep = Math.max(0.01, (state.moveStep / 700) * modelRadius);
    const normal = state.hit.normal;
    camera.updateMatrixWorld();
    cameraRight.setFromMatrixColumn(camera.matrixWorld, 0).projectOnPlane(normal);
    cameraUp.setFromMatrixColumn(camera.matrixWorld, 1).projectOnPlane(normal);
    if (cameraRight.lengthSq() < 0.000001 || cameraUp.lengthSq() < 0.000001) return;

    cameraRight.normalize();
    cameraUp.normalize();
    moveDirection
      .set(0, 0, 0)
      .addScaledVector(cameraRight, Math.sign(deltaX))
      .addScaledVector(cameraUp, Math.sign(deltaY));
    if (moveDirection.lengthSq() < 0.000001) return;
    moveDirection.normalize();

    probeOrigin
      .copy(state.hit.position)
      .addScaledVector(moveDirection, worldStep)
      .addScaledVector(normal, Math.max(modelRadius * 0.08, state.size));
    probeDirection.copy(normal).multiplyScalar(-1);
    decalRaycaster.set(probeOrigin, probeDirection);
    const hit = decalRaycaster.intersectObjects(carMeshes, false).find((item) => item.face);
    if (!hit) {
      setStatus("No car surface in that direction / 该方向没有车身表面");
      return;
    }
    setHitFromIntersection(hit);
    buildDecal();
    setStatus("PNG decal moved with controls / PNG 贴纸已用按键移动");
  }

  fileInput.addEventListener("change", () => {
    pauseViewMotion();
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      state.aspect = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1;
    };
    image.src = objectUrl;

    new THREE.TextureLoader().load(
      image.src,
      (texture) => {
        if (state.texture) state.texture.dispose();
        if (state.material) state.material.dispose();
        state.texture = texture;
        state.texture.colorSpace = THREE.SRGBColorSpace;
        state.material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: state.opacity,
          side: THREE.FrontSide,
          depthTest: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -6,
          polygonOffsetUnits: -1
        });
        setDefaultHit();
        setStatus("PNG decal loaded. Use arrow buttons to position / PNG 已加载，请用方向按键定位");
        URL.revokeObjectURL(objectUrl);
      },
      undefined,
      (error) => {
        console.error(error);
        setStatus("PNG decal failed to load / PNG 贴纸加载失败");
        URL.revokeObjectURL(objectUrl);
      }
    );
  });

  sizeInput.addEventListener("input", () => {
    pauseViewMotion();
    state.size = Number(sizeInput.value);
    updateOutputs();
    buildDecal();
  });

  rotateInput.addEventListener("input", () => {
    pauseViewMotion();
    state.rotation = THREE.MathUtils.degToRad(Number(rotateInput.value));
    updateOutputs();
    buildDecal();
  });

  opacityInput.addEventListener("input", () => {
    pauseViewMotion();
    state.opacity = Number(opacityInput.value);
    updateOutputs();
    buildDecal();
  });

  moveStepInput.addEventListener("input", () => {
    pauseViewMotion();
    state.moveStep = Number(moveStepInput.value);
    updateOutputs();
  });

  document.querySelectorAll("[data-decal-nudge]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = state.moveStep;
      const offsets = {
        up: [0, step],
        down: [0, -step],
        left: [-step, 0],
        right: [step, 0]
      };
      const [deltaX, deltaY] = offsets[button.dataset.decalNudge] || [0, 0];
      nudgeDecal(deltaX, deltaY);
    });
  });

  updateOutputs();

  return {
    state,
    setDefaultHit,
    nudgeDecal,
    getPosition: () => (state.hit ? state.hit.position.toArray() : null),
    hasDecal: () => Boolean(state.mesh)
  };
}
