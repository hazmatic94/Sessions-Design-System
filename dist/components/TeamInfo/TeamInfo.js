import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./TeamInfo.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function TeamInfo({ logoSrc, logoAlt = "", children, className, ...props }) {
    return (_jsxs("div", { ...props, className: cx(styles.root, "joker-team-info", className), children: [_jsx("span", { className: cx(styles.logoWrap, "joker-team-info__logo-wrap"), children: _jsx("img", { className: cx(styles.logo, "joker-team-info__logo"), src: logoSrc, alt: logoAlt }) }), _jsx("span", { className: cx(styles.name, "joker-team-info__name"), children: children })] }));
}
