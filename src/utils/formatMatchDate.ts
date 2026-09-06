export function formatMatchDate(utcDate: string | number | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(utcDate));
}
