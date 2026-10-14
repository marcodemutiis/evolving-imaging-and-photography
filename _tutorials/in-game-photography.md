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

The in-game cameras are tied to your character. A free camera cuts that link: the view detaches, and you can fly it to any position and angle, as a photographer would move around a subject. This tutorial uses the free camera in [Menyoo](https://www.gta5-mods.com/scripts/menyoo-2-0), a trainer, or mod menu, for single-player *GTA V*. Menyoo does much more than camera work, but you only need a few of its menus.

### Opening Menyoo

1. Start the game in Story Mode and press F8 to open the menu.
2. Navigate with the arrow keys, select with Enter and go back with Backspace. Press F8 again to close the menu.

### Turning on the free camera

1. In the menu, go to `Misc Option` and press `Enter`. Select `FreeCam (No-Clip)` and press `Enter` to turn it on. Press `F3` to toggle the FreeCam on/off.
2. Move and look with `WASD`, and `Q` and `E` to move up or down, and change speed by pressing or releasing the `Left Shift`key.

### Using it as a photographer

- **Move slowly.** Fast movement makes framing difficult. Lower the camera speed until you can nudge the view a little at a time.
- **Leave the eye-level view.** The free camera is most useful for positions the game's own cameras cannot reach: very low, very high, tight against a wall, or far away.
- **Check the edges.** Look around the frame for things you did not intend: characters walking in, repeated textures, objects cut off by the frame.
- **Control the scene.** Menyoo also lets you change the time of day and the weather, and teleport to other places. The *Light and Composition* section explains how to use these.

### Other free cameras

Menyoo is one option. If it does not work with your version of the game, or you want more features, you can use another free camera:

- [Simple Camera](https://www.gta5-mods.com/scripts/simple-camera) is a free-camera plugin for photography and filmmaking.
- [Otis_Inf](https://www.patreon.com/Otis_Inf) camera tools (see *Software & Tools*).
- If you want to code your own, the [Custom Cameras](https://gta5.photography/manuals/cameras) manual shows how to build one in C#, step by step.

## Light and Composition

The game gives you good tools for both. You can choose the time of day and the weather, and with a free camera you can place yourself anywhere in the scene.

### Light

The game world has its own sun, clouds, streetlights and interiors, and they all behave like real light. Your job is to find the right light for your subject, instead of taking whatever the game gives you.

**Time of day.** Director Mode lets you choose between midnight, pre-dawn, dawn, morning, midday, afternoon, sunset and dusk. In Menyoo, you can change the time from [menu path]. A few starting points:

- **Dawn and sunset** give long shadows, warm colour and a low sun. They are the classic times for landscapes and cityscapes.
- **Midday** gives harsh, high light and short shadows. It is difficult for portraits, but works for graphic, high-contrast architecture.
- **Dusk and night** put artificial light in the foreground: streetlights, neon, windows and car headlights. Look for pools of light against dark surroundings.

**Weather.** Director Mode offers clear, overcast, hazy, smog, fog, rain, thunder and snow, among other conditions. Overcast gives soft, even light with few shadows. Fog and haze separate the scene into layers of distance. Rain creates reflections on the ground. In Menyoo, you can change the weather from [menu path].

**Direction.** Walk around your subject and watch how the light changes. Light from the front is flat, light from the side shows shape and texture, and light from behind creates silhouettes and glare. Because the free camera is not tied to your character, you can choose the angle that fits the light.

**Waiting.** The sun moves as time passes in the game. If you like the light you have, work quickly or freeze the time in Menyoo.

### Composition

You decide what to include in the frame, and what to leave out.

- **Viewpoint.** Height changes meaning. A low camera makes a subject look monumental, and a high camera makes it look small or exposed. Try the same subject from three heights.
- **Distance.** Move closer to simplify the image, and further away to show the setting. Moving closer changes what is in the frame, not only its size.
- **Structure.** Place the main subject on one of the thirds of the frame, not always in the centre. Look for lines that lead the eye, and for layers of foreground, middle ground and background.
- **Horizon and verticals.** Keep the camera level unless you tilt it on purpose. Tilted verticals make buildings look as if they are falling over.
- **Edges.** Check every side of the frame for unwanted elements: pedestrians walking in, cars, cut-off objects.
- **Game artefacts.** Objects and textures may need a moment to load after you move or teleport, and distant objects can appear in low detail. Wait a few seconds before you shoot.
- **Depth of field.** Blurring the background to isolate a subject is done with ReShade, covered in the next section.

### Starting points by genre

| Genre | Light | Composition |
| --- | --- | --- |
| Landscape | Dawn or sunset, with clear or hazy weather | Layers of distance, a clear horizon, a strong foreground |
| Architecture | Side light that shows form, or overcast for even light | A level camera, straight verticals, symmetry or strong diagonals |
| Portrait | Soft light: overcast or low sun | A character in the frame at a comfortable distance, simple background |
| Street | Any light, but look for strong shadows | Wait for a moment, and frame people with their surroundings |
| Night | Night, with clear weather | Pools of artificial light, reflections after rain |

## ReShade

Out of the box, *GTA V* looks the way its developers made it in 2013. ReShade lets you change that look. It is a post-processing injector developed by crosire: it sits between the game and your screen, and applies a stack of filters to the finished image, much as editing software does. It works with most PC games, supporting Direct3D 9 to 12, OpenGL and Vulkan.

Because ReShade works on the final image, it can change colour, contrast, sharpness, grain and focus, but it cannot change what is in the frame. Composition and light still come from the game, and from where you place the camera.

### Installing ReShade

If you have not installed ReShade yet, follow the steps in *Before you play*. For the ReShade setup, you need to:

1. Download the latest version from [reshade.me](https://reshade.me/) and run the setup.
2. Browse to your *Grand Theft Auto V* folder and select the game's executable: `GTA5.exe` for Legacy, or `GTA5_Enhanced.exe` for Enhanced. Leave Direct3D 10/11/12 selected.
3. When asked which effect packages to install, select SweetFX by CeeJay.dk and any others you want. OtisFX by Otis_Inf and CobraFX by SirCobra are good for simulating analogue photography, including depth of field. You can also install all of them and explore.

### Choosing and building a look

1. Start the game and press `Home` to open the ReShade menu. The first time, it offers a short tutorial on choosing and creating presets.
2. Start from the default preset. It lets you switch each filter on and off, and adjust its parameters at the bottom of the panel.
3. Create your own preset by duplicating the default one and giving it a name. Experiment with it, and save it as you go.
4. Change one effect at a time. Switch it on and off to compare, so that you can see what it contributes.

Effects that photographers use most:

- **Colour and tone:** shift the overall colour, contrast and saturation, as in a colour grade.
- **Sharpening:** brings back detail that the game's smoothing removes.
- **Depth of field:** blurs the background to isolate a subject. It uses the game's depth information, so it needs a free camera and a still scene to work well.
- **Grain and vignette:** add texture and draw the eye to the centre, and recall analogue film.

### Tips

- **Compose first, then add effects.** Some effects slow down the game. Frame your shot, then turn on the heavier filters.
- **Use presets as a record.** A preset is a file that stores your settings. Keep one per project, so that you can return to a look or share it. Share the preset files, never the ReShade files themselves.
- **ReShade is for single-player.** It switches off depth information in multiplayer to prevent cheating, and modified files should not be used in GTA Online.

## DLSS 5 (optional)

DLSS is NVIDIA's family of AI techniques for games. Earlier versions used machine learning to upscale a low-resolution image or to generate extra frames. DLSS 5, announced at NVIDIA's GTC conference in 2026, goes further: NVIDIA describes it as real-time *neural rendering*. It takes information from the game's own rendering, such as colour, depth and motion, and uses an AI model running on your graphics card to rework the image with more photoreal lighting, shadows and materials, for example the way light behaves on skin, hair and fabric.

This makes it different from every other tool in this tutorial. The camera, ReShade and the game's own settings change how you see the world, but DLSS 5 adds to the picture itself. The result can differ noticeably from the look the developers and artists intended, which is why the technology is controversial, and why it is interesting for image-making.

### What you need to know first

- **It is not officially supported by *GTA V*.** The method in the [manual](https://gta5.photography/manuals/graphic-mods-and-post-processing-tools) is an unofficial community mod that connects DLSS 5 to the game through a ReShade add-on.
- **It is experimental and demanding.** Results vary between setups, and the frame rate drops sharply. NVIDIA officially limits DLSS 5 to GeForce RTX 50 series cards, and while the mod can run on older RTX cards, it is slower and less stable.
- **It needs a different ReShade.** You need the version of ReShade with full add-on support, not the standard one.
- **Single-player only.** Remove the modified files, or use a separate copy of the game, before you start GTA Online.

If your computer cannot run it, you can skip this section and still complete the tutorial. For the installation steps, follow the [Graphic Mods and Post-Processing Tools](https://gta5.photography/manuals/graphic-mods-and-post-processing-tools) manual.

### Photographing with it

- **Compose first.** Frame your shot with DLSS 5 off, then switch it on to capture the image. This keeps the frame rate usable while you work.
- **Compare.** Photograph the same scene with and without it, and look at where the two images differ. Look at faces, skin, fabric and surfaces in particular.
- **Ask whose image it is.** If an AI model decides how light falls on a surface, what is left of the game's lighting, and of your choices as a photographer? Decide whether the result is still a game image, and note your answer in your caption.

## Export your images

Everything you have done so far happens on screen, and the last step is to get a file out of the game. The method you choose decides the quality of the file, so choose it before you start shooting, not after.

| Method | What it captures | Good for | Limits |
| --- | --- | --- | --- |
| Game Bar | The game window | Quick, clean captures | Only at the resolution of your screen |
| Snipping Tool | Any part of the screen | Cropped captures | Also captures anything else that is on screen |
| NVIDIA app | The game, through its overlay and photo mode | Higher-resolution captures with filters | Needs an NVIDIA graphics card |

### Game Bar

On Windows 10 and 11, the Game Bar takes screenshots and records video of a game.

1. Press the Windows key + G to open the Game Bar while the game is running.
2. Press the camera icon to take a screenshot of the game window.
3. Click *See my captures* to open the folder with your images.

You can also press the Windows key + PrtScn to save a screenshot of the whole screen automatically. The files go to the Pictures > Screenshots folder.

### Snipping Tool

The Snipping Tool is useful when you only want part of the screen. Press the Windows key + Shift + S, drag over the area you want, and save the image from the notification that appears. Because it captures whatever is on screen, close all menus first.

### NVIDIA app

If you have an NVIDIA graphics card, the NVIDIA app can capture your game, and its photo mode (see *In-Game Cameras*) lets you capture at a higher resolution than your screen.

1. Open the NVIDIA overlay while the game is running [shortcut].
2. Take a screenshot from the overlay, or open Photo Mode and use its capture options.
3. Find your images in [save location].

Higher-resolution capture and interface removal do not work equally well in every game, so test them with a trial shot first.

### Before you capture

- **Close the menus.** Close the Menyoo menu, the ReShade overlay and any other windows, or they will appear in your image.
- **Hide the interface.** Turn off the HUD and radar, as in *Before you play*.
- **Check the resolution.** A screenshot has the resolution of your screen or game window. For a larger image, use the NVIDIA app's photo mode.
- **Capture the effects.** Screen captures include ReShade filters, because they are applied before the image reaches your screen.
- **Take several versions.** Shoot the same frame a few times, with small changes in framing, light or effects, and choose the best one later.

### After you capture

- **Keep the originals.** Edit copies, and never the original files.
- **Name your files.** Use clear names, such as project, place and time, so that you can find them later.
- **Note your settings.** Record the time of day, weather, camera and ReShade preset you used. This helps you repeat a look, and helps your readers understand your images.
- **Check the files.** Open each image at full size and look for stray menus, cut-off objects and artefacts before you submit.

</div>

<div class="lang-de" markdown="1">



</div>