import { hydrateHomeHeroGrid } from "./homeHeroGrid.js?v=sessions-icon-v1";
import { syncResponsiveDemoChartHeights } from "../demo/responsiveDemo.js?v=sessions-responsive-demo-v3";

export async function hydratePageDemos(root = document) {
  hydrateHomeHeroGrid(root);
  syncResponsiveDemoChartHeights(root);
}

export { hydrateHomeHeroGrid };
