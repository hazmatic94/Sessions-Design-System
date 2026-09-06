import { createElement, useState } from "react";
import userAvatarSrc from "../../../../assets/user.png";
import { navigationSections, navigationValue } from "../../../components/NavigationRoot/Navigation.data.ts";
import { MobileNavigation } from "../../../components/NavigationRoot/NavigationLayouts.tsx";
import { RailSearch } from "../../../components/NavigationRoot/RailSearch.tsx";
import {
  GameMenuDropdown,
  RailNavItem,
  SideRail,
} from "../../../components/NavigationRoot/SideRail.tsx";
import {
  AvatarAction,
  JokerLogo,
  NotificationAction,
  TopRail,
  WalletControl,
} from "../../../components/NavigationRoot/TopRail.tsx";
import { navigationItemRegistry } from "../../../data/navigationData.js";

const originalsGroup = navigationSections.groups.find(
  (group) => group.item.label === "Originals",
);

function SideRailVariantDemo() {
  const [selectedValue, setSelectedValue] = useState("mines");
  const railProps = {
    selectedValue,
    setSelectedValue: (value) => setSelectedValue(value),
  };

  return createElement(
    "div",
    { className: "joker-side-rail-variant-set" },
    createElement(
      "div",
      { className: "joker-side-rail-variant" },
      createElement(SideRail, { ...railProps, openGroup: "Originals" }),
    ),
    createElement(
      "div",
      { className: "joker-side-rail-variant" },
      createElement(SideRail, { ...railProps, collapsed: true }),
    ),
  );
}

function MobileNavigationDemo() {
  const [selectedValue, setSelectedValue] = useState(undefined);

  return createElement(
    "div",
    { className: "joker-mobile-nav-demo" },
    createElement(
      "div",
      { className: "joker-mobile-nav-viewport" },
      createElement(MobileNavigation, {
        logoHref: "#/home",
        balance: "150,000",
        avatarSrc: userAvatarSrc,
        defaultOpen: true,
        lockBodyScroll: false,
        selectedValue,
        setSelectedValue: (value) => setSelectedValue(value),
      }),
    ),
  );
}

function GameMenuDropdownDemo() {
  const [value, setValue] = useState("coin-flip");
  const [open, setOpen] = useState(true);

  if (!originalsGroup) {
    return null;
  }

  return createElement(GameMenuDropdown, {
    group: originalsGroup,
    selectedValue: value,
    open,
    onToggle: () => setOpen((current) => !current),
    onSelect: (item) => setValue(navigationValue(item)),
  });
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const NAVIGATION_REACT_DEMOS = {
  "nav-top-rail": () =>
    createElement(TopRail, {
      balance: "150,000",
      logoHref: "#/home",
      avatarSrc: userAvatarSrc,
    }),
  "nav-mobile": () => createElement(MobileNavigationDemo),
  "nav-side-rail": () => createElement(SideRailVariantDemo),
  "nav-wallet-control": () =>
    createElement(WalletControl, { balance: "150,000" }),
  "nav-notification-action": () => createElement(NotificationAction),
  "nav-avatar-action": () =>
    createElement(AvatarAction, { avatarSrc: userAvatarSrc }),
  "nav-joker-logo": () => createElement(JokerLogo, { href: "#/home" }),
  "nav-rail-nav-item": () =>
    createElement(
      "div",
      { className: "joker-rail-nav-state-demo", "aria-label": "Rail nav item states" },
      createElement(RailNavItem, {
        item: navigationItemRegistry.favourites,
        selected: true,
        className: "joker-rail-nav-item",
        onSelect: () => {},
      }),
    ),
  "nav-rail-search": () => createElement(RailSearch),
  "nav-game-menu-dropdown": () =>
    createElement(
      "div",
      { className: "joker-rail-nav-state-demo" },
      createElement(GameMenuDropdownDemo),
    ),
};
