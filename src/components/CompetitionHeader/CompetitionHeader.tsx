import styles from "./CompetitionHeader.module.css";
import type { CompetitionHeaderProps } from "./CompetitionHeader.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CompetitionHeader({ children, className, ...props }: CompetitionHeaderProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-competition-header", className)}>
      <span className={cx(styles.label, "joker-competition-header__label")}>{children}</span>
    </div>
  );
}
