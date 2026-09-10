import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsLegendItem, SESSIONS_CHART_COLORS } from "../../../components/patterns/index.js";

const STATUS_COLORS = {
  confirmed: "var(--green-300)",
  cancelled: "var(--joker-red-400)",
};

export function renderLegendItemPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Legend Item", "", legendItemExamples(), "button-example-section card-example-section")}
  `;
}

function legendItemExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-legend-item-chart-example",
      tocTitle: "Chart legend",
      preview: `
        <div class="sessions-legend-item-row">
          ${renderSessionsLegendItem({ label: "Sales", color: SESSIONS_CHART_COLORS.sales })}
          ${renderSessionsLegendItem({ label: "Appointments", color: SESSIONS_CHART_COLORS.appointments })}
        </div>
      `,
      codeId: "sessions-legend-item-chart-code",
      filename: "ChartLegend.tsx",
      code: sampleChartLegendCode(),
      className: "is-sessions-legend-item",
    })}
    ${componentExampleWrapper({
      id: "sessions-legend-item-status-example",
      tocTitle: "Status legend",
      preview: `
        <div class="sessions-legend-item-row">
          ${renderSessionsLegendItem({ label: "Confirmed", color: STATUS_COLORS.confirmed })}
          ${renderSessionsLegendItem({ label: "Cancelled", color: STATUS_COLORS.cancelled })}
        </div>
      `,
      codeId: "sessions-legend-item-status-code",
      filename: "StatusLegend.tsx",
      code: sampleStatusLegendCode(),
      className: "is-sessions-legend-item",
    })}
  `;
}

function sampleChartLegendCode() {
  return `import { LegendItem } from "@sessions/design-system";

const SERIES = [
  { label: "Sales", color: "var(--green-300)" },
  { label: "Appointments", color: "#9BA3E8" },
];

export function ChartLegend() {
  return (
    <>
      {SERIES.map((item) => (
        <LegendItem key={item.label} label={item.label} color={item.color} />
      ))}
    </>
  );
}`;
}

function sampleStatusLegendCode() {
  return `import { LegendItem } from "@sessions/design-system";

const STATUSES = [
  { label: "Confirmed", color: "var(--green-300)" },
  { label: "Cancelled", color: "var(--joker-red-400)" },
];

export function StatusLegend() {
  return (
    <>
      {STATUSES.map((item) => (
        <LegendItem key={item.label} label={item.label} color={item.color} />
      ))}
    </>
  );
}`;
}
