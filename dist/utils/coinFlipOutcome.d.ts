export type CoinFlipSide = "heads" | "tails";
export declare const COIN_FLIP_DEFAULT_RTP = 0.96;
export declare const COIN_FLIP_EVEN_MONEY_PAYOUT = 2;
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
export declare function getCoinFlipWinProbability(rtp?: number, payoutMultiplier?: number): number;
/** Resolve a single coin-flip result. Animation should always land on `landingSide`. */
export declare function resolveCoinFlipOutcome({ betSide, rtp, payoutMultiplier, random, }: ResolveCoinFlipOutcomeOptions): CoinFlipResolvedOutcome;
//# sourceMappingURL=coinFlipOutcome.d.ts.map