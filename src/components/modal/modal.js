import { escapeHtml } from "../../utils.js";
import { renderPrimaryButton, renderSecondaryButton } from "../button/button.js";

const CLOSE_ICON = "/assets/IconClose.svg";

export function renderSessionsModal({
  title,
  body,
  bodyMarkup = "",
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
  closeLabel = "Close",
  className = "",
} = {}) {
  const titleId = `sessions-modal-title-${slugify(title || "modal")}`;
  const classes = ["sessions-modal", className].filter(Boolean).join(" ");
  const copyMarkup = bodyMarkup
    ? `<div class="sessions-modal__copy">${bodyMarkup}</div>`
    : `<div class="sessions-modal__copy"><h3 class="sessions-modal__title" id="${titleId}">${escapeHtml(title ?? "")}</h3>${body ? `<p class="sessions-modal__body">${escapeHtml(body)}</p>` : ""}</div>`;
  const actionsMarkup =
    secondaryLabel || primaryLabel
      ? `<div class="sessions-modal__actions">${secondaryLabel ? renderSecondaryButton({ label: secondaryLabel }) : ""}${primaryLabel ? renderPrimaryButton({ label: primaryLabel }) : ""}</div>`
      : "";

  return `<div class="${classes}" role="dialog" aria-modal="true"${title ? ` aria-labelledby="${titleId}"` : ""}><button class="sessions-modal__close" type="button" aria-label="${escapeHtml(closeLabel)}"><img class="sessions-modal__close-icon" src="${CLOSE_ICON}" width="24" height="24" alt="" aria-hidden="true" /></button><div class="sessions-modal__content">${copyMarkup}${actionsMarkup}</div></div>`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "modal";
}
