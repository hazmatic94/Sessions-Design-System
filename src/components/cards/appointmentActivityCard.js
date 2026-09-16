import {
  renderSessionsAppointmentRowList,
  renderSessionsPageHeader,
} from "../patterns/index.js";
import { escapeHtml } from "../../utils.js";

export function renderSessionsAppointmentActivityCard({
  title = "Appointment activity",
  appointments = [],
  menuLabel = "More options",
  className = "",
} = {}) {
  const classes = ["sessions-card", "sessions-metric-card", "sessions-appointment-activity-card", className]
    .filter(Boolean)
    .join(" ");

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title })}
      <button class="sessions-metric-card__menu" type="button" aria-label="${escapeHtml(menuLabel)}">
        <img class="sessions-metric-card__menu-icon" src="./assets/IconMore.svg" alt="" />
      </button>
    </div>
    <div class="sessions-appointment-activity-card__rows">
      ${renderSessionsAppointmentRowList(appointments)}
    </div>
  </article>`;
}
