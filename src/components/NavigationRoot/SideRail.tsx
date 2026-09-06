import { type MouseEvent, useEffect, useRef, useState } from "react";
import { navigationSections, navigationValue } from "./Navigation.data.js";
import { AssetIcon, ChevronIcon } from "./NavigationIcons.js";
import { RailSearch } from "./RailSearch.js";
import type { NavigationGroup, NavigationItem, NavigationProps } from "./Navigation.types.js";

export function RailNavItem({
  item,
  selected,
  className = "",
  onSelect,
  onNavigate,
}: {
  item: NavigationItem;
  selected: boolean;
  className?: string;
  onSelect: (item: NavigationItem) => void;
  onNavigate?: NavigationProps["onNavigate"];
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (item.comingSoon) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    onSelect(item);
    onNavigate?.(item, event);
  };

  return (
    <a
      className={`joker-product-rail-item ${selected ? "is-selected" : ""} ${item.comingSoon ? "is-coming-soon" : ""} ${className}`.trim()}
      href={item.href ?? "#"}
      data-product-rail-item
      data-tooltip={item.label}
      aria-label={item.label}
      aria-current={selected ? "page" : undefined}
      aria-disabled={item.comingSoon || undefined}
      tabIndex={item.comingSoon ? -1 : undefined}
      onClick={handleClick}
    >
      <AssetIcon icon={item.icon} />
      <span className="joker-product-rail-item-label">{item.label}</span>
    </a>
  );
}

export function GameMenuDropdown({
  group,
  selectedValue,
  open,
  onToggle,
  onSelect,
}: {
  group: NavigationGroup;
  selectedValue?: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (item: NavigationItem) => void;
}) {
  const hasSelection = !group.comingSoon && group.items.some((item) => selectedValue === navigationValue(item));
  const comingSoonItems = group.comingSoonItems ?? [];
  const isComingSoon = Boolean(group.comingSoon);

  const renderOption = (item: NavigationItem, comingSoon = false) => {
    const itemValue = navigationValue(item);
    const selected = !comingSoon && selectedValue === itemValue;

    return (
      <button
        key={itemValue}
        className={`joker-product-rail-game-option ${selected ? "is-selected" : ""} ${comingSoon ? "is-coming-soon" : ""}`.trim()}
        type="button"
        role="menuitemradio"
        aria-checked={selected}
        aria-disabled={comingSoon || undefined}
        disabled={comingSoon}
        tabIndex={comingSoon ? -1 : undefined}
        data-game-menu-option
        data-tooltip={item.label}
        aria-label={item.label}
        onClick={comingSoon ? undefined : () => onSelect(item)}
      >
        <span className="joker-product-rail-game-icon" aria-hidden="true">
          <AssetIcon icon={item.icon} />
        </span>
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <div
      className={`joker-product-rail-game-menu ${open && !isComingSoon ? "is-open" : ""} ${hasSelection ? "has-selection" : ""} ${isComingSoon ? "is-coming-soon" : ""}`.trim()}
      data-game-menu
    >
      <button
        className={`joker-product-rail-menu-trigger ${isComingSoon ? "is-coming-soon" : ""}`.trim()}
        type="button"
        aria-expanded={open && !isComingSoon}
        data-game-menu-toggle
        data-tooltip={group.item.label}
        aria-label={group.item.label}
        aria-disabled={isComingSoon || undefined}
        disabled={isComingSoon}
        tabIndex={isComingSoon ? -1 : undefined}
        onClick={isComingSoon ? undefined : onToggle}
      >
        <span className="joker-product-rail-menu-label">
          <span className="joker-product-rail-game-icon" aria-hidden="true">
            <AssetIcon icon={group.item.icon} />
          </span>
          <span>{group.item.label}</span>
        </span>
        <span className="joker-product-rail-menu-chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>
      <div className="joker-product-rail-game-list" role="menu">
        <div className="joker-product-rail-game-list-available">
          {group.items.map((item) => renderOption(item))}
        </div>
        {comingSoonItems.length > 0 && (
          <div className="joker-product-rail-game-list-coming-soon">
            <p className="joker-product-rail-game-list-coming-soon-label">Coming soon</p>
            <div className="joker-product-rail-game-list-coming-soon-items">
              {comingSoonItems.map((item) => renderOption(item, true))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SideRail({
  collapsed = false,
  mobileDrawer = false,
  selectedValue,
  setSelectedValue,
  onNavigate,
  openGroup: controlledOpenGroup,
  setOpenGroup: setControlledOpenGroup,
}: {
  collapsed?: boolean;
  mobileDrawer?: boolean;
  selectedValue?: string;
  setSelectedValue: (value: string, item: NavigationItem) => void;
  onNavigate?: NavigationProps["onNavigate"];
  openGroup?: string | null;
  setOpenGroup?: (group: string | null) => void;
}) {
  const [internalOpenGroup, setInternalOpenGroup] = useState<string | null>("Originals");
  const [searchOpen, setSearchOpen] = useState(false);
  const railRef = useRef<HTMLElement | null>(null);
  const isControlled = typeof setControlledOpenGroup === "function";
  const openGroup = isControlled ? (controlledOpenGroup ?? null) : internalOpenGroup;
  const setOpenGroup = setControlledOpenGroup ?? setInternalOpenGroup;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && railRef.current?.contains(target)) return;
      if (collapsed) setOpenGroup(null);
      setSearchOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (collapsed) setOpenGroup(null);
      setSearchOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [collapsed, setOpenGroup]);

  const selectItem = (item: NavigationItem) => {
    setSelectedValue(navigationValue(item), item);
  };

  const renderItem = (item: NavigationItem, className = "") => (
    <RailNavItem
      key={navigationValue(item)}
      item={item}
      className={className}
      selected={selectedValue === navigationValue(item)}
      onSelect={selectItem}
      onNavigate={onNavigate}
    />
  );

  return (
    <aside ref={railRef} className={`joker-product-rail ${collapsed ? "is-collapsed" : ""} ${mobileDrawer ? "joker-product-rail--mobile-drawer" : ""}`.trim()} aria-label={collapsed ? "Collapsed Joker product navigation" : "Expanded Joker product navigation"}>
      {!mobileDrawer && (
        <div className="joker-product-rail-search">
          <RailSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        </div>
      )}
      <div className="joker-product-rail-scroll">
        <section className="joker-product-rail-section" aria-label="Main navigation">
          {navigationSections.home.map((item) => renderItem(item))}
        </section>
        <section className="joker-product-rail-section" aria-label="Games">
          {navigationSections.groups.map((group) => (
            <GameMenuDropdown
              key={group.item.label}
              group={group}
              selectedValue={selectedValue}
              open={openGroup === group.item.label}
              onToggle={() => {
                if (group.comingSoon) return;
                setOpenGroup(openGroup === group.item.label ? null : group.item.label);
              }}
              onSelect={selectItem}
            />
          ))}
          {navigationSections.gameLinks.map((item) => renderItem(item, "joker-product-rail-item--with-ball"))}
        </section>
        <section className="joker-product-rail-section" aria-label="Support">
          {navigationSections.support.map((item) => renderItem(item))}
        </section>
      </div>
      <div className="joker-product-rail-footer">
        {navigationSections.account.map((item) => renderItem(item, item.tone === "danger" ? "joker-product-rail-logout" : ""))}
      </div>
    </aside>
  );
}
