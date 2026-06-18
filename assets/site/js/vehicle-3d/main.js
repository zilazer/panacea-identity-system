import { createScene } from "./scene.js";
import { createViewController } from "./views.js";
import { loadVehicleModel } from "./model.js";
import { createDecalController } from "./decal.js";

const canvas = document.querySelector("#vehicle3d");
const status = document.querySelector("#vehicle3dStatus");
const carMeshes = [];
const runtime = {
  model: null,
  modelLoaded: false,
  modelRadius: 3,
  previewWheels: null
};

function setStatus(text) {
  status.textContent = text;
}

const { scene, camera, controls, ground } = createScene(canvas);
const viewController = createViewController(camera, controls, () => runtime.modelRadius);
viewController.bindViewControls();

const decalController = createDecalController({
  scene,
  camera,
  canvas,
  controls,
  carMeshes,
  getModel: () => runtime.model,
  getModelLoaded: () => runtime.modelLoaded,
  getModelRadius: () => runtime.modelRadius,
  setStatus
});

loadVehicleModel({
  scene,
  controls,
  ground,
  carMeshes,
  setStatus,
  setView: viewController.setView,
  onPreviewWheels: (previewWheels) => {
    runtime.previewWheels = previewWheels;
  },
  onLoaded: (model, modelRadius) => {
    runtime.model = model;
    runtime.modelRadius = modelRadius;
    runtime.modelLoaded = true;
    if (decalController.state.texture) decalController.setDefaultHit();
  }
});

window.panacea3D = {
  setView: viewController.setView,
  getState: () => ({
    modelLoaded: runtime.modelLoaded,
    hasPreviewWheels: Boolean(runtime.previewWheels),
    hasDecal: decalController.hasDecal(),
    decalSize: decalController.state.size,
    decalRotation: decalController.state.rotation * (180 / Math.PI),
    decalOpacity: decalController.state.opacity,
    status: status.textContent,
    camera: camera.position.toArray(),
    canvas: [canvas.width, canvas.height]
  })
};
