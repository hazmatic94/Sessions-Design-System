import { createElement } from "react";
import { RouletteBettingPanel } from "../../../components/RouletteBettingPanel/RouletteBettingPanel.tsx";
import { RouletteWheel } from "../../../components/RouletteWheel/RouletteWheel.tsx";
import { RouletteWheelAnimated } from "../../../components/RouletteWheel/RouletteWheelAnimated.tsx";
import { RouletteWrapper } from "../../../components/RouletteWheel/RouletteWrapper.tsx";
import { ROULETTE_FIXED_LANDING_POSITION } from "../../../components/RouletteWheel/rouletteWheelLayout.ts";
import { ROULETTE_WHEEL_NATIVE_WIDTH } from "../../../components/RouletteWheel/rouletteWheelPaths.ts";
import { RouletteWinChip } from "../../../components/RouletteWinChip/RouletteWinChip.tsx";

const SHOWROOM_WIN_CHIP_SIZE = 112;

function RouletteWinChipExample() {
  return createElement(RouletteWinChip, {
    betColor: "red",
    multiplier: "2.00x",
    settled: true,
    size: SHOWROOM_WIN_CHIP_SIZE,
  });
}

function RouletteGameShellWheelDemo() {
  return createElement(
    "div",
    {
      className:
        "roulette-wheel-viewport-demo__canvas joker-game-inner-canvas joker-game-shell-empty-stage",
      "aria-label": "Game area canvas",
    },
    createElement(
      RouletteWrapper,
      null,
      createElement(RouletteWheel, {
        size: ROULETTE_WHEEL_NATIVE_WIDTH,
        ballPosition: ROULETTE_FIXED_LANDING_POSITION,
        showBall: true,
      }),
    ),
  );
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const ROULETTE_REACT_DEMOS = {
  "roulette-wheel": () => createElement(RouletteWheelAnimated, { size: 1111 }),
  "roulette-win-chip": () => createElement(RouletteWinChipExample),
  "roulette-game-shell-wheel": () => createElement(RouletteGameShellWheelDemo),
  "roulette-betting-desktop": () =>
    createElement(RouletteBettingPanel, {
      submitLabel: "Spin Wheel",
      onPlaceBet: () => {},
    }),
  "roulette-betting-ingame": () =>
    createElement(RouletteBettingPanel, {
      inGame: true,
      onCashout: () => {},
      onPlaceBet: () => {},
    }),
  "roulette-betting-mobile": () =>
    createElement(RouletteBettingPanel, {
      layout: "mobile",
      submitLabel: "Spin Wheel",
      onPlaceBet: () => {},
    }),
  "roulette-betting-mobile-ingame": () =>
    createElement(RouletteBettingPanel, {
      layout: "mobile",
      inGame: true,
      onCashout: () => {},
      onPlaceBet: () => {},
    }),
};
