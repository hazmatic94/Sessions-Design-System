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
} = {}) {
  const resolvedLabel = label ?? VARIANT_DEFAULTS[variant]?.label ?? 'Button';

  const classes = [
    'sessions-button',
    `sessions-button--${variant}`,
    fullWidth ? 'sessions-button--full-width' : '',
    loading ? 'is-loading' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const attrs = [
    `class="${classes}"`,
    `type="${type}"`,
    disabled && !loading ? 'disabled' : '',
    loading ? 'aria-disabled="true"' : '',
    loading ? 'aria-busy="true"' : '',
    loading ? `aria-label="${resolvedLabel}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return `<button ${attrs}><span class="sessions-button__label" aria-hidden="true">${resolvedLabel}</span><span class="sessions-button__spinner button-loading-spinner" aria-hidden="true"></span></button>`;
  }

  return `<button ${attrs}><span class="sessions-button__label">${resolvedLabel}</span></button>`;
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
