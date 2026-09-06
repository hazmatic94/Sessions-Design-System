const REACT_DEMOS_VERSION = "showroom-react-demos-v177";

const BETTING_PANEL_DOCS_MOBILE_CSS = `
@media (max-width: 860px) {
  #betting-panel-surface-desktop.component-example-wrapper .component-example-wrapper__stage,
  #betting-panel-surface-desktop.component-example-wrapper .button-example-stage,
  #betting-panel-surface-desktop.component-example-wrapper .card-example-stage,
  #betting-panel-surface-desktop.component-example-wrapper .navigation-example-stage,
  #betting-panel-surface-mobile.component-example-wrapper .component-example-wrapper__stage,
  #betting-panel-surface-mobile.component-example-wrapper .button-example-stage,
  #betting-panel-surface-mobile.component-example-wrapper .card-example-stage,
  #betting-panel-surface-mobile.component-example-wrapper .navigation-example-stage {
    display: flex;
    flex: 0 0 auto;
    align-items: stretch;
    justify-content: flex-start;
    padding: 0;
    min-height: auto;
    height: auto;
    max-height: none;
    place-items: stretch;
  }

  #betting-panel-surface-desktop .component-example-wrapper__preview,
  #betting-panel-surface-desktop .navigation-example-preview,
  #betting-panel-surface-desktop .card-example-preview,
  #betting-panel-surface-desktop .component-example-wrapper__react-demo,
  #betting-panel-surface-mobile .component-example-wrapper__preview,
  #betting-panel-surface-mobile .navigation-example-preview,
  #betting-panel-surface-mobile .card-example-preview,
  #betting-panel-surface-mobile .component-example-wrapper__react-demo {
    display: flex;
    width: 100%;
    max-width: none;
    min-width: 0;
    align-self: stretch;
    align-items: stretch;
    justify-content: flex-start;
    margin-inline: 0;
  }

  #betting-panel-surface-desktop .joker-betting-panel,
  #betting-panel-surface-desktop .joker-betting-panel-surface,
  #betting-panel-surface-mobile .joker-betting-panel,
  #betting-panel-surface-mobile .joker-betting-panel-surface,
  #betting-panel-surface-desktop .component-example-wrapper__react-demo > .joker-betting-panel,
  #betting-panel-surface-desktop .component-example-wrapper__react-demo > .joker-betting-panel-surface,
  #betting-panel-surface-mobile .component-example-wrapper__react-demo > .joker-betting-panel,
  #betting-panel-surface-mobile .component-example-wrapper__react-demo > .joker-betting-panel-surface {
    width: 100%;
    min-width: 0;
    max-width: none;
  }
}
`;
const REACT_DEMOS_SCRIPT = new URL(
  `../../../assets/showroom-react-demos.js?v=${REACT_DEMOS_VERSION}`,
  import.meta.url,
).href;
const REACT_DEMOS_STYLES = new URL(
  `../../../assets/showroom-react-demos.css?v=${REACT_DEMOS_VERSION}`,
  import.meta.url,
).href;

let hydrateReactDemosImpl;

function ensureBettingPanelDocsMobileOverrides() {
  const id = "docs-betting-panel-mobile-overrides";
  if (document.getElementById(id)) {
    return;
  }

  const style = document.createElement("style");
  style.id = id;
  style.textContent = BETTING_PANEL_DOCS_MOBILE_CSS;
  document.head.appendChild(style);
}

function ensureReactDemoStyles() {
  const id = "showroom-react-demos-css";
  if (document.getElementById(id)) {
    ensureBettingPanelDocsMobileOverrides();
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = REACT_DEMOS_STYLES;
  document.head.appendChild(link);
  ensureBettingPanelDocsMobileOverrides();
}

function showReactDemoLoadError(root, error) {
  console.error("Failed to hydrate React demos", error);
  root.querySelectorAll("[data-react-demo]").forEach((node) => {
    if (node.children.length) {
      return;
    }
    node.innerHTML =
      '<p class="component-example-wrapper__react-demo-error">Demo failed to load. Run <code>npm run build:showroom-demos</code> and refresh.</p>';
  });
}

export async function hydrateReactDemos(root = document) {
  if (!root.querySelector("[data-react-demo]")) {
    return;
  }

  try {
    ensureReactDemoStyles();

    if (!hydrateReactDemosImpl) {
      ({ hydrateReactDemos: hydrateReactDemosImpl } = await import(REACT_DEMOS_SCRIPT));
    }

    hydrateReactDemosImpl(root);
  } catch (error) {
    showReactDemoLoadError(root, error);
  }
}
