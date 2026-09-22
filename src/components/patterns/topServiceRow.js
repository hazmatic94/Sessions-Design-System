import { escapeHtml } from "../../utils.js";

const TRENDS = new Set(["up", "down"]);

function formatRank(rank) {
  const value = Number.parseInt(String(rank), 10);
  if (Number.isNaN(value) || value < 1) return "01";
  return String(value).padStart(2, "0");
}

function formatBookings(count) {
  const value = Number.parseInt(String(count), 10);
  if (Number.isNaN(value) || value < 0) return "0 Bookings";
  return value === 1 ? "1 Booking" : `${value} Bookings`;
}

function formatSharePercentage(value) {
  if (value === "" || value == null) return "";
  const text = String(value).trim();
  return text.endsWith("%") ? text : `${text}%`;
}

function resolveTrend(trend, changePercent) {
  if (TRENDS.has(trend)) return trend;

  const value = Number.parseFloat(String(changePercent));
  if (!Number.isNaN(value) && value < 0) return "down";

  return "up";
}

function formatChangePercent(changePercent) {
  const value = Math.abs(Number.parseFloat(String(changePercent)));
  if (Number.isNaN(value)) return "";
  return `${value}`.replace(/\.0+$/, "");
}

function formatTrendMeta(changePercent, trend, periodLabel = "last month") {
  const direction = resolveTrend(trend, changePercent);
  const amount = formatChangePercent(changePercent);
  if (!amount) return "";

  return `${amount}% ${direction} from ${periodLabel}`;
}

function renderTrendIcon(trend) {
  const direction = TRENDS.has(trend) ? trend : "up";

  return `<span class="sessions-top-service-row__trend sessions-top-service-row__trend--${direction}" aria-hidden="true"></span>`;
}

export function renderSessionsTopServiceRow({
  rank = 1,
  serviceName = "Service",
  bookingCount = 0,
  trend = "up",
  changePercent = 0,
  periodLabel = "last month",
  percentage = "0%",
  className = "",
  faded = false,
} = {}) {
  const direction = resolveTrend(trend, changePercent);
  const trendMeta = formatTrendMeta(changePercent, direction, periodLabel);
  const classes = [
    "sessions-top-service-row",
    faded ? "sessions-top-service-row--faded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <article class="${classes}">
      <div class="sessions-top-service-row__rank" aria-hidden="true">${formatRank(rank)}</div>
      <div class="sessions-top-service-row__content">
        <div class="sessions-top-service-row__header">
          <h3 class="sessions-top-service-row__service">${escapeHtml(serviceName)}</h3>
        </div>
        <p class="sessions-top-service-row__bookings">${escapeHtml(formatBookings(bookingCount))}</p>
        ${
          trendMeta
            ? `<p class="sessions-top-service-row__trend-meta sessions-top-service-row__trend-meta--${direction}">
                ${renderTrendIcon(direction)}
                <span>${escapeHtml(trendMeta)}</span>
              </p>`
            : ""
        }
      </div>
      <div class="sessions-top-service-row__share">${escapeHtml(formatSharePercentage(percentage))}</div>
    </article>
  `;
}

export function renderSessionsTopServiceRowList(services = [], { className = "" } = {}) {
  const classes = ["sessions-top-service-row-list", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${services
    .map((service, index) =>
      renderSessionsTopServiceRow({
        ...service,
        rank: service.rank ?? index + 1,
      }),
    )
    .join("")}</div>`;
}
