export function mergeTileStackStyle(stackIndex, style) {
    if (stackIndex == null) {
        return style;
    }
    return {
        ...style,
        "--tile-stack-index": stackIndex,
    };
}
/** Earlier tiles get a higher stack so overflow (e.g. win multipliers) stays visible in grids. */
export function getTileStackIndex(index, total) {
    return total - index;
}
