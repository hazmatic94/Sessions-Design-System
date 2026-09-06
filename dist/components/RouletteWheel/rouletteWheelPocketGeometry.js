import { ROULETTE_BALL_TRACK_RADIUS, ROULETTE_WHEEL_CENTER, ROULETTE_OUTER_RADIUS, } from "./rouletteWheelPaths";
import { ROULETTE_BALL_LANDING_RADIUS } from "./rouletteWheelPocketAngles";
/** Shared pivot for pocket geometry, CSS wheel rotation, and ball projection. */
export const ROULETTE_POCKET_CENTER = ROULETTE_WHEEL_CENTER;
/** Inner edge of pocket wedges (just inside track separator). */
export const ROULETTE_POCKET_INNER_RADIUS = ROULETTE_BALL_TRACK_RADIUS + 17;
/** Outer edge of pocket wedges (inside rotation-light ring). */
/** Pocket layout anchor — unchanged when the visual frame expands outward. */
export const ROULETTE_POCKET_OUTER_RADIUS = ROULETTE_OUTER_RADIUS - 28;
/** Expanded static frame (rim + outer ball track) drawn outside the pocket ring. */
export const ROULETTE_FRAME_OUTER_RADIUS = ROULETTE_OUTER_RADIUS + 16;
export const ROULETTE_OUTER_RIM_WIDTH = 22;
export const ROULETTE_OUTER_BALL_TRACK_INNER_RADIUS = ROULETTE_POCKET_OUTER_RADIUS + 2;
export const ROULETTE_OUTER_BALL_TRACK_OUTER_RADIUS = ROULETTE_FRAME_OUTER_RADIUS - ROULETTE_OUTER_RIM_WIDTH - 2;
/** Outer coloured number band (roughly half the pocket span, wells take the rest). */
export const ROULETTE_NUMBER_TRACK_DEPTH = 92;
export const ROULETTE_NUMBER_TRACK_INNER_RADIUS = ROULETTE_POCKET_OUTER_RADIUS - ROULETTE_NUMBER_TRACK_DEPTH;
/** Radial position for number labels — centred in the number track band. */
export const ROULETTE_LABEL_RADIUS = ROULETTE_POCKET_OUTER_RADIUS - ROULETTE_NUMBER_TRACK_DEPTH / 2 + 2;
export const ROULETTE_POCKET_NUMBER_FONT_SIZE = 42;
/** Pocket divider + ring outline stroke. */
export const ROULETTE_POCKET_BORDER_COLOR = "var(--roulette-pocket-divider)";
export const ROULETTE_POCKET_BORDER_WIDTH = 2;
/** Radial position for settled ball in wheel-local coordinates. */
export const ROULETTE_POCKET_BALL_RADIUS = ROULETTE_BALL_LANDING_RADIUS;
export function polarToCartesian(centerX, centerY, radius, angleDeg) {
    const radians = (angleDeg * Math.PI) / 180;
    return {
        x: centerX + Math.cos(radians) * radius,
        y: centerY + Math.sin(radians) * radius,
    };
}
/** Annular sector path between two radii and two angles (degrees, clockwise). */
export function buildAnnularSectorPath(centerX, centerY, innerRadius, outerRadius, startAngleDeg, endAngleDeg) {
    const sweep = ((endAngleDeg - startAngleDeg) % 360 + 360) % 360;
    const largeArc = sweep > 180 ? 1 : 0;
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngleDeg);
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngleDeg);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngleDeg);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngleDeg);
    return [
        `M ${innerStart.x} ${innerStart.y}`,
        `L ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
        "Z",
    ].join(" ");
}
/** Circular arc between two angles (degrees, clockwise). */
export function buildCircularArcPath(centerX, centerY, radius, startAngleDeg, endAngleDeg) {
    const start = polarToCartesian(centerX, centerY, radius, startAngleDeg);
    const end = polarToCartesian(centerX, centerY, radius, endAngleDeg);
    const sweep = ((endAngleDeg - startAngleDeg) % 360 + 360) % 360;
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}
/** Lower-hemisphere annular band (smooth arc, no sector facets). */
export function buildLowerAnnulusBandPath(centerX, centerY, innerRadius, outerRadius, startAngleDeg = 8, endAngleDeg = 172) {
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngleDeg);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngleDeg);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngleDeg);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngleDeg);
    const sweep = ((endAngleDeg - startAngleDeg) % 360 + 360) % 360;
    const largeArc = sweep > 180 ? 1 : 0;
    return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
        "Z",
    ].join(" ");
}
/** Full annulus between two radii (even-odd fill). */
export function buildAnnulusPath(centerX, centerY, innerRadius, outerRadius) {
    return [
        `M ${centerX + outerRadius} ${centerY}`,
        `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX - outerRadius} ${centerY}`,
        `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX + outerRadius} ${centerY}`,
        `M ${centerX + innerRadius} ${centerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX - innerRadius} ${centerY}`,
        `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX + innerRadius} ${centerY}`,
        "Z",
    ].join(" ");
}
/** Rotate a point clockwise around a centre (SVG / CSS rotation). */
export function rotatePointAround(point, center, degrees) {
    const radians = (degrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return {
        x: center.x + cos * dx + sin * dy,
        y: center.y - sin * dx + cos * dy,
    };
}
export function pocketBallStagePosition(ballPosition, wheelRotation, center = ROULETTE_POCKET_CENTER) {
    return rotatePointAround(ballPosition, center, wheelRotation);
}
/** Ball rest position in stage space once the target pocket sits under the pointer. */
export function settledBallStagePosition(pocketBallPosition, pointerAngle, center = ROULETTE_POCKET_CENTER) {
    const dx = pocketBallPosition.x - center.x;
    const dy = pocketBallPosition.y - center.y;
    const radius = Math.hypot(dx, dy);
    return polarToCartesian(center.x, center.y, radius, pointerAngle);
}
