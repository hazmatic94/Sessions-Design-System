import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderResponsiveDemo } from "../demo/responsiveDemo.js?v=sessions-responsive-demo-v3";
import {
  renderSessionsAppointmentActivityCard,
  renderSessionsRecentSalesCard,
  renderSessionsUpcomingAppointmentsCard,
} from "../../components/cards/index.js?v=sessions-metric-cards-v26";
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

const CHART_START_DATE = "2025-03-19";

const RECENT_SALES_DAILY = [385, 420, 510, 620, 340, 395, 430];
const RECENT_SALES_APPOINTMENTS_DAILY = [210, 245, 315, 380, 185, 220, 235];

const RECENT_SALES_APPOINTMENTS_VALUE = RECENT_SALES_APPOINTMENTS_DAILY.reduce(
  (sum, value) => sum + value,
  0,
);

const RECENT_SALES_BARS = RECENT_SALES_DAILY.map((sales, index) => ({
  base: sales,
  stack: RECENT_SALES_APPOINTMENTS_DAILY[index],
}));

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
  startDate: CHART_START_DATE,
  variant: "bar",
  yAxisFormat: "currency",
  barColors: {
    base: { color: SESSIONS_CHART_COLORS.sales },
    stack: { color: SESSIONS_CHART_COLORS.appointments },
  },
  bars: RECENT_SALES_BARS,
};

const RECENT_SALES_CARD = {
  title: "Recent Sales",
  period: "Last 7 days",
  totalValue: formatUsd(RECENT_SALES_DAILY.reduce((sum, value) => sum + value, 0)),
  metrics: [
    { label: "Appointments", value: "47" },
    { label: "Appointments Value", value: formatUsd(RECENT_SALES_APPOINTMENTS_VALUE) },
  ],
  chart: RECENT_SALES_CHART,
  legend: [
    { label: "Sales", color: SESSIONS_CHART_COLORS.sales },
    { label: "Appointments", color: SESSIONS_CHART_COLORS.appointments },
  ],
};

const RECENT_SALES_EMPTY_CARD = {
  title: "Recent Sales",
  period: "Last 7 days",
  chart: {
    ...RECENT_SALES_CHART,
    bars: [],
  },
  legend: RECENT_SALES_CARD.legend,
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
  startDate: CHART_START_DATE,
  variant: "bar",
  barColors: {
    base: { color: SESSIONS_CHART_COLORS.confirmed },
    stack: { color: SESSIONS_CHART_COLORS.cancelled },
  },
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
  legend: [
    { label: "Confirmed", color: SESSIONS_CHART_COLORS.confirmed },
    { label: "Cancelled", color: SESSIONS_CHART_COLORS.cancelled },
  ],
};

const UPCOMING_APPOINTMENTS_EMPTY_CARD = {
  title: "Upcoming appointments",
  period: "Last 7 days",
  chart: {
    ...UPCOMING_APPOINTMENTS_CHART,
    bars: [],
  },
  legend: UPCOMING_APPOINTMENTS_CARD.legend,
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
    price: 60,
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
    price: 60,
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
    price: 60,
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
    price: 60,
  },
];

const APPOINTMENT_ACTIVITY_CARD = {
  title: "Appointment activity",
  appointments: APPOINTMENT_ACTIVITY_ROWS,
};

const APPOINTMENT_ACTIVITY_EMPTY_CARD = {
  title: "Appointment activity",
  appointments: [],
  clientLinkHref: "#",
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
  return `
    ${componentExampleWrapper({
      id: "sessions-recent-sales-card-example",
      tocTitle: "Default",
      preview: renderResponsiveDemo(renderSessionsRecentSalesCard(RECENT_SALES_CARD)),
      codeId: "sessions-recent-sales-card-code",
      filename: "RecentSalesCard.tsx",
      code: sampleRecentSalesCardCode(),
      className: "is-sessions-recent-sales-card",
    })}
    ${componentExampleWrapper({
      id: "sessions-recent-sales-card-empty-example",
      tocTitle: "Empty state",
      preview: renderResponsiveDemo(renderSessionsRecentSalesCard(RECENT_SALES_EMPTY_CARD)),
      codeId: "sessions-recent-sales-card-empty-code",
      filename: "RecentSalesCardEmpty.tsx",
      code: sampleRecentSalesCardEmptyCode(),
      className: "is-sessions-recent-sales-card",
    })}
  `;
}

function upcomingAppointmentsCardExample() {
  return `
    ${componentExampleWrapper({
      id: "sessions-upcoming-appointments-card-example",
      tocTitle: "Default",
      preview: renderResponsiveDemo(renderSessionsUpcomingAppointmentsCard(UPCOMING_APPOINTMENTS_CARD)),
      codeId: "sessions-upcoming-appointments-card-code",
      filename: "UpcomingAppointmentsCard.tsx",
      code: sampleUpcomingAppointmentsCardCode(),
      className: "is-sessions-upcoming-appointments-card",
    })}
    ${componentExampleWrapper({
      id: "sessions-upcoming-appointments-card-empty-example",
      tocTitle: "Empty state",
      preview: renderResponsiveDemo(renderSessionsUpcomingAppointmentsCard(UPCOMING_APPOINTMENTS_EMPTY_CARD)),
      codeId: "sessions-upcoming-appointments-card-empty-code",
      filename: "UpcomingAppointmentsCardEmpty.tsx",
      code: sampleUpcomingAppointmentsCardEmptyCode(),
      className: "is-sessions-upcoming-appointments-card",
    })}
  `;
}

