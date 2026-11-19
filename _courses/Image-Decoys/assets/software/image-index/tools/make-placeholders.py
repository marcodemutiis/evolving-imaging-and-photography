#!/usr/bin/env python3
"""Generate placeholder 'photographs' with real, varied metadata (EXIF, IPTC, XMP).

These are only here so the page works out of the box. Replace the files in
images/ with your own photographs, then run make-manifest.py.

Needs: pip install pillow piexif
"""
import random
import struct
import pathlib
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import piexif

random.seed(11)
OUT = pathlib.Path(__file__).resolve().parent.parent / "images"
OUT.mkdir(exist_ok=True)

SUBJECTS = ["sunset", "harbour", "street", "market", "portrait", "dog", "cat", "cake", "mountain",
            "lake", "bridge", "tram", "window", "bicycle", "staircase", "graffiti", "rain", "snow",
            "forest", "beach"]

PHONES = [("Apple", "iPhone 14"), ("Apple", "iPhone 15 Pro"), ("Google", "Pixel 8"), ("samsung", "SM-S918B")]
CAMERAS = [("Canon", "Canon EOS R6"), ("NIKON CORPORATION", "NIKON Z 6"), ("SONY", "ILCE-7M3"), ("FUJIFILM", "X-T4")]
PLACES = [("Zürich", 47.3769, 8.5417), ("Konstanz", 47.6779, 9.1732), ("Lisbon", 38.7223, -9.1393),
          ("Mexico City", 19.4326, -99.1332), ("Seoul", 37.5665, 126.9780), ("Nairobi", -1.2921, 36.8219),
          ("Winterthur", 47.4988, 8.7237)]
AI_TOOLS = ["Midjourney", "Adobe Firefly", "DALL-E 3", "Stable Diffusion"]
AI_URI = "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"


def rational_dms(value):
    value = abs(value)
    d = int(value)
    m = int((value - d) * 60)
    s = round(((value - d) * 60 - m) * 60 * 100)
    return ((d, 1), (m, 1), (s, 100))


def make_image(path, subject, hue, w=1200, h=800):
    import colorsys
    base = hue / 360.0
    col = Image.new("RGB", (1, h))
    for y in range(h):
        t = y / h
        r, g, b = colorsys.hsv_to_rgb((base + 0.08 * t) % 1, 0.55 - 0.2 * t, 0.95 - 0.35 * t)
        col.putpixel((0, y), (int(r * 255), int(g * 255), int(b * 255)))
    img = col.resize((w, h))
    d = ImageDraw.Draw(img, "RGBA")
    for _ in range(6):
        cx, cy, rad = random.randint(0, w), random.randint(0, h), random.randint(60, 260)
        r, g, b = colorsys.hsv_to_rgb((base + random.uniform(-0.1, 0.1)) % 1, 0.5, 0.8)
        d.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=(int(r * 255), int(g * 255), int(b * 255), 70))
    img = img.filter(ImageFilter.GaussianBlur(3))
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("DejaVuSans-Bold.ttf", 72)
        small = ImageFont.truetype("DejaVuSans.ttf", 28)
    except OSError:
        font = small = ImageFont.load_default()
    d.text((60, h - 170), subject, font=font, fill=(255, 255, 255))
    d.text((60, h - 80), "placeholder photograph", font=small, fill=(255, 255, 255))
    img.save(path, "JPEG", quality=88)


def xmp_packet(title=None, description=None, keywords=None, ai=False):
    parts = []
    if title:
        parts.append(f'<dc:title><rdf:Alt><rdf:li xml:lang="x-default">{title}</rdf:li></rdf:Alt></dc:title>')
    if description:
        parts.append(f'<dc:description><rdf:Alt><rdf:li xml:lang="x-default">{description}</rdf:li></rdf:Alt></dc:description>')
    if keywords:
        lis = "".join(f"<rdf:li>{k}</rdf:li>" for k in keywords)
        parts.append(f"<dc:subject><rdf:Bag>{lis}</rdf:Bag></dc:subject>")
    if ai:
        parts.append(f"<Iptc4xmpExt:DigitalSourceType>{AI_URI}</Iptc4xmpExt:DigitalSourceType>")
    body = "\n   ".join(parts)
    return (
        '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>\n'
        '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n'
        ' <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n'
        '  <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/"'
        ' xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">\n'
        f"   {body}\n"
        "  </rdf:Description>\n </rdf:RDF>\n</x:xmpmeta>\n"
        '<?xpacket end="w"?>'
    ).encode("utf-8")


def iptc_block(title=None, caption=None, keywords=None):
    def ds(record, dataset, data):
        data = data.encode("utf-8")
        return b"\x1c" + bytes([record, dataset]) + struct.pack(">H", len(data)) + data

    iim = b"\x1c\x01\x5a\x00\x03\x1b%G"  # 1:90 coded character set = UTF-8
    if title:
        iim += ds(2, 5, title)
    for k in keywords or []:
        iim += ds(2, 25, k)
    if caption:
        iim += ds(2, 120, caption)
    if len(iim) % 2:
        iim += b"\x00"
    res = b"8BIM" + b"\x04\x04" + b"\x00\x00" + struct.pack(">I", len(iim)) + iim
    return b"Photoshop 3.0\x00" + res


def insert_segments(path, xmp=None, iptc=None):
    data = path.read_bytes()
    pos = 2
    insert_at = 2
    while data[pos] == 0xFF and 0xE0 <= data[pos + 1] <= 0xEF:
        length = struct.unpack(">H", data[pos + 2:pos + 4])[0]
        insert_at = pos + 2 + length
        pos = insert_at
    new = b""
    if xmp:
        payload = b"http://ns.adobe.com/xap/1.0/\x00" + xmp
        new += b"\xff\xe1" + struct.pack(">H", len(payload) + 2) + payload
    if iptc:
        new += b"\xff\xed" + struct.pack(">H", len(iptc) + 2) + iptc
    path.write_bytes(data[:insert_at] + new + data[insert_at:])


