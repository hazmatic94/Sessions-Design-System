import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import {
  renderSessionsAppointmentActivityCard,
  renderSessionsRecentSalesCard,
  renderSessionsUpcomingAppointmentsCard,
} from "../../components/cards/index.js?v=sessions-metric-cards-v2";
import { SESSIONS_CHART_COLORS } from "../../components/patterns/chartColors.js";

export function cardExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = "",
  stageClassName = "",
  size = "md",
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size,
    className,
    stageClassName,
  });
}

const RECENT_SALES_DAILY = [300, 350, 280, 400, 320, 350, 300];

function formatUsd(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(amount);
}

const RECENT_SALES_CHART = {
  columns: 7,
  rows: 4,
  startDate: "2026-09-10",
  variant: "area",
  series: [
    {
      id: "sales",
      color: SESSIONS_CHART_COLORS.sales,
      values: RECENT_SALES_DAILY,
    },
  ],
};

const RECENT_SALES_CARD = {
  title: "Recent Sales",
  period: "Last 7 days",
  totalValue: formatUsd(RECENT_SALES_DAILY.reduce((sum, value) => sum + value, 0)),
  metrics: [
    { label: "Appointments", value: "3" },
    { label: "Appointments Value", value: "$215.00" },
  ],
  chart: RECENT_SALES_CHART,
};

const UPCOMING_APPOINTMENTS_BARS = [
  { value: 14 },
  { base: 10, stack: 2 },
  { value: 16.5 },
  { value: 18 },
  { base: 15, stack: 2 },
  { value: 11 },
  { value: 13 },
];

const UPCOMING_APPOINTMENTS_CHART = {
  columns: 7,
  rows: 4,
  max: 20,
  startDate: "2025-03-19",
  variant: "bar",
  bars: UPCOMING_APPOINTMENTS_BARS,
};

const UPCOMING_APPOINTMENTS_CARD = {
  title: "Upcoming appointments",
  period: "Last 7 days",
  totalValue: "17",
  totalLabel: "Booked",
  metrics: [
    { label: "Confirmed Appointments", value: "32" },
    { label: "Cancelled Appointments", value: "4" },
  ],
  chart: UPCOMING_APPOINTMENTS_CHART,
};

const APPOINTMENT_ACTIVITY_ROWS = [
  {
    day: "20",
    month: "Aug",
    serviceName: "Skin Fade",
    status: "BOOKED",
    dateLabel: "Thu, 20 Aug 2026",
    startTime: "2:45pm",
    bookingSource: "Online Booking",
    duration: "45min",
    staffMember: "Larry",
    price: "A$ 60",
  },
  {
    day: "20",
    month: "Aug",
    serviceName: "Skin Fade",
    status: "BOOKED",
    dateLabel: "Thu, 20 Aug 2026",
    startTime: "2:45pm",
    bookingSource: "Online Booking",
    duration: "45min",
    staffMember: "Larry",
    price: "A$ 60",
  },
  {
    day: "20",
    month: "Aug",
    serviceName: "Skin Fade",
    status: "CANCELLED",
    dateLabel: "Thu, 20 Aug 2026",
    startTime: "3:30pm",
    bookingSource: "Online Booking",
    duration: "45min",
    staffMember: "Larry",
    price: "A$ 60",
  },
  {
    day: "20",
    month: "Aug",
    serviceName: "Skin Fade",
    status: "CANCELLED",
    dateLabel: "Thu, 20 Aug 2026",
    startTime: "4:15pm",
    bookingSource: "Online Booking",
    duration: "45min",
    staffMember: "Larry",
    price: "A$ 60",
  },
];

const APPOINTMENT_ACTIVITY_CARD = {
  title: "Appointment activity",
  appointments: APPOINTMENT_ACTIVITY_ROWS,
};

export function renderCardsPage(page) {
  return `
    ${pageHero(page)}
    ${section("Recent Sales", "", recentSalesCardExample(), "button-example-section card-example-section")}
    ${section("Upcoming Appointments", "", upcomingAppointmentsCardExample(), "button-example-section card-example-section")}
    ${section("Appointment Activity", "", appointmentActivityCardExample(), "button-example-section card-example-section")}
  `;
}

