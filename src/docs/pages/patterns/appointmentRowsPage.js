import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderResponsiveDemo } from "../../demo/responsiveDemo.js?v=sessions-responsive-demo-v2";
import { renderSessionsAppointmentRow } from "../../../components/patterns/index.js?v=sessions-appointment-row-v2";

const sampleAppointment = {
  day: "23",
  month: "Sep",
  serviceName: "Zero Fade",
  status: "Booked",
  dateLabel: "Wed, 23 Sep 2026",
  startTime: "5:45pm",
  bookingSource: "Walk-In",
  duration: "1h 30min",
  staffMember: "Trend",
};

export function renderAppointmentRowsPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Appointment Row", "", appointmentRowExample(), "button-example-section card-example-section")}
  `;
}

function appointmentRowPreview() {
  return renderResponsiveDemo(renderSessionsAppointmentRow(sampleAppointment));
}

function appointmentRowExample() {
  return componentExampleWrapper({
    id: "sessions-appointment-row-example",
    tocTitle: "Default",
    preview: appointmentRowPreview(),
    codeId: "sessions-appointment-row-code",
    filename: "AppointmentRow.tsx",
    code: sampleAppointmentRowCode(),
    className: "is-sessions-appointment-row",
  });
}

function sampleAppointmentRowCode() {
  return `import { AppointmentRow } from "@sessions/design-system";

const appointment = {
  day: "23",
  month: "Sep",
  serviceName: "Zero Fade",
  status: "Booked",
  dateLabel: "Wed, 23 Sep 2026",
  startTime: "5:45pm",
  bookingSource: "Walk-In",
  duration: "1h 30min",
  staffMember: "Trend",
};

export function AppointmentRowExample() {
  return <AppointmentRow {...appointment} />;
}`;
}
