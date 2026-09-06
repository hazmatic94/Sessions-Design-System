import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import rouletteChipBlackSrc from "../../../assets/roulette-chip-black.svg";
import rouletteChipGreenSrc from "../../../assets/roulette-chip-green.svg";
import rouletteChipRedSrc from "../../../assets/roulette-chip-red.svg";
import "../../styles/roulette-chip.css";
const ROULETTE_CHIP_ART = {
    black: rouletteChipBlackSrc,
    green: rouletteChipGreenSrc,
    red: rouletteChipRedSrc,
};
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function RouletteChip({ size, color = "black", children, className, style, ...props }) {
    const chipArtSrc = ROULETTE_CHIP_ART[color];
    const rootStyle = {
        ...(size !== undefined ? { "--roulette-chip-size": `${size}px` } : {}),
        ...style,
    };
    return (_jsxs("div", { ...props, className: cx("joker-roulette-chip", `joker-roulette-chip--${color}`, className), style: rootStyle, "data-color": color, children: [chipArtSrc ? (_jsx("img", { className: "joker-roulette-chip__art", src: chipArtSrc, alt: "", "aria-hidden": "true", draggable: false })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "joker-roulette-chip__disc", "aria-hidden": "true" }), _jsx("span", { className: "joker-roulette-chip__face", "aria-hidden": "true" }), _jsx("span", { className: "joker-roulette-chip__center", "aria-hidden": "true" })] })), children ? _jsx("span", { className: "joker-roulette-chip__content", children: children }) : null] }));
}
