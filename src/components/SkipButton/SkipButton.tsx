import styles from "./SkipButton.module.css";
import type { SkipButtonProps } from "./SkipButton.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <path d="M2 1.5 5.5 4 2 6.5" />
    </svg>
  );
}

export function SkipButton({ className, type = "button", ...props }: SkipButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx(styles.root, "joker-skip-button", className)}
      aria-label={props["aria-label"] ?? "Skip"}
    >
      <span className={cx(styles.icon, "joker-skip-button__icon")} aria-hidden="true">
        <ChevronRightIcon className={cx(styles.chevron, "joker-skip-button__chevron")} />
        <ChevronRightIcon className={cx(styles.chevron, "joker-skip-button__chevron")} />
      </span>
    </button>
  );
}
