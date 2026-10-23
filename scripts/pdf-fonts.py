"""Static Archivo instances for the A4 report document (preview, print and the saved PDF).

The PDF is drawn on the device with jsPDF, which can't use a variable font or apply kerning, so the
document uses these static files in the browser too: the browser lays the pages out with exactly the
advances the PDF will use, and Save PDF copies that layout line for line.

Each file: one weight and width of Archivo, tabular figures made the default, kerning and other
layout features removed, Latin only. Rebuild with fontTools and opentype-feature-freezer:

    python3 -m venv .venv && .venv/bin/pip install fonttools opentype-feature-freezer
    curl -sSLo Archivo-VF.ttf "https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%5Bwdth%2Cwght%5D.ttf"
    .venv/bin/python scripts/pdf-fonts.py Archivo-VF.ttf public/fonts
"""

import os
import subprocess
import sys
import tempfile

from fontTools.subset import main as subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

# (weight, width): must match the font-face rules in components/document/a4.css.
INSTANCES = [(400, 100), (600, 100), (700, 100), (750, 112), (800, 80), (850, 68)]

UNICODES = ",".join([
    "U+0020-007E", "U+00A0-00FF", "U+0100-024F", "U+1E00-1EFF",  # Latin, Latin-1, Extended A/B and Additional
    "U+2010-2027", "U+2030-203A", "U+2212", "U+20AC", "U+2122",  # dashes, quotes, ellipsis, minus, euro, trade mark
])


def build(source: str, out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for weight, width in INSTANCES:
            static = os.path.join(tmp, f"{weight}-{width}.ttf")
            frozen = os.path.join(tmp, f"{weight}-{width}-tnum.ttf")
            out = os.path.join(out_dir, f"archivo-doc-{weight}-{width}.ttf")
            instantiateVariableFont(TTFont(source), {"wght": weight, "wdth": width}, inplace=False).save(static)
            subprocess.run(["pyftfeatfreeze", "-f", "tnum", static, frozen], check=True)
            subset([frozen, f"--unicodes={UNICODES}", "--layout-features=", "--no-hinting", f"--output-file={out}"])
            print(out, os.path.getsize(out))


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2])
