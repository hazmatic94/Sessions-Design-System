import type { MouseEvent, ReactNode } from "react";
export type NavigationMode = "desktop" | "compact" | "mobile";
export type NavigationItem = {
    label: string;
    icon: string;
    href?: string;
    value?: string;
    tone?: string;
    badge?: boolean;
    comingSoon?: boolean;
};
export type NavigationGroup = {
    item: NavigationItem;
    items: NavigationItem[];
    comingSoonItems?: NavigationItem[];
    comingSoon?: boolean;
};
export type NavigationProps = {
    balance?: string;
    logoHref?: string;
    avatarSrc?: string;
    children?: ReactNode;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string, item: NavigationItem) => void;
    onNavigate?: (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
};
export type ResolvedNavigationProps = Required<Pick<NavigationProps, "balance" | "logoHref" | "avatarSrc">> & Pick<NavigationProps, "children" | "value" | "onValueChange" | "onNavigate"> & {
    selectedValue?: string;
    setSelectedValue: (value: string, item: NavigationItem) => void;
    desktopOpenGroup: string | null;
    setDesktopOpenGroup: (group: string | null) => void;
};
//# sourceMappingURL=Navigation.types.d.ts.map