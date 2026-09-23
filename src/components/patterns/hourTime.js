export const HOUR_COUNT = 24;
export const HOUR_QUARTER_MINUTES = [0, 15, 30, 45];

export function resolveHourTime(hour = 0, minute = 0) {
  const safeHour = ((Number(hour) % HOUR_COUNT) + HOUR_COUNT) % HOUR_COUNT;
  const safeMinute = ((Number(minute) % 60) + 60) % 60;
  const hour12 = safeHour % 12 === 0 ? 12 : safeHour % 12;
  const period = safeHour < 12 ? "am" : "pm";
  const time = `${hour12}:${String(safeMinute).padStart(2, "0")}`;

  return {
    hour: safeHour,
    minute: safeMinute,
    time,
    period,
    label: `${time}${period}`,
    labelSpaced: `${time} ${period}`,
  };
}

export function resolveHourQuarterMinute(minute = 0) {
  const normalized = ((Number(minute) % 60) + 60) % 60;
  const quarter = HOUR_QUARTER_MINUTES.includes(normalized)
    ? normalized
    : HOUR_QUARTER_MINUTES[Math.floor(normalized / 15)] ?? 0;

  return quarter;
}

export function formatHourBookingLabel(hour = 0, minute = 0) {
  return resolveHourTime(hour, minute).label;
}

export function formatHourBookingTimeRange(
  startHour = 0,
  startMinute = 0,
  durationMinutes = 15,
) {
  const start = resolveHourTime(startHour, startMinute);
  const endTotalMinutes = start.hour * 60 + start.minute + durationMinutes;
  const endHour = Math.floor(endTotalMinutes / 60) % HOUR_COUNT;
  const endMinute = endTotalMinutes % 60;
  const end = resolveHourTime(endHour, endMinute);

  if (start.period === end.period) {
    return `${start.time} - ${end.time}${end.period}`;
  }

  return `${start.label} - ${end.label}`;
}
