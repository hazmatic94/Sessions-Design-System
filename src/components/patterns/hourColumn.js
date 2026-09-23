import { escapeHtml } from "../../utils.js";
import {
  formatHourBookingTimeRange,
  HOUR_QUARTER_MINUTES,
  resolveHourQuarterMinute,
} from "./hourTime.js";
import { renderSessionsHourBooking } from "./hourBooking.js";

function normalizeBooking(booking, hour) {
  const startMinute = resolveHourQuarterMinute(booking.startMinute ?? 0);
  const span = Math.min(4, Math.max(1, Number(booking.span ?? 1) || 1));
  const rowStart = startMinute / 15 + 1;
  const durationMinutes = span * 15;
  const time =
    booking.time ??
    formatHourBookingTimeRange(hour, startMinute, durationMinutes);

  return {
    startMinute,
    span,
    rowStart,
    time,
    customerName: booking.customerName ?? "",
    serviceType: booking.serviceType ?? "",
    kind: booking.kind ?? "client",
  };
}

function resolveOutsideMinutes(outsideMinutes = []) {
  return new Set(
    outsideMinutes.map((minute) => resolveHourQuarterMinute(minute)),
  );
}

function renderHourColumnSlot(minute, row, isOutsideHours) {
  const outsideClass = isOutsideHours ? " sessions-hour-column__slot--outside-hours" : "";

  return `<div class="sessions-hour-column__slot${outsideClass}" data-minute="${minute}" data-outside-hours="${isOutsideHours ? "true" : "false"}" style="grid-row: ${row}" aria-hidden="true"></div>`;
}

function renderHourColumnBooking(booking) {
  const kindClass = booking.kind === "staff" ? " sessions-hour-column__booking--staff" : "";

  return `<div class="sessions-hour-column__booking${kindClass}" data-sessions-hour-column-booking data-start-minute="${booking.startMinute}" data-span="${booking.span}" style="grid-row: ${booking.rowStart} / span ${booking.span}">${renderSessionsHourBooking({
    time: booking.time,
    customerName: booking.customerName,
    serviceType: booking.serviceType,
  })}</div>`;
}

export function renderSessionsHourColumn({
  hour = 0,
  bookings = [],
  outsideMinutes = [],
  className = "",
} = {}) {
  const classes = ["sessions-hour-column", className].filter(Boolean).join(" ");
  const outsideMinuteSet = resolveOutsideMinutes(outsideMinutes);
  const slotMarkup = HOUR_QUARTER_MINUTES.map((minute, index) =>
    renderHourColumnSlot(minute, index + 1, outsideMinuteSet.has(minute)),
  ).join("");
  const bookingMarkup = bookings
    .map((booking) => renderHourColumnBooking(normalizeBooking(booking, hour)))
    .join("");

  return `<div class="${classes}" data-sessions-hour-column data-hour="${Number(hour)}" aria-label="${escapeHtml(`Hour ${hour} schedule`)}"><div class="sessions-hour-column__grid">${slotMarkup}${bookingMarkup}</div></div>`;
}
