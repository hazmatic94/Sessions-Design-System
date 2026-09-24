import { escapeHtml } from "../../utils.js";

export function renderSessionsTab({
  label,
  value,
  selected = false,
  className = "",
} = {}) {
  const classes = [
    "sessions-tabs__tab",
    selected ? "sessions-tabs__tab--selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return `<button class="${classes}" type="button" role="tab" aria-selected="${selected ? "true" : "false"}" data-tab-value="${escapeHtml(String(value ?? label ?? ""))}"><span class="sessions-tabs__label" data-text="${escapeHtml(label ?? "")}">${escapeHtml(label ?? "")}</span><span class="sessions-tabs__indicator" aria-hidden="true"></span></button>`;
}

export function renderSessionsTabs({
  tabs = [],
  selected,
  className = "",
  interactive = true,
} = {}) {
  const resolvedSelected =
    selected ??
    tabs.find((tab) => tab.selected)?.value ??
    tabs[0]?.value ??
    tabs[0]?.label;
  const classes = ["sessions-tabs", className].filter(Boolean).join(" ");
  const tabMarkup = tabs
    .map((tab) =>
      renderSessionsTab({
        label: tab.label,
        value: tab.value ?? tab.label,
        selected: (tab.value ?? tab.label) === resolvedSelected,
      }),
    )
    .join("");
  const attrs = [
    `class="${classes}"`,
    'role="tablist"',
    `style="--sessions-tabs-count: ${tabs.length}"`,
    interactive ? "data-sessions-tabs" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<div ${attrs}>${tabMarkup}</div>`;
}
