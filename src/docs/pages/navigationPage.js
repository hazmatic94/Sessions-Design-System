import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js?v=sessions-docs-cta-v1';
import {renderSessionsAvatar} from '../../components/avatar/index.js?v=sessions-avatar-v2';
import {
  renderMobileMenu,
  renderSessionsLeftRail,
  renderSessionsLogo,
  renderSessionsRailItem,
  renderTopNav,
} from '../../components/navigation/index.js';
import {
  sampleAvatarActionCode,
  sampleGameMenuDropdownCode,
  sampleNotificationActionCode,
  sampleRailNavItemCode,
  sampleRailSearchCode,
  sampleSideRailCode,
  sampleWalletControlCode,
} from './navigationPreviewMarkup.js?v=wallet-icon-v1';

export function renderNavigationPage(page) {
  return `
    ${pageHero(page)}
    ${section('Logo', '', logoExamples(), 'button-example-section navigation-example-section')}
    ${section('Left Nav', '', leftNavExamples(), 'button-example-section navigation-example-section')}
    ${section('Top Nav', '', topNavExamples(), 'button-example-section navigation-example-section')}
    ${section('Avatar', '', avatarExamples(), 'button-example-section navigation-example-section')}
    ${section('Mobile Menu', '', mobileMenuExamples(), 'button-example-section navigation-example-section')}
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

function logoExamples() {
  return navigationExampleCard({
    id: 'sessions-logo-example',
    tocTitle: 'Default Logo',
    preview: renderSessionsLogo(),
    codeId: 'sessions-logo-code',
    filename: 'Logo.tsx',
    code: sampleSessionsLogoCode(),
  });
}

function leftNavExamples() {
  return `
    ${navigationExampleCard({
      id: 'rail-item-default-example',
      tocTitle: 'Default Item',
      preview: renderSessionsRailItem({ icon: 'home' }),
      codeId: 'rail-item-default-code',
      filename: 'RailItem.tsx',
      code: sampleRailItemCode(),
    })}
    ${navigationExampleCard({
      id: 'rail-item-selected-example',
      tocTitle: 'Selected Item',
      preview: renderSessionsRailItem({ icon: 'home', selected: true }),
      codeId: 'rail-item-selected-code',
      filename: 'RailItemSelected.tsx',
      code: sampleSelectedRailItemCode(),
    })}
    ${navigationExampleCard({
      id: 'left-nav-example',
      tocTitle: 'Left Nav',
      preview: renderSessionsLeftRail({ selected: 'home' }),
      codeId: 'left-nav-code',
      filename: 'LeftNav.tsx',
      code: sampleLeftNavCode(),
      className: 'is-left-nav',
    })}
  `;
}

function topNavExamples() {
  return navigationExampleCard({
    id: 'top-nav-example',
    tocTitle: 'Top Nav',
    preview: renderTopNav(),
    codeId: 'top-nav-code',
    filename: 'TopNav.tsx',
    code: sampleTopNavCode(),
    className: 'is-top-nav',
  });
}

function avatarExamples() {
  return navigationExampleCard({
    id: 'avatar-example',
    tocTitle: 'Avatar',
    preview: `
      <div class="sessions-avatar-preview-row">
        ${renderSessionsAvatar({ name: 'Harry' })}
        ${renderSessionsAvatar({
          src: '/assets/user.png?v=sessions-avatar-v1',
          alt: 'Harry',
        })}
      </div>
    `,
    codeId: 'avatar-code',
    filename: 'Avatar.tsx',
    code: sampleAvatarCode(),
  });
}

function mobileMenuExamples() {
  return navigationExampleCard({
    id: 'mobile-menu-example',
    tocTitle: 'Mobile Menu',
    preview: renderMobileMenu(),
    codeId: 'mobile-menu-code',
    filename: 'MobileMenu.tsx',
    code: sampleMobileMenuCode(),
    className: 'is-mobile-menu',
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

function sampleSessionsLogoCode() {
  return `import { Logo } from "@sessions/design-system";

export function NavLogo() {
  return <Logo href="/" ariaLabel="Sessions home" />;
}`;
}

function sampleRailItemCode() {
  return `import { RailItem } from "@sessions/design-system";

export function DefaultRailItem() {
  return <RailItem icon="home" label="Home" />;
}`;
}

function sampleSelectedRailItemCode() {
  return `import { RailItem } from "@sessions/design-system";

export function SelectedRailItem() {
  return <RailItem icon="home" label="Home" selected />;
}`;
}

function sampleLeftNavCode() {
  return `import { LeftNav } from "@sessions/design-system";

export function SessionsLeftNav() {
  return <LeftNav selected="home" />;
}`;
}

function sampleTopNavCode() {
  return `import { TopNav } from "@sessions/design-system";

export function SessionsTopNav() {
  return <TopNav />;
}`;
}

function sampleMobileMenuCode() {
  return `import { MobileMenu } from "@sessions/design-system";

export function SessionsMobileMenu() {
  return <MobileMenu />;
}`;
}

function sampleAvatarCode() {
  return `import { Avatar } from "@sessions/design-system";

export function SessionsAvatarExamples() {
  return (
    <>
      <Avatar name="Harry" />
      <Avatar src="/assets/user.png" alt="Harry" />
    </>
  );
}`;
}
