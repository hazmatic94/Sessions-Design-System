import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderResponsiveDemo } from "../demo/responsiveDemo.js?v=sessions-responsive-demo-v3";
import {
  renderSessionsAppointmentRow,
  renderSessionsClientRowList,
  renderSessionsTopServiceRow,
} from "../../components/rows/index.js?v=sessions-rows-v1";

const CLIENT_ROWS = [
  {
    variant: "add",
    label: "Add new client",
  },
  {
    name: "Harry Maher",
    email: "harrymaherdesign@gmail.com",
    avatarInitial: "H",
  },
];

const APPOINTMENT_ROW = {
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

const TOP_SERVICE_ROW = {
  rank: 1,
  serviceName: "Skin Fade",
  bookingCount: 309,
  changePercent: 8,
  trend: "up",
  percentage: 32,
};

export function renderRowsPage(page) {
  return `
    ${pageHero(page)}
    ${section("Client Row", "", clientRowExample(), "button-example-section card-example-section")}
    ${section("Appointment Row", "", appointmentRowExample(), "button-example-section card-example-section")}
    ${section("Top Service Row", "", topServiceRowExample(), "button-example-section card-example-section")}
  `;
}

function clientRowExample() {
  return componentExampleWrapper({
    id: "sessions-client-row-example",
    tocTitle: "Default",
    preview: renderSessionsClientRowList(CLIENT_ROWS),
    codeId: "sessions-client-row-code",
    filename: "ClientRow.tsx",
    code: sampleClientRowCode(),
    className: "is-sessions-client-row",
  });
}

function appointmentRowExample() {
  return componentExampleWrapper({
    id: "sessions-appointment-row-example",
    tocTitle: "Default",
    preview: renderResponsiveDemo(renderSessionsAppointmentRow(APPOINTMENT_ROW)),
    codeId: "sessions-appointment-row-code",
    filename: "AppointmentRow.tsx",
    code: sampleAppointmentRowCode(),
    className: "is-sessions-appointment-row",
  });
}

function topServiceRowExample() {
  return componentExampleWrapper({
    id: "sessions-top-service-row-example",
    tocTitle: "Default",
    preview: renderSessionsTopServiceRow(TOP_SERVICE_ROW),
    codeId: "sessions-top-service-row-code",
    filename: "TopServiceRow.tsx",
    code: sampleTopServiceRowCode(),
    className: "is-sessions-top-service-row",
  });
}

function sampleClientRowCode() {
  return `import { ClientRowList } from "@sessions/design-system";

const clients = [
  {
    variant: "add",
    label: "Add new client",
  },
  {
    name: "Harry Maher",
    email: "harrymaherdesign@gmail.com",
    avatarInitial: "H",
  },
];

export function ClientRowExample() {
  return <ClientRowList rows={clients} />;
}`;
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

function sampleTopServiceRowCode() {
  return `import { TopServiceRow } from "@sessions/design-system";

const service = {
  rank: 1,
  serviceName: "Skin Fade",
  bookingCount: 309,
  changePercent: 8,
  trend: "up",
  percentage: 32,
};

export function TopServiceRowExample() {
  return <TopServiceRow {...service} />;
}`;
}
