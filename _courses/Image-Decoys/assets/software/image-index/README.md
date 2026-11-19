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

## Shared class index (optional)

Without the `api/` folder the page works as before: images that students drop in stay in their own browser.
With PHP on the server, students can also **share** their uploads, so the whole class ranks the same images.
No database is needed: images are saved as plain files in `shared/<student>/` and the page lists the folders.

1. Upload the whole folder, including `api/`, `shared/` and `shared-thumbs/` (and their `.htaccess` files).
2. Edit `api/config.php`: set `CLASS_CODE` (students need it to upload and to see the shared images) and
   `ADMIN_CODE` (for deleting). **Change both defaults.** Empty `CLASS_CODE` makes the index open.
3. Make sure the server accepts large uploads. Phone photos are often 3 to 8 MB and PHP's default limit is 2 MB.
   `api/.user.ini` and `api/.htaccess` ask for 12 MB; if an upload says "File too large for the server",
   raise `upload_max_filesize` and `post_max_size` in your hosting panel (or php.ini).
4. Open the page. If PHP answers, a "Share my uploads with the class" option appears. Students enter a name or
   nickname and the class code. Re-using a filename replaces that student's earlier upload.
5. Likes and comments are stored next to each shared image (`<file>.jpg.json`, written by `api/meta.php`).
6. Delete images in `admin.html` (class code and admin code), or by removing files from `shared/` and `shared-thumbs/`.

What the server does: accepts only real JPEG files (checks the content, not just the name), cleans the filename,
stores the file byte for byte (so the metadata stays intact), makes a 480 px display copy without metadata (needs
the PHP GD extension; without it the original is shown), and limits uploads per student (12) and in total (400).
Both limits and the file size are in `config.php`.

**GPS:** before upload, the page removes the GPS location from the EXIF block (checked by default; if removal fails,
the file is not uploaded). Camera, date, IPTC and XMP stay. GPS can in theory also sit in XMP or maker notes,
which this does not touch. Tell students not to share photos of their home.

**Privacy and access:** the class code protects uploading and the list of images, not the direct image URLs. Anyone
who knows a file's address can open it. If the images must not be reachable at all, put the folder behind HTTP basic
authentication in your hosting panel as well. The uploaded files are personal data of your students: tell them what is
stored, and delete everything after the course. Students can only upload JPEGs, but anyone with the class code can
upload any JPEG, so the class code is the moderation.

## Files

- `index.html`, `style.css`, `app.js`: the page
- `core.js`: the ranking engine, no DOM (readable, and testable in Node)
- `vendor/exifr.full.umd.js`: [exifr](https://github.com/MikeKovarik/exifr) 7.1.3, MIT licence, reads the metadata
- `vendor/piexif.js`: [piexifjs](https://github.com/hMatoba/piexifjs) 1.0.6, MIT licence, removes the GPS block before sharing
- `jpegedit.js`: writes metadata into a JPEG (EXIF through piexifjs, title/description/keywords/AI flag as XMP)
- `api/` (PHP), `shared/`, `shared-thumbs/`, `admin.html`: the optional shared class index
- `tools/make-manifest.py`: thumbnails and manifest
- `tools/make-placeholders.py`: generates the placeholder images with varied real metadata (only needed once, you can delete it)
- `images/`, `thumbs/`, `manifest.json`, `ground-truth.json`: sample content

## Editing a file in the page (switched off)

The editor below is built but hidden: the point of the exercise is that students change the metadata with ExifTool.
The inspector shows a **+1 like** and a **+1 comment** button instead (one click each per image, reset when the page is
reloaded) and a **Download file** button, so students can take a sample image and work on it. To switch the editor on,
add `<script>window.IMAGE_INDEX_EDIT = true;</script>` before `app.js` in `index.html`.

Click an image to see what the index read from it. Under the table, the form writes the values into the JPEG itself
(camera, date, GPS, software, author, copyright as EXIF; title, description, keywords and the AI flag as XMP),
then reads the new file again, so what you see is what the file now contains. **Download file** gives you the edited
JPEG to check with ExifTool. Editing in place works for images a student uploaded (in the browser) and for their own
shared images; sample images and other students' images get an edited copy in the browser instead. Likes and comments
are not part of a file, so they are stored next to it (browser memory, or `api/meta.php` for shared images).
The editor replaces the XMP and IPTC blocks of a file (they are rewritten from the form) and leaves the pixels alone.

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
- Local uploads live in memory; they are gone after a reload. Shared uploads stay on the server until you delete them. The share link stores the settings, not the images.
- Likes and comments of shared images start at 0 (students can change them in the inspector, which is local to their browser).
