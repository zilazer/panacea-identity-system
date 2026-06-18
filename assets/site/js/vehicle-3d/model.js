import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function applyPanaceaMaterials(root, carMeshes) {
  const paintColor = new THREE.Color("#1e3f73");
  root.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    object.castShadow = true;
    object.receiveShadow = true;
    carMeshes.push(object);
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      const name = (material.name || "").toLowerCase();
      if (name.includes("paint") || name.includes("exterior")) {
        material.color = paintColor;
        material.metalness = 0.48;
        material.roughness = 0.18;
        if ("clearcoat" in material) material.clearcoat = 0.82;
        if ("clearcoatRoughness" in material) material.clearcoatRoughness = 0.16;
      }
      if (name.includes("glass")) {
        material.transparent = true;
        material.opacity = 0.54;
        material.roughness = 0.08;
      }
      material.needsUpdate = true;
    });
  });
}

function disposeGroup(group, scene) {
  if (!group) return;
  scene.remove(group);
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.geometry.dispose();
    if (Array.isArray(object.material)) {
      object.material.forEach((material) => material.dispose());
    } else {
      object.material.dispose();
    }
  });
}

function createPreviewWheel(position, radius, depth, materials) {
  const wheel = new THREE.Group();
  wheel.position.copy(position);

  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.82, radius * 0.15, 28, 112),
    materials.tire
  );
  tire.rotation.y = Math.PI / 2;

  const innerShadow = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.72, radius * 0.72, depth * 0.86, 96),
    materials.innerTire
  );
  innerShadow.rotation.z = Math.PI / 2;

  const aeroCover = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.58, radius * 0.58, depth * 1.04, 96),
    materials.aeroCover
  );
  aeroCover.rotation.z = Math.PI / 2;

  const innerDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.43, radius * 0.43, depth * 1.12, 96),
    materials.darkRim
  );
  innerDisc.rotation.z = Math.PI / 2;

  const spokeShape = new THREE.Shape();
  spokeShape.moveTo(-radius * 0.055, radius * 0.12);
  spokeShape.lineTo(radius * 0.055, radius * 0.12);
  spokeShape.lineTo(radius * 0.04, radius * 0.58);
  spokeShape.lineTo(-radius * 0.04, radius * 0.58);
  spokeShape.closePath();
  const spokeGeometry = new THREE.ExtrudeGeometry(spokeShape, {
    depth: depth * 0.12,
    bevelEnabled: true,
    bevelSize: radius * 0.01,
    bevelThickness: depth * 0.015,
    bevelSegments: 2
  });

  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12;
    const spoke = new THREE.Mesh(spokeGeometry, index % 2 ? materials.aeroBladeDark : materials.aeroBlade);
    spoke.rotation.z = angle;
    spoke.rotation.y = Math.PI / 2;
    spoke.position.x = depth * 0.54;
    wheel.add(spoke);

    const shadowSpoke = new THREE.Mesh(
      new THREE.BoxGeometry(depth * 0.1, radius * 0.035, radius * 0.44),
      materials.spokeGap
    );
    shadowSpoke.position.x = depth * 0.47;
    shadowSpoke.position.z = radius * 0.34;
    shadowSpoke.rotation.x = angle + Math.PI / 12;
    wheel.add(shadowSpoke);
  }

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.14, radius * 0.14, depth * 1.22, 64),
    materials.hub
  );
  hub.rotation.z = Math.PI / 2;

  const hubRing = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.19, radius * 0.012, 12, 64),
    materials.rimEdge
  );
  hubRing.rotation.y = Math.PI / 2;
  hubRing.position.x = depth * 0.61;

  [tire, innerShadow, aeroCover, innerDisc, hub, hubRing].forEach((mesh) => wheel.add(mesh));
  wheel.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
  });
  return wheel;
}

