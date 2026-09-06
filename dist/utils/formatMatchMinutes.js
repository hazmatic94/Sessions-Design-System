export function formatMatchMinutes(minutes) {
    const value = Math.max(0, Math.floor(minutes));
    return value === 1 ? "1 minute" : `${value} minutes`;
}
export function minutesPlayedFromKickoff(kickoffMs, nowMs = Date.now()) {
    return Math.max(0, Math.floor((nowMs - kickoffMs) / 60000));
}
