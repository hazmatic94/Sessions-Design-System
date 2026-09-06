import styles from "./TeamInfo.module.css";
import type { TeamInfoProps } from "./TeamInfo.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TeamInfo({
  logoSrc,
  logoAlt = "",
  children,
  className,
  ...props
}: TeamInfoProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-team-info", className)}>
      <span className={cx(styles.logoWrap, "joker-team-info__logo-wrap")}>
        <img className={cx(styles.logo, "joker-team-info__logo")} src={logoSrc} alt={logoAlt} />
      </span>
      <span className={cx(styles.name, "joker-team-info__name")}>{children}</span>
    </div>
  );
}
