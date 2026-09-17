import {
  renderSessionsAppointmentRowList,
  renderSessionsPageHeader,
} from "../patterns/index.js";
import { escapeHtml } from "../../utils.js";

function renderEmptyState({
  title = "You don't have any activity",
  clientLinkHref = "#",
  clientLinkLabel = "client",
}) {
  return `
    <div class="sessions-appointment-activity-card__empty">
      <img class="sessions-appointment-activity-card__empty-icon" src="./assets/IconCash.svg" alt="" />
      <h3 class="sessions-page-header__title sessions-appointment-activity-card__empty-title">${escapeHtml(title)}</h3>
      <p class="sessions-page-header__body sessions-appointment-activity-card__empty-body">
        Add a new <a class="sessions-appointment-activity-card__empty-link" href="${escapeHtml(clientLinkHref)}">${escapeHtml(clientLinkLabel)}</a> to make some bread
      </p>
    </div>
  `;
}

export function renderSessionsAppointmentActivityCard({
  title = "Appointment activity",
  appointments = [],
  emptyTitle = "You don't have any activity",
  clientLinkHref = "#",
  clientLinkLabel = "client",
  className = "",
} = {}) {
  const classes = ["sessions-card", "sessions-metric-card", "sessions-appointment-activity-card", className]
    .filter(Boolean)
    .join(" ");
  const isEmpty = !appointments.length;
  const body = isEmpty
    ? renderEmptyState({ title: emptyTitle, clientLinkHref, clientLinkLabel })
    : `<div class="sessions-appointment-activity-card__rows">${renderSessionsAppointmentRowList(appointments)}</div>`;

  return `<article class="${classes}">
    <div class="sessions-metric-card__header">
      ${renderSessionsPageHeader({ title })}
    </div>
    ${body}
  </article>`;
}
