import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import jokerCoinSrc from "../../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../../BetAmountInput/index.js";
import styles from "./BettingPanelSurface.module.css";
import { PlaceBetFooter } from "./footers/PlaceBetFooter.js";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
export function BettingPanelSurface({ ariaLabel = "Betting panel", betAmount, children, className = "", defaultBetAmount = "", disablePlaceBetUntilBetAmount = true, footer, inGame = false, layout = "desktop", onBetAmountChange, onPlaceBet, submitLabel = "Place Bet", }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const selectedBetAmount = betAmount ?? internalBetAmount;
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
    const betAmountField = (_jsx(BetAmountInput, { className: "live prefix full-width currency joker-bet-field", fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: "0", value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }));
    const resolvedFooter = footer ??
        (_jsx(PlaceBetFooter, { label: submitLabel, onPlaceBet: handlePlaceBet, showPrecursor: showEnterBetPrecursor }));
    const panelFields = (_jsxs("div", { className: cx(styles.fields, "joker-betting-fields"), children: [betAmountField, children && (_jsxs(_Fragment, { children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.gameFields, "joker-betting-game-fields"), children: children })] }))] }));
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, inGame && styles.inGame, "joker-betting-panel joker-betting-panel-surface", isMobileLayout && "is-mobile", inGame && "is-ingame", className);
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": ariaLabel, children: [resolvedFooter, !inGame && _jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.main, "joker-betting-main"), children: panelFields })] }));
    }
    const panelBody = (_jsxs(_Fragment, { children: [betAmountField, children && (_jsxs(_Fragment, { children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.gameFields, "joker-betting-game-fields"), children: children })] }))] }));
    return (_jsxs("aside", { className: rootClassName, "aria-label": ariaLabel, children: [_jsx("div", { className: cx(styles.main, "joker-betting-main"), children: panelBody }), !inGame && (_jsxs("div", { className: cx(styles.actions, "joker-betting-footer-actions"), children: [_jsx("span", { className: cx(styles.divider, "joker-betting-divider"), "aria-hidden": "true" }), resolvedFooter] }))] }));
}
