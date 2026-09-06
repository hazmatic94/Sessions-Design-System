import styles from "./ShowroomPill.module.css";
import type { ShowroomPillProps } from "./ShowroomPill.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ShowroomPill({
  children,
  className,
  icon,
  label,
  selected = false,
  type = "button",
  ...props
}: ShowroomPillProps) {
  const content = children ?? label;

  return (
    <button {...props} className={cx(styles.pill, "joker-showroom-pill", selected && styles.selected, selected && "is-selected", className)} type={type} aria-pressed={props["aria-pressed"] ?? selected}>
      {icon && (
        <span className={cx(styles.icon, "joker-showroom-pill-icon")} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{content}</span>
    </button>
  );
}
