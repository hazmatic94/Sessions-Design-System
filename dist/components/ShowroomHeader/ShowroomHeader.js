import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import jokerLogoSrc from "../../../assets/jokerLogo.svg";
import styles from "./ShowroomHeader.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function LogOutIcon() {
    return (_jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [_jsx("path", { d: "m16 17 5-5-5-5", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }), _jsx("path", { d: "M21 12H9", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }), _jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" })] }));
}
export function ShowroomHeader({ logoAlt = "Joker", logoSrc = jokerLogoSrc, logoutLabel = "Log out", onLogout, className, ...props }) {
    return (_jsxs("header", { ...props, className: cx(styles.header, "joker-showroom-header", className), "aria-label": props["aria-label"] ?? "Showroom header", children: [_jsx("img", { className: cx(styles.logo, "joker-showroom-header-logo"), src: logoSrc, alt: logoAlt }), onLogout && (_jsx("button", { className: cx(styles.logout, "joker-showroom-header-logout"), type: "button", onClick: onLogout, "aria-label": logoutLabel, children: _jsx("span", { className: cx(styles.logoutIcon, "joker-showroom-header-logout-icon"), "aria-hidden": "true", children: _jsx(LogOutIcon, {}) }) }))] }));
}
