import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import jokerLogoSrc from "../../../assets/jokerLogo.svg";
import { navigationItemRegistry } from "../../data/navigationData.js";
import { AssetIcon, WalletIcon } from "./NavigationIcons.js";
import type { ResolvedNavigationProps } from "./Navigation.types.js";

export function JokerLogo({ href }: { href: string }) {
  return (
    <a className="joker-logo-component" href={href} aria-label="Joker OS home">
      <img src={jokerLogoSrc} alt="Joker OS" />
    </a>
  );
}

export function WalletControl({ balance }: { balance: string }) {
  return (
    <div className="joker-wallet-control" aria-label="Wallet balance">
      <div className="joker-wallet-balance">
        <img className="joker-wallet-coin" src={jokerCoinSrc} alt="" />
        <span>{balance}</span>
      </div>
      <button className="joker-wallet-action" type="button" aria-label="Open wallet">
        <WalletIcon />
      </button>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  badge,
  className = "",
  comingSoon = false,
}: {
  icon: string;
  label: string;
  badge?: boolean;
  className?: string;
  comingSoon?: boolean;
}) {
  return (
    <button
      className={`joker-action-item ${comingSoon ? "is-coming-soon" : ""} ${className}`.trim()}
      type="button"
      aria-label={label}
      aria-disabled={comingSoon || undefined}
      disabled={comingSoon}
      tabIndex={comingSoon ? -1 : undefined}
    >
      <AssetIcon icon={icon} className="joker-action-icon" />
      {badge && <span className="joker-action-badge" aria-hidden="true" />}
    </button>
  );
}

export function WalletAction({ className = "" }: { className?: string }) {
  return (
    <button className={`joker-wallet-action ${className}`.trim()} type="button" aria-label="Open wallet">
      <WalletIcon />
    </button>
  );
}

export function NotificationAction({ className = "" }: { className?: string }) {
  return (
    <ActionButton
      icon={navigationItemRegistry.notifications.icon}
      label={navigationItemRegistry.notifications.label}
      badge
      className={className}
    />
  );
}

export function AvatarAction({
  avatarSrc,
  className = "",
  label = "Open profile",
}: {
  avatarSrc: string;
  className?: string;
  label?: string;
}) {
  return (
    <button className={`joker-avatar-item ${className}`.trim()} type="button" aria-label={label}>
      <img src={avatarSrc} alt="" />
      <span className="joker-avatar-status" aria-hidden="true" />
    </button>
  );
}

export function MobileNavActions({ avatarSrc }: Pick<ResolvedNavigationProps, "avatarSrc">) {
  return (
    <section className="joker-mobile-nav-section joker-mobile-nav-actions" aria-label="Wallet and account">
      <div className="joker-mobile-nav-actions-row">
        <WalletAction />
        <NotificationAction />
        <AvatarAction avatarSrc={avatarSrc} className="joker-mobile-avatar-item" />
      </div>
    </section>
  );
}

export function TopRail({ balance, logoHref, avatarSrc }: Pick<ResolvedNavigationProps, "balance" | "logoHref" | "avatarSrc">) {
  return (
    <header className="joker-top-rail-demo" aria-label="Joker top rail">
      <div className="joker-top-rail-lane joker-top-rail-lane--left">
        <JokerLogo href={logoHref} />
      </div>
      <div className="joker-top-rail-lane joker-top-rail-lane--center">
        <WalletControl balance={balance} />
      </div>
      <div className="joker-top-rail-lane joker-top-rail-lane--right">
        <div className="joker-top-rail-actions">
          <NotificationAction />
          <AvatarAction avatarSrc={avatarSrc} />
        </div>
      </div>
    </header>
  );
}
