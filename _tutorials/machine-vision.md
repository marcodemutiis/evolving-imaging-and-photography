---
title: "Machine Vision"
title_de: "Machine Vision"
description: "Use machine vision to track faces, hands, body poses, and objects in p5.js to interact with images and sound"
description_de: "Mit Machine Vision Gesichter, Hände, Körperposen und Objekte in p5.js erkennen und damit Bilder und Klänge steuern"
order: 6
published: true
---

<div class="lang-en" markdown="1">

## Overview

This tutorial is an introduction to programming in p5.js, geared toward understanding how machine vision systems operate: software that reads bodies, faces and objects in the images of contemporary public and private cameras. You will start with the basics of scripting in p5.js, move on to pretrained models through ml5.js, and finish by training your own models with Teachable Machine. The sketch examples in this tutorial were originally created by Leonardo Angelucci and have been updated and revised to work with the current version of p5.js (version 2) and ml5.js (version 1.4).

By the end of the tutorial you will be able to:

- write and edit simple interactive sketches in the p5.js web editor
- use a webcam as an input in p5.js
- use ml5.js models to detect bodies, hands, faces and objects in a video stream, and to separate a person from the background
- turn detection data (positions, distances, confidence) into images and sounds
- train a simple classification model with Teachable Machine and use it in a sketch
- reflect on what these systems can and cannot "see", and on what they infer from images of people

## Software and Tools

