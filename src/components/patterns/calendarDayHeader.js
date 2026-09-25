import { escapeHtml } from "../../utils.js";
import { addNavigatorDays, parseNavigatorDate, toNavigatorDateValue } from "./navigator.js";

function formatDayParts(value) {
  const date = parseNavigatorDate(value);

  return {
    date: String(date.getDate()),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

function mondayOf(value) {
  const date = parseNavigatorDate(value);
  const offset = (date.getDay() + 6) % 7;
  return addNavigatorDays(toNavigatorDateValue(date), -offset);
}

export function renderSessionsCalendarDayHeader({
  start = new Date(),
  count = 3,
  selected,
  week = false,
} = {}) {
  const selectedValue = toNavigatorDateValue(selected ?? start);
  const startValue = week ? mondayOf(selectedValue) : toNavigatorDateValue(start);
  const dayCount = week ? 7 : count;
  const days = Array.from({ length: dayCount }, (_, index) => {
    const value = addNavigatorDays(startValue, index);
    const { date, weekday } = formatDayParts(value);
    const isSelected = value === selectedValue;

    return `<div class="sessions-calendar-days__cell${isSelected ? " is-selected" : ""}" data-sessions-calendar-day="${escapeHtml(value)}"><span class="sessions-calendar-days__date">${escapeHtml(date)}</span><span class="sessions-calendar-days__weekday">${escapeHtml(weekday)}</span></div>`;
  }).join("");

  return `<div class="sessions-calendar-days" data-sessions-calendar-days style="--sessions-calendar-day-count: ${dayCount}"><div class="sessions-calendar-days__gutter" aria-hidden="true"></div>${days}</div>`;
}
