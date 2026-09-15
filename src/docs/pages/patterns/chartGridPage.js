import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsChartGrid } from "../../../components/patterns/chartGrid.js?v=sessions-chart-grid-v13";
import { SESSIONS_CHART_COLORS } from "../../../components/patterns/chartColors.js";

const DEMO_SERIES = [
  {
    id: "appointments",
    color: SESSIONS_CHART_COLORS.appointments,
    values: [60, 15, 52, 25, 100, 60, 68, 105],
  },
  {
    id: "sales",
    color: SESSIONS_CHART_COLORS.sales,
    values: [120, 60, 180, 145, 200, 120, 168, 180],
  },
];

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
    preview: renderSessionsChartGrid({
        columns: 7,
        rows: 4,
        max: 240,
        startDate: "2025-03-19",
        series: DEMO_SERIES,
      }),
    codeId: "sessions-chart-grid-code",
    filename: "ChartGrid.tsx",
    code: sampleChartGridCode(),
    className: "is-sessions-chart-grid",
  });
}

function sampleChartGridCode() {
  return `import { ChartGrid } from "@sessions/design-system";

export function SalesChartGrid() {
  return (
    <ChartGrid
      columns={7}
      rows={4}
      max={240}
      startDate="2025-03-19"
      series={[
        { id: "appointments", values: [60, 15, 52, 25, 100, 60, 68, 105] },
        { id: "sales", values: [120, 60, 180, 145, 200, 120, 168, 180] },
      ]}
    />
  );
}`;
}
