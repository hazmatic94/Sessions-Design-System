import type { AppShellProps, FullGameShellProps, GameInnerProps } from "./GameShell.types.js";
export declare function AppShell({ children, className, defaultValue, mobileAfter, ...navigationProps }: AppShellProps): import("react").JSX.Element;
export declare const GameChromeShell: typeof AppShell;
export declare function GameInner({ children, game, gameIcon, fairPlayLabel, gameHeaderRail, bettingPanel, bettingPanelProps, className, renderMobileBetting, }: GameInnerProps): import("react").JSX.Element;
export declare function FullGameShell({ children, game, gameIcon, fairPlayLabel, gameHeaderRail, bettingPanel, bettingPanelProps, className, defaultValue, ...navigationProps }: FullGameShellProps): import("react").JSX.Element;
export declare const GameShell: typeof FullGameShell;
//# sourceMappingURL=GameShell.d.ts.map