import styles from "./Button.module.css";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  odds: styles.hiLo,
  "hi-lo": styles.hiLo,
  "hi-lo-skip": styles.hiLoSkip,
  cashout: styles.cashout,
};

const sizeClasses: Record<ButtonSize, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  label,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  selected = false,
  selectGlow = false,
  disabled = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const content = children ?? label;
  const primarySizeClass = variant === "primary" ? sizeClasses[size] : null;

  return (
    <button
      {...props}
      type={type}
      className={cx(
        styles.root,
        variantClasses[variant],
        primarySizeClass,
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        selected && styles.selected,
        selectGlow && styles.selectGlow,
        selectGlow && "is-select-glow",
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-pressed={selected || undefined}
    >
      <span className={styles.content}>{content}</span>
      {loading && <span className={styles.loader} aria-hidden="true" />}
    </button>
  );
}
