import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsCalendarHeaderRow } from "../../../components/patterns/index.js?v=sessions-calendar-header-icons-v1";

export function renderCalendarHeaderRowPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Calendar Header Row", "", calendarHeaderRowExample(), "button-example-section card-example-section")}
  `;
}

function calendarHeaderRowExample() {
  return componentExampleWrapper({
    id: "sessions-calendar-header-row-example",
    tocTitle: "Default",
    preview: renderSessionsCalendarHeaderRow({
      date: "2026-08-18",
    }),
    codeId: "sessions-calendar-header-row-code",
    filename: "CalendarHeaderRow.tsx",
    code: sampleCalendarHeaderRowCode(),
    className: "is-sessions-calendar-header-row",
  });
}

function sampleCalendarHeaderRowCode() {
  return `import { CalendarHeaderRow } from "@sessions/design-system";

export function ScheduleCalendarHeader({ date, view, onToday, onAdd }) {
  return (
    <CalendarHeaderRow
      date={date}
      view={view}
      onToday={onToday}
      onAdd={onAdd}
    />
  );
}`;
}
