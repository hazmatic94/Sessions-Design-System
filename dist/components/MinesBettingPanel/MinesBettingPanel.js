import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import bombSrc from "../../../assets/bomb.png";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../BetAmountInput/index.js";
import { Button } from "../Button/index.js";
import { EnterBetPrecursor } from "../EnterBetPrecursor/index.js";
import { GoldNuggetsInput } from "../GoldNuggetsInput/index.js";
import { MinesInGameCard } from "../MinesInGameCard/index.js";
import { CashoutFooter } from "../surfaces/BettingPanelSurface/footers/CashoutFooter.js";
import { Select } from "../Select/index.js";
import styles from "./MinesBettingPanel.module.css";
const minesTileCount = 25;
function formatMinesAmountLabel(count) {
    return `${count} ${count === 1 ? "Mine" : "Mines"}`;
}
const dynamiteIcon = _jsx("img", { className: "joker-dynamite-icon", src: bombSrc, alt: "" });
const defaultMinesAmountOptions = Array.from({ length: minesTileCount - 1 }, (_, index) => {
    const count = index + 1;
    return {
        value: String(count),
        label: (_jsxs("span", { className: "joker-dynamite-value", children: [_jsx("img", { className: "joker-dynamite-icon", src: bombSrc, alt: "" }), _jsx("span", { children: formatMinesAmountLabel(count) })] })),
    };
});
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
function getGoldNuggets(mines) {
    const minesCount = Number.parseInt(mines, 10);
    if (!Number.isFinite(minesCount)) {
        return String(minesTileCount - 1);
    }
    return String(Math.max(0, minesTileCount - minesCount));
}
export function MinesBettingPanel({ layout = "desktop", onPlaceBet, onCashout, inGame = false, cashoutLabel = "Cashout", inGameCardProps, betAmount, defaultBetAmount = "", onBetAmountChange, disablePlaceBetUntilBetAmount = true, minesAmountOptions = defaultMinesAmountOptions, minesAmount, defaultMinesAmount = "1", onMinesAmountChange, className = "", }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const [internalMinesAmount, setInternalMinesAmount] = useState(defaultMinesAmount);
    const selectedBetAmount = betAmount ?? internalBetAmount;
    const selectedMinesAmount = minesAmount ?? internalMinesAmount;
    const goldNuggets = getGoldNuggets(selectedMinesAmount);
    const hasBetAmount = String(selectedBetAmount).trim().length > 0;
    const canPlaceBet = inGame || !disablePlaceBetUntilBetAmount || hasBetAmount;
    const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;
    const handlePlaceBet = (event) => {
        if (!canPlaceBet) {
            return;
        }
        onPlaceBet?.(event);
    };
    const isMobileLayout = layout === "mobile";
    const handleBetAmountChange = (event) => {
        onBetAmountChange?.(event);
    };
    const handleBetAmountValueChange = (nextValue) => {
        setInternalBetAmount(nextValue);
    };
    const handleMinesAmountChange = (value) => {
        setInternalMinesAmount(value);
        onMinesAmountChange?.(value);
    };
    const betAmountField = (_jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }));
    const minesFields = (_jsxs("div", { className: cx(styles.fieldGroup, "joker-mines-betting-field-group"), children: [_jsx(Select, { className: "joker-bet-field joker-dynamite-input", fullWidth: true, label: "Dynamite", leftIcon: dynamiteIcon, options: minesAmountOptions, value: selectedMinesAmount, onChange: handleMinesAmountChange, renderValue: (option) => {
                    const count = Number.parseInt(option?.value ?? selectedMinesAmount, 10);
                    return Number.isFinite(count) ? formatMinesAmountLabel(count) : option?.label;
                } }), _jsx(GoldNuggetsInput, { className: "joker-bet-field", fullWidth: true, label: "Gold bars", value: goldNuggets })] }));
    const submitButton = (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group", showEnterBetPrecursor && "is-pending-bet"), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showEnterBetPrecursor && "is-pending-bet"), onClick: handlePlaceBet, children: "Place Bet" }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    const placeBetActions = (_jsxs("div", { className: cx(styles.actions, "joker-mines-betting-actions"), children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), submitButton] }));
    const cashoutButton = (_jsx(CashoutFooter, { label: cashoutLabel, onCashout: onCashout ?? onPlaceBet }));
    const inGameCard = _jsx(MinesInGameCard, { ...inGameCardProps });
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, inGame && styles.inGame, "joker-betting-panel joker-mines-betting-panel", isMobileLayout && "is-mobile", inGame && "is-ingame", className);
    const panelScrim = inGame ? (_jsx("span", { className: cx(styles.panelScrim, "joker-mines-betting-ingame-scrim"), "aria-hidden": "true" })) : null;
    const main = (_jsx("div", { className: cx(styles.main, "joker-mines-betting-main"), children: isMobileLayout ? (_jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [betAmountField, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), minesFields] })) : (_jsxs(_Fragment, { children: [betAmountField, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [_jsx("span", { className: cx(styles.mobileFieldDivider, styles.divider, "joker-betting-divider joker-betting-mobile-field-divider"), "aria-hidden": "true" }), minesFields] })] })) }));
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": "Mines mobile betting panel", children: [panelScrim, inGame ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: cx(styles.inGameLead, "joker-mines-betting-ingame-lead"), children: [cashoutButton, inGameCard] }), main] })) : (_jsxs(_Fragment, { children: [submitButton, _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), main] }))] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": "Mines betting panel", children: [panelScrim, main, inGame ? (_jsxs("div", { className: cx(styles.inGameTrail, "joker-mines-betting-ingame-trail"), children: [inGameCard, cashoutButton] })) : (placeBetActions)] }));
}
