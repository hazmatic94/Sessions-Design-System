import { applySessionsCalendarSelection } from "./calendar.js";

export function setupSessionsCalendars() {
  document.addEventListener("click", (event) => {
    const dateButton = event.target.closest("[data-sessions-calendar] .sessions-date");
    if (!dateButton || dateButton.disabled) return;

    event.preventDefault();

    const calendar = dateButton.closest("[data-sessions-calendar]");
    const dateKey = dateButton.dataset.calendarDate;
    if (!calendar || !dateKey) return;

    const currentStart = readCalendarDate(calendar, "rangeStart");
    const currentEnd = readCalendarDate(calendar, "rangeEnd");

    if (!currentStart || currentEnd) {
      applySessionsCalendarSelection(calendar, { rangeStart: dateKey, rangeEnd: null });
      return;
    }

    if (dateKey === currentStart) {
      applySessionsCalendarSelection(calendar, { rangeStart: dateKey, rangeEnd: dateKey });
      return;
    }

    applySessionsCalendarSelection(calendar, {
      rangeStart: dateKey < currentStart ? dateKey : currentStart,
      rangeEnd: dateKey < currentStart ? currentStart : dateKey,
    });
  });
}

function readCalendarDate(calendar, key) {
  const value = calendar.dataset[key];
  return value || null;
}
