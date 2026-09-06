import type { HTMLAttributes, ReactNode } from "react";
import type { ViewMarketsProps } from "../ViewMarkets/ViewMarkets.types";

export type UpcomingMatchTeam = {
  name: string;
  logoSrc: string;
  logoAlt?: string;
};

export type UpcomingMatchesProps = HTMLAttributes<HTMLDivElement> & {
  date: ReactNode;
  time: ReactNode;
  teams: [UpcomingMatchTeam, UpcomingMatchTeam];
  viewMarketsLabel?: ViewMarketsProps["children"];
  onViewMarkets?: ViewMarketsProps["onClick"];
};
