import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsHourBlock } from "../../../components/patterns/index.js?v=sessions-hour-block-v1";

export function renderHourBlockPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Hour Block", "", hourBlockExample(), "button-example-section card-example-section")}
  `;
}

function hourBlockExample() {
  return componentExampleWrapper({
    id: "sessions-hour-block-example",
    tocTitle: "Default",
    preview: renderSessionsHourBlock({ hour: 0 }),
    codeId: "sessions-hour-block-code",
    filename: "HourBlock.tsx",
    code: sampleHourBlockCode(),
    className: "is-sessions-hour-block",
  });
}

function sampleHourBlockCode() {
  return `import { HourBlock } from "@sessions/design-system";

export function CalendarHourBlock({ hour }) {
  return <HourBlock hour={hour} />;
}`;
}
