import { renderMetricCardViewAllFooter } from "./cardViewAllFooter.js";
import {
  renderSessionsPageHeader,
  renderSessionsTopServiceRowList,
} from "../patterns/index.js";

export function renderSessionsTopServicesCard({
  title = "Top Services",
  period = "Last 30 Days",
  services = [],
  collapsedCount = 10,
  mobileCollapsedCount = 5,
  viewAllHref = "#",
  viewAllLabel = "View all",
  className = "",
} = {}) {
  const hasDesktopTruncate = services.length > collapsedCount;
  const hasMobileTruncate = services.length > mobileCollapsedCount;
  const classes = [
    "sessions-card",
    "sessions-metric-card",
    "sessions-top-services-card",
    hasDesktopTruncate ? "sessions-top-services-card--desktop-truncate" : "",
    hasMobileTruncate ? "sessions-top-services-card--mobile-truncate" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const viewAllFooter =
    hasDesktopTruncate || hasMobileTruncate
      ? renderMetricCardViewAllFooter({ viewAllHref, viewAllLabel })
      : "";

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title, body: period })}
    </div>
    <div class="sessions-top-services-card__rows">
      ${renderSessionsTopServiceRowList(services)}
      ${viewAllFooter}
    </div>
  </article>`;
}
