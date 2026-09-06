import { ODDS_SELECT_GLOW_MS } from "../../components/OddsButtonGroup/oddsSelectGlow.js?v=betting-panel-states";

export function parseMultiplierValue(value) {
  const parsed = Number.parseFloat(String(value).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.round(parsed * 10) / 10);
}

export function formatMultiplierValue(value) {
  const rounded = Math.max(1, Math.round(value * 10) / 10);
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}x`;
}

export function parseBetAmountValue(value) {
  const parsed = Number.parseFloat(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatBetAmountValue(value) {
  const rounded = Math.max(0, Math.round(value * 1_000_000) / 1_000_000);
  return String(rounded);
}

export function flashOddsButtonGlow(button) {
  if (!button) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  button.classList.remove("is-select-glow");
  void button.offsetWidth;
  button.classList.add("is-select-glow");
  window.setTimeout(() => {
    button.classList.remove("is-select-glow");
  }, ODDS_SELECT_GLOW_MS);
}

export function updateBetPanelSubmit(panel) {
  const betAmount = panel?.querySelector("[data-bet-amount-input]");
  const numberOfBets = panel?.querySelector("[data-number-of-bets-input]");
  const needsNumberOfBets = panel?.dataset.betMode === "auto";
  const hasBetAmount = Boolean(betAmount?.value.trim());
  const hasNumberOfBets = Boolean(numberOfBets?.value.trim());
  const isCoinFlipPanel = panel?.classList.contains("joker-coin-flip-betting-panel");
  const isRoulettePanel = panel?.classList.contains("joker-roulette-betting-panel");
  const isChoicePanel = isCoinFlipPanel || isRoulettePanel;
  const hasOddsChoice = Boolean(
    panel?.querySelector("[data-bet-choice].is-selected, [data-bet-choice][aria-pressed='true']"),
  );
  const hasRoundsChoice = Boolean(
    panel?.querySelector(".joker-rounds-to-win-option.is-selected, .joker-rounds-to-win-option[aria-checked='true']"),
  );
  const isDisabled = isCoinFlipPanel
    ? !hasBetAmount || !hasOddsChoice || !hasRoundsChoice
    : isRoulettePanel
      ? !hasBetAmount || !hasOddsChoice
      : !hasBetAmount || (needsNumberOfBets && !hasNumberOfBets);
  const betAmountField = betAmount?.closest(".joker-input-field");
  if (betAmountField) {
    betAmountField.classList.toggle("is-selected", hasBetAmount);
  }
  const isPendingBet = !hasBetAmount;
  const submitButtons = panel?.querySelectorAll("[data-bet-submit]") ?? [];
  submitButtons.forEach((submit) => {
    submit.classList.toggle("is-pending-bet", isPendingBet);
    // Keep the gold CTA visible at 60% opacity until a bet amount is entered.
    submit.disabled = hasBetAmount ? isDisabled : false;
    submit.setAttribute("aria-disabled", String(isDisabled));
  });
  const submitGroup = submitButtons[0]?.closest(".joker-betting-submit-group");
  if (submitGroup) submitGroup.classList.toggle("is-pending-bet", isPendingBet);
  const precursor = panel?.querySelector(".joker-enter-bet-precursor");
  if (precursor) precursor.hidden = hasBetAmount;
  panel?.querySelectorAll("[data-bet-choice]").forEach((choice) => {
    choice.disabled = !hasBetAmount;
    if (!hasBetAmount) {
      choice.classList.remove("is-selected");
      choice.setAttribute("aria-pressed", "false");
    }
  });
  panel?.querySelectorAll("[data-rounds-to-win-option]").forEach((option) => {
    if (!isCoinFlipPanel) return;
    option.disabled = !hasBetAmount;
    if (!hasBetAmount) {
      option.classList.remove("is-selected");
      option.setAttribute("aria-checked", "false");
    }
  });
  const roundsToWinField = panel?.querySelector(".joker-rounds-to-win-field");
  if (roundsToWinField && isCoinFlipPanel) {
    roundsToWinField.classList.toggle("disabled", !hasBetAmount);
    roundsToWinField.querySelector(".joker-rounds-to-win-options")?.setAttribute(
      "aria-disabled",
      String(!hasBetAmount),
    );
  }
}
