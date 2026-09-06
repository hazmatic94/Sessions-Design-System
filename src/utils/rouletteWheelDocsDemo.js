import {
  ROULETTE_BALL_LANDING_RADIUS,
  ROULETTE_BALL_TRACK_RADIUS,
} from "./rouletteWheelPocketAngles.js";
import { startRouletteRollPingPong } from "./rouletteWheelRollPlayback.js";
import { playDocsSound } from "../docs/demo/sounds.js";

const DEMO_VERSION = "roulette-wheel-clean-v2";
const ROULETTE_ROLL_SOUND_URL = "./assets/roulette-wheel-roll.mp3?v=roulette-wheel-sound-v3";
const ROULETTE_BOUNCE_SOUND_URL = "./assets/roulette-marble-bounce.mp3?v=roulette-wheel-sound-v3";
const EUROPEAN_ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
  14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const ROULETTE_POCKET_COUNT = EUROPEAN_ROULETTE_NUMBERS.length;
const ROULETTE_POCKET_STEP = 360 / ROULETTE_POCKET_COUNT;
const ROULETTE_HALF_SEGMENT_ANGLE = ROULETTE_POCKET_STEP / 2;
const ROULETTE_POINTER_ANGLE = -90;
const ROULETTE_SPIN_DURATION_MS = 5800;
const ROULETTE_WHEEL_SETTLING_START_PROGRESS = 0.7;
const BALL_LANDING_START_PROGRESS = 0.85;
const BALL_DECELERATION_START_PROGRESS = 0.58;
const BALL_ORBIT_RADIUS = 547.611 - 34;
const BALL_SPIRAL_END_RADIUS = ROULETTE_BALL_LANDING_RADIUS + 48;
const BALL_SETTLE_BOUNCE_HEIGHT = 8;
const VIEWBOX = { minX: 0, minY: 15, width: 1116, height: 1162 };
const ROULETTE_WHEEL_NATIVE_WIDTH = 1111;
const ROULETTE_WHEEL_NATIVE_HEIGHT = 1162;
const CRISP_SIZE_UNIT = VIEWBOX.width / 6;

function snapRouletteWheelDisplaySize(size) {
  const minSize = CRISP_SIZE_UNIT * 2;
  return Math.max(minSize, Math.round(size / CRISP_SIZE_UNIT) * CRISP_SIZE_UNIT);
}

function resolveRouletteWheelDisplaySize(size) {
  if (size === ROULETTE_WHEEL_NATIVE_WIDTH) {
    return size;
  }

  return snapRouletteWheelDisplaySize(size);
}

function wrapRouletteWheelDocsFit(content) {
  const fit = document.createElement("div");
  fit.className = "roulette-wheel-docs-fit";
  fit.appendChild(content);
  return fit;
}

function syncDocsWheelSize(fit, wheelRoot) {
  if (!fit || !wheelRoot) {
    return;
  }

  const width = Math.min(
    ROULETTE_WHEEL_NATIVE_WIDTH,
    fit.clientWidth || fit.parentElement?.clientWidth || ROULETTE_WHEEL_NATIVE_WIDTH,
  );
  wheelRoot.style.setProperty("--roulette-wheel-size", `${width}px`);
}

function observeDocsWheelSize(fit, wheelRoot) {
  syncDocsWheelSize(fit, wheelRoot);

  if (typeof ResizeObserver === "undefined") {
    return;
  }

  const observer = new ResizeObserver(() => syncDocsWheelSize(fit, wheelRoot));
  observer.observe(fit);
}

function rouletteViewBoxAttribute() {
  return `${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}`;
}

function roulettePointToPercent(point) {
  return {
    left: `${((point.x - VIEWBOX.minX) / VIEWBOX.width) * 100}%`,
    top: `${((point.y - VIEWBOX.minY) / VIEWBOX.height) * 100}%`,
  };
}
const POCKET_INNER_RADIUS = ROULETTE_BALL_TRACK_RADIUS + 17;
const POCKET_OUTER_RADIUS = 547.611 - 28;
const NUMBER_TRACK_DEPTH = 92;
const NUMBER_TRACK_INNER_RADIUS = POCKET_OUTER_RADIUS - NUMBER_TRACK_DEPTH;
const LABEL_RADIUS = POCKET_OUTER_RADIUS - NUMBER_TRACK_DEPTH / 2 + 2;
const POCKET_NUMBER_FONT_SIZE = 42;
const POCKET_WALL_DEPTH = 9;
const WELL_FLOOR_INSET = 4;
const POCKET_BORDER_COLOR = "var(--roulette-pocket-divider)";
const POCKET_BORDER_WIDTH = 2;
const POINTER_TICK_DEG = 4;
const POINTER_TICK_DECAY = 0.86;
const LOWER_ARC_START = 8;
const LOWER_ARC_END = 172;
const DIVIDER_SHADOW_OFFSET_DEG = 0.65;

const WHEEL_CENTER = { x: 557.611, y: 595.611 };
const POCKET_CENTER = WHEEL_CENTER;
const FIXED_BALL_LANDING_POSITION = polarToCartesian(
  POCKET_CENTER.x,
  POCKET_CENTER.y,
  ROULETTE_BALL_LANDING_RADIUS,
  ROULETTE_POINTER_ANGLE,
);

