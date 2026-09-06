import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { navigationSections, navigationValue } from "./Navigation.data.js";
import { AssetIcon, ChevronIcon } from "./NavigationIcons.js";
import { RailSearch } from "./RailSearch.js";
export function RailNavItem({ item, selected, className = "", onSelect, onNavigate, }) {
    const handleClick = (event) => {
        if (item.comingSoon) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        onSelect(item);
        onNavigate?.(item, event);
    };
    return (_jsxs("a", { className: `joker-product-rail-item ${selected ? "is-selected" : ""} ${item.comingSoon ? "is-coming-soon" : ""} ${className}`.trim(), href: item.href ?? "#", "data-product-rail-item": true, "data-tooltip": item.label, "aria-label": item.label, "aria-current": selected ? "page" : undefined, "aria-disabled": item.comingSoon || undefined, tabIndex: item.comingSoon ? -1 : undefined, onClick: handleClick, children: [_jsx(AssetIcon, { icon: item.icon }), _jsx("span", { className: "joker-product-rail-item-label", children: item.label })] }));
}
export function GameMenuDropdown({ group, selectedValue, open, onToggle, onSelect, }) {
    const hasSelection = !group.comingSoon && group.items.some((item) => selectedValue === navigationValue(item));
    const comingSoonItems = group.comingSoonItems ?? [];
    const isComingSoon = Boolean(group.comingSoon);
    const renderOption = (item, comingSoon = false) => {
        const itemValue = navigationValue(item);
        const selected = !comingSoon && selectedValue === itemValue;
        return (_jsxs("button", { className: `joker-product-rail-game-option ${selected ? "is-selected" : ""} ${comingSoon ? "is-coming-soon" : ""}`.trim(), type: "button", role: "menuitemradio", "aria-checked": selected, "aria-disabled": comingSoon || undefined, disabled: comingSoon, tabIndex: comingSoon ? -1 : undefined, "data-game-menu-option": true, "data-tooltip": item.label, "aria-label": item.label, onClick: comingSoon ? undefined : () => onSelect(item), children: [_jsx("span", { className: "joker-product-rail-game-icon", "aria-hidden": "true", children: _jsx(AssetIcon, { icon: item.icon }) }), _jsx("span", { children: item.label })] }, itemValue));
    };
    return (_jsxs("div", { className: `joker-product-rail-game-menu ${open && !isComingSoon ? "is-open" : ""} ${hasSelection ? "has-selection" : ""} ${isComingSoon ? "is-coming-soon" : ""}`.trim(), "data-game-menu": true, children: [_jsxs("button", { className: `joker-product-rail-menu-trigger ${isComingSoon ? "is-coming-soon" : ""}`.trim(), type: "button", "aria-expanded": open && !isComingSoon, "data-game-menu-toggle": true, "data-tooltip": group.item.label, "aria-label": group.item.label, "aria-disabled": isComingSoon || undefined, disabled: isComingSoon, tabIndex: isComingSoon ? -1 : undefined, onClick: isComingSoon ? undefined : onToggle, children: [_jsxs("span", { className: "joker-product-rail-menu-label", children: [_jsx("span", { className: "joker-product-rail-game-icon", "aria-hidden": "true", children: _jsx(AssetIcon, { icon: group.item.icon }) }), _jsx("span", { children: group.item.label })] }), _jsx("span", { className: "joker-product-rail-menu-chevron", "aria-hidden": "true", children: _jsx(ChevronIcon, {}) })] }), _jsxs("div", { className: "joker-product-rail-game-list", role: "menu", children: [_jsx("div", { className: "joker-product-rail-game-list-available", children: group.items.map((item) => renderOption(item)) }), comingSoonItems.length > 0 && (_jsxs("div", { className: "joker-product-rail-game-list-coming-soon", children: [_jsx("p", { className: "joker-product-rail-game-list-coming-soon-label", children: "Coming soon" }), _jsx("div", { className: "joker-product-rail-game-list-coming-soon-items", children: comingSoonItems.map((item) => renderOption(item, true)) })] }))] })] }));
}
export function SideRail({ collapsed = false, mobileDrawer = false, selectedValue, setSelectedValue, onNavigate, openGroup: controlledOpenGroup, setOpenGroup: setControlledOpenGroup, }) {
    const [internalOpenGroup, setInternalOpenGroup] = useState("Originals");
    const [searchOpen, setSearchOpen] = useState(false);
    const railRef = useRef(null);
    const isControlled = typeof setControlledOpenGroup === "function";
    const openGroup = isControlled ? (controlledOpenGroup ?? null) : internalOpenGroup;
    const setOpenGroup = setControlledOpenGroup ?? setInternalOpenGroup;
    useEffect(() => {
        const handlePointerDown = (event) => {
            const target = event.target;
            if (target && railRef.current?.contains(target))
                return;
            if (collapsed)
                setOpenGroup(null);
            setSearchOpen(false);
        };
        const handleKeyDown = (event) => {
            if (event.key !== "Escape")
                return;
            if (collapsed)
                setOpenGroup(null);
            setSearchOpen(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [collapsed, setOpenGroup]);
    const selectItem = (item) => {
        setSelectedValue(navigationValue(item), item);
    };
    const renderItem = (item, className = "") => (_jsx(RailNavItem, { item: item, className: className, selected: selectedValue === navigationValue(item), onSelect: selectItem, onNavigate: onNavigate }, navigationValue(item)));
    return (_jsxs("aside", { ref: railRef, className: `joker-product-rail ${collapsed ? "is-collapsed" : ""} ${mobileDrawer ? "joker-product-rail--mobile-drawer" : ""}`.trim(), "aria-label": collapsed ? "Collapsed Joker product navigation" : "Expanded Joker product navigation", children: [!mobileDrawer && (_jsx("div", { className: "joker-product-rail-search", children: _jsx(RailSearch, { searchOpen: searchOpen, setSearchOpen: setSearchOpen }) })), _jsxs("div", { className: "joker-product-rail-scroll", children: [_jsx("section", { className: "joker-product-rail-section", "aria-label": "Main navigation", children: navigationSections.home.map((item) => renderItem(item)) }), _jsxs("section", { className: "joker-product-rail-section", "aria-label": "Games", children: [navigationSections.groups.map((group) => (_jsx(GameMenuDropdown, { group: group, selectedValue: selectedValue, open: openGroup === group.item.label, onToggle: () => {
                                    if (group.comingSoon)
                                        return;
                                    setOpenGroup(openGroup === group.item.label ? null : group.item.label);
                                }, onSelect: selectItem }, group.item.label))), navigationSections.gameLinks.map((item) => renderItem(item, "joker-product-rail-item--with-ball"))] }), _jsx("section", { className: "joker-product-rail-section", "aria-label": "Support", children: navigationSections.support.map((item) => renderItem(item)) })] }), _jsx("div", { className: "joker-product-rail-footer", children: navigationSections.account.map((item) => renderItem(item, item.tone === "danger" ? "joker-product-rail-logout" : "")) })] }));
}
