#!/usr/bin/env python3
"""Bake a layered roulette-wheel.svg with a full pocket ring for React + docs."""
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
paths_ts = (ROOT / "src/components/RouletteWheel/rouletteWheelPaths.ts").read_text()
colors_ts = (ROOT / "src/components/RouletteWheel/rouletteWheelColors.ts").read_text()
layout_ts = (ROOT / "src/components/RouletteWheel/rouletteWheelLayout.ts").read_text()


def extract_hex(name: str) -> str:
    match = re.search(rf"{name}: \"(#[0-9a-fA-F]+)\"", colors_ts)
    if not match:
        raise KeyError(f"Missing ROULETTE_WHEEL_HEX.{name}")
    return match.group(1)


C = {key: extract_hex(key) for key in [
    "white", "black",
    "pocketRedLight", "pocketRed", "pocketRedDark",
    "pocketBlackLight", "pocketBlack", "pocketBlackDark",
    "pocketGreenLight", "pocketGreen", "pocketGreenDark",
    "goldLip0", "goldLip22", "goldLip55", "goldLip82", "goldLip100",
    "bronzeWall0", "bronzeWall45", "bronzeWall100",
    "track0", "track35", "track68", "track100",
    "bowl0", "bowl58", "bowl100",
    "spindle0", "spindle55", "spindle100",
    "spindleCap0", "spindleCap55", "spindleCap100",
    "pointerFill", "pointerOutline",
    "rimShadow", "rimBaseMid", "rimBaseInner", "rimBaseOuter", "rimBaseOuter",
    "rimGoldTopEdge", "rimGoldTop", "rimGoldUpper", "rimGoldMid", "rimGoldLower", "rimGoldBottom",
    "rimEdgeLight", "rimEdgeBottom",
    "groove", "bowlRim",
    "goldAmbientShadow", "bronzeShadow", "number",
]}

cx, cy = 557.611, 595.611
bx, by = cx, cy
lx, ly = cx - 48, cy - 56
outer_r, bowl_r, track_r = 547.611, 300.16, 318
frame_outer_r = outer_r + 16
pocket_outer_r = outer_r - 28
pocket_inner_r = track_r + 17
rim_width = 22
track_depth = 16
outer_track_inner = pocket_outer_r + 2
outer_track_outer = frame_outer_r - rim_width - 2

POINTER_WIDTH = 91
POINTER_HEIGHT = 75.4
POINTER_CORNER_RADIUS = 14
POINTER_BORDER_WIDTH = 6
POINTER_OFFSET_Y = -20

EUROPEAN_ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
    14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]
POCKET_COUNT = len(EUROPEAN_ROULETTE_NUMBERS)
POCKET_STEP = 360 / POCKET_COUNT
HALF_SEGMENT_ANGLE = POCKET_STEP / 2
POINTER_ANGLE = -90
POCKET_BASE_ANGLE = POINTER_ANGLE - HALF_SEGMENT_ANGLE
NUMBER_TRACK_DEPTH = 92
NUMBER_TRACK_INNER_RADIUS = pocket_outer_r - NUMBER_TRACK_DEPTH
LABEL_RADIUS = pocket_outer_r - NUMBER_TRACK_DEPTH / 2 + 2
POCKET_WALL_DEPTH = 9
WELL_FLOOR_INSET = 4
POCKET_NUMBER_FONT_SIZE = 42
LOWER_ARC_START = 8
LOWER_ARC_END = 172
DIVIDER_SHADOW_OFFSET_DEG = 0.65
POCKET_BORDER_COLOR = "var(--roulette-pocket-divider)"
POCKET_BORDER_WIDTH = 2
RED_NUMBERS = {1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36}


def polar_to_cartesian(center_x: float, center_y: float, radius: float, angle_deg: float) -> tuple[float, float]:
    radians = math.radians(angle_deg)
    return center_x + math.cos(radians) * radius, center_y + math.sin(radians) * radius


