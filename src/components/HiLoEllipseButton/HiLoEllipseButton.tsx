import {
  HiLoEllipseHigherChevronIcon,
  HiLoEllipseLowerChevronIcon,
} from "./HiLoEllipseButton.icons";
import styles from "./HiLoEllipseButton.module.css";
import type { HiLoEllipseButtonProps, HiLoEllipseButtonVariant } from "./HiLoEllipseButton.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantConfig: Record<
  HiLoEllipseButtonVariant,
  { Icon: typeof HiLoEllipseHigherChevronIcon; label: string }
> = {
  skip: { Icon: HiLoEllipseHigherChevronIcon, label: "Skip" },
  higher: { Icon: HiLoEllipseHigherChevronIcon, label: "Higher" },
  lower: { Icon: HiLoEllipseLowerChevronIcon, label: "Lower" },
};

export function HiLoEllipseButton({
  variant = "skip",
  className,
  type = "button",
  ...props
}: HiLoEllipseButtonProps) {
  const { Icon, label } = variantConfig[variant];

  return (
    <button
      {...props}
      type={type}
      className={cx(
        styles.root,
        styles[`root--${variant}`],
        "joker-hilo-ellipse-button",
        `joker-hilo-ellipse-button--${variant}`,
        className,
      )}
      aria-label={props["aria-label"] ?? label}
    >
      <Icon className={cx(styles.chevron, "joker-hilo-ellipse-button__chevron")} />
    </button>
  );
}
