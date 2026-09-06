import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import { RoundsToWinInput } from "../RoundsToWinInput/index.js";
import styles from "./CoinFlipBettingPanel.module.css";
import type { CoinFlipBettingPanelProps } from "./CoinFlipBettingPanel.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function CoinFlipBettingPanel({
  layout = "desktop",
  betAmount,
  defaultBetAmount = "",
  onBetAmountChange,
  oddsOptions,
  oddsLayout = "stacked",
  showOdds = true,
  selectedOddsValue,
  defaultSelectedOddsValue,
  onOddsValueChange,
  roundsToWinOptions,
  roundsToWinValue,
  defaultRoundsToWinValue,
  onRoundsToWinChange,
  onPlaceBet,
  onCashout,
  inGame = false,
  disablePlaceBetUntilBetAmount = true,
  submitLabel = "Flip Coin",
  flipCoinLabel = "Flip Coin",
  cashoutLabel = "Cashout",
  className = "",
}: CoinFlipBettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const [internalOddsValue, setInternalOddsValue] = useState(defaultSelectedOddsValue ?? (inGame ? "heads" : ""));
  const [internalRoundsToWin, setInternalRoundsToWin] = useState(defaultRoundsToWinValue ?? "");
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const resolvedOddsValue = selectedOddsValue ?? internalOddsValue;
  const selectedRoundsToWin = roundsToWinValue ?? internalRoundsToWin;
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const hasOddsSelection = hasBetAmount && Boolean(resolvedOddsValue.trim());
  const hasRoundsSelection = Boolean(selectedRoundsToWin.trim());
  const isMobileLayout = layout === "mobile";
  const isSubmitReady = inGame
    ? hasOddsSelection && hasRoundsSelection
    : !disablePlaceBetUntilBetAmount || (hasBetAmount && hasOddsSelection && hasRoundsSelection);
  const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;
  const oddsDisabled = !inGame && !hasBetAmount;
  const roundsDisabled = !inGame && !hasBetAmount;

  const handlePlaceBet: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isSubmitReady) {
      return;
    }

    onPlaceBet?.(event);
  };

  const handleCashout: MouseEventHandler<HTMLButtonElement> = (event) => {
    (onCashout ?? onPlaceBet)?.(event);
  };
  const resolvedOddsLayout = isMobileLayout ? "inline" : oddsLayout;
  const resolvedShowOdds = isMobileLayout ? false : showOdds;
  const displayedOddsValue = inGame ? resolvedOddsValue || "heads" : hasBetAmount ? resolvedOddsValue : "";

  const handleBetAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onBetAmountChange?.(event);
  };

  const handleBetAmountValueChange = (nextValue: string) => {
    setInternalBetAmount(nextValue);
    if (!nextValue.trim()) {
      setInternalOddsValue(inGame ? "heads" : "");
      setInternalRoundsToWin("");
    }
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

  const oddsGroup = (
    <OddsButtonGroup
      label={isMobileLayout ? null : undefined}
      options={oddsOptions}
      value={displayedOddsValue}
      onValueChange={(value, option) => {
        setInternalOddsValue(value);
        onOddsValueChange?.(value, option);
      }}
      layout={resolvedOddsLayout}
      showOdds={resolvedShowOdds}
      disabled={oddsDisabled}
      ariaLabel="Coin flip choice"
    />
  );

  const roundsToWinField = (
    <RoundsToWinInput
      options={roundsToWinOptions}
      value={selectedRoundsToWin}
      disabled={roundsDisabled}
      onChange={(value, option) => {
        setInternalRoundsToWin(value);
        onRoundsToWinChange?.(value, option);
      }}
    />
  );

  const submitGroup = inGame ? (
    <div
      className={cx(
        styles.submitGroup,
        styles.inGameSubmitGroup,
        "joker-betting-submit-group joker-coin-flip-betting-ingame-submit",
      )}
    >
      <Button
        variant="cashout"
        fullWidth
        className={cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width")}
        onClick={handleCashout}
      >
        <span className="joker-hi-lo-skip-label">{cashoutLabel}</span>
      </Button>
      <Button
        fullWidth
        className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit")}
        onClick={handlePlaceBet}
      >
        {flipCoinLabel}
      </Button>
    </div>
  ) : (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet")}>
      <Button
        fullWidth
        className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet")}
        onClick={handlePlaceBet}
      >
        {submitLabel}
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  const submitActions = (
    <div className={cx(styles.actions, "joker-coin-flip-betting-actions")}>
      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
      {submitGroup}
    </div>
  );

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    "joker-betting-panel joker-coin-flip-betting-panel",
    isMobileLayout && "is-mobile",
    inGame && "is-ingame",
    className,
  );

  if (isMobileLayout) {
    const mobileFields = (
      <>
        {oddsGroup}
        {roundsToWinField}
      </>
    );

    return (
      <aside className={rootClassName} aria-label="Coin Flip mobile betting panel">
        {submitGroup}

        <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

        <div className={cx(styles.main, "joker-betting-main")}>
          {betAmountField}
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          <div className={cx(styles.fields, "joker-betting-fields")}>{mobileFields}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label="Coin Flip betting panel">
      <div className={cx(styles.main, "joker-betting-main")}>
        <div className={cx(styles.fields, "joker-betting-fields")}>
          {betAmountField}
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          {oddsGroup}
          {roundsToWinField}
        </div>
      </div>

      <span className={cx(styles.submitSpacer, "joker-betting-submit-spacer")} aria-hidden="true" />

      {submitActions}
    </aside>
  );
}
