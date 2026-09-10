import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsMetricValue } from "../../../components/patterns/index.js";

export function renderMetricValuePatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Metric Value", "", metricValueExamples(), "button-example-section card-example-section")}
  `;
}

function metricValueExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-metric-value-currency-example",
      tocTitle: "Sales volume",
      preview: `
        <div class="sessions-metric-value-preview-row">
          ${renderSessionsMetricValue({ value: "$2,300.00" })}
          ${renderSessionsMetricValue({ value: "$0.00" })}
        </div>
      `,
      codeId: "sessions-metric-value-currency-code",
      filename: "SalesVolumeMetric.tsx",
      code: sampleSalesVolumeMetricCode(),
      className: "is-sessions-metric-value",
    })}
    ${componentExampleWrapper({
      id: "sessions-metric-value-booked-example",
      tocTitle: "Booked",
      preview: `
        <div class="sessions-metric-value-preview-row">
          ${renderSessionsMetricValue({ value: "17", label: "Booked" })}
          ${renderSessionsMetricValue({ value: "0", label: "Booked" })}
        </div>
      `,
      codeId: "sessions-metric-value-booked-code",
      filename: "BookedMetric.tsx",
      code: sampleBookedMetricCode(),
      className: "is-sessions-metric-value",
    })}
  `;
}

function sampleSalesVolumeMetricCode() {
  return `import { MetricValue } from "@sessions/design-system";

export function SalesVolumeMetric({ amount, locale, currency }) {
  const value = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);

  return <MetricValue value={value} />;
}`;
}

function sampleBookedMetricCode() {
  return `import { MetricValue } from "@sessions/design-system";

export function BookedMetric({ count }) {
  return <MetricValue value={String(count)} label="Booked" />;
}`;
}
