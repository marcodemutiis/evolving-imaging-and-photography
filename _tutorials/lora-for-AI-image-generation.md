---
title: "LoRAs for AI Image Generation"
title_de: "LoRAs for AI Image Generation"
description: "Train your own LoRA on a small collection of images, then use it to generate, edit, upscale and animate images with Replicate."
description_de: ""
order: 5
published: false
---

<div class="lang-en" markdown="1">

## Overview

Over the past decade, image generation with neural networks has moved from a research curiosity to an everyday tool. A very short history: in 2015, *DeepDream* turned a classification network "inside out", amplifying whatever patterns it recognised in a photograph and producing the hallucinatory, dog-eyed images that became its signature look. Around the same time, Generative Adversarial Networks (GANs) introduced a new approach, in which two networks are trained against each other: one generates images, the other tries to tell them apart from real ones. GANs dominated the late 2010s, from face synthesis to the first generative art sold at auction. Since 2021–22, diffusion models have taken over: they learn to generate images by gradually removing noise, guided by a text prompt. Systems such as Stable Diffusion, Midjourney and FLUX are all built on this principle.

These models are trained on enormous datasets, and they reproduce the aesthetic of that data in an averaged, generic form. This is where fine-tuning comes in.

A **LoRA** (*Low-Rank Adaptation*) is a small add-on file that adapts a large pre-trained model to a specific style, subject or aesthetic, without retraining the whole model. The original model stays frozen. The LoRA only stores a small set of additional weights, which are applied on top of it when you generate an image. In practice, this means:

- you only need a **small dataset**: 10 to 20 images are often enough to start
- training is **fast and cheap** compared to training a model from scratch
- the resulting file is **small**, and can be switched on or off, strengthened or weakened, or combined with other LoRAs
- you activate it in a prompt with a **trigger word** of your choice

For artists and photographers, LoRAs are interesting because they shift the question from *what does the model know?* to *what do I feed it?* Your own archive, a series of video game screenshots or a visual genre you want to study becomes the training material, and with it come questions of authorship, consent and the sources of the images you use. From a creative standpoint, it also allows more control over the process where you are leading the creative generation rather than giving up creative agency to generic machines.

<!-- IMAGE: Example outputs of a LoRA trained on a small dataset, next to a few of the training images -->

In this tutorial you will train a LoRA on Replicate, a platform that lets you do it in the browser, and then use it together with other tools for editing and animating images.

## What you'll learn

By the end of this tutorial you will be able to:

- explain what a LoRA is and how it differs from a full image model
- assemble a small, coherent dataset for a style or a subject
- train a LoRA on Replicate, without writing code
- generate images with your trigger word, and adjust the results with the model's parameters
- replace parts of an image with inpainting
- increase an image's resolution with an upscaling model
- understand how generated images can be animated with image-to-video models

## Before you start

**You will need:**