function createPreviewWheels(root, bounds, scene, previousWheels) {
  disposeGroup(previousWheels, scene);
  const size = bounds.getSize(new THREE.Vector3());
  const radius = THREE.MathUtils.clamp(size.y * 0.267, 0.36, 0.68);
  const depth = THREE.MathUtils.clamp(size.z * 0.132, 0.13, 0.28);
  const wheelNodeNames = ["Wheel_LF_Spatial", "Wheel_LR_Spatial", "Wheel_RF_Spatial", "Wheel_RR_Spatial"];
  const positions = wheelNodeNames
    .map((name) => root.getObjectByName(name))
    .filter(Boolean)
    .map((node) => node.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, -radius * 0.035, 0)));

  if (positions.length < 4) {
    const xInset = size.x * 0.22;
    const zInset = Math.max(depth * 0.45, size.z * 0.035);
    const y = bounds.min.y + radius;
    positions.splice(
      0,
      positions.length,
      new THREE.Vector3(bounds.max.x - xInset, y, bounds.min.z + zInset),
      new THREE.Vector3(bounds.min.x + xInset, y, bounds.min.z + zInset),
      new THREE.Vector3(bounds.max.x - xInset, y, bounds.max.z - zInset),
      new THREE.Vector3(bounds.min.x + xInset, y, bounds.max.z - zInset)
    );
  }

  const materials = {
    tire: new THREE.MeshStandardMaterial({ color: 0x070808, roughness: 0.78, metalness: 0.02 }),
    innerTire: new THREE.MeshStandardMaterial({ color: 0x111315, roughness: 0.72, metalness: 0.06 }),
    aeroCover: new THREE.MeshStandardMaterial({ color: 0x25282b, roughness: 0.48, metalness: 0.42 }),
    darkRim: new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: 0.46, metalness: 0.58 }),
    aeroBlade: new THREE.MeshStandardMaterial({ color: 0x3b3f43, roughness: 0.36, metalness: 0.72 }),
    aeroBladeDark: new THREE.MeshStandardMaterial({ color: 0x24272a, roughness: 0.42, metalness: 0.62 }),
    spokeGap: new THREE.MeshStandardMaterial({ color: 0x08090a, roughness: 0.82, metalness: 0.02 }),
    hub: new THREE.MeshStandardMaterial({ color: 0x111315, roughness: 0.34, metalness: 0.55 }),
    rimEdge: new THREE.MeshStandardMaterial({ color: 0x6b7075, roughness: 0.28, metalness: 0.78 })
  };

  const previewWheels = new THREE.Group();
  previewWheels.name = "Model 3 preview wheel set";
  positions.forEach((position) => {
    previewWheels.add(createPreviewWheel(position, radius, depth, materials));
  });
  scene.add(previewWheels);
  return previewWheels;
}

export function loadVehicleModel(options) {
  const {
    scene,
    controls,
    ground,
    carMeshes,
    setStatus,
    setView,
    onLoaded,
    onPreviewWheels
  } = options;

  let modelRadius = 3;
  let previewWheels = null;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "assets/vehicle/3d/model3-highland-preview/Poppyseed.gltf",
    (gltf) => {
      const model = gltf.scene;
      applyPanaceaMaterials(model, carMeshes);
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const fittedBox = new THREE.Box3().setFromObject(model);
      modelRadius = Math.max(size.x, size.y, size.z) * 0.62 || 3;
      controls.target.set(0, Math.max(size.y * 0.18, 0.35), 0);
      ground.position.y = fittedBox.min.y - 0.035;
      model.updateMatrixWorld(true);
      previewWheels = createPreviewWheels(model, fittedBox, scene, previewWheels);
      onPreviewWheels(previewWheels);
      setView("side");
      setStatus("Local glTF loaded / 本地模型已加载");
      onLoaded(model, modelRadius);
    },
    undefined,
    (error) => {
      console.error(error);
      setStatus("3D model failed to load / 模型加载失败");
    }
  );

  return {
    getModelRadius: () => modelRadius,
    getPreviewWheels: () => previewWheels
  };
}
