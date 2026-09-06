import { jsx as _jsx } from "react/jsx-runtime";
import { HiLoEllipseHigherChevronIcon, HiLoEllipseLowerChevronIcon, } from "./HiLoEllipseButton.icons";
import styles from "./HiLoEllipseButton.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
const variantConfig = {
    skip: { Icon: HiLoEllipseHigherChevronIcon, label: "Skip" },
    higher: { Icon: HiLoEllipseHigherChevronIcon, label: "Higher" },
    lower: { Icon: HiLoEllipseLowerChevronIcon, label: "Lower" },
};
export function HiLoEllipseButton({ variant = "skip", className, type = "button", ...props }) {
    const { Icon, label } = variantConfig[variant];
    return (_jsx("button", { ...props, type: type, className: cx(styles.root, styles[`root--${variant}`], "joker-hilo-ellipse-button", `joker-hilo-ellipse-button--${variant}`, className), "aria-label": props["aria-label"] ?? label, children: _jsx(Icon, { className: cx(styles.chevron, "joker-hilo-ellipse-button__chevron") }) }));
}
