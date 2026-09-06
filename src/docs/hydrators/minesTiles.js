export async function hydrateWinTileDemos(root = document) {
  const mounts = [...root.querySelectorAll("[data-win-tile-demo]")];
  if (!mounts.length) {
    return;
  }

  try {
    const { mountWinTileDemo } = await import("../../utils/winTileDocsDemo.js?v=win-tile-sounds-v1");
    mounts.forEach((mount) => mountWinTileDemo(mount));
  } catch (error) {
    console.error("Failed to hydrate win tile demos", error);
  }
}
