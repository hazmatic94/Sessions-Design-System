import hiloCardTextureSrc from "../../../assets/hiloCardTexture.png";
import styles from "./GameCard.module.css";
import type { GameCardProps } from "./GameCard.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GameCard({ children, className, ...props }: GameCardProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-game-card", className)} aria-label={props["aria-label"] ?? "Game card"}>
      <div className={cx(styles.inner, "joker-game-card__inner")}>
        <div className={cx(styles.surface, "joker-game-card__surface")}>
          <div
            className={cx(styles.surfaceTexture, "joker-game-card__surface-texture")}
            style={{ backgroundImage: `url(${hiloCardTextureSrc})` }}
            aria-hidden="true"
          />
          <div className={cx(styles.surfaceOverlay, "joker-game-card__surface-overlay")} aria-hidden="true" />
          <div className={cx(styles.surfaceContent, "joker-game-card__surface-content")}>
            <div className={cx(styles.contentFrame, "joker-game-card__content-frame")}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
