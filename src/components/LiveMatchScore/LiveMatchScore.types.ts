import type { HTMLAttributes, ReactNode } from "react";

export type LiveMatchScoreTeam = {
  name: string;
  logoSrc: string;
  logoAlt?: string;
  score: ReactNode;
};

export type LiveMatchScoreProps = HTMLAttributes<HTMLDivElement> & {
  minutesPlayed: number;
  teams: [LiveMatchScoreTeam, LiveMatchScoreTeam];
};
