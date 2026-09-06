import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import { ROULETTE_POCKETS } from "../rouletteWheelLayout";
import { polarToCartesian, ROULETTE_NUMBER_TRACK_INNER_RADIUS, ROULETTE_POCKET_BORDER_COLOR, ROULETTE_POCKET_BORDER_WIDTH, ROULETTE_POCKET_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS, } from "../rouletteWheelPocketGeometry";
const POCKET_WALL_DEPTH = 9;
const WELL_FLOOR_INSET = 4;
function dividerLine(centerX, centerY, angle, innerRadius, outerRadius) {
    return {
        inner: polarToCartesian(centerX, centerY, innerRadius, angle),
        outer: polarToCartesian(centerX, centerY, outerRadius, angle),
    };
}
/** Pocket dividers + inner/outer rings — rendered above the ball track so stroke weight matches. */
export function PocketRingOutline() {
    const { geometry } = useRouletteWheelContext();
    const { x: cx, y: cy } = geometry.center;
    const wellOuter = ROULETTE_NUMBER_TRACK_INNER_RADIUS - WELL_FLOOR_INSET;
    const wellInner = ROULETTE_POCKET_INNER_RADIUS + POCKET_WALL_DEPTH + 2;
    const dividers = ROULETTE_POCKETS.map((pocket) => ({
        key: pocket.index,
        line: dividerLine(cx, cy, pocket.startAngle, ROULETTE_POCKET_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS),
        wellLine: dividerLine(cx, cy, pocket.startAngle, wellInner, wellOuter),
    }));
    return (_jsxs("g", { className: "joker-roulette-wheel__pocket-ring-outline", "aria-hidden": "true", children: [_jsx("circle", { cx: cx, cy: cy, r: ROULETTE_POCKET_OUTER_RADIUS, fill: "none", stroke: ROULETTE_POCKET_BORDER_COLOR, strokeWidth: ROULETTE_POCKET_BORDER_WIDTH, vectorEffect: "non-scaling-stroke" }), _jsx("circle", { cx: cx, cy: cy, r: ROULETTE_POCKET_INNER_RADIUS, fill: "none", stroke: RW.pocketFretShadow, strokeWidth: "2", opacity: "0.35", vectorEffect: "non-scaling-stroke" }), dividers.map(({ key, line, wellLine }) => (_jsxs("g", { children: [_jsx("line", { x1: wellLine.inner.x, y1: wellLine.inner.y, x2: wellLine.outer.x, y2: wellLine.outer.y, stroke: ROULETTE_POCKET_BORDER_COLOR, strokeWidth: "2", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }), _jsx("line", { x1: line.inner.x, y1: line.inner.y, x2: line.outer.x, y2: line.outer.y, stroke: ROULETTE_POCKET_BORDER_COLOR, strokeWidth: ROULETTE_POCKET_BORDER_WIDTH, strokeLinecap: "butt", vectorEffect: "non-scaling-stroke" })] }, `divider-${key}`)))] }));
}
