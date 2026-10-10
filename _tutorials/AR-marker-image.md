---
title: "AR Marker Image"
title_de: "AR Marker Image"
description: "Make a printed or on-screen image trigger an augmented reality overlay that replaces it, using marker tracking in Lens Studio (Snapchat) and Effect House (TikTok)."
description_de: ""
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

- <a href="https://ar.snap.com/lens-studio">Lens Studio</a> (macOS, Windows): Snap's free tool for making Snapchat Lenses. You test your Lens on your phone in the Snapchat app.
- <a href="https://effecthouse.tiktok.com/">Effect House</a> (macOS, Windows): TikTok's free tool for making TikTok effects. You need a TikTok account to log in. Its marker tracking object is called `Target Tracker`.

Alternatives:

- <a href="https://8thwall.org/">8th Wall</a> (macOS, Windows, web): a free, open source toolset for web AR that runs in the phone's browser, with no app to install. The hosted platform closed on 28 February 2026, and the open source engine continues at 8thwall.org.
- <a href="https://github.com/hiukim/mind-ar-js">MindAR</a> (web): an open source JavaScript library for image tracking in the browser.
- <a href="https://developer.vuforia.com/">Vuforia</a> (iOS, Android, Unity): a long-established engine with "image targets".

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

1. Go to <a href="https://ar.snap.com/lens-studio">ar.snap.com/lens-studio</a> and download Lens Studio.
2. Make sure you have Snapchat on your phone. If you don't, download the app and sign up for an account.
3. Open Lens Studio and close the Home window. You will be in your default project window.

By default, the interface is divided into six panels: Scene Hierarchy, Asset Browser, Scene, Logger, Inspector and Preview.

<!-- IMAGE: Lens Studio default project window with the six panels -->

### Create the effect

1. In the top menu, click `Asset Library` and search for "marker image". On the first result, `Marker Image`, click `Import`, then close the Asset Library window.
2. Drag the image you want to use as a marker from your computer into the Asset Browser panel.
3. In the Asset Browser panel, click the `>` sign next to `Marker Image.lspkg` and select `Image Marker [EDIT_ME]`.
4. In the Inspector panel, find the `Marker Texture` field, click the image icon and select your marker image. You can also drag the image onto the field.
5. Still in the Inspector panel, set `Marker Height` to the real height of your printed image in centimetres. This makes the size of the marker in the Scene panel match its size in the physical world.
6. In the Scene Hierarchy panel, click the `>` sign next to `Marker Image` and select `Tracked Image [REPLACE_ME]`.
7. In the Inspector panel, change its image to your replacement image. You can also drag the image onto the texture field.

<!-- CHECK: name of the texture field in the inspector for the replacement image -->

<!-- IMAGE: Inspector panel with the Marker Texture and Marker Height fields -->

Because `Tracked Image [REPLACE_ME]` is attached to the marker, it follows the marker when the camera or the print moves. You can attach other objects to the marker in the same way, for example a video, a text or a 3D object.

Two things to try once this works:

- In the `Marker Image` object, the Image Tracking Controller can send triggers when the marker is found or lost, which lets you play a sound or an animation without writing code.
- A single Lens can contain up to 10 markers, each with its own content.

### Test the effect

1. Click `Preview Lens`.
2. Open Snapchat on your phone and scan the code.
3. Point the camera at your printed marker, or at the marker on a second screen. Your replacement image should appear on top of it.

