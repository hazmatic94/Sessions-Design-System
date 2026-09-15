import { escapeHtml } from "../../utils.js";
import { SESSIONS_CHART_COLORS } from "./chartColors.js";

const Y_AXIS_INCREMENT = 60;
const GRID_WIDTH = 565;
const GRID_HEIGHT = 210;

function renderYTicks(rows) {
  return Array.from({ length: rows + 1 }, (_, index) => {
    if (index === rows) {
      return `<span class="sessions-chart-grid__y-tick" style="top: auto; bottom: 0"></span>`;
    }
    const top = rows === 0 ? 0 : (index / rows) * 100;
    return `<span class="sessions-chart-grid__y-tick" style="top: ${top}%"></span>`;
  }).join("");
}

function renderXTicks(columns) {
  return Array.from({ length: columns + 1 }, (_, index) => {
    if (index === columns) {
      return `<span class="sessions-chart-grid__x-tick" style="left: auto; right: 0"></span>`;
    }
    const left = columns === 0 ? 0 : (index / columns) * 100;
    return `<span class="sessions-chart-grid__x-tick" style="left: ${left}%"></span>`;
  }).join("");
}

function resolveYAxis(max, rows, increment = Y_AXIS_INCREMENT) {
  const safeRows = Math.max(rows, 1);
  const requested = Number.isFinite(max) ? Math.max(0, max) : increment * safeRows;
  const step = Math.max(
    increment,
    Math.ceil(requested / safeRows / increment) * increment,
  );
  return {
    step,
    max: step * safeRows,
  };
}

function formatAxisAmount(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function renderYLabels(rows, axisMax, step) {
  const labels = Array.from({ length: rows + 1 }, (_, index) => {
    const top = rows === 0 ? 0 : (index / rows) * 100;
    const value = axisMax - index * step;
    return `<span class="sessions-chart-grid__y-label" style="top: ${top}%">${formatAxisAmount(value)}</span>`;
  });
  const sizer = formatAxisAmount(axisMax);

  return `<span class="sessions-chart-grid-y-sizer">${sizer}</span>${labels.join("")}`;
}

function parseDayDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function resolveDays(dates, startDate, count) {
  if (Array.isArray(dates) && dates.length) {
    return dates
      .map(parseDayDate)
      .filter(Boolean)
      .slice(0, count);
  }

  const start = parseDayDate(startDate) ?? parseDayDate("2025-03-19");
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function dayOrdinal(day) {
  const remainder = day % 100;
  if (remainder >= 11 && remainder <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatDayLabel(date) {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  return `${weekday} ${dayOrdinal(date.getDate())}`;
}

function renderXLabels(days, columns) {
  return days
    .map((date, index) => {
      const left = columns === 0 ? 0 : (index / columns) * 100;
      return `<span class="sessions-chart-grid__x-label" style="left: ${left}%"><span class="sessions-chart-grid__x-label-text">${escapeHtml(formatDayLabel(date))}</span></span>`;
    })
    .join("");
}

function seriesValuesMax(series) {
  const values = series.flatMap((item) =>
    Array.isArray(item?.values) ? item.values.filter((value) => Number.isFinite(value)) : [],
  );
  return values.length ? Math.max(0, ...values) : 0;
}

function resolveSeriesColor(item, index) {
  if (item?.color) return item.color;
  if (item?.id === "appointments") return SESSIONS_CHART_COLORS.appointments;
  if (item?.id === "sales") return SESSIONS_CHART_COLORS.sales;
  return index === 0 ? SESSIONS_CHART_COLORS.sales : SESSIONS_CHART_COLORS.appointments;
}

function valueToY(value, axisMax, height) {
  if (axisMax <= 0) return height;
  const clamped = Math.min(Math.max(value, 0), axisMax);
  return (1 - clamped / axisMax) * height;
}

function renderSeriesPlot(series, columns, axisMax) {
  const lines = series
    .map((item, index) => {
      const values = Array.isArray(item?.values) ? item.values.filter((value) => Number.isFinite(value)) : [];
      if (!values.length) return "";
      const color = escapeHtml(resolveSeriesColor(item, index));
      const points = values.map((value, pointIndex) => {
        const x = columns === 0 ? 0 : (pointIndex / columns) * GRID_WIDTH;
        const y = valueToY(value, axisMax, GRID_HEIGHT);
        return { x, y };
      });
      const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
      const dots = points
        .map(
          (point) =>
            `<circle class="sessions-chart-grid__dot" cx="${point.x}" cy="${point.y}" r="4" fill="${color}" />`,
        )
        .join("");

      return `<g class="sessions-chart-grid__series">
        <polyline class="sessions-chart-grid__line" points="${polyline}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        ${dots}
      </g>`;
    })
    .join("");

  if (!lines) return "";

  return `<svg class="sessions-chart-grid__lines" viewBox="0 0 ${GRID_WIDTH} ${GRID_HEIGHT}" width="${GRID_WIDTH}" height="${GRID_HEIGHT}" aria-hidden="true">${lines}</svg>`;
}

export function renderSessionsChartGrid({
  columns = 7,
  rows = 4,
  max,
  dates,
  startDate,
  series = [],
  className = "",
} = {}) {
  const cellCount = columns * rows;
  const cells = Array.from({ length: cellCount }, () =>
    '<div class="sessions-chart-grid__cell" aria-hidden="true"></div>',
  ).join("");
  const classes = ["sessions-chart-grid", className].filter(Boolean).join(" ");
  const axis = resolveYAxis(max ?? seriesValuesMax(series), rows);
  const days = resolveDays(dates, startDate, columns + 1);
  const plot = renderSeriesPlot(series, columns, axis.max);

  return `<div class="sessions-chart-grid-wrap">
    <div class="sessions-chart-grid-y-axis" aria-hidden="true">
      <div class="sessions-chart-grid-y-labels">${renderYLabels(rows, axis.max, axis.step)}</div>
    </div>
    <div class="sessions-chart-grid-plot">
      <div class="${classes}" style="--sessions-chart-grid-columns: ${columns}; --sessions-chart-grid-rows: ${rows};" role="img" aria-label="Chart grid from $0 to ${formatAxisAmount(axis.max)}">${cells}${plot}<div class="sessions-chart-grid-y-ticks">${renderYTicks(rows)}</div></div>
      <div class="sessions-chart-grid-x-ticks">${renderXTicks(columns)}</div>
      <div class="sessions-chart-grid-x-labels" aria-hidden="true">${renderXLabels(days, columns)}</div>
    </div>
  </div>`;
}
