import { sessionsAsset } from "../../assetBase.js";
import { escapeHtml } from "../../utils.js";

const EDIT_ICON = "IconEdit.svg";
const TRASH_ICON = "IconTrash.svg";

function resolveServiceFields({
  service,
  id,
  name,
  title,
  duration,
  price,
  currency,
  priceLabel,
} = {}) {
  const source = service && typeof service === "object" ? service : {};

  return {
    id: id ?? source.id ?? "",
    name: name ?? title ?? source.name ?? source.title ?? "Service",
    duration: formatDuration(duration ?? source.duration),
    priceLabel: formatPrice({
      price: price ?? source.price,
      currency: currency ?? source.currency ?? "A$",
      priceLabel: priceLabel ?? source.priceLabel,
    }),
  };
}

function formatDuration(duration) {
  if (duration == null || duration === "") return "";
  if (typeof duration === "number") return `${duration}min`;

  const text = String(duration).trim();
  if (/^\d+$/.test(text)) return `${text}min`;
  return text;
}

function formatPrice({ price, currency, priceLabel }) {
  if (priceLabel) return priceLabel;
  if (price == null || price === "") return "";
  return `${currency} ${price}`;
}

function renderActionButton({ action, label, icon }) {
  const src = sessionsAsset(icon);

  return `<button class="sessions-selector__action" type="button" data-selector-action="${action}" aria-label="${escapeHtml(label)}"><span class="sessions-selector__action-icon" style="--sessions-selector-icon: url('${src}')" aria-hidden="true"></span></button>`;
}

export function renderSessionsSelector({
  service,
  id,
  name,
  title,
  duration,
  price,
  currency,
  priceLabel,
  selected = false,
  hover = false,
  interactive = true,
  editLabel = "Edit",
  deleteLabel = "Delete",
  className = "",
} = {}) {
  const resolved = resolveServiceFields({
    service,
    id,
    name,
    title,
    duration,
    price,
    currency,
    priceLabel,
  });
  const classes = [
    "sessions-selector",
    selected ? "is-selected" : "",
    hover ? "sessions-selector--hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const attrs = [
    `class="${classes}"`,
    interactive ? "data-sessions-selector" : "",
    resolved.id ? `data-service-id="${escapeHtml(String(resolved.id))}"` : "",
    'tabindex="0"',
    `aria-pressed="${selected ? "true" : "false"}"`,
  ]
    .filter(Boolean)
    .join(" ");

  return `<div ${attrs}><h3 class="sessions-selector__title">${escapeHtml(resolved.name)}</h3>${resolved.duration ? `<p class="sessions-selector__duration">${escapeHtml(resolved.duration)}</p>` : ""}<div class="sessions-selector__trailing"><span class="sessions-selector__price">${escapeHtml(resolved.priceLabel)}</span><div class="sessions-selector__actions">${renderActionButton({ action: "edit", label: editLabel, icon: EDIT_ICON })}<span class="sessions-selector__divider" aria-hidden="true"></span>${renderActionButton({ action: "delete", label: deleteLabel, icon: TRASH_ICON })}</div></div></div>`;
}

export function renderSessionsSelectorList(selectors = [], { className = "" } = {}) {
  const classes = ["sessions-selector-list", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${selectors.map((selector) => renderSessionsSelector(selector)).join("")}</div>`;
}
