import { createElement } from "react";
import { BettingPanelSurface } from "../../../components/surfaces/BettingPanelSurface/BettingPanelSurface.tsx";
import {
  CashoutFooter,
  InGameDualActionFooter,
  PlaceBetFooter,
} from "../../../components/surfaces/BettingPanelSurface/footers/index.ts";

function slotPreview(label = "Game fields slot here") {
  return createElement("div", { className: "betting-panel-slot-preview" }, label);
}

function surfaceWithFooter(footer, layout = "desktop") {
  return createElement(BettingPanelSurface, {
    layout,
    onPlaceBet: () => {},
    footer,
    children: slotPreview(),
  });
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const BETTING_PANEL_SURFACE_REACT_DEMOS = {
  "betting-panel-surface-desktop": () =>
    createElement(BettingPanelSurface, {
      layout: "desktop",
      onPlaceBet: () => {},
      children: slotPreview(),
    }),
  "betting-panel-surface-mobile": () =>
    createElement(BettingPanelSurface, {
      layout: "mobile",
      onPlaceBet: () => {},
      children: slotPreview(),
    }),
  "betting-panel-footer-place-bet": () =>
    surfaceWithFooter(
      createElement(PlaceBetFooter, {
        label: "Place Bet",
        onPlaceBet: () => {},
        showPrecursor: true,
      }),
      "desktop",
    ),
  "betting-panel-footer-place-bet-mobile": () =>
    surfaceWithFooter(
      createElement(PlaceBetFooter, {
        label: "Place Bet",
        onPlaceBet: () => {},
        showPrecursor: true,
      }),
      "mobile",
    ),
  "betting-panel-footer-cashout": () =>
    surfaceWithFooter(createElement(CashoutFooter, { onCashout: () => {} }), "desktop"),
  "betting-panel-footer-cashout-mobile": () =>
    surfaceWithFooter(createElement(CashoutFooter, { onCashout: () => {} }), "mobile"),
  "betting-panel-footer-dual-action": () =>
    surfaceWithFooter(
      createElement(InGameDualActionFooter, {
        cashoutLabel: "Cashout",
        primaryLabel: "Flip Again",
        onCashout: () => {},
        onPrimaryAction: () => {},
      }),
      "desktop",
    ),
  "betting-panel-footer-dual-action-mobile": () =>
    surfaceWithFooter(
      createElement(InGameDualActionFooter, {
        cashoutLabel: "Cashout",
        primaryLabel: "Flip Again",
        onCashout: () => {},
        onPrimaryAction: () => {},
      }),
      "mobile",
    ),
};
