import type { RouletteSpinSnapshot } from "./rouletteWheelLayout";
import { LANDING_SLOT, getVisiblePockets } from "./rouletteWheelLayout";

export type RouletteWheelDebugOverlayProps = {
  snapshot: RouletteSpinSnapshot | null;
  wheelRotation?: number;
  ballPosition?: { x: number; y: number } | null;
  spinProgress?: number;
  className?: string;
};

export function RouletteWheelDebugOverlay({
  snapshot,
  wheelRotation = 0,
  ballPosition = null,
  spinProgress = 0,
  className,
}: RouletteWheelDebugOverlayProps) {
  if (snapshot == null) {
    return null;
  }

  const {
    targetPocket,
    finalWheelRotation,
    highlightedPocket,
    displayedResult,
    ballLandingPocket,
  } = snapshot;
  const visiblePockets = getVisiblePockets(targetPocket);
  const centreVisiblePocket = visiblePockets[LANDING_SLOT];

  if (typeof process !== "undefined" && process?.env?.NODE_ENV !== "production") {
    console.assert(
      centreVisiblePocket.value === targetPocket.value &&
        targetPocket.value === highlightedPocket.value &&
        highlightedPocket.value === ballLandingPocket.value &&
        (displayedResult == null || ballLandingPocket.value === displayedResult),
      "Fixed roulette landing values do not match",
    );
  }

  const { labelPosition, ballPosition: pocketBallPosition } = targetPocket;

  return (
    <div
      className={className}
      style={{
        margin: 0,
        padding: "10px 12px",
        borderRadius: "8px",
        background: "color-mix(in srgb, var(--joker-black-900) 82%, transparent)",
        border: "1px solid color-mix(in srgb, var(--joker-gold-400) 35%, transparent)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "11px",
        lineHeight: 1.5,
        color: "var(--joker-gold-300)",
        textAlign: "left",
        width: "min(100%, var(--roulette-wheel-size, 400px))",
      }}
      aria-live="polite"
    >
      <div style={{ fontWeight: 600, marginBottom: "6px", color: "var(--joker-gold-400)" }}>
        Roulette debug
      </div>
      <div>targetPocket.value: {targetPocket.value}</div>
      <div>targetPocket.index: {targetPocket.index}</div>
      <div>visiblePockets: [{visiblePockets.map((pocket) => pocket.value).join(", ")}]</div>
      <div>centreVisiblePocket.value: {centreVisiblePocket.value}</div>
      <div>landingSlot: {LANDING_SLOT}</div>
      <div>displayedResult: {displayedResult ?? "—"}</div>
      <div>highlightedPocket.value: {highlightedPocket.value}</div>
      <div>ballLandingPocket.value: {ballLandingPocket.value}</div>
      <div>spinProgress: {(spinProgress * 100).toFixed(1)}%</div>
      <div>targetPocket.centerAngle: {targetPocket.centerAngle.toFixed(2)}°</div>
      <div>
        targetPocket.labelPosition: {labelPosition.x.toFixed(1)}, {labelPosition.y.toFixed(1)}
      </div>
      <div>
        targetPocket.ballPosition: {pocketBallPosition.x.toFixed(1)}, {pocketBallPosition.y.toFixed(1)}
      </div>
      <div>wheelRotation: {wheelRotation.toFixed(2)}°</div>
      <div>finalWheelRotation: {finalWheelRotation.toFixed(2)}°</div>
      {ballPosition ? (
        <div>
          ballPosition (stage): {ballPosition.x.toFixed(1)}, {ballPosition.y.toFixed(1)}
        </div>
      ) : null}
    </div>
  );
}
