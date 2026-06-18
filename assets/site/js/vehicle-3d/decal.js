import * as THREE from "three";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";

export function createDecalController(options) {
  const {
    scene,
    camera,
    canvas,
    controls,
    carMeshes,
    getModel,
    getModelLoaded,
    getModelRadius,
    setStatus
  } = options;

  const decalRaycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const fileInput = document.querySelector("#decalFile");
  const sizeInput = document.querySelector("#decalSize");
  const rotateInput = document.querySelector("#decalRotate");
  const opacityInput = document.querySelector("#decalOpacity");
  const sizeValue = document.querySelector("#decalSizeValue");
  const rotateValue = document.querySelector("#decalRotateValue");
  const opacityValue = document.querySelector("#decalOpacityValue");
  const state = {
    texture: null,
    material: null,
    mesh: null,
    hit: null,
    aspect: 1,
    size: Number(sizeInput.value),
    rotation: 0,
    opacity: Number(opacityInput.value),
    dragging: false
  };

  function updateOutputs() {
    sizeValue.textContent = Math.round(state.size * 100);
    rotateValue.textContent = Math.round(THREE.MathUtils.radToDeg(state.rotation));
    opacityValue.textContent = Math.round(state.opacity * 100);
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
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
    state.hit = {
      position: hit.point.clone(),
      normal,
      target: hit.object
    };
    buildDecal();
  }

  function updateFromPointer(event) {
    if (!state.texture || !getModelLoaded()) return false;
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    decalRaycaster.setFromCamera(pointer, camera);
    const hit = decalRaycaster.intersectObjects(carMeshes, false).find((item) => item.face);
    if (!hit) return false;
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
    state.hit = {
      position: hit.point.clone(),
      normal,
      target: hit.object
    };
    buildDecal();
    setStatus("PNG decal positioned / PNG 贴纸已定位");
    return true;
  }

  fileInput.addEventListener("change", () => {
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
        setStatus("PNG decal loaded. Drag on the car / PNG 已加载，可在车身上拖动");
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
    state.size = Number(sizeInput.value);
    updateOutputs();
    buildDecal();
  });

  rotateInput.addEventListener("input", () => {
    state.rotation = THREE.MathUtils.degToRad(Number(rotateInput.value));
    updateOutputs();
    buildDecal();
  });

  opacityInput.addEventListener("input", () => {
    state.opacity = Number(opacityInput.value);
    updateOutputs();
    buildDecal();
  });

  canvas.addEventListener("pointerdown", (event) => {
    if (!state.texture) return;
    if (!updateFromPointer(event)) return;
    state.dragging = true;
    controls.enabled = false;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    updateFromPointer(event);
  });

  canvas.addEventListener("pointerup", (event) => {
    if (!state.dragging) return;
    state.dragging = false;
    controls.enabled = true;
    canvas.releasePointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointercancel", () => {
    state.dragging = false;
    controls.enabled = true;
  });

  updateOutputs();

  return {
    state,
    setDefaultHit,
    hasDecal: () => Boolean(state.mesh)
  };
}
