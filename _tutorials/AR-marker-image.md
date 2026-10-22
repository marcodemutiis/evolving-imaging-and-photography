---
title: "AR Marker Image"
title_de: "AR Marker Image"
description: "Make a printed or on-screen image trigger an augmented reality overlay that replaces it, using marker tracking in Lens Studio (Snapchat) and Effect House (TikTok)."
description_de: "Lasst ein gedrucktes oder auf dem Bildschirm gezeigtes Bild ein Augmented-Reality-Overlay auslösen, das es ersetzt, mit Marker-Tracking in Lens Studio (Snapchat) und Effect House (TikTok)."
order: 3
published: true
---

<div class="lang-en" markdown="1">

## Overview

In this tutorial you will make an image that a phone camera recognises and replaces with something else: another image, a video or a 3D object, placed on top of the original and following it as you move. The technique is called marker tracking or image tracking. It is behind AR posters, museum guides, product packaging and print campaigns.

Early AR systems relied on fiducial markers, black-and-white square patterns designed to be easy for a computer to find, as in the ARToolKit library developed by Hirokazu Kato at the end of the 1990s. Today's tools do not need a special pattern. They analyse your image in advance, store its distinctive features (corners, edges, areas of contrast) and look for them in the camera feed. Almost any image with enough detail can become a marker, which is why the choice of image matters (see "Before you start").

The two tools in this tutorial do the same job on different platforms. Follow the one that fits your phone and accounts, or try both and compare.

| | Lens Studio | Effect House |
|---|---|---|
| Runs in | Snapchat | TikTok |
| You need | A Snapchat account on your phone | A TikTok account on your phone |
| Code | None needed | Visual scripting, little or no code |
| Sharing | Publish as a Lens, reviewed by Snap | Submit as an effect, reviewed by TikTok |
| Cost | Free | Free |

By the end you will be able to:

- choose and prepare an image that tracks well
- replace that image with another one in Lens Studio or Effect House
- test the result on your phone with a printout or a second screen
- compare how the two platforms handle the same idea

## Software & Tools

