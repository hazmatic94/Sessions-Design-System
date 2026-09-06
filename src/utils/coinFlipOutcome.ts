export type CoinFlipSide = "heads" | "tails";

export const COIN_FLIP_DEFAULT_RTP = 0.96;
export const COIN_FLIP_EVEN_MONEY_PAYOUT = 2;

export type ResolveCoinFlipOutcomeOptions = {
  betSide: CoinFlipSide;
  /** Target return-to-player ratio (0–1). Defaults to 96%. */
  rtp?: number;
  /** Win payout multiplier on the stake. Defaults to 2× even money. */
  payoutMultiplier?: number;
  random?: () => number;
};

export type CoinFlipResolvedOutcome = {
  /** Face the coin should land on — always matches animation end rotation. */
  landingSide: CoinFlipSide;
  playerWon: boolean;
  /** Calibrated win chance for the supplied RTP and payout. */
  winProbability: number;
};

export function getCoinFlipWinProbability(
  rtp = COIN_FLIP_DEFAULT_RTP,
  payoutMultiplier = COIN_FLIP_EVEN_MONEY_PAYOUT,
) {
  return Math.min(1, Math.max(0, rtp / payoutMultiplier));
}

/** Resolve a single coin-flip result. Animation should always land on `landingSide`. */
export function resolveCoinFlipOutcome({
  betSide,
  rtp = COIN_FLIP_DEFAULT_RTP,
  payoutMultiplier = COIN_FLIP_EVEN_MONEY_PAYOUT,
  random = Math.random,
}: ResolveCoinFlipOutcomeOptions): CoinFlipResolvedOutcome {
  const winProbability = getCoinFlipWinProbability(rtp, payoutMultiplier);
  const playerWon = random() < winProbability;
  const landingSide: CoinFlipSide = playerWon
    ? betSide
    : betSide === "heads"
      ? "tails"
      : "heads";

  return {
    landingSide,
    playerWon,
    winProbability,
  };
}