def random_date(y0, y1):
    y = random.randint(y0, y1)
    return f"{y}:{random.randint(1, 12):02d}:{random.randint(1, 28):02d} {random.randint(7, 21):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d}"


def write_exif(path, make=None, model=None, date=None, place=None, software=None, artist=None, copyright_=None, description=None):
    zeroth, exif, gps = {}, {}, {}
    if make:
        zeroth[piexif.ImageIFD.Make] = make.encode()
    if model:
        zeroth[piexif.ImageIFD.Model] = model.encode()
    if software:
        zeroth[piexif.ImageIFD.Software] = software.encode()
    if artist:
        zeroth[piexif.ImageIFD.Artist] = artist.encode()
    if copyright_:
        zeroth[piexif.ImageIFD.Copyright] = copyright_.encode()
    if description:
        zeroth[piexif.ImageIFD.ImageDescription] = description.encode("ascii", "replace")
    if date:
        exif[piexif.ExifIFD.DateTimeOriginal] = date.encode()
    if place:
        _, lat, lon = place
        gps[piexif.GPSIFD.GPSLatitudeRef] = b"N" if lat >= 0 else b"S"
        gps[piexif.GPSIFD.GPSLatitude] = rational_dms(lat)
        gps[piexif.GPSIFD.GPSLongitudeRef] = b"E" if lon >= 0 else b"W"
        gps[piexif.GPSIFD.GPSLongitude] = rational_dms(lon)
    if zeroth or exif or gps:
        piexif.insert(piexif.dump({"0th": zeroth, "Exif": exif, "GPS": gps}), str(path))


# (kind, count) -> recipe
recipes = (
    [("phone", 16)] + [("camera", 6)] + [("scan", 4)] + [("screenshot", 4)] + [("ai", 5)]
    + [("ai-stripped", 2)] + [("ai-forged", 2)] + [("stripped", 3)]
)
kinds = [k for k, n in recipes for _ in range(n)]
random.shuffle(kinds)

import json
truth = {}
stuffed = 0
seq = 0
for kind in kinds:
    seq += 1
    subject = random.choice(SUBJECTS + ["sunset"] * 3)
    hue = random.randint(0, 359)
    n = random.randint(1000, 9999)
    meta = {}
    xmp = None
    iptc = None
    caption_text = f"{subject} in {random.choice(PLACES)[0]}"
    rich = random.random() < 0.5  # carries title/description/keywords

    if kind == "phone":
        name = f"IMG_{n}.jpg"
        mk, md = random.choice(PHONES)
        meta = dict(make=mk, model=md, date=random_date(2018, 2026), software="17.2")
        if random.random() < 0.8:
            meta["place"] = random.choice(PLACES)
    elif kind == "camera":
        name = f"DSC_{n}.jpg"
        mk, md = random.choice(CAMERAS)
        meta = dict(make=mk, model=md, date=random_date(2012, 2025), software="Adobe Lightroom Classic",
                    artist="Studio Example", copyright_="© Studio Example")
        if random.random() < 0.5:
            meta["place"] = random.choice(PLACES)
        rich = True
    elif kind == "scan":
        name = f"scan_{n}.jpg"
        meta = dict(date=random_date(1998, 2008), software="VueScan 9.8")
    elif kind == "screenshot":
        name = f"screenshot-{2020 + seq % 6}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}.jpg"
        meta = dict(date=random_date(2020, 2026), software="macOS Screenshot")
        rich = False
    elif kind == "ai":
        name = f"{subject}-{random.choice(['dream', 'render', 'v6', 'gen'])}-{n}.jpg"
        meta = dict(software=random.choice(AI_TOOLS), date=random_date(2023, 2026))
        xmp_ai = True
        rich = random.random() < 0.7
    elif kind == "ai-stripped":
        name = f"download_{n}.jpg"
    elif kind == "ai-forged":
        name = f"IMG_{n}.jpg"
        mk, md = random.choice(PHONES)
        meta = dict(make=mk, model=md, date=random_date(2023, 2026), place=random.choice(PLACES), software="17.2")
    else:  # stripped
        name = f"image_{n}.jpg"

    path = OUT / name
    if path.exists():
        name = name.replace(".jpg", f"_{seq}.jpg")
        path = OUT / name
    make_image(path, subject, hue)
    truth[path.name] = kind.startswith("ai")

    title = desc = None
    kws = None
    if rich and kind not in ("ai-stripped", "stripped"):
        title = subject.capitalize() + " " + random.choice(["study", "afternoon", "series", "No. 3"])
        desc = f"{subject.capitalize()} photograph, {caption_text}."
        kws = [subject, random.choice(SUBJECTS), "photography"]
    if kind == "phone" and rich and stuffed < 2:
        stuffed += 1
        # keyword stuffing, so the spam rule has something to catch
        desc = " ".join([subject] * 7) + " best " + subject + " photo"
    use_ai = kind == "ai"
    xmp = xmp_packet(title, desc, kws, ai=use_ai) if (title or desc or kws or use_ai) else None
    if kind == "camera" and kws:
        iptc = iptc_block(title, desc, kws)

    if kind not in ("ai-stripped", "stripped"):
        write_exif(path, **meta)
    if xmp or iptc:
        insert_segments(path, xmp=xmp, iptc=iptc)

(OUT.parent / "ground-truth.json").write_text(json.dumps(truth, indent=1))
print("wrote", len(list(OUT.glob("*.jpg"))), "images to", OUT)
