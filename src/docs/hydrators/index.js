import { hydrateHomeHeroGrid } from "./homeHeroGrid.js?v=sessions-icon-v1";

export async function hydratePageDemos(root = document) {
  hydrateHomeHeroGrid(root);
}

export { hydrateHomeHeroGrid };
