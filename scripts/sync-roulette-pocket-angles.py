#!/usr/bin/env python3
"""Sync measured pocket centre angles + ball landing radii from SVG label geometry."""
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATHS_TS = ROOT / "src/components/RouletteWheel/rouletteWheelPaths.ts"
OUT = ROOT / "src/components/RouletteWheel/rouletteWheelPocketAngles.ts"

EUROPEAN = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
    14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]
TRACK = 318
POINTER = -90
CX, CY = 557.611, 595.611


def extract_array(name: str) -> list[str]:
    text = PATHS_TS.read_text()
    match = re.search(rf'export const {name}: string\[\] = \[(.*?)\];', text, re.S)
    return re.findall(r'"([^"]+)"', match.group(1)) if match else []


def centroid(path: str) -> tuple[float, float]:
    nums = [float(x) for x in re.findall(r"-?\d*\.?\d+", path)]
    xs, ys = nums[0::2], nums[1::2]
    x, y = sum(xs) / len(xs), sum(ys) / len(ys)
    angle = math.degrees(math.atan2(y - CY, x - CX))
    radius = math.hypot(x - CX, y - CY)
    return angle, radius


def build_pocket_clusters() -> list[dict]:
    pockets: list[dict] = []
    for color, name in [
        ("red", "ROULETTE_POCKET_RED_PATHS"),
        ("black", "ROULETTE_POCKET_BLACK_PATHS"),
        ("green", "ROULETTE_POCKET_GREEN_PATHS"),
    ]:
        for path in extract_array(name):
            angle, radius = centroid(path)
            pockets.append({"color": color, "angle": angle, "radius": radius})

    pockets.sort(key=lambda pocket: (pocket["angle"] - POINTER) % 360)

    clusters: list[dict] = []
    for pocket in pockets:
        if (
            not clusters
            or ((pocket["angle"] - clusters[-1]["angle"] + 180) % 360) - 180 > 3.2
        ):
            clusters.append(
                {
                    "angle": pocket["angle"],
                    "radius": pocket["radius"],
                    "colors": {pocket["color"]: 1},
                    "n": 1,
                    "label_paths": [],
                }
            )
        else:
            cluster = clusters[-1]
            count = cluster["n"] + 1
            cluster["angle"] = (cluster["angle"] * cluster["n"] + pocket["angle"]) / count
            cluster["radius"] = (cluster["radius"] * cluster["n"] + pocket["radius"]) / count
            cluster["colors"][pocket["color"]] = cluster["colors"].get(pocket["color"], 0) + 1
            cluster["n"] = count

    if len(clusters) == 36:
        gaps = [
            ((clusters[(index + 1) % 36]["angle"] - clusters[index]["angle"]) % 360, index)
            for index in range(36)
        ]
        gap, after = max(gaps)
        angle = (clusters[after]["angle"] + gap / 2) % 360
        radius = (clusters[after]["radius"] + clusters[(after + 1) % 36]["radius"]) / 2
        clusters.insert(
            after + 1,
            {
                "angle": angle,
                "radius": radius,
                "colors": {"black": 1},
                "n": 1,
                "label_paths": [],
            },
        )
        clusters.sort(key=lambda cluster: (cluster["angle"] - POINTER) % 360)

    if len(clusters) != 37:
        raise RuntimeError(f"Expected 37 pocket clusters, found {len(clusters)}")

    return clusters


def assign_label_positions(clusters: list[dict]) -> None:
    number_paths = extract_array("ROULETTE_NUMBER_PATHS")
    for index, path in enumerate(number_paths):
        angle, radius = centroid(path)
        cluster_index = min(
            range(len(clusters)),
            key=lambda slot: abs(((angle - clusters[slot]["angle"] + 180) % 360) - 180),
        )
        clusters[cluster_index]["label_paths"].append(
            {"index": index, "angle": angle, "radius": radius}
        )

    for cluster in clusters:
        labels = cluster["label_paths"]
        if not labels:
            cluster["label_radius"] = cluster["radius"] + 45
            continue

        zero_path = next((label for label in labels if label["index"] == 0), None)
        if zero_path is not None:
            cluster["label_angle"] = zero_path["angle"]
            cluster["label_radius"] = zero_path["radius"]
            continue

        cluster["label_angle"] = sum(label["angle"] for label in labels) / len(labels)
        cluster["label_radius"] = sum(label["radius"] for label in labels) / len(labels)


def pocket_order_offset(clusters: list[dict]) -> int:
    for index, cluster in enumerate(clusters):
        if any(label["index"] == 0 for label in cluster["label_paths"]):
            return index
    raise RuntimeError("Could not locate the 0 label path in pocket clusters")


def cluster_center_angle(cluster: dict) -> float:
    if "label_angle" in cluster:
        return cluster["label_angle"]
    return cluster["angle"]


def main() -> None:
    clusters = build_pocket_clusters()
    assign_label_positions(clusters)
    svg_offset = pocket_order_offset(clusters)

    center_angles: list[float] = []
    landing_radii: list[float] = []
    for index in range(37):
        cluster = clusters[(index - svg_offset) % 37]
        center_angles.append(round(cluster_center_angle(cluster), 4))
        landing = TRACK + (cluster["label_radius"] - TRACK) * 0.35
        landing_radii.append(round(landing, 3))

    landing = round(sum(landing_radii) / 37, 3)

    OUT.write_text(
        "\n".join(
            [
                "// Auto-generated by scripts/sync-roulette-pocket-angles.py",
                f"export const ROULETTE_SVG_POCKET_OFFSET = {svg_offset};",
                f"export const ROULETTE_BALL_LANDING_RADIUS = {landing};",
                f"export const ROULETTE_BALL_TRACK_TO_POCKET_OFFSET = {round(landing - TRACK, 3)};",
                "",
                "/** Measured pocket centre angles (degrees, SVG space) per EUROPEAN_ROULETTE_NUMBERS index. */",
                f"export const ROULETTE_POCKET_CENTER_ANGLES = {json.dumps(center_angles)} as const;",
                "",
                "/** Ball landing radius per pocket once it drops off the track. */",
                f"export const ROULETTE_BALL_LANDING_RADII = {json.dumps(landing_radii)} as const;",
                "",
            ]
        )
    )

    js_out = ROOT / "src/utils/rouletteWheelPocketAngles.js"
    js_out.write_text(
        "\n".join(
            [
                "// Auto-generated by scripts/sync-roulette-pocket-angles.py",
                f"export const ROULETTE_POCKET_CENTER_ANGLES = {json.dumps(center_angles)};",
                f"export const ROULETTE_BALL_LANDING_RADII = {json.dumps(landing_radii)};",
                f"export const ROULETTE_BALL_LANDING_RADIUS = {landing};",
                f"export const ROULETTE_BALL_TRACK_TO_POCKET_OFFSET = {round(landing - TRACK, 3)};",
                f"export const ROULETTE_BALL_TRACK_RADIUS = {TRACK};",
                "",
            ]
        )
    )
    print(f"Wrote {OUT} and {js_out} (svg_offset={svg_offset})")


if __name__ == "__main__":
    main()
