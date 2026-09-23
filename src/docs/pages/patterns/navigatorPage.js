import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import {
  renderSessionsCalendarViewNavigator,
  renderSessionsNavigator,
} from "../../../components/patterns/index.js?v=sessions-calendar-header-icons-v1";

export function renderNavigatorPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Navigator", "", navigatorExamples(), "button-example-section card-example-section")}
  `;
}

function navigatorExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-navigator-example",
      tocTitle: "Default",
      preview: renderSessionsNavigator({
        date: "2026-08-18",
      }),
      codeId: "sessions-navigator-code",
      filename: "Navigator.tsx",
      code: sampleNavigatorCode(),
      className: "is-sessions-navigator",
    })}
    ${componentExampleWrapper({
      id: "sessions-calendar-view-navigator-example",
      tocTitle: "Calendar view",
      preview: renderSessionsCalendarViewNavigator({
        view: "day",
      }),
      codeId: "sessions-calendar-view-navigator-code",
      filename: "CalendarViewNavigator.tsx",
      code: sampleCalendarViewNavigatorCode(),
      className: "is-sessions-navigator",
    })}
  `;
}

function sampleNavigatorCode() {
  return `import { Navigator } from "@sessions/design-system";

export function DayNavigator({ date, onPrevious, onNext, onDateClick }) {
  return (
    <Navigator
      date={date}
      onPrevious={onPrevious}
      onNext={onNext}
      onDateClick={onDateClick}
    />
  );
}`;
}

function sampleCalendarViewNavigatorCode() {
  return `import { CalendarViewNavigator } from "@sessions/design-system";

export function ScheduleViewControl({ view, onReset, onViewClick }) {
  return (
    <CalendarViewNavigator
      view={view}
      onReset={onReset}
      onViewClick={onViewClick}
    />
  );
}`;
}
