import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HigherCardChevronUpIcon, HigherCardDividerIcon } from "./HigherCard.icons";
import styles from "./HigherCard.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function HigherCard({ topLabel = "HIGHER", bottomLabel = "SAME", multiplier = "X4.20", className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-higher-card", className), "aria-label": props["aria-label"] ?? "Higher card", children: _jsx("div", { className: cx(styles.inner, "joker-higher-card__inner"), children: _jsxs("div", { className: cx(styles.content, "joker-higher-card__content"), children: [_jsxs("div", { className: cx(styles.top, "joker-higher-card__top"), children: [_jsx(HigherCardChevronUpIcon, { className: cx(styles.chevron, "joker-higher-card__chevron") }), _jsxs("div", { className: cx(styles.labels, "joker-higher-card__labels"), children: [_jsx("span", { className: cx(styles.label, "joker-higher-card__label"), children: topLabel }), _jsx(HigherCardDividerIcon, { className: cx(styles.divider, "joker-higher-card__divider") }), _jsx("span", { className: cx(styles.label, "joker-higher-card__label"), children: bottomLabel })] })] }), _jsx("span", { className: cx(styles.multiplier, "joker-higher-card__multiplier"), children: multiplier })] }) }) }));
}
