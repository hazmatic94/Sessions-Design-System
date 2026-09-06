import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import jokerCoinSrc from '../../../assets/jokerCoin.svg';
import { playMineClickSound } from '../../utils/tileSounds.js';
import { BetAmountInput } from '../BetAmountInput/index.js';
import { Button } from '../Button/index.js';
import { EnterBetPrecursor } from '../EnterBetPrecursor/index.js';
import { OddsButtonGroup } from '../OddsButtonGroup/index.js';
import styles from './RouletteBettingPanel.module.css';
function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: '' });
}
const defaultOddsOptions = [
    { value: 'red', label: 'Red', sideIcon: 'red' },
    { value: 'black', label: 'Black', sideIcon: 'black' },
    { value: 'green', label: 'Green', sideIcon: 'green' },
];
export function RouletteBettingPanel({ layout = 'desktop', betAmount, defaultBetAmount = '', onBetAmountChange, oddsOptions, oddsLayout = 'stacked', showOdds = true, selectedOddsValue, defaultSelectedOddsValue, onOddsValueChange, onPlaceBet, onCashout, inGame = false, disablePlaceBetUntilBetAmount = true, submitLabel = 'Spin Wheel', spinWheelLabel = 'Spin Again', cashoutLabel = 'Cashout', className = '', }) {
    const [internalBetAmount, setInternalBetAmount] = useState(String(defaultBetAmount));
    const [internalOddsValue, setInternalOddsValue] = useState(defaultSelectedOddsValue ?? (inGame ? 'red' : ''));
    const selectedBetAmount = betAmount ?? internalBetAmount;
    const resolvedOddsValue = selectedOddsValue ?? internalOddsValue;
    const hasBetAmount = String(selectedBetAmount).trim().length > 0;
    const hasOddsSelection = hasBetAmount && Boolean(resolvedOddsValue.trim());
    const isMobileLayout = layout === 'mobile';
    const isSubmitReady = inGame
        ? hasOddsSelection
        : !disablePlaceBetUntilBetAmount || (hasBetAmount && hasOddsSelection);
    const showEnterBetPrecursor = !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;
    const oddsDisabled = !inGame && !hasBetAmount;
    const handlePlaceBet = event => {
        if (!isSubmitReady) {
            return;
        }
        playMineClickSound();
        onPlaceBet?.(event);
    };
    const handleCashout = event => {
        (onCashout ?? onPlaceBet)?.(event);
    };
    const resolvedOddsOptions = oddsOptions ?? defaultOddsOptions;
    const resolvedOddsLayout = isMobileLayout ? 'stacked' : oddsLayout;
    const displayedOddsValue = inGame
        ? resolvedOddsValue || 'red'
        : hasBetAmount
            ? resolvedOddsValue
            : '';
    const handleBetAmountChange = event => {
        onBetAmountChange?.(event);
    };
    const handleBetAmountValueChange = (nextValue) => {
        setInternalBetAmount(nextValue);
        if (!nextValue.trim()) {
            setInternalOddsValue(inGame ? 'red' : '');
        }
    };
    const betAmountField = (_jsx(BetAmountInput, { className: 'live prefix full-width currency joker-bet-field', fullWidth: true, leftIcon: _jsx(CoinIcon, {}), placeholder: '0', value: selectedBetAmount, onChange: handleBetAmountChange, onValueChange: handleBetAmountValueChange }));
    const oddsGroup = (_jsx(OddsButtonGroup, { label: 'Bet type', options: resolvedOddsOptions, value: displayedOddsValue, onValueChange: (value, option) => {
            setInternalOddsValue(value);
            onOddsValueChange?.(value, option);
        }, layout: oddsLayout, showOdds: false, showDirection: false, disabled: oddsDisabled, ariaLabel: 'Roulette bet choice' }));
    const submitGroup = inGame ? (_jsxs("div", { className: cx(styles.submitGroup, styles.inGameSubmitGroup, 'joker-betting-submit-group joker-roulette-betting-ingame-submit'), children: [_jsx(Button, { variant: 'cashout', fullWidth: true, className: cx(styles.submit, 'joker-cta-preview hi-lo-skip cashout full-width'), onClick: handleCashout, children: _jsx("span", { className: 'joker-hi-lo-skip-label', children: cashoutLabel }) }), _jsx(Button, { fullWidth: true, className: cx(styles.submit, 'joker-cta-preview default full-width joker-bet-submit'), onClick: handlePlaceBet, children: spinWheelLabel })] })) : (_jsxs("div", { className: cx(styles.submitGroup, 'joker-betting-submit-group', showEnterBetPrecursor && 'is-pending-bet'), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, 'joker-cta-preview default full-width joker-bet-submit', showEnterBetPrecursor && 'is-pending-bet'), onClick: handlePlaceBet, children: submitLabel }), showEnterBetPrecursor && _jsx(EnterBetPrecursor, {})] }));
    const submitActions = (_jsxs("div", { className: cx(styles.actions, 'joker-roulette-betting-actions'), children: [_jsx("span", { className: cx(styles.divider, 'joker-betting-divider'), "aria-hidden": 'true' }), submitGroup] }));
    const rootClassName = cx(styles.root, isMobileLayout && styles.mobile, 'joker-betting-panel joker-roulette-betting-panel', isMobileLayout && 'is-mobile', inGame && 'is-ingame', className);
    if (isMobileLayout) {
        return (_jsxs("aside", { className: rootClassName, "aria-label": 'Roulette mobile betting panel', children: [submitGroup, _jsx("span", { className: cx(styles.divider, 'joker-betting-divider'), "aria-hidden": 'true' }), _jsxs("div", { className: cx(styles.main, 'joker-betting-main'), children: [betAmountField, _jsx("span", { className: cx(styles.divider, 'joker-betting-divider'), "aria-hidden": 'true' }), _jsx("div", { className: cx(styles.fields, 'joker-betting-fields'), children: oddsGroup })] })] }));
    }
    return (_jsxs("aside", { className: rootClassName, "aria-label": 'Roulette betting panel', children: [_jsx("div", { className: cx(styles.main, 'joker-betting-main'), children: _jsxs("div", { className: cx(styles.fields, 'joker-betting-fields'), children: [betAmountField, _jsx("span", { className: cx(styles.divider, 'joker-betting-divider'), "aria-hidden": 'true' }), oddsGroup] }) }), _jsx("span", { className: cx(styles.submitSpacer, 'joker-betting-submit-spacer'), "aria-hidden": 'true' }), submitActions] }));
}
