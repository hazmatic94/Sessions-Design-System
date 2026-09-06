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
} from '../../data/navigationData.js?v=fc-plus-nav-v2';
import {navigationIconSvg} from '../../data/navigationSvgIcons.js?v=wallet-icon-v1';
import {lucideIcon} from '../../utils/lucideIcon.js?v=nav-outline-v1';

export function gameMenuPreviewItems(items, {selectedValue} = {}) {
  return items.map(item => ({
    ...item,
    selected: selectedValue != null && item.value === selectedValue,
  }));
}

function walletControlPreview() {
  return `
    <div class="joker-wallet-control" aria-label="Wallet balance">
      <div class="joker-wallet-balance">
        <img class="joker-wallet-coin" src="./assets/jokerCoin.svg?v=nav" alt="" />
        <span>150,000</span>
      </div>
      <button class="joker-wallet-action" type="button" aria-label="Open wallet">
        ${navigationIconSvg('wallet')}
      </button>
    </div>
  `;
}

function notificationActionPreview() {
  return `
    <button class="joker-action-item" type="button" aria-label="Notifications">
      ${navItemIcon(navigationItemRegistry.notifications.icon, 'joker-action-icon')}
      <span class="joker-action-badge" aria-hidden="true"></span>
    </button>
  `;
}

function avatarActionPreview() {
  return `
    <button class="joker-avatar-item" type="button" aria-label="Open profile">
      <img src="./assets/user.png?v=nav" alt="" />
      <span class="joker-avatar-status" aria-hidden="true"></span>
    </button>
  `;
}

function walletActionPreview() {
  return `
    <button class="joker-wallet-action" type="button" aria-label="Open wallet">
      ${navigationIconSvg('wallet')}
    </button>
  `;
}

function mobileNavActionsPreview() {
  return `
    <section class="joker-mobile-nav-section joker-mobile-nav-actions" aria-label="Wallet and account">
      <div class="joker-mobile-nav-actions-row">
        ${walletActionPreview()}
        ${notificationActionPreview()}
        ${avatarActionPreview().replace('class="joker-avatar-item"', 'class="joker-avatar-item joker-mobile-avatar-item"')}
      </div>
    </section>
  `;
}

function jokerLogoPreview() {
  return `
    <a class="joker-logo-component" href="#/home" aria-label="Joker OS home">
      <img src="./assets/jokerLogo.svg?v=nav" alt="Joker OS" />
    </a>
  `;
}

function railNavItemPreview() {
  const item = navigationItemRegistry.favourites;

  return `
    <div class="joker-rail-nav-state-demo" aria-label="Rail nav item states">
      <a
        class="joker-rail-nav-item"
        href="#"
        data-rail-nav-demo-item
        data-tooltip="${item.label}"
        aria-label="${item.label}"
      >
        ${navItemIcon(item.icon)}
        <span class="joker-product-rail-item-label">${item.label}</span>
      </a>
    </div>
  `;
}

function railSearchPreview() {
  return `
    <label class="joker-rail-search-item is-coming-soon" aria-label="Search navigation" data-tooltip="Search" aria-disabled="true">
      ${lucideIcon('search-filled')}
      <input type="search" placeholder="Search" disabled readonly tabindex="-1" />
    </label>
  `;
}

function gameMenuDropdownPreview() {
  const games = gameMenuPreviewItems(gameMenuItems, {
    selectedValue: 'coin-flip',
  });
  const comingSoonGames = gameMenuPreviewItems(comingSoonGameMenuItems);

  return `
    <div class="joker-game-menu is-open has-selection" data-game-menu>
      <button class="joker-game-menu-trigger" type="button" aria-expanded="true" data-game-menu-toggle>
        <span class="joker-game-menu-label">
          ${navItemIcon(navigationItemRegistry.originals.icon, 'joker-game-menu-trigger-icon')}
          <span>${navigationItemRegistry.originals.label}</span>
        </span>
        <span class="joker-game-menu-chevron" aria-hidden="true">${lucideIcon('chevron-down')}</span>
      </button>
      <div class="joker-game-menu-list" role="menu">
        ${gameMenuListSectionsPreview(games, comingSoonGames, {
          optionClassName: 'joker-game-menu-option',
          iconClassName: 'joker-game-menu-option-icon',
        })}
      </div>
    </div>
  `;
}

