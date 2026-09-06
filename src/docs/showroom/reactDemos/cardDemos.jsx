import { createElement } from "react";
import { EnterBetPrecursor } from "../../../components/EnterBetPrecursor/EnterBetPrecursor.tsx";
import { MinesInGameCard } from "../../../components/MinesInGameCard/MinesInGameCard.tsx";
import { MobileHiLoOddsGroup } from "../../../components/MobileHiLoOddsGroup/MobileHiLoOddsGroup.tsx";
import { MobileOddsGroup } from "../../../components/MobileOddsGroup/MobileOddsGroup.tsx";
import { MobileRouletteOddsGroup } from "../../../components/MobileRouletteOddsGroup/MobileRouletteOddsGroup.tsx";
import { OddsButtonGroup } from "../../../components/OddsButtonGroup/OddsButtonGroup.tsx";

const headsTailsOptions = [
  { value: "heads", label: "Heads", sideIcon: "heads" },
  { value: "tails", label: "Tails", sideIcon: "tails" },
];

/** @type {Record<string, () => import("react").ReactElement>} */
export const CARD_REACT_DEMOS = {
  "card-enter-bet-precursor": () => createElement(EnterBetPrecursor),
  "card-odds-heads-tails": () =>
    createElement(OddsButtonGroup, {
      className: "showroom-fixed-width",
      options: headsTailsOptions,
      defaultValue: "heads",
    }),
  "card-odds-heads-tails-mobile": () =>
    createElement(MobileOddsGroup, {
      options: headsTailsOptions,
      defaultValue: "heads",
    }),
  "card-odds-hilo": () =>
    createElement(OddsButtonGroup, {
      className: "showroom-fixed-width",
      ariaLabel: "Hi-Lo choice",
      showOdds: false,
      defaultValue: "lower",
      options: [
        { value: "lower", label: "Lower / Same", direction: "down" },
        { value: "higher", label: "Higher / Same", direction: "up" },
      ],
    }),
  "card-odds-hilo-mobile": () =>
    createElement(MobileHiLoOddsGroup, {
      defaultValue: "lower",
    }),
  "card-odds-roulette": () =>
    createElement(OddsButtonGroup, {
      className: "showroom-fixed-width",
      label: "Bet type",
      layout: "stacked",
      showOdds: false,
      showDirection: false,
      ariaLabel: "Roulette bet choice",
      defaultValue: "red",
      options: [
        { value: "red", label: "Red", sideIcon: "red" },
        { value: "black", label: "Black", sideIcon: "black" },
        { value: "green", label: "Green", sideIcon: "green" },
      ],
    }),
  "card-odds-roulette-mobile": () =>
    createElement(MobileRouletteOddsGroup, {
      defaultValue: "red",
    }),
  "card-mines-ingame": () => createElement(MinesInGameCard),
};
