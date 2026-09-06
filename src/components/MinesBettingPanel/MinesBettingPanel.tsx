import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import bombSrc from "../../../assets/bomb.png";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { GoldNuggetsInput } from "../GoldNuggetsInput/index.js";
import { MinesInGameCard } from "../MinesInGameCard/index.js";
import { CashoutFooter } from "../surfaces/BettingPanelSurface/footers/CashoutFooter.js";
import { Select, type SelectOption } from "../Select/index.js";
import styles from "./MinesBettingPanel.module.css";
import type { MinesBettingPanelProps } from "./MinesBettingPanel.types.js";

const minesTileCount = 25;

function formatMinesAmountLabel(count: number) {
  return `${count} ${count === 1 ? "Mine" : "Mines"}`;
}

const dynamiteIcon = <img className="joker-dynamite-icon" src={bombSrc} alt="" />;

const defaultMinesAmountOptions: SelectOption[] = Array.from({ length: minesTileCount - 1 }, (_, index) => {
  const count = index + 1;

  return {
    value: String(count),
    label: (
      <span className="joker-dynamite-value">
        <img className="joker-dynamite-icon" src={bombSrc} alt="" />
        <span>{formatMinesAmountLabel(count)}</span>
      </span>
    ),
  };
});

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

function getGoldNuggets(mines: string) {
  const minesCount = Number.parseInt(mines, 10);

  if (!Number.isFinite(minesCount)) {
    return String(minesTileCount - 1);
  }

  return String(Math.max(0, minesTileCount - minesCount));
}

export function MinesBettingPanel({
  layout = "desktop",
  onPlaceBet,
  onCashout,
  inGame = false,
  cashoutLabel = "Cashout",
  inGameCardProps,
  betAmount,
  defaultBetAmount = "",
  onBetAmountChange,
  disablePlaceBetUntilBetAmount = true,
  minesAmountOptions = defaultMinesAmountOptions,
  minesAmount,
  defaultMinesAmount = "1",
  onMinesAmountChange,
  className = "",
}: MinesBettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const [internalMinesAmount, setInternalMinesAmount] = useState(defaultMinesAmount);
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const selectedMinesAmount = minesAmount ?? internalMinesAmount;
  const goldNuggets = getGoldNuggets(selectedMinesAmount);
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const canPlaceBet = inGame || !disablePlaceBetUntilBetAmount || hasBetAmount;
  const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;

  const handlePlaceBet: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!canPlaceBet) {
      return;
    }

    onPlaceBet?.(event);
  };
  const isMobileLayout = layout === "mobile";

  const handleBetAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onBetAmountChange?.(event);
  };

  const handleBetAmountValueChange = (nextValue: string) => {
    setInternalBetAmount(nextValue);
  };

  const handleMinesAmountChange = (value: string) => {
    setInternalMinesAmount(value);
    onMinesAmountChange?.(value);
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

  const minesFields = (
    <div className={cx(styles.fieldGroup, "joker-mines-betting-field-group")}>
      <Select
        className="joker-bet-field joker-dynamite-input"
        fullWidth
        label="Dynamite"
        leftIcon={dynamiteIcon}
        options={minesAmountOptions}
        value={selectedMinesAmount}
        onChange={handleMinesAmountChange}
        renderValue={(option) => {
          const count = Number.parseInt(option?.value ?? selectedMinesAmount, 10);
          return Number.isFinite(count) ? formatMinesAmountLabel(count) : option?.label;
        }}
      />

      <GoldNuggetsInput className="joker-bet-field" fullWidth label="Gold bars" value={goldNuggets} />
    </div>
  );

  const submitButton = (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet")}>
      <Button fullWidth className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet")} onClick={handlePlaceBet}>
        Place Bet
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  const placeBetActions = (
    <div className={cx(styles.actions, "joker-mines-betting-actions")}>
      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
      {submitButton}
    </div>
  );

  const cashoutButton = (
    <CashoutFooter label={cashoutLabel} onCashout={onCashout ?? onPlaceBet} />
  );

  const inGameCard = <MinesInGameCard {...inGameCardProps} />;

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    inGame && styles.inGame,
    "joker-betting-panel joker-mines-betting-panel",
    isMobileLayout && "is-mobile",
    inGame && "is-ingame",
    className,
  );

  const panelScrim = inGame ? (
    <span className={cx(styles.panelScrim, "joker-mines-betting-ingame-scrim")} aria-hidden="true" />
  ) : null;

  const main = (
    <div className={cx(styles.main, "joker-mines-betting-main")}>
      {isMobileLayout ? (
        <div className={cx(styles.fields, "joker-betting-fields")}>
          {betAmountField}
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          {minesFields}
        </div>
      ) : (
        <>
          {betAmountField}
          <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
          <div className={cx(styles.fields, "joker-betting-fields")}>
            <span
              className={cx(
                styles.mobileFieldDivider,
                styles.divider,
                "joker-betting-divider joker-betting-mobile-field-divider",
              )}
              aria-hidden="true"
            />
            {minesFields}
          </div>
        </>
      )}
    </div>
  );

  if (isMobileLayout) {
    return (
      <aside className={rootClassName} aria-label="Mines mobile betting panel">
        {panelScrim}

        {inGame ? (
          <>
            <div className={cx(styles.inGameLead, "joker-mines-betting-ingame-lead")}>
              {cashoutButton}
              {inGameCard}
            </div>
            {main}
          </>
        ) : (
          <>
            {submitButton}
            <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
            {main}
          </>
        )}
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label="Mines betting panel">
      {panelScrim}

      {main}

      {inGame ? (
        <div className={cx(styles.inGameTrail, "joker-mines-betting-ingame-trail")}>
          {inGameCard}
          {cashoutButton}
        </div>
      ) : (
        placeBetActions
      )}
    </aside>
  );
}
