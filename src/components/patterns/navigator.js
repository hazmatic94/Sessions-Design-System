import { escapeHtml } from "../../utils.js";

const CHEVRON_LEFT_ICON = "/assets/IconChevronLeft.svg";
const CHEVRON_RIGHT_ICON = "/assets/IconCehvronRight.svg";
const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";
const REFRESH_ICON = "/assets/IconRefresh.svg";
// ponytail: en-US short weekday/month only; re-pick if format/locale changes
export const NAVIGATOR_DATE_LABEL_SIZING_TEXT = "Wed, Aug 31";
export const NAVIGATOR_VIEW_LABEL_SIZING_TEXT = "3 Day";

const CALENDAR_VIEW_LABELS = {
  day: "Day",
  week: "Week",
  month: "Month",
  "3day": "3 Day",
};

const CALENDAR_VIEW_ICONS = {
  day: "/assets/IconDay.svg",
  week: "/assets/IconWeek.svg",
  month: "/assets/IconMonth.svg",
  "3day": "/assets/Icon3Day.svg",
};

export function parseNavigatorDate(value = new Date()) {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toNavigatorDateValue(value = new Date()) {
  const date = parseNavigatorDate(value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatNavigatorDate(value = new Date()) {
  return parseNavigatorDate(value).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function addNavigatorDays(value, amount) {
  const date = parseNavigatorDate(value);
  date.setDate(date.getDate() + amount);
  return toNavigatorDateValue(date);
}

function renderNavigatorIcon(direction) {
  const src = direction === "previous" ? CHEVRON_LEFT_ICON : CHEVRON_RIGHT_ICON;

  return `<img class="sessions-navigator__icon" src="${src}" width="24" height="24" alt="" aria-hidden="true" />`;
}

function renderNavigatorAssetIcon(src, className = "") {
  const classes = ["sessions-navigator__icon", className].filter(Boolean).join(" ");

  return `<img class="${classes}" src="${src}" width="24" height="24" alt="" aria-hidden="true" />`;
}

export function formatCalendarViewLabel(view = "day") {
  return CALENDAR_VIEW_LABELS[view] ?? String(view);
}

export function calendarViewIconSrc(view = "day") {
  return CALENDAR_VIEW_ICONS[view] ?? CALENDAR_VIEW_ICONS.day;
}

export function renderSessionsNavigator({
  date = new Date(),
  dateLabel,
  previousLabel = "Previous day",
  nextLabel = "Next day",
  previousDisabled = false,
  nextDisabled = false,
  ariaLabel = "Date navigator",
  className = "",
} = {}) {
  const dateValue = toNavigatorDateValue(date);
  const resolvedDateLabel = dateLabel ?? formatNavigatorDate(dateValue);
  const classes = ["sessions-navigator", className].filter(Boolean).join(" ");

  return `<nav class="${classes}" data-sessions-navigator data-sessions-navigator-value="${escapeHtml(dateValue)}" aria-label="${escapeHtml(ariaLabel)}"><button class="sessions-navigator__control sessions-navigator__control--previous" type="button" data-sessions-navigator-previous aria-label="${escapeHtml(previousLabel)}"${previousDisabled ? " disabled" : ""}>${renderNavigatorIcon("previous")}</button><button class="sessions-navigator__date" type="button" data-sessions-navigator-date aria-haspopup="dialog" aria-label="${escapeHtml(resolvedDateLabel)}"><span class="sessions-navigator__date-sizing" aria-hidden="true">${escapeHtml(NAVIGATOR_DATE_LABEL_SIZING_TEXT)}</span><span class="sessions-navigator__date-label" data-sessions-navigator-date-label>${escapeHtml(resolvedDateLabel)}</span></button><button class="sessions-navigator__control sessions-navigator__control--next" type="button" data-sessions-navigator-next aria-label="${escapeHtml(nextLabel)}"${nextDisabled ? " disabled" : ""}>${renderNavigatorIcon("next")}</button></nav>`;
}

export function renderSessionsCalendarViewNavigator({
  view = "day",
  viewLabel,
  resetLabel = "Reset calendar view",
  ariaLabel = "Calendar view",
  className = "",
} = {}) {
  const resolvedViewLabel = viewLabel ?? formatCalendarViewLabel(view);
  const classes = ["sessions-navigator", "sessions-navigator--calendar-view", className]
    .filter(Boolean)
    .join(" ");

  return `<nav class="${classes}" data-sessions-calendar-view-nav data-sessions-calendar-view-value="${escapeHtml(view)}" aria-label="${escapeHtml(ariaLabel)}"><button class="sessions-navigator__control sessions-navigator__control--reset" type="button" data-sessions-calendar-view-reset aria-label="${escapeHtml(resetLabel)}">${renderNavigatorAssetIcon(REFRESH_ICON)}</button><button class="sessions-navigator__view" type="button" data-sessions-calendar-view-trigger aria-haspopup="menu" aria-expanded="false" aria-label="${escapeHtml(resolvedViewLabel)} view">${renderNavigatorAssetIcon(calendarViewIconSrc(view), "sessions-navigator__icon--view")}<span class="sessions-navigator__view-label-wrap"><span class="sessions-navigator__view-sizing" aria-hidden="true">${escapeHtml(NAVIGATOR_VIEW_LABEL_SIZING_TEXT)}</span><span class="sessions-navigator__view-label" data-sessions-calendar-view-label>${escapeHtml(resolvedViewLabel)}</span></span>${renderNavigatorAssetIcon(CHEVRON_DOWN_ICON, "sessions-navigator__icon--chevron")}</button></nav>`;
}
