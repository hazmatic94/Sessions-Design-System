import {
  casinoGroupMenuItems,
  comingSoonGameMenuItems,
  gameMenuItems,
  mainNavGameLinkItems,
  mainNavHomeItems,
  mainNavSupportItems,
  navigationItemRegistry,
  promotionsGroupMenuItems,
  withComingSoon,
} from "../../data/navigationData.js";
import type { NavigationGroup, NavigationItem } from "./Navigation.types.js";

export const NAVIGATION_BREAKPOINTS = {
  // Matches collapsed rail + page padding + min betting panel + min game canvas.
  mobile: 1000,
  desktop: 1300,
} as const;

export function navigationMobileMediaQuery() {
  return `(max-width: ${NAVIGATION_BREAKPOINTS.mobile - 1}px)`;
}

export function navigationCompactMediaQuery() {
  return `(max-width: ${NAVIGATION_BREAKPOINTS.desktop}px)`;
}

export const navigationSections = {
  home: mainNavHomeItems,
  groups: [
    {
      item: navigationItemRegistry.originals,
      items: gameMenuItems,
      comingSoonItems: comingSoonGameMenuItems,
    },
    {
      item: withComingSoon(navigationItemRegistry.casino),
      comingSoon: true,
      items: [],
      comingSoonItems: casinoGroupMenuItems,
    },
    {
      item: withComingSoon(navigationItemRegistry.promotions),
      comingSoon: true,
      items: [],
      comingSoonItems: promotionsGroupMenuItems,
    },
  ],
  gameLinks: mainNavGameLinkItems,
  support: mainNavSupportItems,
  account: [
    navigationItemRegistry.logout,
  ],
} satisfies {
  home: NavigationItem[];
  groups: NavigationGroup[];
  gameLinks: NavigationItem[];
  support: NavigationItem[];
  account: NavigationItem[];
};

export function navigationValue(item: NavigationItem) {
  return item.value ?? item.href ?? item.label;
}

export function findNavigationGroupLabel(selectedValue?: string) {
  if (!selectedValue) return null;

  const matchingGroup = navigationSections.groups.find((group) =>
    group.items.some((item) => navigationValue(item) === selectedValue)
    || group.comingSoonItems?.some((item) => navigationValue(item) === selectedValue)
  );

  return matchingGroup?.item.label ?? null;
}
