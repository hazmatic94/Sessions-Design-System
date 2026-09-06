import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { MultiplierInput } from "../MultiplierInput/index.js";
import { NumberOfBetsInput } from "../NumberOfBetsInput/index.js";
import styles from "./BettingPanel.module.css";
import type { BettingPanelMode, BettingPanelProps } from "./BettingPanel.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function BettingPanel({
  layout = "desktop",
  mode = "manual",
  onModeChange,
  onPlaceBet,
  betAmount,
  defaultBetAmount = "",
  onBetAmountChange,
  disablePlaceBetUntilBetAmount = true,
  numberOfBets,
  defaultNumberOfBets,
  onNumberOfBetsChange,
  className = "",
}: BettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const [internalNumberOfBets, setInternalNumberOfBets] = useState(String(defaultNumberOfBets ?? ""));
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const selectedNumberOfBets = numberOfBets ?? internalNumberOfBets;
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const hasNumberOfBets = String(selectedNumberOfBets).trim().length > 0;
  const isMobileLayout = layout === "mobile";
  const canPlaceBet = !disablePlaceBetUntilBetAmount || (hasBetAmount && (mode !== "auto" || hasNumberOfBets));
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

  const handleNumberOfBetsChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInternalNumberOfBets(event.currentTarget.value);
    onNumberOfBetsChange?.(event);
  };

  const modeSwitch = (
    <div className={cx(styles.modeSwitch, "joker-bet-mode-switch")} role="group" aria-label="Bet mode">
      {(["manual", "auto"] as const).map((nextMode: BettingPanelMode) => (
        <Button
          key={nextMode}
          variant="secondary"
          fullWidth
          selected={mode === nextMode}
          className={cx(
            styles.modeButton,
            "joker-cta-preview secondary full-width joker-bet-mode",
            mode === nextMode && "is-selected",
          )}
          aria-pressed={mode === nextMode}
          onClick={() => onModeChange?.(nextMode)}
        >
          <span>{nextMode === "manual" ? "Manual" : "Auto"}</span>
        </Button>
      ))}
    </div>
  );

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

  const playFields = (
    <div className={cx(styles.fieldGroup, "joker-betting-field-group")}>
      <MultiplierInput className="live joker-bet-field" defaultValue={2} label="Cash out at" step={0.1} />

      {mode === "auto" && (
        <NumberOfBetsInput
          className="joker-bet-field"
          fullWidth
          label="Number of bets"
          placeholder="0"
          value={selectedNumberOfBets}
          onChange={handleNumberOfBetsChange}
        />
      )}
    </div>
  );

  const submitGroup = (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet")}>
      <Button fullWidth className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet")} onClick={handlePlaceBet}>
        {mode === "auto" ? "Auto Bet" : "Place Bet"}
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    "joker-betting-panel",
    isMobileLayout && "is-mobile",
    className,
  );

  if (isMobileLayout) {
    return (
      <aside className={rootClassName} aria-label="Betting panel">
        {submitGroup}

        <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

        <div className={styles.main}>
          <div className={cx(styles.fields, "joker-betting-fields")}>
            {betAmountField}
            {playFields}
            <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
            {modeSwitch}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label="Betting panel">
      <div className={styles.main}>
        {modeSwitch}

        <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

        <div className={cx(styles.fields, "joker-betting-fields")}>
          <span className={cx(styles.mobileFieldDivider, styles.divider, "joker-betting-divider joker-betting-mobile-field-divider")} aria-hidden="true" />

          {betAmountField}
          {playFields}
        </div>
      </div>

      <span className={cx(styles.submitSpacer, "joker-betting-submit-spacer")} aria-hidden="true" />
      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

      {submitGroup}
    </aside>
  );
}
