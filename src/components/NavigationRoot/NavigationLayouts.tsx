import { useEffect, useState } from "react";
import { MenuIcon } from "./NavigationIcons.js";
import { SideRail } from "./SideRail.js";
import { JokerLogo, MobileNavActions, TopRail } from "./TopRail.js";
import type { ResolvedNavigationProps } from "./Navigation.types.js";

export function DesktopNavigation(props: ResolvedNavigationProps) {
  return (
    <div className="joker-navigation joker-navigation--desktop">
      <TopRail balance={props.balance} logoHref={props.logoHref} avatarSrc={props.avatarSrc} />
      <div className="joker-navigation-body">
        <SideRail
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          onNavigate={props.onNavigate}
          openGroup={props.desktopOpenGroup}
          setOpenGroup={props.setDesktopOpenGroup}
        />
        {props.children && <div className="joker-navigation-content">{props.children}</div>}
      </div>
    </div>
  );
}

export function CompactDesktopNavigation(props: ResolvedNavigationProps) {
  return (
    <div className="joker-navigation joker-navigation--compact">
      <TopRail balance={props.balance} logoHref={props.logoHref} avatarSrc={props.avatarSrc} />
      <div className="joker-navigation-body">
        <SideRail
          collapsed
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          onNavigate={props.onNavigate}
          openGroup={props.desktopOpenGroup}
          setOpenGroup={props.setDesktopOpenGroup}
        />
        {props.children && <div className="joker-navigation-content">{props.children}</div>}
      </div>
    </div>
  );
}

function MobileNavigationTopBar({
  open,
  setOpen,
  logoHref,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  logoHref: string;
}) {
  return (
    <header className="joker-mobile-nav-bar joker-mobile-nav-trigger-bar">
      <JokerLogo href={logoHref} />
      <button
        className="joker-mobile-nav-toggle"
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        data-mobile-nav-toggle
        onClick={() => setOpen(!open)}
      >
        <MenuIcon open={open} />
      </button>
    </header>
  );
}

function MobileDrawer({
  open,
  setOpen,
  logoHref,
  avatarSrc,
  selectedValue,
  setSelectedValue,
  onNavigate,
  openGroup,
  setOpenGroup,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  logoHref: string;
  openGroup?: string | null;
  setOpenGroup?: (group: string | null) => void;
} & Pick<ResolvedNavigationProps, "avatarSrc" | "selectedValue" | "setSelectedValue" | "onNavigate">) {
  return (
    <div className={`joker-mobile-nav-panel${open ? " is-open" : ""}`.trim()} aria-hidden={!open}>
      <div className="joker-mobile-nav-panel-inner">
        <header className="joker-mobile-nav-bar joker-mobile-nav-drawer-header">
          <JokerLogo href={logoHref} />
          <button
            className="joker-mobile-nav-toggle joker-mobile-nav-toggle--close"
            type="button"
            aria-expanded={open}
            aria-label="Close menu"
            data-mobile-nav-toggle
            onClick={() => setOpen(false)}
          >
            <MenuIcon open />
          </button>
        </header>
        <MobileNavActions avatarSrc={avatarSrc} />
        <div className="joker-mobile-nav-scroll">
          <SideRail
            mobileDrawer
            selectedValue={selectedValue}
            setSelectedValue={(value, item) => {
              setSelectedValue(value, item);
              setOpen(false);
            }}
            onNavigate={onNavigate}
            openGroup={openGroup}
            setOpenGroup={setOpenGroup}
          />
        </div>
      </div>
    </div>
  );
}

export function MobileNavigation(
  props: ResolvedNavigationProps & { defaultOpen?: boolean; lockBodyScroll?: boolean },
) {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  const lockBodyScroll = props.lockBodyScroll ?? true;

  useEffect(() => {
    if (!open || !lockBodyScroll) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lockBodyScroll, open]);

  return (
    <>
      <nav className={`joker-mobile-nav ${open ? "is-open" : ""}`.trim()} data-mobile-nav>
        <MobileNavigationTopBar open={open} setOpen={setOpen} logoHref={props.logoHref} />
        <button
          type="button"
          className={`joker-mobile-nav-backdrop ${open ? "is-visible" : ""}`.trim()}
          data-mobile-nav-backdrop
          aria-hidden={!open}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <MobileDrawer
          open={open}
          setOpen={setOpen}
          logoHref={props.logoHref}
          avatarSrc={props.avatarSrc}
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          onNavigate={props.onNavigate}
          openGroup={props.desktopOpenGroup}
          setOpenGroup={props.setDesktopOpenGroup}
        />
      </nav>
      {props.children && <div className="joker-navigation-mobile-content">{props.children}</div>}
    </>
  );
}
