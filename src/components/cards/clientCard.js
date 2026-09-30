import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSecondaryButton } from "../button/button.js";
import { renderSessionsMenuItem } from "../menu/item.js";
import { renderSessionsMenuPanel } from "../menu/panel.js";
import { sessionsAsset } from "../../assetBase.js";
import { escapeHtml } from "../../utils.js";

const PLUS_ICON = "IconPlus.svg";

function renderAddIcon() {
  const plusIcon = sessionsAsset(PLUS_ICON);

  return `<span class="sessions-client-card__icon" aria-hidden="true"><span class="sessions-client-card__icon-mark" style="--sessions-client-card-icon: url('${plusIcon}')"></span></span>`;
}

const CLIENT_ACTIONS = [
  { value: "edit", label: "Edit client details" },
  { value: "block", label: "Block client" },
  { value: "delete", label: "Delete client", danger: true },
];

function renderClientActions(actionsLabel) {
  const items = CLIENT_ACTIONS.map((item) =>
    renderSessionsMenuItem({
      icon: "",
      label: item.label,
      className: item.danger
        ? "sessions-client-card__option sessions-client-card__option--danger"
        : "sessions-client-card__option",
      attributes: {
        role: "menuitem",
        "data-sessions-client-action": item.value,
      },
    }),
  ).join("");
  const button = renderSecondaryButton({
    label: actionsLabel,
    icon: "chevron-down",
    iconPosition: "end",
    className: "sessions-client-card__action",
    ariaExpanded: false,
  }).replace("<button ", '<button aria-haspopup="menu" ');

  return `<div class="sessions-client-card__menu-wrap" data-sessions-client-actions>${button}<div class="sessions-client-card__menu" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div></div>`;
}

function renderDefaultClientCard({
  name,
  email,
  avatarSrc,
  avatarInitial,
  actionsLabel,
  editProfileLabel,
  editProfileHref,
  className,
}) {
  const classes = ["sessions-client-card", className].filter(Boolean).join(" ");

  return `<article class="${classes}">
    <div class="sessions-client-card__profile">
      ${renderSessionsAvatar({
        src: avatarSrc,
        name,
        initial: avatarInitial,
        size: "medium",
      })}
      <div class="sessions-client-card__details">
        <h3 class="sessions-client-card__name">${escapeHtml(name)}</h3>
        <p class="sessions-client-card__email">${escapeHtml(email)}</p>
      </div>
    </div>
    <div class="sessions-client-card__actions">
      ${renderClientActions(actionsLabel)}
      ${renderSecondaryButton({
        label: editProfileLabel,
        href: editProfileHref,
        className: "sessions-client-card__edit",
      })}
    </div>
  </article>`;
}

function renderAddClientCard({
  title,
  hint,
  href,
  className,
}) {
  const classes = ["sessions-client-card", "sessions-client-card--add", className]
    .filter(Boolean)
    .join(" ");
  const content = `<div class="sessions-client-card__profile">
    ${renderAddIcon()}
    <div class="sessions-client-card__details">
      <h3 class="sessions-client-card__name">${escapeHtml(title)}</h3>
      <p class="sessions-client-card__email">${escapeHtml(hint)}</p>
    </div>
  </div>`;

  if (href) {
    return `<a class="${classes}" href="${escapeHtml(href)}">${content}</a>`;
  }

  return `<button class="${classes}" type="button">${content}</button>`;
}

export function renderSessionsClientCard({
  variant = "default",
  name = "Luca Harris",
  email = "lucaharris@email.com",
  title = "Add client",
  hint = "Leave empty for walk-ins",
  avatarSrc = "",
  avatarInitial,
  actionsLabel = "Actions",
  editProfileLabel = "Edit profile",
  editProfileHref = "#",
  href = "",
  className = "",
} = {}) {
  if (variant === "add") {
    return renderAddClientCard({ title, hint, href, className });
  }

  return renderDefaultClientCard({
    name,
    email,
    avatarSrc,
    avatarInitial,
    actionsLabel,
    editProfileLabel,
    editProfileHref,
    className,
  });
}
