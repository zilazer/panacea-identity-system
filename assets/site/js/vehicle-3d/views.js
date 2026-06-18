export function createViewController(camera, controls, getModelRadius) {
  function setView(view) {
    const modelRadius = getModelRadius();
    const distance = modelRadius * 2.35;
    const height = modelRadius * 0.38;
    const positions = {
      side: [distance, height, 0],
      front: [0, height, distance],
      rear: [0, height, -distance],
      top: [0.01, distance * 1.15, 0.01]
    };
    const [x, y, z] = positions[view] || positions.side;
    camera.position.set(x, y, z);
    camera.lookAt(controls.target);
    controls.update();
  }

  function bindViewControls(container = document) {
    container.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        controls.autoRotate = false;
        setView(button.dataset.view);
      });
    });
  }

  return { setView, bindViewControls };
}
