# Image Index

A mock image search engine for teaching. It reads the **real metadata** (EXIF, IPTC, XMP) from every
image file in the browser, turns it into signals (recent, popular, matches the query, colour, camera
data, declared AI, location, resolution, documentation, random) and sorts the images by a weighted sum
that students control with sliders.

Students can click an image to see what the index read from the file, simulate an edit, or drop in
their own photographs (read in the browser only, nothing is uploaded). Editing a file with a metadata
tool and dropping it again replaces the earlier copy (same filename), so they can see how the ranking
reacts to a real change in the file.

## Run it

It is a static site: no backend, no build step. Put the folder on any web server, or test locally:

    cd image-index
    python3 -m http.server 8000
    # open http://localhost:8000

Opening index.html straight from the disk does not work, because browsers block `fetch` on file:// URLs.

## Use your own photographs

1. Put JPEGs in `images/` (delete the placeholders). **Keep the metadata**: many export and resize tools
   strip it. Check one file with `exiftool photo.jpg`, or drop it in the page and open the raw tags.
2. Run `pip install pillow` once, then `python3 tools/make-manifest.py`. It makes small display copies in
   `thumbs/` (the page reads the metadata from the originals, never from the thumbs) and writes
   `manifest.json`.
3. Open `manifest.json` to adjust what a file cannot tell: `likes`, `comments` (invented, and the page
   says so) and optionally `"actuallyAI": true/false`, which powers the "reveal" switch. Re-running the
   script keeps your edits.

Large originals are fine: the page reads only the start of each file when the server supports HTTP range
requests (nearly all do; `python -m http.server` does not, and reads whole files, which is fine for tests).
Aim for 40 to 60 images with a deliberately mixed history: phone photos, camera files, scans,
screenshots, AI images (some declared, some not), stripped downloads, a few with forged camera data.

## Files

- `index.html`, `style.css`, `app.js`: the page
- `core.js`: the ranking engine, no DOM (readable, and testable in Node)
- `vendor/exifr.full.umd.js`: [exifr](https://github.com/MikeKovarik/exifr) 7.1.3, MIT licence, reads the metadata
- `tools/make-manifest.py`: thumbnails and manifest
- `tools/make-placeholders.py`: generates the placeholder images with varied real metadata (only needed once, you can delete it)
- `images/`, `thumbs/`, `manifest.json`, `ground-truth.json`: sample content

## What counts as "declared AI"

The file has the IPTC `DigitalSourceType` of *trainedAlgorithmicMedia* (or another "algorithmic media" value),
or its `Software` tag names a known AI tool (Midjourney, DALL-E, Firefly, Stable Diffusion, ...). The list is
in `core.js` (`AI_SOFTWARE_RE`). Anything else counts as not declared, which is exactly the weakness the
exercise is about.

## Translation

Strings sit in `T.en` at the top of `app.js`; add the German under `T.de` (missing keys fall back to
English), and use `?lang=de`. Static labels in `index.html` carry `data-i18n` attributes and are replaced
from the same table. Signal names and hints come from `core.js` and can be translated with keys
`label.<signal>` and `hint.<signal>` in `T.de`.

## Known limits

- HEIC photos: the metadata is read, but Chrome cannot show a preview (Safari can).
- PNG and WebP carry little metadata.
- Likes and comments are not in image files, so they are invented per image (editable in the inspector).
- Uploads live in memory; they are gone after a reload. The share link stores the settings, not the images.
