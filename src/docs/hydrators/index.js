import { hydrateWinModalShowrooms } from "./winModal.js";
import { hydrateCoinTossDemos } from "./coinToss.js?v=coin-flip-sounds-v2";
import { hydrateCoinProgressionDemos } from "./coinProgression.js?v=coin-progression-settled-start-v1";
import { hydrateCoinReceiverLossDemos } from "./coinReceiverLoss.js?v=coin-receiver-split-v1";
import {
  hydrateRouletteWheelDemos,
  hydrateRouletteWinStreakRowDemos,
} from "./roulette.js?v=roulette-wheel-clean-v2";
import { hydrateWinTileDemos } from "./minesTiles.js";
import { hydrateHomeHeroGrid } from "./homeHeroGrid.js?v=home-logo-v5-loop";
import { hydrateFootballDataDemos } from "./footballData.js?v=odds-panel-with-line-v1";
import { hydrateReactDemos } from "./reactDemos.js?v=showroom-react-demos-v177";

export async function hydratePageDemos(root = document) {
  hydrateHomeHeroGrid(root);
  hydrateWinModalShowrooms(root);
  hydrateCoinTossDemos(root);
  hydrateCoinProgressionDemos(root);
  try {
    hydrateCoinReceiverLossDemos(root);
  } catch (error) {
    console.error("Failed to hydrate coin receiver loss demos", error);
  }
  hydrateRouletteWheelDemos(root);
  hydrateRouletteWinStreakRowDemos(root);
  hydrateWinTileDemos(root);
  await Promise.all([
    hydrateFootballDataDemos(root),
    hydrateReactDemos(root),
  ]);
}

export {
  hydrateWinModalShowrooms,
  hydrateCoinTossDemos,
  hydrateCoinProgressionDemos,
  hydrateCoinReceiverLossDemos,
  hydrateRouletteWheelDemos,
  hydrateRouletteWinStreakRowDemos,
  hydrateWinTileDemos,
  hydrateHomeHeroGrid,
  hydrateFootballDataDemos,
  hydrateReactDemos,
};
