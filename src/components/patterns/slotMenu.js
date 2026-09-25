import {
  renderSessionsMenuDivider,
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
} from "../menu/index.js";
import { formatHourBookingLabel } from "./hourTime.js";

const CLOSE_ICON = "/assets/IconClose.svg";

const SLOT_ACTIONS = [
  { value: "appointment", label: "Add appointment", icon: "calendar" },
  { value: "blocked", label: "Add blocked time", icon: "time" },
];

export function renderSessionsSlotMenu() {
  const items = SLOT_ACTIONS.map((action) =>
    renderSessionsMenuItem({
      icon: action.icon,
      label: action.label,
      className: "sessions-slot-menu__option",
      attributes: {
        "data-sessions-slot-action": action.value,
      },
    }),
  ).join("");

  return `<div class="sessions-slot-menu" data-sessions-slot-menu hidden>${renderSessionsMenuPanel({
    children: `<div class="sessions-slot-menu__header"><span class="sessions-slot-menu__time" data-sessions-slot-menu-time></span><button class="sessions-slot-menu__close" type="button" data-sessions-slot-menu-close aria-label="Close"><img class="sessions-slot-menu__close-icon" src="${CLOSE_ICON}" width="24" height="24" alt="" /></button></div>${renderSessionsMenuDivider()}${items}`,
  })}</div>`;
}

function placeSlotMenu(menu, anchor, { below = false } = {}) {
  const rect = anchor.getBoundingClientRect();
  menu.hidden = false;
  const menuRect = menu.getBoundingClientRect();
  const gap = 8;
  let top = below ? rect.bottom + gap : rect.top - menuRect.height - gap;
  if (!below && top < 78) top = rect.bottom + gap;
  let left = rect.left + rect.width / 2 - menuRect.width / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - menuRect.width - 8));
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

function closeSlotMenu(root) {
  const menu = root.querySelector("[data-sessions-slot-menu]");
  if (menu) {
    menu.hidden = true;
    menu.classList.remove("is-add");
  }
  root.querySelector("[data-sessions-add-trigger]")?.setAttribute("aria-expanded", "false");
  root.querySelectorAll(".sessions-hour-column__slot.is-selected").forEach((slot) => {
    slot.classList.remove("is-selected");
  });
}

export function setupSessionsSlotMenus(root = document) {
  if (!root.querySelector("[data-sessions-slot-menu]")) {
    root.insertAdjacentHTML("beforeend", renderSessionsSlotMenu());
  }

  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-sessions-slot-menu-close]")) {
      closeSlotMenu(root);
      return;
    }

    if (event.target.closest("[data-sessions-slot-action]")) {
      closeSlotMenu(root);
      return;
    }

    if (event.target.closest("[data-sessions-slot-menu]")) return;

    const addTrigger = event.target.closest("[data-sessions-add-trigger]");
    if (addTrigger) {
      const menu = root.querySelector("[data-sessions-slot-menu]");
      if (!menu) return;
      if (!menu.hidden && menu.classList.contains("is-add")) {
        closeSlotMenu(root);
        return;
      }
      root.querySelectorAll(".sessions-hour-column__slot.is-selected").forEach((item) => {
        item.classList.remove("is-selected");
      });
      menu.classList.add("is-add");
      addTrigger.setAttribute("aria-expanded", "true");
      placeSlotMenu(menu, addTrigger, { below: true });
      return;
    }

    const slot = event.target.closest(".sessions-hour-column__slot");
    if (!slot || slot.dataset.outsideHours === "true") {
      closeSlotMenu(root);
      return;
    }

    const column = slot.closest("[data-sessions-hour-column]");
    const menu = root.querySelector("[data-sessions-slot-menu]");
    const time = menu?.querySelector("[data-sessions-slot-menu-time]");
    if (!column || !menu || !time) return;
    menu.classList.remove("is-add");
    root.querySelector("[data-sessions-add-trigger]")?.setAttribute("aria-expanded", "false");
    time.textContent = formatHourBookingLabel(column.dataset.hour, slot.dataset.minute);
    root.querySelectorAll(".sessions-hour-column__slot.is-selected").forEach((item) => {
      item.classList.remove("is-selected");
    });
    slot.classList.add("is-selected");
    placeSlotMenu(menu, slot);
  });

  root.querySelector(".home-shell__main")?.addEventListener("scroll", () => closeSlotMenu(root));
}
