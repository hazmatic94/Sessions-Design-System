#!/usr/bin/env python3
"""Extract pocket and number paths from the original source SVG into rouletteWheelPaths.ts."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG = ROOT / "assets/roulette-wheel-source.svg"
OUT = ROOT / "src/components/RouletteWheel/rouletteWheelPaths.ts"


def fmt_array(name: str, items: list[str]) -> str:
    lines = [f"export const {name}: string[] = ["]
    for item in items:
        lines.append(f'  "{item}",')
    lines.append("];")
    return "\n".join(lines)


def main() -> None:
    svg = SVG.read_text()
    paths = re.findall(r'<path d="([^"]+)" fill="([^"]+)"(?: stroke="([^"]+)" stroke-width="([^"]+)")?', svg)

    pockets = {"red": [], "black": [], "green": []}
    numbers: list[str] = []

    for d, fill, *_ in paths:
        if fill == "#DB3E3E":
            pockets["red"].append(d)
        elif fill == "#212121":
            pockets["black"].append(d)
        elif fill == "#3EDA41":
            pockets["green"].append(d)
        elif fill == "white":
            numbers.append(d)

    content = "\n".join(
        [
            "// Auto-generated from assets/roulette-wheel-source.svg — do not edit pocket paths by hand.",
            "",
            "export const ROULETTE_WHEEL_VIEWBOX = { minX: 0, minY: 15, width: 1116, height: 1162 } as const;",
            "export const ROULETTE_WHEEL_CENTER = { x: 557.611, y: 595.611 } as const;",
            "export const ROULETTE_BOWL_CENTER = ROULETTE_WHEEL_CENTER;",
            "export const ROULETTE_BOWL_RADIUS = 300.16;",
            "export const ROULETTE_OUTER_RADIUS = 547.611;",
            "export const ROULETTE_BALL_TRACK_RADIUS = 318;",
            "",
            fmt_array("ROULETTE_POCKET_RED_PATHS", pockets["red"]),
            "",
            fmt_array("ROULETTE_POCKET_BLACK_PATHS", pockets["black"]),
            "",
            fmt_array("ROULETTE_POCKET_GREEN_PATHS", pockets["green"]),
            "",
            fmt_array("ROULETTE_NUMBER_PATHS", numbers),
            "",
            "export function buildRoulettePointerBodyPath(cx: number, cy: number, outerRadius: number) {",
            "  const topY = cy - outerRadius - 28;",
            "  const tipY = cy - outerRadius + 10;",
            "  const halfW = 46;",
            "  const tipHalfW = 14;",
            "  const r = 4;",
            "  const shoulderY = topY + 26;",
            "",
            "  return [",
            '    `M ${cx - halfW + r} ${topY}`,',
            '    `H ${cx + halfW - r}`,',
            '    `Q ${cx + halfW} ${topY} ${cx + halfW - 4} ${shoulderY}`,',
            '    `L ${cx + tipHalfW} ${tipY - r}`,',
            '    `Q ${cx} ${tipY} ${cx - tipHalfW} ${tipY - r}`,',
            '    `L ${cx - halfW + 4} ${shoulderY}`,',
            '    `Q ${cx - halfW} ${topY} ${cx - halfW + r} ${topY}`,',
            '    "Z",',
            "  ].join(\" \");",
            "}",
            "",
            "export const ROULETTE_POINTER_BODY_PATH = buildRoulettePointerBodyPath(",
            "  ROULETTE_WHEEL_CENTER.x,",
            "  ROULETTE_WHEEL_CENTER.y,",
            "  ROULETTE_OUTER_RADIUS,",
            ");",
            "",
        ]
    )

    OUT.write_text(content)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
