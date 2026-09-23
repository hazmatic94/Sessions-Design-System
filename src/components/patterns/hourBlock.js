import { applySessionsHourLabel, renderSessionsHourLabel } from "./hourLabel.js";
import { HOUR_COUNT, resolveHourTime } from "./hourTime.js";

export const HOUR_BLOCK_COUNT = HOUR_COUNT;
export const resolveHourBlock = resolveHourTime;
export const renderSessionsHourBlock = renderSessionsHourLabel;
export const applySessionsHourBlock = applySessionsHourLabel;

export function setupSessionsHourBlocks() {}