function recentSalesCardExample() {
  return componentExampleWrapper({
    id: "sessions-recent-sales-card-example",
    tocTitle: "Default",
    preview: renderSessionsRecentSalesCard(RECENT_SALES_CARD),
    codeId: "sessions-recent-sales-card-code",
    filename: "RecentSalesCard.tsx",
    code: sampleRecentSalesCardCode(),
    className: "is-sessions-recent-sales-card",
  });
}

function upcomingAppointmentsCardExample() {
  return componentExampleWrapper({
    id: "sessions-upcoming-appointments-card-example",
    tocTitle: "Default",
    preview: renderSessionsUpcomingAppointmentsCard(UPCOMING_APPOINTMENTS_CARD),
    codeId: "sessions-upcoming-appointments-card-code",
    filename: "UpcomingAppointmentsCard.tsx",
    code: sampleUpcomingAppointmentsCardCode(),
    className: "is-sessions-upcoming-appointments-card",
  });
}

function appointmentActivityCardExample() {
  return componentExampleWrapper({
    id: "sessions-appointment-activity-card-example",
    tocTitle: "Default",
    preview: renderSessionsAppointmentActivityCard(APPOINTMENT_ACTIVITY_CARD),
    codeId: "sessions-appointment-activity-card-code",
    filename: "AppointmentActivityCard.tsx",
    code: sampleAppointmentActivityCardCode(),
    className: "is-sessions-appointment-activity-card",
  });
}

function sampleAppointmentActivityCardCode() {
  return `import { AppointmentActivityCard } from "@sessions/design-system";

const appointmentActivity = {
  title: "Appointment activity",
  appointments: [
    {
      day: "20",
      month: "Aug",
      serviceName: "Skin Fade",
      status: "BOOKED",
      dateLabel: "Thu, 20 Aug 2026",
      startTime: "2:45pm",
      bookingSource: "Online Booking",
      duration: "45min",
      staffMember: "Larry",
      price: "A$ 60",
    },
    {
      day: "20",
      month: "Aug",
      serviceName: "Skin Fade",
      status: "CANCELLED",
      dateLabel: "Thu, 20 Aug 2026",
      startTime: "3:30pm",
      bookingSource: "Online Booking",
      duration: "45min",
      staffMember: "Larry",
      price: "A$ 60",
    },
  ],
};

export function AppointmentActivityCardExample() {
  return <AppointmentActivityCard {...appointmentActivity} />;
}`;
}

function sampleUpcomingAppointmentsCardCode() {
  return `import { UpcomingAppointmentsCard } from "@sessions/design-system";

const upcomingAppointments = {
  title: "Upcoming appointments",
  period: "Last 7 days",
  totalValue: "17",
  totalLabel: "Booked",
  metrics: [
    { label: "Confirmed Appointments", value: "32" },
    { label: "Cancelled Appointments", value: "4" },
  ],
  chart: {
    columns: 7,
    rows: 4,
    max: 20,
    startDate: "2025-03-19",
    variant: "bar",
    bars: [
      { value: 14 },
      { base: 10, stack: 2 },
      { value: 16.5 },
      { value: 18 },
      { base: 15, stack: 2 },
      { value: 11 },
      { value: 13 },
    ],
  },
};

export function UpcomingAppointmentsCardExample() {
  return <UpcomingAppointmentsCard {...upcomingAppointments} />;
}`;
}

function sampleRecentSalesCardCode() {
  return `import { RecentSalesCard } from "@sessions/design-system";

const dailySales = [300, 350, 280, 400, 320, 350, 300];
const totalSales = dailySales.reduce((sum, value) => sum + value, 0);

const recentSales = {
  title: "Recent Sales",
  period: "Last 7 days",
  totalValue: formatMoney(totalSales),
  metrics: [
    { label: "Appointments", value: "3" },
    { label: "Appointments Value", value: formatMoney(215) },
  ],
  chart: {
    columns: 7,
    rows: 4,
    startDate: "2026-09-10",
    variant: "area",
    series: [{ id: "sales", values: dailySales }],
  },
};

export function RecentSalesCardExample() {
  return <RecentSalesCard {...recentSales} />;
}`;
}
