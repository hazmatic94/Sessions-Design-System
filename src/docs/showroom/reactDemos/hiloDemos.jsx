import { createElement } from "react";
import { GameCard } from "../../../components/GameCard/GameCard.tsx";
import { GameCardFace } from "../../../components/GameCardFace/GameCardFace.tsx";
import { GameCardMini } from "../../../components/GameCardMini/GameCardMini.tsx";
import { GameCardMiniFace } from "../../../components/GameCardMiniFace/GameCardMiniFace.tsx";
import { GameCardStack } from "../../../components/GameCardStack/GameCardStack.tsx";
import { HigherCard } from "../../../components/HigherCard/HigherCard.tsx";
import { HiLoBettingPanel } from "../../../components/HiLoBettingPanel/HiLoBettingPanel.tsx";
import { HiLoEllipseButton } from "../../../components/HiLoEllipseButton/HiLoEllipseButton.tsx";
import { LowerCard } from "../../../components/LowerCard/LowerCard.tsx";
import { SkipButton } from "../../../components/SkipButton/SkipButton.tsx";

const hiLoBettingPanelProps = {
  lowerOdds: "76.39%",
  higherOdds: "30.76%",
  onLowerSame: () => {},
  onHigherSame: () => {},
};

function HiLoEllipseButtonSetDemo() {
  return createElement(
    "div",
    { className: "hilo-ellipse-button-preview-row" },
    createElement(HiLoEllipseButton, { variant: "skip", onClick: () => {} }),
    createElement(HiLoEllipseButton, { variant: "higher", onClick: () => {} }),
    createElement(HiLoEllipseButton, { variant: "lower", onClick: () => {} }),
  );
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const HILO_REACT_DEMOS = {
  "hilo-game-card": () =>
    createElement(
      GameCard,
      null,
      createElement(GameCardFace, { rank: "A", suit: "spades" }),
    ),
  "hilo-game-card-stack": () =>
    createElement(
      GameCardStack,
      null,
      createElement(GameCardFace, { rank: "10", suit: "spades" }),
    ),
  "hilo-skip-button": () => createElement(SkipButton, { onClick: () => {} }),
  "hilo-ellipse-button": () => createElement(HiLoEllipseButtonSetDemo),
  "hilo-higher-card": () => createElement(HigherCard, { multiplier: "X4.20" }),
  "hilo-lower-card": () => createElement(LowerCard, { multiplier: "X4.20" }),
  "hilo-game-card-mini": () =>
    createElement(
      GameCardMini,
      null,
      createElement(GameCardMiniFace, { rank: "8", suit: "hearts" }),
    ),
  "hilo-betting-desktop": () =>
    createElement(HiLoBettingPanel, {
      ...hiLoBettingPanelProps,
      onPlaceBet: () => {},
    }),
  "hilo-betting-ingame": () =>
    createElement(HiLoBettingPanel, {
      ...hiLoBettingPanelProps,
      inGame: true,
      onSkipCard: () => {},
      onCashout: () => {},
    }),
  "hilo-betting-mobile": () =>
    createElement(HiLoBettingPanel, {
      ...hiLoBettingPanelProps,
      layout: "mobile",
      onPlaceBet: () => {},
    }),
  "hilo-betting-mobile-ingame": () =>
    createElement(HiLoBettingPanel, {
      ...hiLoBettingPanelProps,
      layout: "mobile",
      inGame: true,
      onSkipCard: () => {},
      onCashout: () => {},
    }),
};
