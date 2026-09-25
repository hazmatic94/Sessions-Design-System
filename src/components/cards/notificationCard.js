import { escapeHtml } from "../../utils.js";

function formatPrice({ price, currency, priceLabel }) {
  if (priceLabel) return priceLabel;
  if (price == null || price === "") return "";
  return `${currency} ${price}`;
}

function formatServiceMeta({ duration, staffName, serviceMeta }) {
  if (serviceMeta) return serviceMeta;

  const parts = [duration, staffName].filter(Boolean);
  return parts.join(" • ");
}

function renderNotificationCardContent({
  title,
  meta,
  serviceName,
  resolvedServiceMeta,
  resolvedPrice,
  unread,
}) {
  return `
    ${unread ? '<span class="sessions-notification-card__dot" aria-hidden="true"></span>' : ""}
    <div class="sessions-notification-card__header">
      <h3 class="sessions-notification-card__title">${escapeHtml(title)}</h3>
      ${meta ? `<p class="sessions-notification-card__meta">${escapeHtml(meta)}</p>` : ""}
    </div>
    <hr class="sessions-notification-card__divider" aria-hidden="true" />
    <div class="sessions-notification-card__service">
      <div class="sessions-notification-card__service-copy">
        ${serviceName ? `<p class="sessions-notification-card__service-name">${escapeHtml(serviceName)}</p>` : ""}
        ${resolvedServiceMeta ? `<p class="sessions-notification-card__service-meta">${escapeHtml(resolvedServiceMeta)}</p>` : ""}
      </div>
      ${resolvedPrice ? `<p class="sessions-notification-card__price">${escapeHtml(resolvedPrice)}</p>` : ""}
    </div>
  `;
}

export function renderSessionsNotificationCard({
  title = "Appointment",
  meta = "",
  serviceName = "",
  serviceMeta = "",
  duration = "",
  staffName = "",
  price,
  currency = "A$",
  priceLabel = "",
  unread = false,
  href = "",
  id = "",
  interactive = true,
  className = "",
} = {}) {
  const resolvedPrice = formatPrice({ price, currency, priceLabel });
  const resolvedServiceMeta = formatServiceMeta({ duration, staffName, serviceMeta });
  const classes = [
    "sessions-notification-card",
    unread ? "sessions-notification-card--unread" : "sessions-notification-card--read",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = renderNotificationCardContent({
    title,
    meta,
    serviceName,
    resolvedServiceMeta,
    resolvedPrice,
    unread,
  });
  const attrs = [
    `class="${classes}"`,
    interactive ? "data-sessions-notification" : "",
    interactive ? `data-notification-unread="${unread ? "true" : "false"}"` : "",
    id ? `data-notification-id="${escapeHtml(String(id))}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (interactive && href) {
    return `<a ${attrs} href="${escapeHtml(href)}">${content}</a>`;
  }

  if (interactive) {
    return `<button ${attrs} type="button">${content}</button>`;
  }

  return `<article ${attrs}>${content}</article>`;
}

export function renderSessionsNotificationCardList(
  notifications = [],
  { className = "" } = {},
) {
  const classes = ["sessions-notification-card-list", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${notifications
    .map((notification) => renderSessionsNotificationCard(notification))
    .join("")}</div>`;
}
