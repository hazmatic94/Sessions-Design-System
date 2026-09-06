import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import styles from "./HiLoBettingPanel.module.css";
import type { HiLoBettingPanelProps } from "./HiLoBettingPanel.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function HiLoBettingPanel({
  layout = "desktop",
  onPlaceBet,
  onLowerSame,
  onHigherSame,
  betAmount,
  defaultBetAmount = "",
  onBetAmountChange,
  lowerLabel = "Lower / Same",
  higherLabel = "Higher / Same",
  lowerOdds = "76.39%",
  higherOdds = "30.76%",
  placeBetLabel = "Place Bet",
  cashoutLabel = "Cashout",
  skipLabel = "Skip Card",
  inGame = false,
  onSkipCard,
  onCashout,
  disablePlaceBetUntilBetAmount = true,
  selectedOddsValue,
  className = "",
}: HiLoBettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const [internalOddsValue, setInternalOddsValue] = useState(inGame ? "lower" : "");
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const isMobileLayout = layout === "mobile";
  const canPlaceBet = !inGame && (!disablePlaceBetUntilBetAmount || hasBetAmount);
  const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;

  const handlePlaceBet: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!canPlaceBet) {
      return;
    }

    onPlaceBet?.(event);
  };

  const handleCashout: MouseEventHandler<HTMLButtonElement> = (event) => {
    (onCashout ?? onPlaceBet)?.(event);
  };
  const oddsDisabled = !inGame && !isMobileLayout && !hasBetAmount;
  const fallbackOddsValue = inGame ? internalOddsValue || "lower" : hasBetAmount ? internalOddsValue : "";
  const displayedOddsValue = selectedOddsValue ?? fallbackOddsValue;
  const submitClassName = inGame
    ? "joker-cta-preview hi-lo-skip cashout full-width"
    : cx("joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet");

  const handleBetAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onBetAmountChange?.(event);
  };

  const handleBetAmountValueChange = (nextValue: string) => {
    setInternalBetAmount(nextValue);
    if (!nextValue.trim()) {
      setInternalOddsValue(inGame ? "lower" : "");
    }
  };

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    "joker-betting-panel joker-hilo-betting-panel",
    isMobileLayout && "is-mobile",
    className,
  );

  const submitGroup = (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet")}>
      <Button
        variant={inGame ? "cashout" : "primary"}
        fullWidth
        className={cx(styles.submit, submitClassName)}
        onClick={inGame ? handleCashout : handlePlaceBet}
      >
        {inGame ? <span className="joker-hi-lo-skip-label">{cashoutLabel}</span> : placeBetLabel}
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  const submitActions = (
    <div className={cx(styles.submitActions, "joker-hilo-betting-submit-actions")}>
      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
      {submitGroup}
    </div>
  );

  const panelFields = (
    <div className={cx(styles.fields, "joker-betting-fields")}>
      <BetAmountInput
        className="live prefix full-width currency joker-bet-field"
        fullWidth
        leftIcon={<CoinIcon />}
        placeholder="0"
        value={selectedBetAmount}
        onChange={handleBetAmountChange}
        onValueChange={handleBetAmountValueChange}
      />

      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

      <OddsButtonGroup
        ariaLabel="HiLo choice"
        layout="stacked"
        showOdds={false}
        showDirection
        value={displayedOddsValue}
        onValueChange={(value) => setInternalOddsValue(value)}
        disabled={oddsDisabled}
        options={[
          { value: "lower", label: lowerLabel, odds: lowerOdds, direction: "down", onClick: onLowerSame },
          { value: "higher", label: higherLabel, odds: higherOdds, direction: "up", onClick: onHigherSame },
        ]}
      />

      {inGame && (
        <Button
          variant="secondary"
          fullWidth
          className="joker-cta-preview secondary full-width"
          onClick={onSkipCard}
        >
          {skipLabel}
        </Button>
      )}
    </div>
  );

  if (isMobileLayout) {
    return (
      <aside className={rootClassName} aria-label="HiLo mobile betting panel">
        {submitGroup}

        <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

        <div className={cx(styles.main, "joker-hilo-betting-main")}>{panelFields}</div>
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label="HiLo betting panel">
      <div className={cx(styles.main, "joker-hilo-betting-main")}>
        {panelFields}
      </div>

      <span className={cx(styles.submitSpacer, "joker-hilo-betting-submit-spacer")} aria-hidden="true" />

      {submitActions}
    </aside>
  );
}
