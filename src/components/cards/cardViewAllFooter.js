import { renderSecondaryButton } from "../button/button.js";

export function renderMetricCardViewAllFooter({
  viewAllHref = "#",
  viewAllLabel = "View all",
} = {}) {
  return `
    <div class="sessions-metric-card__footer--view-all">
      ${renderSecondaryButton({
        label: viewAllLabel,
        href: viewAllHref,
        className: "sessions-metric-card__view-all",
      })}
    </div>
  `;
}
