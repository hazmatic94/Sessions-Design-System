import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';
import {
  sampleAvatarActionCode,
  sampleGameMenuDropdownCode,
  sampleJokerLogoCode,
  sampleMobileNavigationCode,
  sampleNotificationActionCode,
  sampleRailNavItemCode,
  sampleRailSearchCode,
  sampleSideRailCode,
  sampleTopRailCode,
  sampleWalletControlCode,
} from './navigationPreviewMarkup.js?v=wallet-icon-v1';

export function renderNavigationPage(page) {
  return `
    ${pageHero(page)}
    ${section('Top Rail', '', topRailExamples(), 'button-example-section navigation-example-section')}
    ${section('Mobile Navigation', '', mobileNavigationExamples(), 'button-example-section navigation-example-section')}
    ${section('Side Rail', '', sideRailExamples(), 'button-example-section navigation-example-section')}
    ${section('Inner Components', '', navigationExamples(), 'button-example-section navigation-example-section')}
  `;
}

function resolveNavigationExampleSize(className, size) {
  if (size) return size;
  if (/(?:^|\s)is-(?:side-rail|mobile-nav)(?:\s|$)/.test(className)) {
    return 'lg';
  }
  if (
    /(?:^|\s)is-(?:top-rail|game-header-rail|game-footer-rail)(?:\s|$)/.test(
      className,
    )
  ) {
    return 'md';
  }
  return 'sm';
}

export function navigationExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = '',
  size,
}) {
  const resolvedSize = resolveNavigationExampleSize(className, size);

  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size: resolvedSize,
    className: `navigation-example${className ? ` ${className}` : ''}`,
    stageClassName: 'navigation-example-stage',
    previewClassName: 'navigation-example-preview',
  });
}

function topRailExamples() {
  return navigationExampleCard({
    id: 'top-rail-example',
    tocTitle: 'Top Rail',
    reactDemo: 'nav-top-rail',
    codeId: 'top-rail-code',
    filename: 'TopRail.tsx',
    code: sampleTopRailCode(),
    className: 'is-top-rail is-wide-stage-inline',
  });
}

function mobileNavigationExamples() {
  return navigationExampleCard({
    id: 'mobile-navigation-example',
    tocTitle: 'Mobile Navigation',
    reactDemo: 'nav-mobile',
    codeId: 'mobile-navigation-code',
    filename: 'MobileNavigation.tsx',
    code: sampleMobileNavigationCode(),
    className: 'is-mobile-nav',
  });
}

function sideRailExamples() {
  return navigationExampleCard({
    id: 'side-rail-example',
    tocTitle: 'Side Rail',
    reactDemo: 'nav-side-rail',
    codeId: 'side-rail-code',
    filename: 'SideRail.tsx',
    code: sampleSideRailCode(),
    className: 'is-side-rail',
  });
}

function navigationExamples() {
  return `
    ${navigationExampleCard({
      id: 'wallet-control-example',
      tocTitle: 'Wallet Control',
      reactDemo: 'nav-wallet-control',
      codeId: 'wallet-control-code',
      filename: 'WalletControl.tsx',
      code: sampleWalletControlCode(),
    })}
    ${navigationExampleCard({
      id: 'notification-action-example',
      tocTitle: 'Notification Action',
      reactDemo: 'nav-notification-action',
      codeId: 'notification-action-code',
      filename: 'NotificationAction.tsx',
      code: sampleNotificationActionCode(),
    })}
    ${navigationExampleCard({
      id: 'avatar-action-example',
      tocTitle: 'Avatar Action',
      reactDemo: 'nav-avatar-action',
      codeId: 'avatar-action-code',
      filename: 'AvatarAction.tsx',
      code: sampleAvatarActionCode(),
    })}
    ${navigationExampleCard({
      id: 'joker-logo-example',
      tocTitle: 'Joker Logo',
      reactDemo: 'nav-joker-logo',
      codeId: 'joker-logo-code',
      filename: 'JokerLogo.tsx',
      code: sampleJokerLogoCode(),
    })}
    ${navigationExampleCard({
      id: 'rail-nav-item-example',
      tocTitle: 'Rail Nav Item',
      reactDemo: 'nav-rail-nav-item',
      codeId: 'rail-nav-item-code',
      filename: 'RailNavItem.tsx',
      code: sampleRailNavItemCode(),
    })}
    ${navigationExampleCard({
      id: 'rail-search-example',
      tocTitle: 'Rail Search',
      reactDemo: 'nav-rail-search',
      codeId: 'rail-search-code',
      filename: 'RailSearch.tsx',
      code: sampleRailSearchCode(),
    })}
    ${navigationExampleCard({
      id: 'game-menu-dropdown-example',
      tocTitle: 'Game Menu Dropdown',
      reactDemo: 'nav-game-menu-dropdown',
      codeId: 'game-menu-dropdown-code',
      filename: 'GameMenuDropdown.tsx',
      code: sampleGameMenuDropdownCode(),
      className: 'is-game-menu-dropdown',
    })}
  `;
}