def build_sector_band_path(
    start_angle: float, end_angle: float, inner_r: float, outer_r: float,
) -> str:
    inner_start = polar_to_cartesian(cx, cy, inner_r, start_angle)
    outer_start = polar_to_cartesian(cx, cy, outer_r, start_angle)
    outer_end = polar_to_cartesian(cx, cy, outer_r, end_angle)
    inner_end = polar_to_cartesian(cx, cy, inner_r, end_angle)
    sweep = ((end_angle - start_angle) % 360 + 360) % 360
    large_arc = 1 if sweep > 180 else 0
    return (
        f"M {inner_start[0]:.3f} {inner_start[1]:.3f} "
        f"L {outer_start[0]:.3f} {outer_start[1]:.3f} "
        f"A {outer_r} {outer_r} 0 {large_arc} 1 {outer_end[0]:.3f} {outer_end[1]:.3f} "
        f"L {inner_end[0]:.3f} {inner_end[1]:.3f} "
        f"A {inner_r} {inner_r} 0 {large_arc} 0 {inner_start[0]:.3f} {inner_start[1]:.3f} Z"
    )


def build_circular_arc_path(
    center_x: float, center_y: float, radius: float, start_angle: float, end_angle: float,
) -> str:
    start = polar_to_cartesian(center_x, center_y, radius, start_angle)
    end = polar_to_cartesian(center_x, center_y, radius, end_angle)
    sweep = ((end_angle - start_angle) % 360 + 360) % 360
    large_arc = 1 if sweep > 180 else 0
    return (
        f"M {start[0]:.3f} {start[1]:.3f} "
        f"A {radius} {radius} 0 {large_arc} 1 {end[0]:.3f} {end[1]:.3f}"
    )


def is_lower_hemisphere(angle_deg: float) -> bool:
    angle = ((angle_deg % 360) + 360) % 360
    return LOWER_ARC_START <= angle <= LOWER_ARC_END


def pocket_fill(value: int) -> str:
    if value == 0:
        return "url(#rw-green)"
    if value in RED_NUMBERS:
        return "url(#rw-red)"
    return "url(#rw-black)"


def build_pockets() -> list[dict]:
    pockets = []
    for index, value in enumerate(EUROPEAN_ROULETTE_NUMBERS):
        start_angle = POCKET_BASE_ANGLE + index * POCKET_STEP
        end_angle = start_angle + POCKET_STEP
        center_angle = start_angle + POCKET_STEP / 2
        label_x, label_y = polar_to_cartesian(cx, cy, LABEL_RADIUS, center_angle)
        pockets.append({
            "index": index,
            "value": value,
            "start_angle": start_angle,
            "end_angle": end_angle,
            "center_angle": center_angle,
            "label_x": label_x,
            "label_y": label_y,
        })
    return pockets


POCKETS = build_pockets()
wall_outer = pocket_inner_r + POCKET_WALL_DEPTH
well_outer = NUMBER_TRACK_INNER_RADIUS - WELL_FLOOR_INSET
well_inner = wall_outer + 2


