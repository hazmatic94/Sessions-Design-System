import { BettingPanel } from "../BettingPanel/index.js";
import styles from "./CrashBettingPanel.module.css";
import type { CrashBettingPanelProps } from "./CrashBettingPanel.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CrashBettingPanel({ className = "", ...props }: CrashBettingPanelProps) {
  return <BettingPanel {...props} className={cx(styles.root, "joker-crash-betting-panel", className)} />;
}
