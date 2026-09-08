import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js?v=sessions-page-h2-v1';
import {renderSessionsAvatar} from '../../components/avatar/index.js?v=sessions-avatar-v2';
import {
  renderMobileMenu,
  renderSessionsLeftRail,
  renderSessionsLogo,
  renderSessionsRailItem,
  renderTopNav,
} from '../../components/navigation/index.js?v=sessions-mobile-nav-v1';

export function renderNavigationPage(page) {
  return `
    ${pageHero(page)}
    ${section('Logo', '', logoExamples(), 'button-example-section navigation-example-section')}
    ${section('Left Nav', '', leftNavExamples(), 'button-example-section navigation-example-section')}
    ${section('Top Nav', '', topNavExamples(), 'button-example-section navigation-example-section')}
    ${section('Avatar', '', avatarExamples(), 'button-example-section navigation-example-section')}
    ${section('Mobile Menu', '', mobileMenuExamples(), 'button-example-section navigation-example-section')}
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