- [p5.js](https://p5js.org/) and the [p5.js web editor](https://editor.p5js.org/)
- [ml5.js](https://ml5js.org/) (version 1.4: BodyPose, HandPose, FaceMesh, BodySegmentation, ObjectDetection, ImageClassifier, SoundClassifier)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)

## Before you start

- You do not need any prior coding experience.
- You need a laptop with a webcam and a recent version of Chrome or Firefox.
- Allow camera (and, for the sound examples, microphone) access when the browser asks. Without it, the webcam sketches will not run.
- Create a free account on the [p5.js web editor](https://editor.p5js.org/) so you can save and duplicate sketches.
- All sketches below can be opened, edited and run in the editor. Use *File → Duplicate* to make your own copy before changing anything.

## Introduction to p5.js

[p5.js](https://p5js.org/) is a JavaScript library for creative coding.

![p5.js Website]({{ site.baseurl }}/tutorials/assets/MV_p5js.png)

**JavaScript** is the programming language of the web: it is what makes web pages interactive, and it runs directly in your browser, so you do not need to install anything. A **library** is a collection of ready-made functions that you can use in your own code: p5.js adds functions for drawing shapes, loading images, using the webcam and reacting to the mouse and keyboard.

**Creative coding** means using code as a medium for art, design and play, rather than to build conventional software. The goal is not an efficient program but something you can see, hear and interact with, and the code is often a way of experimenting. p5.js was started in 2013 by the artist Lauren Lee McCarthy, based on the ideas of Processing, and is maintained by the Processing Foundation and a community of artists and developers. It is made for beginners.

### Sign up and setup

On [p5js.org](https://p5js.org/) click on **Start Coding**. This takes you to the web editor, where you can write, run and share code in the browser. Sign up for a free account, so you will be able to duplicate the sketches from this tutorial, edit them and save them on your account.

![p5.js Web Editor]({{ site.baseurl }}/tutorials/assets/MV_p5js_webweditor.png)

The editor has a code area on the left, a preview on the right and a **Play** button above them that runs your sketch. A few things are worth knowing before you start:

- **The console** at the bottom of the editor shows messages and error messages. Read it when something does not work: it usually says which line has the problem. You can also print values with `console.log()`.
- **Saving and duplicating:** with an account you can save a sketch (`Ctrl+S` or `Cmd+S`). Use *File → Duplicate* to make your own copy of someone else's sketch.
- **Uploading files:** the sketches with images, sounds and videos need files in the sketch folder. Open the sidebar with the arrow next to the sketch name, then use *Upload file*.
- **The reference** at [p5js.org/reference](https://p5js.org/reference/) lists every function used in this tutorial, with a short example for each one. When you see an unfamiliar function, look it up there.
- **Sharing and exporting:** the *File* menu lets you share a link to your sketch or download it as a folder, to put on your own website.
- **The p5.js version:** the sketches in this tutorial use p5.js 2.x. Many tutorials online were written for version 1.x, where for example images were loaded with a function called `preload()`. If code you copy from elsewhere does not work, the version is a likely reason.

### Sketches
 
Work through the sketches in order. Each one adds a single idea to the previous one. Click the title to open a sketch in the p5.js editor, then use *File → Duplicate* to make your own copy.

**01 Setup**
 
[Setup](https://editor.p5js.org/disappearhere/sketches/NI7ESEsVw): create a canvas and paint its background with a colour, using the two basic p5.js functions `setup()` and `draw()`.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/NI7ESEsVw" width="100%" height="450" style="border:0"></iframe>

*Try:* Change the three numbers in `background()` to make a different colour. Then make the canvas wider than it is tall.
 
**02 Variables**
 
[Variables](https://editor.p5js.org/disappearhere/sketches/egB3XY2aW): store numbers, text and true/false values in variables, and display them on the canvas with `text()`.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/egB3XY2aW" width="100%" height="450" style="border:0"></iframe>

*Try:* Add a new variable with your own text and display it on the canvas. What happens if you remove the parentheses around `myAge + yourAge`?
 
**03 If-else**
 
[If-else](https://editor.p5js.org/disappearhere/sketches/n_3Ubigwk): use a true/false variable and an `if-else` condition to choose between two background colours.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/n_3Ubigwk" width="100%" height="450" style="border:0"></iframe>

*Try:* Change `isBlue` to `false` and run the sketch again. Then add a third colour with `else if`.
 
**04 Click**
 
[Click](https://editor.p5js.org/disappearhere/sketches/1nAwu6Ilm): count mouse clicks with `mouseClicked()` and change the background colour depending on the number of clicks.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/1nAwu6Ilm" width="100%" height="450" style="border:0"></iframe>

*Try:* Change the numbers so the colour changes after 3 clicks instead of 5. What colour do you expect at exactly 10 clicks?
 
**05 MouseMove**
 
[MouseMove](https://editor.p5js.org/disappearhere/sketches/T6api34tZ): use `mouseMoved()` and `mouseX` to change the background colour depending on which half of the canvas the mouse is in.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/T6api34tZ" width="100%" height="450" style="border:0"></iframe>

*Try:* Use `mouseY` instead of `mouseX` so the colour changes between the top and the bottom half.
 
**06 MouseMove + MouseClick**
 
[MouseMove + MouseClick](https://editor.p5js.org/disappearhere/sketches/rNMFst-YY): combine `mouseMoved()` and `mouseClicked()` so the background colour follows the mouse and each click switches between a rectangle and an ellipse.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/rNMFst-YY" width="100%" height="450" style="border:0"></iframe>

*Try:* Replace the rectangle or the ellipse with another shape, for example a `triangle()` or a `circle()`. Look it up in the p5.js reference.
 
**07 Image**
 
[Image](https://editor.p5js.org/disappearhere/sketches/GjUnQm6Va): upload an image to the sketch, load it with `loadImage()` and display it on the canvas with `image()`.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/GjUnQm6Va" width="100%" height="450" style="border:0"></iframe>

*Try:* Upload your own image and draw it at half the canvas size in the centre of the canvas.
 
**08 Image + MouseClick**
 
[Image + MouseClick](https://editor.p5js.org/disappearhere/sketches/yCAAroFw9): load two images and switch between them each time the mouse is clicked.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/yCAAroFw9" width="100%" height="450" style="border:0"></iframe>

*Try:* Switch the images with `mouseMoved()` and `mouseX` instead of a click, so the left half shows one image and the right half the other.
 
**09 Keyboard**
 
[Keyboard](https://editor.p5js.org/disappearhere/sketches/CCjyh7z_I): switch between three images by pressing the keys 1, 2 and 3, using `keyPressed()` and the `key` variable.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/CCjyh7z_I" width="100%" height="450" style="border:0"></iframe>

*Try:* Add a fourth image and make it appear when you press the key 4.
 
**10 Webcam**
 
[Webcam](https://editor.p5js.org/disappearhere/sketches/f9VYmlJzo): access the webcam with `createCapture()` and draw the live video on the canvas.
 
<iframe data-src="https://editor.p5js.org/disappearhere/embed/f9VYmlJzo" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Flip the video horizontally so it behaves like a mirror: look up `createCapture` in the reference to see how that is done. Why does it feel more natural?
 
<!-- TODO: sketch 08 - fixed image aspect ratio but add a comment at the end of the code or here to use images sized to the canvas -->

## Introduction to ml5.js

[ml5.js](https://ml5js.org/) is a library that makes pretrained machine learning models available in p5.js. The models in this tutorial look at a webcam image and return data: lists of points (keypoints), masks (the outline of a body, pixel by pixel), boxes and labels, each with positions and often a confidence value. Everything you do in the following sketches builds on this data. Once you understand it, the sketches stop being separate recipes and become variations on one idea.

<!-- TODO: add short section "Reading the model output" (keypoints, x/y, confidence, console.log) -->

![ml5.js Webpage]({{ site.baseurl }}/tutorials/assets/MV_ml5js.png)

### Body: BodyPose

BodyPose estimates the position of body parts such as the nose, shoulders and wrists in the video image.

**01 BodyPose: Body Recognition**

[BodyPose: Body Recognition](https://editor.p5js.org/disappearhere/sketches/Ci9_fxawo): detect a body in the webcam image with `ml5.bodyPose()`, draw its keypoints and skeleton, and change the background colour depending on the position of the nose and wrists.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/Ci9_fxawo" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Remove the `image(video, ...)` lines to see only what the machine reads, a skeleton on a coloured background. What does the machine keep of you, and what does it lose?

**02 BodyPose: Nose + Image**

[BodyPose: Nose + Image](https://editor.p5js.org/disappearhere/sketches/aefaeeD7c): track the nose with BodyPose and show a different image depending on whether it is on the left or the right half of the canvas.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/aefaeeD7c" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Add a third image that appears when your nose is in the top half of the canvas. Which condition do you need to check first?

**03 BodyPose: Nose & Wrists + Image**

[BodyPose: Nose & Wrists + Image](https://editor.p5js.org/disappearhere/sketches/-lInF2l6V): show one of four images depending on whether the nose is on the left or right half of the canvas, or whether the left or right wrist is raised.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/-lInF2l6V" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Make the image only change when *both* wrists are raised. Which operator do you need to combine the two conditions? (Look back at the p5.js sketch *Click*.)

**04 BodyPose: Nose & Wrists + Sound Play and Volume**

[BodyPose: Nose & Wrists + Sound Play and Volume](https://editor.p5js.org/disappearhere/sketches/VO-b37VQk): play and pause a sound with the position of the nose and change its volume by raising the left or right wrist.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/VO-b37VQk" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Try:* Use the height of your nose instead of the raised wrists to control the volume: the higher your head, the louder the sound. Look up `map()` in the p5.js reference.

### Hands: HandPose

HandPose tracks the hand and its fingers (thumb, index finger, middle finger, ring finger and pinky). To measure how far apart two points are, for example two fingertips, we use `dist()`: it returns the distance in pixels between two positions.

**05 HandPose: Hand + Image Size**

[HandPose: Hand + Image Size](https://editor.p5js.org/disappearhere/sketches/LAu6fA9iA): track the 21 keypoints of a hand with `ml5.handPose()`, measure the distance between thumb and index finger, and use it to change the size of an image.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/LAu6fA9iA" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Make the image appear only when the fingers are pinched close together (for example when the distance is below 50 pixels). Then use the middle finger tip, `hand.middle_finger_tip`, instead of the index finger. What does the pinch mean to a machine, and what does it mean to you?

**06 HandPose: Hand + Sound Volume**

[HandPose: Hand + Sound Volume](https://editor.p5js.org/disappearhere/sketches/u9BInKrPS): measure the distance between thumb and index finger with HandPose and map it to the volume of a looping sound. Click on the canvas once to start the music if you do not hear anything.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/u9BInKrPS" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Try:* Use the height of the wrist instead of the pinch: map `hand.wrist.y` to the volume, so raising your hand makes the sound louder. How does the gesture feel different?

### Faces: FaceMesh

FaceMesh maps the face as a dense set of points, from which features such as eyes, lips and face outline can be located. Parts of the face such as the eyes and the lips are available as regions with a centre (`centerX`, `centerY`), and each of the 468 points has a number, which is how we find single points like the tip of the nose.

**07 FaceMesh: Face Tracking**

[FaceMesh: Face Tracking](https://editor.p5js.org/disappearhere/sketches/zfvM-AJEF): track a face with `ml5.faceMesh()`, draw its 468 keypoints on the live video, and show or hide the number of each point with a click.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/zfvM-AJEF" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Click to show the numbers, then find point 1 (the tip of the nose) and colour it red and make it bigger. Which numbers lie on the lips? What could a system read from 468 points on your face?

**08 FaceMesh: Nose + Distance**

[FaceMesh: Nose + Distance](https://editor.p5js.org/disappearhere/sketches/OW7UyYJlN): measure the distance between the eyes with FaceMesh to estimate how far you are from the camera, and draw a clown nose on the tip of the nose that changes size and colour accordingly.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/OW7UyYJlN" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Add a second clown feature, for example a hat above the head or round cheeks, that also scales with the distance between the eyes. Use the centres of the eyes, `face.leftEye` and `face.rightEye`, for positions.

**09 FaceMesh: Nose + Image + Click**

[FaceMesh: Nose + Image + Click](https://editor.p5js.org/disappearhere/sketches/4U0llx9lT): place an image on each detected face, scale it with the distance between the eyes, and switch between two images with a mouse click.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/4U0llx9lT" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Add a third image and cycle through all three on each click. Hint: use a number instead of a true/false variable, and `%` (modulo) to jump back to the first image. Then make the image tilt with your head: look up `atan2()` and `rotate()`.

BONUS! [FaceMesh: Nose + Image + Click SMARTPHONE REAR CAMERA FULLY RESPONSIVE EDITION](https://editor.p5js.org/disappearhere/sketches/GMRcUOH-1): This is a version of the same sketch made to run on mobile with the rear camera. You need to download your code and asset files, and upload them to your server with a https. Try this test [https://marcodemutiis.com/documents/testml5](https://marcodemutiis.com/documents/testml5) on mobile-->

**10 FaceMesh: Face Tracking + Image + Sound**

[FaceMesh: Face Tracking + Image + Sound](https://editor.p5js.org/disappearhere/sketches/ruKI6Y2Kb): measure how wide your mouth is open with FaceMesh and use it to show an image in your mouth and set the volume of a sound. Click on the canvas once if you do not hear anything.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/ruKI6Y2Kb" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Try:* Move closer to the camera and further away: what happens, and why? Then show a second image when the mouth is wide open, for example when the opening is above 40 pixels.

### Body and background: BodySegmentation

The models above return points. Segmentation works at the level of pixels: BodySegmentation looks at every pixel of the video and decides whether it belongs to a person or to the background. The result is a **mask**, an image the same size as the video that marks where the body is. A mask is what video-call software uses to blur or replace your background. Unlike keypoints, it follows the actual outline of a body, with hair, clothes and anything the person is holding. It is one of the heaviest models in the tutorial, so the first start can take a few seconds.

**11 BodySegmentation: Silhouette**

[BodySegmentation: Silhouette](https://editor.p5js.org/disappearhere/sketches/bCTLN6Nko): separate a person from the background with `ml5.bodySegmentation()`: the model returns a mask that marks which pixels belong to the body, and the sketch draws that mask on a coloured background.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/bCTLN6Nko" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Switch the `maskType` between `"person"` and `"background"`: what changes? Then change the background colour, or draw the video first and the mask on top of it. What does the machine keep of you, and what does it lose?

**12 BodySegmentation: Projection**

[BodySegmentation: Projection](https://editor.p5js.org/disappearhere/sketches/TtDCc_aRN): project an image onto your body: the mask cuts the image so that it only shows where the body is, and without an image an animated pattern is projected instead.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/TtDCc_aRN" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Upload your own image and set `IMAGE_FILE`, then lower `OPACITY` until the projection is only a tint. What happens to the mask when two people stand in the frame?

### Objects and people: ObjectDetection

Unlike the models above, object detection does not look for keypoints or outlines. It draws labelled boxes around whatever it recognises in the image, such as persons, chairs or phones. This is closest to how public and private cameras are used for counting, tracking and monitoring people.

The model used here is COCO-SSD, which was trained on COCO ("Common Objects in Context"), a dataset of photographs in which people have marked objects from about 80 categories. The machine can only see what is on that list: whoever made the dataset decided which things are worth detecting.

All the ml5.js models in this tutorial run on [TensorFlow.js](https://www.tensorflow.org/js), an open-source JavaScript library by Google for running machine learning in the browser. ml5.js is built on top of it and hides its complexity behind a few simple functions. Because TensorFlow.js runs the model on your own computer, the webcam image is processed in your browser and does not need to be sent to a server. This is not the case for many commercial camera systems.

**13 ObjectDetection: Webcam**

[ObjectDetection: Webcam](https://editor.p5js.org/disappearhere/sketches/QkCfwC4zT): detect people and everyday objects in the webcam image with `ml5.objectDetection()` and draw a labelled box around each one.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/QkCfwC4zT" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Count the people in the image and write the number on the canvas. Then hold up a phone or a bottle: what does the machine call it, and how sure is it? Who decided that these are the categories worth detecting?

**14 ObjectDetection: Video**

[ObjectDetection: Video](https://editor.p5js.org/disappearhere/sketches/bVVvGP16w): play a video only while nobody is in front of the camera. As soon as `ml5.objectDetection()` finds a person, the video pauses and the webcam image with the detection takes its place.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/bVVvGP16w" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Change the rule so that the video plays only when a person *is* detected. Then replace `"person"` with another label, for example `"cup"` or `"cell phone"`. What rule would a real camera system use, and who would it be watching?

## Teachable Machine

The models in the previous sections were trained by others, on data you did not choose, and they know a fixed list of things: the parts of a body, a face, about 80 kinds of objects. [Teachable Machine](https://teachablemachine.withgoogle.com/) is a free web tool by Google that lets you train your own model in a few minutes, directly in the browser and without writing code. You show the webcam a few examples of each thing you want it to recognise, the tool trains a classifier on them, and you can then load that model in a p5.js sketch with ml5.js and use it like any other.

![Teachable Machine]({{ site.baseurl }}/tutorials/assets/MV_TeachableMachine.png)

Training your own model changes what you learn from it. A model like this does not know what a mug or a face is: it only knows the examples you gave it. Whatever you put in front of the camera, it will choose one of your categories and attach a confidence to it. Seeing where it is right, where it is wrong, and what makes it change its mind is a good way to understand how the larger systems behind public and private cameras are built.

Teachable Machine can train image, sound and pose models. This tutorial starts with images, because they are the simplest to train and show the whole process.

### Train your own model

For a first model, three categories are enough, and they should look very different from each other: **nothing** (an empty background), and **two objects** you can hold up to the camera, for example a mug and a phone. This trains in about a minute and works reliably for these particular objects, although it will not recognise every mug or phone, so you can focus on the process.

![Teachable Machine Training]({{ site.baseurl }}/tutorials/assets/MV_TeachableMachine_train.png)

1. Go to [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/), click **Get started**, and choose **Image Project**, then **Standard image model**.
2. **Name your classes.** Click the name of *Class 1* and rename it to `Nothing`. Rename *Class 2* to `Mug`, and use **Add a class** to create a third one called `Phone`. The names you choose here are the labels you will see in the sketch.
3. **Collect examples.** In each class, click **Webcam** and allow camera access. Hold the button **Hold to Record** while you show the object to the camera and move it a little, closer, further, tilted. For `Nothing`, record the empty background and also yourself: sitting still, moving, with your hands raised or empty. Aim for 100–200 examples per class, and roughly the same number for each.
4. **Train the model.** Click **Train Model** and leave the tab open until it is finished. Do not switch to another tab while it trains, or it may stop.
5. **Test it.** In the preview on the right, show your objects to the camera. The bars show how confident the model is for each class. Now show it something it has never seen, for example your keys: the model still has to choose one of your three classes, and it will often do so with high confidence. It cannot say "I don't know".
6. **Export the model.** Click **Export Model**, choose the **TensorFlow.js** tab, then **Upload my model** and click **Upload**. When it is done, copy the **shareable link**. It looks like `https://teachablemachine.withgoogle.com/models/AbCdEfGhI/`.

A few things make a big difference to how well the model works:

- **Variety beats quantity.** Record the same object at different angles, distances and positions. A model trained on one pose of the mug will only recognise that pose.
- **Train in the place where you will use it.** The model also learns the background and the light. If you train in your room and test in a classroom, it will probably get confused.
- **Always include a class for "nothing", and make it the most varied one.** Without it, the model has to name one of your objects even when the camera sees only a wall. If it only knows an empty desk, it will call anything else a mug.
- **Test before you export.** Try the cases that fail (the empty scene, the phone at an angle), record more examples for them and train again.
- **Retrained models can look unchanged.** If you update a model and keep the same link, your browser may keep showing the old version. Reload the page without the cache (Cmd/Ctrl + Shift + R), or upload the model again to get a new link.
- **The link is public.** Anyone who has it can use the model, and it is hosted by Google. Do not train on images you do not want to share.

<!-- TODO: add screenshots of the Teachable Machine interface (classes, training, export) -->

### Sketches

With the shareable link, you can load your model in a p5.js sketch with `ml5.imageClassifier()`. In the sketches below, replace the model link with your own one.

**15 Teachable Machine: Image**

[Teachable Machine: Image](https://editor.p5js.org/disappearhere/sketches/n3fOz5Hdn): classify the webcam image with `ml5.imageClassifier()` and print the label and the confidence of the best guess on the canvas.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/n3fOz5Hdn" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Try:* Replace `MODEL_URL` with the link to your own model. Then hold up an object the model has never seen, for example a pen: what does it say, and how sure is it? Add a fourth class in Teachable Machine, train again, and see what changes.

<!-- TODO: remaining Teachable Machine sketches, to be redone for current ml5.js; previous versions:
video https://editor.p5js.org/angelucci.leonardo/sketches/xaDFNRaKi
pose https://editor.p5js.org/angelucci.leonardo/sketches/bUaSm0Zgx
sound https://editor.p5js.org/angelucci.leonardo/sketches/S3hZ4c6ft

16 Teachable Machine Video: play a video when the model recognises you in front of the camera, and pause it when it does not
17 Teachable Machine Pose: train a model on body poses instead of objects
18 Teachable Machine Sound: train a model on sounds instead of images -->

## Resources

- [Introduction to Machine Learning for the Arts, Fall 2024: face and hand models](https://github.com/ml5js/Intro-ML-Arts-IMA-F24/tree/main/04-face-and-hand-models)
- [ml5.js documentation](https://docs.ml5js.org/)
- [p5.js reference](https://p5js.org/reference/)

</div>

<div class="lang-de" markdown="1">

## Überblick

Dieses Tutorial ist eine Einführung in das Programmieren mit p5.js und zielt darauf, zu verstehen, wie Machine-Vision-Systeme funktionieren: Software, die Körper, Gesichter und Objekte in den Bildern heutiger öffentlicher und privater Kameras liest. Ihr beginnt mit den Grundlagen des Programmierens in p5.js, geht dann zu vortrainierten Modellen mit ml5.js über und trainiert zum Schluss mit Teachable Machine eigene Modelle. Die Sketch-Beispiele in diesem Tutorial wurden ursprünglich von Leonardo Angelucci erstellt und für die aktuellen Versionen von p5.js (Version 2) und ml5.js (Version 1.4) überarbeitet und aktualisiert.

Am Ende des Tutorials könnt ihr:

- einfache interaktive Sketches im p5.js Web Editor schreiben und bearbeiten
- eine Webcam als Eingabe in p5.js verwenden
- ml5.js-Modelle nutzen, um Körper, Hände, Gesichter und Objekte in einem Videostream zu erkennen und eine Person vom Hintergrund zu trennen
- Erkennungsdaten (Positionen, Abstände, Konfidenz) in Bilder und Klänge übersetzen
- mit Teachable Machine ein einfaches Klassifikationsmodell trainieren und in einem Sketch verwenden
- darüber nachdenken, was diese Systeme „sehen“ können und was nicht, und was sie aus Bildern von Menschen ableiten

## Software und Tools

- [p5.js](https://p5js.org/) und der [p5.js Web Editor](https://editor.p5js.org/)
- [ml5.js](https://ml5js.org/) (Version 1.4: BodyPose, HandPose, FaceMesh, BodySegmentation, ObjectDetection, ImageClassifier, SoundClassifier)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)

## Bevor ihr beginnt

- Ihr braucht keine Programmiererfahrung.
- Ihr braucht einen Laptop mit Webcam und eine aktuelle Version von Chrome oder Firefox.
- Erlaubt den Zugriff auf Kamera (und, für die Klang-Beispiele, Mikrofon), wenn der Browser danach fragt. Ohne Zugriff laufen die Webcam-Sketches nicht.
- Erstellt ein kostenloses Konto im [p5.js Web Editor](https://editor.p5js.org/), damit ihr Sketches speichern und duplizieren könnt.
- Alle Sketches unten lassen sich im Editor öffnen, bearbeiten und ausführen. Verwendet *File → Duplicate*, um eine eigene Kopie anzulegen, bevor ihr etwas ändert.

## Einführung in p5.js

[p5.js](https://p5js.org/) ist eine JavaScript-Bibliothek für Creative Coding.

![p5.js Website]({{ site.baseurl }}/tutorials/assets/MV_p5js.png)

**JavaScript** ist die Programmiersprache des Webs: Sie macht Webseiten interaktiv und läuft direkt im Browser, ihr müsst also nichts installieren. Eine **Bibliothek** (englisch *library*) ist eine Sammlung vorgefertigter Funktionen, die ihr in eurem eigenen Code verwenden könnt: p5.js bringt Funktionen mit, um Formen zu zeichnen, Bilder zu laden, die Webcam zu nutzen und auf Maus und Tastatur zu reagieren.

**Creative Coding** bedeutet, Code als Medium für Kunst, Design und Spiel zu nutzen, statt konventionelle Software zu bauen. Das Ziel ist nicht ein effizientes Programm, sondern etwas, das man sehen, hören und mit dem man interagieren kann; der Code ist oft eine Form des Experimentierens. p5.js wurde 2013 von der Künstlerin Lauren Lee McCarthy gestartet, basierend auf den Ideen von Processing, und wird von der Processing Foundation und einer Community von Künstler:innen und Entwickler:innen gepflegt. Es ist für Einsteiger:innen gemacht.

### Registrierung und Einrichtung

Klickt auf [p5js.org](https://p5js.org/) auf **Start Coding**. Das führt euch zum Web Editor, in dem ihr Code im Browser schreiben, ausführen und teilen könnt. Legt ein kostenloses Konto an, damit ihr die Sketches aus diesem Tutorial duplizieren, bearbeiten und in eurem Konto speichern könnt.

![p5.js Web Editor]({{ site.baseurl }}/tutorials/assets/MV_p5js_webweditor.png)

Der Editor hat links einen Codebereich, rechts eine Vorschau und darüber einen **Play**-Button, der euren Sketch ausführt. Ein paar Dinge solltet ihr kennen, bevor ihr loslegt:

- **Die Konsole** am unteren Rand des Editors zeigt Meldungen und Fehlermeldungen. Schaut dort nach, wenn etwas nicht funktioniert: Meist steht dort, in welcher Zeile das Problem liegt. Mit `console.log()` könnt ihr auch selbst Werte ausgeben.
- **Speichern und Duplizieren:** Mit einem Konto könnt ihr einen Sketch speichern (`Ctrl+S` oder `Cmd+S`). Mit *File → Duplicate* legt ihr eine eigene Kopie des Sketches von jemand anderem an.
- **Dateien hochladen:** Die Sketches mit Bildern, Klängen und Videos brauchen Dateien im Sketch-Ordner. Öffnet die Seitenleiste mit dem Pfeil neben dem Sketch-Namen und verwendet dann *Upload file*.
- **Die Referenz** unter [p5js.org/reference](https://p5js.org/reference/) listet alle Funktionen auf, die in diesem Tutorial verwendet werden, jeweils mit einem kurzen Beispiel. Wenn ihr eine unbekannte Funktion seht, schlagt sie dort nach.
- **Teilen und Exportieren:** Über das Menü *File* könnt ihr einen Link zu eurem Sketch teilen oder ihn als Ordner herunterladen, um ihn auf eurer eigenen Website zu verwenden.
- **Die p5.js-Version:** Die Sketches in diesem Tutorial verwenden p5.js 2.x. Viele Tutorials im Netz wurden für Version 1.x geschrieben, in der zum Beispiel Bilder mit einer Funktion namens `preload()` geladen wurden. Wenn Code, den ihr von anderswo kopiert, nicht funktioniert, ist die Version eine wahrscheinliche Ursache.

### Sketches

Arbeitet die Sketches der Reihe nach durch. Jeder fügt dem vorherigen eine einzige Idee hinzu. Klickt auf den Titel, um einen Sketch im p5.js Editor zu öffnen, und legt dann mit *File → Duplicate* eine eigene Kopie an.

**01 Setup**

[Setup](https://editor.p5js.org/disappearhere/sketches/NI7ESEsVw): Ein Canvas erstellen und seinen Hintergrund mit einer Farbe füllen, mit den zwei grundlegenden p5.js-Funktionen `setup()` und `draw()`.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/NI7ESEsVw" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Ändert die drei Zahlen in `background()`, um eine andere Farbe zu erzeugen. Macht danach das Canvas breiter als hoch.

**02 Variables**

[Variables](https://editor.p5js.org/disappearhere/sketches/egB3XY2aW): Zahlen, Text und Wahrheitswerte (true/false) in Variablen speichern und mit `text()` auf dem Canvas anzeigen.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/egB3XY2aW" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Fügt eine neue Variable mit eurem eigenen Text hinzu und zeigt sie auf dem Canvas an. Was passiert, wenn ihr die Klammern um `myAge + yourAge` entfernt?

**03 If-else**

[If-else](https://editor.p5js.org/disappearhere/sketches/n_3Ubigwk): Mit einer true/false-Variable und einer `if-else`-Bedingung zwischen zwei Hintergrundfarben wählen.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/n_3Ubigwk" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Setzt `isBlue` auf `false` und führt den Sketch erneut aus. Fügt dann mit `else if` eine dritte Farbe hinzu.

**04 Click**

[Click](https://editor.p5js.org/disappearhere/sketches/1nAwu6Ilm): Mausklicks mit `mouseClicked()` zählen und die Hintergrundfarbe abhängig von der Anzahl der Klicks ändern.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/1nAwu6Ilm" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Ändert die Zahlen so, dass die Farbe nach 3 statt nach 5 Klicks wechselt. Welche Farbe erwartet ihr bei genau 10 Klicks?

**05 MouseMove**

[MouseMove](https://editor.p5js.org/disappearhere/sketches/T6api34tZ): Mit `mouseMoved()` und `mouseX` die Hintergrundfarbe ändern, je nachdem, in welcher Hälfte des Canvas sich die Maus befindet.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/T6api34tZ" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Verwendet `mouseY` statt `mouseX`, sodass die Farbe zwischen der oberen und der unteren Hälfte wechselt.

**06 MouseMove + MouseClick**

[MouseMove + MouseClick](https://editor.p5js.org/disappearhere/sketches/rNMFst-YY): `mouseMoved()` und `mouseClicked()` kombinieren: Die Hintergrundfarbe folgt der Maus, und jeder Klick wechselt zwischen einem Rechteck und einer Ellipse.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/rNMFst-YY" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Ersetzt das Rechteck oder die Ellipse durch eine andere Form, zum Beispiel ein `triangle()` oder einen `circle()`. Schlagt sie in der p5.js-Referenz nach.

**07 Image**

[Image](https://editor.p5js.org/disappearhere/sketches/GjUnQm6Va): Ein Bild in den Sketch hochladen, mit `loadImage()` laden und mit `image()` auf dem Canvas anzeigen.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/GjUnQm6Va" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Ladet ein eigenes Bild hoch und zeichnet es in halber Canvas-Größe in die Mitte des Canvas.

**08 Image + MouseClick**

[Image + MouseClick](https://editor.p5js.org/disappearhere/sketches/yCAAroFw9): Zwei Bilder laden und bei jedem Mausklick zwischen ihnen wechseln.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/yCAAroFw9" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Wechselt die Bilder mit `mouseMoved()` und `mouseX` statt mit einem Klick, sodass die linke Hälfte das eine und die rechte Hälfte das andere Bild zeigt.

**09 Keyboard**

[Keyboard](https://editor.p5js.org/disappearhere/sketches/CCjyh7z_I): Mit `keyPressed()` und der Variable `key` durch Drücken der Tasten 1, 2 und 3 zwischen drei Bildern wechseln.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/CCjyh7z_I" width="100%" height="450" style="border:0"></iframe>

*Probiert aus:* Fügt ein viertes Bild hinzu und lasst es erscheinen, wenn ihr die Taste 4 drückt.

**10 Webcam**

[Webcam](https://editor.p5js.org/disappearhere/sketches/f9VYmlJzo): Mit `createCapture()` auf die Webcam zugreifen und das Live-Video auf dem Canvas zeichnen.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/f9VYmlJzo" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Spiegelt das Video horizontal, sodass es sich wie ein Spiegel verhält: Schlagt `createCapture` in der Referenz nach, um zu sehen, wie das geht. Warum fühlt es sich natürlicher an?

## Einführung in ml5.js

[ml5.js](https://ml5js.org/) ist eine Bibliothek, die vortrainierte Machine-Learning-Modelle in p5.js verfügbar macht. Die Modelle in diesem Tutorial betrachten ein Webcam-Bild und liefern Daten zurück: Listen von Punkten (Keypoints), Masken (der Umriss eines Körpers, Pixel für Pixel), Boxen und Labels, jeweils mit Positionen und oft mit einem Konfidenzwert. Alles, was ihr in den folgenden Sketches macht, baut auf diesen Daten auf. Sobald ihr sie versteht, sind die Sketches keine getrennten Rezepte mehr, sondern Variationen einer einzigen Idee.

![ml5.js Webseite]({{ site.baseurl }}/tutorials/assets/MV_ml5js.png)

### Körper: BodyPose

BodyPose schätzt die Position von Körperteilen wie Nase, Schultern und Handgelenken im Videobild.

**01 BodyPose: Body Recognition**

[BodyPose: Body Recognition](https://editor.p5js.org/disappearhere/sketches/Ci9_fxawo): Mit `ml5.bodyPose()` einen Körper im Webcam-Bild erkennen, seine Keypoints und sein Skelett zeichnen und die Hintergrundfarbe abhängig von der Position von Nase und Handgelenken ändern.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/Ci9_fxawo" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Entfernt die Zeilen mit `image(video, ...)`, um nur zu sehen, was die Maschine liest: ein Skelett auf farbigem Hintergrund. Was behält die Maschine von euch, und was verliert sie?

**02 BodyPose: Nose + Image**

[BodyPose: Nose + Image](https://editor.p5js.org/disappearhere/sketches/aefaeeD7c): Die Nase mit BodyPose verfolgen und ein anderes Bild zeigen, je nachdem, ob sie in der linken oder der rechten Hälfte des Canvas ist.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/aefaeeD7c" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Fügt ein drittes Bild hinzu, das erscheint, wenn eure Nase in der oberen Hälfte des Canvas ist. Welche Bedingung müsst ihr zuerst prüfen?

**03 BodyPose: Nose & Wrists + Image**

[BodyPose: Nose & Wrists + Image](https://editor.p5js.org/disappearhere/sketches/-lInF2l6V): Eines von vier Bildern zeigen, je nachdem, ob die Nase in der linken oder rechten Hälfte des Canvas ist oder ob das linke oder rechte Handgelenk gehoben ist.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/-lInF2l6V" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Lasst das Bild nur wechseln, wenn *beide* Handgelenke gehoben sind. Welchen Operator braucht ihr, um die beiden Bedingungen zu kombinieren? (Schaut auf den p5.js-Sketch *Click* zurück.)

**04 BodyPose: Nose & Wrists + Sound Play and Volume**

[BodyPose: Nose & Wrists + Sound Play and Volume](https://editor.p5js.org/disappearhere/sketches/VO-b37VQk): Einen Klang mit der Position der Nase abspielen und pausieren und seine Lautstärke ändern, indem man das linke oder rechte Handgelenk hebt.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/VO-b37VQk" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Probiert aus:* Steuert die Lautstärke mit der Höhe eurer Nase statt mit den gehobenen Handgelenken: Je höher euer Kopf, desto lauter der Klang. Schlagt `map()` in der p5.js-Referenz nach.

### Hände: HandPose

HandPose verfolgt die Hand und ihre Finger (Daumen, Zeigefinger, Mittelfinger, Ringfinger und kleiner Finger). Um zu messen, wie weit zwei Punkte voneinander entfernt sind, zum Beispiel zwei Fingerspitzen, verwenden wir `dist()`: Die Funktion gibt den Abstand in Pixeln zwischen zwei Positionen zurück.

**05 HandPose: Hand + Image Size**

[HandPose: Hand + Image Size](https://editor.p5js.org/disappearhere/sketches/LAu6fA9iA): Mit `ml5.handPose()` die 21 Keypoints einer Hand verfolgen, den Abstand zwischen Daumen und Zeigefinger messen und damit die Größe eines Bildes ändern.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/LAu6fA9iA" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Lasst das Bild nur erscheinen, wenn die Finger nah zusammengeführt sind (zum Beispiel, wenn der Abstand unter 50 Pixeln liegt). Verwendet dann statt des Zeigefingers die Spitze des Mittelfingers, `hand.middle_finger_tip`. Was bedeutet das Zusammenführen der Finger für eine Maschine, und was bedeutet es für euch?

**06 HandPose: Hand + Sound Volume**

[HandPose: Hand + Sound Volume](https://editor.p5js.org/disappearhere/sketches/u9BInKrPS): Den Abstand zwischen Daumen und Zeigefinger mit HandPose messen und auf die Lautstärke eines Klangs in Endlosschleife abbilden. Klickt einmal auf das Canvas, um die Musik zu starten, falls ihr nichts hört.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/u9BInKrPS" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Probiert aus:* Verwendet die Höhe des Handgelenks statt der Fingerbewegung: Bildet `hand.wrist.y` auf die Lautstärke ab, sodass der Klang lauter wird, wenn ihr die Hand hebt. Wie fühlt sich die Geste anders an?

### Gesichter: FaceMesh

FaceMesh bildet das Gesicht als dichtes Netz von Punkten ab, aus dem sich Merkmale wie Augen, Lippen und Gesichtskontur bestimmen lassen. Teile des Gesichts wie die Augen und die Lippen stehen als Regionen mit einem Mittelpunkt (`centerX`, `centerY`) zur Verfügung, und jeder der 468 Punkte hat eine Nummer, über die wir einzelne Punkte wie die Nasenspitze finden.

**07 FaceMesh: Face Tracking**

[FaceMesh: Face Tracking](https://editor.p5js.org/disappearhere/sketches/zfvM-AJEF): Mit `ml5.faceMesh()` ein Gesicht verfolgen, seine 468 Keypoints auf das Live-Video zeichnen und die Nummer jedes Punktes per Klick ein- oder ausblenden.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/zfvM-AJEF" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Klickt, um die Nummern anzuzeigen, sucht dann den Punkt 1 (die Nasenspitze), färbt ihn rot und macht ihn größer. Welche Nummern liegen auf den Lippen? Was könnte ein System aus 468 Punkten in eurem Gesicht ablesen?

**08 FaceMesh: Nose + Distance**

[FaceMesh: Nose + Distance](https://editor.p5js.org/disappearhere/sketches/OW7UyYJlN): Mit FaceMesh den Abstand zwischen den Augen messen, um zu schätzen, wie weit ihr von der Kamera entfernt seid, und eine Clownsnase auf die Nasenspitze zeichnen, die entsprechend Größe und Farbe ändert.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/OW7UyYJlN" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Fügt ein zweites Clown-Element hinzu, zum Beispiel einen Hut über dem Kopf oder runde Wangen, das ebenfalls mit dem Abstand zwischen den Augen skaliert. Verwendet für die Positionen die Mittelpunkte der Augen, `face.leftEye` und `face.rightEye`.

**09 FaceMesh: Nose + Image + Click**

[FaceMesh: Nose + Image + Click](https://editor.p5js.org/disappearhere/sketches/4U0llx9lT): Ein Bild auf jedem erkannten Gesicht platzieren, es mit dem Abstand zwischen den Augen skalieren und per Mausklick zwischen zwei Bildern wechseln.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/4U0llx9lT" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Fügt ein drittes Bild hinzu und wechselt bei jedem Klick durch alle drei. Tipp: Verwendet eine Zahl statt einer true/false-Variable und `%` (Modulo), um zum ersten Bild zurückzuspringen. Lasst das Bild dann mit eurem Kopf kippen: Schlagt `atan2()` und `rotate()` nach.

**10 FaceMesh: Face Tracking + Image + Sound**

[FaceMesh: Face Tracking + Image + Sound](https://editor.p5js.org/disappearhere/sketches/ruKI6Y2Kb): Mit FaceMesh messen, wie weit der Mund geöffnet ist, und damit ein Bild im Mund zeigen und die Lautstärke eines Klangs steuern. Klickt einmal auf das Canvas, falls ihr nichts hört.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/ruKI6Y2Kb" width="100%" height="500" style="border:0" allow="camera; autoplay"></iframe>

*Probiert aus:* Bewegt euch näher an die Kamera heran und weiter weg: Was passiert, und warum? Zeigt dann ein zweites Bild, wenn der Mund weit geöffnet ist, zum Beispiel wenn die Öffnung größer als 40 Pixel ist.

### Körper und Hintergrund: BodySegmentation

Die bisherigen Modelle liefern Punkte. Segmentierung arbeitet auf der Ebene der Pixel: BodySegmentation betrachtet jedes Pixel des Videos und entscheidet, ob es zu einer Person oder zum Hintergrund gehört. Das Ergebnis ist eine **Maske**, ein Bild in der Größe des Videos, das markiert, wo sich der Körper befindet. Eine solche Maske nutzt Videokonferenz-Software, um euren Hintergrund zu verwischen oder zu ersetzen. Anders als Keypoints folgt sie dem tatsächlichen Umriss eines Körpers, samt Haaren, Kleidung und allem, was die Person hält. Es ist eines der schwersten Modelle in diesem Tutorial, der erste Start kann deshalb einige Sekunden dauern.

**11 BodySegmentation: Silhouette**

[BodySegmentation: Silhouette](https://editor.p5js.org/disappearhere/sketches/bCTLN6Nko): Mit `ml5.bodySegmentation()` eine Person vom Hintergrund trennen: Das Modell liefert eine Maske, die markiert, welche Pixel zum Körper gehören, und der Sketch zeichnet diese Maske auf einen farbigen Hintergrund.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/bCTLN6Nko" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Wechselt `maskType` zwischen `"person"` und `"background"`: Was ändert sich? Ändert dann die Hintergrundfarbe, oder zeichnet zuerst das Video und darüber die Maske. Was behält die Maschine von euch, und was verliert sie?

**12 BodySegmentation: Projection**

[BodySegmentation: Projection](https://editor.p5js.org/disappearhere/sketches/TtDCc_aRN): Ein Bild auf den eigenen Körper projizieren: Die Maske schneidet das Bild so zu, dass es nur dort erscheint, wo sich der Körper befindet; ohne Bild wird stattdessen ein animiertes Muster projiziert.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/TtDCc_aRN" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Ladet ein eigenes Bild hoch und setzt `IMAGE_FILE`, verringert dann `OPACITY`, bis die Projektion nur noch eine Tönung ist. Was passiert mit der Maske, wenn zwei Personen im Bild stehen?

### Objekte und Personen: ObjectDetection

Anders als die bisherigen Modelle sucht die Objekterkennung weder nach Keypoints noch nach Umrissen. Sie zeichnet beschriftete Boxen um alles, was sie im Bild erkennt, etwa Personen, Stühle oder Telefone. Das kommt der Art am nächsten, wie öffentliche und private Kameras zum Zählen, Verfolgen und Überwachen von Menschen eingesetzt werden.

Das hier verwendete Modell ist COCO-SSD, das auf COCO („Common Objects in Context“) trainiert wurde, einem Datensatz von Fotografien, in denen Menschen Objekte aus etwa 80 Kategorien markiert haben. Die Maschine kann nur sehen, was auf dieser Liste steht: Wer den Datensatz erstellt hat, hat entschieden, welche Dinge es wert sind, erkannt zu werden.

Alle ml5.js-Modelle in diesem Tutorial laufen auf [TensorFlow.js](https://www.tensorflow.org/js), einer Open-Source-JavaScript-Bibliothek von Google, mit der Machine Learning im Browser ausgeführt wird. ml5.js baut darauf auf und verbirgt die Komplexität hinter einigen einfachen Funktionen. Weil TensorFlow.js das Modell auf eurem eigenen Computer ausführt, wird das Webcam-Bild in eurem Browser verarbeitet und muss nicht an einen Server geschickt werden. Bei vielen kommerziellen Kamerasystemen ist das nicht der Fall.

**13 ObjectDetection: Webcam**

[ObjectDetection: Webcam](https://editor.p5js.org/disappearhere/sketches/QkCfwC4zT): Mit `ml5.objectDetection()` Personen und Alltagsgegenstände im Webcam-Bild erkennen und um jeden eine beschriftete Box zeichnen.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/QkCfwC4zT" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Zählt die Personen im Bild und schreibt die Anzahl auf das Canvas. Haltet dann ein Telefon oder eine Flasche hoch: Wie nennt die Maschine es, und wie sicher ist sie sich? Wer hat entschieden, dass diese Kategorien erkennenswert sind?

**14 ObjectDetection: Video**

[ObjectDetection: Video](https://editor.p5js.org/disappearhere/sketches/bVVvGP16w): Ein Video nur abspielen, solange niemand vor der Kamera ist. Sobald `ml5.objectDetection()` eine Person findet, pausiert das Video, und das Webcam-Bild mit der Erkennung nimmt seinen Platz ein.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/bVVvGP16w" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Ändert die Regel so, dass das Video nur abgespielt wird, wenn eine Person erkannt *wird*. Ersetzt dann `"person"` durch ein anderes Label, zum Beispiel `"cup"` oder `"cell phone"`. Welche Regel würde ein echtes Kamerasystem verwenden, und wen würde es beobachten?

## Teachable Machine

Die Modelle in den vorigen Abschnitten wurden von anderen trainiert, mit Daten, die ihr nicht ausgewählt habt, und sie kennen eine feste Liste von Dingen: die Teile eines Körpers, ein Gesicht, etwa 80 Arten von Objekten. [Teachable Machine](https://teachablemachine.withgoogle.com/) ist ein kostenloses Web-Tool von Google, mit dem ihr in wenigen Minuten ein eigenes Modell trainieren könnt, direkt im Browser und ohne Code zu schreiben. Ihr zeigt der Webcam einige Beispiele für jedes Ding, das erkannt werden soll, das Tool trainiert darauf einen Klassifikator, und ihr könnt dieses Modell dann mit ml5.js in einem p5.js-Sketch laden und wie jedes andere verwenden.

![Teachable Machine]({{ site.baseurl }}/tutorials/assets/MV_TeachableMachine.png)

Ein eigenes Modell zu trainieren verändert, was ihr daraus lernt. Ein solches Modell weiß nicht, was eine Tasse oder ein Gesicht ist: Es kennt nur die Beispiele, die ihr ihm gegeben habt. Was auch immer ihr vor die Kamera haltet, es wählt eine eurer Kategorien aus und ordnet ihr eine Konfidenz zu. Zu sehen, wo es richtig liegt, wo es sich irrt und was es umstimmt, ist ein guter Weg, um zu verstehen, wie die größeren Systeme hinter öffentlichen und privaten Kameras aufgebaut sind.

Teachable Machine kann Bild-, Klang- und Pose-Modelle trainieren. Dieses Tutorial beginnt mit Bildern, weil sie am einfachsten zu trainieren sind und den ganzen Prozess zeigen.

### Trainiert ein eigenes Modell

Für ein erstes Modell reichen drei Kategorien, die sich stark voneinander unterscheiden sollten: **nothing** (ein leerer Hintergrund) und **zwei Objekte**, die ihr in die Kamera halten könnt, zum Beispiel eine Tasse und ein Telefon. Das Training dauert etwa eine Minute und funktioniert für diese bestimmten Objekte zuverlässig, auch wenn das Modell nicht jede Tasse oder jedes Telefon erkennt, sodass ihr euch auf den Prozess konzentrieren könnt.

![Teachable Machine Training]({{ site.baseurl }}/tutorials/assets/MV_TeachableMachine_train.png)

1. Geht auf [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/), klickt auf **Get started** und wählt **Image Project**, dann **Standard image model**.
2. **Benennt eure Klassen.** Klickt auf den Namen von *Class 1* und benennt sie in `Nothing` um. Benennt *Class 2* in `Mug` um und legt mit **Add a class** eine dritte namens `Phone` an. Die Namen, die ihr hier wählt, sind die Labels, die ihr im Sketch seht.
3. **Sammelt Beispiele.** Klickt in jeder Klasse auf **Webcam** und erlaubt den Kamerazugriff. Haltet die Taste **Hold to Record** gedrückt, während ihr das Objekt in die Kamera haltet und es ein wenig bewegt, näher, weiter weg, gekippt. Nehmt für `Nothing` den leeren Hintergrund und auch euch selbst auf: ruhig sitzend, in Bewegung, mit erhobenen oder leeren Händen. Zielt auf 100–200 Beispiele pro Klasse, und ungefähr gleich viele für jede.
4. **Trainiert das Modell.** Klickt auf **Train Model** und lasst den Tab geöffnet, bis es fertig ist. Wechselt während des Trainings nicht zu einem anderen Tab, sonst kann es abbrechen.
5. **Testet es.** Zeigt in der Vorschau rechts der Kamera eure Objekte. Die Balken zeigen, wie sicher sich das Modell für jede Klasse ist. Zeigt ihm nun etwas, das es noch nie gesehen hat, zum Beispiel eure Schlüssel: Das Modell muss trotzdem eine eurer drei Klassen wählen und tut das oft mit hoher Konfidenz. Es kann nicht sagen „Ich weiß es nicht“.
6. **Exportiert das Modell.** Klickt auf **Export Model**, wählt den Tab **TensorFlow.js**, dann **Upload my model** und klickt auf **Upload**. Wenn es fertig ist, kopiert den **shareable link**. Er sieht so aus: `https://teachablemachine.withgoogle.com/models/AbCdEfGhI/`.

Einige Dinge machen einen großen Unterschied dafür, wie gut das Modell funktioniert:

- **Vielfalt schlägt Menge.** Nehmt dasselbe Objekt aus verschiedenen Winkeln, Abständen und Positionen auf. Ein Modell, das auf eine einzige Haltung der Tasse trainiert wurde, erkennt nur diese Haltung.
- **Trainiert dort, wo ihr es verwenden werdet.** Das Modell lernt auch den Hintergrund und das Licht. Wenn ihr in eurem Zimmer trainiert und im Seminarraum testet, wird es wahrscheinlich verwirrt sein.
- **Nehmt immer eine Klasse für „nothing“ auf und macht sie zur abwechslungsreichsten.** Ohne sie muss das Modell eines eurer Objekte nennen, auch wenn die Kamera nur eine Wand sieht. Kennt es nur einen leeren Schreibtisch, nennt es alles andere eine Tasse.
- **Testet, bevor ihr exportiert.** Probiert die Fälle aus, die scheitern (die leere Szene, das Telefon im Winkel), nehmt dafür mehr Beispiele auf und trainiert erneut.
- **Neu trainierte Modelle können unverändert wirken.** Wenn ihr ein Modell aktualisiert und denselben Link behaltet, zeigt euer Browser möglicherweise weiter die alte Version. Ladet die Seite ohne Cache neu (Cmd/Ctrl + Shift + R) oder ladet das Modell erneut hoch, um einen neuen Link zu erhalten.
- **Der Link ist öffentlich.** Jede:r, der oder die ihn hat, kann das Modell verwenden, und es wird von Google gehostet. Trainiert nicht mit Bildern, die ihr nicht teilen möchtet.

### Sketches

Mit dem Shareable Link könnt ihr euer Modell mit `ml5.imageClassifier()` in einem p5.js-Sketch laden. Ersetzt in den Sketches unten den Modell-Link durch euren eigenen.

**15 Teachable Machine: Image**

[Teachable Machine: Image](https://editor.p5js.org/disappearhere/sketches/n3fOz5Hdn): Das Webcam-Bild mit `ml5.imageClassifier()` klassifizieren und das Label und die Konfidenz der besten Vermutung auf das Canvas schreiben.

<iframe data-src="https://editor.p5js.org/disappearhere/embed/n3fOz5Hdn" width="100%" height="500" style="border:0" allow="camera"></iframe>

*Probiert aus:* Ersetzt `MODEL_URL` durch den Link zu eurem eigenen Modell. Haltet dann einen Gegenstand hoch, den das Modell noch nie gesehen hat, zum Beispiel einen Stift: Was sagt es, und wie sicher ist es? Fügt in Teachable Machine eine vierte Klasse hinzu, trainiert erneut und schaut, was sich ändert.

## Ressourcen

- [Introduction to Machine Learning for the Arts, Fall 2024: face and hand models](https://github.com/ml5js/Intro-ML-Arts-IMA-F24/tree/main/04-face-and-hand-models)
- [ml5.js-Dokumentation](https://docs.ml5js.org/)
- [p5.js-Referenz](https://p5js.org/reference/)

</div>