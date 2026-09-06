const BET_COLORS = ["red", "black", "green"];
const MULTIPLIERS = ["2.00x", "3.00x", "5.00x", "8.00x", "10.00x", "15.00x", "20.00x"];
/** Varied preset for docs and static previews. */
export const SAMPLE_WIN_STREAK_WINS = [
    { betColor: "red", multiplier: "3.00x" },
    { betColor: "black", multiplier: "8.00x" },
    { betColor: "green", multiplier: "2.00x" },
    { betColor: "red", multiplier: "5.00x" },
    { betColor: "black", multiplier: "10.00x" },
];
export function createRandomWinStreakWins(slotCount = 5) {
    return Array.from({ length: slotCount }, (_, index) => ({
        betColor: BET_COLORS[Math.floor(Math.random() * BET_COLORS.length)],
        multiplier: MULTIPLIERS[(index + Math.floor(Math.random() * MULTIPLIERS.length)) % MULTIPLIERS.length],
    }));
}