function appointmentActivityCardExample() {
  return `
    ${componentExampleWrapper({
      id: "sessions-appointment-activity-card-example",
      tocTitle: "Default",
      preview: renderResponsiveDemo(renderSessionsAppointmentActivityCard(APPOINTMENT_ACTIVITY_CARD)),
      codeId: "sessions-appointment-activity-card-code",
      filename: "AppointmentActivityCard.tsx",
      code: sampleAppointmentActivityCardCode(),
      className: "is-sessions-appointment-activity-card",
    })}
    ${componentExampleWrapper({
      id: "sessions-appointment-activity-card-no-activity-example",
      tocTitle: "No activity",
      preview: renderResponsiveDemo(renderSessionsAppointmentActivityCard(APPOINTMENT_ACTIVITY_EMPTY_CARD)),
      codeId: "sessions-appointment-activity-card-no-activity-code",
      filename: "AppointmentActivityCardEmpty.tsx",
      code: sampleAppointmentActivityCardEmptyCode(),
      className: "is-sessions-appointment-activity-card",
    })}
  `;
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
      price: 60,
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
      price: 60,
    },
  ],
};

export function AppointmentActivityCardExample() {
  return <AppointmentActivityCard {...appointmentActivity} />;
}`;
}

function sampleAppointmentActivityCardEmptyCode() {
  return `import { AppointmentActivityCard } from "@sessions/design-system";

const appointmentActivity = {
  title: "Appointment activity",
  appointments: [],
  clientLinkHref: "/clients/new",
};

export function AppointmentActivityCardEmptyExample() {
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
    barColors: {
      base: { color: "#82A4ED" },
      stack: { color: "var(--joker-red-300)" },
    },
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
  legend: [
    { label: "Confirmed", color: "#82A4ED" },
    { label: "Cancelled", color: "var(--joker-red-300)" },
  ],
};

export function UpcomingAppointmentsCardExample() {
  return <UpcomingAppointmentsCard {...upcomingAppointments} />;
}`;
}

function sampleRecentSalesCardCode() {
  return `import { RecentSalesCard } from "@sessions/design-system";

const dailySales = [385, 420, 510, 620, 340, 395, 430];
const dailyAppointments = [210, 245, 315, 380, 185, 220, 235];
const totalSales = dailySales.reduce((sum, value) => sum + value, 0);
const totalAppointmentsValue = dailyAppointments.reduce((sum, value) => sum + value, 0);

const recentSales = {
  title: "Recent Sales",
  period: "Last 7 days",
  totalValue: formatMoney(totalSales),
  metrics: [
    { label: "Appointments", value: "47" },
    { label: "Appointments Value", value: formatMoney(totalAppointmentsValue) },
  ],
  chart: {
    columns: 7,
    rows: 4,
    startDate: "2025-03-19",
    variant: "bar",
    yAxisFormat: "currency",
    barColors: {
      base: { color: "var(--green-300)" },
      stack: { color: "#9BA3E8" },
    },
    bars: dailySales.map((sales, index) => ({
      base: sales,
      stack: dailyAppointments[index],
    })),
  },
  legend: [
    { label: "Sales", color: "var(--green-300)" },
    { label: "Appointments", color: "#9BA3E8" },
  ],
};

export function RecentSalesCardExample() {
  return <RecentSalesCard {...recentSales} />;
}`;
}

function sampleRecentSalesCardEmptyCode() {
  return `import { RecentSalesCard } from "@sessions/design-system";

const recentSales = {
  title: "Recent Sales",
  period: "Last 7 days",
  chart: {
    columns: 7,
    rows: 4,
    startDate: "2025-03-19",
    variant: "bar",
    yAxisFormat: "currency",
    barColors: {
      base: { color: "var(--green-300)" },
      stack: { color: "#9BA3E8" },
    },
    bars: [],
  },
};

export function RecentSalesCardEmptyExample() {
  return <RecentSalesCard {...recentSales} />;
}`;
}

function sampleUpcomingAppointmentsCardEmptyCode() {
  return `import { UpcomingAppointmentsCard } from "@sessions/design-system";

const upcomingAppointments = {
  title: "Upcoming appointments",
  period: "Last 7 days",
  chart: {
    columns: 7,
    rows: 4,
    max: 20,
    startDate: "2025-03-19",
    variant: "bar",
    barColors: {
      base: { color: "#82A4ED" },
      stack: { color: "var(--joker-red-300)" },
    },
    bars: [],
  },
};

export function UpcomingAppointmentsCardEmptyExample() {
  return <UpcomingAppointmentsCard {...upcomingAppointments} />;
}`;
}
