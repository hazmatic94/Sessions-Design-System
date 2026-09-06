import type { HTMLAttributes, ReactNode } from "react";

export type WinTileProps = HTMLAttributes<HTMLDivElement> & {
  /** When true, shows the revealed win tile with glistening gold border. Defaults to true. */
  revealed?: boolean;
  /** Initial revealed state for uncontrolled usage. Defaults to true. */
  defaultRevealed?: boolean;
  /** Win chip multiplier shown on reveal. Omit to hide the chip. */
  multiplier?: ReactNode;
  /** When false, reveal animation runs without the gold nugget sound. Defaults to true. */
  soundOnReveal?: boolean;
  /** Grid stack order. Higher values paint above neighboring tiles. */
  stackIndex?: number;
  onRevealedChange?: (revealed: boolean) => void;
};