- a [GitHub](https://github.com) account (free), which you use to sign in to Replicate
- a credit card, to add prepaid credit to your Replicate account
- a folder of 10 to 20 images (see below)

Replicate is not free, but it costs very little to generate a few images with a custom model (see the [pricing page](https://replicate.com/pricing)). Training your own LoRA typically costs a couple of dollars at most. Video generation is considerably more expensive, so check prices before running a model.

**Think about your dataset.** Decide whether you want to train a **style** (for example the look of CCTV stills, or of a video game's photo mode) or a **subject** (a particular object, place or character). Then collect images that share that aesthetic. You can use screenshots from a video game, photographs you took yourself, or images you find online. Whatever you use, consider where the images come from:

- use images you made yourself, or that you have the right to use
- do not train on the face or the work of a person who has not agreed to it
- keep track of your sources: you will want to be able to say what your model was trained on

## Experimenting with older models

Before working with current models, it is useful to see where they come from. The [Old Models Foundation](https://www.oldmodels.org/sandbox) preserves and distributes generative AI models of historical and cultural significance. Their webpage lets you try out earlier generations of image models and compare how much their outputs differ from today's. Look at how these models work, and at which aesthetic qualities they have that newer, more polished models have lost.

## Replicate

[Replicate](https://replicate.com) is a platform where people can run, and upload private or public, open-source models for generative AI, including models fine-tuned on custom datasets. You can also run any of the public models available on the [Explore page](https://replicate.com/explore).

Alternatives:

- [fal.ai](https://fal.ai/explore/best-lora-trainers)
- [CivitAI](https://education.civitai.com/using-civitai-the-on-site-lora-trainer/)
- [Krea](https://www.krea.ai/train)

These platforms offer similar LoRA training, with different interfaces and pricing.

## Train your own LoRA

This section follows and paraphrases Replicate's own guide, [Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux), which uses the FLUX model family. Replicate describes fine-tuning as a way to get a version of an image model that consistently produces a particular style, or always includes a specific character or subject. No deep technical knowledge is needed: the whole process can be done in the browser.

### 1. Prepare your dataset

Collect **10 to 20 images** with a similar look and feel. According to Replicate, the technical minimum is as low as two images, but around ten is a sensible lower limit for good results. More images can improve the outcome, but make training slower.

- JPG, PNG and WebP files all work. Where possible use a resolution of 1024 × 1024 pixels or higher. File names and aspect ratios do not matter.
- Aim for **variety within coherence**: if you train a subject, vary the setting, lighting and angle; if you train a style, vary the content but keep the visual language consistent.

Put your images in a folder and compress it into a single **.zip** file.

### 2. Choose a trigger word

Together with the images, you choose a **trigger word**, which you will later write in your prompts to "activate" the LoRA, for example: `photo of MYTRGGR walking through a market`.

Replicate's advice for choosing one:

- make it unique and invented, like a vanity license plate (e.g. `MY_UNIQ_TRGGR`)
- do not use a word that already exists in any language (such as *dog* or *cyberpunk*), since the model already associates it with something
- avoid `TOK`, a very common trigger word that can clash with other fine-tunes if you want to combine them later
- capital letters are optional, but they help distinguish the trigger word from the rest of the prompt

### 3. Train the model

1. Go to [replicate.com/replicate/fast-flux-trainer/train](https://replicate.com/replicate/fast-flux-trainer/train)
2. In the **destination** field, select a model > **Create a new model** and enter a name. Your model can be public or private.
3. Upload your .zip file in the **input_images** field.
4. In **trigger_word**, enter the trigger word you chose.
5. In **lora_type**, select **subject** or **style**, depending on your dataset.
6. Leave **training_steps** (under advanced options) at the default value of 1000. Replicate warns that fewer steps will not teach the model your concept properly, while more steps add time and cost without much improvement.
7. Leave the other fields at their defaults and click **Create training**.

Training is billed per second of computing time. At the time Replicate's guide was written, a training with about 20 images and 1000 steps took around two minutes and cost roughly 1.50 USD. Prices change, so check the current rates on the pricing page. Wait for the training to complete, which is a good moment for a break.

**Training fails on a Mac?** Hidden "ghost" files created by macOS can break the upload. Open the Terminal, `cd` into the folder that contains your dataset folder, and type: `dot_clean LORA_FOLDER_NAME`. Then zip the folder again and upload the new file.

<!-- IMAGE: The Replicate training form, filled in -->

### 4. Generate images with your model

When the training is complete, you can click **Run trained model** to use the model in the browser, or **Download weights** to use the LoRA elsewhere (for example in a local tool like ComfyUI). You can also reach your model at any time from [replicate.com/models](https://replicate.com/models) by clicking on its name.

Write a prompt that includes your trigger word. FLUX follows long, descriptive prompts well, so the more detailed your description, the better. If you run out of ideas, Replicate suggests asking a language model to write ten detailed, varied prompts that all include your trigger word.

<!-- IMAGE: Generating an image with the trained model in the Replicate web playground -->

### Parameters

If the training went well, your model should respond to its trigger word, but expect to spend some time fine-tuning your results. These are the main parameters:

- `prompt`: describes the image you want. Remember to include the trigger word of your LoRA.
- `image`: optionally, upload an image to use as the starting point for the generation.
- `width` and `height`: the size of the generated image, in pixels.
- `num_outputs`: how many images to generate at once.
- `prompt_strength`: when you provide an `image`, this sets how much influence your prompt has on it (0 to 1). Low values stay close to the original image.
- `lora_scale`: how strongly your own fine-tuning influences the result (-1 to 3). Lower values give a subtler effect, higher values a more extreme one, and negative values push away from your style.

**Tip:** change one parameter at a time, and keep notes on what you changed, so you can understand what each one does.

## Inpainting

Inpainting is a technique for replacing or repairing parts of an image. It fills in missing or damaged areas, or removes an unwanted object, to construct a complete image. With generative models, you can also use it to replace a selected area with something entirely new.

1. Go to the [Replicate playground](https://replicate.com/playground)
2. Select the model **flux-fill-pro**
3. Upload an image
4. In the **mask** field, select **Inpainting > Open inpainting canvas**
5. Use the tools at the top of the canvas to adjust the brush size
6. Paint over the whole area you want to replace, and click **Save mask**
7. In the **prompt**, write a simple description of what should appear in that area, for example "a boy with pink hair"
8. For larger changes, increase the **guidance** value (for replacing hair, a value of 30 works well)

Once you get a good starting point, copy the **seed** number of your result and paste it into the **seed** field. This lets you keep the composition stable while you tweak the prompt or the guidance, and compare the results.

<!-- IMAGE: Inpainting canvas with a mask, and the result -->

## Upscaling

Upscaling increases an image's resolution. AI is used to enhance the image by adding detail and fixing artefacts.

Imagine you have a small, somewhat blurry photo, and you want to make it larger and clearer, like turning a wallet-sized photo into a poster without losing quality. Traditional methods would make the photo bigger, but it would also become blurrier. AI upscaling models work like a smart artist who not only enlarges the photo, but also cleverly adds details to make the larger version look sharp and clear. Note that these details are *invented* by the model, a point worth discussing when working with photographs.

There is also a big overlap between upscaling and image restoration. AI models for restoration fix blemishes, remove noise and add detail, which is well suited to the upscaling process.

Different upscaling models serve different purposes. Explore the options and compare their specific strengths: face restoration, creativity, sharpness improvement and so on. You can find them in Replicate's [super-resolution collection](https://replicate.com/collections/super-resolution), and read more in the guide [Upscale images with AI models](https://replicate.com/docs/guides/run/upscale-images-with-ai-models).

## Image to video

You can use your LoRA to generate a series of consistent images (for instance, different moments in the same scene or the same character) and then animate them with image-to-video models. Upload a still image as the starting frame, describe the movement you want in the prompt, and the model generates a short clip.

Be aware that this is the **most expensive** step in this tutorial: video generation costs much more than generating still images. Check the price of a model on its page before running it, start with short clips, and test your ideas on a small scale first.

## Further resources

- [Replicate: Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux)
- [Replicate: Working with LoRAs](https://replicate.com/docs/guides/extend/working-with-loras)
- [Replicate: collection of FLUX fine-tunes](https://replicate.com/collections/flux-fine-tunes), for inspiration

## Exercise: train a style

1. Choose a style or a subject, and collect 10 to 20 images that you made or have the right to use.
2. Zip the folder, choose a trigger word and train your LoRA on Replicate.
3. Generate at least ten images with your trigger word. Vary the prompt, and run the same prompt with a low and a high `lora_scale`.
4. Choose your best result. Use inpainting to change one element of it, and upscale the final image.
5. Compare your outputs with your training images: what did the model pick up, what did it ignore, and what did it invent? Does it reproduce your images, or an average of them? What does it reveal about the way you collected and framed them?

**Optional challenge: break the dataset.** Train a second LoRA on a deliberately narrow or odd dataset: only one angle, only blurry images, only one colour. Observe how the model exaggerates and distorts what you gave it, and decide whether that distortion can become the subject of your work. If you want to go further, turn your best images into a short clip with an image-to-video model.

</div>

<div class="lang-de" markdown="1">



</div>