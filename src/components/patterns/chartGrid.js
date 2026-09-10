function renderYTicks(rows) {
  return Array.from({ length: rows + 1 }, (_, index) => {
    const top = rows === 0 ? 0 : (index / rows) * 100;
    return `<span class="sessions-chart-grid__y-tick" style="top: ${top}%"></span>`;
  }).join("");
}

export function renderSessionsChartGrid({
  columns = 7,
  rows = 4,
  className = "",
} = {}) {
  const cellCount = columns * rows;
  const cells = Array.from({ length: cellCount }, () =>
    '<div class="sessions-chart-grid__cell" aria-hidden="true"></div>',
  ).join("");
  const classes = ["sessions-chart-grid", className].filter(Boolean).join(" ");

  return `<div class="sessions-chart-grid-wrap">
    <div class="sessions-chart-grid-y-ticks" aria-hidden="true">${renderYTicks(rows)}</div>
    <div class="${classes}" style="--sessions-chart-grid-columns: ${columns}; --sessions-chart-grid-rows: ${rows};" role="img" aria-label="Chart grid">${cells}</div>
  </div>`;
}
