#!/usr/bin/env python3
"""Builder's Observatory — dither pipeline.

Source illustration (art-candidates/, gitignored)
→ perceptual luminance grade (lift low-mids so wall detail survives)
→ radial edge-dissolve baked into the tone map (edges fade to empty dots)
→ Bayer 8×8 ordered dither at 2× display grid (dots ≈ 1 device px)
→ 3-color palette PNG: transparent / ivory #EAE3D2 / warm #E9B468
   (warm auto-detected from the source's amber regions — lamp, LED)
→ public/observatory.png

Usage: python3 scripts/build-observatory.py [source] [out]
"""

import sys
import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else "art-candidates/obs-01.png"
OUT = sys.argv[2] if len(sys.argv) > 2 else "public/observatory.png"

GRID_W = 1536  # source-native grid → ~1 device px per dot at hero size (dpr 2)
IVORY = (234, 227, 210)
WARM = (233, 180, 104)

BAYER8 = np.array(
    [
        [0, 32, 8, 40, 2, 34, 10, 42],
        [48, 16, 56, 24, 50, 18, 58, 26],
        [12, 44, 4, 36, 14, 46, 6, 38],
        [60, 28, 52, 20, 62, 30, 54, 22],
        [3, 35, 11, 43, 1, 33, 9, 41],
        [51, 19, 59, 27, 49, 17, 57, 25],
        [15, 47, 7, 39, 13, 45, 5, 37],
        [63, 31, 55, 23, 61, 29, 53, 21],
    ],
    dtype=np.float64,
)

src = Image.open(SRC).convert("RGB")

# pre-dither unsharp mask: ordered dither resolves edges far better when
# structure is crisply defined in the tone map (classic print trick)
src = src.filter(ImageFilter.UnsharpMask(radius=2, percent=110, threshold=2))

rgb = np.asarray(src, dtype=np.float64)
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

# perceptual luminance + grade: decisive shadow crush (texture falls to
# empty sky), lifted low-mid detail band, protected highlights
lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
x = np.clip(lum / 255.0, 0, 1)
x = x**0.72  # lift the low-mid detail band first
x = np.clip((x - 0.16) * 1.38, 0, 1)  # then crush decisively below ~16%
x = x**0.9

# warm channel: amber where the source is clearly warm and lit
warmth = np.clip((r - b - 22.0) / 40.0, 0, 1) * np.clip((lum - 48.0) / 60.0, 0, 1)

# resize tone + warmth to the dither grid
gw, gh = GRID_W, round(GRID_W * src.height / src.width)
tone = (
    np.asarray(
        Image.fromarray((x * 255).astype(np.uint8)).resize((gw, gh), Image.LANCZOS),
        dtype=np.float64,
    )
    / 255.0
)
warm = (
    np.asarray(
        Image.fromarray((warmth * 255).astype(np.uint8)).resize(
            (gw, gh), Image.BILINEAR
        ),
        dtype=np.float64,
    )
    / 255.0
    > 0.45
)

# directional edge-dissolve baked into the tone map: strong fade on the
# left (toward the hero text), gentler elsewhere — the scene thins out
# into empty sky, never a rectangular boundary
yy, xx = np.mgrid[0:gh, 0:gw]
fx = np.clip((xx / gw - 0.06) / 0.30, 0, 1)  # left, wide fade
fx = np.minimum(fx, np.clip((1.01 - xx / gw) / 0.10, 0, 1))  # right
fy = np.clip((yy / gh - 0.03) / 0.16, 0, 1)  # top
fy = np.minimum(fy, np.clip((1.01 - yy / gh) / 0.14, 0, 1))  # bottom
tone *= fx * fy

# Bayer 8×8 ordered dither — duotone mapping:
#   transparent shadows → amber mid-tone dots → ivory highlights
tmap = np.tile((BAYER8 + 0.5) / 64.0, (gh // 8 + 1, gw // 8 + 1))[:gh, :gw]
on = tone > tmap
hi = tone > 0.58 + tmap * 0.42  # highlights: ivory within the on-dots

# palette PNG: 0 = transparent, 1 = amber, 2 = ivory, 3 = warm core (lamp)
idx = np.zeros((gh, gw), dtype=np.uint8)
idx[on] = 1
idx[on & hi] = 2
idx[on & warm] = 3
out = Image.fromarray(idx, mode="P")
WARM_CORE = (240, 164, 70)
palette = [0, 0, 0, *WARM, *IVORY, *WARM_CORE] + [0] * (256 * 3 - 12)
out.putpalette(palette)
out.info["transparency"] = bytes([0, 255, 255, 255] + [255] * 252)
out.save(OUT, optimize=True)

print(
    f"{SRC} → {OUT}  {gw}×{gh}px  dots-on {on.mean():.1%}  "
    f"ivory {(on & hi).mean():.2%}  warm-core {(on & warm).mean():.2%}"
)
