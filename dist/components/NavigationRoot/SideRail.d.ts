import type { NavigationGroup, NavigationItem, NavigationProps } from "./Navigation.types.js";
export declare function RailNavItem({ item, selected, className, onSelect, onNavigate, }: {
    item: NavigationItem;
    selected: boolean;
    className?: string;
    onSelect: (item: NavigationItem) => void;
    onNavigate?: NavigationProps["onNavigate"];
}): import("react").JSX.Element;
export declare function GameMenuDropdown({ group, selectedValue, open, onToggle, onSelect, }: {
    group: NavigationGroup;
    selectedValue?: string;
    open: boolean;
    onToggle: () => void;
    onSelect: (item: NavigationItem) => void;
}): import("react").JSX.Element;
export declare function SideRail({ collapsed, mobileDrawer, selectedValue, setSelectedValue, onNavigate, openGroup: controlledOpenGroup, setOpenGroup: setControlledOpenGroup, }: {
    collapsed?: boolean;
    mobileDrawer?: boolean;
    selectedValue?: string;
    setSelectedValue: (value: string, item: NavigationItem) => void;
    onNavigate?: NavigationProps["onNavigate"];
    openGroup?: string | null;
    setOpenGroup?: (group: string | null) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=SideRail.d.ts.map