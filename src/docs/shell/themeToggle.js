const STORAGE_KEY = "joker-ds-theme";

function applyTheme(mode) {
  const resolved = mode === "light" ? "light" : "dark";

  // Display-only for now — light palette tokens are not wired up yet.
  document.body.classList.remove("light");

  document.querySelectorAll(".theme-toggle-button").forEach((button) => {
    const active = button.dataset.themeMode === resolved;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

export function setupThemeToggle() {
  const toggles = document.querySelectorAll(".theme-toggle");
  if (!toggles.length) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures in restricted environments.
  }

  applyTheme("dark");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      const button = event.target.closest(".theme-toggle-button");
      if (!button || button.disabled || button.getAttribute("aria-disabled") === "true") {
        return;
      }
      applyTheme(button.dataset.themeMode);
    });
  });
}