def build_baked_pocket_ring() -> dict[str, str]:
    inset: list[str] = []
    wells: list[str] = []
    number_track: list[str] = []
    side_walls: list[str] = []
    well_ribs: list[str] = []
    numbers: list[str] = []
    outline: list[str] = []

    well_lower = ""

    outline.append(
        f'<circle cx="{cx}" cy="{cy}" r="{pocket_outer_r}" fill="none" '
        f'stroke="{POCKET_BORDER_COLOR}" stroke-width="{POCKET_BORDER_WIDTH}" vector-effect="non-scaling-stroke"/>'
    )
    outline.append(
        f'<circle cx="{cx}" cy="{cy}" r="{pocket_inner_r}" fill="none" '
        f'stroke="var(--roulette-pocket-fret-shadow)" stroke-width="2" opacity="0.35" vector-effect="non-scaling-stroke"/>'
    )

    for pocket in POCKETS:
        fill = pocket_fill(pocket["value"])
        band = build_sector_band_path(pocket["start_angle"], pocket["end_angle"], well_inner, well_outer)
        inset.append(f'<path d="{band}" fill="{fill}"/>')
        number_track.append(
            f'<path d="{build_sector_band_path(pocket["start_angle"], pocket["end_angle"], NUMBER_TRACK_INNER_RADIUS, pocket_outer_r)}" fill="{fill}"/>'
        )
        side_walls.append(
            f'<path d="{build_sector_band_path(pocket["start_angle"], pocket["end_angle"], pocket_inner_r, wall_outer)}" '
            f'fill="url(#rw-bronze)" opacity="0.2"/>'
        )

        divider_inner = polar_to_cartesian(cx, cy, pocket_inner_r, pocket["start_angle"])
        divider_outer = polar_to_cartesian(cx, cy, pocket_outer_r, pocket["start_angle"])
        well_div_inner = polar_to_cartesian(cx, cy, well_inner, pocket["start_angle"])
        well_div_outer = polar_to_cartesian(cx, cy, well_outer, pocket["start_angle"])
        outline.append(
            f'<line x1="{well_div_inner[0]:.3f}" y1="{well_div_inner[1]:.3f}" '
            f'x2="{well_div_outer[0]:.3f}" y2="{well_div_outer[1]:.3f}" stroke="{POCKET_BORDER_COLOR}" '
            f'stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>'
        )
        outline.append(
            f'<line x1="{divider_inner[0]:.3f}" y1="{divider_inner[1]:.3f}" '
            f'x2="{divider_outer[0]:.3f}" y2="{divider_outer[1]:.3f}" stroke="{POCKET_BORDER_COLOR}" '
            f'stroke-width="{POCKET_BORDER_WIDTH}" stroke-linecap="butt" vector-effect="non-scaling-stroke"/>'
        )

        numbers.append(
            f'<g transform="rotate({pocket["center_angle"] + 90:.4f}, {pocket["label_x"]:.3f}, {pocket["label_y"]:.3f})">'
            f'<text class="joker-roulette-wheel__number" data-pocket-value="{pocket["value"]}" '
            f'x="{pocket["label_x"]:.3f}" y="{pocket["label_y"]:.3f}" fill="var(--roulette-number)" '
            f'font-size="{POCKET_NUMBER_FONT_SIZE}" font-weight="700" font-family="var(--font)" '
            f'letter-spacing="-0.02em" text-anchor="middle" dominant-baseline="central" '
            f'paint-order="stroke fill" stroke="color-mix(in srgb, var(--joker-black-900) 78%, transparent)" '
            f'stroke-width="0.7" vector-effect="non-scaling-stroke">{pocket["value"]}</text>'
            f"</g>"
        )

    return {
        "inset": "".join(inset),
        "wells": "".join(wells),
        "number_track": "".join(number_track),
        "side_walls": "".join(side_walls),
        "well_ribs": "".join(well_ribs),
        "well_lower": well_lower,
        "numbers": "".join(numbers),
        "outline": "".join(outline),
    }


def _point_along_vertex(from_x, from_y, vertex_x, vertex_y, distance):
    dx = from_x - vertex_x
    dy = from_y - vertex_y
    length = (dx * dx + dy * dy) ** 0.5 or 1
    return vertex_x + (dx / length) * distance, vertex_y + (dy / length) * distance


def _build_rounded_triangle_path(cx_, tip_y, base_y, half_base, corner_radius):
    r = min(corner_radius, half_base - 2, (tip_y - base_y) / 2 - 1)
    left_base = (cx_ - half_base, base_y)
    right_base = (cx_ + half_base, base_y)
    tip = (cx_, tip_y)

    left_from_tip = _point_along_vertex(tip[0], tip[1], left_base[0], left_base[1], r)
    left_from_right = _point_along_vertex(right_base[0], right_base[1], left_base[0], left_base[1], r)
    right_from_left = _point_along_vertex(left_base[0], left_base[1], right_base[0], right_base[1], r)
    right_from_tip = _point_along_vertex(tip[0], tip[1], right_base[0], right_base[1], r)
    tip_from_right = _point_along_vertex(right_base[0], right_base[1], tip[0], tip[1], r)
    tip_from_left = _point_along_vertex(left_base[0], left_base[1], tip[0], tip[1], r)

    return (
        f"M {left_from_tip[0]} {left_from_tip[1]} "
        f"Q {left_base[0]} {left_base[1]} {left_from_right[0]} {left_from_right[1]} "
        f"L {right_from_left[0]} {right_from_left[1]} "
        f"Q {right_base[0]} {right_base[1]} {right_from_tip[0]} {right_from_tip[1]} "
        f"L {tip_from_right[0]} {tip_from_right[1]} "
        f"Q {tip[0]} {tip[1]} {tip_from_left[0]} {tip_from_left[1]} Z"
    )


def pointer_body_path(outer_radius: float) -> str:
    tip_y = cy - pocket_outer_r + 34 + POINTER_OFFSET_Y
    base_y = tip_y - POINTER_HEIGHT
    return _build_rounded_triangle_path(cx, tip_y, base_y, POINTER_WIDTH / 2, POINTER_CORNER_RADIUS)


