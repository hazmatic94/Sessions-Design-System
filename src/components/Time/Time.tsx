import styles from "./Time.module.css";
import type { TimeProps } from "./Time.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Time({ children, className, ...props }: TimeProps) {
  return (
    <span {...props} className={cx(styles.root, "joker-time", className)}>
      <span className={cx(styles.label, "joker-time__label")}>{children}</span>
    </span>
  );
}
