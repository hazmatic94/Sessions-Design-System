const VARIANT_DEFAULTS = {
  primary: { label: 'Confirm' },
  secondary: { label: 'Cancel' },
  ghost: { label: 'Cancel' },
};

export function renderSessionsButton({
  variant = 'primary',
  label,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  href,
  className = '',
  ariaExpanded,
  dataCodeToggle = false,
} = {}) {
  const resolvedLabel = label ?? VARIANT_DEFAULTS[variant]?.label ?? 'Button';
  const tag = href ? 'a' : 'button';

  const classes = [
    'sessions-button',
    `sessions-button--${variant}`,
    fullWidth ? 'sessions-button--full-width' : '',
    loading ? 'is-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const attrs = [
    `class="${classes}"`,
    href ? `href="${href}"` : '',
    !href ? `type="${type}"` : '',
    disabled && !loading && !href ? 'disabled' : '',
    loading ? 'aria-disabled="true"' : '',
    loading ? 'aria-busy="true"' : '',
    loading ? `aria-label="${resolvedLabel}"` : '',
    dataCodeToggle ? 'data-code-toggle' : '',
    ariaExpanded !== undefined && ariaExpanded !== null
      ? `aria-expanded="${ariaExpanded}"`
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return `<${tag} ${attrs}><span class="sessions-button__label" aria-hidden="true">${resolvedLabel}</span><span class="sessions-button__spinner button-loading-spinner" aria-hidden="true"></span></${tag}>`;
  }

  return `<${tag} ${attrs}><span class="sessions-button__label">${resolvedLabel}</span></${tag}>`;
}

export function renderPrimaryButton(options = {}) {
  return renderSessionsButton({ ...options, variant: 'primary' });
}

export function renderSecondaryButton(options = {}) {
  return renderSessionsButton({ ...options, variant: 'secondary' });
}

export function renderGhostButton(options = {}) {
  return renderSessionsButton({ ...options, variant: 'ghost' });
}
