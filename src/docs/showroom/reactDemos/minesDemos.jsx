import { createElement, useEffect, useRef, useState } from "react";
import { LossTile } from "../../../components/LossTile/LossTile.tsx";
import { MinesBettingPanel } from "../../../components/MinesBettingPanel/MinesBettingPanel.tsx";
import { MinesTile } from "../../../components/MinesTile/MinesTile.tsx";
import { SafeTile } from "../../../components/SafeTile/SafeTile.tsx";
import { WinTile } from "../../../components/WinTile/WinTile.tsx";
import { mountWinTileDemo } from "../../../utils/winTileDocsDemo.js";

const minesInGameCardProps = {
  currentProfit: "800",
  nextValue: "1050",
  currentMultiplier: "8.0x",
  nextMultiplier: "10.5x",
};

const minesBettingInGameCardProps = {
  currentProfit: "0",
  nextValue: "1050",
  currentMultiplier: "1.0x",
  nextMultiplier: "1.5x",
};

function MinesGoldFlipRevealDemo() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (mountRef.current) {
      mountWinTileDemo(mountRef.current);
    }
  }, []);

  return createElement("div", {
    ref: mountRef,
    "data-win-tile-demo": true,
    "data-variant": "flip",
    "data-multiplier": "1.57x",
  });
}

function LossTileRevealDemo() {
  const [revealed, setRevealed] = useState(false);

  return createElement(LossTile, {
    revealed,
    onRevealedChange: setRevealed,
  });
}

function SafeTileRevealDemo() {
  const [revealed, setRevealed] = useState(false);

  return createElement(SafeTile, {
    revealed,
    onRevealedChange: setRevealed,
  });
}

function minesInGameOverlayDemo(layout = "desktop") {
  return createElement(MinesBettingPanel, {
    layout,
    inGame: true,
    defaultMinesAmount: "2",
    defaultBetAmount: "900",
    inGameCardProps: minesBettingInGameCardProps,
    onCashout: () => {},
  });
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const MINES_REACT_DEMOS = {
  "mines-tile-default": () => createElement(MinesTile),
  "mines-tile-unselected": () => createElement(MinesTile, { selected: false }),
  "mines-win-tile-revealed": () => createElement(WinTile, { revealed: true }),
  "mines-win-tile-reveal": () => createElement(MinesGoldFlipRevealDemo),
  "mines-loss-tile-revealed": () => createElement(LossTile, { revealed: true }),
  "mines-loss-tile-reveal": () => createElement(LossTileRevealDemo),
  "mines-safe-tile-revealed": () => createElement(SafeTile, { revealed: true }),
  "mines-safe-tile-reveal": () => createElement(SafeTileRevealDemo),
  "mines-ingame": () =>
    createElement(MinesBettingPanel, {
      inGame: true,
      defaultMinesAmount: "1",
      inGameCardProps: minesInGameCardProps,
      onCashout: () => {},
    }),
  "mines-ingame-overlay-desktop": () => minesInGameOverlayDemo("desktop"),
  "mines-ingame-overlay-mobile": () => minesInGameOverlayDemo("mobile"),
  "mines-betting-desktop": () =>
    createElement(MinesBettingPanel, {
      defaultMinesAmount: "1",
      onPlaceBet: () => {},
    }),
  "mines-betting-ingame": () =>
    createElement(MinesBettingPanel, {
      inGame: true,
      defaultMinesAmount: "1",
      inGameCardProps: minesBettingInGameCardProps,
      onCashout: () => {},
    }),
  "mines-betting-mobile": () =>
    createElement(MinesBettingPanel, {
      layout: "mobile",
      defaultMinesAmount: "1",
      onPlaceBet: () => {},
    }),
  "mines-betting-mobile-ingame": () =>
    createElement(MinesBettingPanel, {
      layout: "mobile",
      inGame: true,
      defaultMinesAmount: "1",
      inGameCardProps: minesBettingInGameCardProps,
      onCashout: () => {},
    }),
};