def build_annulus_path(center_x: float, center_y: float, inner_radius: float, outer_radius: float) -> str:
    return (
        f"M {center_x + outer_radius} {center_y} "
        f"A {outer_radius} {outer_radius} 0 1 1 {center_x - outer_radius} {center_y} "
        f"A {outer_radius} {outer_radius} 0 1 1 {center_x + outer_radius} {center_y} "
        f"M {center_x + inner_radius} {center_y} "
        f"A {inner_radius} {inner_radius} 0 1 0 {center_x - inner_radius} {center_y} "
        f"A {inner_radius} {inner_radius} 0 1 0 {center_x + inner_radius} {center_y} Z"
    )


def gold_stud_path(angle_deg: float, radius: float, half_length: float = 11, half_width: float = 7) -> str:
    """Small four-point diamond deflector, long axis along the radial direction."""
    radians = math.radians(angle_deg)
    ca, sa = math.cos(radians), math.sin(radians)
    px, py = bx + ca * radius, by + sa * radius
    inner = (px - ca * half_length, py - sa * half_length)
    outer = (px + ca * half_length, py + sa * half_length)
    left = (px + sa * half_width, py - ca * half_width)
    right = (px - sa * half_width, py + ca * half_width)
    return (
        f"M {inner[0]:.3f} {inner[1]:.3f} L {left[0]:.3f} {left[1]:.3f} "
        f"L {outer[0]:.3f} {outer[1]:.3f} L {right[0]:.3f} {right[1]:.3f} Z"
    )


pointer_body = pointer_body_path(outer_r)
outer_track_annulus = build_annulus_path(cx, cy, outer_track_inner, outer_track_outer)
track_lip_inner = build_annulus_path(bx, by, track_r - 18, track_r - 10)
rim_inner_shadow = build_annulus_path(cx, cy, frame_outer_r - rim_width - 6, frame_outer_r - rim_width + 2)

