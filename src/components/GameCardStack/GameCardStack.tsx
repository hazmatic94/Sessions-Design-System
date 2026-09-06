import { GameCard } from "../GameCard/GameCard";
import styles from "./GameCardStack.module.css";
import type { GameCardStackProps } from "./GameCardStack.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GameCardStack({ children, className, ...props }: GameCardStackProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-game-card-stack", className)} aria-label={props["aria-label"] ?? "Game card stack"}>
      <div className={cx(styles.stack, "joker-game-card-stack__cards")}>
        <div
          className={cx(styles.hoverZone, styles.hoverZoneLeft, "joker-game-card-stack__hover-zone", "joker-game-card-stack__hover-zone--left")}
          aria-hidden="true"
        />
        <div
          className={cx(styles.hoverZone, styles.hoverZoneRight, "joker-game-card-stack__hover-zone", "joker-game-card-stack__hover-zone--right")}
          aria-hidden="true"
        />
        <div
          className={cx(styles.layer, styles.layerBack, "joker-game-card-stack__layer", "joker-game-card-stack__layer--back")}
          aria-hidden="true"
        >
          <GameCard />
        </div>
        <div
          className={cx(styles.layer, styles.layerMiddle, "joker-game-card-stack__layer", "joker-game-card-stack__layer--middle")}
          aria-hidden="true"
        >
          <GameCard />
        </div>
        <div className={cx(styles.layer, styles.layerFront, "joker-game-card-stack__layer", "joker-game-card-stack__layer--front")}>
          <GameCard>{children}</GameCard>
        </div>
      </div>
    </div>
  );
}
