---
title: "Ranking Images"
title_de: "Ranking Images"
description: "Use a mock image search engine that reads the real metadata inside image files, change what counts in the ranking, and edit a file's metadata to see how an index reacts."
description_de: "" # TODO: translate once the English is final
order: 2 # TODO: check against the Machine Vision tutorial
published: true
---

<div class="lang-en" markdown="1">

## Overview

Feeds and search engines decide which images we see, but they rarely say how. They read what is in the image file, such as the date, the camera and the location, and what surrounds it, such as the filename, the alt text and the likes. This tutorial accompanies the lesson *Occupy the Internet*. You work with the *Image Index*, a mock image search engine in which every rule is visible: you change what counts, look at what the index reads from a file, edit that file yourself and drop it back in.

By the end of the tutorial you will be able to:

- explain which signals an index can use to rank an image
- read the metadata stored inside an image file
- change that metadata and predict how the ranking reacts
- explain what an index cannot know, and how metadata can be forged or stripped
- design a ranking that rewards different values

## Software and Tools

- [Image Index](TODO): the mock search engine, runs in any current browser (Chrome, Firefox or Safari)
- [ExifTool](https://exiftool.org/): a free command-line tool to read and edit the metadata of an image file
- Some photographs of your own, ideally a few straight from your phone, one screenshot and one AI-generated image

## Before you start

- The Image Index is a toy. Real platforms do not publish their ranking rules and change them without notice. The index is simplified on purpose, so that you can see every step.
- The sample images are placeholders with invented likes and comments. Likes are not stored in an image file, so the index cannot read them.
- Images you add stay in your browser. Nothing is uploaded to a server, and they disappear when you reload the page. If your index offers a class option, you can share them with the others: then the file is uploaded and stays visible to the class until your teacher deletes it. Your own photographs may contain a GPS location. The index offers to remove it before sharing, but check what a file says before you share it.

## Part 1: Use the index

Open the [Image Index](TODO). Every image has a score, which is the sum of ten signals, each between 0 and 1, multiplied by a weight you set with the sliders from −100 (bury) to +100 (boost). The presets set the sliders for you.

- Click **Feed**, **Search engine** and **Provenance** one after the other and watch the top row change.
- Type a query, for example `sunset`. The index looks for the words in the filename, the title, the description and the keywords. Repeating a word helps up to three times; a field stuffed with it is punished.
- Search for a phrase nobody has used, for example `biennial of imaginary photographs 2027`. Nothing comes back: a *data void*. Add an image that contains the phrase and it comes back first.
- Click an image. The panel shows **what the index read from the file**, the raw tags, and **why it ranks where it does**.
- Each image has **+1 like** and **+1 comment** buttons, one click each, so you can see how popularity moves a ranking. They reset when you reload the page. **Download file** gives you the original JPEG, which you can open in ExifTool (see Part 3).
- **Copy link** stores your settings in the address, so you can send your ranking to someone else.

## Part 2: What is inside an image file

A photograph is more than its pixels. The file also carries text fields, written in three common standards:

- **EXIF**, written by the camera: make, model, date taken, GPS location, exposure
- **IPTC**, written by editors and agencies: title, caption, keywords, author, copyright
- **XMP**, an extensible format that also holds titles, descriptions and keywords, and can say how an image was made

The index reads all three. A few fields matter for this lesson:

| Field | What the index does with it |
| --- | --- |
| `Make`, `Model` | the image "has camera data" |
| `DateTimeOriginal` | the image is "recent" or not |
| GPS latitude and longitude | the image "has a location" |
| `Software` | tells which program wrote the file; AI tools often name themselves here |
| Title, description, keywords | what the image "is about", used to match a query |
| `DigitalSourceType` (IPTC) | says whether the image is a camera capture or AI-generated |

The `DigitalSourceType` value for a fully AI-generated image is `trainedAlgorithmicMedia`. Some AI tools write it and others do not, so a missing flag proves nothing. An index that trusts the flag sees only what the file claims, and the file's content can be changed. Use **Reveal which images are actually AI-generated** in the index to see what the metadata hides.

## Where every value comes from

The index uses three kinds of information. The inspector shows all of them, which is why it can look as if everything was "in the file". It was not.

- **Inside the file:** the metadata fields above (camera, date, GPS, software, title, description, keywords, author, copyright, `DigitalSourceType`). Edit the file and these change.
- **Computed from the pixels:** the average colour and the resolution. Edit the metadata and these stay the same.
- **Outside the file:** the filename, the likes and the comments, the random number, and the "actually AI" flag behind the Reveal switch. A real platform knows likes and comments from its own database, from what people did on the platform. An image file has no such field. Here they are invented per image and stored next to the image in a list (`manifest.json`). You can only add one like and one comment per image, with the buttons in the inspector, and that is lost when you reload. ExifTool cannot change them.

### The ten signals

Each signal is turned into a number between 0 and 1. The score of an image is the sum of every signal times its slider weight (−100 to +100, divided by 100). Signals that are relative (Recent, Popular, Colour, Resolution) are scaled against the other images currently in the index, so an image's value changes when you add or remove images.

| Signal | Where it comes from | How it is calculated |
| --- | --- | --- |
| **Recent** | file: `DateTimeOriginal` | The newest image gets 1, the oldest 0, the others sit in between. No date in the file, 0. |
| **Popular** | outside the file: likes and comments | `log(1 + likes + 3 × comments)`, scaled so the most popular image gets 1. A comment counts three times a like. The logarithm keeps one viral image from flattening all others. |
| **Matches the query** | filename, title, description, keywords | Each word of the query is searched in four places, weighted by where it is found: filename ×3, title ×2, description ×2, keywords ×1.5. A word counts at most three times per place. More than five times in one place is treated as stuffing and the whole match drops to zero. The best match gets 1. |
| **Close to the colour** | pixels: average colour of the image | Distance between the average colour and the colour you pick. The closest image gets 1, the furthest 0. |
| **Has camera data** | file: `Make`, `Model` | 1 if either is present, otherwise 0. |
| **Declared as AI** | file: `DigitalSourceType` or `Software` | 1 if `DigitalSourceType` says algorithmic media, or if `Software` names a known AI tool (Midjourney, DALL·E, Firefly, Stable Diffusion and a few others). Otherwise 0. |
| **Has a location** | file: GPS latitude and longitude | 1 if both are present, otherwise 0. |
| **High resolution** | pixels: width × height | Megapixels, scaled from the smallest image (0) to the largest (1). |
| **Well documented** | file: nine fields | How many of these are filled in: camera, date, GPS, software, title, description, keywords, author, copyright. Divided by nine. |
| **Random** | outside the file | A fixed pseudo-random number per image. **Shuffle** draws new ones. |

Some of these are yes or no (camera, AI, location), others are a gradient. A real index mixes hundreds of signals and learns the weights from behaviour. This one has ten and lets you set them by hand.

### What the inspector shows

- **What the index read from this file:** a table of the values the index uses: filename, size, camera, date, location, software, title, description, keywords, author, copyright and whether it is declared as AI. Two rows do not come from the metadata: *Popularity* (likes and comments, marked "not stored in the file") and *Average colour* (measured from the pixels). Images you add start with 0 likes and 0 comments. Empty fields show as "(none)", and the index treats them as missing.
- **Raw tags:** everything exifr returned for the file, before the index picked what it needs.
- **Why it ranks here:** one bar per signal whose slider is not at zero, showing signal value × your weight. This tells you which sliders put the image where it is.
- **Like and comment buttons:** add one like and one comment to the image, until you reload the page.
- **Badges on the tiles:** AI (declared), cam, GPS, *yours* (an image you added), *stuffing* (keyword stuffing detected in a query match). With Reveal switched on you also see *actually AI* and *AI, not declared*, the ground truth the index itself never sees.

## Part 3: Edit the metadata of a file

Drop one of your own photographs into the index and open the panel. Then change the file itself, with ExifTool, and drop it again. A file with the same name replaces the earlier one, so you can see the ranking react.

Download ExifTool from [exiftool.org](https://exiftool.org/). On Windows, rename `exiftool(-k).exe` to `exiftool.exe`. Open a terminal in the folder with your photo and run:

```
exiftool photo.jpg
```

This lists everything the file contains. To change something:

```
exiftool -Make="Apple" -Model="iPhone 15 Pro" photo.jpg
exiftool -DateTimeOriginal="2026:11:19 08:00:00" photo.jpg
exiftool -GPSLatitude=47.37 -GPSLatitudeRef=N -GPSLongitude=8.54 -GPSLongitudeRef=E photo.jpg
exiftool -XMP-dc:Title="Sunset study" -XMP-dc:Description="Sunset over the harbour" photo.jpg
exiftool -Software="Midjourney" photo.jpg
exiftool -XMP-iptcExt:DigitalSourceType=https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia photo.jpg
```

To remove a field, write an empty value, for example `-XMP-iptcExt:DigitalSourceType=`. To remove everything:

```
exiftool -all= photo.jpg
```

By default ExifTool keeps your original as `photo.jpg_original`. Add `-overwrite_original` if you do not want that copy.

If you would rather not type commands, graphical front-ends for ExifTool exist, for example jExifToolGUI, although its development has stopped. In Adobe Bridge or Photoshop, *File → File Info* edits title, description, keywords and copyright, but not the camera make and model.

Two things to keep in mind:

- **Metadata often does not survive the trip.** Many apps strip it when you resize or export, and many platforms and messengers strip it when you send a photo: social networks typically remove it from the public copy, while reportedly keeping it internally, and some messengers, such as Signal, strip all of it. Behaviour differs from app to app, depends on how you send (a photo or a file) and changes over time. Email attachments and cloud links usually deliver the full original file. So a photo that reaches you through a chat may have lost its camera, date and location, and an index that reads it sees a file without a history. When you add your own photographs, send them to your computer by cable, AirDrop, email or a cloud link, or as a *file* rather than a photo, and always drop the file into the index to check what survived.
- Nothing in the file records that its metadata was changed. That is the point of the exercises below.

## Part 4: Exercises

1. **Find the forged ones.** Choose the *Provenance* preset: camera photos on top, declared AI at the bottom. Switch on *Reveal*. Which AI images slipped to the top? What does their metadata say?
2. **Strip and restore.** Drop one of your phone photos. Note its rank under *Provenance*. Strip it with `exiftool -all= photo.jpg`, drop it again. What changed? Then write the camera data back and drop it a third time.
3. **Forge it.** Take an AI-generated image of your own. Add a camera make and model with ExifTool and drop it under *Provenance*. Then add the `DigitalSourceType` flag and drop it again. What does the index now believe, and what is true?
4. **Design your own ranking.** Choose weights, or a query, that describe a different idea of what an image index should reward: obscure before popular, old before new, undocumented before documented, a colour. Name your ranking, copy the link, and write one sentence about whose images rise and whose sink.

## Resources

- ExifTool: [exiftool.org](https://exiftool.org/)
- IPTC, *Reading and writing IPTC metadata on the command line using ExifTool*: [iptc.atlassian.net/wiki/x/AwC0Jg](https://iptc.atlassian.net/wiki/x/AwC0Jg)
- Michael Golebiewski and danah boyd, *Data Voids: Where Missing Data Can Easily Be Exploited*, Data & Society, 2018: [datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited](https://datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited/)
- Google, *Image SEO best practices*: [developers.google.com/search/docs/appearance/google-images](https://developers.google.com/search/docs/appearance/google-images)

</div>

<div class="lang-de" markdown="1">

<!-- TODO: German version, after the English is final -->

</div>