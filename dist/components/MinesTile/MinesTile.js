import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import { playMineClickSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import { minesTileGemPaths, minesTileGemViewBox } from "./minesTileGemPaths";
import styles from "./MinesTile.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function MinesTileIcon({ gradientId, unselected }) {
    if (unselected) {
        return (_jsx("svg", { className: styles.icon, viewBox: minesTileGemViewBox, fill: "none", "aria-hidden": "true", focusable: "false", children: _jsx("g", { children: minesTileGemPaths.map((path) => (_jsx("path", { d: path, fill: "var(--joker-black-300)" }, path))) }) }));
    }
    const paint0 = `${gradientId}-0`;
    const paint1 = `${gradientId}-1`;
    const paint2 = `${gradientId}-2`;
    const paint3 = `${gradientId}-3`;
    const innerShadow = `${gradientId}-inner-shadow`;
    return (_jsxs("svg", { className: styles.icon, viewBox: minesTileGemViewBox, fill: "none", "aria-hidden": "true", focusable: "false", children: [_jsxs("defs", { children: [_jsxs("filter", { id: innerShadow, x: "-20%", y: "-20%", width: "140%", height: "140%", colorInterpolationFilters: "sRGB", children: [_jsx("feOffset", { in: "SourceAlpha", dx: "0", dy: "1.62", result: "offset" }), _jsx("feGaussianBlur", { in: "offset", stdDeviation: "0", result: "blur" }), _jsx("feComposite", { in: "SourceAlpha", in2: "blur", operator: "out", result: "inverse" }), _jsx("feFlood", { floodColor: "var(--mines-tile-icon-inner-shadow-color)", result: "color" }), _jsx("feComposite", { in: "color", in2: "inverse", operator: "in", result: "shadow" }), _jsx("feComposite", { in: "shadow", in2: "SourceGraphic", operator: "over" })] }), [paint0, paint1, paint2, paint3].map((paintId) => (_jsxs("linearGradient", { id: paintId, x1: "16.5323", y1: "45.6977", x2: "16.5323", y2: "5", gradientUnits: "userSpaceOnUse", children: [_jsx("stop", { stopColor: "#444444" }), _jsx("stop", { offset: "1", stopColor: "#3F3F3F" })] }, paintId)))] }), _jsx("g", { filter: `url(#${innerShadow})`, children: [paint0, paint1, paint2, paint3].map((paintId, index) => (_jsx("path", { d: minesTileGemPaths[index], fill: `url(#${paintId})` }, minesTileGemPaths[index]))) })] }));
}
export function MinesTile({ className, selected = true, playClickSound = true, stackIndex, style, onClick, ...props }) {
    const gradientId = useId().replace(/:/g, "");
    const unselected = !selected;
    const handleClick = (event) => {
        if (!unselected && playClickSound) {
            playMineClickSound();
        }
        onClick?.(event);
    };
    return (_jsx("div", { ...props, onClick: handleClick, style: mergeTileStackStyle(stackIndex, style), className: cx(styles.root, "joker-mines-tile", unselected && styles.unselected, unselected && "joker-mines-tile--unselected", className), "aria-hidden": props["aria-hidden"] ?? true, children: _jsx(MinesTileIcon, { gradientId: gradientId, unselected: unselected }) }));
}
