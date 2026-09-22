import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsChartGrid } from "../../../components/patterns/chartGrid.js?v=sessions-chart-grid-solid-v1";
import { SESSIONS_CHART_COLORS } from "../../../components/patterns/chartColors.js";

const CHART_START_DATE = "2025-03-19";

const AREA_SERIES = [
  {
    id: "sales",
    color: SESSIONS_CHART_COLORS.sales,
    values: [120, 180, 120, 180, 120, 180, 120],
  },
];

const BAR_DATA = [
  { value: 14 },
  { base: 10, stack: 2 },
  { value: 16.5 },
  { value: 18 },
  { base: 15, stack: 2 },
  { value: 11 },
  { value: 13 },
];

export function renderChartGridPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Chart Grid", "", chartGridExamples(), "button-example-section card-example-section")}
  `;
}

function chartGridExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-chart-grid-area-example",
      tocTitle: "Area series",
      preview: renderSessionsChartGrid({
        columns: 7,
        rows: 4,
        max: 240,
        startDate: CHART_START_DATE,
        variant: "area",
        series: AREA_SERIES,
      }),
      codeId: "sessions-chart-grid-area-code",
      filename: "ChartGridArea.tsx",
      code: sampleChartGridAreaCode(),
      className: "is-sessions-chart-grid",
    })}
    ${componentExampleWrapper({
      id: "sessions-chart-grid-bar-example",
      tocTitle: "Bar series",
      preview: renderSessionsChartGrid({
        columns: 7,
        rows: 4,
        max: 20,
        startDate: CHART_START_DATE,
        variant: "bar",
        bars: BAR_DATA,
      }),
      codeId: "sessions-chart-grid-bar-code",
      filename: "ChartGridBar.tsx",
      code: sampleChartGridBarCode(),
      className: "is-sessions-chart-grid",
    })}
  `;
}

function sampleChartGridAreaCode() {
  return `import { ChartGrid } from "@sessions/design-system";

export function SalesAreaChartGrid() {
  return (
    <ChartGrid
      columns={7}
      rows={4}
      max={240}
      startDate="2025-03-19"
      variant="area"
      series={[
        { id: "sales", values: [120, 180, 120, 180, 120, 180, 120] },
      ]}
    />
  );
}`;
}

function sampleChartGridBarCode() {
  return `import { ChartGrid } from "@sessions/design-system";

export function SalesBarChartGrid() {
  return (
    <ChartGrid
      columns={7}
      rows={4}
      max={20}
      startDate="2025-03-19"
      variant="bar"
      bars={[
        { value: 14 },
        { base: 10, stack: 2 },
        { value: 16.5 },
        { value: 18 },
        { base: 15, stack: 2 },
        { value: 11 },
        { value: 13 },
      ]}
    />
  );
}`;
}
