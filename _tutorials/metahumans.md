---
layout: tutorial
title: "MetaHuman Avatars"
title_de: "MetaHuman Avatare"
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

   ![Unreal Engine in the Epic Games Launcher]({{ site.baseurl }}/tutorials/assets/MH_filename1.png)

2. Click on the arrow next to **Launch** and select **Options** in the menu. Check **MetaHuman Creator Core Data**, so it will be downloaded if you don't have it yet. Then click **Apply** and **Launch**.

   ![Installation options with MetaHuman Creator Core Data]({{ site.baseurl }}/tutorials/assets/MH_filename2.png)

3. Choose **New Project** > **Film / Video & Live Events** > **Cinematic**.

   ![New Cinematic project]({{ site.baseurl }}/tutorials/assets/MH_filename3.png)

4. Select **Edit** > **Plugins**.

   ![Edit menu with Plugins]({{ site.baseurl }}/tutorials/assets/MH_filename4.png)

5. Type *metahuman* in the search field and select **MetaHuman Creator**. Apply and restart Unreal Engine.

   ![MetaHuman Creator plugin]({{ site.baseurl }}/tutorials/assets/MH_filename5.png)

## Creating a MetaHuman

1. Select **Window** > **Content Browser** and choose **Content Browser 1**. This opens a panel at the bottom of the editor.

   ![Opening the Content Browser]({{ site.baseurl }}/tutorials/assets/MH_filename6.png)

2. In the Content Browser panel, right-click and select **MetaHuman** > **MetaHuman Character** from the menu. A MetaHuman file appears in the Content Browser. Give it a name.

   ![Creating a MetaHuman Character]({{ site.baseurl }}/tutorials/assets/MH_filename7.png)

3. Double-click on your MetaHuman. If you get a notification about missing settings, click **Enable Missing** and restart the project. The MetaHuman Creator window opens.

   ![The MetaHuman Creator window]({{ site.baseurl }}/tutorials/assets/MH_filename8.png)

## Shaping your character

The easiest way to create a MetaHuman is to start from a preset and then adjust its appearance.

### Start from a preset

Click on **Preset** and choose an existing model.

![Choosing a preset]({{ site.baseurl }}/tutorials/assets/MH_filename9.png)

### Body

Click on **Head and Body** and select other body types to change the different parts of your model. Alternatively, click on **Body Params** to adjust every parameter manually.

![Head and Body options]({{ site.baseurl }}/tutorials/assets/MH_filename10.png)

### Head

Click on **Head Sculpt** to fine-tune the details of the head manually. Switch to **Clay** or **Topography** to get a better view of the model's geometry. Select **Head Transform** to change features symmetrically, such as eyes and ears.

![Head Sculpt]({{ site.baseurl }}/tutorials/assets/MH_filename11.png)

### Skin, hair and clothing

- **Materials.** Change skin colour, eyes, teeth and make-up.
- **Hair & Clothing.** Choose hairstyle, eyebrows, beard and clothing.
- **More clothing.** You can find MetaHuman-compatible clothing on [fab.com](https://www.fab.com), Epic's asset store, some of it for free.

## Assembling your MetaHuman

Before your character can be used in a scene, it needs a rig (the skeleton that lets it move) and full-resolution textures.

1. When you are happy with your character, click on **Assembly**. You will get an error message that the character is not rigged.

   ![Assembly error: character not rigged]({{ site.baseurl }}/tutorials/assets/MH_filename12.png)

2. Select **Create Full Rig** if you want the face of your character to be rigged as well. Choose **Create Joints Only Rig** if the face will be covered or you don't need to animate it.

   ![Rig options]({{ site.baseurl }}/tutorials/assets/MH_filename13.png)

3. You will get a notification that textures are missing. Click **Download Texture Sources**.

   ![Download Texture Sources]({{ site.baseurl }}/tutorials/assets/MH_filename14.png)

4. Click **Assemble**.

   ![Assemble]({{ site.baseurl }}/tutorials/assets/MH_filename15.png)

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

<!-- TODO: German version, to be written once the English version is final -->

</div>