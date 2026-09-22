import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";
import {
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
} from "../menu/index.js";

const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";

function staffMenuId(name) {
  const slug = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return `sessions-staff-header-menu-${slug || "staff"}`;
}

function renderStaffMenu(staff, selectedName, menuId) {
  if (!staff.length) return "";

  const items = staff
    .map((person) =>
      renderSessionsMenuItem({
        icon: "",
        label: person.name,
        state: person.name === selectedName ? "selected" : "default",
        className: "sessions-staff-header__option",
        attributes: {
          role: "menuitem",
          "data-sessions-staff-header-option": "",
          "data-staff-name": person.name,
          "data-staff-src": person.avatarSrc ?? "",
          "data-staff-initial": person.avatarInitial ?? "",
        },
      }),
    )
    .join("");

  return `<div class="sessions-staff-header__menu" id="${escapeHtml(menuId)}" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div>`;
}

function setStaffHeaderOpen(header, open) {
  const trigger = header.querySelector("[data-sessions-staff-header-trigger]");
  const menu = header.querySelector(".sessions-staff-header__menu");
  header.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) {
    menu.hidden = !open;
    menu.setAttribute("aria-hidden", String(!open));
  }
}

function closeStaffHeader(header) {
  setStaffHeaderOpen(header, false);
}

function closeAllStaffHeaders(except) {
  document.querySelectorAll("[data-sessions-staff-header].is-open").forEach((header) => {
    if (header !== except) closeStaffHeader(header);
  });
}

function applyStaffSelection(header, option) {
  const name = option.dataset.staffName;
  if (!name) return;

  const nameEl = header.querySelector("[data-sessions-staff-header-name]");
  const trigger = header.querySelector("[data-sessions-staff-header-trigger]");
  const avatar = header.querySelector(".sessions-avatar");
  const src = option.dataset.staffSrc;
  const initial = option.dataset.staffInitial;

  if (nameEl) nameEl.textContent = name;
  if (trigger) trigger.setAttribute("aria-label", name);
  if (avatar) {
    avatar.outerHTML = src
      ? renderSessionsAvatar({ src, alt: name, size: "medium" })
      : renderSessionsAvatar({
          initial: initial || name,
          alt: name,
          size: "medium",
        });
  }

  header.querySelectorAll("[data-sessions-staff-header-option]").forEach((item) => {
    const selected = item === option;
    item.classList.toggle("is-selected", selected);
    item.dataset.menuItemState = selected ? "selected" : "default";
    if (selected) item.setAttribute("aria-pressed", "true");
    else item.removeAttribute("aria-pressed");
  });
}

export function renderSessionsStaffHeader({
  name = "Larry June",
  avatarSrc = "/assets/user.png",
  avatarAlt,
  avatarInitial,
  avatarSize = "medium",
  staff = [],
  open = false,
  className = "",
} = {}) {
  const resolvedAlt = avatarAlt ?? name;
  const menuId = staffMenuId(name);
  const classes = ["sessions-staff-header", open ? "is-open" : "", className]
    .filter(Boolean)
    .join(" ");
  const avatarMarkup = avatarSrc
    ? renderSessionsAvatar({ src: avatarSrc, alt: resolvedAlt, size: avatarSize })
    : renderSessionsAvatar({
        initial: avatarInitial ?? name,
        alt: resolvedAlt,
        size: avatarSize,
      });
  const menuMarkup = renderStaffMenu(staff, name, menuId);
  const triggerAttrs = [
    'class="sessions-staff-header__trigger"',
    'type="button"',
    "data-sessions-staff-header-trigger",
    staff.length ? 'aria-haspopup="menu"' : "",
    `aria-expanded="${open ? "true" : "false"}"`,
    staff.length ? `aria-controls="${escapeHtml(menuId)}"` : "",
    `aria-label="${escapeHtml(name)}"`,
  ]
    .filter(Boolean)
    .join(" ");

  return `<header class="${classes}" data-sessions-staff-header><div class="sessions-staff-header__content">${avatarMarkup}<button ${triggerAttrs}><span class="sessions-staff-header__name" data-sessions-staff-header-name>${escapeHtml(name)}</span><img class="sessions-staff-header__chevron" src="${CHEVRON_DOWN_ICON}" width="20" height="20" alt="" aria-hidden="true" /></button>${menuMarkup}</div></header>`;
}

export function setupSessionsStaffHeaders() {
  document.addEventListener("click", (event) => {
    const option = event.target.closest("[data-sessions-staff-header-option]");
    if (option) {
      const header = option.closest("[data-sessions-staff-header]");
      if (!header) return;
      event.preventDefault();
      applyStaffSelection(header, option);
      closeStaffHeader(header);
      header.dispatchEvent(
        new CustomEvent("sessions:staff-header-name-click", {
          bubbles: true,
          detail: { name: option.dataset.staffName, open: false },
        }),
      );
      return;
    }

    const trigger = event.target.closest("[data-sessions-staff-header-trigger]");
    if (trigger) {
      const header = trigger.closest("[data-sessions-staff-header]");
      if (!header) return;
      event.preventDefault();
      const nextOpen = !header.classList.contains("is-open");
      closeAllStaffHeaders(header);
      setStaffHeaderOpen(header, nextOpen);
      header.dispatchEvent(
        new CustomEvent("sessions:staff-header-name-click", {
          bubbles: true,
          detail: { name: trigger.getAttribute("aria-label"), open: nextOpen },
        }),
      );
      return;
    }

    if (!event.target.closest("[data-sessions-staff-header]")) {
      closeAllStaffHeaders();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openHeader = document.querySelector("[data-sessions-staff-header].is-open");
    if (!openHeader) return;
    closeStaffHeader(openHeader);
    openHeader.querySelector("[data-sessions-staff-header-trigger]")?.focus();
  });
}
