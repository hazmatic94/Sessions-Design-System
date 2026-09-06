import { GameCardSuitIcon } from "./GameCardFace.icons";
import styles from "./GameCardFace.module.css";
import type { GameCardFaceColor, GameCardFaceProps, GameCardRank, GameCardSuit } from "./GameCardFace.types";

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
      <span className={cx(styles.cornerRank, "joker-game-card-face__corner-rank")}>{rank}</span>
      <GameCardSuitIcon
        suit={suit}
        className={cx(
          styles.cornerSuit,
          "joker-game-card-face__corner-suit",
          "joker-game-card-face__suit",
          `joker-game-card-face__suit--${suit}`,
        )}
      />
    </div>
  );
}

export function GameCardFace({ rank, suit, color, className, ...props }: GameCardFaceProps) {
  const resolvedColor = resolveColor(suit, color);

  return (
    <div
      {...props}
      className={cx(
        styles.root,
        "joker-game-card-face",
        resolvedColor === "red" && styles.red,
        resolvedColor === "red" && "joker-game-card-face--red",
        className,
      )}
      aria-label={props["aria-label"] ?? `${rank} of ${suit}`}
    >
      <CornerMark
        rank={rank}
        suit={suit}
        className={cx(styles.cornerTop, "joker-game-card-face__corner", "joker-game-card-face__corner--top")}
      />

      <div className={cx(styles.center, "joker-game-card-face__center")}>
        <span className={cx(styles.rank, "joker-game-card-face__rank")}>{rank}</span>
        <GameCardSuitIcon
          suit={suit}
          className={cx(styles.suit, "joker-game-card-face__suit", `joker-game-card-face__suit--${suit}`)}
        />
      </div>

      <CornerMark
        rank={rank}
        suit={suit}
        className={cx(styles.cornerBottom, "joker-game-card-face__corner", "joker-game-card-face__corner--bottom")}
      />
    </div>
  );
}