export function sideRailPreview() {
  return productRailPreview({label: 'Joker product navigation'});
}

function sideRailVariantPreview() {
  const expandedRail = productRailPreview({
    label: 'Expanded Joker product navigation',
    originalsOpen: true,
  });
  const collapsedRail = productRailPreview({
    label: 'Collapsed Joker product navigation',
    collapsed: true,
    originalsOpen: false,
  });

  return `
    <div class="joker-side-rail-variant-set">
      <div class="joker-side-rail-variant">
        ${expandedRail}
      </div>
      <div class="joker-side-rail-variant">
        ${collapsedRail}
      </div>
    </div>
  `;
}

function productRailPreview({
  label = 'Joker product navigation',
  collapsed = false,
  originalsOpen = !collapsed,
} = {}) {
  const originalGames = gameMenuPreviewItems(gameMenuItems, {
    selectedValue: label === 'Joker product navigation' ? 'mines' : undefined,
  });
  const originalComingSoonGames = gameMenuPreviewItems(comingSoonGameMenuItems);

  return `
    <aside class="joker-product-rail${collapsed ? ' is-collapsed' : ''}" aria-label="${label}">
      <div class="joker-product-rail-search">
        ${railSearchPreview()}
      </div>
      <div class="joker-product-rail-scroll">
        <section class="joker-product-rail-section" aria-label="Main navigation">
          ${mainNavHomeItems.map(item => productRailItem(item)).join('')}
        </section>
        <section class="joker-product-rail-section" aria-label="Games">
          ${productRailGameMenu(navigationItemRegistry.originals, originalGames, {comingSoonGames: originalComingSoonGames, isOpen: originalsOpen})}
          ${productRailGameMenu(withComingSoon(navigationItemRegistry.casino), [], {comingSoonGames: gameMenuPreviewItems(casinoGroupMenuItems), comingSoon: true})}
          ${productRailGameMenu(withComingSoon(navigationItemRegistry.promotions), [], {comingSoonGames: gameMenuPreviewItems(promotionsGroupMenuItems), comingSoon: true})}
          ${mainNavGameLinkItems.map(item => productRailItem(item, 'joker-product-rail-item--with-ball')).join('')}
        </section>
        <section class="joker-product-rail-section" aria-label="Support">
          ${mainNavSupportItems.map(item => productRailItem(item)).join('')}
        </section>
      </div>
      <div class="joker-product-rail-footer">
        ${productRailItem(navigationItemRegistry.logout, 'joker-product-rail-logout')}
      </div>
    </aside>
  `;
}

