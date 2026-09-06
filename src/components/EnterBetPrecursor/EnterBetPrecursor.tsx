import styles from "./EnterBetPrecursor.module.css";
import type { EnterBetPrecursorProps } from "./EnterBetPrecursor.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function EnterBetPrecursor({
  message = "Enter a bet amount to start playing",
  className,
  ...props
}: EnterBetPrecursorProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-enter-bet-precursor", className)} role="status">
      <span className={cx(styles.text, "joker-enter-bet-precursor-text")}>{message}</span>
    </div>
  );
}
