export function barBase(bar) {
  if (Number.isFinite(bar?.base)) return bar.base;
  if (Number.isFinite(bar?.value)) return bar.value;
  return 0;
}

export function barStack(bar) {
  return Number.isFinite(bar?.stack) ? bar.stack : 0;
}

export function isChartEmpty(bars) {
  if (!Array.isArray(bars) || !bars.length) return true;
  return bars.every((bar) => barBase(bar) + barStack(bar) === 0);
}

export function resolveEmptyChart(chart = {}) {
  return isChartEmpty(chart.bars) ? { ...chart, bars: [] } : chart;
}
