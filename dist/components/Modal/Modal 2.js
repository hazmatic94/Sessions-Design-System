import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../Button/Button";
import styles from "./Modal.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CloseIcon() {
    return (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [_jsx("path", { d: "M18 6 6 18", strokeLinecap: "round" }), _jsx("path", { d: "m6 6 12 12", strokeLinecap: "round" })] }));
}
export function Modal({ title = "Low Balance", children = "You don’t have enough Joker Coins to place this bet. Your bet slip has been saved.\n\nDeposit more Joker Coins to continue", cancelLabel = "Cancel", primaryLabel = "Deposit Now", onCancel, onPrimary, onClose, className, ...props }) {
    const titleId = "joker-modal-title";
    return (_jsx("div", { className: styles.viewport, children: _jsxs("div", { ...props, className: cx(styles.root, className), role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { id: titleId, className: styles.title, children: title }), _jsx("button", { type: "button", className: styles.dismiss, onClick: onClose ?? onCancel, "aria-label": "Close", children: _jsx(CloseIcon, {}) })] }), _jsxs("div", { className: styles.body, children: [_jsx("p", { className: styles.message, children: children }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { type: "button", variant: "ghost", fullWidth: true, className: styles.cancelGhost, onClick: onCancel, children: cancelLabel }), _jsx(Button, { type: "button", variant: "primary", fullWidth: true, onClick: onPrimary, children: primaryLabel })] })] })] }) }));
}
