import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsFooter } from "../../../components/patterns/index.js";

export function renderFooterPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Footer", "", footerExample(), "button-example-section card-example-section")}
  `;
}

function footerExample() {
  return componentExampleWrapper({
    id: "sessions-footer-example",
    tocTitle: "Default",
    preview: renderSessionsFooter({ year: 2026 }),
    codeId: "sessions-footer-code",
    filename: "Footer.tsx",
    code: sampleFooterCode(),
    className: "is-sessions-footer",
  });
}

function sampleFooterCode() {
  return `import { Footer } from "@sessions/design-system";

export function AppFooter() {
  return <Footer year={2026} />;
}`;
}
