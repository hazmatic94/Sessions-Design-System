import type { ChangeEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { Select, type SelectOption } from "../Select/index.js";
import styles from "./CocoHutBettingPanel.module.css";
import type { CocoHutBettingPanelProps, CocoHutDifficulty } from "./CocoHutBettingPanel.types.js";

const defaultDifficultyOptions: SelectOption[] = [
  { value: "tourist", label: "Tourist" },
  { value: "local", label: "Local" },
  { value: "hunter", label: "Hunter" },
  { value: "degenerate", label: "Degenerate" },
];

const basketSizeByDifficulty: Record<CocoHutDifficulty, string> = {
  tourist: "Large",
  local: "Medium",
  hunter: "Small",
  degenerate: "Extra Small",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

function getBasketSize(difficulty: string) {
  return basketSizeByDifficulty[difficulty as CocoHutDifficulty] ?? basketSizeByDifficulty.tourist;
}

export function CocoHutBettingPanel({
  layout = "desktop",
  onPlaceBet,
  betAmount,
  defaultBetAmount = "",
  onBetAmountChange,
  disablePlaceBetUntilBetAmount = true,
  difficultyOptions = defaultDifficultyOptions,
  difficulty,
  defaultDifficulty = "tourist",
  onDifficultyChange,
  className = "",
}: CocoHutBettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
  const [internalDifficulty, setInternalDifficulty] = useState<CocoHutDifficulty>(defaultDifficulty);
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const selectedDifficulty = difficulty ?? internalDifficulty;
  const basketSize = getBasketSize(selectedDifficulty);
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

  const handleDifficultyChange = (value: string) => {
    const nextDifficulty = value as CocoHutDifficulty;

    setInternalDifficulty(nextDifficulty);
    onDifficultyChange?.(nextDifficulty);
  };

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    "joker-betting-panel joker-coco-hut-betting-panel",
    isMobileLayout && "is-mobile",
    className,
  );

  const panelFields = (
    <div className={cx(styles.fields, "joker-betting-fields")}>
      <span className={cx(styles.mobileFieldDivider, styles.divider, "joker-betting-divider joker-betting-mobile-field-divider")} aria-hidden="true" />

      <BetAmountInput
        className="live prefix full-width currency joker-bet-field"
        fullWidth
        leftIcon={<CoinIcon />}
        placeholder="0"
        value={selectedBetAmount}
        onChange={handleBetAmountChange}
        onValueChange={handleBetAmountValueChange}
      />

      <div className={cx(styles.fieldGroup, "joker-coco-hut-betting-field-group")}>
        <Select
          className="joker-bet-field"
          fullWidth
          label="Difficulty"
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        />

        <div className={cx(styles.readonlyField, "joker-input-field joker-basket-input joker-bet-field full-width")}>
          <span className="joker-input-label">Basket</span>
          <span className={cx(styles.readonlyControl, "joker-input-control")} role="status">
            <span className={styles.readonlyValue}>{basketSize}</span>
          </span>
        </div>
      </div>
    </div>
  );

  const submitGroup = (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet")}>
      <Button fullWidth className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet")} onClick={handlePlaceBet}>
        Place Bet
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  if (isMobileLayout) {
    return (
      <aside className={rootClassName} aria-label="CocoHut mobile betting panel">
        {submitGroup}

        <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />

        <div className={cx(styles.main, "joker-coco-hut-betting-main")}>{panelFields}</div>
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label="CocoHut betting panel">
      <div className={cx(styles.main, "joker-coco-hut-betting-main")}>
        {panelFields}
      </div>

      <span className={cx(styles.submitSpacer, "joker-coco-hut-betting-submit-spacer")} aria-hidden="true" />

      <span className={cx(styles.divider, "joker-betting-divider")} aria-hidden="true" />
      {submitGroup}
    </aside>
  );
}
