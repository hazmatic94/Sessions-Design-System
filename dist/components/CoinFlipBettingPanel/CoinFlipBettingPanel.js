import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import { RoundsToWinInput } from "../RoundsToWinInput/index.js";
import styles from "./CoinFlipBettingPanel.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
export function CoinFlipBettingPanel({ layout = "desktop", betAmount, defaultBetAmount = "", onBetAmountChange, oddsOptions, oddsLayout = "stacked", showOdds = true, selectedOddsValue, defaultSelectedOddsValue, onOddsValueChange, roundsToWinOptions, roundsToWinValue, defaultRoundsToWinValue, onRoundsToWinChange, onPlaceBet, onCashout, inGame = false, disablePlaceBetUntilBetAmount = true, submitLabel = "Flip Coin", flipCoinLabel = "Flip Coin", cashoutLabel = "Cashout", className = "", }) {
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
    const handlePlaceBet = (event) => {
        if (!isSubmitReady) {
            return;
        }
        onPlaceBet?.(event);
    };
    const handleCashout = (event) => {
        (onCashout ?? onPlaceBet)?.(event);
    };
    const resolvedOddsLayout = isMobileLayout ? "inline" : oddsLayout;
    const resolvedShowOdds = isMobileLayout ? false : showOdds;
    const displayedOddsValue = inGame ? resolvedOddsValue || "heads" : hasBetAmount ? resolvedOddsValue : "";
    const handleBetAmountChange = (event) => {
        onBetAmountChange?.(event);
    };
    const handleBetAmountValueChange = (nextValue) => {
        setInternalBetAmount(nextValue);
        if (!nextValue.trim()) {
            setInternalOddsValue(inGame ? "heads" : "");
            setInternalRoundsToWin("");
        }
    };
    const betAmountField = (_jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }));
    const oddsGroup = (_jsx(OddsButtonGroup, { label: isMobileLayout ? null : undefined, options: oddsOptions, value: displayedOddsValue, onValueChange: (value, option) => {
            setInternalOddsValue(value);
            onOddsValueChange?.(value, option);
        }, layout: resolvedOddsLayout, showOdds: resolvedShowOdds, disabled: oddsDisabled, ariaLabel: "Coin flip choice" }));
    const roundsToWinField = (_jsx(RoundsToWinInput, { options: roundsToWinOptions, value: selectedRoundsToWin, disabled: roundsDisabled, onChange: (value, option) => {
            setInternalRoundsToWin(value);
            onRoundsToWinChange?.(value, option);
        } }));
    const submitGroup = inGame ? (_jsxs("div", { className: cx(styles.submitGroup, styles.inGameSubmitGroup, "joker-betting-submit-group joker-coin-flip-betting-ingame-submit"), children: [_jsx(Button, { variant: "cashout", fullWidth: true, className: cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width"), onClick: handleCashout, children: _jsx("span", { className: "joker-hi-lo-skip-label", children: cashoutLabel }) }), _jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit"), onClick: handlePlaceBet, children: flipCoinLabel })] })) : (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet"), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet"), onClick: handlePlaceBet, children: submitLabel }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    const submitActions = (_jsxs("div", { className: cx(styles.actions, "joker-coin-flip-betting-actions"), children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), submitGroup] }));
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, "joker-betting-panel joker-coin-flip-betting-panel", isMobileLayout && "is-mobile", inGame && "is-ingame", className);
    if (isMobileLayout) {
        const mobileFields = (_jsxs(_Fragment, { children: [oddsGroup, roundsToWinField] }));
        return (_jsxs("aside", { className: rootClassName, "aria-label": "Coin Flip mobile betting panel", children: [submitGroup, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsxs("div", { className: cx(styles.main, "joker-betting-main"), children: [betAmountField, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.fields, "joker-betting-fields"), children: mobileFields })] })] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": "Coin Flip betting panel", children: [_jsx("div", { className: cx(styles.main, "joker-betting-main"), children: _jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [betAmountField, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), oddsGroup, roundsToWinField] }) }), _jsx("span", { className: cx(styles.submitSpacer, "joker-betting-submit-spacer"), "aria-hidden": "true" }), submitActions] }));
}
