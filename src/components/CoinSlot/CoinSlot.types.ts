import type { HTMLAttributes, ReactNode } from "react";

export type CoinSlotProps = HTMLAttributes<HTMLDivElement> & {
  /** Inner opening diameter in pixels. Matches Coin `--coin-size`. Defaults to 256. */
  size?: number;
  children?: ReactNode;
};
