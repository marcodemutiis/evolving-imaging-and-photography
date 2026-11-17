---
layout: tutorial
title: "MetaHuman Avatars"
title_de: "MetaHuman-Avatare"
description: "Create a photorealistic digital human in Unreal Engine with MetaHuman Creator, from preset to assembled character in a scene."
description_de: "Erstellt mit dem MetaHuman Creator in Unreal Engine einen fotorealistischen digitalen Menschen, vom Preset bis zur fertigen Figur in einer Szene."
order: 11
published: true
---

<div class="lang-en" markdown="1">

## Overview

In this tutorial you will create a digital human with MetaHuman Creator inside Unreal Engine, and place it in a scene ready to be lit, posed and photographed.

MetaHuman is Epic Games' system for producing photorealistic human characters. You do not model a face from scratch: you move through a parametric space of faces and bodies, blending presets, sculpting features and choosing skin, eyes and hair. Every choice is a position within a range the software has already defined. Working with it is a way to see how the digital body is standardised, what can be adjusted, what is fixed, and what kind of "human" becomes the default.

By the end of this tutorial you will be able to:

- set up an Unreal Engine project with MetaHuman Creator
- create a MetaHuman character from a preset
- adjust body, head, skin and hair
- rig and assemble your character
- place your MetaHuman in a scene

## Software and Tools