export function mobileNavigationPreview({open = false} = {}) {
  const originalGames = gameMenuPreviewItems(gameMenuItems);
  const originalComingSoonGames = gameMenuPreviewItems(comingSoonGameMenuItems);

  return `
    <div class="joker-mobile-nav-demo">
      <div class="joker-mobile-nav-viewport">
        <div class="joker-mobile-nav${open ? ' is-open' : ''}" data-mobile-nav>
          <header class="joker-mobile-nav-bar joker-mobile-nav-trigger-bar">
            ${jokerLogoPreview()}
            <button class="joker-mobile-nav-toggle" type="button" aria-expanded="${open ? 'true' : 'false'}" aria-label="Toggle menu" data-mobile-nav-toggle>
              <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--menu">${lucideIcon('menu')}</span>
              <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--close">${lucideIcon('x')}</span>
            </button>
          </header>
          <button type="button" class="joker-mobile-nav-backdrop${open ? ' is-visible' : ''}" data-mobile-nav-backdrop aria-hidden="${open ? 'false' : 'true'}" tabindex="${open ? '0' : '-1'}"></button>
          <div class="joker-mobile-nav-panel${open ? ' is-open' : ''}" aria-hidden="${open ? 'false' : 'true'}">
          <div class="joker-mobile-nav-panel-inner">
            <header class="joker-mobile-nav-bar joker-mobile-nav-drawer-header">
              ${jokerLogoPreview()}
              <button class="joker-mobile-nav-toggle joker-mobile-nav-toggle--close" type="button" aria-expanded="${open ? 'true' : 'false'}" aria-label="Close menu" data-mobile-nav-toggle>
                <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--menu">${lucideIcon('menu')}</span>
                <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--close">${lucideIcon('x')}</span>
              </button>
            </header>
            ${mobileNavActionsPreview()}
          <div class="joker-mobile-nav-scroll">
            <section class="joker-mobile-nav-section" aria-label="Main navigation">
              ${mainNavHomeItems.map(item => productRailItem(item)).join('')}
            </section>
            <section class="joker-mobile-nav-section" aria-label="Games">
              ${productRailGameMenu(navigationItemRegistry.originals, originalGames, {comingSoonGames: originalComingSoonGames, isOpen: true})}
              ${productRailGameMenu(withComingSoon(navigationItemRegistry.casino), [], {comingSoonGames: gameMenuPreviewItems(casinoGroupMenuItems), comingSoon: true})}
              ${productRailGameMenu(withComingSoon(navigationItemRegistry.promotions), [], {comingSoonGames: gameMenuPreviewItems(promotionsGroupMenuItems), comingSoon: true})}
              ${mainNavGameLinkItems.map(item => productRailItem(item, 'joker-product-rail-item--with-ball')).join('')}
            </section>
            <section class="joker-mobile-nav-section" aria-label="Support">
              ${mainNavSupportItems.map(item => productRailItem(item)).join('')}
            </section>
          </div>
          <section class="joker-mobile-nav-section joker-mobile-nav-footer" aria-label="Session">
            ${productRailItem(navigationItemRegistry.logout, 'joker-product-rail-logout')}
          </section>
        </div>
        </div>
      </div>
      </div>
    </div>
  `;
}

function mobileAvatarPreview() {
  return avatarActionPreview().replace(
    'class="joker-avatar-item"',
    'class="joker-avatar-item joker-mobile-avatar-item"',
  );
}

function productRailItem(item, className = '', options = {}) {
  const comingSoon = options.comingSoon ?? item.comingSoon;
  const selectedClass = options.selected ? ' is-selected' : '';
  const comingSoonClass = comingSoon ? ' is-coming-soon' : '';
  const liveAttribute = options.live ? ' data-rail-nav-live' : '';
  const disabledAttributes = comingSoon
    ? ' aria-disabled="true" tabindex="-1"'
    : '';

  return `
    <a class="joker-product-rail-item${selectedClass}${comingSoonClass}${className ? ` ${className}` : ''}" href="#/components/navigation" data-product-rail-item${liveAttribute} data-tooltip="${item.label}" aria-label="${item.label}"${options.selected ? ' aria-current="page"' : ''}${disabledAttributes}>
      ${navItemIcon(item.icon)}
      <span class="joker-product-rail-item-label">${item.label}</span>
    </a>
  `;
}

function gameMenuOptionPreview(
  item,
  {
    selected = false,
    comingSoon = false,
    className = 'joker-product-rail-game-option',
    iconClassName = 'joker-product-rail-game-icon',
  } = {},
) {
  const selectedClass = selected ? ' is-selected' : '';
  const comingSoonClass = comingSoon ? ' is-coming-soon' : '';
  const disabledAttributes = comingSoon
    ? ' disabled aria-disabled="true" tabindex="-1"'
    : '';

  return `
    <button class="${className}${selectedClass}${comingSoonClass}" type="button" role="menuitemradio" aria-checked="${selected ? 'true' : 'false'}" data-game-menu-option data-tooltip="${item.label}" aria-label="${item.label}"${disabledAttributes}>
      <span class="${iconClassName}" aria-hidden="true">${navItemIcon(item.icon)}</span>
      <span>${item.label}</span>
    </button>
  `;
}

