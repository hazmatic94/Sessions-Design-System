import type { ReactNode } from "react";
import type { GameHeaderRailProps } from "../GameHeaderRail/index.js";
import type { HiLoBettingPanelProps } from "../HiLoBettingPanel/index.js";
import type { NavigationProps } from "../Navigation.js";
export type FullGameShellProps = Omit<NavigationProps, "children"> & {
    children?: ReactNode;
    game?: GameHeaderRailProps["game"];
    gameIcon?: GameHeaderRailProps["gameIcon"];
    fairPlayLabel?: GameHeaderRailProps["rightLabel"];
    gameHeaderRail?: ReactNode;
    bettingPanel?: ReactNode;
    bettingPanelProps?: HiLoBettingPanelProps;
    className?: string;
};
export type GameShellProps = FullGameShellProps;
export type AppShellProps = Omit<NavigationProps, "children"> & {
    children?: ReactNode;
    className?: string;
    mobileAfter?: ReactNode;
};
export type GameChromeShellProps = AppShellProps;
export type GameInnerProps = {
    children?: ReactNode;
    game?: GameHeaderRailProps["game"];
    gameIcon?: GameHeaderRailProps["gameIcon"];
    fairPlayLabel?: GameHeaderRailProps["rightLabel"];
    gameHeaderRail?: ReactNode;
    bettingPanel?: ReactNode;
    bettingPanelProps?: HiLoBettingPanelProps;
    className?: string;
    renderMobileBetting?: boolean;
};
//# sourceMappingURL=GameShell.types.d.ts.map