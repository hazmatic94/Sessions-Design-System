import styles from "./HiloMainCardGlow.module.css";
import type { HiloMainCardGlowProps } from "./HiloMainCardGlow.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function HiloMainCardGlow({ className, ...props }: HiloMainCardGlowProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cx(styles.root, "joker-hilo-main-card-glow", className)}
    />
  );
}
