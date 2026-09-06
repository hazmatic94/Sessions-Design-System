import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./HiloMainCardGlow.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function HiloMainCardGlow({ className, ...props }) {
    return (_jsx("div", { ...props, "aria-hidden": "true", className: cx(styles.root, "joker-hilo-main-card-glow", className) }));
}
