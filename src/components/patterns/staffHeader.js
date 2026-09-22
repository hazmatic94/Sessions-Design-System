import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";

const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";

export function renderSessionsStaffHeader({
  name = "Larry June",
  avatarSrc = "/assets/user.png",
  avatarAlt,
  avatarInitial,
  avatarSize = "medium",
  className = "",
} = {}) {
  const resolvedAlt = avatarAlt ?? name;
  const classes = ["sessions-staff-header", className].filter(Boolean).join(" ");
  const avatarMarkup = avatarSrc
    ? renderSessionsAvatar({ src: avatarSrc, alt: resolvedAlt, size: avatarSize })
    : renderSessionsAvatar({
        initial: avatarInitial ?? name,
        alt: resolvedAlt,
        size: avatarSize,
      });

  return `<header class="${classes}" data-sessions-staff-header><div class="sessions-staff-header__content">${avatarMarkup}<button class="sessions-staff-header__trigger" type="button" data-sessions-staff-header-trigger aria-haspopup="menu" aria-expanded="false" aria-label="${escapeHtml(name)}"><span class="sessions-staff-header__name" data-sessions-staff-header-name>${escapeHtml(name)}</span><img class="sessions-staff-header__chevron" src="${CHEVRON_DOWN_ICON}" width="20" height="20" alt="" aria-hidden="true" /></button></div></header>`;
}
