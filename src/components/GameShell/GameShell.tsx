import type { ReactNode } from "react";
import { GameFooterRail } from "../GameFooterRail/index.js";
import { GameHeaderRail } from "../GameHeaderRail/index.js";
import { HiLoBettingPanel } from "../HiLoBettingPanel/index.js";
import { Navigation } from "../Navigation.js";
import { navigationItemRegistry } from "../../data/navigationData.js";
import styles from "./GameShell.module.css";
import type { AppShellProps, FullGameShellProps, GameInnerProps } from "./GameShell.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AppShell({
  children,
  className = "",
  defaultValue = "hilo",
  mobileAfter,
  ...navigationProps
}: AppShellProps) {
  return (
    <div className={cx(styles.shell, "joker-game-shell", className)}>
      <Navigation {...navigationProps} defaultValue={defaultValue} className="joker-game-shell-navigation">
        <div className={cx(styles.pageWrapper, "joker-page-wrapper")}>
          {children}
        </div>
        {mobileAfter && (
          <div className={cx(styles.mobilePagePanel, "joker-mobile-page-panel")}>
            {mobileAfter}
          </div>
        )}
      </Navigation>
    </div>
  );
}

export const GameChromeShell = AppShell;

export function GameInner({
  children,
  game,
  gameIcon,
  fairPlayLabel,
  gameHeaderRail,
  bettingPanel,
  bettingPanelProps,
  className = "",
  renderMobileBetting = true,
}: GameInnerProps) {
  const resolvedBettingPanel = bettingPanel ?? <HiLoBettingPanel {...bettingPanelProps} />;

  return (
    <div className={cx(styles.innerFrame, "joker-game-inner-frame", className)}>
      <main className={cx(styles.inner, "joker-game-inner joker-game-shell-stage")} aria-label="Game stage">
        {gameHeaderRail ?? (
          <GameHeaderRail game={game ?? navigationItemRegistry.hilo} gameIcon={gameIcon} rightLabel={fairPlayLabel} />
        )}
        <div className={cx(styles.layout, "joker-game-inner-layout joker-game-shell-play-area")}>
          <aside
            className={cx(
              styles.betting,
              "joker-game-inner-betting joker-game-shell-betting",
              !renderMobileBetting && styles.hideMobileBetting,
            )}
            aria-label="Betting panel"
          >
            {resolvedBettingPanel}
          </aside>
          <div className={cx(styles.canvas, "joker-game-inner-canvas joker-game-shell-empty-stage")} aria-label="Game canvas">
            {children}
          </div>
        </div>
        <GameFooterRail />
      </main>
    </div>
  );
}

export function FullGameShell({
  children,
  game,
  gameIcon,
  fairPlayLabel,
  gameHeaderRail,
  bettingPanel,
  bettingPanelProps,
  className = "",
  defaultValue = "hilo",
  ...navigationProps
}: FullGameShellProps) {
  return (
    <AppShell
      {...navigationProps}
      defaultValue={defaultValue}
      className={className}
    >
      <GameInner
        game={game}
        gameIcon={gameIcon}
        fairPlayLabel={fairPlayLabel}
        gameHeaderRail={gameHeaderRail}
        bettingPanel={bettingPanel}
        bettingPanelProps={bettingPanelProps}
      >
        {children}
      </GameInner>
    </AppShell>
  );
}

export const GameShell = FullGameShell;
