import { useState } from "react";
import { OddsPanel } from "../OddsPanel/OddsPanel";
import { OddsRow } from "../OddsRow/OddsRow";
import styles from "./OddsSelection.module.css";
import type { OddsSelectionProps } from "./OddsSelection.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function OddsSelection({
  options,
  selectedIndex,
  defaultSelectedIndex = null,
  onSelect,
  className,
  ...props
}: OddsSelectionProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState<number | null>(defaultSelectedIndex);
  const activeIndex = selectedIndex !== undefined ? selectedIndex : uncontrolledIndex;

  const handleSelect = (index: number, unavailable?: boolean) => {
    if (unavailable) return;

    if (selectedIndex === undefined) {
      setUncontrolledIndex(index);
    }

    onSelect?.(index);
  };

  return (
    <div {...props} className={cx(styles.group, "joker-odds-selection", className)} data-odds-selection>
      <div className={cx(styles.labels, "joker-odds-selection__labels")}>
        {options.map((option) => (
          <OddsRow key={option.label}>{option.label}</OddsRow>
        ))}
      </div>
      <div className={cx(styles.panels, "joker-odds-selection__panels")}>
        {options.map((option, index) => (
          <OddsPanel
            key={option.label}
            data-odds-selection-panel
            selected={activeIndex === index}
            unavailable={option.unavailable}
            onClick={() => handleSelect(index, option.unavailable)}
          >
            {option.odds}
          </OddsPanel>
        ))}
      </div>
    </div>
  );
}
