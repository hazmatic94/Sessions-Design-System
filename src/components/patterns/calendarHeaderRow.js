import { escapeHtml } from "../../utils.js";
import { renderPrimaryButton, renderSecondaryButton } from "../button/button.js";
import {
  parseNavigatorDate,
  renderSessionsCalendarViewNavigator,
  renderSessionsNavigator,
  toNavigatorDateValue,
} from "./navigator.js";

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

  return `<button class="sessions-button sessions-button--secondary sessions-button--icon-end sessions-calendar-header-row__mobile-date" type="button" data-sessions-calendar-header-mobile-date data-sessions-calendar-header-mobile-date-value="${escapeHtml(dateValue)}" aria-haspopup="dialog" aria-label="${escapeHtml(resolvedDateLabel)}"><span class="sessions-calendar-header-row__mobile-date-wrap"><span class="sessions-calendar-header-row__mobile-date-sizing" aria-hidden="true">${escapeHtml(CALENDAR_HEADER_MOBILE_DATE_SIZING_TEXT)}</span><span class="sessions-calendar-header-row__mobile-date-label" data-sessions-calendar-header-mobile-date-label>${escapeHtml(resolvedDateLabel)}</span></span><span class="sessions-button__icon" style="--sessions-button-icon: url('${CHEVRON_DOWN_ICON}')" aria-hidden="true"></span></button>`;
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
  })}${renderSessionsNavigator({ date })}${renderSecondaryButton({
    iconSrc: TEAM_ICON,
    ariaLabel: teamAriaLabel,
    className: "sessions-calendar-header-row__team",
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderSessionsCalendarViewNavigator({
    view,
  })}${renderPrimaryButton({
    label: addLabel,
    iconSrc: CHEVRON_DOWN_ICON,
    iconPosition: "end",
    className: "sessions-calendar-header-row__add",
  })}</div></div>`;
}

function renderMobileCalendarHeaderRow({ date, dateLabel, teamAriaLabel }) {
  return `<div class="sessions-calendar-header-row__layout sessions-calendar-header-row__layout--mobile"><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--start">${renderMobileCalendarHeaderDateButton({
    date,
    dateLabel,
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderSecondaryButton({
    iconSrc: TEAM_ICON,
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
