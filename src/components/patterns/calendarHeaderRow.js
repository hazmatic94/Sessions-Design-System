import { escapeHtml } from "../../utils.js";
import { renderSecondaryButton } from "../button/button.js";
import {
  parseNavigatorDate,
  renderSessionsCalendarViewNavigator,
  renderSessionsNavigator,
  toNavigatorDateValue,
} from "./navigator.js?v=sessions-calendar-header-icons-v1";

const TEAM_ICON = "/assets/IconTeam.svg";
const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";
// ponytail: en-US short weekday + day + month; re-pick if mobile format changes
export const CALENDAR_HEADER_MOBILE_DATE_SIZING_TEXT = "Wed 31 Aug";

export function formatCalendarHeaderMobileDate(value = new Date()) {
  const date = parseNavigatorDate(value);

  return `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "short" })}`;
}

function renderMobileCalendarHeaderDateButton({ date, dateLabel }) {
  const dateValue = toNavigatorDateValue(date);
  const resolvedDateLabel = dateLabel ?? formatCalendarHeaderMobileDate(dateValue);

  return `<button class="sessions-button sessions-button--secondary sessions-button--icon-end sessions-calendar-header-row__mobile-date" type="button" data-sessions-calendar-header-mobile-date data-sessions-calendar-header-mobile-date-value="${escapeHtml(dateValue)}" aria-haspopup="dialog" aria-label="${escapeHtml(resolvedDateLabel)}"><span class="sessions-calendar-header-row__mobile-date-wrap"><span class="sessions-calendar-header-row__mobile-date-sizing" aria-hidden="true">${escapeHtml(CALENDAR_HEADER_MOBILE_DATE_SIZING_TEXT)}</span><span class="sessions-calendar-header-row__mobile-date-label" data-sessions-calendar-header-mobile-date-label>${escapeHtml(resolvedDateLabel)}</span></span>${renderHeaderAssetIcon(CHEVRON_DOWN_ICON)}</button>`;
}

function renderHeaderAssetIcon(src, className = "") {
  const classes = ["sessions-button__icon", "sessions-button__icon--img", className]
    .filter(Boolean)
    .join(" ");

  return `<img class="${classes}" src="${src}" width="24" height="24" alt="" aria-hidden="true" />`;
}

function renderHeaderIconButton({ src, ariaLabel, className = "" }) {
  return `<button class="sessions-button sessions-button--secondary sessions-button--icon-only ${className}" type="button" aria-label="${escapeHtml(ariaLabel)}">${renderHeaderAssetIcon(src)}</button>`;
}

function renderCalendarHeaderAddButton({ label }) {
  return `<button class="sessions-button sessions-button--primary sessions-button--icon-end sessions-calendar-header-row__add" type="button"><span class="sessions-button__label">${escapeHtml(label)}</span>${renderHeaderAssetIcon(CHEVRON_DOWN_ICON, "sessions-calendar-header-row__add-chevron")}</button>`;
}

function renderDesktopCalendarHeaderRow({
  date,
  view,
  todayLabel,
  addLabel,
  teamAriaLabel,
}) {
  return `<div class="sessions-calendar-header-row__layout sessions-calendar-header-row__layout--desktop"><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--start">${renderSecondaryButton({
    label: todayLabel,
    className: "sessions-calendar-header-row__today",
  })}${renderSessionsNavigator({ date })}${renderHeaderIconButton({
    src: TEAM_ICON,
    ariaLabel: teamAriaLabel,
    className: "sessions-calendar-header-row__team",
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderSessionsCalendarViewNavigator({
    view,
  })}${renderCalendarHeaderAddButton({
    label: addLabel,
  })}</div></div>`;
}

function renderMobileCalendarHeaderRow({ date, dateLabel, teamAriaLabel }) {
  return `<div class="sessions-calendar-header-row__layout sessions-calendar-header-row__layout--mobile"><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--start">${renderMobileCalendarHeaderDateButton({
    date,
    dateLabel,
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderHeaderIconButton({
    src: TEAM_ICON,
    ariaLabel: teamAriaLabel,
    className: "sessions-calendar-header-row__team",
  })}</div></div>`;
}

export function renderSessionsCalendarHeaderRow({
  date = "2026-08-18",
  dateLabel,
  view = "day",
  todayLabel = "Today",
  addLabel = "Add",
  teamAriaLabel = "Team",
  className = "",
} = {}) {
  const classes = ["sessions-calendar-header-row", className].filter(Boolean).join(" ");

  return `<header class="${classes}" data-sessions-calendar-header-row>${renderDesktopCalendarHeaderRow({
    date,
    view,
    todayLabel,
    addLabel,
    teamAriaLabel,
  })}${renderMobileCalendarHeaderRow({
    date,
    dateLabel: dateLabel ?? formatCalendarHeaderMobileDate(date),
    teamAriaLabel,
  })}</header>`;
}
