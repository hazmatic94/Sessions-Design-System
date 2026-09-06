import hiloCardTextureSrc from "../../../assets/hiloCardTexture.png";
import styles from "./GameCardMini.module.css";
import type { GameCardMiniProps } from "./GameCardMini.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GameCardMini({ children, className, ...props }: GameCardMiniProps) {
  return (
    <div
      {...props}
      className={cx(styles.root, "joker-game-card-mini", className)}
      aria-label={props["aria-label"] ?? "Game card mini"}
    >
      <div className={cx(styles.inner, "joker-game-card-mini__inner")}>
        <div className={cx(styles.surface, "joker-game-card-mini__surface")}>
          <div
            className={cx(styles.surfaceTexture, "joker-game-card-mini__surface-texture")}
            style={{ backgroundImage: `url(${hiloCardTextureSrc})` }}
            aria-hidden="true"
          />
          <div className={cx(styles.surfaceOverlay, "joker-game-card-mini__surface-overlay")} aria-hidden="true" />
          <div className={cx(styles.surfaceContent, "joker-game-card-mini__surface-content")}>
            <div className={cx(styles.contentFrame, "joker-game-card-mini__content-frame")}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
