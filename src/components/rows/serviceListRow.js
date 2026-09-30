import { renderSecondaryButton } from "../button/button.js";
import { renderSessionsMenuItem } from "../menu/item.js";
import { renderSessionsMenuPanel } from "../menu/panel.js";
import { escapeHtml } from "../../utils.js";

const SERVICE_ACTIONS = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete", danger: true },
];

function formatPrice(type, price) {
  if (type === "free") return "Free";
  const amount = `A$ ${Number(price || 0).toFixed(2)}`;
  return type === "from" ? `From ${amount}` : amount;
}

function renderServiceActions(name) {
  const items = SERVICE_ACTIONS.map((item) =>
    renderSessionsMenuItem({
      icon: "",
      label: item.label,
      className: item.danger
        ? "sessions-service-list__option sessions-service-list__option--danger"
        : "sessions-service-list__option",
      attributes: {
        role: "menuitem",
        "data-sessions-service-action": item.value,
      },
    }),
  ).join("");
  const button = renderSecondaryButton({
    iconSrc: "/assets/IconMore.svg",
    ariaLabel: `More actions for ${name}`,
  }).replace("<button ", '<button aria-haspopup="menu" aria-expanded="false" ');

  return `<div class="sessions-service-list__actions" data-sessions-service-actions>${button}<div class="sessions-service-list__menu" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div></div>`;
}

export function renderSessionsServiceListRow({
  name = "",
  description = "",
  duration = "",
  priceType = "fixed",
  price = "0.00",
} = {}) {
  const detail = description.trim()
    ? `<p class="sessions-service-list__detail">${escapeHtml(description.trim())}</p>`
    : "";

  return `<div class="sessions-service-list__row" data-service-name="${escapeHtml(name)}" data-service-description="${escapeHtml(description.trim())}" data-service-duration="${escapeHtml(duration)}" data-service-price-type="${escapeHtml(priceType)}" data-service-price="${escapeHtml(price)}"><div class="sessions-service-list__service"><p class="sessions-service-list__name">${escapeHtml(name)}</p>${detail}</div><span class="sessions-service-list__value">${escapeHtml(duration)}</span><span class="sessions-service-list__value">${escapeHtml(formatPrice(priceType, price))}</span>${renderServiceActions(name)}</div>`;
}

export function renderSessionsServiceList({ rows = [] } = {}) {
  const header = `<div class="sessions-service-list__row sessions-service-list__head"><span>Service</span><span>Duration</span><span>Price</span><span></span></div>`;
  const body = rows.map((row) => renderSessionsServiceListRow(row)).join("");

  return `<div class="sessions-service-list">${header}${body}</div>`;
}

function setServiceActionsOpen(actions, open) {
  const trigger = actions.querySelector(".sessions-button");
  const menu = actions.querySelector(".sessions-service-list__menu");
  actions.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) menu.hidden = !open;
}

function closeServiceActions(root) {
  root.querySelectorAll("[data-sessions-service-actions].is-open").forEach((actions) => {
    setServiceActionsOpen(actions, false);
  });
}

export function setupSessionsServiceLists(root = document) {
  if (root.dataset.sessionsServiceListsBound === "true") return;
  root.dataset.sessionsServiceListsBound = "true";

  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-sessions-service-actions] > .sessions-button");
    if (trigger) {
      event.preventDefault();
      const actions = trigger.closest("[data-sessions-service-actions]");
      const open = actions.classList.contains("is-open");
      closeServiceActions(root);
      setServiceActionsOpen(actions, !open);
      return;
    }

    if (event.target.closest("[data-sessions-service-action]")) {
      event.preventDefault();
      closeServiceActions(root);
      return;
    }

    if (event.target.closest(".sessions-service-list__menu")) return;
    closeServiceActions(root);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeServiceActions(root);
  });
}
