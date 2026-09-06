export type RoulettePoint = {
    x: number;
    y: number;
};
/** Shared pivot for pocket geometry, CSS wheel rotation, and ball projection. */
export declare const ROULETTE_POCKET_CENTER: {
    readonly x: 557.611;
    readonly y: 595.611;
};
/** Inner edge of pocket wedges (just inside track separator). */
export declare const ROULETTE_POCKET_INNER_RADIUS: number;
/** Outer edge of pocket wedges (inside rotation-light ring). */
/** Pocket layout anchor — unchanged when the visual frame expands outward. */
export declare const ROULETTE_POCKET_OUTER_RADIUS: number;
/** Expanded static frame (rim + outer ball track) drawn outside the pocket ring. */
export declare const ROULETTE_FRAME_OUTER_RADIUS: number;
export declare const ROULETTE_OUTER_RIM_WIDTH = 22;
export declare const ROULETTE_OUTER_BALL_TRACK_INNER_RADIUS: number;
export declare const ROULETTE_OUTER_BALL_TRACK_OUTER_RADIUS: number;
/** Outer coloured number band (roughly half the pocket span, wells take the rest). */
export declare const ROULETTE_NUMBER_TRACK_DEPTH = 92;
export declare const ROULETTE_NUMBER_TRACK_INNER_RADIUS: number;
/** Radial position for number labels — centred in the number track band. */
export declare const ROULETTE_LABEL_RADIUS: number;
export declare const ROULETTE_POCKET_NUMBER_FONT_SIZE = 42;
/** Pocket divider + ring outline stroke. */
export declare const ROULETTE_POCKET_BORDER_COLOR = "var(--roulette-pocket-divider)";
export declare const ROULETTE_POCKET_BORDER_WIDTH = 2;
/** Radial position for settled ball in wheel-local coordinates. */
export declare const ROULETTE_POCKET_BALL_RADIUS = 375.328;
export declare function polarToCartesian(centerX: number, centerY: number, radius: number, angleDeg: number): RoulettePoint;
/** Annular sector path between two radii and two angles (degrees, clockwise). */
export declare function buildAnnularSectorPath(centerX: number, centerY: number, innerRadius: number, outerRadius: number, startAngleDeg: number, endAngleDeg: number): string;
/** Circular arc between two angles (degrees, clockwise). */
export declare function buildCircularArcPath(centerX: number, centerY: number, radius: number, startAngleDeg: number, endAngleDeg: number): string;
/** Lower-hemisphere annular band (smooth arc, no sector facets). */
export declare function buildLowerAnnulusBandPath(centerX: number, centerY: number, innerRadius: number, outerRadius: number, startAngleDeg?: number, endAngleDeg?: number): string;
/** Full annulus between two radii (even-odd fill). */
export declare function buildAnnulusPath(centerX: number, centerY: number, innerRadius: number, outerRadius: number): string;
/** Rotate a point clockwise around a centre (SVG / CSS rotation). */
export declare function rotatePointAround(point: RoulettePoint, center: RoulettePoint, degrees: number): RoulettePoint;
export declare function pocketBallStagePosition(ballPosition: RoulettePoint, wheelRotation: number, center?: RoulettePoint): RoulettePoint;
/** Ball rest position in stage space once the target pocket sits under the pointer. */
export declare function settledBallStagePosition(pocketBallPosition: RoulettePoint, pointerAngle: number, center?: RoulettePoint): RoulettePoint;
//# sourceMappingURL=rouletteWheelPocketGeometry.d.ts.map