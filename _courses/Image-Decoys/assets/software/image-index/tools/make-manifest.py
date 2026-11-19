#!/usr/bin/env python3
"""Build thumbs/ and manifest.json from the photographs in images/.

- thumbs/ holds small copies used only for display (metadata is NOT copied: the
  page reads the metadata from the original files in images/).
- manifest.json lists the files plus the things a file cannot tell us:
  likes, comments (invented) and, optionally, whether an image is actually
  AI-generated ("actuallyAI", used by the 'reveal' switch).
- Re-running keeps the values you already edited in manifest.json.

Needs: pip install pillow
"""
import json
import math
import pathlib
import random

from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
images = root / "images"
thumbs = root / "thumbs"
thumbs.mkdir(exist_ok=True)
manifest_path = root / "manifest.json"
truth_path = root / "ground-truth.json"

random.seed(5)
old = {}
if manifest_path.exists():
    old = {e["file"]: e for e in json.loads(manifest_path.read_text())["images"]}
truth = json.loads(truth_path.read_text()) if truth_path.exists() else {}

entries = []
for f in sorted(p for p in images.iterdir() if p.suffix.lower() in (".jpg", ".jpeg")):
    with Image.open(f) as im:
        w, h = im.size
        t = im.convert("RGB")
        t.thumbnail((480, 480))
        t.save(thumbs / f.name, "JPEG", quality=80)  # no exif=...: thumbs carry no metadata
    prev = old.get(f.name, {})
    likes = prev.get("likes", int(random.lognormvariate(4.2, 1.2)))
    entry = {
        "file": f.name,
        "thumb": f"thumbs/{f.name}",
        "width": w,
        "height": h,
        "likes": likes,
        "comments": prev.get("comments", int(likes * random.uniform(0.01, 0.15))),
    }
    ai = prev.get("actuallyAI", truth.get(f.name))
    if ai is not None:
        entry["actuallyAI"] = bool(ai)
    entries.append(entry)

keep = {e["file"] for e in entries}
for stale in thumbs.iterdir():  # remove thumbnails of deleted images
    if stale.name not in keep:
        stale.unlink()

manifest_path.write_text(json.dumps({"images": entries}, indent=1))
print("wrote", len(entries), "entries to", manifest_path)
