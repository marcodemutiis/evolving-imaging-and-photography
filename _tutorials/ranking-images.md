---
title: "Ranking Images"
title_de: "Ranking Images"
description: "Use a mock image search engine that reads the real metadata inside image files, change what counts in the ranking, and edit a file's metadata to see how an index reacts."
description_de: "Nutzt eine simulierte Bildsuchmaschine, die die echten Metadaten in Bilddateien liest, verändert, was im Ranking zählt, und bearbeitet die Metadaten einer Datei, um zu sehen, wie ein Index reagiert."
order: 12
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

- [Image Index](https://marcodemutiis.com/teaching/image-index/): the mock search engine, runs in any current browser (Chrome, Firefox or Safari)
- [ExifTool](https://exiftool.org/): a free command-line tool to read and edit the metadata of an image file
- [Verify](https://contentcredentials.org/verify): optional, shows the Content Credentials of an AI image (see Part 2)
- Some photographs of your own, ideally a few straight from your phone, one screenshot and one AI-generated image

## Before you start

- The Image Index is a toy for in-class experimentation. Real platforms do not publish their ranking rules and change them without notice. The index is simplified on purpose, so that you can see every step.
- The sample images are placeholders with invented likes and comments. Likes are not stored in an image file, so the index cannot read them.
- Images you add stay in your browser. Nothing is uploaded to a server, and they disappear when you reload the page. If you have the class code, you can share your images publicly with the others: the file is uploaded and stays visible to the class until your teacher deletes it. Your own photographs may contain a GPS location. The index offers to remove it before sharing, but check what a file says before you share it.

## Part 1: Use the index

![Image Index webpage]({{ site.baseurl }}/tutorials/assets/IR_webpage.jpg)

Open the [Image Index](https://marcodemutiis.com/teaching/image-index/). Every image has a score, which is the sum of ten signals, each between 0 and 1, multiplied by a weight you set with the sliders from −100 (bury) to +100 (boost). The presets set the sliders for you.

- Click **Feed**, **Search engine** and **Provenance** one after the other and watch the top row change.
- Type a query, for example `sunset`. The index looks for the words in the filename, the title, the description and the keywords. Repeating a word helps up to three times; a field stuffed with it is punished.
- Search for a phrase nobody has used, for example `biennial of imaginary photographs 2027`. Nothing comes back: a *data void*. Add an image that contains the phrase and it comes back first.
- Click an image. The **Inspector** menu on the left shows **what the index read from the file**, the raw tags, and **why it ranks where it does**.
- Each image has **+1 like** and **+1 comment** buttons, one click each, so you can see how popularity moves a ranking. They reset when you reload the page. **Download file** gives you the JPEG, which you can open in ExifTool (see Part 3).
- **Copy link** stores your settings in the address, so you can send your ranking to someone else.

## Part 2: What is inside an image file

A photograph is more than its pixels. The file also carries text fields, written in three common standards:

- **EXIF**, written by the camera: make, model, date taken, GPS location, exposure
- **IPTC**, written by editors and agencies: title, caption, keywords, author, copyright
- **XMP**, an extensible format that also holds titles, descriptions and keywords, and can say how an image was made

![Diagram: the blocks of data inside one JPEG file and which of them the Image Index reads]({{ site.baseurl }}/tutorials/assets/IR_metadata.png)

The index reads all three. A few fields matter for this lesson:

| Field | What the index does with it |
| --- | --- |
| `Make`, `Model` | the image "has camera data" |
| `DateTimeOriginal` | the image is "recent" or not |
| GPS latitude and longitude | the image "has a location" |
| `Software` | tells which program wrote the file; AI tools often name themselves here |
| Title, description, keywords | what the image "is about", used to match a query |
| `DigitalSourceType` (an IPTC term, stored in XMP) | says whether the image is a camera capture or AI-generated |

The `DigitalSourceType` value for a fully AI-generated image is `trainedAlgorithmicMedia`. Some AI tools write it and others do not, so a missing flag proves nothing. An index that trusts the flag sees only what the file claims, and the file's content can be changed. Use **Reveal which images are actually AI-generated** in the index to see what the metadata hides.

### How AI information is stored

The three standards above were made for cameras and photo agencies. AI imaging adds two further ways to say how an image was made, and they differ in how far the claim can be trusted.

- **A label in the usual fields.** The IPTC, the standards body for news photography, publishes a vocabulary called *Digital Source Type*. It recommends that software that creates images with trained AI algorithms writes the value `trainedAlgorithmicMedia` into the XMP data of the file ([iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)). Google's Merchant Center requires the tag on AI-generated product images ([support.google.com/merchants/answer/14743464](https://support.google.com/merchants/answer/14743464)), and Meta uses it to label AI images on Facebook, Instagram and Threads ([iptc.org/?p=6867](https://iptc.org/?p=6867)). This is the label the index reads. It is plain text, like a title or a camera model, so anyone can add it to a photograph or remove it from an AI image, as you do in Part 3.
- **A signed record.** The C2PA (Coalition for Content Provenance and Authenticity) defines *Content Credentials*: a cryptographically signed record of origin, tools and edit history that is attached to the file, so that a later change can be detected ([c2pa.org/specifications](https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html)). In a JPEG this record is not part of EXIF, IPTC or XMP. It sits in APP11 marker segments, in a container format called JUMBF ([en.wikipedia.org/wiki/JUMBF](https://en.wikipedia.org/wiki/JUMBF)), and it can itself carry the Digital Source Type value. The index does not read it. Signing makes changes visible, not impossible: the record can simply be removed, and security researchers have documented further attacks, such as forging signatures ([msi.dublincore.org/standards/c2pa](https://msi.dublincore.org/standards/c2pa)). Once it is gone, the file looks like any other.

So neither a flag nor a credential proves how an image was made: the first can be forged, the second can be dropped. If you have an AI image that carries Content Credentials, the [Verify tool](https://contentcredentials.org/verify) shows what is inside.

## Where every value comes from

The index uses three kinds of information. You can see them in the inspector panel.

- **Inside the file:** the metadata fields above (camera, date, GPS, software, title, description, keywords, author, copyright, `DigitalSourceType`). Edit the file and these change.
- **Computed from the pixels:** the average colour and the resolution. Edit the metadata and these stay the same.
- **Outside the file:** the filename, the likes and the comments, the random number, and the "actually AI" flag. A real platform knows likes and comments from its own database, from what people did on the platform. An image file has no such field. Here they are invented per image and stored next to the image in a list (`manifest.json`). You can only add one like and one comment per image, with the buttons in the inspector, and that is lost when you reload. ExifTool cannot change them.

![Inspector Properties]({{ site.baseurl }}/tutorials/assets/IR_inspector.jpg)

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
| **Random** | outside the file | A pseudo-random number per image. You get new numbers every time you load the page; **Shuffle** draws new ones, and a copied link keeps them. |

Some of these are yes or no (camera, AI, location), others are a gradient. A real index mixes hundreds of signals and learns the weights from behaviour. This one has ten and lets you set them by hand.

### What the inspector shows

- **What the index read from this file:** a table of the values the index uses: filename, size, camera, date, location, software, title, description, keywords, author, copyright and whether it is declared as AI. Two rows do not come from the metadata: *Popularity* (likes and comments, marked "not stored in the file") and *Average colour* (measured from the pixels). Images you add start with 0 likes and 0 comments. Empty fields show as "(none)", and the index treats them as missing.
- **Raw tags:** everything exifr returned for the file, before the index picked what it needs.
- **Why it ranks here:** one bar per signal whose slider is not at zero, showing signal value × your weight. This tells you which sliders put the image where it is.
- **Edit this file:** a form with the fields above. **Apply to file** writes your values into the JPEG itself, and the index reads the file again. **Download file** saves the result, and **Restore original** undoes your edits (see Part 3).
- **Like and comment buttons:** add one like and one comment to the image, until you reload the page.
- **Badges on the tiles:** AI (declared), cam, GPS, *yours* (an image you added), *stuffing* (keyword stuffing detected in a query match). With Reveal switched on you also see *actually AI* and *AI, not declared*, the ground truth the index itself never sees.

## Part 3: Edit the metadata of a file

Drop one of your own photographs into the index, or pick a sample image, and click it. There are two ways to change the file. The quick one is the **Edit this file** form in the Inspector: change a field, click **Apply to file**, and the index reads the file again, so you see the ranking react. For an image you dropped in, the edit replaces the image in your browser. For a sample image, Apply makes a copy named `…-edit.jpg`. **Download file** saves the result. The thorough one is ExifTool, which can change any field, remove all of them and show you what is really inside the file. Edit the file, then drop it into the index again: a file with the same name replaces the earlier one.

To change the metadata of a JPG file with ExifTool, download it from [exiftool.org](https://exiftool.org/). On Windows, rename `exiftool(-k).exe` to `exiftool.exe`. Open a terminal in the folder with your photo (change the filename according to your file) and run:

```
exiftool photo.jpg
```

![An excerpt of the metadata information displayed using the exiftool command]({{ site.baseurl }}/tutorials/assets/exiftool.jpg)

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

If you would rather not type commands, graphical front-ends for ExifTool exist, for example [pixelpeeper.com](https://pixelpeeper.com/) or [jExifToolGUI](https://hvdwolf.github.io/jExifToolGUI/). In Adobe Bridge or Photoshop, *File → File Info* edits title, description, keywords and copyright, but not the camera make and model.

Two things to keep in mind:

- **Metadata often does not survive the trip.** Many apps strip it when you resize or export, and many platforms and messengers strip it when you send a photo: social networks typically remove it from the public copy, while reportedly keeping it internally, and some messengers, such as Signal, strip all of it. Behaviour differs from app to app, depends on how you send (a photo or a file) and changes over time. Email attachments and cloud links usually deliver the full original file. So a photo that reaches you through a chat may have lost its camera, date and location, and an index that reads it sees a file without a history. When you add your own photographs, send them to your computer by cable, AirDrop, email or a cloud link, or as a *file* rather than a photo, and always drop the file into the index to check what survived.
- Plain metadata keeps no trace of having been changed, unlike signed Content Credentials (see Part 2). That is the point of the exercises below.

## Part 4: Exercises

1. **Find the forged ones.** Choose the *Provenance* preset: camera photos on top, declared AI at the bottom. Switch on *Reveal*. Which AI images slipped to the top? What does their metadata say?
2. **Strip and restore.** Drop one of your phone photos. Note its rank under *Provenance*. Strip it with `exiftool -all= photo.jpg`, drop it again. What changed? Then write the camera data back and drop it a third time.
3. **Forge it.** Take an AI-generated image of your own. Add a camera make and model with ExifTool and drop it under *Provenance*. Then add the `DigitalSourceType` flag and drop it again. What does the index now believe, and what is true? If your AI tool also embeds Content Credentials, open the original in the Verify tool and compare what it shows with what the index sees.
4. **Design your own ranking.** Choose weights, or a query, that describe a different idea of what an image index should reward: obscure before popular, old before new, undocumented before documented, a colour. Name your ranking, copy the link, and write one sentence about whose images rise and whose sink.

## Resources

- ExifTool: [exiftool.org](https://exiftool.org/)
- IPTC, *Reading and writing IPTC metadata on the command line using ExifTool*: [iptc.atlassian.net/wiki/x/AwC0Jg](https://iptc.atlassian.net/wiki/x/AwC0Jg)
- Michael Golebiewski and danah boyd, *Data Voids: Where Missing Data Can Easily Be Exploited*, Data & Society, 2018: [datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited](https://datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited/)
- Google, *Image SEO best practices*: [developers.google.com/search/docs/appearance/google-images](https://developers.google.com/search/docs/appearance/google-images)
- PixelPeeper: [pixelpeeper.com/](https://pixelpeeper.com/)
- IPTC, *IPTC publishes metadata guidance for AI-generated synthetic media*: [iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
- C2PA, *Content Credentials: C2PA Technical Specification*: [c2pa.org/specifications](https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html)
- Verify, to inspect Content Credentials: [contentcredentials.org/verify](https://contentcredentials.org/verify)

</div>

<div class="lang-de" markdown="1">

## Überblick

Feeds und Suchmaschinen entscheiden, welche Bilder wir sehen, aber sie sagen selten, wie. Sie lesen, was in der Bilddatei steht, etwa Datum, Kamera und Standort, und was sie umgibt, etwa Dateiname, Alt-Text und Likes. Dieses Tutorial begleitet die Lektion *Occupy the Internet*. Ihr arbeitet mit dem *Image Index*, einer simulierten Bildsuchmaschine, in der jede Regel sichtbar ist: Ihr verändert, was zählt, seht nach, was der Index aus einer Datei liest, bearbeitet die Datei selbst und legt sie wieder ab.

Am Ende des Tutorials könnt ihr:

- erklären, welche Signale ein Index nutzen kann, um ein Bild zu ranken
- die in einer Bilddatei gespeicherten Metadaten lesen
- diese Metadaten verändern und vorhersagen, wie das Ranking reagiert
- erklären, was ein Index nicht wissen kann und wie sich Metadaten fälschen oder entfernen lassen
- ein Ranking entwerfen, das andere Werte belohnt

## Software und Tools

- [Image Index](https://marcodemutiis.com/teaching/image-index/): die simulierte Suchmaschine, läuft in jedem aktuellen Browser (Chrome, Firefox oder Safari)
- [ExifTool](https://exiftool.org/): ein kostenloses Kommandozeilen-Tool, um die Metadaten einer Bilddatei zu lesen und zu bearbeiten
- [Verify](https://contentcredentials.org/verify): optional, zeigt die Content Credentials eines KI-Bildes (siehe Teil 2)
- Einige eigene Fotografien, am besten ein paar direkt vom Smartphone, ein Screenshot und ein KI-generiertes Bild

## Bevor ihr startet

- Der Image Index ist ein Spielzeug für Experimente im Unterricht. Echte Plattformen veröffentlichen ihre Ranking-Regeln nicht und ändern sie ohne Ankündigung. Der Index ist absichtlich vereinfacht, damit ihr jeden Schritt sehen könnt.
- Die Beispielbilder sind Platzhalter mit erfundenen Likes und Kommentaren. Likes werden nicht in einer Bilddatei gespeichert, der Index kann sie also nicht lesen.
- Bilder, die ihr hinzufügt, bleiben in eurem Browser. Es wird nichts auf einen Server geladen, und sie verschwinden, wenn ihr die Seite neu ladet. Mit dem Klassencode könnt ihr eure Bilder öffentlich mit den anderen teilen: Die Datei wird hochgeladen und bleibt für die Klasse sichtbar, bis eure Lehrperson sie löscht. Eure eigenen Fotografien können einen GPS-Standort enthalten. Der Index bietet an, ihn vor dem Teilen zu entfernen, prüft aber trotzdem selbst, was eine Datei verrät, bevor ihr sie teilt.

## Teil 1: Den Index benutzen

![Webseite des Image Index]({{ site.baseurl }}/tutorials/assets/IR_webpage.jpg)

Öffnet den [Image Index](https://marcodemutiis.com/teaching/image-index/). Jedes Bild hat einen Score. Er ist die Summe von zehn Signalen, jeweils zwischen 0 und 1, multipliziert mit einem Gewicht, das ihr mit den Reglern von −100 (vergraben) bis +100 (hervorheben) einstellt. Die Presets stellen die Regler für euch ein.

- Klickt nacheinander auf **Feed**, **Search engine** und **Provenance** und beobachtet, wie sich die oberste Reihe verändert.
- Gebt eine Suchanfrage ein, zum Beispiel `sunset`. Der Index sucht die Wörter im Dateinamen, im Titel, in der Beschreibung und in den Keywords. Ein wiederholtes Wort hilft bis zu dreimal; ein Feld, das damit vollgestopft ist, wird bestraft.
- Sucht nach einer Wendung, die niemand verwendet hat, zum Beispiel `biennial of imaginary photographs 2027`. Es kommt nichts zurück: eine *Data Void* (Datenlücke). Fügt ein Bild hinzu, das die Wendung enthält, und es erscheint zuerst.
- Klickt auf ein Bild. Das Menü **Inspector** links zeigt, **was der Index aus der Datei gelesen hat**, die Rohdaten der Tags und **warum das Bild an dieser Stelle steht**.
- Jedes Bild hat die Buttons **+1 like** und **+1 comment**, je einmal klickbar, damit ihr seht, wie Popularität ein Ranking verschiebt. Sie werden zurückgesetzt, wenn ihr die Seite neu ladet. **Download file** gibt euch das JPEG, das ihr in ExifTool öffnen könnt (siehe Teil 3).
- **Copy link** speichert eure Einstellungen in der Adresse, damit ihr euer Ranking an andere schicken könnt.

## Teil 2: Was in einer Bilddatei steckt

Ein Foto ist mehr als seine Pixel. Die Datei trägt auch Textfelder, geschrieben in drei verbreiteten Standards:

- **EXIF**, von der Kamera geschrieben: Marke, Modell, Aufnahmedatum, GPS-Standort, Belichtung
- **IPTC**, von Redaktionen und Agenturen geschrieben: Titel, Bildunterschrift, Keywords, Urheber:in, Copyright
- **XMP**, ein erweiterbares Format, das ebenfalls Titel, Beschreibungen und Keywords enthält und angeben kann, wie ein Bild entstanden ist

![Diagramm: die Datenblöcke in einer JPEG-Datei und welche davon der Image Index liest]({{ site.baseurl }}/tutorials/assets/IR_metadata_de.png)

Der Index liest alle drei. Einige Felder sind für diese Lektion wichtig:

| Feld | Was der Index damit macht |
| --- | --- |
| `Make`, `Model` | das Bild "hat Kameradaten" |
| `DateTimeOriginal` | das Bild ist "aktuell" oder nicht |
| GPS-Breiten- und Längengrad | das Bild "hat einen Standort" |
| `Software` | sagt, welches Programm die Datei geschrieben hat; KI-Tools nennen sich hier oft selbst |
| Titel, Beschreibung, Keywords | wovon das Bild "handelt", wird für den Abgleich mit der Suchanfrage genutzt |
| `DigitalSourceType` (ein IPTC-Begriff, gespeichert in XMP) | sagt, ob das Bild eine Kameraaufnahme oder KI-generiert ist |

Der `DigitalSourceType`-Wert für ein vollständig KI-generiertes Bild ist `trainedAlgorithmicMedia`. Manche KI-Tools schreiben ihn, andere nicht, ein fehlendes Flag beweist also nichts. Ein Index, der dem Flag vertraut, sieht nur, was die Datei behauptet, und der Inhalt einer Datei lässt sich ändern. Nutzt **Reveal which images are actually AI-generated** im Index, um zu sehen, was die Metadaten verbergen.

### Wie KI-Angaben gespeichert werden

Die drei Standards oben wurden für Kameras und Bildagenturen gemacht. KI-Bildgebung fügt zwei weitere Wege hinzu, um zu sagen, wie ein Bild entstanden ist, und sie unterscheiden sich darin, wie weit man der Angabe trauen kann.

- **Ein Label in den üblichen Feldern.** Das IPTC, die Standardisierungsorganisation für Pressefotografie, veröffentlicht ein Vokabular namens *Digital Source Type*. Es empfiehlt, dass Software, die Bilder mit trainierten KI-Algorithmen erzeugt, den Wert `trainedAlgorithmicMedia` in die XMP-Daten der Datei schreibt ([iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)). Googles Merchant Center verlangt das Tag bei KI-generierten Produktbildern ([support.google.com/merchants/answer/14743464](https://support.google.com/merchants/answer/14743464)), und Meta nutzt es, um KI-Bilder auf Facebook, Instagram und Threads zu kennzeichnen ([iptc.org/?p=6867](https://iptc.org/?p=6867)). Dieses Label liest der Index. Es ist einfacher Text, wie ein Titel oder ein Kameramodell: Jede:r kann es einem Foto hinzufügen oder aus einem KI-Bild entfernen, so wie ihr es in Teil 3 tut.
- **Ein signierter Eintrag.** Die C2PA (Coalition for Content Provenance and Authenticity) definiert *Content Credentials*: einen kryptografisch signierten Eintrag zu Herkunft, Werkzeugen und Bearbeitungsverlauf, der an die Datei gebunden ist, damit eine spätere Änderung erkannt werden kann ([c2pa.org/specifications](https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html)). In einem JPEG ist dieser Eintrag nicht Teil von EXIF, IPTC oder XMP. Er liegt in APP11-Marker-Segmenten, in einem Containerformat namens JUMBF ([en.wikipedia.org/wiki/JUMBF](https://en.wikipedia.org/wiki/JUMBF)), und kann selbst den Digital-Source-Type-Wert enthalten. Der Index liest ihn nicht. Eine Signatur macht Änderungen sichtbar, nicht unmöglich: Der Eintrag lässt sich einfach entfernen, und Sicherheitsforscher:innen haben weitere Angriffe dokumentiert, etwa gefälschte Signaturen ([msi.dublincore.org/standards/c2pa](https://msi.dublincore.org/standards/c2pa)). Ist er einmal weg, sieht die Datei aus wie jede andere.

Weder ein Flag noch ein Credential beweist also, wie ein Bild entstanden ist: Das erste lässt sich fälschen, das zweite weglassen. Habt ihr ein KI-Bild mit Content Credentials, zeigt euch das [Verify-Tool](https://contentcredentials.org/verify), was darin steckt.

## Woher jeder Wert kommt

Der Index nutzt drei Arten von Information. Ihr seht sie im Inspector.

- **In der Datei:** die oben genannten Metadatenfelder (Kamera, Datum, GPS, Software, Titel, Beschreibung, Keywords, Urheber:in, Copyright, `DigitalSourceType`). Bearbeitet ihr die Datei, ändern sich diese Werte.
- **Aus den Pixeln berechnet:** die Durchschnittsfarbe und die Auflösung. Bearbeitet ihr die Metadaten, bleiben diese Werte gleich.
- **Außerhalb der Datei:** der Dateiname, die Likes und Kommentare, die Zufallszahl und das Flag "actually AI". Eine echte Plattform kennt Likes und Kommentare aus ihrer eigenen Datenbank, aus dem, was Menschen auf der Plattform getan haben. Eine Bilddatei hat dafür kein Feld. Hier sind sie pro Bild erfunden und neben dem Bild in einer Liste gespeichert (`manifest.json`). Ihr könnt mit den Buttons im Inspector nur einen Like und einen Kommentar pro Bild hinzufügen, und das geht verloren, wenn ihr neu ladet. ExifTool kann sie nicht ändern.

![Inspector Properties]({{ site.baseurl }}/tutorials/assets/IR_inspector.jpg)

### Die zehn Signale

Jedes Signal wird in eine Zahl zwischen 0 und 1 umgerechnet. Der Score eines Bildes ist die Summe aller Signale mal ihrem Reglergewicht (−100 bis +100, geteilt durch 100). Relative Signale (Recent, Popular, Colour, Resolution) werden an den anderen Bildern skaliert, die gerade im Index sind, der Wert eines Bildes ändert sich also, wenn ihr Bilder hinzufügt oder entfernt.

| Signal | Woher es kommt | Wie es berechnet wird |
| --- | --- | --- |
| **Recent** | Datei: `DateTimeOriginal` | Das neueste Bild bekommt 1, das älteste 0, die anderen liegen dazwischen. Kein Datum in der Datei: 0. |
| **Popular** | außerhalb der Datei: Likes und Kommentare | `log(1 + likes + 3 × comments)`, skaliert, sodass das beliebteste Bild 1 bekommt. Ein Kommentar zählt dreimal so viel wie ein Like. Der Logarithmus verhindert, dass ein einziges virales Bild alle anderen plattdrückt. |
| **Matches the query** | Dateiname, Titel, Beschreibung, Keywords | Jedes Wort der Suchanfrage wird an vier Stellen gesucht und nach Fundort gewichtet: Dateiname ×3, Titel ×2, Beschreibung ×2, Keywords ×1,5. Ein Wort zählt pro Stelle höchstens dreimal. Kommt es an einer Stelle öfter als fünfmal vor, gilt das als Stuffing, und der ganze Treffer fällt auf null. Der beste Treffer bekommt 1. |
| **Close to the colour** | Pixel: Durchschnittsfarbe des Bildes | Abstand zwischen der Durchschnittsfarbe und der gewählten Farbe. Das nächste Bild bekommt 1, das fernste 0. |
| **Has camera data** | Datei: `Make`, `Model` | 1, wenn eines von beiden vorhanden ist, sonst 0. |
| **Declared as AI** | Datei: `DigitalSourceType` oder `Software` | 1, wenn `DigitalSourceType` algorithmische Medien angibt oder `Software` ein bekanntes KI-Tool nennt (Midjourney, DALL·E, Firefly, Stable Diffusion und einige weitere). Sonst 0. |
| **Has a location** | Datei: GPS-Breiten- und Längengrad | 1, wenn beide vorhanden sind, sonst 0. |
| **High resolution** | Pixel: Breite × Höhe | Megapixel, skaliert vom kleinsten Bild (0) zum größten (1). |
| **Well documented** | Datei: neun Felder | Wie viele dieser Felder ausgefüllt sind: Kamera, Datum, GPS, Software, Titel, Beschreibung, Keywords, Urheber:in, Copyright. Geteilt durch neun. |
| **Random** | außerhalb der Datei | Eine Pseudozufallszahl pro Bild. Bei jedem Laden der Seite bekommt ihr neue Zahlen; **Shuffle** zieht neue, und ein kopierter Link behält sie. |

Manche dieser Signale sind Ja oder Nein (Kamera, KI, Standort), andere ein Verlauf. Ein echter Index mischt Hunderte von Signalen und lernt die Gewichte aus dem Verhalten der Nutzer:innen. Dieser hat zehn und lässt euch die Gewichte von Hand einstellen.

### Was der Inspector zeigt

- **What the index read from this file:** eine Tabelle der Werte, die der Index nutzt: Dateiname, Größe, Kamera, Datum, Standort, Software, Titel, Beschreibung, Keywords, Urheber:in, Copyright und ob das Bild als KI deklariert ist. Zwei Zeilen stammen nicht aus den Metadaten: *Popularity* (Likes und Kommentare, markiert mit "not stored in the file") und *Average colour* (aus den Pixeln gemessen). Bilder, die ihr hinzufügt, starten mit 0 Likes und 0 Kommentaren. Leere Felder erscheinen als "(none)", und der Index behandelt sie als fehlend.
- **Raw tags:** alles, was exifr für die Datei zurückgegeben hat, bevor der Index das Nötige ausgewählt hat.
- **Why it ranks here:** ein Balken pro Signal, dessen Regler nicht auf null steht, mit Signalwert × eurem Gewicht. So seht ihr, welche Regler das Bild an seinen Platz bringen.
- **Edit this file:** ein Formular mit den oben genannten Feldern. **Apply to file** schreibt eure Werte in das JPEG selbst, und der Index liest die Datei erneut. **Download file** speichert das Ergebnis, und **Restore original** macht eure Änderungen rückgängig (siehe Teil 3).
- **Like- und Kommentar-Buttons:** fügen dem Bild einen Like und einen Kommentar hinzu, bis ihr die Seite neu ladet.
- **Badges auf den Kacheln:** AI (declared), cam, GPS, *yours* (ein Bild, das ihr hinzugefügt habt), *stuffing* (Keyword-Stuffing bei einem Treffer erkannt). Mit eingeschaltetem Reveal seht ihr auch *actually AI* und *AI, not declared*, die Wahrheit, die der Index selbst nie sieht.

## Teil 3: Die Metadaten einer Datei bearbeiten

Legt eines eurer Fotos im Index ab oder wählt ein Beispielbild und klickt darauf. Es gibt zwei Wege, die Datei zu ändern. Der schnelle ist das Formular **Edit this file** im Inspector: Ändert ein Feld, klickt auf **Apply to file**, und der Index liest die Datei erneut, sodass ihr das Ranking reagieren seht. Bei einem Bild, das ihr abgelegt habt, ersetzt die Änderung das Bild in eurem Browser. Bei einem Beispielbild erzeugt Apply eine Kopie mit dem Namen `…-edit.jpg`. **Download file** speichert das Ergebnis. Der gründliche Weg ist ExifTool, das jedes Feld ändern, alle entfernen und zeigen kann, was wirklich in der Datei steckt. Bearbeitet die Datei und legt sie dann erneut im Index ab: Eine Datei mit demselben Namen ersetzt die frühere.

Um die Metadaten einer JPG-Datei mit ExifTool zu ändern, ladet es von [exiftool.org](https://exiftool.org/) herunter. Unter Windows benennt ihr `exiftool(-k).exe` in `exiftool.exe` um. Öffnet ein Terminal im Ordner mit eurem Foto (ändert den Dateinamen entsprechend eurer Datei) und führt aus:

```
exiftool photo.jpg
```

![Ein Ausschnitt der Metadaten, angezeigt mit dem Befehl exiftool]({{ site.baseurl }}/tutorials/assets/exiftool.jpg)

Das listet alles auf, was die Datei enthält. Um etwas zu ändern:

```
exiftool -Make="Apple" -Model="iPhone 15 Pro" photo.jpg
exiftool -DateTimeOriginal="2026:11:19 08:00:00" photo.jpg
exiftool -GPSLatitude=47.37 -GPSLatitudeRef=N -GPSLongitude=8.54 -GPSLongitudeRef=E photo.jpg
exiftool -XMP-dc:Title="Sunset study" -XMP-dc:Description="Sunset over the harbour" photo.jpg
exiftool -Software="Midjourney" photo.jpg
exiftool -XMP-iptcExt:DigitalSourceType=https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia photo.jpg
```

Um ein Feld zu entfernen, schreibt einen leeren Wert, zum Beispiel `-XMP-iptcExt:DigitalSourceType=`. Um alles zu entfernen:

```
exiftool -all= photo.jpg
```

Standardmäßig behält ExifTool euer Original als `photo.jpg_original`. Fügt `-overwrite_original` hinzu, wenn ihr diese Kopie nicht wollt.

Wenn ihr lieber keine Befehle tippt, gibt es grafische Oberflächen für ExifTool, zum Beispiel [pixelpeeper.com](https://pixelpeeper.com/) oder [jExifToolGUI](https://hvdwolf.github.io/jExifToolGUI/). In Adobe Bridge oder Photoshop bearbeitet *Datei → Dateiinformationen* Titel, Beschreibung, Keywords und Copyright, aber nicht Kameramarke und -modell.

Zwei Dinge solltet ihr im Kopf behalten:

- **Metadaten überleben den Weg oft nicht.** Viele Apps entfernen sie, wenn ihr ein Bild verkleinert oder exportiert, und viele Plattformen und Messenger entfernen sie, wenn ihr ein Foto schickt: Soziale Netzwerke löschen sie typischerweise aus der öffentlichen Kopie, behalten sie aber Berichten zufolge intern, und manche Messenger, etwa Signal, entfernen alles. Das Verhalten unterscheidet sich von App zu App, hängt davon ab, wie ihr sendet (als Foto oder als Datei), und ändert sich mit der Zeit. E-Mail-Anhänge und Cloud-Links liefern meist die vollständige Originaldatei. Ein Foto, das euch über einen Chat erreicht, kann also Kamera, Datum und Standort verloren haben, und ein Index, der es liest, sieht eine Datei ohne Geschichte. Wenn ihr eure eigenen Fotografien hinzufügt, schickt sie per Kabel, AirDrop, E-Mail oder Cloud-Link auf euren Computer, oder als *Datei* statt als Foto, und legt die Datei immer im Index ab, um zu prüfen, was überlebt hat.
- Einfache Metadaten hinterlassen keine Spur davon, dass sie geändert wurden, anders als signierte Content Credentials (siehe Teil 2). Genau darum geht es in den Übungen unten.

## Teil 4: Übungen

1. **Findet die gefälschten.** Wählt das Preset *Provenance*: Kamerafotos oben, deklarierte KI unten. Schaltet *Reveal* ein. Welche KI-Bilder sind nach oben gerutscht? Was sagen ihre Metadaten?
2. **Entfernen und wiederherstellen.** Legt eines eurer Smartphone-Fotos ab. Notiert seinen Rang unter *Provenance*. Entfernt die Metadaten mit `exiftool -all= photo.jpg` und legt die Datei erneut ab. Was hat sich geändert? Schreibt dann die Kameradaten zurück und legt die Datei ein drittes Mal ab.
3. **Fälscht es.** Nehmt ein eigenes KI-generiertes Bild. Fügt mit ExifTool Kameramarke und -modell hinzu und legt es unter *Provenance* ab. Fügt dann das `DigitalSourceType`-Flag hinzu und legt es erneut ab. Was glaubt der Index jetzt, und was stimmt? Wenn euer KI-Tool auch Content Credentials einbettet, öffnet das Original im Verify-Tool und vergleicht, was es zeigt, mit dem, was der Index sieht.
4. **Entwerft euer eigenes Ranking.** Wählt Gewichte oder eine Suchanfrage, die eine andere Idee davon beschreiben, was ein Bildindex belohnen sollte: Obskures vor Beliebtem, Altes vor Neuem, Undokumentiertes vor Dokumentiertem, eine Farbe. Gebt eurem Ranking einen Namen, kopiert den Link und schreibt einen Satz dazu, wessen Bilder steigen und wessen sinken.

## Ressourcen

- ExifTool: [exiftool.org](https://exiftool.org/)
- IPTC, *Reading and writing IPTC metadata on the command line using ExifTool*: [iptc.atlassian.net/wiki/x/AwC0Jg](https://iptc.atlassian.net/wiki/x/AwC0Jg)
- Michael Golebiewski und danah boyd, *Data Voids: Where Missing Data Can Easily Be Exploited*, Data & Society, 2018: [datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited](https://datasociety.net/library/data-voids-where-missing-data-can-easily-be-exploited/)
- Google, *Image SEO best practices*: [developers.google.com/search/docs/appearance/google-images](https://developers.google.com/search/docs/appearance/google-images)
- PixelPeeper: [pixelpeeper.com/](https://pixelpeeper.com/)
- IPTC, *IPTC publishes metadata guidance for AI-generated synthetic media*: [iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media](https://iptc.org/news/iptc-publishes-metadata-guidance-for-ai-generated-synthetic-media/)
- C2PA, *Content Credentials: C2PA Technical Specification*: [c2pa.org/specifications](https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html)
- Verify, um Content Credentials zu prüfen: [contentcredentials.org/verify](https://contentcredentials.org/verify)

</div>