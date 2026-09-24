export function applySessionsTabSelection(tablist, value) {
  if (!tablist || value == null) return;

  tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
    const isSelected = tab.dataset.tabValue === String(value);
    tab.classList.toggle("sessions-tabs__tab--selected", isSelected);
    tab.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
}

export function setupSessionsTabs() {
  document.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-sessions-tabs] [role='tab']");
    if (!tab || tab.disabled) return;

    const tablist = tab.closest("[data-sessions-tabs]");
    applySessionsTabSelection(tablist, tab.dataset.tabValue);
  });
}