function gameMenuListSectionsPreview(
  games,
  comingSoonGames = [],
  {
    optionClassName = 'joker-product-rail-game-option',
    iconClassName = 'joker-product-rail-game-icon',
  } = {},
) {
  const optionOptions = {className: optionClassName, iconClassName};
  const availableMarkup = games
    .map(game =>
      gameMenuOptionPreview(game, {...optionOptions, selected: game.selected}),
    )
    .join('');
  const comingSoonMarkup = comingSoonGames.length
    ? `
      <div class="joker-product-rail-game-list-coming-soon">
        <p class="joker-product-rail-game-list-coming-soon-label">Coming soon</p>
        <div class="joker-product-rail-game-list-coming-soon-items">
          ${comingSoonGames
            .map(game =>
              gameMenuOptionPreview(game, {...optionOptions, comingSoon: true}),
            )
            .join('')}
        </div>
      </div>
    `
    : '';

  return `
    <div class="joker-product-rail-game-list-available">
      ${availableMarkup}
    </div>
    ${comingSoonMarkup}
  `;
}

function productRailGameMenu(item, games, options = {}) {
  const {
    comingSoonGames = [],
    isOpen = false,
    comingSoon = item.comingSoon,
  } = options;
  const hasSelection = !comingSoon && games.some(game => game.selected);
  const comingSoonClass = comingSoon ? ' is-coming-soon' : '';
  const disabledTrigger = comingSoon
    ? ' disabled aria-disabled="true" tabindex="-1"'
    : '';

  return `
    <div class="joker-product-rail-game-menu${isOpen && !comingSoon ? ' is-open' : ''}${hasSelection ? ' has-selection' : ''}${comingSoonClass}" data-game-menu>
      <button class="joker-product-rail-menu-trigger${comingSoonClass}" type="button" aria-expanded="${isOpen && !comingSoon ? 'true' : 'false'}" data-game-menu-toggle data-tooltip="${item.label}" aria-label="${item.label}"${disabledTrigger}>
        <span class="joker-product-rail-menu-label">
          <span class="joker-product-rail-game-icon" aria-hidden="true">${navItemIcon(item.icon)}</span>
          <span>${item.label}</span>
        </span>
        <span class="joker-product-rail-menu-chevron" aria-hidden="true">${lucideIcon('chevron-down')}</span>
      </button>
      <div class="joker-product-rail-game-list" role="menu">
        ${gameMenuListSectionsPreview(games, comingSoonGames)}
      </div>
    </div>
  `;
}

export function topRailPreview() {
  return `
    <header class="joker-top-rail-demo" aria-label="Joker top rail">
      <div class="joker-top-rail-lane joker-top-rail-lane--left">
        ${jokerLogoPreview()}
      </div>
      <div class="joker-top-rail-lane joker-top-rail-lane--center">
        ${walletControlPreview()}
      </div>
      <div class="joker-top-rail-lane joker-top-rail-lane--right">
        <div class="joker-top-rail-actions">
          ${notificationActionPreview()}
          ${avatarActionPreview()}
        </div>
      </div>
    </header>
  `;
}

function topNavigationPreview() {
  return `
    <nav class="joker-nav-preview joker-nav-preview--top" aria-label="Product navigation preview">
      <a class="joker-nav-brand" href="#/home" aria-label="Joker OS home">
        <span class="joker-nav-brand-mark">J</span>
        <span>Joker OS</span>
      </a>
      <div class="joker-nav-links" aria-label="Primary">
        <a href="#/templates/dashboard">Dashboard</a>
        <a class="is-active" href="#/patterns/wallet">Wallet</a>
        <a href="#/patterns/rewards">Rewards</a>
      </div>
      <a class="joker-cta-preview secondary joker-nav-action" href="#/templates/deposit">
        <span>Deposit</span>
      </a>
    </nav>
  `;
}

