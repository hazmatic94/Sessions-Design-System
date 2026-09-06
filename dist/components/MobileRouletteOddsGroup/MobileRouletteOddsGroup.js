import { jsx as _jsx } from "react/jsx-runtime";
import { OddsButtonGroup } from '../OddsButtonGroup/index.js';
function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}
export function MobileRouletteOddsGroup({ ariaLabel = 'Roulette bet choice', blackLabel = 'Black', className, defaultValue, disabled = false, greenLabel = 'Green', label = '', onValueChange, options, redLabel = 'Red', value, }) {
    return (_jsx(OddsButtonGroup, { ariaLabel: ariaLabel, className: cx('joker-mobile-roulette-odds-group', className), defaultValue: defaultValue, disabled: disabled, label: label, layout: 'inline', onValueChange: onValueChange, options: options ?? [
            { value: 'red', label: redLabel, sideIcon: 'red' },
            { value: 'black', label: blackLabel, sideIcon: 'black' },
            { value: 'green', label: greenLabel, sideIcon: 'green' },
        ], showDirection: false, showOdds: false, value: value }));
}
