import { escapeHtml } from "../../utils.js";
import { renderSessionsDate } from "./date.js";

const CHEVRON_LEFT_ICON = "/assets/IconChevronLeft.svg";
const CHEVRON_RIGHT_ICON = "/assets/IconCehvronRight.svg";
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function renderSessionsCalendar({
  month,
  year,
  selectedDay,
  rangeStart,
  rangeEnd,
  currentDay,
  interactive = true,
  previousMonthLabel = "Previous month",
  nextMonthLabel = "Next month",
} = {}) {
  const today = new Date();
  const resolvedMonth = month ?? today.getMonth();
  const resolvedYear = year ?? today.getFullYear();
  const resolvedCurrentDay =
    currentDay ??
    (resolvedMonth === today.getMonth() && resolvedYear === today.getFullYear()
      ? today.getDate()
      : undefined);
  const currentDateKey = resolvedCurrentDay
    ? toDateKey(resolvedYear, resolvedMonth, resolvedCurrentDay)
    : undefined;
  const rangeStartKey = normalizeRangeKey({
    value: rangeStart,
    year: resolvedYear,
    month: resolvedMonth,
  });
  const rangeEndKey = normalizeRangeKey({
    value: rangeEnd,
    year: resolvedYear,
    month: resolvedMonth,
  });
  const title = formatMonthTitle(resolvedMonth, resolvedYear);
  const monthMarkup = renderMonthPanel({
    month: resolvedMonth,
    year: resolvedYear,
    rangeStart: rangeStartKey,
    rangeEnd: rangeEndKey,
    currentDateKey,
    selectedDay,
    showTitle: false,
  });
  const calendarAttrs = buildCalendarAttrs({
    className: "sessions-calendar",
    interactive,
    months: [{ month: resolvedMonth, year: resolvedYear }],
    currentDateKey,
    rangeStart: rangeStartKey,
    rangeEnd: rangeEndKey,
    ariaLabel: `${title} calendar`,
  });

  return `<div ${calendarAttrs}><div class="sessions-calendar__header">${renderNavButton("previous", previousMonthLabel, CHEVRON_LEFT_ICON)}<p class="sessions-calendar__title">${escapeHtml(title)}</p>${renderNavButton("next", nextMonthLabel, CHEVRON_RIGHT_ICON)}</div>${monthMarkup}</div>`;
}

export function renderSessionsDualMonthCalendar({
  startMonth = 8,
  startYear = 2026,
  rangeStart,
  rangeEnd,
  currentDay,
  interactive = true,
  previousMonthLabel = "Previous month",
  nextMonthLabel = "Next month",
} = {}) {
  const today = new Date();
  const firstMonth = { month: startMonth, year: startYear };
  const secondMonth = shiftMonth(startMonth, startYear, 1);
  const currentDateKey = resolveCurrentDateKey({
    months: [firstMonth, secondMonth],
    currentDay,
    today,
  });
  const rangeStartKey = normalizeRangeKey({ value: rangeStart });
  const rangeEndKey = normalizeRangeKey({ value: rangeEnd });
  const monthMarkup = [firstMonth, secondMonth]
    .map(({ month, year }) =>
      renderMonthPanel({
        month,
        year,
        rangeStart: rangeStartKey,
        rangeEnd: rangeEndKey,
        currentDateKey,
        showTitle: false,
      }),
    )
    .join("");
  const titlesMarkup = [firstMonth, secondMonth]
    .map(
      ({ month, year }) =>
        `<p class="sessions-calendar__title sessions-calendar__title--month">${escapeHtml(formatMonthTitle(month, year))}</p>`,
    )
    .join("");
  const ariaLabel = `${formatMonthTitle(firstMonth.month, firstMonth.year)} to ${formatMonthTitle(secondMonth.month, secondMonth.year)} calendar`;
  const calendarAttrs = buildCalendarAttrs({
    className: "sessions-calendar sessions-calendar--dual",
    interactive,
    months: [firstMonth, secondMonth],
    currentDateKey,
    rangeStart: rangeStartKey,
    rangeEnd: rangeEndKey,
    ariaLabel,
  });

  return `<div ${calendarAttrs}><div class="sessions-calendar__dual-layout"><div class="sessions-calendar__dual-toolbar">${renderNavButton("previous", previousMonthLabel, CHEVRON_LEFT_ICON)}${titlesMarkup}${renderNavButton("next", nextMonthLabel, CHEVRON_RIGHT_ICON)}</div><div class="sessions-calendar__dual-months">${monthMarkup}</div></div></div>`;
}

function renderMonthPanel({
  month,
  year,
  rangeStart,
  rangeEnd,
  currentDateKey,
  selectedDay,
  showTitle = true,
}) {
  const title = formatMonthTitle(month, year);
  const weekdayMarkup = renderWeekdayRow();
  const dateMarkup = buildMonthCells({ month, year })
    .map((day) => renderDateCell({
      day,
      month,
      year,
      rangeStart,
      rangeEnd,
      currentDateKey,
      selectedDay,
    }))
    .join("");
  const titleMarkup = showTitle
    ? `<p class="sessions-calendar__title sessions-calendar__title--month">${escapeHtml(title)}</p>`
    : "";

  return `<section class="sessions-calendar__month" data-calendar-month="${month}" data-calendar-year="${year}" aria-label="${escapeHtml(title)}">${titleMarkup}<div class="sessions-calendar__weekdays" aria-hidden="true">${weekdayMarkup}</div><div class="sessions-calendar__dates" role="grid" aria-label="${escapeHtml(title)}">${dateMarkup}</div></section>`;
}

