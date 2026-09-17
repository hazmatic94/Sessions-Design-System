import {
  renderSessionsChartGrid,
  renderSessionsLegendItem,
  renderSessionsMetricRow,
  renderSessionsMetricValue,
  renderSessionsPageHeader,
  SESSIONS_CHART_COLORS,
} from "../patterns/index.js";
import { isChartEmpty, resolveEmptyChart } from "./cardChartState.js";

const RECENT_SALES_EMPTY_METRICS = [
  { label: "Appointments", value: "0" },
  { label: "Appointments Value", value: "$0.00" },
];
function renderLegend(items = []) {
  return `<div class="sessions-legend-item-row sessions-metric-card__legend">${items
    .map((item) =>
      renderSessionsLegendItem({
        label: item.label,
        color: item.color,
      }),
    )
    .join("")}</div>`;
}

function renderMetricRows(rows = []) {
  return `<div class="sessions-metric-row-list">${rows
    .map((row) =>
      renderSessionsMetricRow({
        label: row.label,
        value: row.value,
      }),
    )
    .join("")}</div>`;
}

export function renderSessionsRecentSalesCard({
  title = "Recent Sales",
  period = "Last 7 days",
  totalValue = "$0.00",
  metrics = [],
  chart = {},
  legend = [
    { label: "Sales", color: SESSIONS_CHART_COLORS.sales },
    { label: "Appointments", color: SESSIONS_CHART_COLORS.appointments },
  ],
  className = "",
} = {}) {
  const empty = isChartEmpty(chart.bars);
  const resolvedChart = resolveEmptyChart(chart);
  const resolvedMetrics = empty && !metrics.length ? RECENT_SALES_EMPTY_METRICS : metrics;

  const classes = ["sessions-card", "sessions-metric-card", "sessions-recent-sales-card", className]
    .filter(Boolean)
    .join(" ");

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title, body: period })}
    </div>
    <div class="sessions-metric-card__summary">
      ${renderSessionsMetricValue({ value: totalValue })}
      <div class="sessions-metric-card__metrics">
        ${renderMetricRows(resolvedMetrics)}
      </div>
    </div>
    <div class="sessions-metric-card__chart">
      ${renderSessionsChartGrid(resolvedChart)}
    </div>
    ${renderLegend(legend)}
  </article>`;
}
