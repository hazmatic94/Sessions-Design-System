import { createElement } from "react";
import {
  comingSoonGameMenuItems,
  gameMenuItems,
  navigationItemRegistry,
} from "../../../data/navigationData.js";
import { GameFooterRail } from "../../../components/GameFooterRail/GameFooterRail.tsx";
import { GameHeaderRail } from "../../../components/GameHeaderRail/GameHeaderRail.tsx";
import { RouletteGameHeaderRail } from "../../../components/RouletteGameHeaderRail/RouletteGameHeaderRail.tsx";
import { slug } from "../../../utils.js";

function gameHeaderRailDemo(game) {
  if (game === navigationItemRegistry.roulette) {
    return createElement(RouletteGameHeaderRail);
  }

  return createElement(GameHeaderRail, { game });
}

const games = [...gameMenuItems, ...comingSoonGameMenuItems];

/** @type {Record<string, () => import("react").ReactElement>} */
export const GAME_RAILS_REACT_DEMOS = {
  "game-rails-footer": () => createElement(GameFooterRail),
  ...Object.fromEntries(
    games.map((game) => [
      `game-rails-header-${slug(game.label)}`,
      () => gameHeaderRailDemo(game),
    ]),
  ),
};
