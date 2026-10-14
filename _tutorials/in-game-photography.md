---
title: "In-Game Photography"
title_de: "In-Game Photography"
description: ""
description_de: ""
order: 3
published: false
---

<div class="lang-en" markdown="1">

## Overview

In-game photography brings together two media that are usually kept apart: the video game and photography. The term covers what Möring and De Mutiis describe as [“photographic practices with and within video games”](https://www.researchgate.net/publication/332579591_Camera_Ludica_Reflections_on_Photography_in_Video_Games), from simulated cameras and built-in photo modes to screenshots and modified games. In this tutorial you will explore a game as a photographer, learning to control the game camera and work with light and composition, but also modifying the game software and installing mods.

The tutorial uses *Grand Theft Auto V* as its main example, but the techniques and logics of in-game photography carry over to other games.

By the end of this tutorial you will be able to:

- describe the main ways photography and video games meet: simulation, photo modes, screenshotting and modification
- set up a game for photography and play it with a photographer's attention
- frame and light a scene with in-game and free cameras
- change the look of your images with ReShade
- export your images at full quality

## Playing Photographically

Playing as a photographer means ignoring, circumventing and sometimes resisting what the game wants you to do, and following your own photographic project instead. You avoid the missions, neglect the plot, and explore the virtual world with a photographic goal and mindset.

This is harder than it sounds, because games are built to resist, forcing you to push back with enemies, obstacles and risk. In *GTA V*, the photographic act does not happen in an isolated moment safe from gaem consequences: even the in-game smartphone camera does not pause the world. Traffic keeps moving, and a character who stops in the middle of a road to take a picture can easily be run over by traffic. Other games incorporate photography as a game mechanics, making the act of taking picture the goal of the game. SSome photographers take screenshots as pockets of limited freedom during gameplay, while others modify the game to take control of the virtual world for free image-making.

### Four ways photography and games meet

Möring and De Mutiis distinguish four types of in-game photography, according to how each relates to the gameplay condition.

| | Photography is… | Example | Gameplay condition |
| --- | --- | --- | --- |
| **Simulated photography** | the point of the game: the camera is a game mechanic, often scored | *Afrika* (2008), *Pokémon Snap* (1999) | Central |
| **Photo mode** | an added feature that freezes the action and offers camera controls | *The Last of Us Remastered* (2014), *Gran Turismo 6* (2013) | Suspended |
| **Artistic screenshotting** | something you do to the game, with screenshots or a camera pointed at the screen |  | Still applies |
| **Photo modification** | made possible by changing the game: mods, scripts or edited files | Kent Sheely, *DoD* (2009–13) | Rewritten by the modification |

In this tutorial you will work mostly with the last two types. You start from the game's own cameras and screenshots, then add the photo mode of the NVIDIA app (which needs an NVIDIA graphics card) and mods that give you more freedom to operate the camera, and control over time of day, weather and post-processing filters.
Further examples of projects and manuals for in-game photography in GTA V can be found on the dedicated website [gta5.photography](https://gta5.photography/)

Source: Möring, S., & De Mutiis, M. (2019). [Camera Ludica: Reflections on Photography in Video Games](https://doi.org/10.5040/9781501330520.ch-003). In M. Fuchs & J. Thoss (Eds.), *Intermedia Games—Games Inter Media*. Bloomsbury Academic, 69–94.


## Software & Tools
You will need a PC, the game, and a few free tools. Each tool does a different job, and you do not need all of them for every image.

- [Grand Theft Auto V](https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/) (PC): the game and the main example of this tutorial. It comes in two editions, Legacy and Enhanced.
- [NVIDIA app](https://www.nvidia.com/en-us/software/nvidia-app/) (Windows, NVIDIA graphics card): adds a photo mode and filters to supported games, including *GTA V*, and captures screenshots.
- Camera mods: free cameras that detach the view from your character, for more control than the NVIDIA photo mode gives you.
  - [Menyoo](https://www.gta5-mods.com/scripts/menyoo-pc-sp): a trainer that also offers camera, time and weather controls.
  - [Otis_Inf](https://www.patreon.com/Otis_Inf)'s camera tools (this requires a subscription to the creator's Patreon).
  - A short script of your own, for those who want to code: the [Custom Cameras manual](https://gta5.photography/manuals/cameras) of *The Photographer's Guide to Los Santos* includes example scripts in C#.
  - Most camera mods need [Script Hook V](http://www.dev-c.com/gtav/scripthookv/), and C# scripts also need [Script Hook V .NET](https://github.com/scripthookvdotnet/scripthookvdotnet).
- [ReShade](https://reshade.me/): a post-processing tool that adds filters, depth of field, sharpening and grain to the image before you capture it.
- DLSS 5 (optional): NVIDIA's AI rendering layer, which has been added as a mod for ReShade. See this [manual](https://gta5.photography/manuals/graphic-mods-and-post-processing-tools) for installation.

You need a PC to follow the whole tutorial. Consoles let you use the in-game cameras and the capture button, but not mods, and Macs cannot run most of the tools above. *GTA V* is a large download of over 100 GB, so plan for time and disk space.

Alternatives for other games:

- Check the game's own photo mode first. Many games include one.
- [Otis_Inf](https://www.patreon.com/Otis_Inf) makes photo-mode tools for a range of PC games, and a Universal Unreal Engine Unlocker that offers a free camera in a large number of Unreal Engine games.
- ReShade works with most PC games.

## Before you play

If you have not installed the game yet, follow the [Getting Started](https://gta5.photography/manuals/getting-started) manual first. It covers Steam, the Rockstar launcher and your account.

- **Choose the edition.** *GTA V* on PC comes in two editions: Legacy, the original 2015 version, and Enhanced, which adds ray tracing and DLSS. Buying Enhanced also gives you a copy of Legacy. Most camera mods and tools were built for Legacy, and Enhanced support is still growing, so check what each mod supports. Legacy is recommended for this tutorial.
- **Play offline, in Story Mode only.** Mods are not allowed in GTA Online, and using them there can get your account banned. Never start Online with mods installed.
- **Switch off the anti-cheat for single-player.** The game's anti-cheat, BattlEye, conflicts with Script Hook V, the foundation of most mods. You can disable it in your launcher's settings or with the launch option `-nobattleye`. Menu names differ between Steam, the Rockstar launcher and the Epic launcher, so check your launcher's current options.
- **Expect updates to break things.** Each time Rockstar updates the game, Script Hook V and your mods may stop working until their authors update them. Turn off automatic updates if your launcher allows it, and keep a note of the versions that work.
- **Keep track of what you install.** Mods are copied into the game folder. Write down which files you add, so that you can remove them if something goes wrong.

### Installing the tools

First play the basic version of the game and get familiar with it. To use mods, follow the instructions on each tool's own page, as file names and steps change between versions. The usual order is:

1. Install [Script Hook V](http://www.dev-c.com/gtav/scripthookv/) by copying its files into the game folder, next to the game's executable.
2. Install [Script Hook V .NET](https://github.com/scripthookvdotnet/scripthookvdotnet) in the same way.
3. Install [Menyoo](https://www.gta5-mods.com/scripts/menyoo-2-0) by extracting the downloaded zip file to the game root folder.
4. Run the [ReShade](https://reshade.me/) installer, select the game's executable, choose the graphics API that matches your edition, and add the recommended shader packages when asked.
5. Start the game in Story Mode and check that each tool appears. Test one at a time, so that you know which one is the problem.

### Game settings

- **Hide the interface.** Turn off the HUD and the radar in the game's display settings. Exact names depend on the version.
- **Use your screen's full resolution.** Set the game to borderless or windowed fullscreen at your monitor's native resolution, so that screenshots come out at full size.
- **Check your graphics settings.** Higher texture and shadow quality gives you cleaner images, but can slow the game down. Find a balance that your computer can hold.

## In-Game Cameras

Before you add any mods, explore what the game already offers. *GTA V* has several built-in cameras and modes, and each one gives you a different amount of control over the scene. As you move down this list, the game resists you less.

### The default cameras

The game's regular views, in first and third person, are the starting point. They are the least flexible: the camera follows your character, and the world keeps moving around you. Press `V` to cycle through the different camera views. Hold `C` to point the camera back at the main character.

### The in-game smartphone

Snapmatic is the photo app on the in-game phone.

1. Press the Up arrow key to bring up the phone, and open the Snapmatic app at the bottom left of the home screen.
2. Move the camera with the mouse, and zoom with the mouse wheel.
3. Browse filters with Down and borders with Up.
4. Press the mouse wheel button to turn the camera on yourself for a selfie.
5. Press Enter to take the photo, and press it again to save it to the gallery.

The gallery is inside the game. To get your photos out, upload them to your Rockstar Social Club profile by pressing Left Ctrl in the gallery, or screenshot them. The phone does not pause the world, so traffic and other characters keep moving, and you need to choose a safe spot before you start.

### Director Mode

Director Mode turns the game into a film set. It lets you choose your character, and control the time of day, the weather, and the density of pedestrians and vehicles. Setting the density to none is a quick way to reduce the game's resistance, and is useful for empty streets and quiet scenes.

You can open it in three ways: from the Rockstar Editor tab of the pause menu, from the Interaction Menu (press M on PC), or by dialling the code from the in-game phone (see the [manual](https://gta5.photography/manuals/director-mode-and-scene-creator) for the number). It is not available when you are in a vehicle, wanted by the police, or on a mission.

Inside Director Mode, the Scene Creator lets you place props from the game's library to build a scene, and save it. The [manual](https://gta5.photography/manuals/director-mode-and-scene-creator) lists all the options and controls.

### Rockstar Editor

The Rockstar Editor is made for video, but it works as a photo mode because it lets you move the camera after the moment has happened.

1. Record a few seconds of gameplay at the place you want to photograph. Hold Alt + F1 to start a manual recording, and press Alt + F1 again to save it, or Alt + F3 to cancel. Alternatively, press F2 to buffer gameplay in the background, and press Alt + F1 to save what has just happened.
2. Open the Rockstar Editor tab in the pause menu, choose Create New Project, and add your clip.
3. Double-click the clip to edit it, and open the Camera function. You can choose the game camera, preset angles around the character, or a free camera that you can place anywhere within a defined area around the character.
4. Scrub through the clip to find the frame, and press Tab to take a screenshot. It is saved in the game's gallery, and can leave the game only through Rockstar Social Club.

You cannot change the camera angle in footage recorded in first person. Press F5 to save your project and the camera position.

### Photo mode in the NVIDIA app

If you have an NVIDIA graphics card, the NVIDIA app adds a photo mode to supported games, including *GTA V*. Open the NVIDIA overlay while playing and choose Photo Mode. It offers a free camera, filters and high-resolution capture. Features such as depth of field and interface removal may not work equally well in every game, so test them before you rely on them.

### Comparing the cameras

| | Pauses the game? | Camera freedom | Good for |
| --- | --- | --- | --- |
| Default cameras | No | Low | Quick snapshots |
| Smartphone | No | Low | Selfies, spontaneous shots |
| Director Mode | No | Low (but you control the scene) | Choosing the time, weather and crowds |
| Rockstar Editor | Works on a recording | Medium: free within an area | Framing a precise moment |
| NVIDIA photo mode | Yes | Medium to high | High-resolution captures with filters |

Even the freest of these has limits. In the next section you will install a free camera that removes most of them.

## Free Camera

## ReShade

## DLSS5

## Export your images
- Screenshot via snipper tool or gamebar
- NVIDIA Capture tool

</div>

<div class="lang-de" markdown="1">



</div>