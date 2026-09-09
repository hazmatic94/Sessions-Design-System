import { escapeHtml } from "../../utils.js";
import { renderCalendarBadgeIcon } from "../navigation/railItem.js";

const MENU_ICONS = {
  calendar: "/assets/IconCalendar.svg",
  day: "/assets/IconDay.svg",
  week: "/assets/IconWeek.svg",
  month: "/assets/IconMonth.svg",
  time: "/assets/IconTime.svg",
  settings: "/assets/IconSettings.svg",
  help: "/assets/IconHelp.svg",
  logout: "/assets/IconLogout.svg",
};

export const MENU_ITEM_STATES = ["default", "hover", "pressed", "selected", "disabled"];

export function renderSessionsMenuItem({
  icon = "calendar",
  label = "Menu item",
  state = "default",
  className = "",
  disabled = false,
} = {}) {
  const classes = [
    "sessions-menu-item",
    state === "hover" ? "sessions-menu-item--hover" : "",
    state === "pressed" ? "sessions-menu-item--pressed" : "",
    state === "selected" ? "is-selected" : "",
    state === "disabled" ? "sessions-menu-item--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const iconMarkup = renderMenuItemIcon(icon);
  const isDisabled = disabled || state === "disabled";
  const attrs = [
    `class="${classes}"`,
    'type="button"',
    `data-menu-item-state="${state}"`,
    isDisabled ? "disabled" : "",
    state === "selected" ? 'aria-pressed="true"' : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<button ${attrs}>${iconMarkup}<span class="sessions-menu-item__label">${escapeHtml(label)}</span></button>`;
}

function renderMenuItemIcon(icon) {
  const iconSrc = MENU_ICONS[icon] ?? MENU_ICONS.calendar;

  if (icon === "calendar") {
    return `<span class="sessions-menu-item__icon sessions-menu-item__icon--svg" aria-hidden="true">${renderCalendarBadgeIcon()}</span>`;
  }

  if (icon === "logout") {
    return `<span class="sessions-menu-item__icon sessions-menu-item__icon--img" aria-hidden="true"><img src="${iconSrc}" width="24" height="24" alt="" /></span>`;
  }

  return `<span class="sessions-menu-item__icon" style="--sessions-menu-icon: url('${iconSrc}')" aria-hidden="true"></span>`;
}
