import { escapeHtml } from "../../utils.js";

const AVATAR_SIZE_CLASSES = {
  small: "sessions-avatar--sm",
  sm: "sessions-avatar--sm",
  medium: "sessions-avatar--md",
  md: "sessions-avatar--md",
  large: "sessions-avatar--lg",
  lg: "sessions-avatar--lg",
};

function resolveAvatarSizeClass(size = "medium") {
  return AVATAR_SIZE_CLASSES[size] ?? AVATAR_SIZE_CLASSES.medium;
}

function resolveAvatarSrcSet(src, srcSet) {
  if (srcSet !== undefined) return srcSet;
  if (!src) return "";

  const [path, query = ""] = String(src).split("?");
  const suffix = query ? `?${query}` : "";
  const at2x = path.replace(/(\.[^./]+)$/, "@2x$1");

  if (at2x === path) return "";

  return `${at2x}${suffix} 2x`;
}

export function renderSessionsAvatar({
  src,
  srcSet,
  alt = "",
  name,
  initial,
  label,
  href,
  size = "medium",
  className = "",
} = {}) {
  const classes = [
    "sessions-avatar",
    resolveAvatarSizeClass(size),
    src ? "sessions-avatar--image" : "sessions-avatar--initials",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const resolvedInitial = resolveInitial({ initial, name });
  const resolvedSrcSet = resolveAvatarSrcSet(src, srcSet);
  const contentMarkup = src
    ? `<img class="sessions-avatar__image" src="${escapeHtml(src)}"${resolvedSrcSet ? ` srcset="${escapeHtml(resolvedSrcSet)}"` : ""} alt="${escapeHtml(alt)}" decoding="async" />`
    : resolvedInitial
      ? `<span class="sessions-avatar__initial" aria-hidden="true">${escapeHtml(resolvedInitial)}</span>`
      : "";
  const inner = `<span class="sessions-avatar__inner">${contentMarkup}</span>`;
  const resolvedLabel = label ?? alt ?? name ?? (resolvedInitial ? `User ${resolvedInitial}` : "Profile");

  if (href) {
    return `<a class="${classes}" href="${escapeHtml(href)}" aria-label="${escapeHtml(resolvedLabel)}">${inner}</a>`;
  }

  if (label) {
    return `<button class="${classes}" type="button" aria-label="${escapeHtml(label)}">${inner}</button>`;
  }

  const ariaLabel = resolvedLabel ? ` aria-label="${escapeHtml(resolvedLabel)}"` : "";
  const role = src || resolvedInitial ? ' role="img"' : "";

  return `<span class="${classes}"${role}${ariaLabel}>${inner}</span>`;
}

function resolveInitial({ initial, name } = {}) {
  const value = initial ?? name;
  if (!value) return "";
  return String(value).trim().charAt(0).toUpperCase();
}