If the Lens does not appear on your phone, check that Lens Studio and your phone are paired to the same Snapchat account (see Snap's [Pairing to Snapchat](https://developers.snap.com/lens-studio/lens-studio-workflow/pairing-to-snapchat) guide).

<!-- IMAGE: Phone screenshot of the replacement image covering the marker -->

The Preview panel in Lens Studio cannot see your marker unless you import a video of it. To test the tracking with your phone's camera, preview the Lens in Snapchat.

### Publish your effect (optional)

When you are happy with your Lens, you can submit it to Snap for review. You do not need to publish to finish this tutorial, since previewing on your phone is enough. See Snap's guide to [submitting your Lens](https://developers.snap.com/lens-studio/publishing/submitting/submitting-your-lens).

## AR marker image in Effect House -> TikTok

Effect House is TikTok's free tool for making effects. You need a TikTok account on your phone.

### Install and set up

1. Go to <a href="https://effecthouse.tiktok.com/">effecthouse.tiktok.com</a>, then click `Download` at the top of the page. Install the app.
2. Open Effect House. It asks you to log in with your TikTok account and shows a QR code.
3. On your phone, open TikTok, go to `Profile`, tap `Add friends` and tap the scanner icon. Scan the code and tap `Confirm`. You can also click `Log in with other methods`.

The Effect House window has a Title Bar at the top and six panels: Hierarchy, Assets, Scene, Visual Scripting, Preview and Inspector.

<!-- IMAGE: Effect House window with the Title Bar and the six panels -->

### Create the effect

1. Drag your marker image and your replacement image into the Assets panel. Select each one and, in the Inspector panel, set `Compression Type` to `None`.
2. Click `+ Add object` and select `AR Tracking` > `Target Tracker`. Effect House adds a `Target Tracker` with a default image and a cube inside it. You can use the cube to test your setup first.
3. Select `Target Tracker` in the Hierarchy panel. In the Inspector panel, find the `Target Tracker` component and replace the default texture in the `Target Texture` field with your marker image.
4. Preview the cube on your phone (see "Test the effect" below).
5. If it works, delete the cube. Click `+ Add object` and select `3D Image`. Drag the `3D Image` onto `Target Tracker` in the Hierarchy panel, so that it is nested inside it. In the Inspector panel, set its texture to your replacement image.
6. Rotate the `3D Image` until it is parallel to your marker image, and adjust its size.
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

{% comment %}
8th Wall section disabled until tested (remove the comment tags here and before "Troubleshooting" to restore it)

## AR marker image in 8th Wall -> Web

8th Wall was a hosted, paid platform for web AR until 28 February 2026, when the hosted service was retired. It continues at [8thwall.org](https://8thwall.org/) as a free, open source toolset. Its Image Targets work in the phone's browser, so people do not need to install an app, only open a link. You can host your project anywhere you like. This is the option that needs the most web development, but it gives you full control.

### Install 8th Wall Desktop

1. Go to <a href="https://8thwall.org/">8thwall.org</a> and download 8th Wall Desktop for Mac or Windows from the downloads page. Run the installer and open the app.
2. Create a new project, or open an existing one. 8th Wall is free to use and does not require a login.

<!-- IMAGE: 8th Wall Desktop project window -->

### Create an image target

8th Wall calls a marker an image target. You can create image targets in the Desktop app, or with a command line tool. The command line tool needs [Node.js](https://nodejs.org/). Open Terminal (macOS) or a command prompt (Windows) and type:

```bash
npx @8thwall/image-target-cli@latest
```

The tool asks a few questions:

1. **Path to the image file:** for example `~/Downloads/target1.png`.
2. **Image type:** choose flat (the default) for a poster or print. Cylinder is for images wrapped around cans or bottles, and cone for cups.
3. **Default crop:** press `Y` to accept the default crop.
4. **Output folder:** the `image-targets` folder of your project.
5. **Name:** a name for the target, for example `target1`.

The tool writes a JSON file with the image target data, together with the original, cropped, thumbnail and grayscale versions of your image.

### Register the target in your project

In the file `src/app.js` of your project, tell the engine which image targets to look for:

```javascript
const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/target1.json')
    ],
  })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
```

You can track up to 32 image targets at the same time. The engine reports when a target has been found, updated or lost, so that you can show, move or hide your content (the events are called `imagefound`, `imageupdated` and `imagelost`).

### Show the replacement image

<!-- TODO: attach the replacement image or video to the target (A-Frame or Three.js); the 8th Wall example projects aframe-image-targets-example and studio-image-targets-example on GitHub can be used as a starting point -->

### Test the project

8th Wall Desktop includes a simulator that can simulate image targets, so you can check your project on the computer. To test it on your phone, the page has to be served over HTTPS, because browsers only give web pages access to the camera on secure connections. Then point the phone at your printed marker.

<!-- IMAGE: Phone screenshot of the web AR experience -->

{% endcomment %}

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

- <a href="https://developers.snap.com/lens-studio/features/ar-tracking/world/world-templates/image-marker">Lens Studio: Marker</a>
- <a href="https://developers.snap.com/lens-studio/features/ar-tracking/world/marker-tracking">Lens Studio: Marker Tracking</a>
- <a href="https://effecthouse.tiktok.com/learn/">Effect House: Learn</a>
- <a href="https://effecthouse.tiktok.com/learn/guides/getting-started/migrating-to-effect-house/migrating-from-lens-studio-to-effect-house">Effect House: Migrating from Lens Studio</a>

</div>

<div class="lang-de" markdown="1">



</div>