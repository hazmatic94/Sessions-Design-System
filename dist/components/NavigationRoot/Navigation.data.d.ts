import type { NavigationItem } from "./Navigation.types.js";
export declare const NAVIGATION_BREAKPOINTS: {
    readonly mobile: 1000;
    readonly desktop: 1300;
};
export declare function navigationMobileMediaQuery(): string;
export declare function navigationCompactMediaQuery(): string;
export declare const navigationSections: {
    home: any[];
    groups: ({
        item: {
            label: string;
            icon: string;
            section: string;
        };
        items: {
            label: string;
            icon: string;
            value: string;
            section: string;
        }[];
        comingSoonItems: {
            label: string;
            icon: string;
            value: string;
            section: string;
        }[];
        comingSoon?: undefined;
    } | {
        item: any;
        comingSoon: true;
        items: never[];
        comingSoonItems: {
            label: string;
            icon: string;
            value: string;
            section: string;
        }[];
    })[];
    gameLinks: any[];
    support: any[];
    account: {
        label: string;
        icon: string;
        href: string;
        section: string;
        tone: string;
    }[];
};
export declare function navigationValue(item: NavigationItem): string;
export declare function findNavigationGroupLabel(selectedValue?: string): any;
//# sourceMappingURL=Navigation.data.d.ts.map