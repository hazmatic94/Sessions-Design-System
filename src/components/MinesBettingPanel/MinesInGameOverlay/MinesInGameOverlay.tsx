import { CashoutFooter } from "../../surfaces/BettingPanelSurface/footers/CashoutFooter.js";
import styles from "./MinesInGameOverlay.module.css";
import type { MinesInGameOverlayProps } from "./MinesInGameOverlay.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MinesInGameOverlay({
  children,
  cashoutLabel = "Cashout",
  className = "",
  layout = "desktop",
  showCashout = true,
  onCashout,
}: MinesInGameOverlayProps) {
  const isMobileLayout = layout === "mobile";
  const rootClassName = cx(
    styles.root,
    isMobileLayout ? styles.rootMobile : styles.rootDesktop,
    "joker-mines-betting-ingame-actions joker-mines-betting-ingame-overlay-root",
    isMobileLayout
      ? "joker-mines-betting-ingame-actions--mobile"
      : "joker-mines-betting-ingame-actions--desktop",
    className,
  );
  const cashout = showCashout ? (
    <CashoutFooter label={cashoutLabel} onCashout={onCashout} />
  ) : null;
  const stackClassName = cx(styles.stack, "joker-mines-betting-ingame-stack");
  const stack = isMobileLayout ? (
    <div className={stackClassName}>
      {cashout}
      {children}
    </div>
  ) : (
    <div className={stackClassName}>
      <div className={cx(styles.cardSlot, "joker-mines-betting-ingame-overlay")}>{children}</div>
      {cashout}
    </div>
  );

  return (
    <div className={rootClassName}>
      <span className={cx(styles.scrim, "joker-mines-betting-ingame-scrim")} aria-hidden="true" />
      <div className={styles.focus}>{stack}</div>
    </div>
  );
}