function normalizeDegrees(angle) {
  return ((angle % 360) + 360) % 360;
}

function getPocketColor(value) {
  if (value === 0) {
    return "green";
  }
  const redNumbers = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ]);
  return redNumbers.has(value) ? "red" : "black";
}

function pocketFill(value) {
  const color = getPocketColor(value);
  if (color === "green") {
    return "url(#rw-green)";
  }
  if (color === "red") {
    return "url(#rw-red)";
  }
  return "url(#rw-black)";
}

function buildSectorPath(centerAngle) {
  const startAngle = centerAngle - ROULETTE_HALF_SEGMENT_ANGLE;
  const endAngle = centerAngle + ROULETTE_HALF_SEGMENT_ANGLE;
  return buildSectorBandPath(
    startAngle,
    endAngle,
    POCKET_INNER_RADIUS,
    POCKET_OUTER_RADIUS,
  );
}

function buildSectorBandPath(startAngle, endAngle, innerR, outerR) {
  const innerStart = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, innerR, startAngle);
  const outerStart = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, outerR, startAngle);
  const outerEnd = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, outerR, endAngle);
  const innerEnd = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, innerR, endAngle);
  const sweep = ((endAngle - startAngle) % 360 + 360) % 360;
  const largeArc = sweep > 180 ? 1 : 0;
  return [
    `M ${innerStart.x} ${innerStart.y}`,
    `L ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function buildAnnulusPath(centerX, centerY, innerR, outerR) {
  return [
    `M ${centerX + outerR} ${centerY}`,
    `A ${outerR} ${outerR} 0 1 1 ${centerX - outerR} ${centerY}`,
    `A ${outerR} ${outerR} 0 1 1 ${centerX + outerR} ${centerY}`,
    `M ${centerX + innerR} ${centerY}`,
    `A ${innerR} ${innerR} 0 1 0 ${centerX - innerR} ${centerY}`,
    `A ${innerR} ${innerR} 0 1 0 ${centerX + innerR} ${centerY}`,
    "Z",
  ].join(" ");
}

function buildCircularArcPath(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const sweep = ((endAngle - startAngle) % 360 + 360) % 360;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function buildLowerAnnulusBandPath(
  centerX,
  centerY,
  innerR,
  outerR,
  startAngle = LOWER_ARC_START,
  endAngle = LOWER_ARC_END,
) {
  const outerStart = polarToCartesian(centerX, centerY, outerR, startAngle);
  const outerEnd = polarToCartesian(centerX, centerY, outerR, endAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerR, endAngle);
  const innerStart = polarToCartesian(centerX, centerY, innerR, startAngle);
  const sweep = ((endAngle - startAngle) % 360 + 360) % 360;
  const largeArc = sweep > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function isLowerHemisphere(angleDeg) {
  const angle = ((angleDeg % 360) + 360) % 360;
  return angle >= LOWER_ARC_START && angle <= LOWER_ARC_END;
}

function createSvgElement(tag, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, String(value));
  }
  return element;
}

function appendPocketDivider(group, angle) {
  const inner = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, POCKET_INNER_RADIUS, angle);
  const outer = polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, POCKET_OUTER_RADIUS, angle);
  group.appendChild(
    createSvgElement("line", {
      x1: inner.x,
      y1: inner.y,
      x2: outer.x,
      y2: outer.y,
      stroke: POCKET_BORDER_COLOR,
      "stroke-width": POCKET_BORDER_WIDTH,
      "stroke-linecap": "butt",
      "vector-effect": "non-scaling-stroke",
    }),
  );
}

function findSpinnerLayer(spinnerRoot, filterId) {
  return spinnerRoot.querySelector(`:scope > g[filter="url(#${filterId})"]`);
}

function mountCanonicalPocketRing(spinnerSvg) {
  const spinnerRoot = spinnerSvg.querySelector("#rw-wheel-spinner");
  if (!spinnerRoot) {
    return;
  }

  const pocketGroup = findSpinnerLayer(spinnerRoot, "rw-pocket-inset");
  const wellGroup = findSpinnerLayer(spinnerRoot, "rw-pocket-well");
  const numberTrackGroup = spinnerRoot.querySelector(".joker-roulette-wheel__number-track");
  const sideWallGroup = spinnerRoot.querySelector(".joker-roulette-wheel__pocket-side-walls");
  const wellRibGroup = spinnerRoot.querySelector(".joker-roulette-wheel__pocket-well-ribs");
  const wellLowerGroup = spinnerRoot.querySelector(".joker-roulette-wheel__pocket-well-lower");
  const numberGroup =
    spinnerRoot.querySelector(".joker-roulette-wheel__numbers") ??
    findSpinnerLayer(spinnerRoot, "rw-number-crisp");
  const outlineGroup = spinnerRoot.querySelector(".joker-roulette-wheel__pocket-ring-outline");
  if (!pocketGroup || !wellGroup || !numberGroup || !outlineGroup) {
    return;
  }

  pocketGroup.replaceChildren();
  wellGroup.replaceChildren();
  numberTrackGroup?.replaceChildren();
  sideWallGroup?.replaceChildren();
  wellRibGroup?.replaceChildren();
  wellLowerGroup?.replaceChildren();
  numberGroup.replaceChildren();
  numberGroup.removeAttribute("filter");
  numberGroup.classList.add("joker-roulette-wheel__numbers");
  outlineGroup.replaceChildren();
  wellGroup.setAttribute("opacity", "0.45");

  const wallOuter = POCKET_INNER_RADIUS + POCKET_WALL_DEPTH;
  const wellOuter = NUMBER_TRACK_INNER_RADIUS - WELL_FLOOR_INSET;
  const wellInner = wallOuter + 2;

  wellLowerGroup?.appendChild(
    createSvgElement("path", {
      d: buildAnnulusPath(POCKET_CENTER.x, POCKET_CENTER.y, wellInner, wellOuter),
      fill: "url(#rw-well-shade)",
    }),
  );

  outlineGroup.appendChild(
    createSvgElement("circle", {
      cx: POCKET_CENTER.x,
      cy: POCKET_CENTER.y,
      r: POCKET_OUTER_RADIUS,
      fill: "none",
      stroke: POCKET_BORDER_COLOR,
      "stroke-width": POCKET_BORDER_WIDTH,
      "vector-effect": "non-scaling-stroke",
    }),
  );
  outlineGroup.appendChild(
    createSvgElement("path", {
      d: buildCircularArcPath(
        POCKET_CENTER.x,
        POCKET_CENTER.y,
        NUMBER_TRACK_INNER_RADIUS,
        LOWER_ARC_END,
        LOWER_ARC_START + 360,
      ),
      fill: "none",
      stroke: "var(--roulette-black)",
      "stroke-width": 2.5,
      opacity: 0.45,
      "vector-effect": "non-scaling-stroke",
    }),
  );
  outlineGroup.appendChild(
    createSvgElement("path", {
      d: buildCircularArcPath(
        POCKET_CENTER.x,
        POCKET_CENTER.y,
        NUMBER_TRACK_INNER_RADIUS,
        LOWER_ARC_START,
        LOWER_ARC_END,
      ),
      fill: "none",
      stroke: "var(--roulette-pocket-fret-shadow)",
      "stroke-width": 1.6,
      opacity: 0.32,
      "stroke-linecap": "round",
      "vector-effect": "non-scaling-stroke",
    }),
  );
  outlineGroup.appendChild(
    createSvgElement("circle", {
      cx: POCKET_CENTER.x,
      cy: POCKET_CENTER.y,
      r: POCKET_INNER_RADIUS,
      fill: "none",
      stroke: "var(--roulette-pocket-fret-shadow)",
      "stroke-width": 2.5,
      opacity: 0.65,
      "vector-effect": "non-scaling-stroke",
    }),
  );

  for (const pocket of POCKETS) {
    if (!isLowerHemisphere(pocket.startAngle)) {
      continue;
    }
    outlineGroup.appendChild(
      createSvgElement("path", {
        d: buildSectorBandPath(
          pocket.startAngle - DIVIDER_SHADOW_OFFSET_DEG - 1.4,
          pocket.startAngle - DIVIDER_SHADOW_OFFSET_DEG,
          wellInner,
          wellOuter,
        ),
        fill: "var(--roulette-black)",
        opacity: 0.22,
      }),
    );
  }

  for (const pocket of POCKETS) {
    if (!isLowerHemisphere(pocket.startAngle)) {
      continue;
    }
    const shadowInner = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      wellInner,
      pocket.startAngle - DIVIDER_SHADOW_OFFSET_DEG,
    );
    const shadowOuter = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      wellOuter,
      pocket.startAngle - DIVIDER_SHADOW_OFFSET_DEG,
    );
    outlineGroup.appendChild(
      createSvgElement("line", {
        x1: shadowInner.x,
        y1: shadowInner.y,
        x2: shadowOuter.x,
        y2: shadowOuter.y,
        stroke: "var(--roulette-black)",
        "stroke-width": 4.5,
        opacity: 0.34,
        "stroke-linecap": "round",
        "vector-effect": "non-scaling-stroke",
      }),
    );
  }

  for (const pocket of POCKETS) {
    const pocketPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pocketPath.setAttribute(
      "d",
      buildSectorBandPath(pocket.startAngle, pocket.endAngle, wellInner, wellOuter),
    );
    pocketPath.setAttribute("fill", pocketFill(pocket.value));
    pocketGroup.appendChild(pocketPath);

    numberTrackGroup?.appendChild(
      createSvgElement("path", {
        d: buildSectorBandPath(
          pocket.startAngle,
          pocket.endAngle,
          NUMBER_TRACK_INNER_RADIUS,
          POCKET_OUTER_RADIUS,
        ),
        fill: pocketFill(pocket.value),
      }),
    );

    sideWallGroup?.appendChild(
      createSvgElement("path", {
        d: buildSectorBandPath(
          pocket.startAngle,
          pocket.endAngle,
          POCKET_INNER_RADIUS,
          wallOuter,
        ),
        fill: "url(#rw-bronze)",
        opacity: 0.42,
      }),
    );

    const wellPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wellPath.setAttribute(
      "d",
      buildSectorBandPath(pocket.startAngle, pocket.endAngle, wellInner, wellOuter),
    );
    wellPath.setAttribute("fill", "var(--roulette-pocket-well-shade)");
    wellGroup.appendChild(wellPath);

    const ribGroup = createSvgElement("g", {
      transform: `rotate(${pocket.centerAngle}, ${POCKET_CENTER.x}, ${POCKET_CENTER.y})`,
    });
    ribGroup.appendChild(
      createSvgElement("path", {
        d: buildSectorBandPath(pocket.startAngle, pocket.endAngle, wellInner, wellOuter),
        fill: "url(#rw-well-rib)",
        opacity: 0.62,
      }),
    );
    wellRibGroup?.appendChild(ribGroup);

    const dividerInner = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      POCKET_INNER_RADIUS,
      pocket.startAngle,
    );
    const dividerOuter = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      POCKET_OUTER_RADIUS,
      pocket.startAngle,
    );
    const wellDividerInner = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      wellInner,
      pocket.startAngle,
    );
    const wellDividerOuter = polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      wellOuter,
      pocket.startAngle,
    );
    if (isLowerHemisphere(pocket.startAngle)) {
      outlineGroup.appendChild(
        createSvgElement("line", {
          x1: wellDividerInner.x,
          y1: wellDividerInner.y,
          x2: wellDividerOuter.x,
          y2: wellDividerOuter.y,
          stroke: POCKET_BORDER_COLOR,
          "stroke-width": 2.4,
          "stroke-linecap": "round",
          "vector-effect": "non-scaling-stroke",
        }),
      );
    }
    outlineGroup.appendChild(
      createSvgElement("line", {
        x1: dividerInner.x,
        y1: dividerInner.y,
        x2: dividerOuter.x,
        y2: dividerOuter.y,
        stroke: POCKET_BORDER_COLOR,
        "stroke-width": POCKET_BORDER_WIDTH,
        "stroke-linecap": "butt",
        "vector-effect": "non-scaling-stroke",
      }),
    );

    const labelRotateGroup = createSvgElement("g", {
      transform: `rotate(${pocket.centerAngle + 90}, ${pocket.labelPosition.x}, ${pocket.labelPosition.y})`,
    });
    const label = createSvgElement("text", {
      class: "joker-roulette-wheel__number",
      "data-pocket-value": String(pocket.value),
      x: pocket.labelPosition.x,
      y: pocket.labelPosition.y,
      fill: "var(--roulette-number)",
      "font-size": String(POCKET_NUMBER_FONT_SIZE),
      "font-weight": "700",
      "font-family": "var(--font)",
      "letter-spacing": "-0.02em",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      "paint-order": "stroke fill",
      stroke: "color-mix(in srgb, var(--joker-black-900) 78%, transparent)",
      "stroke-width": "0.7",
      "vector-effect": "non-scaling-stroke",
    });
    label.textContent = String(pocket.value);
    labelRotateGroup.appendChild(label);
    numberGroup.appendChild(labelRotateGroup);
  }
}

/** Canonical pocket data shared by rendering, result logic, and debug output. */
function buildPocket(value, index) {
  const segmentAngle = ROULETTE_POCKET_STEP;
  const startAngle = ROULETTE_POINTER_ANGLE - ROULETTE_HALF_SEGMENT_ANGLE + index * segmentAngle;
  const endAngle = startAngle + segmentAngle;
  const centerAngle = startAngle + segmentAngle / 2;

  return {
    index,
    value,
    centerAngle,
    startAngle,
    endAngle,
    path: buildSectorBandPath(startAngle, endAngle, POCKET_INNER_RADIUS, POCKET_OUTER_RADIUS),
    labelPosition: polarToCartesian(POCKET_CENTER.x, POCKET_CENTER.y, LABEL_RADIUS, centerAngle),
    ballPosition: polarToCartesian(
      POCKET_CENTER.x,
      POCKET_CENTER.y,
      ROULETTE_BALL_LANDING_RADIUS,
      centerAngle,
    ),
  };
}

const POCKETS = Object.freeze(
  EUROPEAN_ROULETTE_NUMBERS.map((value, index) => buildPocket(value, index)),
);
const ROULETTE_POCKETS = POCKETS;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function lerpPoint(start, end, t) {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t),
  };
}

function easeOutCubic(t) {
  const x = clamp(t, 0, 1);
  return 1 - (1 - x) ** 3;
}

function easeInCubic(t) {
  const x = clamp(t, 0, 1);
  return x ** 3;
}

function mechanicalBrake(t) {
  const x = clamp(t, 0, 1);
  return 1 - (1 - x) ** 2.6;
}

function wheelProgressCurve(progress) {
  const t = clamp(progress, 0, 1);

  if (t < 0.1) {
    const u = t / 0.1;
    return u * u * u * 0.12;
  }

  if (t < 0.7) {
    const u = (t - 0.1) / 0.6;
    return 0.12 + u * 0.66;
  }

  const u = (t - 0.7) / 0.3;
  return 0.78 + mechanicalBrake(u) * 0.22;
}

function ballAngularProgress(progress) {
  const t = clamp(progress, 0, 1);

  if (t < 0.12) {
    return easeInCubic(t / 0.12) * 0.18;
  }

  if (t < 0.7) {
    const u = (t - 0.12) / 0.58;
    return 0.18 + u * 0.64;
  }

  const u = (t - 0.7) / 0.3;
  return 0.82 + mechanicalBrake(u) * 0.18;
}

function ballSettleBounce(progress) {
  if (progress < 0.94 || progress >= 1) {
    return 0;
  }

  const u = (progress - 0.94) / 0.06;
  return Math.sin(u * Math.PI) * BALL_SETTLE_BOUNCE_HEIGHT;
}

function getPocketIndexForNumber(number) {
  const index = EUROPEAN_ROULETTE_NUMBERS.indexOf(number);
  if (index < 0) {
    throw new RangeError(`Unknown roulette number: ${number}`);
  }
  return index;
}

function clockwiseOffsetFromPointer(angle) {
  return normalizeDegrees(angle - ROULETTE_POINTER_ANGLE);
}

function getPointerAngleInWheelSpace(wheelRotation) {
  return normalizeDegrees(ROULETTE_POINTER_ANGLE - normalizeDegrees(wheelRotation));
}

function normalizePocketIndex(pocketIndex) {
  return ((pocketIndex % ROULETTE_POCKET_COUNT) + ROULETTE_POCKET_COUNT) % ROULETTE_POCKET_COUNT;
}

function findPocketByIndex(index) {
  return ROULETTE_POCKETS[normalizePocketIndex(index)];
}

function findPocketByValue(value) {
  const pocket = ROULETTE_POCKETS.find((entry) => entry.value === value);
  if (!pocket) {
    throw new RangeError(`Unknown roulette number: ${value}`);
  }
  return pocket;
}

function pickRandomTargetPocket() {
  const winningNumber =
    EUROPEAN_ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_POCKET_COUNT)];
  return findPocketByValue(winningNumber);
}

function computeFinalWheelRotation(
  currentAccumulatedRotation,
  targetPocket,
  fullSpins,
) {
  const alignmentMod = normalizeDegrees(ROULETTE_POINTER_ANGLE - targetPocket.centerAngle);
  const currentMod = normalizeDegrees(currentAccumulatedRotation);
  let delta = alignmentMod - currentMod;
  if (delta <= 0) {
    delta += 360;
  }
  return currentAccumulatedRotation + fullSpins * 360 + delta;
}

function createSpinSnapshot(
  targetPocket,
  finalWheelRotation,
  displayedResult = targetPocket.value,
) {
  return {
    targetPocket,
    highlightedPocket: targetPocket,
    displayedResult,
    ballLandingPocket: targetPocket,
    finalWheelRotation,
  };
}

function assertSpinPocketConsistency(snapshot, { requireDisplayedResult = false } = {}) {
  const { targetPocket, highlightedPocket, displayedResult, ballLandingPocket } = snapshot;
  if (
    highlightedPocket.value !== targetPocket.value ||
    ballLandingPocket.value !== targetPocket.value ||
    (requireDisplayedResult && displayedResult !== targetPocket.value) ||
    (displayedResult != null && displayedResult !== targetPocket.value)
  ) {
    throw new Error(
      [
        "Roulette pocket mismatch:",
        `target=${targetPocket.value}`,
        `highlighted=${highlightedPocket.value}`,
        `displayed=${displayedResult}`,
        `ballLanding=${ballLandingPocket.value}`,
      ].join(" "),
    );
  }
}

function findPocketAtStageAngle(wheelRotation, stageAngle) {
  const angleOnWheel = normalizeDegrees(stageAngle - normalizeDegrees(wheelRotation));

  let best = POCKETS[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const pocket of POCKETS) {
    const distance = Math.abs(((pocket.centerAngle - angleOnWheel + 180) % 360) - 180);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = pocket;
    }
  }

  return best;
}

function findPocketUnderPointer(wheelRotation) {
  return findPocketAtStageAngle(wheelRotation, ROULETTE_POINTER_ANGLE);
}

function sampleRouletteSpinFrame(progress, startWheel, endWheel, ballLaps = 7) {
  const t = clamp(progress, 0, 1);
  const wheelRotation = lerp(startWheel, endWheel, wheelProgressCurve(t));
  const orbitAngle =
    ROULETTE_POINTER_ANGLE - ballLaps * 360 * ballAngularProgress(t);
  const spiralProgress = clamp(
    (t - BALL_DECELERATION_START_PROGRESS) /
      (BALL_LANDING_START_PROGRESS - BALL_DECELERATION_START_PROGRESS),
    0,
    1,
  );
  const orbitRadius = lerp(
    BALL_ORBIT_RADIUS,
    BALL_SPIRAL_END_RADIUS,
    easeOutCubic(spiralProgress),
  );
  const spiralPosition = polarToCartesian(
    WHEEL_CENTER.x,
    WHEEL_CENTER.y,
    orbitRadius,
    orbitAngle,
  );
  const landingProgress = easeOutCubic(
    (t - BALL_LANDING_START_PROGRESS) / (1 - BALL_LANDING_START_PROGRESS),
  );

  return {
    wheelRotation,
    ballPosition: lerpPoint(
      spiralPosition,
      FIXED_BALL_LANDING_POSITION,
      landingProgress,
    ),
    ballBounceScale: 1,
    ballBounceLift: ballSettleBounce(t),
    progress: t,
  };
}

function runRouletteWheelSpin({
  fromWheelRotation,
  targetPocket = pickRandomTargetPocket(),
  durationMs = ROULETTE_SPIN_DURATION_MS,
  extraWheelSpins = 5,
  onFrame,
  onComplete,
}) {
  const finalWheelRotation = computeFinalWheelRotation(
    fromWheelRotation,
    targetPocket,
    extraWheelSpins,
  );
  const snapshot = createSpinSnapshot(targetPocket, finalWheelRotation, null);
  const startTime = performance.now();
  let rafId = 0;

  const tick = (now) => {
    const progress = clamp((now - startTime) / durationMs, 0, 1);
    onFrame(
      sampleRouletteSpinFrame(
        progress,
        fromWheelRotation,
        finalWheelRotation,
      ),
      snapshot,
    );

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    const settledBallPosition = FIXED_BALL_LANDING_POSITION;
    const pocketAtBall = findPocketUnderPointer(finalWheelRotation);
    if (pocketAtBall.value !== targetPocket.value) {
      throw new Error(
        `Roulette alignment mismatch: pointer sees ${pocketAtBall.value}, target is ${targetPocket.value}`,
      );
    }

    const completedSnapshot = createSpinSnapshot(
      targetPocket,
      finalWheelRotation,
      targetPocket.value,
    );
    assertSpinPocketConsistency(completedSnapshot, { requireDisplayedResult: true });

    onComplete({
      targetPocket,
      finalWheelRotation,
      snapshot: completedSnapshot,
      wheelRotation: finalWheelRotation,
      ballPosition: settledBallPosition,
      ballBounceScale: 1,
      ballBounceLift: 0,
    });
  };

  onFrame(
    sampleRouletteSpinFrame(0, fromWheelRotation, finalWheelRotation),
    snapshot,
  );
  rafId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(rafId);
  };
}

function ballCssPositionFromPoint(point) {
  return roulettePointToPercent(point);
}

function polarToCartesian(centerX, centerY, radius, angleDeg) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: centerX + Math.cos(radians) * radius,
    y: centerY + Math.sin(radians) * radius,
  };
}

function createLayeredWheel(svgMarkup) {
  const doc = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
  const root = doc.documentElement;
  const viewBox = root.getAttribute("viewBox") || rouletteViewBoxAttribute();
  const defs = root.querySelector("defs");
  const staticFrame = root.querySelector("#rw-static-frame");
  const outerBallTrack = root.querySelector("#rw-outer-ball-track");
  const spinner = root.querySelector("#rw-wheel-spinner");
  const pointer = root.querySelector("g#rw-pointer");

  if (!staticFrame || !spinner || !pointer) {
    return null;
  }

  const stage = document.createElement("div");
  stage.className = "joker-roulette-wheel__stage";
  const spinOrigin = roulettePointToPercent(WHEEL_CENTER);
  stage.style.setProperty("--roulette-spin-origin-x", spinOrigin.left);
  stage.style.setProperty("--roulette-spin-origin-y", spinOrigin.top);

  const defsHost = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  defsHost.classList.add("joker-roulette-wheel__defs");
  defsHost.setAttribute("aria-hidden", "true");
  if (defs) {
    defsHost.appendChild(defs.cloneNode(true));
  }

  const staticSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  staticSvg.setAttribute("viewBox", viewBox);
  staticSvg.setAttribute("fill", "none");
  staticSvg.classList.add("joker-roulette-wheel__svg", "joker-roulette-wheel__svg--static");
  staticSvg.setAttribute("aria-hidden", "true");
  staticSvg.appendChild(staticFrame.cloneNode(true));

  const spinnerWrap = document.createElement("div");
  spinnerWrap.className = "joker-roulette-wheel__wheel-spinner";

  const spinnerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  spinnerSvg.setAttribute("viewBox", viewBox);
  spinnerSvg.setAttribute("fill", "none");
  spinnerSvg.classList.add("joker-roulette-wheel__svg", "joker-roulette-wheel__svg--spinner");
  spinnerSvg.setAttribute("aria-hidden", "true");
  spinnerSvg.appendChild(spinner.cloneNode(true));
  const pocketInset = spinnerSvg.querySelector(".joker-roulette-wheel__pocket-inset");
  if (!pocketInset?.childElementCount) {
    mountCanonicalPocketRing(spinnerSvg);
  }
  spinnerWrap.appendChild(spinnerSvg);

  let outerTrackSvg = null;
  if (outerBallTrack) {
    outerTrackSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    outerTrackSvg.setAttribute("viewBox", viewBox);
    outerTrackSvg.setAttribute("fill", "none");
    outerTrackSvg.classList.add("joker-roulette-wheel__svg", "joker-roulette-wheel__svg--outer-track");
    outerTrackSvg.setAttribute("aria-hidden", "true");
    outerTrackSvg.appendChild(outerBallTrack.cloneNode(true));
  }

  const ball = document.createElement("div");
  ball.className = "joker-roulette-wheel__ball";
  ball.setAttribute("aria-hidden", "true");
  ball.innerHTML =
    '<span class="joker-roulette-wheel__ball-shadow"></span><span class="joker-roulette-wheel__ball-orb"></span>';

  const pointerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  pointerSvg.setAttribute("viewBox", viewBox);
  pointerSvg.setAttribute("fill", "none");
  pointerSvg.classList.add("joker-roulette-wheel__svg", "joker-roulette-wheel__svg--pointer");
  pointerSvg.setAttribute("aria-hidden", "true");
  const pointerLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  pointerLayer.classList.add("joker-roulette-wheel__pointer-layer");
  pointerLayer.appendChild(pointer.cloneNode(true));
  pointerSvg.appendChild(pointerLayer);

  stage.append(defsHost, staticSvg, spinnerWrap, ...(outerTrackSvg ? [outerTrackSvg] : []), ball, pointerSvg);

  return { stage, spinnerWrap, spinnerSvg, ball, pointerLayer };
}

let activeRollStop = null;
let activeBounceAudio = null;
let settlingTimer = null;
let playbackGeneration = 0;

function clearSettlingTimer() {
  if (settlingTimer != null) {
    window.clearTimeout(settlingTimer);
    settlingTimer = null;
  }
}

function stopActiveRoll() {
  activeRollStop?.();
  activeRollStop = null;
}

function stopRouletteWheelSpinSound() {
  playbackGeneration += 1;
  clearSettlingTimer();
  stopActiveRoll();

  if (activeBounceAudio) {
    activeBounceAudio.pause();
    activeBounceAudio.currentTime = 0;
    activeBounceAudio = null;
  }
}

function playRouletteMarbleBounceSound() {
  const bounce = new Audio(ROULETTE_BOUNCE_SOUND_URL);
  activeBounceAudio = bounce;
  bounce.play().catch(() => {});
  bounce.addEventListener(
    "ended",
    () => {
      if (activeBounceAudio === bounce) {
        activeBounceAudio = null;
      }
    },
    { once: true },
  );
}

function playRouletteWheelSpinSound(durationMs = ROULETTE_SPIN_DURATION_MS) {
  stopRouletteWheelSpinSound();
  const generation = playbackGeneration;

  void startRouletteRollPingPong(ROULETTE_ROLL_SOUND_URL).then((stopRoll) => {
    if (!stopRoll || generation !== playbackGeneration) {
      stopRoll?.();
      return;
    }

    activeRollStop = stopRoll;
  });

  const rollDurationMs = Math.max(0, Math.round(durationMs * ROULETTE_WHEEL_SETTLING_START_PROGRESS));
  settlingTimer = window.setTimeout(() => {
    settlingTimer = null;

    if (generation !== playbackGeneration) {
      return;
    }

    stopActiveRoll();
    playRouletteMarbleBounceSound();
  }, rollDurationMs);
}

function createRouletteWrapper(wheelNode) {
  const wrapper = document.createElement("div");
  wrapper.className = "joker-roulette-wrapper";

  const slot = document.createElement("div");
  slot.className = "joker-roulette-wrapper__wheel-slot";
  wheelNode.style.setProperty("--roulette-wheel-size", `${ROULETTE_WHEEL_NATIVE_WIDTH}px`);
  slot.appendChild(wheelNode);
  wrapper.appendChild(slot);

  return wrapper;
}

export async function mountRouletteWheelDemo(mount) {
  if (mount.dataset.hydrated === DEMO_VERSION) {
    return;
  }

  const useRouletteWrapper = mount.hasAttribute("data-roulette-wrapper");
  const size = useRouletteWrapper
    ? ROULETTE_WHEEL_NATIVE_WIDTH
    : resolveRouletteWheelDisplaySize(
        Number.parseInt(mount.getAttribute("data-size") || String(ROULETTE_WHEEL_NATIVE_WIDTH), 10) ||
          ROULETTE_WHEEL_NATIVE_WIDTH,
      );
  const response = await fetch(`./assets/roulette-wheel.svg?v=${DEMO_VERSION}`);
  const svgMarkup = await response.text();

  const shell = document.createElement("div");
  shell.className = "joker-roulette-wheel";

  const layered = createLayeredWheel(svgMarkup);
  if (!layered) {
    shell.innerHTML = `<img class="joker-roulette-wheel__svg" src="./assets/roulette-wheel.svg?v=${DEMO_VERSION}" alt="" draggable="false" />`;
  } else {
    shell.appendChild(layered.stage);
  }

  const spinButton = document.createElement("button");
  spinButton.type = "button";
  spinButton.className = "joker-cta-preview ghost button-example-control";
  spinButton.textContent = "Spin";

  const wheelHost = useRouletteWrapper ? createRouletteWrapper(shell) : shell;

  if (useRouletteWrapper) {
    wheelHost.style.width = "100%";
    wheelHost.style.height = "100%";
    mount.replaceChildren(wheelHost);
  } else {
    const fit = wrapRouletteWheelDocsFit(wheelHost);
    mount.replaceChildren(fit, spinButton);
    observeDocsWheelSize(fit, shell);
  }
  mount.dataset.hydrated = DEMO_VERSION;

  if (!layered) {
    return;
  }

  if (useRouletteWrapper) {
    return;
  }

  mountRouletteWheelSpinControls({
    layered,
    spinButton,
  });
}

function mountRouletteWheelSpinControls({
  layered,
  spinButton,
}) {
  const { spinnerWrap, ball, spinnerSvg, pointerLayer } = layered;
  let wheelRotation = 0;
  const restTarget = findPocketByIndex(0);
  let targetPocket = restTarget;
  let snapshot = createSpinSnapshot(restTarget, 0);
  layered.targetPocket = targetPocket;
  let ballPosition = FIXED_BALL_LANDING_POSITION;
  let isSpinning = false;
  let cancelSpin = null;

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  let pointerKick = 0;
  let pointerPocketIndex = null;
  let pointerPivot = null;

  const resetPointerTick = () => {
    pointerKick = 0;
    pointerPocketIndex = null;
    pointerLayer.removeAttribute("transform");
  };

  const updatePointerTick = (rotation) => {
    if (reduceMotion) {
      return;
    }
    const pocketAtPointer = findPocketUnderPointer(rotation);
    if (pointerPocketIndex === null) {
      pointerPocketIndex = pocketAtPointer.index;
    } else if (pocketAtPointer.index !== pointerPocketIndex) {
      pointerPocketIndex = pocketAtPointer.index;
      pointerKick = POINTER_TICK_DEG;
    }

    pointerKick *= POINTER_TICK_DECAY;
    if (pointerKick < 0.06) {
      pointerKick = 0;
      pointerLayer.removeAttribute("transform");
      return;
    }

    if (!pointerPivot) {
      const box = pointerLayer.getBBox();
      pointerPivot = { x: box.x + box.width / 2, y: box.y };
    }
    pointerLayer.setAttribute(
      "transform",
      `rotate(${pointerKick.toFixed(3)}, ${pointerPivot.x}, ${pointerPivot.y})`,
    );
  };

  const applyFrame = (frame, activeSnapshot = snapshot) => {
    wheelRotation = frame.wheelRotation;
    ballPosition = frame.ballPosition;
    snapshot = activeSnapshot;
    targetPocket = activeSnapshot.targetPocket;
    layered.targetPocket = targetPocket;
    spinnerWrap.style.setProperty("--roulette-wheel-rotation", `${wheelRotation}deg`);
    const position = ballCssPositionFromPoint(ballPosition);
    ball.style.left = position.left;
    ball.style.top = position.top;
    ball.style.setProperty("--roulette-ball-bounce-scale", String(frame.ballBounceScale ?? 1));
    ball.style.setProperty(
      "--roulette-ball-bounce-lift",
      `calc(var(--roulette-wheel-size) * ${frame.ballBounceLift ?? 0} / 1116)`,
    );
    updatePointerTick(wheelRotation);
  };

  applyFrame({ wheelRotation, ballPosition, ballBounceScale: 1, ballBounceLift: 0, progress: 0 });

  spinButton.addEventListener("click", () => {
    if (isSpinning) {
      return;
    }

    resetPointerTick();
    const spinTargetPocket = pickRandomTargetPocket();
    const spinSnapshot = createSpinSnapshot(spinTargetPocket, wheelRotation, null);
    applyFrame(
      { wheelRotation, ballPosition, ballBounceScale: 1, ballBounceLift: 0 },
      spinSnapshot,
    );

    cancelSpin?.();
    stopRouletteWheelSpinSound();
    isSpinning = true;
    spinButton.disabled = true;
    spinButton.textContent = "Spinning…";
    playRouletteWheelSpinSound();

    const cancelAnimation = runRouletteWheelSpin({
      fromWheelRotation: wheelRotation,
      targetPocket: spinTargetPocket,
      onFrame: (frame, activeSnapshot) => {
        applyFrame({ ...frame, progress: frame.progress }, activeSnapshot);
      },
      onComplete: (spinResult) => {
        cancelSpin = null;
        stopRouletteWheelSpinSound();
        isSpinning = false;
        spinButton.disabled = false;
        spinButton.textContent = "Spin";
        resetPointerTick();
        snapshot = spinResult.snapshot;
        targetPocket = spinResult.targetPocket;
        layered.targetPocket = targetPocket;
        applyFrame(
          {
            wheelRotation: spinResult.wheelRotation,
            ballPosition: spinResult.ballPosition,
            ballBounceScale: 1,
            ballBounceLift: 0,
            progress: 1,
          },
          snapshot,
        );
      },
    });
    cancelSpin = () => {
      cancelAnimation();
      stopRouletteWheelSpinSound();
    };
  });
}
