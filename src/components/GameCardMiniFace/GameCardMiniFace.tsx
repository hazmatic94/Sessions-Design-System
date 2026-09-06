import { GameCardSuitIcon } from "../GameCardFace/GameCardFace.icons";
import type { GameCardFaceColor, GameCardFaceProps, GameCardRank, GameCardSuit } from "../GameCardFace/GameCardFace.types";
import styles from "./GameCardMiniFace.module.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const RED_SUITS = new Set<GameCardSuit>(["diamonds", "hearts"]);

function resolveColor(suit: GameCardSuit, color?: GameCardFaceColor): GameCardFaceColor {
  if (color) {
    return color;
  }

  return RED_SUITS.has(suit) ? "red" : "black";
}

function CornerMark({
  rank,
  suit,
  className,
}: {
  rank: GameCardRank;
  suit: GameCardSuit;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className={cx(styles.cornerRank, "joker-game-card-mini-face__corner-rank")}>{rank}</span>
      <GameCardSuitIcon
        suit={suit}
        className={cx(
          styles.cornerSuit,
          "joker-game-card-mini-face__corner-suit",
          "joker-game-card-mini-face__suit",
          `joker-game-card-mini-face__suit--${suit}`,
        )}
      />
    </div>
  );
}

export function GameCardMiniFace({ rank, suit, color, className, ...props }: GameCardFaceProps) {
  const resolvedColor = resolveColor(suit, color);

  return (
    <div
      {...props}
      className={cx(
        styles.root,
        "joker-game-card-mini-face",
        resolvedColor === "red" && styles.red,
        resolvedColor === "red" && "joker-game-card-mini-face--red",
        className,
      )}
      aria-label={props["aria-label"] ?? `${rank} of ${suit}`}
    >
      <CornerMark
        rank={rank}
        suit={suit}
        className={cx(styles.cornerTop, "joker-game-card-mini-face__corner", "joker-game-card-mini-face__corner--top")}
      />

      <div className={cx(styles.center, "joker-game-card-mini-face__center")}>
        <GameCardSuitIcon
          suit={suit}
          className={cx(styles.suit, "joker-game-card-mini-face__suit", `joker-game-card-mini-face__suit--${suit}`)}
        />
        <span className={cx(styles.rank, "joker-game-card-mini-face__rank")}>{rank}</span>
      </div>

      <CornerMark
        rank={rank}
        suit={suit}
        className={cx(styles.cornerBottom, "joker-game-card-mini-face__corner", "joker-game-card-mini-face__corner--bottom")}
      />
    </div>
  );
}
