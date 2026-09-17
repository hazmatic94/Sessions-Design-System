import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderResponsiveDemo } from "../../demo/responsiveDemo.js?v=sessions-responsive-demo-v2";
import { renderSessionsAppointmentRow } from "../../../components/patterns/index.js?v=sessions-appointment-row-v2";

const sampleAppointment = {
  day: "20",
  month: "Aug",
  serviceName: "Skin Fade",
  status: "BOOKED",
  dateLabel: "Thu, 20 Aug 2026",
  startTime: "2:45pm",
  bookingSource: "Online Booking",
  duration: "45min",
  staffMember: "Larry",
  price: "$60",
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
  day: "20",
  month: "Aug",
  serviceName: "Skin Fade",
  status: "BOOKED",
  dateLabel: "Thu, 20 Aug 2026",
  startTime: "2:45pm",
  bookingSource: "Online Booking",
  duration: "45min",
  staffMember: "Larry",
  price: "$60",
};

export function AppointmentRowExample() {
  return <AppointmentRow {...appointment} />;
}`;
}
