import type { HTMLAttributes } from "react";

export type GameCardSuit = "clubs" | "diamonds" | "hearts" | "spades";

export type GameCardRank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export type GameCardFaceColor = "black" | "red";

export type GameCardFaceProps = HTMLAttributes<HTMLDivElement> & {
  rank: GameCardRank;
  suit: GameCardSuit;
  color?: GameCardFaceColor;
};
