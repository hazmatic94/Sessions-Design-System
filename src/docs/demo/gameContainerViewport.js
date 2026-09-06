const gameContainerDefaultZoom = 0.29;

function updateGameContainerZoom(viewport, nextZoom) {
  if (!viewport) return;
  const zoom = Math.min(1.4, Math.max(0.25, Math.round(nextZoom * 100) / 100));

  viewport.style.setProperty("--game-container-zoom", zoom);
  viewport.dataset.zoom = String(zoom);
}

function getGameContainerDefaultZoom(viewport) {
  if (!viewport) return gameContainerDefaultZoom;
  if (!viewport.dataset.defaultZoom) {
    viewport.dataset.defaultZoom = viewport.dataset.zoom || String(gameContainerDefaultZoom);
  }
  return Number.parseFloat(viewport.dataset.defaultZoom || String(gameContainerDefaultZoom));
}

export function updateGameContainerPan(viewport, panX, panY) {
  if (!viewport) return;
  const nextX = Math.round(panX);
  const nextY = Math.round(panY);

  viewport.style.setProperty("--game-container-pan-x", `${nextX}px`);
  viewport.style.setProperty("--game-container-pan-y", `${nextY}px`);
  viewport.dataset.panX = String(nextX);
  viewport.dataset.panY = String(nextY);
}

export function updateGameContainerZoomValue(viewport, nextZoom) {
  updateGameContainerZoom(viewport, nextZoom);
}

export function getDefaultGameContainerZoom(viewport) {
  return getGameContainerDefaultZoom(viewport);
}

export function initGameContainerViewports(root = document) {
  root.querySelectorAll("[data-game-zoom-viewport]").forEach((viewport) => {
    updateGameContainerZoom(viewport, getGameContainerDefaultZoom(viewport));
    updateGameContainerPan(
      viewport,
      Number.parseFloat(viewport.dataset.panX || "0"),
      Number.parseFloat(viewport.dataset.panY || "0"),
    );
  });
}

export function remeasureGameContainerViewports(root = document) {
  initGameContainerViewports(root);
}
