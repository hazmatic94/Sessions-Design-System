import { renderSessionsChip } from "../chip/chip.js";
import { escapeHtml } from "../../utils.js";

function formatDateTime(dateLabel, startTime) {
  if (!dateLabel) return startTime || "";
  if (!startTime) return dateLabel;
  return `${dateLabel}  ${startTime}`;
}

function formatAppointmentPrice(price, currency = "USD") {
  if (price === "" || price == null) return "";

  const amount =
    typeof price === "number"
      ? price
      : Number.parseFloat(String(price).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(amount)) {
    return String(price).replace(/^A\$\s*/i, "$");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(amount);
}

function formatMetadata(bookingSource, duration, staffMember) {
  const durationWithStaff =
    duration && staffMember ? `${duration} with ${staffMember}` : duration || staffMember;

  return [bookingSource, durationWithStaff].filter(Boolean).join(", ");
}

function renderDateBlock({ day, month }) {
  return `
    <div class="sessions-appointment-row__date" aria-hidden="true">
      <span class="sessions-appointment-row__day">${escapeHtml(day)}</span>
      <span class="sessions-appointment-row__month">${escapeHtml(month)}</span>
    </div>
  `;
}

function renderContent({ serviceName, status, dateTime, metadata }) {
  return `
    <div class="sessions-appointment-row__content">
      <div class="sessions-appointment-row__header">
        <h3 class="sessions-appointment-row__service">${escapeHtml(serviceName)}</h3>
        ${renderSessionsChip({
          label: status,
          className: [
            "sessions-appointment-row__status",
            String(status).toUpperCase() === "CANCELLED" ? "sessions-chip--cancelled" : "",
          ]
            .filter(Boolean)
            .join(" "),
        })}
      </div>
      <p class="sessions-appointment-row__datetime">${escapeHtml(dateTime)}</p>
      <p class="sessions-appointment-row__meta">${escapeHtml(metadata)}</p>
    </div>
  `;
}

function renderPrice(price) {
  return `<div class="sessions-appointment-row__price">${escapeHtml(price)}</div>`;
}

export function renderSessionsAppointmentRow({
  day = "1",
  month = "Jan",
  serviceName = "Service",
  status = "Booked",
  dateLabel = "",
  startTime = "",
  bookingSource = "",
  duration = "",
  staffMember = "",
  price = "",
  currency = "USD",
  className = "",
} = {}) {
  const classes = ["sessions-appointment-row", className].filter(Boolean).join(" ");
  const dateTime = formatDateTime(dateLabel, startTime);
  const metadata = formatMetadata(bookingSource, duration, staffMember);

  return `
    <article class="${classes}">
      ${renderDateBlock({ day, month })}
      ${renderContent({ serviceName, status, dateTime, metadata })}
      ${renderPrice(formatAppointmentPrice(price, currency))}
    </article>
  `;
}

export function renderSessionsAppointmentRowList(appointments = [], { className = "" } = {}) {
  const classes = ["sessions-appointment-row-list", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${appointments.map((appointment) => renderSessionsAppointmentRow(appointment)).join("")}</div>`;
}