defs = f"""<defs>
  <filter id="rw-shadow" x="-14%" y="-12%" width="128%" height="130%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="{C['black']}" flood-opacity="0.42"/>
    <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="{C['black']}" flood-opacity="0.28"/>
    <feDropShadow dx="0" dy="2" stdDeviation="14" flood-color="{C['goldAmbientShadow']}" flood-opacity="0.06"/>
  </filter>
  <filter id="rw-pocket-inset" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0.4" dy="2.4" stdDeviation="2.1" flood-color="{C['black']}" flood-opacity="0.55"/>
    <feDropShadow dx="-0.35" dy="-1.1" stdDeviation="0.55" flood-color="{C['white']}" flood-opacity="0.09"/>
  </filter>
  <filter id="rw-pocket-well" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0.25" dy="2.6" stdDeviation="2.4" flood-color="{C['black']}" flood-opacity="0.58"/>
    <feDropShadow dx="-0.2" dy="-0.85" stdDeviation="0.45" flood-color="{C['white']}" flood-opacity="0.07"/>
  </filter>
  <filter id="rw-ball-track-inset" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0" dy="3.5" stdDeviation="3.2" flood-color="{C['black']}" flood-opacity="0.62"/>
    <feDropShadow dx="0" dy="-1.5" stdDeviation="1.2" flood-color="{C['goldAmbientShadow']}" flood-opacity="0.14"/>
  </filter>
  <filter id="rw-number-crisp" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0" dy="1.2" stdDeviation="0.55" flood-color="{C['black']}" flood-opacity="0.72"/>
    <feDropShadow dx="0" dy="0.25" stdDeviation="0.15" flood-color="{C['black']}" flood-opacity="0.35"/>
  </filter>
  <filter id="rw-pointer-shadow" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
    <feDropShadow dx="0" dy="2.2" stdDeviation="1.2" flood-color="{C['black']}" flood-opacity="0.42"/>
    <feDropShadow dx="0" dy="0.6" stdDeviation="0.3" flood-color="{C['bronzeShadow']}" flood-opacity="0.35"/>
  </filter>
  <radialGradient id="rw-red" cx="{cx}" cy="{cy}" r="{pocket_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="72%" stop-color="{C['pocketRedDark']}"/><stop offset="90%" stop-color="{C['pocketRed']}"/><stop offset="100%" stop-color="{C['pocketRedLight']}" stop-opacity="0.9"/>
  </radialGradient>
  <radialGradient id="rw-black" cx="{cx}" cy="{cy}" r="{pocket_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="72%" stop-color="{C['pocketBlackDark']}"/><stop offset="90%" stop-color="{C['pocketBlack']}"/><stop offset="100%" stop-color="{C['pocketBlackLight']}" stop-opacity="0.9"/>
  </radialGradient>
  <radialGradient id="rw-green" cx="{cx}" cy="{cy}" r="{pocket_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="72%" stop-color="{C['pocketGreenDark']}"/><stop offset="90%" stop-color="{C['pocketGreen']}"/><stop offset="100%" stop-color="{C['pocketGreenLight']}" stop-opacity="0.9"/>
  </radialGradient>
  <linearGradient id="rw-gold" x1="22%" y1="8%" x2="82%" y2="92%">
    <stop offset="0%" stop-color="{C['goldLip0']}"/><stop offset="22%" stop-color="{C['goldLip22']}"/><stop offset="55%" stop-color="{C['goldLip55']}"/><stop offset="82%" stop-color="{C['goldLip82']}"/><stop offset="100%" stop-color="{C['goldLip100']}"/>
  </linearGradient>
  <linearGradient id="rw-rim-gold" x1="{cx}" y1="{cy - frame_outer_r}" x2="{cx}" y2="{cy + frame_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['rimGoldTopEdge']}"/>
    <stop offset="7%" stop-color="{C['rimGoldTop']}"/>
    <stop offset="26%" stop-color="{C['rimGoldUpper']}"/>
    <stop offset="52%" stop-color="{C['rimGoldMid']}"/>
    <stop offset="78%" stop-color="{C['rimGoldLower']}"/>
    <stop offset="100%" stop-color="{C['rimGoldBottom']}"/>
  </linearGradient>
  <linearGradient id="rw-rim-edge" x1="{cx}" y1="{cy - frame_outer_r}" x2="{cx}" y2="{cy + frame_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['rimEdgeLight']}" stop-opacity="0.95"/>
    <stop offset="30%" stop-color="{C['rimEdgeLight']}" stop-opacity="0.18"/>
    <stop offset="62%" stop-color="{C['rimEdgeBottom']}" stop-opacity="0.2"/>
    <stop offset="100%" stop-color="{C['rimEdgeBottom']}" stop-opacity="0.85"/>
  </linearGradient>
  <radialGradient id="rw-well-shade" cx="{cx}" cy="{cy}" r="{pocket_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="63%" stop-color="{C['black']}" stop-opacity="0"/>
    <stop offset="76%" stop-color="{C['black']}" stop-opacity="0.28"/>
    <stop offset="82%" stop-color="{C['black']}" stop-opacity="0.55"/>
  </radialGradient>
  <linearGradient id="rw-bronze" x1="18%" y1="14%" x2="86%" y2="90%">
    <stop offset="0%" stop-color="{C['bronzeWall0']}"/><stop offset="45%" stop-color="{C['bronzeWall45']}"/><stop offset="100%" stop-color="{C['bronzeWall100']}"/>
  </linearGradient>
  <pattern id="rw-brushed" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(14)">
    <rect width="5" height="5" fill="transparent"/>
    <line x1="0" y1="1" x2="5" y2="1" stroke="rgba(255,255,255,0.09)" stroke-width="0.4"/>
    <line x1="0" y1="2.8" x2="5" y2="2.8" stroke="rgba(0,0,0,0.06)" stroke-width="0.3"/>
  </pattern>
  <linearGradient id="rw-track" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="{C['track0']}"/><stop offset="35%" stop-color="{C['track35']}"/><stop offset="68%" stop-color="{C['track68']}"/><stop offset="100%" stop-color="{C['track100']}"/>
  </linearGradient>
  <linearGradient id="rw-track-glass" x1="{cx}" y1="{cy - frame_outer_r}" x2="{cx}" y2="{cy + frame_outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['track0']}"/>
    <stop offset="18%" stop-color="{C['track35']}"/>
    <stop offset="48%" stop-color="{C['track68']}"/>
    <stop offset="78%" stop-color="{C['track100']}"/>
    <stop offset="100%" stop-color="{C['black']}"/>
  </linearGradient>
  <radialGradient id="rw-track-shine" cx="{cx}" cy="{cy - frame_outer_r * 0.78}" r="{frame_outer_r * 0.42}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['white']}" stop-opacity="0.22"/>
    <stop offset="38%" stop-color="{C['white']}" stop-opacity="0.08"/>
    <stop offset="72%" stop-color="{C['white']}" stop-opacity="0.02"/>
    <stop offset="100%" stop-color="{C['white']}" stop-opacity="0"/>
  </radialGradient>
  <pattern id="rw-well-rib" patternUnits="userSpaceOnUse" width="5" height="10" patternTransform="rotate(90)">
    <rect width="5" height="5" fill="rgba(255,255,255,0.07)"/>
    <rect y="5" width="5" height="5" fill="rgba(0,0,0,0.14)"/>
  </pattern>
  <radialGradient id="rw-bowl" cx="{bx}" cy="{by}" r="{bowl_r}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['bowl58']}"/><stop offset="88%" stop-color="{C['bowl58']}"/><stop offset="100%" stop-color="{C['bowl100']}"/>
  </radialGradient>
  <radialGradient id="rw-hub" cx="{bx}" cy="{by}" r="52" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['spindle0']}"/><stop offset="55%" stop-color="{C['spindle55']}"/><stop offset="100%" stop-color="{C['spindle100']}"/>
  </radialGradient>
  <radialGradient id="rw-cap" cx="{bx}" cy="{by}" r="16" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['spindleCap0']}"/><stop offset="55%" stop-color="{C['spindleCap55']}"/><stop offset="100%" stop-color="{C['spindleCap100']}"/>
  </radialGradient>
  <radialGradient id="rw-rotation-light" cx="{lx}" cy="{ly}" r="{outer_r}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['white']}" stop-opacity="0.16"/>
    <stop offset="28%" stop-color="{C['goldLip0']}" stop-opacity="0.08"/>
    <stop offset="52%" stop-color="{C['white']}" stop-opacity="0.02"/>
    <stop offset="100%" stop-color="{C['black']}" stop-opacity="0.22"/>
  </radialGradient>
  <radialGradient id="rw-rim-specular" cx="{cx}" cy="{cy - frame_outer_r * 0.72}" r="{frame_outer_r * 0.55}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="{C['white']}" stop-opacity="0.42"/>
    <stop offset="35%" stop-color="{C['goldLip0']}" stop-opacity="0.18"/>
    <stop offset="72%" stop-color="{C['goldLip55']}" stop-opacity="0.04"/>
    <stop offset="100%" stop-color="{C['goldLip100']}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="rw-pointer-fill" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0%" stop-color="{C['rimGoldTopEdge']}"/><stop offset="48%" stop-color="{C['rimGoldTop']}"/><stop offset="100%" stop-color="{C['rimGoldMid']}"/>
  </linearGradient>
</defs>"""

