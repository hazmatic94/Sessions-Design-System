import { MENU_ITEM_STATES } from "./item.js";

export function setupSessionsMenuItems() {
  document.addEventListener("click", (event) => {
    const preview = event.target.closest("[data-sessions-menu-item-cycle]");
    if (!preview) return;

    const button = preview.querySelector(".sessions-menu-item");
    if (!button) return;

    event.preventDefault();

    const currentIndex = MENU_ITEM_STATES.indexOf(button.dataset.menuItemState || "default");
    const nextState = MENU_ITEM_STATES[(currentIndex + 1) % MENU_ITEM_STATES.length];
    applySessionsMenuItemState(button, nextState);

    const stateLabel = preview.querySelector("[data-menu-item-state-label]");
    if (stateLabel) stateLabel.textContent = nextState;
  });
}

export function applySessionsMenuItemState(button, state = "default") {
  if (!button) return;

  button.dataset.menuItemState = state;
  button.className = [
    "sessions-menu-item",
    state === "hover" ? "sessions-menu-item--hover" : "",
    state === "pressed" ? "sessions-menu-item--pressed" : "",
    state === "selected" ? "is-selected" : "",
    state === "disabled" ? "sessions-menu-item--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
  button.disabled = state === "disabled";
  button.toggleAttribute("aria-pressed", state === "selected");
}