function renderDateCell({
  day,
  month,
  year,
  rangeStart,
  rangeEnd,
  currentDateKey,
  selectedDay,
}) {
  if (!day) {
    return `<span class="sessions-calendar__date-cell" aria-hidden="true"></span>`;
  }

  const dateKey = toDateKey(year, month, day);
  const { cellClass, variant } = resolveDateState(dateKey, {
    rangeStart,
    rangeEnd,
    currentDateKey,
    selectedDay,
    month,
    year,
  });

  return `<span class="sessions-calendar__date-cell${cellClass ? ` ${cellClass}` : ""}" data-calendar-date="${dateKey}">${renderSessionsDate({
    day,
    variant,
    dataDay: day,
    calendarDate: dateKey,
  })}</span>`;
}

function renderWeekdayRow() {
  return WEEKDAYS
    .map(
      (label) =>
        `<span class="sessions-calendar__weekday-cell"><span class="sessions-calendar__weekday">${label}</span></span>`,
    )
    .join("");
}

function renderNavButton(direction, label, iconSrc) {
  return `<button class="sessions-calendar__nav sessions-calendar__nav--${direction}" type="button" aria-label="${escapeHtml(label)}"><img class="sessions-calendar__nav-icon" src="${iconSrc}" width="24" height="24" alt="" aria-hidden="true" /></button>`;
}

function buildCalendarAttrs({
  className,
  interactive,
  months,
  currentDateKey,
  rangeStart,
  rangeEnd,
  ariaLabel,
}) {
  return [
    `class="${className}"`,
    interactive ? "data-sessions-calendar" : "",
    `data-calendar-months="${escapeHtml(JSON.stringify(months))}"`,
    currentDateKey ? `data-current-date="${currentDateKey}"` : "",
    rangeStart ? `data-range-start="${rangeStart}"` : "",
    rangeEnd ? `data-range-end="${rangeEnd}"` : "",
    `role="application"`,
    `aria-label="${escapeHtml(ariaLabel)}"`,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildMonthCells({ month, year }) {
  const firstWeekday = getMondayBasedWeekday(new Date(year, month, 1));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function getMondayBasedWeekday(date) {
  const weekday = date.getDay();
  return weekday === 0 ? 6 : weekday - 1;
}

function formatMonthTitle(month, year) {
  return `${MONTH_NAMES[month]} ${year}`;
}

function shiftMonth(month, year, offset) {
  const date = new Date(year, month + offset, 1);
  return { month: date.getMonth(), year: date.getFullYear() };
}

function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeRangeKey({ value, year, month }) {
  if (value == null || value === "") return undefined;
  if (typeof value === "string" && value.includes("-")) return value;
  if (year == null || month == null) return undefined;
  return toDateKey(year, month, Number(value));
}

function resolveCurrentDateKey({ months, currentDay, today }) {
  const resolvedDay = currentDay ?? today.getDate();
  const visibleMonth = months.find(
    ({ month, year }) => month === today.getMonth() && year === today.getFullYear(),
  );

  if (!visibleMonth) return undefined;

  return toDateKey(visibleMonth.year, visibleMonth.month, resolvedDay);
}

function resolveDateState(dateKey, { rangeStart, rangeEnd, currentDateKey, selectedDay, month, year }) {
  if (rangeStart && rangeEnd) {
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd;
    const end = rangeStart < rangeEnd ? rangeEnd : rangeStart;

    if (dateKey >= start && dateKey <= end) {
      if (start === end) {
        return { cellClass: "is-range-start is-range-end is-in-range", variant: "selected" };
      }
      if (dateKey === start) {
        return { cellClass: "is-range-start is-in-range", variant: "selected" };
      }
      if (dateKey === end) {
        return { cellClass: "is-range-end is-in-range", variant: "selected" };
      }
      return { cellClass: "is-range-middle is-in-range", variant: "default" };
    }
  }

  if (rangeStart && dateKey === rangeStart) {
    return { cellClass: "", variant: "selected" };
  }

  if (selectedDay != null && month != null && year != null && dateKey === toDateKey(year, month, selectedDay)) {
    return { cellClass: "", variant: "selected" };
  }

  if (currentDateKey && dateKey === currentDateKey) {
    return { cellClass: "", variant: "current" };
  }

  return { cellClass: "", variant: "default" };
}

export function applySessionsCalendarSelection(calendar, { rangeStart, rangeEnd } = {}) {
  if (!calendar) return;

  if (!rangeStart) {
    delete calendar.dataset.rangeStart;
    delete calendar.dataset.rangeEnd;
  } else {
    calendar.dataset.rangeStart = rangeStart;
    if (!rangeEnd) {
      delete calendar.dataset.rangeEnd;
    } else {
      calendar.dataset.rangeEnd = rangeEnd;
    }
  }

  const currentDateKey = calendar.dataset.currentDate || undefined;

  calendar.querySelectorAll(".sessions-calendar__date-cell[data-calendar-date]").forEach((cell) => {
    const dateKey = cell.dataset.calendarDate;
    const button = cell.querySelector(".sessions-date");
    if (!button || !dateKey) return;

    const { cellClass, variant } = resolveDateState(dateKey, {
      rangeStart: rangeStart || undefined,
      rangeEnd: rangeEnd || undefined,
      currentDateKey,
    });

    cell.className = `sessions-calendar__date-cell${cellClass ? ` ${cellClass}` : ""}`;
    button.className = [
      "sessions-date",
      variant !== "default" ? `sessions-date--${variant}` : "",
    ]
      .filter(Boolean)
      .join(" ");
    button.toggleAttribute("aria-pressed", variant === "selected");
    button.toggleAttribute("aria-current", variant === "current");
  });
}
