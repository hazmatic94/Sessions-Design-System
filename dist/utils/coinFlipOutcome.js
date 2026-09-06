export const COIN_FLIP_DEFAULT_RTP = 0.96;
export const COIN_FLIP_EVEN_MONEY_PAYOUT = 2;
export function getCoinFlipWinProbability(rtp = COIN_FLIP_DEFAULT_RTP, payoutMultiplier = COIN_FLIP_EVEN_MONEY_PAYOUT) {
    return Math.min(1, Math.max(0, rtp / payoutMultiplier));
}
/** Resolve a single coin-flip result. Animation should always land on `landingSide`. */
export function resolveCoinFlipOutcome({ betSide, rtp = COIN_FLIP_DEFAULT_RTP, payoutMultiplier = COIN_FLIP_EVEN_MONEY_PAYOUT, random = Math.random, }) {
    const winProbability = getCoinFlipWinProbability(rtp, payoutMultiplier);
    const playerWon = random() < winProbability;
    const landingSide = playerWon
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
