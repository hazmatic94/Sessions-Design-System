import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { BETTING_PANEL_SURFACE_REACT_DEMOS } from "./bettingPanelSurfaceDemos.jsx";
import { BUTTON_REACT_DEMOS } from "./buttonDemos.jsx";
import { CARD_REACT_DEMOS } from "./cardDemos.jsx";
import { CHIP_REACT_DEMOS } from "./chipDemos.jsx";
import { COINFLIP_REACT_DEMOS } from "./coinFlipDemos.jsx";
import { ROULETTE_REACT_DEMOS } from "./rouletteDemos.jsx";
import { HILO_REACT_DEMOS } from "./hiloDemos.jsx";
import { INPUT_REACT_DEMOS } from "./inputDemos.jsx";
import { GAME_RAILS_REACT_DEMOS } from "./gameRailsDemos.jsx";
import { MINES_REACT_DEMOS } from "./minesDemos.jsx";
import { MODAL_REACT_DEMOS } from "./modalDemos.jsx";
import { NAVIGATION_REACT_DEMOS } from "./navigationDemos.jsx";
import { SPORTSBOOK_REACT_DEMOS } from "./sportsbookDemos.jsx";
import { SHOWROOM_COMPONENT_REACT_DEMOS } from "./showroomComponentDemos.jsx";

const REACT_DEMOS = {
  ...BETTING_PANEL_SURFACE_REACT_DEMOS,
  ...BUTTON_REACT_DEMOS,
  ...CARD_REACT_DEMOS,
  ...CHIP_REACT_DEMOS,
  ...COINFLIP_REACT_DEMOS,
  ...ROULETTE_REACT_DEMOS,
  ...SPORTSBOOK_REACT_DEMOS,
  ...GAME_RAILS_REACT_DEMOS,
  ...HILO_REACT_DEMOS,
  ...INPUT_REACT_DEMOS,
  ...MINES_REACT_DEMOS,
  ...MODAL_REACT_DEMOS,
  ...NAVIGATION_REACT_DEMOS,
  ...SHOWROOM_COMPONENT_REACT_DEMOS,
};

const roots = new WeakMap();

export function hydrateReactDemos(root = document) {
  root.querySelectorAll("[data-react-demo]").forEach((node) => {
    const key = node.dataset.reactDemo;
    const renderDemo = key ? REACT_DEMOS[key] : null;

    if (!renderDemo) {
      console.warn(`Missing react demo: ${key ?? "(empty)"}`);
      return;
    }

    let reactRoot = roots.get(node);
    if (!reactRoot) {
      reactRoot = createRoot(node);
      roots.set(node, reactRoot);
    }

    try {
      reactRoot.render(createElement(renderDemo));
    } catch (error) {
      console.error(`Failed to render react demo: ${key}`, error);
      node.innerHTML =
        '<p class="component-example-wrapper__react-demo-error">Demo failed to render.</p>';
    }
  });
}
