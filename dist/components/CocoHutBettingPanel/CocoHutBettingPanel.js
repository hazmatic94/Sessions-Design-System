import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { Select } from "../Select/index.js";
import styles from "./CocoHutBettingPanel.module.css";
const defaultDifficultyOptions = [
    { value: "tourist", label: "Tourist" },
    { value: "local", label: "Local" },
    { value: "hunter", label: "Hunter" },
    { value: "degenerate", label: "Degenerate" },
];
const basketSizeByDifficulty = {
    tourist: "Large",
    local: "Medium",
    hunter: "Small",
    degenerate: "Extra Small",
};
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
function getBasketSize(difficulty) {
    return basketSizeByDifficulty[difficulty] ?? basketSizeByDifficulty.tourist;
}
export function CocoHutBettingPanel({ layout = "desktop", onPlaceBet, betAmount, defaultBetAmount = "", onBetAmountChange, disablePlaceBetUntilBetAmount = true, difficultyOptions = defaultDifficultyOptions, difficulty, defaultDifficulty = "tourist", onDifficultyChange, className = "", }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const [internalDifficulty, setInternalDifficulty] = useState(defaultDifficulty);
    const selectedBetAmount = betAmount ?? internalBetAmount;
    const selectedDifficulty = difficulty ?? internalDifficulty;
    const basketSize = getBasketSize(selectedDifficulty);
    const hasBetAmount = String(selectedBetAmount).trim().length > 0;
    const isMobileLayout = layout === "mobile";
    const canPlaceBet = !disablePlaceBetUntilBetAmount || hasBetAmount;
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
    const handleDifficultyChange = (value) => {
        const nextDifficulty = value;
        setInternalDifficulty(nextDifficulty);
        onDifficultyChange?.(nextDifficulty);
    };
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, "joker-betting-panel joker-coco-hut-betting-panel", isMobileLayout && "is-mobile", className);
    const panelFields = (_jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [_jsx("span", { className: cx(styles.mobileFieldDivider, styles.divider, "joker-betting-divider joker-betting-mobile-field-divider"), "aria-hidden": "true" }), _jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }), _jsxs("div", { className: cx(styles.fieldGroup, "joker-coco-hut-betting-field-group"), children: [_jsx(Select, { className: "joker-bet-field", fullWidth: true, label: "Difficulty", options: difficultyOptions, value: selectedDifficulty, onChange: handleDifficultyChange }), _jsxs("div", { className: cx(styles.readonlyField, "joker-input-field joker-basket-input joker-bet-field full-width"), children: [_jsx("span", { className: "joker-input-label", children: "Basket" }), _jsx("span", { className: cx(styles.readonlyControl, "joker-input-control"), role: "status", children: _jsx("span", { className: styles.readonlyValue, children: basketSize }) })] })] })] }));
    const submitGroup = (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet"), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet"), onClick: handlePlaceBet, children: "Place Bet" }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": "CocoHut mobile betting panel", children: [submitGroup, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.main, "joker-coco-hut-betting-main"), children: panelFields })] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": "CocoHut betting panel", children: [_jsx("div", { className: cx(styles.main, "joker-coco-hut-betting-main"), children: panelFields }), _jsx("span", { className: cx(styles.submitSpacer, "joker-coco-hut-betting-submit-spacer"), "aria-hidden": "true" }), _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), submitGroup] }));
}
