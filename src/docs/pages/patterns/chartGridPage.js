import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsChartGrid } from "../../../components/patterns/chartGrid.js";

export function renderChartGridPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Chart Grid", "", chartGridExample(), "button-example-section card-example-section")}
  `;
}

function chartGridExample() {
  return componentExampleWrapper({
    id: "sessions-chart-grid-example",
    tocTitle: "7 by 4 grid",
    preview: renderSessionsChartGrid({ columns: 7, rows: 4 }),
    codeId: "sessions-chart-grid-code",
    filename: "ChartGrid.tsx",
    code: sampleChartGridCode(),
    className: "is-sessions-chart-grid",
  });
}

function sampleChartGridCode() {
  return `import { ChartGrid } from "@sessions/design-system";

export function SalesChartGrid() {
  return <ChartGrid columns={7} rows={4} />;
}`;
}
