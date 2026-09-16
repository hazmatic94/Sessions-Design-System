import { escapeHtml } from "../../utils.js";
import { SESSIONS_CHART_COLORS } from "./chartColors.js";

const Y_AXIS_INCREMENT = 60;
const GRID_WIDTH = 565;
const GRID_HEIGHT = 210;
const BAR_WIDTH_RATIO = 0.45;
let areaGradientId = 0;

function nextAreaGradientId() {
  areaGradientId += 1;
  return `sessions-chart-area-fill-${areaGradientId}`;
}

function usesFlexXAxis(variant) {
  return variant === "area" || variant === "bar" || variant === "lines";
}

function resolveGridColumns(columns, variant) {
  if (variant === "area" || variant === "lines") return Math.max(columns - 1, 1);
  if (variant === "bar") return columns;
  return columns;
}

function usesWeekdayLabels(variant) {
  return variant === "area" || variant === "bar" || variant === "lines";
}

function resolveVerticalLineCount(columns, variant) {
  if (usesFlexXAxis(variant)) return columns;
  return columns + 1;
}

function resolveDayCount(columns, variant) {
  if (usesFlexXAxis(variant)) return columns;
  return columns + 1;
}

function axisValueTop(value, axisMax) {
  if (axisMax <= 0) return 0;
  return (1 - value / axisMax) * 100;
}

function renderYTicks(axis) {
  return axis.ticks
    .map((tick) => {
      const top = axisValueTop(tick, axis.max);
      return `<span class="sessions-chart-grid__y-tick" style="top: ${top}%"></span>`;
    })
    .join("");
}

function linePosition(index, lineCount) {
  const span = Math.max(lineCount - 1, 1);
  const left = (index / span) * 100;
  return `${left}%`;
}

function renderXTicks(columns, variant = "default") {
  if (variant === "area" || variant === "lines") {
    return Array.from({ length: columns }, () => `<span class="sessions-chart-grid__x-tick"></span>`).join("");
  }

  const tickCount = variant === "bar" ? columns : resolveVerticalLineCount(columns, variant);

  return Array.from({ length: tickCount }, (_, index) => {
    if (variant === "bar") {
      return `<span class="sessions-chart-grid__x-tick"></span>`;
    }
    const left = linePosition(index, tickCount);
    return `<span class="sessions-chart-grid__x-tick" style="left: ${left}"></span>`;
  }).join("");
}

function resolveYAxis(max, rows, increment = Y_AXIS_INCREMENT, ticks) {
  if (Array.isArray(ticks) && ticks.length) {
    const sorted = [...ticks].sort((a, b) => a - b);
    return {
      ticks: sorted,
      max: sorted[sorted.length - 1],
      step: null,
    };
  }

  const safeRows = Math.max(rows, 1);
  const requested = Number.isFinite(max) ? Math.max(0, max) : increment * safeRows;

  if (requested <= increment) {
    const step = requested / safeRows;
    return {
      ticks: Array.from({ length: safeRows + 1 }, (_, index) => step * (safeRows - index)),
      max: requested,
      step,
    };
  }

  const step = Math.max(
    increment,
    Math.ceil(requested / safeRows / increment) * increment,
  );
  return {
    ticks: Array.from({ length: safeRows + 1 }, (_, index) => step * (safeRows - index)),
    max: step * safeRows,
    step,
  };
}

