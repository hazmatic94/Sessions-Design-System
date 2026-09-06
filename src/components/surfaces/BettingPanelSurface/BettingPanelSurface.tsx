import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import jokerCoinSrc from "../../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../../BetAmountInput/index.js";
import styles from "./BettingPanelSurface.module.css";
import type { BettingPanelSurfaceProps } from "./BettingPanelSurface.types.js";
import { PlaceBetFooter } from "./footers/PlaceBetFooter.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function BettingPanelSurface({
  ariaLabel = "Betting panel",
  betAmount,
  children,
  className = "",
  defaultBetAmount = "",
  disablePlaceBetUntilBetAmount = true,
  footer,
  inGame = false,
  layout = "desktop",
  onBetAmountChange,
  onPlaceBet,
  submitLabel = "Place Bet",
}: BettingPanelSurfaceProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const isMobileLayout = layout === "mobile";
  const canPlaceBet = !disablePlaceBetUntilBetAmount || hasBetAmount;
  const showEnterBetPrecursor = disablePlaceBetUntilBetAmount && !hasBetAmount;

  const handlePlaceBet: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!canPlaceBet) {
      return;
    }

    onPlaceBet?.(event);
  };

  const handleBetAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onBetAmountChange?.(event);
  };

  const handleBetAmountValueChange = (nextValue: string) => {
    setInternalBetAmount(nextValue);
  };

  const betAmountField = (
    <BetAmountInput
      className="live prefix full-width currency joker-bet-field"
      fullWidth
      leftIcon={<CoinIcon />}
      placeholder="0"
      value={selectedBetAmount}
      onChange={handleBetAmountChange}
      onValueChange={handleBetAmountValueChange}
    />
  );

  const resolvedFooter =
    footer ??
    (
      <PlaceBetFooter
        label={submitLabel}
        onPlaceBet={handlePlaceBet}
        showPrecursor={showEnterBetPrecursor}
      />
    );

  const panelFields = (
    <div className={cx(styles.fields, "joker-betting-fields")}>
      {betAmountField}

      {children && (
        <>
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          <div className={cx(styles.gameFields, "joker-betting-game-fields")}>{children}</div>
        </>
      )}
    </div>
  );

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    inGame && styles.inGame,
    "joker-betting-panel joker-betting-panel-surface",
    isMobileLayout && "is-mobile",
    inGame && "is-ingame",
    className,
  );

  if (isMobileLayout) {
    return (
      <aside className={rootClassName} aria-label={ariaLabel}>
        {resolvedFooter}

        {!inGame && <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />}

        <div className={cx(styles.main, "joker-betting-main")}>{panelFields}</div>
      </aside>
    );
  }

  const panelBody = (
    <>
      {betAmountField}

      {children && (
        <>
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          <div className={cx(styles.gameFields, "joker-betting-game-fields")}>{children}</div>
        </>
      )}
    </>
  );

  return (
    <aside className={rootClassName} aria-label={ariaLabel}>
      <div className={cx(styles.main, "joker-betting-main")}>{panelBody}</div>

      {!inGame && (
        <div className={cx(styles.actions, "joker-betting-footer-actions")}>
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          {resolvedFooter}
        </div>
      )}
    </aside>
  );
}
