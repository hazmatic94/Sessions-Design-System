import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";

const CLOSE_ICON = "/assets/IconClose.svg";

const DEFAULT_USER = {
  name: "Larry June",
  email: "goodjoblarry@gmail.com",
  avatar: {
    src: "/assets/user.png",
    alt: "Larry June",
  },
};

export function renderSessionsMenuUserHeader({
  user = DEFAULT_USER,
  closeLabel = "Close",
  className = "",
} = {}) {
  const classes = ["sessions-menu-user-header", className].filter(Boolean).join(" ");
  const avatar = renderSessionsAvatar({
    ...user.avatar,
    name: user.name,
  });

  return `<div class="${classes}"><div class="sessions-menu-user-header__profile">${avatar}<span class="sessions-menu-user-header__copy"><span class="sessions-menu-user-header__name">${escapeHtml(user.name)}</span><span class="sessions-menu-user-header__email">${escapeHtml(user.email)}</span></span></div><button class="sessions-menu-user-header__close" type="button" aria-label="${escapeHtml(closeLabel)}"><img class="sessions-menu-user-header__close-icon" src="${CLOSE_ICON}" width="24" height="24" alt="" aria-hidden="true" /></button></div>`;
}
