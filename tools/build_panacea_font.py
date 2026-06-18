#!/usr/bin/env python3
"""Build the installable Panacea Architectural TrueType font from SVG glyphs."""

from __future__ import annotations

import argparse
import re
import xml.etree.ElementTree as ET
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.svgLib.path import parse_path


UNITS_PER_EM = 1000
SOURCE_BASELINE = 377.5
SOURCE_SCALE = 3.2
SIDE_BEARING = 40
ASCENDER = 850
DESCENDER = -260
LINE_GAP = 100


def draw_element(element: ET.Element, pen) -> None:
    tag = element.tag.rsplit("}", 1)[-1]
    if tag == "path":
        parse_path(element.attrib["d"], pen)
        return
    if tag == "polygon":
        numbers = [float(value) for value in re.split(r"[\s,]+", element.attrib["points"].strip())]
        points = list(zip(numbers[::2], numbers[1::2]))
        pen.moveTo(points[0])
        for point in points[1:]:
            pen.lineTo(point)
        pen.closePath()
        return
    raise ValueError(f"Unsupported SVG element: {tag}")


def get_bounds(element: ET.Element) -> tuple[float, float, float, float]:
    pen = BoundsPen(None)
    draw_element(element, pen)
    if pen.bounds is None:
        raise ValueError(f"Glyph {element.attrib.get('id')} has no outline")
    return pen.bounds


def empty_glyph():
    return TTGlyphPen(None).glyph()


def build_font(source_svg: Path, output_ttf: Path) -> None:
    root = ET.parse(source_svg).getroot()
    elements = {
        element.attrib["id"]: element
        for element in root.iter()
        if len(element.attrib.get("id", "")) == 1 and element.attrib["id"].islower()
    }
    expected = set("abcdefghijklmnopqrstuvwxyz")
    if set(elements) != expected:
        missing = "".join(sorted(expected - set(elements)))
        extra = "".join(sorted(set(elements) - expected))
        raise ValueError(f"Expected a-z glyphs; missing={missing!r}, extra={extra!r}")

    glyph_order = [".notdef", "space", *sorted(elements)]
    glyphs = {".notdef": empty_glyph(), "space": empty_glyph()}
    metrics = {".notdef": (500, 0), "space": (300, 0)}

    for name in sorted(elements):
        element = elements[name]
        x_min, _, x_max, _ = get_bounds(element)
        pen = TTGlyphPen(None)
        transform = (
            SOURCE_SCALE,
            0,
            0,
            -SOURCE_SCALE,
            SIDE_BEARING - x_min * SOURCE_SCALE,
            SOURCE_BASELINE * SOURCE_SCALE,
        )
        draw_element(element, TransformPen(pen, transform))
        glyphs[name] = pen.glyph()
        outline_width = round((x_max - x_min) * SOURCE_SCALE)
        advance_width = int(round((outline_width + SIDE_BEARING * 2) / 10) * 10)
        metrics[name] = (advance_width, SIDE_BEARING)

    cmap = {}
    for name in sorted(elements):
        cmap[ord(name)] = name
        cmap[ord(name.upper())] = name

    builder = FontBuilder(UNITS_PER_EM, isTTF=True)
    builder.setupGlyphOrder(glyph_order)
    builder.setupCharacterMap(cmap)
    builder.setupGlyf(glyphs)
    builder.setupHorizontalMetrics(metrics)
    builder.setupHorizontalHeader(ascent=ASCENDER, descent=DESCENDER, lineGap=LINE_GAP)
    builder.setupNameTable(
        {
            "familyName": "Panacea Architectural",
            "styleName": "Regular",
            "uniqueFontIdentifier": "Panacea Architectural Regular 0.1",
            "fullName": "Panacea Architectural Regular",
            "psName": "PanaceaArchitectural-Regular",
            "version": "Version 0.1",
        }
    )
    builder.setupOS2(
        sTypoAscender=ASCENDER,
        sTypoDescender=DESCENDER,
        sTypoLineGap=LINE_GAP,
        usWinAscent=900,
        usWinDescent=300,
        sxHeight=700,
        sCapHeight=835,
        fsType=0,
    )
    builder.setupPost(keepGlyphNames=True)
    builder.setupMaxp()

    output_ttf.parent.mkdir(parents=True, exist_ok=True)
    builder.save(output_ttf)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("assets/font/source/panacea-alphabet-2nd.svg"),
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("assets/font/PanaceaArchitectural-Regular.ttf"),
    )
    args = parser.parse_args()
    build_font(args.source, args.output)
    print(args.output)


if __name__ == "__main__":
    main()
