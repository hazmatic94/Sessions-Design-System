import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { getPocketColor, ROULETTE_POCKETS } from "../rouletteWheelLayout";
import { buildAnnularSectorPath, ROULETTE_NUMBER_TRACK_INNER_RADIUS, ROULETTE_POCKET_INNER_RADIUS, ROULETTE_POCKET_NUMBER_FONT_SIZE, ROULETTE_POCKET_OUTER_RADIUS, } from "../rouletteWheelPocketGeometry";
const POCKET_WALL_DEPTH = 9;
const WELL_FLOOR_INSET = 4;
function pocketFill(paintIds, theme, value) {
    const color = getPocketColor(value);
    if (color === "green") {
        return `url(#${paintIds.pocketGreen})`;
    }
    if (color === "red") {
        return `url(#${paintIds.pocketRed})`;
    }
    return `url(#${paintIds.pocketBlack})`;
}
function pocketBandPath(pocket, centerX, centerY, innerRadius, outerRadius) {
    return buildAnnularSectorPath(centerX, centerY, innerRadius, outerRadius, pocket.startAngle, pocket.endAngle);
}
export function PocketRing() {
    const { paintIds, geometry, theme, showDebugVisual } = useRouletteWheelContext();
    const { x: cx, y: cy } = geometry.center;
    const wallOuter = ROULETTE_POCKET_INNER_RADIUS + POCKET_WALL_DEPTH;
    const wellOuter = ROULETTE_NUMBER_TRACK_INNER_RADIUS - WELL_FLOOR_INSET;
    const wellInner = wallOuter + 2;
    return (_jsxs(_Fragment, { children: [_jsx("g", { className: "joker-roulette-wheel__pocket-ring", children: ROULETTE_POCKETS.map((pocket) => (_jsx("path", { d: pocketBandPath(pocket, cx, cy, wellInner, wellOuter), fill: pocketFill(paintIds, theme, pocket.value) }, `pocket-${pocket.index}`))) }), _jsx("g", { className: "joker-roulette-wheel__number-track", "aria-hidden": "true", children: ROULETTE_POCKETS.map((pocket) => (_jsx("path", { d: pocketBandPath(pocket, cx, cy, ROULETTE_NUMBER_TRACK_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS), fill: pocketFill(paintIds, theme, pocket.value) }, `number-track-${pocket.index}`))) }), _jsx("g", { className: "joker-roulette-wheel__pocket-side-walls", "aria-hidden": "true", children: ROULETTE_POCKETS.map((pocket) => (_jsx("path", { d: pocketBandPath(pocket, cx, cy, ROULETTE_POCKET_INNER_RADIUS, wallOuter), fill: `url(#${paintIds.bronzeWall})`, opacity: "0.2" }, `walls-${pocket.index}`))) }), _jsx("g", { className: "joker-roulette-wheel__numbers", children: ROULETTE_POCKETS.map((pocket) => (_jsxs("g", { children: [_jsx("g", { transform: `rotate(${pocket.centerAngle + 90}, ${pocket.labelPosition.x}, ${pocket.labelPosition.y})`, children: _jsx("text", { className: "joker-roulette-wheel__number", "data-pocket-value": pocket.value, x: pocket.labelPosition.x, y: pocket.labelPosition.y, fill: theme.numberFill, fontSize: ROULETTE_POCKET_NUMBER_FONT_SIZE, fontWeight: "700", fontFamily: "var(--font)", letterSpacing: "-0.02em", textAnchor: "middle", dominantBaseline: "central", paintOrder: "stroke fill", stroke: "color-mix(in srgb, var(--joker-black-900) 78%, transparent)", strokeWidth: 0.7, vectorEffect: "non-scaling-stroke", children: pocket.value }) }), showDebugVisual ? (_jsx("text", { x: pocket.labelPosition.x + 14, y: pocket.labelPosition.y - 10, fill: "var(--joker-gold-400)", fontSize: "9", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", textAnchor: "start", dominantBaseline: "central", children: pocket.index })) : null] }, `label-${pocket.index}`))) })] }));
}
