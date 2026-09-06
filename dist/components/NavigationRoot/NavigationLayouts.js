import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MenuIcon } from "./NavigationIcons.js";
import { SideRail } from "./SideRail.js";
import { JokerLogo, MobileNavActions, TopRail } from "./TopRail.js";
export function DesktopNavigation(props) {
    return (_jsxs("div", { className: "joker-navigation joker-navigation--desktop", children: [_jsx(TopRail, { balance: props.balance, logoHref: props.logoHref, avatarSrc: props.avatarSrc }), _jsxs("div", { className: "joker-navigation-body", children: [_jsx(SideRail, { selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate, openGroup: props.desktopOpenGroup, setOpenGroup: props.setDesktopOpenGroup }), props.children && _jsx("div", { className: "joker-navigation-content", children: props.children })] })] }));
}
export function CompactDesktopNavigation(props) {
    return (_jsxs("div", { className: "joker-navigation joker-navigation--compact", children: [_jsx(TopRail, { balance: props.balance, logoHref: props.logoHref, avatarSrc: props.avatarSrc }), _jsxs("div", { className: "joker-navigation-body", children: [_jsx(SideRail, { collapsed: true, selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate, openGroup: props.desktopOpenGroup, setOpenGroup: props.setDesktopOpenGroup }), props.children && _jsx("div", { className: "joker-navigation-content", children: props.children })] })] }));
}
function MobileNavigationTopBar({ open, setOpen, logoHref, }) {
    return (_jsxs("header", { className: "joker-mobile-nav-bar joker-mobile-nav-trigger-bar", children: [_jsx(JokerLogo, { href: logoHref }), _jsx("button", { className: "joker-mobile-nav-toggle", type: "button", "aria-expanded": open, "aria-label": "Toggle menu", "data-mobile-nav-toggle": true, onClick: () => setOpen(!open), children: _jsx(MenuIcon, { open: open }) })] }));
}
function MobileDrawer({ open, setOpen, logoHref, avatarSrc, selectedValue, setSelectedValue, onNavigate, openGroup, setOpenGroup, }) {
    return (_jsx("div", { className: `joker-mobile-nav-panel${open ? " is-open" : ""}`.trim(), "aria-hidden": !open, children: _jsxs("div", { className: "joker-mobile-nav-panel-inner", children: [_jsxs("header", { className: "joker-mobile-nav-bar joker-mobile-nav-drawer-header", children: [_jsx(JokerLogo, { href: logoHref }), _jsx("button", { className: "joker-mobile-nav-toggle joker-mobile-nav-toggle--close", type: "button", "aria-expanded": open, "aria-label": "Close menu", "data-mobile-nav-toggle": true, onClick: () => setOpen(false), children: _jsx(MenuIcon, { open: true }) })] }), _jsx(MobileNavActions, { avatarSrc: avatarSrc }), _jsx("div", { className: "joker-mobile-nav-scroll", children: _jsx(SideRail, { mobileDrawer: true, selectedValue: selectedValue, setSelectedValue: (value, item) => {
                            setSelectedValue(value, item);
                            setOpen(false);
                        }, onNavigate: onNavigate, openGroup: openGroup, setOpenGroup: setOpenGroup }) })] }) }));
}
export function MobileNavigation(props) {
    const [open, setOpen] = useState(props.defaultOpen ?? false);
    const lockBodyScroll = props.lockBodyScroll ?? true;
    useEffect(() => {
        if (!open || !lockBodyScroll)
            return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [lockBodyScroll, open]);
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: `joker-mobile-nav ${open ? "is-open" : ""}`.trim(), "data-mobile-nav": true, children: [_jsx(MobileNavigationTopBar, { open: open, setOpen: setOpen, logoHref: props.logoHref }), _jsx("button", { type: "button", className: `joker-mobile-nav-backdrop ${open ? "is-visible" : ""}`.trim(), "data-mobile-nav-backdrop": true, "aria-hidden": !open, tabIndex: open ? 0 : -1, onClick: () => setOpen(false) }), _jsx(MobileDrawer, { open: open, setOpen: setOpen, logoHref: props.logoHref, avatarSrc: props.avatarSrc, selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate, openGroup: props.desktopOpenGroup, setOpenGroup: props.setDesktopOpenGroup })] }), props.children && _jsx("div", { className: "joker-navigation-mobile-content", children: props.children })] }));
}
