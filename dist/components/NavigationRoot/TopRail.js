import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import jokerLogoSrc from "../../../assets/jokerLogo.svg";
import { navigationItemRegistry } from "../../data/navigationData.js";
import { AssetIcon, WalletIcon } from "./NavigationIcons.js";
export function JokerLogo({ href }) {
    return (_jsx("a", { className: "joker-logo-component", href: href, "aria-label": "Joker OS home", children: _jsx("img", { src: jokerLogoSrc, alt: "Joker OS" }) }));
}
export function WalletControl({ balance }) {
    return (_jsxs("div", { className: "joker-wallet-control", "aria-label": "Wallet balance", children: [_jsxs("div", { className: "joker-wallet-balance", children: [_jsx("img", { className: "joker-wallet-coin", src: jokerCoinSrc, alt: "" }), _jsx("span", { children: balance })] }), _jsx("button", { className: "joker-wallet-action", type: "button", "aria-label": "Open wallet", children: _jsx(WalletIcon, {}) })] }));
}
function ActionButton({ icon, label, badge, className = "", comingSoon = false, }) {
    return (_jsxs("button", { className: `joker-action-item ${comingSoon ? "is-coming-soon" : ""} ${className}`.trim(), type: "button", "aria-label": label, "aria-disabled": comingSoon || undefined, disabled: comingSoon, tabIndex: comingSoon ? -1 : undefined, children: [_jsx(AssetIcon, { icon: icon, className: "joker-action-icon" }), badge && _jsx("span", { className: "joker-action-badge", "aria-hidden": "true" })] }));
}
export function WalletAction({ className = "" }) {
    return (_jsx("button", { className: `joker-wallet-action ${className}`.trim(), type: "button", "aria-label": "Open wallet", children: _jsx(WalletIcon, {}) }));
}
export function NotificationAction({ className = "" }) {
    return (_jsx(ActionButton, { icon: navigationItemRegistry.notifications.icon, label: navigationItemRegistry.notifications.label, badge: true, className: className }));
}
export function AvatarAction({ avatarSrc, className = "", label = "Open profile", }) {
    return (_jsxs("button", { className: `joker-avatar-item ${className}`.trim(), type: "button", "aria-label": label, children: [_jsx("img", { src: avatarSrc, alt: "" }), _jsx("span", { className: "joker-avatar-status", "aria-hidden": "true" })] }));
}
export function MobileNavActions({ avatarSrc }) {
    return (_jsx("section", { className: "joker-mobile-nav-section joker-mobile-nav-actions", "aria-label": "Wallet and account", children: _jsxs("div", { className: "joker-mobile-nav-actions-row", children: [_jsx(WalletAction, {}), _jsx(NotificationAction, {}), _jsx(AvatarAction, { avatarSrc: avatarSrc, className: "joker-mobile-avatar-item" })] }) }));
}
export function TopRail({ balance, logoHref, avatarSrc }) {
    return (_jsxs("header", { className: "joker-top-rail-demo", "aria-label": "Joker top rail", children: [_jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--left", children: _jsx(JokerLogo, { href: logoHref }) }), _jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--center", children: _jsx(WalletControl, { balance: balance }) }), _jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--right", children: _jsxs("div", { className: "joker-top-rail-actions", children: [_jsx(NotificationAction, {}), _jsx(AvatarAction, { avatarSrc: avatarSrc })] }) })] }));
}
