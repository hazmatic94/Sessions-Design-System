import styles from "./ViewMarkets.module.css";
import type { ViewMarketsProps } from "./ViewMarkets.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ViewMarkets({
  children = "View markets",
  className,
  type = "button",
  ...props
}: ViewMarketsProps) {
  return (
    <button {...props} type={type} className={cx(styles.root, "joker-view-markets", className)}>
      <span className={cx(styles.label, "joker-view-markets__label")}>{children}</span>
      <span className={cx(styles.chevron, "joker-view-markets__chevron")} aria-hidden="true">
        <ChevronRightIcon />
      </span>
    </button>
  );
}
