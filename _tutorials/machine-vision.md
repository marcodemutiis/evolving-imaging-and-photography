---
title: "Machine Vision"
title_de: "Machine Vision"
description: ""
description_de: ""
order: 6
published: true
---

<div class="lang-en" markdown="1">

## Overview

This tutorial is an introduction to programming in p5.js, geared toward understanding how machine vision systems operate: software that reads bodies, faces and objects in the images of contemporary public and private cameras. You will start with the basics of scripting in p5.js, move on to pretrained models through ml5.js, and finish by training your own models with Teachable Machine.

By the end of the tutorial you will be able to:

- write and edit simple interactive sketches in the p5.js web editor
- use a webcam as an input in p5.js
- use ml5.js models to detect bodies, hands, faces and objects in a video stream
- turn detection data (positions, distances, confidence) into images and sounds
- train a simple classification model with Teachable Machine and use it in a sketch
- reflect on what these systems can and cannot "see", and on what they infer from images of people

## Software and Tools

- [p5.js](https://p5js.org/) and the [p5.js web editor](https://editor.p5js.org/)
- [ml5.js](https://ml5js.org/) (version 1.x: BodyPose, HandPose, FaceMesh, ObjectDetector, ImageClassifier, SoundClassifier) <!-- TODO: confirm exact version once all sketches are updated -->
- [Teachable Machine](https://teachablemachine.withgoogle.com/)

## Before you start

- You do not need any prior coding experience.
- You need a laptop with a webcam and a recent version of Chrome or Firefox.
- Allow camera (and, for the sound examples, microphone) access when the browser asks. Without it, the webcam sketches will not run.
- Create a free account on the [p5.js web editor](https://editor.p5js.org/) so you can save and duplicate sketches.
- All sketches below can be opened, edited and run in the editor. Use *File → Duplicate* to make your own copy before changing anything.

## Introduction to p5.js

### Sign up and setup

p5.js is a JavaScript library for creative coding. The [reference](https://p5js.org/reference/) lists every function used in this tutorial, and the web editor lets you write, run and share sketches in the browser.

### Sketches
 
Work through the sketches in order. Each one adds a single idea to the previous one. Click the title to open a sketch in the p5.js editor, then use *File → Duplicate* to make your own copy.
 
**01 Setup**
 
[Setup](https://editor.p5js.org/disappearhere/sketches/NI7ESEsVw): create a canvas and paint its background with a colour, using the two basic p5.js functions `setup()` and `draw()`.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/NI7ESEsVw" width="100%" height="450" style="border:0"></iframe>
*Try:* Change the three numbers in `background()` to make a different colour. Then make the canvas wider than it is tall.
 
**02 Variables**
 
[Variables](https://editor.p5js.org/disappearhere/sketches/egB3XY2aW): store numbers, text and true/false values in variables, and display them on the canvas with `text()`.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/egB3XY2aW" width="100%" height="450" style="border:0"></iframe>
*Try:* Add a new variable with your own text and display it on the canvas. What happens if you remove the parentheses around `myAge + yourAge`?
 
**03 If-else**
 
[If-else](https://editor.p5js.org/disappearhere/sketches/n_3Ubigwk): use a true/false variable and an `if-else` condition to choose between two background colours.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/n_3Ubigwk" width="100%" height="450" style="border:0"></iframe>
*Try:* Change `isBlue` to `false` and run the sketch again. Then add a third colour with `else if`.
 
**04 Click**
 
[Click](https://editor.p5js.org/disappearhere/sketches/1nAwu6Ilm): count mouse clicks with `mouseClicked()` and change the background colour depending on the number of clicks.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/1nAwu6Ilm" width="100%" height="450" style="border:0"></iframe>
*Try:* Change the numbers so the colour changes after 3 clicks instead of 5. What colour do you expect at exactly 10 clicks?
 
**05 MouseMove**
 
[MouseMove](https://editor.p5js.org/disappearhere/sketches/T6api34tZ): use `mouseMoved()` and `mouseX` to change the background colour depending on which half of the canvas the mouse is in.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/T6api34tZ" width="100%" height="450" style="border:0"></iframe>
*Try:* Use `mouseY` instead of `mouseX` so the colour changes between the top and the bottom half.
 
**06 MouseMove + MouseClick**
 
[MouseMove + MouseClick](https://editor.p5js.org/disappearhere/sketches/rNMFst-YY): combine `mouseMoved()` and `mouseClicked()` so the background colour follows the mouse and each click switches between a rectangle and an ellipse.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/rNMFst-YY" width="100%" height="450" style="border:0"></iframe>
*Try:* Replace the rectangle or the ellipse with another shape, for example a `triangle()` or a `circle()`. Look it up in the p5.js reference.
 
**07 Image**
 
[Image](https://editor.p5js.org/disappearhere/sketches/GjUnQm6Va): upload an image to the sketch, load it with `loadImage()` and display it on the canvas with `image()`.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/GjUnQm6Va" width="100%" height="450" style="border:0"></iframe>
*Try:* Upload your own image and draw it at half the canvas size in the centre of the canvas.
 
**08 Image + MouseClick**
 
[Image + MouseClick](https://editor.p5js.org/disappearhere/sketches/yCAAroFw9): load two images and switch between them each time the mouse is clicked.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/yCAAroFw9" width="100%" height="450" style="border:0"></iframe>
*Try:* Switch the images with `mouseMoved()` and `mouseX` instead of a click, so the left half shows one image and the right half the other.
 
**09 Keyboard**
 
[Keyboard](https://editor.p5js.org/disappearhere/sketches/CCjyh7z_I): switch between three images by pressing the keys 1, 2 and 3, using `keyPressed()` and the `key` variable.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/CCjyh7z_I" width="100%" height="450" style="border:0"></iframe>
*Try:* Add a fourth image and make it appear when you press the key 4.
 
**10 Webcam**
 
[Webcam](https://editor.p5js.org/disappearhere/sketches/f9VYmlJzo): access the webcam with `createCapture()` and draw the live video on the canvas.
 
<iframe src="https://editor.p5js.org/disappearhere/embed/f9VYmlJzo" width="100%" height="620" style="border:0" allow="camera"></iframe>
*Try:* Mirror the video so it behaves like a mirror: look up `scale(-1, 1)` and `translate()` in the reference. Why does it feel more natural?
 
<!-- TODO: sketch 08 - fix image aspect ratio or use images sized to the canvas -->

## Introduction to ml5.js

[ml5.js](https://ml5js.org/) is a library that makes pretrained machine learning models available in p5.js. The models in this tutorial look at a webcam image and return data: lists of points (keypoints), boxes and labels, each with x and y positions and often a confidence value. Everything you do in the following sketches builds on this data. Once you understand it, the sketches stop being separate recipes and become variations on one idea.

<!-- TODO: add short section "Reading the model output" (keypoints, x/y, confidence, console.log) -->

### Body: BodyPose

BodyPose estimates the position of body parts such as the nose, shoulders and wrists in the video image.

1. [BodyPose Body Recognition](https://editor.p5js.org/disappearhere/sketches/Ci9_fxawo): 
detect a body in the webcam image with `ml5.bodyPose()`, draw its keypoints and skeleton, and change the background colour depending on the position of the nose and wrists.

2. [Nose + Image](https://editor.p5js.org/disappearhere/sketches/aefaeeD7c): 
track the nose with BodyPose and show a different image depending on whether it is on the left or the right half of the canvas.

3. [Nose & Wrists + Image](https://editor.p5js.org/disappearhere/sketches/-lInF2l6V)
4. [Nose & Wrists + Sound Play and Volume](https://editor.p5js.org/disappearhere/sketches/VO-b37VQk)
5. [Nose + Distance](https://editor.p5js.org/disappearhere/sketches/y65IHV49n)
6. [Nose + Image + Click](https://editor.p5js.org/disappearhere/sketches/Z6V3Siipy)

### Hands: HandPose

HandPose tracks the hand and its fingers (thumb, index finger, middle finger, ring finger and pinky).

7. [Hand + Image Size](https://editor.p5js.org/disappearhere/sketches/LAu6fA9iA)
8. [Hand + Sound Volume](https://editor.p5js.org/disappearhere/sketches/u9BInKrPS)

### Faces: FaceMesh

FaceMesh maps the face as a dense set of points, from which features such as eyes, lips and face outline can be located.

9. [Face Tracking](https://editor.p5js.org/disappearhere/sketches/zfvM-AJEF)
10. [Face Tracking + Image + Sound](https://editor.p5js.org/disappearhere/sketches/ruKI6Y2Kb)

### Objects and people: ObjectDetector

Unlike the models above, object detection does not look for body keypoints. It draws labelled boxes around whatever it recognises in the image, such as persons, chairs or phones. This is closest to how public and private cameras are used for counting, tracking and monitoring people.

11. [Webcam + YOLO Person Detection](https://editor.p5js.org/disappearhere/sketches/QkCfwC4zT)

<!-- TODO: add reflection prompts for this section (what is detected, what is inferred, who decides what counts as a person?) -->

## Teachable Machine

[Teachable Machine](https://teachablemachine.withgoogle.com/) lets you train your own image, sound or pose classifier in the browser, without writing code. Where the ml5 models above are pretrained on data you did not choose, here you decide the examples and the categories, and the model learns only from those. The sketches below load a model you have trained and use it in p5.js.

<!-- TODO: add short overview: how to train a model, export it, and paste the model URL into a sketch -->

<!-- TODO: all three sketches to be redone for current ml5.js; previous versions:
01 https://editor.p5js.org/angelucci.leonardo/sketches/S3hZ4c6ft
02 https://editor.p5js.org/angelucci.leonardo/sketches/xaDFNRaKi
03 https://editor.p5js.org/angelucci.leonardo/sketches/bUaSm0Zgx -->

1. Teachable Machine Sound <!-- TODO: link -->
2. Teachable Machine Video (play the video when you are in front of the camera, pause it when you are not) <!-- TODO: link -->
3. Teachable Machine Pose <!-- TODO: link -->

## Resources

- [Introduction to Machine Learning for the Arts, Fall 2024: face and hand models](https://github.com/ml5js/Intro-ML-Arts-IMA-F24/tree/main/04-face-and-hand-models)
- [ml5.js documentation](https://docs.ml5js.org/)
- [p5.js reference](https://p5js.org/reference/)

</div>

<div class="lang-de" markdown="1">

</div>