export function formatKickoffTime(utcDate: string | number | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(utcDate));
}
