import { escapeHtml } from "../../utils.js";
import {
  applySessionsCalendarSelection,
  renderSessionsCalendar,
  renderSessionsDualMonthCalendar,
} from "../calendar/calendar.js";
import { renderSessionsMenuItem, renderSessionsMenuPanel } from "../menu/index.js";

const CHEVRON_LEFT_ICON = "/assets/IconChevronLeft.svg";
const CHEVRON_RIGHT_ICON = "/assets/IconCehvronRight.svg";
const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";
const REFRESH_ICON = "/assets/IconRefresh.svg";
// ponytail: en-US short weekday/month only; re-pick if format/locale changes
export const NAVIGATOR_DATE_LABEL_SIZING_TEXT = "Wed, Aug 31";
export const NAVIGATOR_VIEW_LABEL_SIZING_TEXT = "3 day";

const CALENDAR_VIEW_LABELS = {
  day: "Day",
  week: "Week",
  "3day": "3 day",
};

const CALENDAR_VIEWS = [
  { value: "day", label: "Day" },
  { value: "3day", label: "3 day" },
  { value: "week", label: "Week" },
];

const CALENDAR_VIEW_ICONS = {
  day: "/assets/IconDay.svg",
  week: "/assets/IconWeek.svg",
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

  return `<nav class="${classes}" data-sessions-navigator data-sessions-navigator-value="${escapeHtml(dateValue)}" aria-label="${escapeHtml(ariaLabel)}"><button class="sessions-navigator__control sessions-navigator__control--previous" type="button" data-sessions-navigator-previous aria-label="${escapeHtml(previousLabel)}"${previousDisabled ? " disabled" : ""}>${renderNavigatorIcon("previous")}</button><button class="sessions-navigator__date" type="button" data-sessions-navigator-date aria-haspopup="dialog" aria-expanded="false" aria-label="${escapeHtml(resolvedDateLabel)}"><span class="sessions-navigator__date-sizing" aria-hidden="true">${escapeHtml(NAVIGATOR_DATE_LABEL_SIZING_TEXT)}</span><span class="sessions-navigator__date-label" data-sessions-navigator-date-label>${escapeHtml(resolvedDateLabel)}</span></button><button class="sessions-navigator__control sessions-navigator__control--next" type="button" data-sessions-navigator-next aria-label="${escapeHtml(nextLabel)}"${nextDisabled ? " disabled" : ""}>${renderNavigatorIcon("next")}</button>${renderNavigatorCalendar(dateValue)}</nav>`;
}

function renderNavigatorCalendar(dateValue) {
  const date = parseNavigatorDate(dateValue);
  const month = date.getMonth();
  const year = date.getFullYear();
  const calendarOptions = {
    rangeStart: dateValue,
    selection: "single",
  };

  return `<div class="sessions-navigator__calendar" data-sessions-navigator-calendar hidden><div class="sessions-navigator__months sessions-navigator__months--dual">${renderSessionsDualMonthCalendar({
    startMonth: month,
    startYear: year,
    ...calendarOptions,
  })}</div><div class="sessions-navigator__months sessions-navigator__months--single">${renderSessionsCalendar({
    month,
    year,
    ...calendarOptions,
  })}</div></div>`;
}

function applyNavigatorDate(navigator, dateKey) {
  navigator.dataset.sessionsNavigatorValue = dateKey;
  const label = formatNavigatorDate(dateKey);
  const dateLabel = navigator.querySelector("[data-sessions-navigator-date-label]");
  const dateButton = navigator.querySelector("[data-sessions-navigator-date]");
  if (dateLabel) dateLabel.textContent = label;
  dateButton?.setAttribute("aria-label", label);
  navigator.querySelectorAll("[data-sessions-calendar]").forEach((calendar) => {
    applySessionsCalendarSelection(calendar, { rangeStart: dateKey, rangeEnd: null });
  });
  navigator.dispatchEvent(
    new CustomEvent("sessions:navigator-date", { bubbles: true, detail: { date: dateKey } }),
  );
}

function setNavigatorCalendarOpen(navigator, open) {
  const dateButton = navigator.querySelector("[data-sessions-navigator-date]");
  const calendar = navigator.querySelector("[data-sessions-navigator-calendar]");
  navigator.classList.toggle("is-open", open);
  dateButton?.setAttribute("aria-expanded", String(open));
  if (calendar) calendar.hidden = !open;
}

