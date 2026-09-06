import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js";

export function renderBettingPanelSurfacePage(page) {
  return `
    ${pageHero(page)}
    ${section("Surface", "", surfaceExamples(), "button-example-section betting-panel-section")}
    ${section("Panel Footers", "", footerExamples(), "button-example-section betting-panel-section betting-panel-footer-section")}
  `;
}

function surfaceExamples() {
  return `
    ${bettingPanelExampleCard({
      id: "betting-panel-surface-desktop",
      tocTitle: "Desktop",
      reactDemo: "betting-panel-surface-desktop",
      codeId: "betting-panel-surface-desktop-code",
      filename: "BettingPanelSurface.tsx",
      code: sampleDesktopCode(),
    })}
    ${bettingPanelExampleCard({
      id: "betting-panel-surface-mobile",
      tocTitle: "Mobile",
      reactDemo: "betting-panel-surface-mobile",
      codeId: "betting-panel-surface-mobile-code",
      filename: "BettingPanelSurface.tsx",
      code: sampleMobileCode(),
      className: "is-mobile-betting-panel",
    })}
  `;
}

function footerExamples() {
  return `
    ${footerExamplePair({
      id: "place-bet",
      tocTitle: "Place Bet",
      filename: "PlaceBetFooter.tsx",
      sampleCode: samplePlaceBetFooterCode,
    })}
    ${footerExamplePair({
      id: "cashout",
      tocTitle: "Cashout",
      filename: "CashoutFooter.tsx",
      sampleCode: sampleCashoutFooterCode,
    })}
    ${footerExamplePair({
      id: "dual-action",
      tocTitle: "In-Game Dual Action",
      filename: "InGameDualActionFooter.tsx",
      sampleCode: sampleDualActionFooterCode,
    })}
  `;
}

function footerExamplePair({ id, tocTitle, filename, sampleCode }) {
  return `
    ${bettingPanelExampleCard({
      id: `betting-panel-footer-${id}`,
      tocTitle: `${tocTitle} — Desktop`,
      reactDemo: `betting-panel-footer-${id}`,
      codeId: `betting-panel-footer-${id}-code`,
      filename,
      code: sampleCode("desktop"),
    })}
    ${bettingPanelExampleCard({
      id: `betting-panel-footer-${id}-mobile`,
      tocTitle: `${tocTitle} — Mobile`,
      reactDemo: `betting-panel-footer-${id}-mobile`,
      codeId: `betting-panel-footer-${id}-mobile-code`,
      filename,
      code: sampleCode("mobile"),
      className: "is-mobile-betting-panel",
    })}
  `;
}

export function bettingPanelExampleCard({ id, tocTitle, reactDemo, codeId, filename, code, className = "" }) {
  return componentExampleWrapper({
    id,
    tocTitle,
    reactDemo,
    codeId,
    filename,
    code,
    size: 'fluid',
    className: `navigation-example is-betting-panel${className ? ` ${className}` : ""}`,
    stageClassName: "navigation-example-stage",
    previewClassName: "navigation-example-preview",
  });
}

function sampleDesktopCode() {
  return `import { BettingPanelSurface } from "@joker/design-system";
import "@joker/design-system/styles/button.css";
import "@joker/design-system/styles/inputs.css";

export function BettingPanelSurfaceExample() {
  return (
    <BettingPanelSurface layout="desktop" onPlaceBet={() => {}}>
      {/* Game-specific inputs slot in here */}
    </BettingPanelSurface>
  );
}`;
}

function sampleMobileCode() {
  return `import { BettingPanelSurface } from "@joker/design-system";
import "@joker/design-system/styles/button.css";
import "@joker/design-system/styles/inputs.css";

export function BettingPanelSurfaceMobileExample() {
  return (
    <BettingPanelSurface layout="mobile" onPlaceBet={() => {}}>
      {/* Game-specific inputs slot in here */}
    </BettingPanelSurface>
  );
}`;
}

function samplePlaceBetFooterCode(layout = "desktop") {
  return `import { BettingPanelSurface, PlaceBetFooter } from "@joker/design-system";

export function PlaceBetFooterExample() {
  return (
    <BettingPanelSurface
      layout="${layout}"
      footer={
        <PlaceBetFooter
          label="Place Bet"
          showPrecursor
          onPlaceBet={() => {}}
        />
      }
    >
      {/* Game-specific inputs */}
    </BettingPanelSurface>
  );
}`;
}

function sampleCashoutFooterCode(layout = "desktop") {
  return `import { BettingPanelSurface, CashoutFooter } from "@joker/design-system";

export function CashoutFooterExample() {
  return (
    <BettingPanelSurface
      layout="${layout}"
      footer={<CashoutFooter label="Cashout" onCashout={() => {}} />}
    >
      {/* Game-specific inputs */}
    </BettingPanelSurface>
  );
}`;
}

function sampleDualActionFooterCode(layout = "desktop") {
  return `import { BettingPanelSurface, InGameDualActionFooter } from "@joker/design-system";

export function InGameDualActionFooterExample() {
  return (
    <BettingPanelSurface
      layout="${layout}"
      footer={
        <InGameDualActionFooter
          cashoutLabel="Cashout"
          primaryLabel="Flip Again"
          onCashout={() => {}}
          onPrimaryAction={() => {}}
        />
      }
    >
      {/* Game-specific inputs */}
    </BettingPanelSurface>
  );
}`;
}
