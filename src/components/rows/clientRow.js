import { renderSessionsAvatar } from "../avatar/avatar.js";
import { sessionsAsset } from "../../assetBase.js";
import { escapeHtml } from "../../utils.js";

const PLUS_ICON = "IconPlus.svg";

function renderAddIcon() {
  const plusIcon = sessionsAsset(PLUS_ICON);

  return `<span class="sessions-client-row__icon" aria-hidden="true"><span class="sessions-client-row__icon-mark" style="--sessions-client-row-icon: url('${plusIcon}')"></span></span>`;
}

function renderClientRowContent({
  variant,
  name,
  email,
  label,
  avatarSrc,
  avatarInitial,
}) {
  if (variant === "add") {
    return `${renderAddIcon()}<span class="sessions-client-row__label">${escapeHtml(label)}</span>`;
  }

  return `${renderSessionsAvatar({
    src: avatarSrc,
    name,
    initial: avatarInitial,
    size: "small",
  })}<div class="sessions-client-row__details"><h3 class="sessions-client-row__name">${escapeHtml(name)}</h3><p class="sessions-client-row__email">${escapeHtml(email)}</p></div>`;
}

export function renderSessionsClientRow({
  variant = "client",
  name = "Harry Maher",
  email = "harrymaherdesign@gmail.com",
  label = "Add new client",
  avatarSrc = "",
  avatarInitial,
  href = "",
  className = "",
} = {}) {
  const classes = [
    "sessions-client-row",
    variant === "add" ? "sessions-client-row--add" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = renderClientRowContent({
    variant,
    name,
    email,
    label,
    avatarSrc,
    avatarInitial,
  });

  if (href) {
    return `<a class="${classes}" href="${escapeHtml(href)}">${content}</a>`;
  }

  return `<button class="${classes}" type="button">${content}</button>`;
}

export function renderSessionsClientRowList(rows = [], { className = "" } = {}) {
  const classes = ["sessions-client-row-list", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${rows.map((row) => renderSessionsClientRow(row)).join("")}</div>`;
}