static_frame = f"""<g id="rw-static-frame" class="joker-roulette-wheel__static-frame">
  <ellipse cx="{cx}" cy="{cy + 14}" rx="{frame_outer_r + 6}" ry="{frame_outer_r + 2}" fill="{C['rimShadow']}" opacity="0.5"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r + 2}" fill="{C['rimBaseOuter']}"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r}" fill="{C['rimBaseInner']}"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r - rim_width / 2}" fill="none" stroke="url(#rw-rim-gold)" stroke-width="{rim_width}"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r - rim_width / 2}" fill="none" stroke="url(#rw-brushed)" stroke-width="{rim_width - 5}" opacity="0.22"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r - 0.75}" fill="none" stroke="url(#rw-rim-edge)" stroke-width="1.8"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r - rim_width + 0.75}" fill="none" stroke="{C['black']}" stroke-width="1.6" opacity="0.55"/>
  <circle cx="{cx}" cy="{cy}" r="{frame_outer_r - 2}" fill="url(#rw-rim-specular)" opacity="0.7" style="mix-blend-mode:screen"/>
  <path d="{rim_inner_shadow}" fill="{C['black']}" opacity="0.5"/>
</g>"""

outer_ball_track = f"""<g id="rw-outer-ball-track" class="joker-roulette-wheel__outer-ball-track">
  <path d="{outer_track_annulus}" fill="url(#rw-track-glass)" filter="url(#rw-ball-track-inset)"/>
  <path d="{outer_track_annulus}" fill="url(#rw-track-shine)" opacity="0.72" style="mix-blend-mode:screen"/>
  <circle cx="{cx}" cy="{cy}" r="{outer_track_outer - 0.5}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1.4" opacity="0.42"/>
  <circle cx="{cx}" cy="{cy}" r="{outer_track_outer - 2}" fill="none" stroke="{C['white']}" stroke-width="0.6" opacity="0.1"/>
  <circle cx="{cx}" cy="{cy}" r="{outer_track_inner}" fill="none" stroke="{C['black']}" stroke-width="4" opacity="0.72"/>
  <circle cx="{cx}" cy="{cy}" r="{outer_track_inner + 1.5}" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="0.8" opacity="0.55"/>
</g>"""