function formatAxisAmount(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function resolveYAxisFormat(variant, yAxisFormat) {
  if (yAxisFormat) return yAxisFormat;
  return variant === "bar" ? "number" : "currency";
}

function formatYAxisLabel(value, format = "currency") {
  if (format === "number") {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
  }
  return formatAxisAmount(value);
}

function formatAxisSummary(axis) {
  const min = formatYAxisLabel(axis.ticks[0] ?? 0, axis.format);
  const max = formatYAxisLabel(axis.max, axis.format);
  return `Chart grid from ${min} to ${max}`;
}

function renderYLabels(axis) {
  const labels = axis.ticks.map((value, index) => {
    const top = axisValueTop(value, axis.max);
    const label = formatYAxisLabel(value, axis.format);
    const edgeClass =
      index === 0
        ? " sessions-chart-grid__y-label--start"
        : index === axis.ticks.length - 1
          ? " sessions-chart-grid__y-label--end"
          : "";
    return `<span class="sessions-chart-grid__y-label${edgeClass}" style="top: ${top}%">${label}</span>`;
  });
  const sizer = formatYAxisLabel(axis.max, axis.format);

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

function formatDayLabel(date, format = "ordinal") {
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  if (format === "weekday") return weekday;
  return `${weekday} ${dayOrdinal(date.getDate())}`;
}

function resolvePointSpan(columns, pointCount, variant) {
  if (variant === "area") return Math.max(pointCount - 1, 1);
  return Math.max(columns, 1);
}

function pointToX(pointIndex, span) {
  if (span <= 0) return 0;
  return (pointIndex / span) * GRID_WIDTH;
}

function resolvePlotViewBox() {
  return `0 0 ${GRID_WIDTH} ${GRID_HEIGHT}`;
}

function barCenterX(index, count) {
  return ((index + 0.5) / count) * GRID_WIDTH;
}

function renderXLabels(days, columns, variant = "default") {
  const labelFormat = usesWeekdayLabels(variant) ? "weekday" : "ordinal";

  return days
    .map((date, index) => {
      if (variant === "area" || variant === "lines") {
        return `<span class="sessions-chart-grid__x-label"><span class="sessions-chart-grid__x-label-text">${escapeHtml(formatDayLabel(date, labelFormat))}</span></span>`;
      }
      if (variant === "bar") {
        return `<span class="sessions-chart-grid__x-label"><span class="sessions-chart-grid__x-label-text">${escapeHtml(formatDayLabel(date, labelFormat))}</span></span>`;
      }
      const left = linePosition(index, resolveVerticalLineCount(columns, variant));
      return `<span class="sessions-chart-grid__x-label" style="left: ${left}"><span class="sessions-chart-grid__x-label-text">${escapeHtml(formatDayLabel(date, labelFormat))}</span></span>`;
    })
    .join("");
}

function seriesValuesMax(series) {
  const values = series.flatMap((item) =>
    Array.isArray(item?.values) ? item.values.filter((value) => Number.isFinite(value)) : [],
  );
  return values.length ? Math.max(0, ...values) : 0;
}

function barsMax(bars) {
  const totals = bars.map((bar) => {
    const base = Number.isFinite(bar?.base) ? bar.base : Number.isFinite(bar?.value) ? bar.value : 0;
    const stack = Number.isFinite(bar?.stack) ? bar.stack : 0;
    return base + stack;
  });
  return totals.length ? Math.max(0, ...totals) : 0;
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

function renderAreaSeries(item, index, columns, axisMax) {
  const values = Array.isArray(item?.values) ? item.values.filter((value) => Number.isFinite(value)) : [];
  if (!values.length) return "";

  const color = escapeHtml(resolveSeriesColor(item, index));
  const span = resolvePointSpan(columns, values.length, "area");
  const points = values.map((value, pointIndex) => ({
    x: pointToX(pointIndex, span),
    y: valueToY(value, axisMax, GRID_HEIGHT),
  }));
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const gradientId = nextAreaGradientId();
  const areaPoints = [
    ...points.map((point) => `${point.x},${point.y}`),
    `${points[points.length - 1].x},${GRID_HEIGHT}`,
    `${points[0].x},${GRID_HEIGHT}`,
  ].join(" ");
  const dots = points
    .map(
      (point) =>
        `<circle class="sessions-chart-grid__dot" cx="${point.x}" cy="${point.y}" r="4" fill="${color}" />`,
    )
    .join("");

  return `<g class="sessions-chart-grid__series sessions-chart-grid__series--area">
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <polygon class="sessions-chart-grid__area" points="${areaPoints}" fill="url(#${gradientId})" />
    <polyline class="sessions-chart-grid__line" points="${polyline}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    ${dots}
  </g>`;
}

function renderLineSeries(item, index, columns, axisMax, pointVariant = "default") {
  const values = Array.isArray(item?.values) ? item.values.filter((value) => Number.isFinite(value)) : [];
  if (!values.length) return "";

  const color = escapeHtml(resolveSeriesColor(item, index));
  const span = resolvePointSpan(columns, values.length, pointVariant);
  const points = values.map((value, pointIndex) => ({
    x: pointToX(pointIndex, span),
    y: valueToY(value, axisMax, GRID_HEIGHT),
  }));
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
}

function renderBarPlot(bars, columns, axisMax) {
  if (!bars.length) return "";

  const barWidth = (GRID_WIDTH / columns) * BAR_WIDTH_RATIO;
  const green = escapeHtml(SESSIONS_CHART_COLORS.sales);
  const stackColor = escapeHtml(SESSIONS_CHART_COLORS.stack);
  const barMarkup = bars
    .map((bar, index) => {
      const base = Number.isFinite(bar?.base) ? bar.base : Number.isFinite(bar?.value) ? bar.value : 0;
      const stack = Number.isFinite(bar?.stack) ? bar.stack : 0;
      const total = base + stack;
      const centerX = barCenterX(index, columns);
      const x = centerX - barWidth / 2;
      const baseY = valueToY(base, axisMax, GRID_HEIGHT);
      const totalY = valueToY(total, axisMax, GRID_HEIGHT);
      const baseHeight = GRID_HEIGHT - baseY;
      const stackHeight = baseY - totalY;
      const segments = [
        `<rect class="sessions-chart-grid__bar sessions-chart-grid__bar--base" x="${x}" y="${baseY}" width="${barWidth}" height="${baseHeight}" rx="2" fill="${green}" />`,
      ];

      if (stack > 0) {
        segments.push(
          `<rect class="sessions-chart-grid__bar sessions-chart-grid__bar--stack" x="${x}" y="${totalY}" width="${barWidth}" height="${stackHeight}" rx="2" fill="${stackColor}" />`,
        );
      }

      return `<g class="sessions-chart-grid__bar-group">${segments.join("")}</g>`;
    })
    .join("");

  return `<svg class="sessions-chart-grid__bars" viewBox="0 0 ${GRID_WIDTH} ${GRID_HEIGHT}" aria-hidden="true">${barMarkup}</svg>`;
}

function renderSeriesPlot(series, columns, axisMax, variant = "default") {
  const plotSeries = variant === "area" ? series.slice(0, 1) : series;
  const linePointVariant = variant === "area" || variant === "lines" ? "area" : "default";
  const lines = plotSeries
    .map((item, index) =>
      variant === "area"
        ? renderAreaSeries(item, index, columns, axisMax)
        : renderLineSeries(item, index, columns, axisMax, linePointVariant),
    )
    .join("");

  if (!lines) return "";

  return `<svg class="sessions-chart-grid__lines" viewBox="${resolvePlotViewBox()}" aria-hidden="true">${lines}</svg>`;
}

function resolveWrapClass(variant) {
  return [
    "sessions-chart-grid-wrap",
    variant === "area" || variant === "lines" ? "sessions-chart-grid-wrap--area" : "",
    variant === "bar" ? "sessions-chart-grid-wrap--bar" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function renderSessionsChartGrid({
  columns = 7,
  rows = 4,
  max,
  yAxisTicks,
  yAxisFormat,
  dates,
  startDate,
  series = [],
  bars = [],
  variant = "default",
  className = "",
} = {}) {
  const gridColumns = resolveGridColumns(columns, variant);
  const cellCount = gridColumns * rows;
  const usesBorderGrid = variant === "area" || variant === "bar" || variant === "lines";
  const cells = Array.from({ length: cellCount }, (_, index) => {
    const isColumnEnd = usesBorderGrid && (index + 1) % gridColumns === 0;
    const isGridRowEnd = index >= cellCount - gridColumns;
    const cellClass = [
      isColumnEnd ? "sessions-chart-grid__cell--column-end" : "",
      isGridRowEnd ? "sessions-chart-grid__cell--grid-row-end" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return `<div class="sessions-chart-grid__cell${cellClass ? ` ${cellClass}` : ""}" aria-hidden="true"></div>`;
  }).join("");
  const classes = ["sessions-chart-grid", className].filter(Boolean).join(" ");
  const axis = {
    ...resolveYAxis(
      max ?? (variant === "bar" ? barsMax(bars) : seriesValuesMax(series)),
      rows,
      Y_AXIS_INCREMENT,
      yAxisTicks,
    ),
    format: resolveYAxisFormat(variant, yAxisFormat),
  };
  const dayCount = resolveDayCount(columns, variant);
  const days = resolveDays(dates, startDate, dayCount);
  const plot =
    variant === "bar"
      ? renderBarPlot(bars, columns, axis.max)
      : renderSeriesPlot(series, columns, axis.max, variant);
  const wrapClass = resolveWrapClass(variant);
  const dayAxisStyle = variant === "bar" ? ` style="--sessions-chart-grid-day-columns: ${columns}"` : "";

  return `<div class="${wrapClass}">
    <div class="sessions-chart-grid-y-axis" aria-hidden="true">
      <div class="sessions-chart-grid-y-labels">${renderYLabels(axis)}</div>
    </div>
    <div class="sessions-chart-grid-plot">
      <div class="${classes}" style="--sessions-chart-grid-columns: ${gridColumns}; --sessions-chart-grid-rows: ${rows};" role="img" aria-label="${formatAxisSummary(axis)}">${cells}${plot}<div class="sessions-chart-grid-y-ticks">${renderYTicks(axis)}</div></div>
      <div class="sessions-chart-grid-x-ticks"${dayAxisStyle}>${renderXTicks(columns, variant)}</div>
      <div class="sessions-chart-grid-x-labels"${dayAxisStyle} aria-hidden="true">${renderXLabels(days, columns, variant)}</div>
    </div>
  </div>`;
}
