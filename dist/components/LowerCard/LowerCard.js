import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LowerCardChevronDownIcon, LowerCardDividerIcon } from "./LowerCard.icons";
import styles from "./LowerCard.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function LowerCard({ topLabel = "LOWER", bottomLabel = "SAME", multiplier = "X4.20", className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-lower-card", className), "aria-label": props["aria-label"] ?? "Lower card", children: _jsx("div", { className: cx(styles.inner, "joker-lower-card__inner"), children: _jsxs("div", { className: cx(styles.content, "joker-lower-card__content"), children: [_jsxs("div", { className: cx(styles.top, "joker-lower-card__top"), children: [_jsx(LowerCardChevronDownIcon, { className: cx(styles.chevron, "joker-lower-card__chevron") }), _jsxs("div", { className: cx(styles.labels, "joker-lower-card__labels"), children: [_jsx("span", { className: cx(styles.label, "joker-lower-card__label"), children: topLabel }), _jsx(LowerCardDividerIcon, { className: cx(styles.divider, "joker-lower-card__divider") }), _jsx("span", { className: cx(styles.label, "joker-lower-card__label"), children: bottomLabel })] })] }), _jsx("span", { className: cx(styles.multiplier, "joker-lower-card__multiplier"), children: multiplier })] }) }) }));
}
