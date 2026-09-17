import {
  renderSessionsChartGrid,
  renderSessionsLegendItem,
  renderSessionsMetricRow,
  renderSessionsMetricValue,
  renderSessionsPageHeader,
  SESSIONS_CHART_COLORS,
} from "../patterns/index.js";
import { isChartEmpty, resolveEmptyChart } from "./cardChartState.js";

const UPCOMING_APPOINTMENTS_EMPTY_METRICS = [
  { label: "Confirmed Appointments", value: "0" },
  { label: "Cancelled Appointments", value: "0" },
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

export function renderSessionsUpcomingAppointmentsCard({
  title = "Upcoming appointments",
  period = "Last 7 days",
  totalValue = "0",
  totalLabel = "Booked",
  metrics = [],
  chart = {},
  legend = [
    { label: "Confirmed", color: SESSIONS_CHART_COLORS.confirmed },
    { label: "Cancelled", color: SESSIONS_CHART_COLORS.cancelled },
  ],
  className = "",
} = {}) {
  const empty = isChartEmpty(chart.bars);
  const resolvedChart = resolveEmptyChart(chart);
  const resolvedMetrics = empty && !metrics.length ? UPCOMING_APPOINTMENTS_EMPTY_METRICS : metrics;

  const classes = ["sessions-card", "sessions-metric-card", "sessions-upcoming-appointments-card", className]
    .filter(Boolean)
    .join(" ");

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title, body: period })}
    </div>
    <div class="sessions-metric-card__summary">
      ${renderSessionsMetricValue({ value: totalValue, label: totalLabel })}
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
