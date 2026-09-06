import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ShowroomPill } from "../ShowroomPill/index.js";
import styles from "./ShowroomPillGroup.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function ShowroomPillGroup({ className, defaultValue, items, onValueChange, value, ...props }) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? "");
    const selectedValue = value ?? internalValue;
    return (_jsx("div", { ...props, className: cx(styles.group, "joker-showroom-pill-carousel", className), role: props.role ?? "radiogroup", children: items.map((item) => {
            const isSelected = selectedValue === item.value;
            return (_jsx(ShowroomPill, { icon: item.icon, label: item.label, role: "radio", selected: isSelected, "aria-checked": isSelected, onClick: () => {
                    setInternalValue(item.value);
                    onValueChange?.(item.value);
                } }, item.value));
        }) }));
}
