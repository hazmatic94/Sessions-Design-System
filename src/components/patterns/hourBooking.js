import { escapeHtml } from "../../utils.js";

export function renderSessionsHourBooking({
  time = "",
  customerName = "",
  serviceType = "",
  label = "",
  className = "",
} = {}) {
  const classes = ["sessions-hour-booking", className].filter(Boolean).join(" ");

  if (time || customerName || serviceType) {
    const customerMarkup = customerName
      ? `<span class="sessions-hour-booking__customer">${escapeHtml(customerName)}</span>`
      : "";

    return `<div class="${classes}" data-sessions-hour-booking><p class="sessions-hour-booking__summary"><span class="sessions-hour-booking__time">${escapeHtml(time)}</span>${customerMarkup}</p>${serviceType ? `<p class="sessions-hour-booking__service-type">${escapeHtml(serviceType)}</p>` : ""}</div>`;
  }

  return `<div class="${classes}" data-sessions-hour-booking><p class="sessions-hour-booking__summary"><span class="sessions-hour-booking__time">${escapeHtml(label)}</span></p></div>`;
}
