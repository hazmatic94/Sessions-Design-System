import type { HTMLAttributes, ReactNode } from "react";

export type CoinSide = "heads" | "tails" | "joker";

export type CoinTossOutcome = "heads" | "tails";
export type CoinTossPhase = "idle" | "tossing";

export type CoinProps = HTMLAttributes<HTMLDivElement> & {
  side?: CoinSide;
  /** When set, renders a tossable heads/tails coin with 3D thumb-flip animation. */
  tossPhase?: CoinTossPhase;
  tossOutcome?: CoinTossOutcome;
  onTossEnd?: () => void;
  tossDurationMs?: number;
  /** Optional toss arena width in pixels. Defaults to the coin size (`--coin-size`). */
  stageSizePx?: number;
  /** Renders inside the playfield, 16px above the coin (e.g. "Tap to flip"). */
  tapHint?: ReactNode;
  tapHintVisible?: boolean;
};

export type CoinTossableProps = Omit<HTMLAttributes<HTMLDivElement>, "side"> & {
  side?: CoinTossOutcome;
  tossPhase?: CoinTossPhase;
  tossOutcome?: CoinTossOutcome;
  onTossEnd?: () => void;
  tossDurationMs?: number;
  /** Optional toss arena width in pixels. Defaults to the coin size (`--coin-size`). */
  stageSizePx?: number;
  tapHint?: ReactNode;
  tapHintVisible?: boolean;
  /** Play whoosh/flip sounds during the toss. Defaults to true. */
  soundEnabled?: boolean;
};
