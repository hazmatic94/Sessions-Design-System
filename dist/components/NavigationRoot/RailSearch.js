import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { railSearchComingSoon } from "../../data/navigationData.js";
import { AssetIcon } from "./NavigationIcons.js";
export function RailSearch({ className = "", placeholder = "Search", searchOpen, setSearchOpen, comingSoon = railSearchComingSoon, }) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = !comingSoon && (searchOpen ?? internalOpen);
    const setOpen = setSearchOpen ?? setInternalOpen;
    const handleFocus = (event) => {
        if (comingSoon) {
            event.currentTarget.blur();
            return;
        }
        setOpen(true);
    };
    const handleClick = (event) => {
        if (!comingSoon)
            return;
        event.preventDefault();
    };
    return (_jsxs("label", { className: `joker-rail-search-item ${isOpen ? "is-search-open" : ""} ${comingSoon ? "is-coming-soon" : ""} ${className}`.trim(), "aria-label": "Search navigation", "aria-disabled": comingSoon || undefined, "data-tooltip": "Search", onClick: handleClick, children: [_jsx(AssetIcon, { icon: "search" }), _jsx("input", { type: "search", placeholder: placeholder, disabled: comingSoon, readOnly: comingSoon, tabIndex: comingSoon ? -1 : undefined, onFocus: handleFocus, onKeyDown: (event) => {
                    if (comingSoon)
                        return;
                    if (event.key === "Escape") {
                        event.currentTarget.blur();
                        setOpen(false);
                    }
                } })] }));
}