export function setupSessionsNavigators(root = document) {
  root.addEventListener("click", (event) => {
    const viewOption = event.target.closest("[data-sessions-calendar-view-option]");
    if (viewOption) {
      const nav = viewOption.closest("[data-sessions-calendar-view-nav]");
      const view = viewOption.dataset.sessionsCalendarViewOption;
      if (nav && view) applyCalendarView(nav, view);
      return;
    }

    const viewTrigger = event.target.closest("[data-sessions-calendar-view-trigger]");
    if (viewTrigger) {
      event.preventDefault();
      const nav = viewTrigger.closest("[data-sessions-calendar-view-nav]");
      if (!nav) return;
      const open = !nav.classList.contains("is-open");
      closeCalendarViewMenus(root, nav);
      root.querySelectorAll("[data-sessions-navigator].is-open").forEach((item) => {
        setNavigatorCalendarOpen(item, false);
      });
      setCalendarViewMenuOpen(nav, open);
      return;
    }

    const dateButton = event.target.closest("[data-sessions-navigator-date]");
    if (dateButton) {
      event.preventDefault();
      const navigator = dateButton.closest("[data-sessions-navigator]");
      if (!navigator) return;
      const open = !navigator.classList.contains("is-open");
      root.querySelectorAll("[data-sessions-navigator].is-open").forEach((item) => {
        if (item !== navigator) setNavigatorCalendarOpen(item, false);
      });
      closeCalendarViewMenus(root);
      setNavigatorCalendarOpen(navigator, open);
      return;
    }

    const pickedDate = event.target.closest("[data-sessions-navigator-calendar] .sessions-date");
    if (pickedDate && !pickedDate.disabled) {
      const navigator = pickedDate.closest("[data-sessions-navigator]");
      const dateKey = pickedDate.dataset.calendarDate;
      if (navigator && dateKey) applyNavigatorDate(navigator, dateKey);
      return;
    }

    if (event.target.closest("[data-sessions-navigator-calendar]")) return;

    root.querySelectorAll("[data-sessions-navigator].is-open").forEach((item) => {
      setNavigatorCalendarOpen(item, false);
    });
    closeCalendarViewMenus(root);
  });
}

function renderCalendarViewMenu(view) {
  const items = CALENDAR_VIEWS.map((item) =>
    renderSessionsMenuItem({
      icon: item.value,
      label: item.label,
      state: item.value === view ? "selected" : "default",
      className: "sessions-calendar-view-menu__option",
      attributes: {
        role: "menuitemradio",
        "aria-checked": item.value === view ? "true" : "false",
        "data-sessions-calendar-view-option": item.value,
      },
    }),
  ).join("");

  return `<div class="sessions-calendar-view-menu" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div>`;
}

function setCalendarViewMenuOpen(nav, open) {
  const trigger = nav.querySelector("[data-sessions-calendar-view-trigger]");
  const menu = nav.querySelector(".sessions-calendar-view-menu");
  nav.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) menu.hidden = !open;
}

function closeCalendarViewMenus(root, except) {
  root.querySelectorAll("[data-sessions-calendar-view-nav].is-open").forEach((nav) => {
    if (nav !== except) setCalendarViewMenuOpen(nav, false);
  });
}

function applyCalendarView(nav, view) {
  nav.dataset.sessionsCalendarViewValue = view;
  const label = formatCalendarViewLabel(view);
  const labelEl = nav.querySelector("[data-sessions-calendar-view-label]");
  if (labelEl) labelEl.textContent = label;
  const trigger = nav.querySelector("[data-sessions-calendar-view-trigger]");
  trigger?.setAttribute("aria-label", `${label} view`);
  const icon = nav.querySelector(".sessions-navigator__icon--view");
  if (icon) icon.src = calendarViewIconSrc(view);
  nav.querySelectorAll("[data-sessions-calendar-view-option]").forEach((item) => {
    const selected = item.dataset.sessionsCalendarViewOption === view;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  setCalendarViewMenuOpen(nav, false);
  nav.dispatchEvent(
    new CustomEvent("sessions:calendar-view", { bubbles: true, detail: { view } }),
  );
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

  return `<nav class="${classes}" data-sessions-calendar-view-nav data-sessions-calendar-view-value="${escapeHtml(view)}" aria-label="${escapeHtml(ariaLabel)}"><button class="sessions-navigator__control sessions-navigator__control--reset" type="button" data-sessions-calendar-view-reset aria-label="${escapeHtml(resetLabel)}">${renderNavigatorAssetIcon(REFRESH_ICON)}</button><button class="sessions-navigator__view" type="button" data-sessions-calendar-view-trigger aria-haspopup="menu" aria-expanded="false" aria-label="${escapeHtml(resolvedViewLabel)} view">${renderNavigatorAssetIcon(calendarViewIconSrc(view), "sessions-navigator__icon--view")}<span class="sessions-navigator__view-label-wrap"><span class="sessions-navigator__view-sizing" aria-hidden="true">${escapeHtml(NAVIGATOR_VIEW_LABEL_SIZING_TEXT)}</span><span class="sessions-navigator__view-label" data-sessions-calendar-view-label>${escapeHtml(resolvedViewLabel)}</span></span>${renderNavigatorAssetIcon(CHEVRON_DOWN_ICON, "sessions-navigator__icon--chevron")}</button>${renderCalendarViewMenu(view)}</nav>`;
}
