import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import {
  renderSessionsCurrentTimeIndicator,
  renderSessionsHourBooking,
  renderSessionsHourColumn,
  renderSessionsHourLabel,
} from "../../../components/patterns/index.js";

export function renderHourBlockPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Current Time", "", currentTimeExample(), "button-example-section card-example-section")}
    ${section("Hour Label", "", hourLabelExample(), "button-example-section card-example-section")}
    ${section("Hour Booking", "", hourBookingExample(), "button-example-section card-example-section")}
    ${section("Hour Column", "", hourColumnExamples(), "button-example-section card-example-section")}
  `;
}

function currentTimeExample() {
  return componentExampleWrapper({
    id: "sessions-current-time-example",
    tocTitle: "Live",
    preview: `
      <div class="sessions-current-time-preview">
        ${renderSessionsCurrentTimeIndicator()}
      </div>
    `,
    codeId: "sessions-current-time-code",
    filename: "CurrentTimeIndicator.tsx",
    code: sampleCurrentTimeCode(),
    className: "is-sessions-current-time",
  });
}

function hourLabelExample() {
  return componentExampleWrapper({
    id: "sessions-hour-label-example",
    tocTitle: "Default",
    preview: renderSessionsHourLabel({ hour: 0, minute: 0 }),
    codeId: "sessions-hour-label-code",
    filename: "HourLabel.tsx",
    code: sampleHourLabelCode(),
    className: "is-sessions-hour-label",
  });
}

function hourBookingExample() {
  return componentExampleWrapper({
    id: "sessions-hour-booking-example",
    tocTitle: "Default",
    preview: renderSessionsHourBooking({
      time: "4:00 - 5:30",
      customerName: "Jack Doe",
      serviceType: "Skin Fade",
    }),
    codeId: "sessions-hour-booking-code",
    filename: "HourBooking.tsx",
    code: sampleHourBookingCode(),
    className: "is-sessions-hour-booking",
  });
}

function hourColumnExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-hour-column-open-example",
      tocTitle: "Within hours",
      preview: `
        <div class="sessions-hour-column-preview">
          ${renderSessionsHourLabel({ hour: 11, minute: 0 })}
          ${renderSessionsHourColumn({ hour: 11 })}
        </div>
      `,
      codeId: "sessions-hour-column-open-code",
      filename: "HourColumnOpen.tsx",
      code: sampleHourColumnOpenCode(),
      className: "is-sessions-hour-column is-sessions-hour-column-open",
    })}
    ${componentExampleWrapper({
      id: "sessions-hour-column-outside-example",
      tocTitle: "Outside hours",
      preview: `
        <div class="sessions-hour-column-preview">
          ${renderSessionsHourLabel({ hour: 9, minute: 0 })}
          ${renderSessionsHourColumn({
            hour: 9,
            outsideMinutes: [0, 15],
          })}
        </div>
      `,
      codeId: "sessions-hour-column-outside-code",
      filename: "HourColumnOutside.tsx",
      code: sampleHourColumnOutsideCode(),
      className: "is-sessions-hour-column is-sessions-hour-column-outside",
    })}
    ${componentExampleWrapper({
      id: "sessions-hour-column-booked-example",
      tocTitle: "Booked session",
      preview: `
        <div class="sessions-hour-column-preview">
          ${renderSessionsHourLabel({ hour: 11, minute: 0 })}
          ${renderSessionsHourColumn({
            hour: 11,
            bookings: [{
              startMinute: 0,
              span: 3,
              customerName: "Jack Doe",
              serviceType: "Skin Fade",
            }],
          })}
        </div>
      `,
      codeId: "sessions-hour-column-booked-code",
      filename: "HourColumnBooked.tsx",
      code: sampleHourColumnBookedCode(),
      className: "is-sessions-hour-column is-sessions-hour-column-booked",
    })}
  `;
}

function sampleCurrentTimeCode() {
  return `import { CurrentTimeIndicator } from "@sessions/design-system";

export function CalendarCurrentTime() {
  return <CurrentTimeIndicator live />;
}`;
}

function sampleHourLabelCode() {
  return `import { HourLabel } from "@sessions/design-system";

export function CalendarHourLabel({ hour }) {
  return <HourLabel hour={hour} minute={0} />;
}`;
}

function sampleHourBookingCode() {
  return `import { HourBooking } from "@sessions/design-system";

export function CalendarHourBooking({ time, customerName, serviceType }) {
  return (
    <HourBooking
      time={time}
      customerName={customerName}
      serviceType={serviceType}
    />
  );
}`;
}

function sampleHourColumnOpenCode() {
  return `import { HourColumn, HourLabel } from "@sessions/design-system";

export function CalendarHourRow({ hour }) {
  return (
    <>
      <HourLabel hour={hour} minute={0} />
      <HourColumn hour={hour} />
    </>
  );
}`;
}

function sampleHourColumnOutsideCode() {
  return `import { HourColumn, HourLabel } from "@sessions/design-system";

export function CalendarHourRow({ hour, outsideMinutes }) {
  return (
    <>
      <HourLabel hour={hour} minute={0} />
      <HourColumn hour={hour} outsideMinutes={outsideMinutes} />
    </>
  );
}`;
}

function sampleHourColumnBookedCode() {
  return `import { HourColumn, HourLabel } from "@sessions/design-system";

export function CalendarHourRow({ hour, bookings }) {
  return (
    <>
      <HourLabel hour={hour} minute={0} />
      <HourColumn hour={hour} bookings={bookings} />
    </>
  );
}`;
}
