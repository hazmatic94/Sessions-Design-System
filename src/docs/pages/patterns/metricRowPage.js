import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsMetricRow } from "../../../components/patterns/index.js";

export function renderMetricRowPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Metric Row", "", metricRowExamples(), "button-example-section card-example-section")}
  `;
}

function metricRowExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-metric-row-appointments-example",
      tocTitle: "Appointments",
      preview: `
        <div class="sessions-metric-row-list">
          ${renderSessionsMetricRow({ label: "Confirmed Appointments", value: "32" })}
          ${renderSessionsMetricRow({ label: "Cancelled Appointments", value: "4" })}
        </div>
      `,
      codeId: "sessions-metric-row-appointments-code",
      filename: "AppointmentMetrics.tsx",
      code: sampleAppointmentMetricsCode(),
      className: "is-sessions-metric-row",
    })}
    ${componentExampleWrapper({
      id: "sessions-metric-row-appointments-empty-example",
      tocTitle: "Empty state",
      preview: `
        <div class="sessions-metric-row-list">
          ${renderSessionsMetricRow({ label: "Confirmed Appointments", value: "0" })}
          ${renderSessionsMetricRow({ label: "Cancelled Appointments", value: "0" })}
        </div>
      `,
      codeId: "sessions-metric-row-appointments-empty-code",
      filename: "AppointmentMetricsEmpty.tsx",
      code: sampleAppointmentMetricsEmptyCode(),
      className: "is-sessions-metric-row",
    })}
    ${componentExampleWrapper({
      id: "sessions-metric-row-summary-example",
      tocTitle: "Summary",
      preview: `
        <div class="sessions-metric-row-list">
          ${renderSessionsMetricRow({ label: "Appointments", value: "3" })}
          ${renderSessionsMetricRow({ label: "Appointments Value", value: "$215.00" })}
        </div>
      `,
      codeId: "sessions-metric-row-summary-code",
      filename: "AppointmentSummaryMetrics.tsx",
      code: sampleAppointmentSummaryCode(),
      className: "is-sessions-metric-row",
    })}
    ${componentExampleWrapper({
      id: "sessions-metric-row-summary-empty-example",
      tocTitle: "Summary empty state",
      preview: `
        <div class="sessions-metric-row-list">
          ${renderSessionsMetricRow({ label: "Appointments", value: "0" })}
          ${renderSessionsMetricRow({ label: "Appointments Value", value: "$0.00" })}
        </div>
      `,
      codeId: "sessions-metric-row-summary-empty-code",
      filename: "AppointmentSummaryMetricsEmpty.tsx",
      code: sampleAppointmentSummaryEmptyCode(),
      className: "is-sessions-metric-row",
    })}
  `;
}

function sampleAppointmentMetricsCode() {
  return `import { MetricRow } from "@sessions/design-system";

export function AppointmentMetrics({ confirmed, cancelled }) {
  return (
    <>
      <MetricRow label="Confirmed Appointments" value={String(confirmed)} />
      <MetricRow label="Cancelled Appointments" value={String(cancelled)} />
    </>
  );
}`;
}

function sampleAppointmentMetricsEmptyCode() {
  return `import { MetricRow } from "@sessions/design-system";

export function AppointmentMetrics({ confirmed = 0, cancelled = 0 }) {
  return (
    <>
      <MetricRow label="Confirmed Appointments" value={String(confirmed)} />
      <MetricRow label="Cancelled Appointments" value={String(cancelled)} />
    </>
  );
}`;
}

function sampleAppointmentSummaryCode() {
  return `import { MetricRow } from "@sessions/design-system";

export function AppointmentSummaryMetrics({ count, totalValue, locale, currency }) {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(totalValue);

  return (
    <>
      <MetricRow label="Appointments" value={String(count)} />
      <MetricRow label="Appointments Value" value={formattedValue} />
    </>
  );
}`;
}

function sampleAppointmentSummaryEmptyCode() {
  return sampleAppointmentSummaryCode();
}
