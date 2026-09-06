import type { CSSProperties } from "react";
import { createContext, useContext, type ReactNode } from "react";
import type { RouletteWheelPaintIds } from "./RouletteWheelDefs";
import type { RoulettePocket, RoulettePoint } from "./rouletteWheelLayout";
import {
  ROULETTE_FRAME_OUTER_RADIUS,
} from "./rouletteWheelPocketGeometry";
import {
  ROULETTE_BALL_TRACK_RADIUS,
  ROULETTE_BOWL_CENTER,
  ROULETTE_BOWL_RADIUS,
  ROULETTE_OUTER_RADIUS,
  ROULETTE_WHEEL_CENTER,
} from "./rouletteWheelPaths";
import type { RouletteWheelTheme } from "./RouletteWheel.types";
import {
  DEFAULT_POCKET_BLACK,
  DEFAULT_POCKET_GREEN,
  DEFAULT_POCKET_RED,
  RW,
} from "./rouletteWheelColors";

export const DEFAULT_ROULETTE_WHEEL_THEME: Required<RouletteWheelTheme> = {
  numberFill: RW.number,
  pocketRed: [...DEFAULT_POCKET_RED],
  pocketBlack: [...DEFAULT_POCKET_BLACK],
  pocketGreen: [...DEFAULT_POCKET_GREEN],
};

export type RouletteWheelGeometry = {
  center: typeof ROULETTE_WHEEL_CENTER;
  bowlCenter: typeof ROULETTE_BOWL_CENTER;
  /** Pocket-layout anchor radius (pointer, pocket math). */
  outerRadius: number;
  /** Expanded static rim / outer ball-track radius. */
  frameOuterRadius: number;
  bowlRadius: number;
  ballTrackRadius: number;
};

export const ROULETTE_WHEEL_GEOMETRY: RouletteWheelGeometry = {
  center: ROULETTE_WHEEL_CENTER,
  bowlCenter: ROULETTE_WHEEL_CENTER,
  outerRadius: ROULETTE_OUTER_RADIUS,
  frameOuterRadius: ROULETTE_FRAME_OUTER_RADIUS,
  bowlRadius: ROULETTE_BOWL_RADIUS,
  ballTrackRadius: ROULETTE_BALL_TRACK_RADIUS,
};

export type RouletteWheelContextValue = {
  paintIds: RouletteWheelPaintIds;
  geometry: RouletteWheelGeometry;
  theme: Required<RouletteWheelTheme>;
  wheelRotation: number;
  ballPosition: RoulettePoint;
  ballBounceScale: number;
  ballBounceLift: number;
  showBall: boolean;
  showDebugVisual: boolean;
  targetPocket: RoulettePocket | null;
};

const RouletteWheelContext = createContext<RouletteWheelContextValue | null>(null);

export type RouletteWheelProviderProps = {
  value: RouletteWheelContextValue;
  children: ReactNode;
};

export function RouletteWheelProvider({ value, children }: RouletteWheelProviderProps) {
  return <RouletteWheelContext.Provider value={value}>{children}</RouletteWheelContext.Provider>;
}

export function useRouletteWheelContext(): RouletteWheelContextValue {
  const context = useContext(RouletteWheelContext);
  if (!context) {
    throw new Error("Roulette wheel layer components must be rendered inside <RouletteWheel>.");
  }
  return context;
}

export function mergeRouletteWheelTheme(theme?: RouletteWheelTheme): Required<RouletteWheelTheme> {
  return {
    numberFill: theme?.numberFill ?? DEFAULT_ROULETTE_WHEEL_THEME.numberFill,
    pocketRed: theme?.pocketRed ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketRed,
    pocketBlack: theme?.pocketBlack ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketBlack,
    pocketGreen: theme?.pocketGreen ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketGreen,
  };
}