- [Lens Studio](https://ar.snap.com/lens-studio) (macOS, Windows): Snap's free tool for making Snapchat Lenses. You test your Lens on your phone in the Snapchat app.
- [Effect House](https://effecthouse.tiktok.com/) (macOS, Windows): TikTok's free tool for making TikTok effects. You need a TikTok account to log in. Its marker tracking object is called `Target Tracker`.

Alternatives:

- [8th Wall](https://8thwall.org/) (macOS, Windows, web): a free, open source toolset for web AR that runs in the phone's browser, with no app to install. The hosted platform closed on 28 February 2026, and the open source engine continues at 8thwall.org.
- [MindAR](https://github.com/hiukim/mind-ar-js) (web): an open source JavaScript library for image tracking in the browser.
- [Vuforia](https://developer.vuforia.com/) (iOS, Android, Unity): a long-established engine with "image targets".

## Before you start

- **Choose a marker with a lot of detail and contrast.** Photographs with varied texture work well. Avoid repetitive patterns, large empty areas and low-resolution images.
- **Do not rely on colour.** Detection works on contrast and detail, not on colour. Images that differ only in colour may not be told apart.
- **Prepare your files.** Lens Studio recommends a PNG or JPG of 2048 × 2048 pixels or less for the marker.
- **Match the replacement to the marker.** Give the replacement image the same proportions as the marker, so that it covers the marker exactly instead of being stretched.
- **Mind the surface and the light.** Flat, matte paper in even light tracks best. Glossy surfaces and reflections on a screen lower the tracking quality. Detection is fastest when the marker is in the centre of the camera view.
- **Print it or show it on a second screen.** Your phone's camera needs to see the marker while the AR runs, so you cannot use the screen of the same phone. A printout gives the most stable result.
- **Use images responsibly.** You can use your own images or appropriate existing ones. Part of the power of AR marker images is reclaiming an image by laying your own over it. However, make sure the result does not become offensive.

## AR marker image in Lens Studio -> Snapchat

Lens Studio is Snap's free tool for making Lenses. You need a Snapchat account on your phone.

### Install and set up

1. Go to [ar.snap.com/lens-studio](https://ar.snap.com/lens-studio) and download Lens Studio.
2. Make sure you have Snapchat on your phone. If you don't, download the app and sign up for an account.
3. Open Lens Studio and close the Home window. You will be in your default project window.

By default, the interface is divided into six panels: Scene Hierarchy, Asset Browser, Scene, Logger, Inspector and Preview.

<!-- IMAGE: Lens Studio default project window with the six panels -->
![Lens Studio]({{ site.baseurl }}/tutorials/assets/AR_LensStudioSetup.png)


### Create the effect

1. In the top menu, click `Asset Library` and search for "marker image". On the first result, `Marker Image`, click `Import`, then close the Asset Library window.

![Lens Studio Marker Image Import]({{ site.baseurl }}/tutorials/assets/AR_LensStudioMarkerImageImport.png)

2. Drag the image you want to use as a marker from your computer into the Asset Browser panel.
3. In the Asset Browser panel, click the `>` sign next to `Marker Image.lspkg` and select `Image Marker [EDIT_ME]`.
4. In the Inspector panel, find the `Marker Texture` field, click the image icon and select your marker image. You can also drag the image onto the field.

![Lens Studio Target Texture]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTargetTexture.png)

5. Still in the Inspector panel, set `Marker Height` to the real height of your printed image in centimetres. This makes the size of the marker in the Scene panel match its size in the physical world.
6. In the Scene Hierarchy panel, click the `>` sign next to `Marker Image` and select `Tracked Image [REPLACE_ME]`.
7. In the Inspector panel, change its image to your replacement image. You can also drag the image onto the texture field.

<!-- CHECK: name of the texture field in the inspector for the replacement image -->
<!-- IMAGE: Inspector panel with the Marker Texture and Marker Height fields -->
![Lens Studio Tracked Texture]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTrackedTexture.png)

Because `Tracked Image [REPLACE_ME]` is attached to the marker, it follows the marker when the camera or the print moves. You can attach other objects to the marker in the same way, for example a video, a text or a 3D object. A single Lens can contain up to 10 markers, each with its own content.

### Test the effect

1. Click `Preview Lens`.
2. Open Snapchat on your phone and scan the code.
3. Point the camera at your printed marker, or at the marker on a second screen. Your replacement image should appear on top of it.

If the Lens does not appear on your phone, check that Lens Studio and your phone are paired to the same Snapchat account (see Snap's [Pairing to Snapchat](https://developers.snap.com/lens-studio/lens-studio-workflow/pairing-to-snapchat) guide).

<!-- IMAGE: Phone screenshot of the replacement image covering the marker -->
![Lens Studio Test on Phone]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTest.png)

The Preview panel in Lens Studio cannot see your marker unless you import a video of it. To test the tracking with your phone's camera, preview the Lens in Snapchat.

### Publish your effect (optional)

When you are happy with your Lens, you can submit it to Snap for review. You do not need to publish to finish this tutorial, since previewing on your phone is enough. See Snap's guide to [submitting your Lens](https://developers.snap.com/lens-studio/publishing/submitting/submitting-your-lens).

## AR marker image in Effect House -> TikTok

Effect House is TikTok's free tool for making effects. You need a TikTok account on your phone.

### Install and set up

1. Go to [effecthouse.tiktok.com](https://effecthouse.tiktok.com/), then click `Download` at the top of the page. Install the app.
2. Open Effect House. It asks you to log in with your TikTok account and shows a QR code.
3. On your phone, open TikTok, go to `Profile`, tap `Add friends` and tap the scanner icon. Scan the code and tap `Confirm`. You can also click `Log in with other methods`.

The Effect House window has a Title Bar at the top and six panels: Hierarchy, Assets, Scene, Visual Scripting, Preview and Inspector.

<!-- IMAGE: Effect House window with the Title Bar and the six panels -->
![Effect House Setup]({{ site.baseurl }}/tutorials/assets/AR_EffectHouseSetup.png)


### Create the effect

1. Drag your marker image and your replacement image into the Assets panel. Select each one and, in the Inspector panel, set `Compression Type` to `None`.
2. Click `+ Add object` and select `AR Tracking` > `Target Tracker`. Effect House adds a `Target Tracker` with a default image and a cube inside it. You can use the cube to test your setup first.

![Effect House Target Tracker]({{ site.baseurl }}/tutorials/assets/AR_EffectHouseTargetTracker.png)

3. Select `Target Tracker` in the Hierarchy panel. In the Inspector panel, find the `Target Tracker` component and replace the default texture in the `Target Texture` field with your marker image.
4. Preview the cube on your phone (see "Test the effect" below).
5. If it works, delete the cube. Click `+ Add object` and select `3D Image`. Drag the `3D Image` onto `Target Tracker` in the Hierarchy panel, so that it is nested inside it. In the Inspector panel, set its texture to your replacement image.

![Effect House Add 3D Image]({{ site.baseurl }}/tutorials/assets/AR_EffectHouse3DImageAdd.png)

6. Rotate the `3D Image` until it is parallel to your marker image (`Rotate X: -90`), and adjust its size. If the marker image and the replacement image have the same size and you want the replacement to be the same size, use `Size X: 2, Y: 2, Z: 2`. The preview can be misleading, so you may have to test several times.

![Effect House Adjust 3D Image]({{ site.baseurl }}/tutorials/assets/AR_EffectHouse3DImageAdj.png)

7. Preview the effect on your phone again.

<!-- CHECK: exact names of the Compression Type field and of the texture field of the 3D Image -->
<!-- IMAGE: Hierarchy and Inspector panels with the Target Tracker and the 3D Image -->

Because the `3D Image` is nested inside the `Target Tracker`, it follows the marker when the camera or the print moves. You can nest other objects in the same way.

### Test the effect

1. Click `Preview in TikTok` at the top right of the window to generate a QR code.
2. On your phone, open TikTok and go to `Profile`. Tap the menu icon at the top right, tap `My QR code`, then tap the scan icon at the top right and scan the code.
3. Point the camera at your printed marker, or at the marker on a second screen. Your replacement image should appear on top of it.

<!-- IMAGE: Effect House title bar with the preview QR code -->

The Preview panel in Effect House can test your effect with your own images and videos (click `+ Add media`). To try the tracking with your phone's camera, preview the effect in TikTok.

### Publish your effect (optional)

When you are happy with your effect, click `Submit` in the toolbar and complete the publishing flow. TikTok reviews effects before they become public. You do not need to publish to finish this tutorial, since previewing on your phone is enough. See the Effect House guide to [submitting your effect](https://effecthouse.tiktok.com/learn/guides/publishing/submit-your-effect).

## Troubleshooting

- **The marker is not detected.** Check the image against the guidelines above: low contrast, repetitive patterns and large empty areas all make detection harder. Try a different image.
- **Detection is slow or flickers.** Reduce glare, use matte paper and even light, hold the phone still, and keep the marker in the centre of the view.
- **The replacement is too big, too small or misaligned.** In Lens Studio, check `Marker Height` against the printed size. In Effect House, adjust the size of the `3D Image`. In both, make sure the replacement has the same proportions as the marker.
- **The experience does not appear on the phone.** In Lens Studio, check that your phone is paired to the same Snapchat account. In Effect House, check that you scanned the preview QR code with the TikTok app. In both, check that the app has permission to use the camera.
- **A second marker triggers the wrong content.** Images that look similar may be confused. Make your markers clearly different in shape and detail, not only in colour.

## Exercise: overwrite an image

Choose an image that you have made or may use, and make it the marker. Then make a replacement that changes how the viewer reads the original. For example:

- the same image at another moment in time, before and after
- the same image with the hidden part revealed, or the visible part removed
- another image or a caption that contradicts what the image seems to show

Print the marker, build the overlay in Lens Studio or Effect House and test it on your phone. If you have time, build the same overlay in the other app and compare: how long did it take, how stable is the tracking, and who can see the result?

Think about what changes when the authority of a printed image can be overwritten at the moment of viewing, and who controls the layer on top.

## Resources

- [Lens Studio: Marker](https://developers.snap.com/lens-studio/features/ar-tracking/world/world-templates/image-marker)
- [Lens Studio: Marker Tracking](https://developers.snap.com/lens-studio/features/ar-tracking/world/marker-tracking)
- [Effect House: Learn](https://effecthouse.tiktok.com/learn/)
- [Effect House: Migrating from Lens Studio](https://effecthouse.tiktok.com/learn/guides/getting-started/migrating-to-effect-house/migrating-from-lens-studio-to-effect-house)

</div>

<div class="lang-de" markdown="1">

## Überblick

In diesem Tutorial erstellt ihr ein Bild, das eine Smartphone-Kamera erkennt und durch etwas anderes ersetzt: ein anderes Bild, ein Video oder ein 3D-Objekt, das über dem Original liegt und ihm folgt, wenn ihr euch bewegt. Die Technik heißt Marker-Tracking oder Image Tracking. Sie steckt hinter AR-Postern, Museumsführungen, Produktverpackungen und Printkampagnen.

Frühe AR-Systeme beruhten auf Fiducial Markers, schwarz-weißen quadratischen Mustern, die für Computer leicht zu finden sind, etwa in der Bibliothek ARToolKit, die Hirokazu Kato Ende der 1990er-Jahre entwickelte. Heutige Werkzeuge brauchen kein spezielles Muster. Sie analysieren euer Bild im Voraus, speichern seine charakteristischen Merkmale (Ecken, Kanten, Kontrastflächen) und suchen sie im Kamerabild. Fast jedes Bild mit genügend Details kann zum Marker werden. Deshalb ist die Wahl des Bildes wichtig (siehe „Vor dem Start“).

Die beiden Werkzeuge in diesem Tutorial leisten dasselbe auf verschiedenen Plattformen. Folgt dem, das zu eurem Smartphone und euren Accounts passt, oder probiert beide aus und vergleicht sie.

| | Lens Studio | Effect House |
|---|---|---|
| Läuft in | Snapchat | TikTok |
| Ihr braucht | Einen Snapchat-Account auf eurem Smartphone | Einen TikTok-Account auf eurem Smartphone |
| Code | Keiner nötig | Visual Scripting, wenig oder kein Code |
| Veröffentlichen | Als Lens veröffentlichen, Prüfung durch Snap | Als Effekt einreichen, Prüfung durch TikTok |
| Kosten | Kostenlos | Kostenlos |

Am Ende könnt ihr:

- ein Bild auswählen und vorbereiten, das sich gut tracken lässt
- dieses Bild in Lens Studio oder Effect House durch ein anderes ersetzen
- das Ergebnis mit einem Ausdruck oder einem zweiten Bildschirm auf eurem Smartphone testen
- vergleichen, wie die beiden Plattformen dieselbe Idee umsetzen

## Software & Tools

- [Lens Studio](https://ar.snap.com/lens-studio) (macOS, Windows): Snaps kostenloses Werkzeug zum Erstellen von Snapchat Lenses. Ihr testet eure Lens auf dem Smartphone in der Snapchat-App.
- [Effect House](https://effecthouse.tiktok.com/) (macOS, Windows): TikToks kostenloses Werkzeug zum Erstellen von TikTok-Effekten. Zum Einloggen braucht ihr einen TikTok-Account. Das Objekt für Marker-Tracking heißt `Target Tracker`.

Alternativen:

- [8th Wall](https://8thwall.org/) (macOS, Windows, Web): ein kostenloses, quelloffenes Toolset für Web-AR, das im Browser des Smartphones läuft, ohne dass eine App installiert werden muss. Die gehostete Plattform wurde am 28. Februar 2026 eingestellt, die quelloffene Engine wird auf 8thwall.org weitergeführt.
- [MindAR](https://github.com/hiukim/mind-ar-js) (Web): eine quelloffene JavaScript-Bibliothek für Image Tracking im Browser.
- [Vuforia](https://developer.vuforia.com/) (iOS, Android, Unity): eine etablierte Engine mit „Image Targets“.

## Vor dem Start

- **Wählt einen Marker mit vielen Details und hohem Kontrast.** Fotografien mit abwechslungsreicher Textur funktionieren gut. Vermeidet sich wiederholende Muster, große leere Flächen und Bilder mit niedriger Auflösung.
- **Verlasst euch nicht auf Farbe.** Die Erkennung beruht auf Kontrast und Details, nicht auf Farbe. Bilder, die sich nur in der Farbe unterscheiden, werden möglicherweise nicht auseinandergehalten.
- **Bereitet eure Dateien vor.** Lens Studio empfiehlt für den Marker eine PNG- oder JPG-Datei mit höchstens 2048 × 2048 Pixeln.
- **Passt das Ersatzbild an den Marker an.** Gebt dem Ersatzbild dieselben Proportionen wie dem Marker, damit es den Marker genau abdeckt und nicht verzerrt wird.
- **Achtet auf Oberfläche und Licht.** Flaches, mattes Papier bei gleichmäßigem Licht funktioniert am besten. Glänzende Oberflächen und Spiegelungen auf einem Bildschirm verschlechtern das Tracking. Die Erkennung ist am schnellsten, wenn der Marker in der Mitte des Kamerabilds liegt.
- **Druckt ihn aus oder zeigt ihn auf einem zweiten Bildschirm.** Die Kamera eures Smartphones muss den Marker sehen, während die AR läuft. Ihr könnt also nicht den Bildschirm desselben Smartphones verwenden. Ein Ausdruck liefert das stabilste Ergebnis.
- **Geht verantwortungsvoll mit Bildern um.** Ihr könnt eigene Bilder verwenden oder euch vorhandene Bilder aneignen. Ein Teil der Kraft von AR-Markerbildern liegt darin, ein Bild zurückzugewinnen, indem man ein eigenes darüberlegt. Achtet aber darauf, dass das Ergebnis nicht verletzend wird.

## AR Marker Image in Lens Studio -> Snapchat

Lens Studio ist Snaps kostenloses Werkzeug zum Erstellen von Lenses. Ihr braucht einen Snapchat-Account auf eurem Smartphone.

### Installation und Einrichtung

1. Geht auf [ar.snap.com/lens-studio](https://ar.snap.com/lens-studio) und ladet Lens Studio herunter.
2. Stellt sicher, dass Snapchat auf eurem Smartphone installiert ist. Falls nicht, ladet die App herunter und legt einen Account an.
3. Öffnet Lens Studio und schließt das Home-Fenster. Ihr seht nun das Standard-Projektfenster.

Standardmäßig ist die Oberfläche in sechs Panels unterteilt: Scene Hierarchy, Asset Browser, Scene, Logger, Inspector und Preview.

<!-- IMAGE: Lens Studio default project window with the six panels -->
![Lens Studio]({{ site.baseurl }}/tutorials/assets/AR_LensStudioSetup.png)


### Den Effekt erstellen

1. Klickt im oberen Menü auf `Asset Library` und sucht nach „marker image“. Klickt beim ersten Ergebnis, `Marker Image`, auf `Import` und schließt dann das Asset-Library-Fenster.

![Lens Studio Marker Image Import]({{ site.baseurl }}/tutorials/assets/AR_LensStudioMarkerImageImport.png)

2. Zieht das Bild, das ihr als Marker verwenden wollt, von eurem Computer in das Asset-Browser-Panel.
3. Klickt im Asset-Browser-Panel auf das `>` neben `Marker Image.lspkg` und wählt `Image Marker [EDIT_ME]`.
4. Sucht im Inspector-Panel das Feld `Marker Texture`, klickt auf das Bildsymbol und wählt euer Markerbild. Ihr könnt das Bild auch auf das Feld ziehen.

![Lens Studio Target Texture]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTargetTexture.png)

5. Stellt, weiterhin im Inspector-Panel, `Marker Height` auf die tatsächliche Höhe eures ausgedruckten Bildes in Zentimetern ein. So entspricht die Größe des Markers im Scene-Panel seiner Größe in der physischen Welt.
6. Klickt im Scene-Hierarchy-Panel auf das `>` neben `Marker Image` und wählt `Tracked Image [REPLACE_ME]`.
7. Ändert im Inspector-Panel das Bild auf euer Ersatzbild. Ihr könnt das Bild auch auf das Texturfeld ziehen.

<!-- CHECK: name of the texture field in the inspector for the replacement image -->
<!-- IMAGE: Inspector panel with the Marker Texture and Marker Height fields -->
![Lens Studio Tracked Texture]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTrackedTexture.png)

Weil `Tracked Image [REPLACE_ME]` am Marker befestigt ist, folgt es dem Marker, wenn sich die Kamera oder der Ausdruck bewegt. Auf dieselbe Weise könnt ihr weitere Objekte am Marker befestigen, zum Beispiel ein Video, einen Text oder ein 3D-Objekt. Eine einzelne Lens kann bis zu 10 Marker enthalten, jeder mit eigenem Inhalt.

### Den Effekt testen

1. Klickt auf `Preview Lens`.
2. Öffnet Snapchat auf eurem Smartphone und scannt den Code.
3. Richtet die Kamera auf euren ausgedruckten Marker oder auf den Marker auf einem zweiten Bildschirm. Euer Ersatzbild sollte darüber erscheinen.

Falls die Lens nicht auf eurem Smartphone erscheint, prüft, ob Lens Studio und euer Smartphone mit demselben Snapchat-Account gekoppelt sind (siehe Snaps Anleitung [Pairing to Snapchat](https://developers.snap.com/lens-studio/lens-studio-workflow/pairing-to-snapchat), auf Englisch).

<!-- IMAGE: Phone screenshot of the replacement image covering the marker -->
![Lens Studio Test on Phone]({{ site.baseurl }}/tutorials/assets/AR_LensStudioTest.png)

Das Preview-Panel in Lens Studio sieht euren Marker nur, wenn ihr ein Video davon importiert. Um das Tracking mit der Kamera eures Smartphones zu testen, startet die Vorschau der Lens in Snapchat.

### Den Effekt veröffentlichen (optional)

Wenn ihr mit eurer Lens zufrieden seid, könnt ihr sie zur Prüfung bei Snap einreichen. Für dieses Tutorial müsst ihr nichts veröffentlichen, die Vorschau auf dem Smartphone genügt. Siehe Snaps Anleitung zum [Einreichen einer Lens](https://developers.snap.com/lens-studio/publishing/submitting/submitting-your-lens) (auf Englisch).

## AR Marker Image in Effect House -> TikTok

Effect House ist TikToks kostenloses Werkzeug zum Erstellen von Effekten. Ihr braucht einen TikTok-Account auf eurem Smartphone.

### Installation und Einrichtung

1. Geht auf [effecthouse.tiktok.com](https://effecthouse.tiktok.com/) und klickt oben auf der Seite auf `Download`. Installiert die App.
2. Öffnet Effect House. Es fordert euch auf, euch mit eurem TikTok-Account anzumelden, und zeigt einen QR-Code.
3. Öffnet auf eurem Smartphone TikTok, geht zu `Profile`, tippt auf `Add friends` und dann auf das Scanner-Symbol. Scannt den Code und tippt auf `Confirm`. Alternativ könnt ihr auf `Log in with other methods` klicken.

Das Effect-House-Fenster hat oben eine Title Bar und sechs Panels: Hierarchy, Assets, Scene, Visual Scripting, Preview und Inspector.

<!-- IMAGE: Effect House window with the Title Bar and the six panels -->
![Effect House Setup]({{ site.baseurl }}/tutorials/assets/AR_EffectHouseSetup.png)


### Den Effekt erstellen

1. Zieht euer Markerbild und euer Ersatzbild in das Assets-Panel. Wählt jedes Bild aus und setzt im Inspector-Panel `Compression Type` auf `None`.
2. Klickt auf `+ Add object` und wählt `AR Tracking` > `Target Tracker`. Effect House fügt einen `Target Tracker` mit einem Standardbild und einem Würfel darin hinzu. Mit dem Würfel könnt ihr zuerst euer Setup testen.

![Effect House Target Tracker]({{ site.baseurl }}/tutorials/assets/AR_EffectHouseTargetTracker.png)

3. Wählt `Target Tracker` im Hierarchy-Panel aus. Sucht im Inspector-Panel die Komponente `Target Tracker` und ersetzt im Feld `Target Texture` die Standardtextur durch euer Markerbild.
4. Testet den Würfel auf eurem Smartphone (siehe „Den Effekt testen“ unten).
5. Wenn es funktioniert, löscht den Würfel. Klickt auf `+ Add object` und wählt `3D Image`. Zieht das `3D Image` im Hierarchy-Panel auf `Target Tracker`, sodass es darin verschachtelt ist. Setzt im Inspector-Panel seine Textur auf euer Ersatzbild.

![Effect House Add 3D Image]({{ site.baseurl }}/tutorials/assets/AR_EffectHouse3DImageAdd.png)

6. Dreht das `3D Image`, bis es parallel zu eurem Markerbild liegt (`Rotate X: -90`), und passt seine Größe an. Haben Markerbild und Ersatzbild dieselbe Größe und soll das Ersatzbild gleich groß sein, verwendet `Size X: 2, Y: 2, Z: 2`. Die Vorschau kann irreführend sein, deshalb müsst ihr möglicherweise mehrmals testen.

![Effect House Adjust 3D Image]({{ site.baseurl }}/tutorials/assets/AR_EffectHouse3DImageAdj.png)

7. Testet den Effekt erneut auf eurem Smartphone.

<!-- CHECK: exact names of the Compression Type field and of the texture field of the 3D Image -->
<!-- IMAGE: Hierarchy and Inspector panels with the Target Tracker and the 3D Image -->

Weil das `3D Image` im `Target Tracker` verschachtelt ist, folgt es dem Marker, wenn sich die Kamera oder der Ausdruck bewegt. Auf dieselbe Weise könnt ihr weitere Objekte verschachteln.

### Den Effekt testen

1. Klickt oben rechts im Fenster auf `Preview in TikTok`, um einen QR-Code zu erzeugen.
2. Öffnet auf eurem Smartphone TikTok und geht zu `Profile`. Tippt oben rechts auf das Menüsymbol, tippt auf `My QR code`, tippt dann oben rechts auf das Scan-Symbol und scannt den Code.
3. Richtet die Kamera auf euren ausgedruckten Marker oder auf den Marker auf einem zweiten Bildschirm. Euer Ersatzbild sollte darüber erscheinen.

<!-- IMAGE: Effect House title bar with the preview QR code -->

Im Preview-Panel von Effect House könnt ihr euren Effekt mit eigenen Bildern und Videos testen (klickt auf `+ Add media`). Um das Tracking mit der Kamera eures Smartphones auszuprobieren, startet die Vorschau in TikTok.

### Den Effekt veröffentlichen (optional)

Wenn ihr mit eurem Effekt zufrieden seid, klickt in der Toolbar auf `Submit` und durchlauft den Veröffentlichungsprozess. TikTok prüft Effekte, bevor sie öffentlich werden. Für dieses Tutorial müsst ihr nichts veröffentlichen, die Vorschau auf dem Smartphone genügt. Siehe die Effect-House-Anleitung zum [Einreichen eures Effekts](https://effecthouse.tiktok.com/learn/guides/publishing/submit-your-effect) (auf Englisch).

## Fehlerbehebung

- **Der Marker wird nicht erkannt.** Prüft das Bild anhand der Hinweise oben: Geringer Kontrast, sich wiederholende Muster und große leere Flächen erschweren die Erkennung. Probiert ein anderes Bild.
- **Die Erkennung ist langsam oder flackert.** Reduziert Spiegelungen, verwendet mattes Papier und gleichmäßiges Licht, haltet das Smartphone ruhig und lasst den Marker in der Mitte des Bildes.
- **Das Ersatzbild ist zu groß, zu klein oder verschoben.** Prüft in Lens Studio `Marker Height` anhand der gedruckten Größe. Passt in Effect House die Größe des `3D Image` an. Achtet in beiden darauf, dass das Ersatzbild dieselben Proportionen wie der Marker hat.
- **Die AR-Erfahrung erscheint nicht auf dem Smartphone.** Prüft in Lens Studio, ob euer Smartphone mit demselben Snapchat-Account gekoppelt ist. Prüft in Effect House, ob ihr den Vorschau-QR-Code mit der TikTok-App gescannt habt. Prüft in beiden, ob die App die Berechtigung hat, die Kamera zu verwenden.
- **Ein zweiter Marker löst falsche Inhalte aus.** Ähnlich aussehende Bilder können verwechselt werden. Macht eure Marker in Form und Details deutlich unterschiedlich, nicht nur in der Farbe.

## Übung: ein Bild überschreiben

Wählt ein Bild, das ihr selbst gemacht habt oder verwenden dürft, und macht es zum Marker. Erstellt dann ein Ersatzbild, das verändert, wie die Betrachter:innen das Original lesen. Zum Beispiel:

- dasselbe Bild zu einem anderen Zeitpunkt, davor und danach
- dasselbe Bild, bei dem das Verborgene sichtbar wird oder das Sichtbare entfernt ist
- ein anderes Bild oder eine Bildunterschrift, die dem widerspricht, was das Bild zu zeigen scheint

Druckt den Marker aus, baut das Overlay in Lens Studio oder Effect House und testet es auf eurem Smartphone. Wenn ihr Zeit habt, baut dasselbe Overlay in der anderen App und vergleicht: Wie lange hat es gedauert, wie stabil ist das Tracking und wer kann das Ergebnis sehen?

Überlegt, was sich verändert, wenn die Autorität eines gedruckten Bildes im Moment des Betrachtens überschrieben werden kann, und wer die Ebene darüber kontrolliert.

## Ressourcen

- [Lens Studio: Marker](https://developers.snap.com/lens-studio/features/ar-tracking/world/world-templates/image-marker)
- [Lens Studio: Marker Tracking](https://developers.snap.com/lens-studio/features/ar-tracking/world/marker-tracking)
- [Effect House: Learn](https://effecthouse.tiktok.com/learn/)
- [Effect House: Migrating from Lens Studio](https://effecthouse.tiktok.com/learn/guides/getting-started/migrating-to-effect-house/migrating-from-lens-studio-to-effect-house)

</div>