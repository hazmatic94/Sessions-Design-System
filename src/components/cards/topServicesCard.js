import {
  renderSessionsPageHeader,
  renderSessionsTopServiceRowList,
} from "../patterns/index.js";
import { renderMetricCardScrollRegion } from "./metricCardScrollHint.js";

export function renderSessionsTopServicesCard({
  title = "Top Services",
  period = "Last 30 days",
  services = [],
  maxItems = 10,
  className = "",
} = {}) {
  const visibleServices = services.slice(0, maxItems);
  const classes = [
    "sessions-card",
    "sessions-metric-card",
    "sessions-top-services-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title, body: period })}
    </div>
    <div class="sessions-top-services-card__rows">
      ${renderMetricCardScrollRegion(renderSessionsTopServiceRowList(visibleServices))}
    </div>
  </article>`;
}
