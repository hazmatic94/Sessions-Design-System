import {
  renderSessionsChartGrid,
  renderSessionsLegendItem,
  renderSessionsMetricRow,
  renderSessionsMetricValue,
  renderSessionsPageHeader,
  SESSIONS_CHART_COLORS,
} from "../patterns/index.js";
import { escapeHtml } from "../../utils.js";

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
    { label: "Confirmed", color: SESSIONS_CHART_COLORS.sales },
    { label: "Cancelled", color: SESSIONS_CHART_COLORS.stack },
  ],
  menuLabel = "More options",
  className = "",
} = {}) {
  const classes = ["sessions-card", "sessions-metric-card", "sessions-upcoming-appointments-card", className]
    .filter(Boolean)
    .join(" ");

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title, body: period })}
      <button class="sessions-metric-card__menu" type="button" aria-label="${escapeHtml(menuLabel)}">
        <img class="sessions-metric-card__menu-icon" src="./assets/IconMore.svg" alt="" />
      </button>
    </div>
    <div class="sessions-metric-card__summary">
      ${renderSessionsMetricValue({ value: totalValue, label: totalLabel })}
      <div class="sessions-metric-card__metrics">
        ${renderMetricRows(metrics)}
      </div>
    </div>
    <div class="sessions-metric-card__chart">
      ${renderSessionsChartGrid(chart)}
    </div>
    ${renderLegend(legend)}
  </article>`;
}