function sideNavigationPreview() {
  const items = [
    ['layout-dashboard', 'Dashboard'],
    ['wallet', 'Wallet'],
    ['receipt-text', 'Transactions'],
    ['gift', 'Rewards'],
  ];

  return `
    <nav class="joker-nav-preview joker-nav-preview--side" aria-label="Side navigation preview">
      <div class="joker-nav-section-label">Workspace</div>
      <div class="joker-nav-menu">
        ${items
          .map(
            ([icon, label]) => `
          <a class="${label === 'Wallet' ? 'is-active' : ''}" href="#/patterns/${label.toLowerCase()}">
            ${navigationIconSvg(icon) || lucideIcon(icon)}
            <span>${label}</span>
          </a>
        `,
          )
          .join('')}
      </div>
    </nav>
  `;
}
export function sampleWalletControlCode() {
  return `import { WalletControl } from "@joker/design-system";

export function Example() {
  return (
    <WalletControl
      balance="150,000"
      coinIcon="/icons/jokerCoin.svg"
      onWalletClick={() => {}}
    />
  );
}`;
}

export function sampleNotificationActionCode() {
  return `import { NotificationAction } from "@joker/design-system";

export function Example() {
  return <NotificationAction />;
}`;
}

export function sampleAvatarActionCode() {
  return `import { AvatarAction } from "@joker/design-system";

export function Example() {
  return (
    <AvatarAction
      avatarSrc="/avatars/user.png"
      label="Open profile"
    />
  );
}`;
}

export function sampleJokerLogoCode() {
  return `import { JokerLogo } from "@joker/design-system";

export function Example() {
  return (
    <JokerLogo
      href="/"
      ariaLabel="Joker OS home"
    />
  );
}`;
}

export function sampleRailNavItemCode() {
  return `import { useState } from "react";
import { RailNavItem } from "@joker/design-system";

export function Example() {
  const [activeHref, setActiveHref] = useState("/favourites");

  return (
    <nav aria-label="Primary">
      <RailNavItem
        icon="favourites"
        label="Favourites"
        href="/favourites"
        selected={activeHref === "/favourites"}
        onClick={() => setActiveHref("/favourites")}
      />
    </nav>
  );
}`;
}

export function sampleRailSearchCode() {
  return `import { RailSearch } from "@joker/design-system";

export function Example() {
  return (
    <RailSearch
      placeholder="Search"
      value={value}
      onChange={setValue}
    />
  );
}`;
}

export function sampleGameMenuDropdownCode() {
  return `import { GameMenuDropdown } from "@joker/design-system";

const games = [
  { value: "coin-flip", label: "Coin Flip", icon: "coin-flip" },
  { value: "mines", label: "Mines", icon: "mines" },
  { value: "hilo", label: "Hilo", icon: "hilo" },
  { value: "roulette", label: "Roulette", icon: "roulette" },
];

const comingSoonGames = [
  { value: "crash", label: "Crash", icon: "crash" },
  { value: "coco-hut", label: "CocoHut", icon: "coco-hut" },
];

export function Example() {
  return (
    <GameMenuDropdown
      label="Originals"
      items={games}
      comingSoonItems={comingSoonGames}
      value="coin-flip"
      onValueChange={setGame}
    />
  );
}`;
}

export function sampleSideRailCode() {
  return `import {
  RailSearch,
  RailNavItem,
  GameMenuDropdown,
} from "@joker/design-system";

const originals = [
  { value: "coin-flip", label: "Coin Flip", icon: "coin-flip" },
  { value: "mines", label: "Mines", icon: "mines" },
  { value: "hilo", label: "Hilo", icon: "hi-lo" },
  { value: "roulette", label: "Roulette", icon: "roulette" },
];

const originalsComingSoon = [
  { value: "crash", label: "Crash", icon: "crash" },
  { value: "coco-hut", label: "CocoHut", icon: "coco-hut" },
];

export function SideRail({ collapsed = false }) {
  return (
    <aside
      className={["joker-product-rail", collapsed && "is-collapsed"].filter(Boolean).join(" ")}
      aria-label="Product navigation"
    >
      <section className="joker-side-rail__section">
        <RailSearch placeholder="Search" />
      </section>

      <div className="joker-side-rail__scroll">
        <section className="joker-side-rail__section">
          <RailNavItem icon="home" label="Home" />
          <RailNavItem icon="favourites" label="Favourites" />
          <RailNavItem icon="recently-played" label="Recently Played" />
          <RailNavItem icon="new-releases" label="New Releases" />
        </section>

        <section className="joker-side-rail__section">
          <GameMenuDropdown
            label="Originals"
            items={originals}
            comingSoonItems={originalsComingSoon}
            value="mines"
          />
          <GameMenuDropdown label="Casino" items={[]} />
          <GameMenuDropdown label="Promotions" items={[]} />
          <RailNavItem icon="soccer" label="FCPlus" />
        </section>

        <section className="joker-side-rail__section">
          <RailNavItem icon="live-support" label="Live Support" />
          <RailNavItem icon="rewards" label="Rewards" />
        </section>
      </div>

      <section className="joker-side-rail__section joker-side-rail__footer">
        <RailNavItem icon="log-out" label="Log Out" tone="danger" />
      </section>
    </aside>
  );
}`;
}

