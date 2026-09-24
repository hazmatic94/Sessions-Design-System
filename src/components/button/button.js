import { escapeHtml } from "../../utils.js";

const VARIANT_DEFAULTS = {
  primary: { label: "Confirm" },
  secondary: { label: "Cancel" },
  ghost: { label: "Cancel" },
};

const BUTTON_ICONS = {
  plus: "/assets/IconPlus.svg",
  "chevron-right": "/assets/IconCehvronRight.svg",
  "chevron-left": "/assets/IconChevronLeft.svg",
  "chevron-down": "/assets/IconChevronDown.svg",
  arrow: "/assets/IconArrow.svg",
  edit: "/assets/IconEdit.svg",
  trash: "/assets/IconTrash.svg",
  search: "/assets/IconSearch.svg",
  close: "/assets/IconClose.svg",
};

const ICON_POSITIONS = new Set(["start", "end"]);

function resolveIconSrc({ icon, iconSrc }) {
  if (iconSrc) return iconSrc;
  if (!icon) return "";
  return BUTTON_ICONS[icon] ?? "";
}

function renderButtonIcon({ icon, iconSrc }) {
  const src = resolveIconSrc({ icon, iconSrc });
  if (!src) return "";

  return `<span class="sessions-button__icon" style="--sessions-button-icon: url('${escapeHtml(src)}')" aria-hidden="true"></span>`;
}

function renderButtonContent({
  label,
  icon,
  iconSrc,
  iconPosition = "start",
  loading = false,
}) {
  const hasIcon = Boolean(resolveIconSrc({ icon, iconSrc })) && !loading;
  const hasLabel = Boolean(label);
  const iconMarkup = hasIcon ? renderButtonIcon({ icon, iconSrc }) : "";
  const labelMarkup = hasLabel
    ? `<span class="sessions-button__label"${loading ? ' aria-hidden="true"' : ""}>${label}</span>`
    : "";

  let content = labelMarkup;
  if (hasIcon && !hasLabel) {
    content = iconMarkup;
  } else if (hasIcon && hasLabel) {
    content =
      iconPosition === "end" ? `${labelMarkup}${iconMarkup}` : `${iconMarkup}${labelMarkup}`;
  }

  const spinner = loading
    ? '<span class="sessions-button__spinner button-loading-spinner" aria-hidden="true"></span>'
    : "";

  return `${content}${spinner}`;
}

export function renderSessionsButton({
  variant = "primary",
  label,
  icon,
  iconSrc,
  iconPosition = "start",
  ariaLabel,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  href,
  className = "",
  ariaExpanded,
  dataCodeToggle = false,
} = {}) {
  const hasIcon = Boolean(resolveIconSrc({ icon, iconSrc }));
  const hasLabel = Boolean(label);
  const isIconOnly = hasIcon && !hasLabel;
  const resolvedPosition = ICON_POSITIONS.has(iconPosition) ? iconPosition : "start";
  const hasIconWithLabel = hasIcon && hasLabel && !loading;
  const resolvedLabel =
    label ?? ariaLabel ?? VARIANT_DEFAULTS[variant]?.label ?? "Button";
  const tag = href ? "a" : "button";

  const classes = [
    "sessions-button",
    `sessions-button--${variant}`,
    fullWidth ? "sessions-button--full-width" : "",
    isIconOnly ? "sessions-button--icon-only" : "",
    hasIconWithLabel && resolvedPosition === "start" ? "sessions-button--icon-start" : "",
    hasIconWithLabel && resolvedPosition === "end" ? "sessions-button--icon-end" : "",
    loading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const attrs = [
    `class="${classes}"`,
    href ? `href="${href}"` : "",
    !href ? `type="${type}"` : "",
    disabled && !loading && !href ? "disabled" : "",
    loading ? 'aria-disabled="true"' : "",
    loading ? 'aria-busy="true"' : "",
    loading || isIconOnly ? `aria-label="${escapeHtml(resolvedLabel)}"` : "",
    dataCodeToggle ? "data-code-toggle" : "",
    ariaExpanded !== undefined && ariaExpanded !== null
      ? `aria-expanded="${ariaExpanded}"`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = renderButtonContent({
    label,
    icon,
    iconSrc,
    iconPosition: resolvedPosition,
    loading,
  });

  return `<${tag} ${attrs}>${content}</${tag}>`;
}

export function renderPrimaryButton(options = {}) {
  return renderSessionsButton({ ...options, variant: "primary" });
}

export function renderSecondaryButton(options = {}) {
  return renderSessionsButton({ ...options, variant: "secondary" });
}

export function renderGhostButton(options = {}) {
  return renderSessionsButton({ ...options, variant: "ghost" });
}
