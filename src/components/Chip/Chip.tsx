import styles from "./Chip.module.css";
import type { ChipProps, ChipVariant } from "./Chip.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantClassName: Record<ChipVariant, string> = {
  start: styles.start,
  skip: styles.skip,
  win: styles.win,
  loss: styles.loss,
};

const defaultLabel: Record<ChipVariant, string> = {
  start: "Start",
  skip: "Skip",
  win: "1.57x",
  loss: "0.00x",
};

export function Chip({ variant = "start", children, className, ...props }: ChipProps) {
  return (
    <span
      {...props}
      className={cx(styles.root, "joker-chip", `joker-chip--${variant}`, variantClassName[variant], className)}
    >
      {children ?? defaultLabel[variant]}
    </span>
  );
}