- [Unreal Engine](https://www.unrealengine.com/download) 5.6 or newer, installed through the Epic Games Launcher (free)
- **MetaHuman Creator Core Data**, an optional download for Unreal Engine (see below)
- the **MetaHuman Creator** plugin, which ships with Unreal Engine

MetaHuman Creator runs inside the Unreal Editor on Windows, macOS and Linux (as of Unreal Engine 5.7). A recent graphics card helps: the characters are heavy, and the editor can be slow on older laptops.

## Before you start

- **Create an Epic Games account.** You need it to log in to the Epic Games Launcher and download Unreal Engine.
- **Make space on your drive.** Unreal Engine and the MetaHuman data take up a lot of disk space. Check before you start the download.
- **Stay online.** Rigging and texture generation run on Epic's cloud services, so you need an internet connection when you assemble your character.

## Setting up the project

1. Download and install the Epic Games Launcher, then install Unreal Engine from the **Unreal Engine** tab.

   ![Unreal Engine in the Epic Games Launcher]({{ site.baseurl }}/tutorials/assets/MH_image1.png)

2. Click on the arrow next to **Launch** and select **Options** in the menu. Check **MetaHuman Creator Core Data**, so it will be downloaded if you don't have it yet. Then click **Apply** and **Launch**.

   ![Installation options with MetaHuman Creator Core Data]({{ site.baseurl }}/tutorials/assets/MH_image2.png)

3. Choose **New Project** > **Film / Video & Live Events** > **Cinematic**.

   ![New Cinematic project]({{ site.baseurl }}/tutorials/assets/MH_image3.png)

4. Select **Edit** > **Plugins**.

   ![Edit menu with Plugins]({{ site.baseurl }}/tutorials/assets/MH_image4.png)

5. Type *metahuman* in the search field and select **MetaHuman Creator**. Apply and restart Unreal Engine.

   ![MetaHuman Creator plugin]({{ site.baseurl }}/tutorials/assets/MH_image5.png)

## Creating a MetaHuman

1. Select **Window** > **Content Browser** and choose **Content Browser 1**. This opens a panel at the bottom of the editor.

   ![Opening the Content Browser]({{ site.baseurl }}/tutorials/assets/MH_image6.png)

2. In the Content Browser panel, right-click and select **MetaHuman** > **MetaHuman Character** from the menu. A MetaHuman file appears in the Content Browser. Give it a name.

   ![Creating a MetaHuman Character]({{ site.baseurl }}/tutorials/assets/MH_image7.png)

3. Double-click on your MetaHuman. If you get a notification about missing settings, click **Enable Missing** and restart the project. The MetaHuman Creator window opens.

   ![The MetaHuman Creator window]({{ site.baseurl }}/tutorials/assets/MH_image8.png)

## Shaping your character

The easiest way to create a MetaHuman is to start from a preset and then adjust its appearance.

### Start from a preset

Click on **Preset** and choose an existing model.

![Choosing a preset]({{ site.baseurl }}/tutorials/assets/MH_image9.png)

### Body

Click on **Head and Body** and select other body types to change the different parts of your model. Alternatively, click on **Body Params** to adjust every parameter manually.

![Head and Body options]({{ site.baseurl }}/tutorials/assets/MH_image10.png)

### Head

Click on **Head Sculpt** to fine-tune the details of the head manually. Switch to **Clay** or **Topography** to get a better view of the model's geometry. Select **Head Transform** to change features symmetrically, such as eyes and ears.

![Head Sculpt]({{ site.baseurl }}/tutorials/assets/MH_image11.png)

### Skin, hair and clothing

- **Materials.** Change skin colour, eyes, teeth and make-up.
- **Hair & Clothing.** Choose hairstyle, eyebrows, beard and clothing.
- **More clothing.** You can find MetaHuman-compatible clothing on [fab.com](https://www.fab.com), Epic's asset store, some of it for free.

## Assembling your MetaHuman

Before your character can be used in a scene, it needs a rig (the skeleton that lets it move) and full-resolution textures.

1. When you are happy with your character, click on **Assembly**. You will get an error message that the character is not rigged.

   ![Assembly error: character not rigged]({{ site.baseurl }}/tutorials/assets/MH_image12.png)

2. Select **Create Full Rig** if you want the face of your character to be rigged as well. Choose **Create Joints Only Rig** if the face will be covered or you don't need to animate it.

   ![Rig options]({{ site.baseurl }}/tutorials/assets/MH_image13.png)

3. You will get a notification that textures are missing. Click **Download Texture Sources**.

   ![Download Texture Sources]({{ site.baseurl }}/tutorials/assets/MH_image14.png)

4. Click **Assemble**.

   ![Assemble]({{ site.baseurl }}/tutorials/assets/MH_image15.png)

5. Your project now has a new folder: **MetaHumans** > *YourMetaHumanName*. Open it and drag your MetaHuman into the scene.

## If something goes wrong

- **Skin options are greyed out.** MetaHuman Creator Core Data is missing. Go back to the Epic Games Launcher, open **Options** for your Unreal Engine version and check **MetaHuman Creator Core Data**.
- **MetaHuman does not appear in the right-click menu.** The plugin is not active. Check **Edit** > **Plugins** and restart Unreal Engine.
- **Rigging or texture download fails.** Check your internet connection: both run on Epic's servers.
- **The editor becomes very slow.** Close the MetaHuman Creator window when you are not using it, and lower the viewport quality in **Settings** > **Engine Scalability Settings**.

## Exercise: average and outlier

1. Create a MetaHuman by changing a preset as little as possible.
2. Create a second MetaHuman by pushing every parameter as far as it will go.
3. Place both characters in the same scene and photograph them under the same light.
4. Compare the two images. Where did the software stop you? Which faces and bodies were easy to make, and which ones were impossible?

## Resources

- MetaHuman documentation: [dev.epicgames.com/documentation/metahuman](https://dev.epicgames.com/documentation/metahuman/metahuman-creator)
- Getting started with MetaHuman Creator: [dev.epicgames.com/documentation/en-us/metahuman/getting-started-with-metahuman-creator](https://dev.epicgames.com/documentation/en-us/metahuman/getting-started-with-metahuman-creator)
- MetaHuman hardware requirements: [dev.epicgames.com/documentation/metahuman/hardware-requirements](https://dev.epicgames.com/documentation/metahuman/hardware-requirements)
- MetaHuman-compatible assets: [fab.com](https://www.fab.com)

</div>

<div class="lang-de" markdown="1">

## Überblick

In diesem Tutorial erstellt ihr mit dem MetaHuman Creator in Unreal Engine einen digitalen Menschen und platziert ihn in einer Szene, wo er beleuchtet, in Pose gebracht und fotografiert werden kann.

MetaHuman ist das System von Epic Games zur Erzeugung fotorealistischer menschlicher Figuren. Ihr modelliert kein Gesicht von Grund auf: Ihr bewegt euch durch einen parametrischen Raum von Gesichtern und Körpern, mischt Presets, formt Gesichtszüge und wählt Haut, Augen und Haare. Jede Entscheidung ist eine Position innerhalb eines Spektrums, das die Software bereits festgelegt hat. Mit MetaHuman zu arbeiten heißt auch zu sehen, wie der digitale Körper standardisiert wird: was sich verändern lässt, was festgelegt ist und welche Art von „Mensch“ zum Standard wird.

Am Ende des Tutorials könnt ihr:

- ein Unreal-Engine-Projekt mit dem MetaHuman Creator einrichten
- eine MetaHuman-Figur aus einem Preset erstellen
- Körper, Kopf, Haut und Haare anpassen
- eure Figur riggen und zusammenbauen
- euren MetaHuman in einer Szene platzieren

## Software und Tools

- [Unreal Engine](https://www.unrealengine.com/download) 5.6 oder neuer, installiert über den Epic Games Launcher (kostenlos)
- **MetaHuman Creator Core Data**, ein optionaler Download für Unreal Engine (siehe unten)
- das Plugin **MetaHuman Creator**, das mit Unreal Engine mitgeliefert wird

Der MetaHuman Creator läuft im Unreal Editor unter Windows, macOS und Linux (ab Unreal Engine 5.7). Eine aktuelle Grafikkarte ist hilfreich: Die Figuren sind rechenintensiv, und auf älteren Laptops kann der Editor langsam werden.

## Bevor ihr startet

- **Legt einen Epic-Games-Account an.** Ihr braucht ihn, um euch im Epic Games Launcher anzumelden und Unreal Engine herunterzuladen.
- **Schafft Platz auf eurer Festplatte.** Unreal Engine und die MetaHuman-Daten brauchen viel Speicherplatz. Prüft das, bevor ihr den Download startet.
- **Bleibt online.** Rigging und Texturerzeugung laufen über die Cloud-Dienste von Epic. Beim Zusammenbauen eurer Figur braucht ihr also eine Internetverbindung.

## Projekt einrichten

1. Ladet den Epic Games Launcher herunter, installiert ihn und installiert dann Unreal Engine über den Tab **Unreal Engine**.

   ![Unreal Engine im Epic Games Launcher]({{ site.baseurl }}/tutorials/assets/MH_image1.png)

2. Klickt auf den Pfeil neben **Launch** und wählt im Menü **Options**. Aktiviert **MetaHuman Creator Core Data**, damit die Daten heruntergeladen werden, falls ihr sie noch nicht habt. Klickt dann auf **Apply** und **Launch**.

   ![Installationsoptionen mit MetaHuman Creator Core Data]({{ site.baseurl }}/tutorials/assets/MH_image2.png)

3. Wählt **New Project** > **Film / Video & Live Events** > **Cinematic**.

   ![Neues Cinematic-Projekt]({{ site.baseurl }}/tutorials/assets/MH_image3.png)

4. Wählt **Edit** > **Plugins**.

   ![Edit-Menü mit Plugins]({{ site.baseurl }}/tutorials/assets/MH_image4.png)

5. Gebt *metahuman* in das Suchfeld ein und wählt **MetaHuman Creator**. Bestätigt und startet Unreal Engine neu.

   ![Plugin MetaHuman Creator]({{ site.baseurl }}/tutorials/assets/MH_image5.png)

## Einen MetaHuman erstellen

1. Wählt **Window** > **Content Browser** und dann **Content Browser 1**. Dadurch öffnet sich unten im Editor ein Panel.

   ![Content Browser öffnen]({{ site.baseurl }}/tutorials/assets/MH_image6.png)

2. Klickt im Content-Browser-Panel mit der rechten Maustaste und wählt im Menü **MetaHuman** > **MetaHuman Character**. Im Content Browser erscheint eine MetaHuman-Datei. Gebt ihr einen Namen.

   ![MetaHuman Character erstellen]({{ site.baseurl }}/tutorials/assets/MH_image7.png)

3. Doppelklickt auf euren MetaHuman. Falls eine Meldung zu fehlenden Einstellungen erscheint, klickt auf **Enable Missing** und startet das Projekt neu. Das Fenster des MetaHuman Creator öffnet sich.

   ![Das Fenster des MetaHuman Creator]({{ site.baseurl }}/tutorials/assets/MH_image8.png)

## Die Figur gestalten

Am einfachsten erstellt ihr einen MetaHuman, indem ihr mit einem Preset beginnt und dann sein Aussehen anpasst.

### Mit einem Preset beginnen

Klickt auf **Preset** und wählt ein vorhandenes Modell.

![Ein Preset wählen]({{ site.baseurl }}/tutorials/assets/MH_image9.png)

### Körper

Klickt auf **Head and Body** und wählt andere Körpertypen, um die verschiedenen Teile eures Modells zu verändern. Alternativ klickt ihr auf **Body Params**, um jeden Parameter einzeln anzupassen.

![Optionen unter Head and Body]({{ site.baseurl }}/tutorials/assets/MH_image10.png)

### Kopf

Klickt auf **Head Sculpt**, um Details des Kopfes von Hand zu verfeinern. Wechselt zu **Clay** oder **Topography**, um die Geometrie des Modells besser zu sehen. Mit **Head Transform** verändert ihr Merkmale symmetrisch, etwa Augen und Ohren.

![Head Sculpt]({{ site.baseurl }}/tutorials/assets/MH_image11.png)

### Haut, Haare und Kleidung

- **Materials.** Ändert Hautfarbe, Augen, Zähne und Make-up.
- **Hair & Clothing.** Wählt Frisur, Augenbrauen, Bart und Kleidung.
- **Mehr Kleidung.** MetaHuman-kompatible Kleidung findet ihr auf [fab.com](https://www.fab.com), dem Asset-Store von Epic, teilweise kostenlos.

## Den MetaHuman zusammenbauen

Bevor eure Figur in einer Szene verwendet werden kann, braucht sie ein Rig (das Skelett, mit dem sie sich bewegt) und Texturen in voller Auflösung.

1. Wenn ihr mit eurer Figur zufrieden seid, klickt auf **Assembly**. Ihr bekommt eine Fehlermeldung, dass die Figur kein Rig hat.

   ![Assembly-Fehler: Figur ohne Rig]({{ site.baseurl }}/tutorials/assets/MH_image12.png)

2. Wählt **Create Full Rig**, wenn auch das Gesicht eurer Figur geriggt werden soll. Wählt **Create Joints Only Rig**, wenn das Gesicht verdeckt sein wird oder ihr es nicht animieren müsst.

   ![Rig-Optionen]({{ site.baseurl }}/tutorials/assets/MH_image13.png)

3. Ihr bekommt eine Meldung, dass Texturen fehlen. Klickt auf **Download Texture Sources**.

   ![Download Texture Sources]({{ site.baseurl }}/tutorials/assets/MH_image14.png)

4. Klickt auf **Assemble**.

   ![Assemble]({{ site.baseurl }}/tutorials/assets/MH_image15.png)

5. In eurem Projekt gibt es jetzt einen neuen Ordner: **MetaHumans** > *EuerMetaHumanName*. Öffnet ihn und zieht euren MetaHuman in die Szene.

## Wenn etwas schiefgeht

- **Die Hautoptionen sind ausgegraut.** MetaHuman Creator Core Data fehlt. Geht zurück in den Epic Games Launcher, öffnet **Options** für eure Unreal-Engine-Version und aktiviert **MetaHuman Creator Core Data**.
- **MetaHuman erscheint nicht im Rechtsklick-Menü.** Das Plugin ist nicht aktiv. Prüft **Edit** > **Plugins** und startet Unreal Engine neu.
- **Rigging oder Textur-Download schlägt fehl.** Prüft eure Internetverbindung: Beides läuft über die Server von Epic.
- **Der Editor wird sehr langsam.** Schließt das Fenster des MetaHuman Creator, wenn ihr es nicht braucht, und reduziert die Viewport-Qualität unter **Settings** > **Engine Scalability Settings**.

## Übung: Durchschnitt und Ausreißer

1. Erstellt einen MetaHuman, indem ihr ein Preset so wenig wie möglich verändert.
2. Erstellt einen zweiten MetaHuman, indem ihr jeden Parameter so weit wie möglich ausreizt.
3. Platziert beide Figuren in derselben Szene und fotografiert sie im selben Licht.
4. Vergleicht die beiden Bilder. Wo hat euch die Software gestoppt? Welche Gesichter und Körper ließen sich leicht erzeugen, welche waren unmöglich?

## Ressourcen

- MetaHuman-Dokumentation: [dev.epicgames.com/documentation/metahuman](https://dev.epicgames.com/documentation/metahuman/metahuman-creator)
- Einstieg in den MetaHuman Creator: [dev.epicgames.com/documentation/en-us/metahuman/getting-started-with-metahuman-creator](https://dev.epicgames.com/documentation/en-us/metahuman/getting-started-with-metahuman-creator)
- Hardware-Anforderungen für MetaHuman: [dev.epicgames.com/documentation/metahuman/hardware-requirements](https://dev.epicgames.com/documentation/metahuman/hardware-requirements)
- MetaHuman-kompatible Assets: [fab.com](https://www.fab.com)

</div>