import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";
import { addNavigatorDays, parseNavigatorDate, toNavigatorDateValue } from "./navigator.js";

function mondayOf(value) {
  const date = parseNavigatorDate(value);
  const offset = (date.getDay() + 6) % 7;
  return addNavigatorDays(toNavigatorDateValue(date), -offset);
}

export function renderSessionsStaffDayBoard({
  staff = [],
  start = new Date(),
  count = 3,
  week = false,
} = {}) {
  const startValue = week ? mondayOf(toNavigatorDateValue(start)) : toNavigatorDateValue(start);
  const dayCount = week ? 7 : count;
  const days = Array.from({ length: dayCount }, (_, index) => addNavigatorDays(startValue, index));

  return staff
    .map((person) => {
      const avatar = person.avatarSrc
        ? renderSessionsAvatar({ src: person.avatarSrc, alt: "", size: "small" })
        : renderSessionsAvatar({ initial: person.avatarInitial || person.name, size: "small" });
      const cells = days
        .map((value) => {
          const closed = parseNavigatorDate(value).getDay() === 0;
          const closedClass = closed ? " is-closed" : "";
          return `<div class="sessions-staff-day__cell${closedClass}" data-sessions-staff-day="${escapeHtml(value)}"></div>`;
        })
        .join("");

      return `<div class="sessions-staff-day" style="--sessions-calendar-day-count: ${dayCount}"><div class="sessions-staff-day__label">${avatar}<span class="sessions-staff-day__name">${escapeHtml(person.name)}</span></div>${cells}</div>`;
    })
    .join("");
}
