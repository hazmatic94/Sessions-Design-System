import styles from "./OddsRow.module.css";
import type { OddsRowProps } from "./OddsRow.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function OddsRow({ children, className, ...props }: OddsRowProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-odds-row", className)}>
      <span className={cx(styles.label, "joker-odds-row__label")}>{children}</span>
    </div>
  );
}
