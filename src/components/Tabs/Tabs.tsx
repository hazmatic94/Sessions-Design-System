import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs({
  tabs = [],
  value,
  activeValue,
  onChange,
  className,
  "aria-label": ariaLabel = "Tabs",
}: TabsProps) {
  const selectedValue = value ?? activeValue ?? tabs[0]?.value;

  return (
    <div
      className={cx(styles.group, "joker-tab-group", className)}
      role="tablist"
      aria-label={ariaLabel}
      data-joker-tab-group
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedValue;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            className={cx(styles.tab, "joker-tab", isSelected && styles.isSelected, isSelected && "is-selected")}
            aria-selected={isSelected}
            aria-label={tab.badge != null ? `${tab.label} (${tab.badge})` : tab.label}
            disabled={tab.disabled}
            data-joker-tab
            onClick={() => onChange?.(tab.value)}
          >
            <span className={cx(styles.label, "joker-tab-label")}>{tab.label}</span>
            {tab.badge != null ? (
              <span className={cx(styles.badge, "joker-tab-badge")} aria-hidden="true">
                {tab.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
