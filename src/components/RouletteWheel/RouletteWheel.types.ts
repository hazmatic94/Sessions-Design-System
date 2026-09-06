import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { RoulettePocket, RoulettePoint } from "./rouletteWheelLayout";

export type RouletteWheelTheme = {
  numberFill?: string;
  pocketRed?: [string, string, string];
  pocketBlack?: [string, string, string];
  pocketGreen?: [string, string, string];
};

export type RouletteWheelProps = HTMLAttributes<HTMLDivElement> & {
  /** Native render width/height in CSS pixels. */
  size?: number;
  /** Wheel pocket-ring rotation in degrees (animation-ready). */
  wheelRotation?: number;
  /** Ball position in viewBox coordinates (stage space). */
  ballPosition?: RoulettePoint;
  /** @deprecated Use `ballPosition` */
  ballAngle?: number;
  /** @deprecated Use `ballPosition` */
  ballDropOffset?: number;
  /** Settle bounce scale — driven by spin animation. */
  ballBounceScale?: number;
  /** Settle bounce lift in viewBox units. */
  ballBounceLift?: number;
  showBall?: boolean;
  /** Temporary pocket-mapping debug overlay on the rotor. */
  showDebugVisual?: boolean;
  targetPocket?: RoulettePocket | null;
  /** Strip expensive SVG decoration layers — recommended for mobile. */
  performanceMode?: boolean;
  /** `baked` uses a pre-rendered SVG shell (default, fastest). `vector` uses procedural React layers. */
  renderMode?: "baked" | "vector";
  theme?: RouletteWheelTheme;
  children?: ReactNode;
  style?: CSSProperties & {
    "--roulette-wheel-size"?: string;
  };
};

export type RouletteWheelArtProps = {
  wheelRotation?: number;
  ballPosition?: RoulettePoint;
  /** @deprecated Use `ballPosition` */
  ballAngle?: number;
  /** @deprecated Use `ballPosition` */
  ballDropOffset?: number;
  ballBounceScale?: number;
  ballBounceLift?: number;
  showBall?: boolean;
  showDebugVisual?: boolean;
  targetPocket?: RoulettePocket | null;
  theme?: RouletteWheelTheme;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type RouletteWheelLayerProps = {
  className?: string;
};
