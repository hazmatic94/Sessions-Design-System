import {
  comingSoonGameMenuItems,
  gameMenuItems,
  mainNavGameLinkItems,
  mainNavHomeItems,
  mainNavSupportItems,
  navigationItemRegistry,
  withComingSoon,
} from "./navigationData.js";

export const shellBalance = "150,000";

export const shellGameMenuItems = gameMenuItems.map((item, index) => ({
  ...item,
  selected: index === 0,
}));

export const shellComingSoonGameMenuItems = comingSoonGameMenuItems;

export const shellRailSections = {
  home: mainNavHomeItems,
  games: [
    navigationItemRegistry.originals,
    withComingSoon(navigationItemRegistry.casino),
    withComingSoon(navigationItemRegistry.promotions),
    ...mainNavGameLinkItems,
  ],
  support: mainNavSupportItems,
};
