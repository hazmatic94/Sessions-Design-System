import jokerLogoSrc from "../../../assets/jokerLogo.svg";
import styles from "./ShowroomHeader.module.css";
import type { ShowroomHeaderProps } from "./ShowroomHeader.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LogOutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m16 17 5-5-5-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 12H9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function ShowroomHeader({
  logoAlt = "Joker",
  logoSrc = jokerLogoSrc,
  logoutLabel = "Log out",
  onLogout,
  className,
  ...props
}: ShowroomHeaderProps) {
  return (
    <header {...props} className={cx(styles.header, "joker-showroom-header", className)} aria-label={props["aria-label"] ?? "Showroom header"}>
      <img className={cx(styles.logo, "joker-showroom-header-logo")} src={logoSrc} alt={logoAlt} />
      {onLogout && (
        <button
          className={cx(styles.logout, "joker-showroom-header-logout")}
          type="button"
          onClick={onLogout}
          aria-label={logoutLabel}
        >
          <span className={cx(styles.logoutIcon, "joker-showroom-header-logout-icon")} aria-hidden="true">
            <LogOutIcon />
          </span>
        </button>
      )}
    </header>
  );
}
