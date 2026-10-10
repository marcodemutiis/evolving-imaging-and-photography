---
title: "LoRAs for AI Image Generation"
title_de: "LoRAs for AI Image Generation"
description: ""
description_de: ""
order: 5
published: false
---

<div class="lang-en" markdown="1">

## Overview

The development of neural network and machine learning in image generation in recent years... a brief history from Deep Dream to GAN to diffusion models

Definition of a LoRA 


## Experimenting with older models
https://www.oldmodels.org/sandbox


## Replicate

Replicate is a platform where people can upload private or public open-source models for generative AI creation, fine-tuned with custom datasets.

This solution is not free, but it does cost very little to generate a few images from a custom model (see pricing here: https://replicate.com/pricing)

You will need: 
- a github account (free)
- credit card 

You can run any public model available: https://replicate.com/explore 

## Fine-tune an image model or maybe we do a before we trina the lora

paraphrase this source and cite it: https://replicate.com/docs/get-started/fine-tune-with-flux

Create your own small collection of images:

Think  of a STYLE or a SUBJECT

Collect 10 ~ 20 images with similar aesthetic and a style you want to recreate them. 

You can use images you find online, screenshots from a video game, or photographs you took yourself.

Then compress your folder into a .zip file.



## 
Once you have everything:

Go to https://replicate.com/replicate/fast-flux-trainer/train  

Select a model > Create a new Model > insert new model name

Upload your .zip file to the input_images field

Choose a trigger word that you will use in your prompt to “activate” your style

Select sytle or subject

Click Create Training and wait for the training to complete

(If your lora training fails because of ghost files on mac go to Terminal, `cd` into the folder location of your lora folder, and type:
dot_clean LORA_FOLDER_NAME
Then zip the folder and upload it)

Go to https://replicate.com/models and click on your model

Generate an image by writing a prompt with the trigger word you specified in step 4.



## 

If the training goew well, you can try out your model by prompting with your trigger word.
You'll need some time to fine tune it.

Parameters:

prompt: describe your desired image remembering to use the trigger word of your LoRA
image: you can upload an image, which will then be used as the starting point for your model.
width & height: The desired width and height of the generated image, in pixels.
num_outputs: The desired number of output images.
prompt_strength: If you insert an image in image, you can specify how much influence your prompt should have on it (0-1).
lora_scale: Here you specify how much the finetuning through your own dataset should influence the generated image (-1, 3).



## Inpainting

Inpainting is a technique for replacing or fixing missing regions of images. 

it involves filling in the missing or damaged parts of an image, or removing an undesired object to construct a complete image.



Go to https://replicate.com/playground 

Selected model flux-fill-pro

Upload an image

In the mask field select Inpainting > Open inpainting canvas


Use the tools on top of the inpainting canvas to adjust the brush size.

Use the brush to select the whole area you want to replace and click save mask.

In the prompt add a simple description “e.g. a boy with pink hair”

If you are making bigger changes increase the value of the guidance (for hair replacement the value of 30 is ok)

Once you get a good starting point, copy the seed number of your result and add it in the seed field for future tweaking (you can adjust the prompt or the guidance and compare results).



## Upscaling

Upscaling increases an image’s resolution. AI is used to enhance the image by adding detail and fixing artifacts.

Imagine you have a small, somewhat blurry photo, and you want to make it larger and clearer, like turning a wallet-sized photo into a poster without losing quality. Traditional methods might make the photo bigger, but it would become even blurrier. AI upscaling models work a lot like a smart artist who not only enlarges the photo but also cleverly adds in details to make the larger photo look sharp and clear.

There is also a big overlap between image upscaling and image restoration. AI models for image restoration fix blemishes, remove noise and add detail, which is well suited to the upscaling process.

There are different upscaling models for different purposes. Explore the different options and look at their specific strengths: face restoration, creativity, sharpness improvements…


https://replicate.com/collections/super-resolution 


## Image to video

you can use your LoRa to generate frames that can be animated through image to video models.

expensive.


</div>

<div class="lang-de" markdown="1">



</div>