import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import styles from "./HiLoBettingPanel.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
export function HiLoBettingPanel({ layout = "desktop", onPlaceBet, onLowerSame, onHigherSame, betAmount, defaultBetAmount = "", onBetAmountChange, lowerLabel = "Lower / Same", higherLabel = "Higher / Same", lowerOdds = "76.39%", higherOdds = "30.76%", placeBetLabel = "Place Bet", cashoutLabel = "Cashout", skipLabel = "Skip Card", inGame = false, onSkipCard, onCashout, disablePlaceBetUntilBetAmount = true, selectedOddsValue, className = "", }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const [internalOddsValue, setInternalOddsValue] = useState(inGame ? "lower" : "");
    const selectedBetAmount = betAmount ?? internalBetAmount;
    const hasBetAmount = String(selectedBetAmount).trim().length > 0;
    const isMobileLayout = layout === "mobile";
    const canPlaceBet = !inGame && (!disablePlaceBetUntilBetAmount || hasBetAmount);
    const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;
    const handlePlaceBet = (event) => {
        if (!canPlaceBet) {
            return;
        }
        onPlaceBet?.(event);
    };
    const handleCashout = (event) => {
        (onCashout ?? onPlaceBet)?.(event);
    };
    const oddsDisabled = !inGame && !isMobileLayout && !hasBetAmount;
    const fallbackOddsValue = inGame ? internalOddsValue || "lower" : hasBetAmount ? internalOddsValue : "";
    const displayedOddsValue = selectedOddsValue ?? fallbackOddsValue;
    const submitClassName = inGame
        ? "joker-cta-preview hi-lo-skip cashout full-width"
        : cx("joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet");
    const handleBetAmountChange = (event) => {
        onBetAmountChange?.(event);
    };
    const handleBetAmountValueChange = (nextValue) => {
        setInternalBetAmount(nextValue);
        if (!nextValue.trim()) {
            setInternalOddsValue(inGame ? "lower" : "");
        }
    };
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, "joker-betting-panel joker-hilo-betting-panel", isMobileLayout && "is-mobile", className);
    const submitGroup = (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet"), children: [_jsx(Button, { variant: inGame ? "cashout" : "primary", fullWidth: true, className: cx(styles.submit, submitClassName), onClick: inGame ? handleCashout : handlePlaceBet, children: inGame ? _jsx("span", { className: "joker-hi-lo-skip-label", children: cashoutLabel }) : placeBetLabel }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    const submitActions = (_jsxs("div", { className: cx(styles.submitActions, "joker-hilo-betting-submit-actions"), children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), submitGroup] }));
    const panelFields = (_jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [_jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }), _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx(OddsButtonGroup, { ariaLabel: "HiLo choice", layout: "stacked", showOdds: false, showDirection: true, value: displayedOddsValue, onValueChange: (value) => setInternalOddsValue(value), disabled: oddsDisabled, options: [
                    { value: "lower", label: lowerLabel, odds: lowerOdds, direction: "down", onClick: onLowerSame },
                    { value: "higher", label: higherLabel, odds: higherOdds, direction: "up", onClick: onHigherSame },
                ] }), inGame && (_jsx(Button, { variant: "secondary", fullWidth: true, className: "joker-cta-preview secondary full-width", onClick: onSkipCard, children: skipLabel }))] }));
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": "HiLo mobile betting panel", children: [submitGroup, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.main, "joker-hilo-betting-main"), children: panelFields })] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": "HiLo betting panel", children: [_jsx("div", { className: cx(styles.main, "joker-hilo-betting-main"), children: panelFields }), _jsx("span", { className: cx(styles.submitSpacer, "joker-hilo-betting-submit-spacer"), "aria-hidden": "true" }), submitActions] }));
}
