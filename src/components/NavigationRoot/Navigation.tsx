import { useEffect, useMemo, useState } from "react";
import userAvatarSrc from "../../../assets/user.png";
import {
  findNavigationGroupLabel,
  navigationCompactMediaQuery,
  navigationMobileMediaQuery,
} from "./Navigation.data.js";
import { CompactDesktopNavigation, DesktopNavigation, MobileNavigation } from "./NavigationLayouts.js";
import styles from "./Navigation.module.css";
import type { NavigationMode, NavigationProps, ResolvedNavigationProps } from "./Navigation.types.js";

export { NAVIGATION_BREAKPOINTS } from "./Navigation.data.js";

function getNavigationMode() {
  if (typeof window === "undefined" || !window.matchMedia) return "desktop";
  if (window.matchMedia(navigationMobileMediaQuery()).matches) return "mobile";
  if (window.matchMedia(navigationCompactMediaQuery()).matches) return "compact";
  return "desktop";
}

function useNavigationMode() {
  const [mode, setMode] = useState<NavigationMode>(getNavigationMode);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mobileQuery = window.matchMedia(navigationMobileMediaQuery());
    const compactQuery = window.matchMedia(navigationCompactMediaQuery());
    const updateMode = () => setMode(getNavigationMode());

    updateMode();
    mobileQuery.addEventListener("change", updateMode);
    compactQuery.addEventListener("change", updateMode);

    return () => {
      mobileQuery.removeEventListener("change", updateMode);
      compactQuery.removeEventListener("change", updateMode);
    };
  }, []);

  return mode;
}

export function Navigation({
  balance = "150,000",
  logoHref = "#/home",
  avatarSrc = userAvatarSrc,
  children,
  defaultValue,
  value,
  onValueChange,
  onNavigate,
  className = "",
}: NavigationProps) {
  const mode = useNavigationMode();
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(() =>
    findNavigationGroupLabel(value ?? defaultValue) ?? "Originals"
  );
  const selectedValue = value ?? internalValue;

  const resolvedProps = useMemo<ResolvedNavigationProps>(() => ({
    balance,
    logoHref,
    avatarSrc,
    children,
    value,
    onValueChange,
    onNavigate,
    selectedValue,
    setSelectedValue: (nextValue, item) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue, item);
    },
    desktopOpenGroup,
    setDesktopOpenGroup,
  }), [avatarSrc, balance, children, desktopOpenGroup, logoHref, onNavigate, onValueChange, selectedValue, value]);

  const content = mode === "mobile"
    ? <MobileNavigation {...resolvedProps} />
    : mode === "compact"
      ? <CompactDesktopNavigation {...resolvedProps} />
      : <DesktopNavigation {...resolvedProps} />;

  return (
    <div
      className={[styles.root, "joker-navigation-shell", className].filter(Boolean).join(" ")}
      data-navigation-mode={mode}
    >
      {content}
    </div>
  );
}
