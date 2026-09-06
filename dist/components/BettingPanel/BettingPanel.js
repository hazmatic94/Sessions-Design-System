import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { MultiplierInput } from "../MultiplierInput/index.js";
import { NumberOfBetsInput } from "../NumberOfBetsInput/index.js";
import styles from "./BettingPanel.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
export function BettingPanel({ layout = "desktop", mode = "manual", onModeChange, onPlaceBet, betAmount, defaultBetAmount = "", onBetAmountChange, disablePlaceBetUntilBetAmount = true, numberOfBets, defaultNumberOfBets, onNumberOfBetsChange, className = "", }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const [internalNumberOfBets, setInternalNumberOfBets] = useState(String(defaultNumberOfBets ?? ""));
    const selectedBetAmount = betAmount ?? internalBetAmount;
    const selectedNumberOfBets = numberOfBets ?? internalNumberOfBets;
    const hasBetAmount = String(selectedBetAmount).trim().length > 0;
    const hasNumberOfBets = String(selectedNumberOfBets).trim().length > 0;
    const isMobileLayout = layout === "mobile";
    const canPlaceBet = !disablePlaceBetUntilBetAmount || (hasBetAmount && (mode !== "auto" || hasNumberOfBets));
    const showEnterBetPrecursor = disablePlaceBetUntilBetAmount && !hasBetAmount;
    const handlePlaceBet = (event) => {
        if (!canPlaceBet) {
            return;
        }
        onPlaceBet?.(event);
    };
    const handleBetAmountChange = (event) => {
        onBetAmountChange?.(event);
    };
    const handleBetAmountValueChange = (nextValue) => {
        setInternalBetAmount(nextValue);
    };
    const handleNumberOfBetsChange = (event) => {
        setInternalNumberOfBets(event.currentTarget.value);
        onNumberOfBetsChange?.(event);
    };
    const modeSwitch = (_jsx("div", { className: cx(styles.modeSwitch, "joker-bet-mode-switch"), role: "group", "aria-label": "Bet mode", children: ["manual", "auto"].map((nextMode) => (_jsx(Button, { variant: "secondary", fullWidth: true, selected: mode === nextMode, className: cx(styles.modeButton, "joker-cta-preview secondary full-width joker-bet-mode", mode === nextMode && "is-selected"), "aria-pressed": mode === nextMode, onClick: () => onModeChange?.(nextMode), children: _jsx("span", { children: nextMode === "manual" ? "Manual" : "Auto" }) }, nextMode))) }));
    const betAmountField = (_jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }));
    const playFields = (_jsxs("div", { className: cx(styles.fieldGroup, "joker-betting-field-group"), children: [_jsx(MultiplierInput, { className: "live joker-bet-field", defaultValue: 2, label: "Cash out at", step: 0.1 }), mode === "auto" && (_jsx(NumberOfBetsInput, { className: "joker-bet-field", fullWidth: true, label: "Number of bets", placeholder: "0", value: selectedNumberOfBets, onChange: handleNumberOfBetsChange }))] }));
    const submitGroup = (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet"), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet"), onClick: handlePlaceBet, children: mode === "auto" ? "Auto Bet" : "Place Bet" }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, "joker-betting-panel", isMobileLayout && "is-mobile", className);
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": "Betting panel", children: [submitGroup, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: styles.main, children: _jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [betAmountField, playFields, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), modeSwitch] }) })] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": "Betting panel", children: [_jsxs("div", { className: styles.main, children: [modeSwitch, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [_jsx("span", { className: cx(styles.mobileFieldDivider, styles.divider, "joker-betting-divider joker-betting-mobile-field-divider"), "aria-hidden": "true" }), betAmountField, playFields] })] }), _jsx("span", { className: cx(styles.submitSpacer, "joker-betting-submit-spacer"), "aria-hidden": "true" }), _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), submitGroup] }));
}