export function sampleTopRailCode() {
  return `import {
  AvatarAction,
  JokerLogo,
  NotificationAction,
  TopRail,
  WalletControl,
} from "@joker/design-system";

export function Example() {
  return (
    <TopRail>
      <JokerLogo href="/" ariaLabel="Joker OS home" />
      <WalletControl balance="150,000" />
      <NotificationAction />
      <AvatarAction avatarSrc="/avatars/user.png" />
    </TopRail>
  );
}`;
}

export function sampleMobileNavigationCode() {
  return `import { MobileNavigation } from "@joker/design-system";

export function Example() {
  return (
    <MobileNavigation
      logoHref="/"
      balance="150,000"
      searchPlaceholder="Search"
      sections={[
        {
          label: "Main",
          items: [
            { label: "Home", icon: "home", href: "/" },
            { label: "Favourites", icon: "favourites", href: "/favourites" },
            { label: "Recently Played", icon: "recently-played", href: "/recent" },
            { label: "New Releases", icon: "new-releases", href: "/new" },
          ],
        },
        {
          label: "Games",
          items: [
            {
              label: "Originals",
              icon: "originals",
              children: [
                { label: "Crash", icon: "crash", href: "/games/crash" },
                { label: "Coin Flip", icon: "coin-flip", href: "/games/coin-flip" },
                { label: "Mines", icon: "mines", href: "/games/mines" },
              ],
            },
          ],
        },
      ]}
      avatarSrc="/avatars/user.png"
      logout={{ label: "Log Out", href: "/logout" }}
    />
  );
}`;
}

export function sampleTopNavigationCode() {
  return `import { TopNavigation } from "@joker/design-system";

export function Example() {
  return (
    <TopNavigation
      brand="Joker OS"
      activeItem="Wallet"
      items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Wallet", href: "/wallet" },
        { label: "Rewards", href: "/rewards" },
      ]}
      action={{ label: "Deposit", href: "/deposit" }}
    />
  );
}`;
}

export function sampleSideNavigationCode() {
  return `import { SideNavigation } from "@joker/design-system";

export function Example() {
  return (
    <SideNavigation
      label="Workspace"
      activeItem="Wallet"
      items={[
        { label: "Dashboard", icon: "layout-dashboard", href: "/dashboard" },
        { label: "Wallet", icon: "wallet", href: "/wallet" },
        { label: "Transactions", icon: "receipt-text", href: "/transactions" },
        { label: "Rewards", icon: "gift", href: "/rewards" },
      ]}
    />
  );
}`;
}
export function navItemIcon(name, className = '') {
  const svg = navigationIconSvg(name, className);

  if (!svg) {
    return `<span class="system-icon nav-custom-icon-missing${className ? ` ${className}` : ''}" aria-hidden="true"></span>`;
  }

  if (
    className.includes('joker-action-icon') ||
    className.includes('joker-game-header-game-icon') ||
    className.includes('joker-game-header-fair-play-icon') ||
    className.includes('joker-game-menu')
  ) {
    return svg;
  }

  return `<span class="nav-inline-icon-host" aria-hidden="true">${svg}</span>`;
}