ball_track = f"""<g class="joker-roulette-wheel__ball-track">
  <path d="{track_lip_inner}" fill="{C['black']}" opacity="0.38"/>
  <circle cx="{bx}" cy="{by}" r="{track_r - 10}" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="0.7" opacity="0.45"/>
</g>"""

center_bowl = f"""<g class="joker-roulette-wheel__center-bowl">
  <circle cx="{bx}" cy="{by}" r="{bowl_r}" fill="url(#rw-bowl)"/>
  <circle cx="{bx}" cy="{by}" r="{bowl_r - 1}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.6"/>
</g>"""

spindle = f"""<g class="joker-roulette-wheel__spindle">
  <path d="{gold_stud_path(25, track_r)}" fill="url(#rw-gold)"/>
  <path d="{gold_stud_path(155, track_r)}" fill="url(#rw-gold)"/>
  <circle cx="{bx}" cy="{by}" r="62" fill="url(#rw-hub)"/>
  <circle cx="{bx}" cy="{by}" r="43" fill="{C['spindle55']}"/>
  <circle cx="{bx}" cy="{by}" r="25" fill="{C['spindle100']}"/>
  <circle cx="{bx}" cy="{by}" r="9" fill="url(#rw-cap)"/>
  <circle cx="{bx}" cy="{by}" r="9" fill="none" stroke="{C['goldLip55']}" stroke-width="0.8" opacity="0.55"/>
</g>"""

pointer = f"""<g id="rw-pointer" class="joker-roulette-wheel__pointer" filter="url(#rw-pointer-shadow)">
  <path d="{pointer_body}" fill="url(#rw-pointer-fill)" stroke="{C['pointerOutline']}" stroke-width="{POINTER_BORDER_WIDTH}" stroke-linejoin="round" stroke-linecap="round"/>
</g>"""

pocket_ring = build_baked_pocket_ring()
spinner = f"""<g id="rw-wheel-spinner" class="joker-roulette-wheel__spinner-assembly">
  <g class="joker-roulette-wheel__pocket-inset">{pocket_ring["inset"]}</g>
  <g class="joker-roulette-wheel__number-track" aria-hidden="true">{pocket_ring["number_track"]}</g>
  <g class="joker-roulette-wheel__pocket-side-walls" aria-hidden="true">{pocket_ring["side_walls"]}</g>
  <g class="joker-roulette-wheel__numbers" filter="url(#rw-number-crisp)">{pocket_ring["numbers"]}</g>
  {ball_track}
  <g class="joker-roulette-wheel__pocket-ring-outline" aria-hidden="true">{pocket_ring["outline"]}</g>
  {center_bowl}
  {spindle}
</g>"""

parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg width="1116" height="1162" viewBox="0 15 1116 1162" fill="none" xmlns="http://www.w3.org/2000/svg">',
    defs,
    '<g filter="url(#rw-shadow)">',
    static_frame,
    outer_ball_track,
    spinner,
    pointer,
    "</g>",
    "</svg>",
]

svg_markup = "\n".join(parts)

out = ROOT / "assets/roulette-wheel.svg"
out.write_text(svg_markup)
print(f"Wrote {out} ({out.stat().st_size} bytes)")

ts_out = ROOT / "src/components/RouletteWheel/rouletteWheelBakedSvg.ts"
ts_out.write_text(
    "/** Generated by scripts/bake-roulette-wheel-svg.py — do not edit. */\n"
    f"export const ROULETTE_WHEEL_BAKED_SVG = {json.dumps(svg_markup)};\n",
)
print(f"Wrote {ts_out} ({ts_out.stat().st_size} bytes)")
