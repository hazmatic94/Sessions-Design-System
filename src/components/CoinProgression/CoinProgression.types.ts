import type { HTMLAttributes, ReactNode } from "react";

export type CoinProgressionStep = {
  multiplier: string;
};

export type CoinProgressionProps = HTMLAttributes<HTMLDivElement> & {
  steps: CoinProgressionStep[];
  /** Index of the current objective receiver. */
  activeIndex: number;
  /** Index of the last completed step, or -1 when none are complete. */
  completedThrough?: number;
  /** Step currently playing the win lock animation. */
  lockingIndex?: number | null;
  receiverSize?: number;
  /** Horizontal gap between steps (matches WinStreakRow). */
  gap?: number;
  onLockComplete?: (index: number) => void;
  renderCoin?: (index: number) => ReactNode;
};
