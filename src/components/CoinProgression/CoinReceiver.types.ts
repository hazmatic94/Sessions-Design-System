import type { HTMLAttributes, ReactNode } from "react";

export type CoinReceiverState = "inactive" | "active" | "completed" | "loss";

export type CoinReceiverLockPhase = "idle" | "chipRising" | "celebrating" | "sealed";

export type CoinReceiverLossPhase =
  | "idle"
  | "pressing"
  | "flashing"
  | "splitting"
  | "charcoal"
  | "settling"
  | "sealed";

export type CoinReceiverProps = HTMLAttributes<HTMLDivElement> & {
  /** Receiver diameter in pixels. Defaults to 88. */
  size?: number;
  state?: CoinReceiverState;
  /** Plays coin enter, then green chip rise onto coin bottom. */
  locking?: boolean;
  onLockComplete?: () => void;
  onLockPhaseChange?: (phase: CoinReceiverLockPhase) => void;
  /** Plays coin fade, smoke burst, then red sealed resting state. */
  losing?: boolean;
  onLossComplete?: () => void;
  onLossPhaseChange?: (phase: CoinReceiverLossPhase) => void;
  /** Play lock/loss stings during animations. Defaults to true. */
  soundEnabled?: boolean;
  children?: ReactNode;
};
