function isActionTarget(event) {
  return Boolean(event.target.closest("[data-selector-action]"));
}

function toggleSelector(selector) {
  const selected = selector.classList.toggle("is-selected");
  selector.setAttribute("aria-pressed", selected ? "true" : "false");
}

export function setupSessionsSelectors() {
  document.addEventListener("click", (event) => {
    if (isActionTarget(event)) return;

    const selector = event.target.closest("[data-sessions-selector]");
    if (!selector) return;

    toggleSelector(selector);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (isActionTarget(event)) return;

    const selector = event.target.closest("[data-sessions-selector]");
    if (!selector || event.target !== selector) return;

    event.preventDefault();
    toggleSelector(selector);
  });
}
