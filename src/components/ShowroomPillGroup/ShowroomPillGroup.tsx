import { useState } from "react";
import { ShowroomPill } from "../ShowroomPill/index.js";
import styles from "./ShowroomPillGroup.module.css";
import type { ShowroomPillGroupProps } from "./ShowroomPillGroup.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ShowroomPillGroup({
  className,
  defaultValue,
  items,
  onValueChange,
  value,
  ...props
}: ShowroomPillGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? "");
  const selectedValue = value ?? internalValue;

  return (
    <div {...props} className={cx(styles.group, "joker-showroom-pill-carousel", className)} role={props.role ?? "radiogroup"}>
      {items.map((item) => {
        const isSelected = selectedValue === item.value;

        return (
          <ShowroomPill
            icon={item.icon}
            key={item.value}
            label={item.label}
            role="radio"
            selected={isSelected}
            aria-checked={isSelected}
            onClick={() => {
              setInternalValue(item.value);
              onValueChange?.(item.value);
            }}
          />
        );
      })}
    </div>
  );
}
