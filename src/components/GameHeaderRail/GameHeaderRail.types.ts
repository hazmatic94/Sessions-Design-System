import type { ReactNode } from "react";

export type GameHeaderRailGame = {
  label: ReactNode;
  icon?: string;
};

export type GameHeaderRailProps = {
  game?: ReactNode | GameHeaderRailGame;
  gameIcon?: string;
  rightLabel?: ReactNode;
  rightIcon?: string;
  className?: string;
};
