---
title: "LoRAs for AI Image Generation"
title_de: "LoRAs für KI-Bildgenerierung"
description: "Train your own LoRA on a small collection of images, then use it to generate, edit, upscale and animate images with Replicate."
description_de: "Trainiert ein eigenes LoRA mit einer kleinen Bildsammlung und nutzt es anschließend, um mit Replicate Bilder zu erzeugen, zu bearbeiten, hochzuskalieren und zu animieren."
order: 5
published: true
---

<div class="lang-en" markdown="1">

## Overview

Over the past decade, image generation with neural networks has moved from a research curiosity to a ubiquitous and accessible tool. A very short history: in 2015, *DeepDream* turned a classification network "inside out", amplifying whatever patterns it recognised in a photograph and producing the hallucinatory, dog-eyed images that became its signature look. Around the same time, Generative Adversarial Networks (GANs) introduced a new approach, in which two networks are trained against each other: one generates images, the other tries to tell them apart from real ones. GANs dominated the late 2010s, from face synthesis to the first generative art sold at auction. Since 2021–22, diffusion models have taken over: they learn to generate images by gradually removing noise, guided by a text prompt. Systems such as Stable Diffusion, Midjourney and FLUX are all built on this principle.

These models are trained on enormous datasets, and they reproduce the aesthetic of that data in an averaged, generic form. Eryk Salvaggio's 2024 video essay [*Flowers Blooming Backward Into Noise*](https://vimeo.com/832284202) explains how diffusion models work, as well as pointing out the discriminatory bias and politics of representation embedded in the imaging system.

<iframe width="800" height="450" src="https://player.vimeo.com/video/832284202?h=bc9966128c" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen" allowfullscreen title="Eryk Salvaggio: Flowers Blooming Backward Into Noise"></iframe>



A **LoRA** (*Low-Rank Adaptation*) is a fine-tuning of an existing model: it is a small add-on file that adapts a large pre-trained model to a specific style, subject or aesthetic, without retraining the whole model. The original model stays frozen. The LoRA only stores a small set of additional weights, which are applied on top of it when you generate an image. In practice, this means:

- you only need a **small dataset**: 10 to 20 images are often enough to start
- training is **fast and cheap** compared to training a model from scratch
- the resulting file is **small**, and can be switched on or off, strengthened or weakened, or combined with other LoRAs
- you activate it in a prompt with a **trigger word** of your choice

For artists and photographers, LoRAs are interesting because they shift the question from *what does the model know?* to *what do I feed it?* Your own archive, a series of video game screenshots or a visual genre you want to study becomes the training material, and with it come questions of authorship, consent and the sources of the images you use. From a creative standpoint, it also allows more control over the process where you are leading the creative generation rather than giving up creative agency to generic machines.

![LoRA Explained]({{ site.baseurl }}/tutorials/assets/AI_LoRAexplainedEN.png)


In this tutorial you will train a LoRA on [Replicate](https://replicate.com/), a platform that lets you do it in the browser, and then use it together with other tools for editing and animating images.

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

Replicate is not free, but it costs very little to generate a few images with a custom model (see the [pricing page](https://replicate.com/pricing)). Training your own LoRA typically costs between 1 and 2 US dollars. Video generation is considerably more expensive, so check prices before running a model.

**Think about your dataset.** Decide whether you want to train a **style** (for example the look of CCTV stills, or of a video game's photo mode) or a **subject** (a particular object, place or character). Then collect images that share that aesthetic. You can use screenshots from a video game, photographs you took yourself, or images you find online. Whatever you use, consider where the images come from:

- consider using images you made yourself, and not just using appropriated images
- do not train on the face or the work of a person who has not agreed to it
- keep track of your sources: you will want to be able to say what your model was trained on

## Experimenting with older models

Before working with current models, it is useful to see where they come from. The [Old Models Foundation](https://www.oldmodels.org/sandbox) preserves and distributes generative AI models of historical and cultural significance. Their webpage lets you try out earlier generations of image models and compare how much their outputs differ from today's. Look at how these models work, and at which aesthetic qualities they have that newer, more polished models have lost.

## Replicate

[Replicate](https://replicate.com) is a platform where people can run, and upload private or public, open-source models for generative AI, including models fine-tuned on custom datasets. You can also run any of the public models available on the [Explore page](https://replicate.com/explore).

![Replicate]({{ site.baseurl }}/tutorials/assets/AI_ReplicateOverview.png)


Alternatives:

- [fal.ai](https://fal.ai/explore/best-lora-trainers)
- [CivitAI](https://education.civitai.com/using-civitai-the-on-site-lora-trainer/)
- [Krea](https://www.krea.ai/train)

These platforms offer similar LoRA training, with different interfaces and pricing.

## Train your own LoRA

This section follows and paraphrases Replicate's own guide, [Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux), which uses the FLUX model family. Replicate describes fine-tuning as a way to get a version of an image model that consistently produces a particular **style**, or always includes a specific character or **subject**. No deep technical knowledge is needed: the whole process can be done in the browser.

### 1. Prepare your dataset

Collect **10 to 20 images** with a similar look and feel. According to Replicate, the technical minimum is as low as two images, but around ten is a sensible lower limit for good results. More images can improve the outcome, but make training slower.

![LoRA Dataset]({{ site.baseurl }}/tutorials/assets/AI_LoRADataset.png)

- JPG, PNG and WebP files all work. Where possible use a resolution of 1024 × 1024 pixels or higher. File names and aspect ratios do not matter.
- Aim for **variety within coherence**: if you train a subject, vary the setting, lighting and angle; if you train a style, vary the content but keep the visual language consistent.

Put your images in a folder and compress it into a single **.zip** file.

![LoRA Dataset Zipped]({{ site.baseurl }}/tutorials/assets/AI_LoRADatasetZip.png)


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

![LoRA Training]({{ site.baseurl }}/tutorials/assets/AI_LoRATraining.png)

Training is billed per second of computing time. At the time Replicate's guide was written, a training with about 20 images and 1000 steps took around two minutes and cost roughly 1.50 USD. Prices change, so check the current rates on the pricing page. Wait for the training to complete, which is a good moment for a break.

**Training fails on a Mac?** Hidden "ghost" files created by macOS can break the upload. Open the Terminal, `cd` into the folder that contains your dataset folder, and type: `dot_clean LORA_FOLDER_NAME`. Then zip the folder again and upload the new file.


### 4. Generate images with your model

When the training is complete, you can click **Run trained model** to use the model in the browser, or **Download weights** to use the LoRA elsewhere (for example in a local tool like ComfyUI). You can also reach your model at any time from [replicate.com/models](https://replicate.com/models) by clicking on its name.

Write a prompt that includes your trigger word. FLUX follows long, descriptive prompts well, so the more detailed your description, the better. If you run out of ideas, Replicate suggests asking a language model to write ten detailed, varied prompts that all include your trigger word.

![LoRA Generating Images]({{ site.baseurl }}/tutorials/assets/AI_LoRAGeneratingImages.png)

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
3. Upload an image or enter the image URL (each image generated from your LoRA has a URL you can find in the JSON table of your Output)
4. In the **mask** field, select **Inpainting > Open inpainting canvas**
5. Use the tools at the top of the canvas to adjust the brush size
6. Paint over the whole area you want to replace, and click **Save mask**
7. In the **prompt**, write a simple description of what should appear in that area, for example "a boy with pink hair"
8. For larger changes, increase the **guidance** value (for replacing hair, a value of 30 works well)

Once you get a good starting point, copy the **seed** number of your result and paste it into the **seed** field. This lets you keep the composition stable while you tweak the prompt or the guidance, and compare the results.

![LoRA Inpainting]({{ site.baseurl }}/tutorials/assets/AI_LoRAInpainting.png)

## Upscaling

Upscaling increases an image's resolution. AI is used to enhance the image by adding detail and fixing artefacts.

Imagine you have a small, somewhat blurry photo, and you want to make it larger and clearer, like turning a wallet-sized photo into a poster without losing quality. Traditional methods would make the photo bigger, but it would also become blurrier. AI upscaling models work like a smart artist who not only enlarges the photo, but also cleverly adds details to make the larger version look sharp and clear. Note that these details are *invented* by the model, a point worth discussing when working with photographs.

There is also a big overlap between upscaling and image restoration. AI models for restoration fix blemishes, remove noise and add detail, which is well suited to the upscaling process.

Different upscaling models serve different purposes. Explore the options and compare their specific strengths: face restoration, creativity, sharpness improvement and so on. You can find them in Replicate's [super-resolution collection](https://replicate.com/collections/super-resolution), and read more in the guide [Upscale images with AI models](https://replicate.com/docs/guides/run/upscale-images-with-ai-models).

![Replicate Upscale]({{ site.baseurl }}/tutorials/assets/AI_ReplicateUpscale.png)


## Image to video

You can use your LoRA to generate a series of consistent images (for instance, different moments in the same scene or the same character) and then animate them with [image-to-video models](https://replicate.com/collections/text-to-video). Upload a still image as the starting frame, describe the movement you want in the prompt, and the model generates a short clip.

<video muted autoplay controls playsinline width="100%">
<source src="{{ site.baseurl }}/tutorials/assets/AI_LoRAtoVideo.mp4" type="video/mp4">
</video>

Be aware that this is the **most expensive** step in this tutorial: video generation costs much more than generating still images. Check the price of a model on its page before running it, start with short clips, and test your ideas on a small scale first.

## Further resources

- [Replicate: Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux)
- [Replicate: Working with LoRAs](https://replicate.com/docs/guides/extend/working-with-loras)
- [Replicate: collection of FLUX fine-tunes](https://replicate.com/collections/flux-fine-tunes), for inspiration

## Exercise: train a style

1. Choose a style or a subject, and collect 10 to 20 images that you made or have the right to use (exception for young Justin Bieber).
2. Zip the folder, choose a trigger word and train your LoRA on Replicate.
3. Generate at least ten images with your trigger word. Vary the prompt, and run the same prompt with a low and a high `lora_scale`.
4. Choose your best result. Use inpainting to change one element of it, and upscale the final image.
5. Compare your outputs with your training images: what did the model pick up, what did it ignore, and what did it invent? Does it reproduce your images, or an average of them? What does it reveal about the way you collected and framed them?

**Optional challenge: "break" the dataset.** Train a second LoRA on a deliberately narrow or odd dataset: only one angle, only blurry images, only one colour. Challenge the idea of photorealism, which these systems often subtly steer users towards. Observe how the model exaggerates and distorts what you gave it, and decide whether that distortion can become the subject of your work. If you want to go further, turn your most successful images into a short clip with an image-to-video model.

## Bonus: concept hijacking

A LoRA does not learn from images alone, but from images *and their captions*. During training, the model connects what it sees with the words used to describe it. This is why Replicate recommends an invented trigger word: it gives your concept a name the model does not already know.

You can also do the opposite and attach your images to a word the model already knows well. This is sometimes called **concept hijacking** or **caption swapping**: a word that normally produces one thing starts to produce something else.

For example, train a LoRA on photographs of trees, but caption every image as "a photo of a flower". The model learns that a "flower" looks like a tree. Afterwards, prompt for a flower and see what happens.

Do not expect a clean swap. You are more likely to get hybrids, such as flowers with trunks and canopies or trees with petals, and different results with every seed. How strong the effect is depends on the number of images, the training steps, how consistent your captions are, and the `lora_scale` you generate with. Related words (a bouquet, a garden) may be affected too, because the model connects them to the hijacked word. A LoRA is applied to every prompt once it is loaded, so the effect does not depend on a special trigger word.

The artist Sunny Attias used this process in *Compromised Unit* (2024). He explains how he works in [this video](https://www.youtube.com/watch?v=6mH9CO1nOK8), part of the [Screen Walks](https://screenwalks.com/) programme. It is worth watching before you try the steps below.

1. Collect 10 to 20 images of the thing you want to hijack, for example trees.
2. Write a caption for each image in a **.txt** file with the same name as the image: `tree_01.jpg` is captioned by `tree_01.txt`. Use the word you want to hijack, for example `a photo of a flower`, and keep the captions consistent.
3. Put the images and the .txt files together in one folder and compress it into a .zip file.
4. On the training page, turn off the **autocaptioning** option. Otherwise Replicate's captioning model describes your images itself, instead of using your captions.
5. The **trigger_word** field is still required: enter the word you are hijacking, for example `flower`.
6. After training, generate images with prompts that use the hijacked word, without any special trigger, for example "a flower in a vase" or "a field of flowers". Compare the results with the same prompts on the base FLUX model, and try different `lora_scale` values.

**Try:** hijack a word with a strong visual identity (a flower, a face, a car) and one with a weak one (a feeling, a place name). In which case does the model resist more? What does this tell you about how it connects words and images?

</div>

<div class="lang-de" markdown="1">

## Überblick

In den letzten zehn Jahren hat sich die Bilderzeugung mit neuronalen Netzen von einer Kuriosität der Forschung zu einem allgegenwärtigen und zugänglichen Werkzeug entwickelt. Eine sehr kurze Geschichte: 2015 stülpte *DeepDream* ein Klassifikationsnetz gewissermaßen „von innen nach außen“ und verstärkte alle Muster, die es in einer Fotografie erkannte. Das Ergebnis waren die halluzinatorischen Bilder voller Hundeaugen, die zu seinem Markenzeichen wurden. Etwa zur gleichen Zeit führten Generative Adversarial Networks (GANs) einen neuen Ansatz ein, bei dem zwei Netze gegeneinander trainiert werden: Das eine erzeugt Bilder, das andere versucht, sie von echten zu unterscheiden. GANs prägten die späten 2010er-Jahre, von der Gesichtssynthese bis zur ersten generativen Kunst, die bei einer Auktion verkauft wurde. Seit 2021–22 haben Diffusionsmodelle übernommen: Sie lernen, Bilder zu erzeugen, indem sie schrittweise Rauschen entfernen, geleitet von einem Text-Prompt. Systeme wie Stable Diffusion, Midjourney und FLUX beruhen alle auf diesem Prinzip.

Diese Modelle werden mit riesigen Datensätzen trainiert und geben die Ästhetik dieser Daten in gemittelter, generischer Form wieder. Eryk Salvaggios Videoessay von 2024, [*Flowers Blooming Backward Into Noise*](https://vimeo.com/832284202), erklärt, wie Diffusionsmodelle funktionieren, und weist zugleich auf die diskriminierenden Verzerrungen (Bias) und die Politik der Repräsentation hin, die in das Bildgebungssystem eingeschrieben sind.

<iframe width="800" height="450" src="https://player.vimeo.com/video/832284202?h=bc9966128c" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen" allowfullscreen title="Eryk Salvaggio: Flowers Blooming Backward Into Noise"></iframe>

Ein **LoRA** (*Low-Rank Adaptation*) ist ein Fine-Tuning eines bestehenden Modells: eine kleine Zusatzdatei, die ein großes, vortrainiertes Modell an einen bestimmten Stil, ein Motiv oder eine Ästhetik anpasst, ohne das gesamte Modell neu zu trainieren. Das ursprüngliche Modell bleibt dabei unverändert. Das LoRA speichert nur eine kleine Menge zusätzlicher Gewichte, die beim Erzeugen eines Bildes auf das Modell angewendet werden. In der Praxis bedeutet das:

- ihr braucht nur einen **kleinen Datensatz**: 10 bis 20 Bilder reichen für den Anfang oft aus
- das Training ist im Vergleich zum Training eines Modells von Grund auf **schnell und günstig**
- die entstehende Datei ist **klein** und lässt sich an- oder ausschalten, verstärken oder abschwächen oder mit anderen LoRAs kombinieren
- ihr aktiviert es in einem Prompt mit einem **Trigger Word** eurer Wahl

Für Künstler:innen und Fotograf:innen sind LoRAs interessant, weil sie die Frage verschieben: von *Was weiß das Modell?* zu *Womit füttere ich es?* Euer eigenes Archiv, eine Serie von Videospiel-Screenshots oder ein visuelles Genre, das ihr untersuchen wollt, wird zum Trainingsmaterial, und damit kommen Fragen nach Urheberschaft, Einwilligung und der Herkunft der verwendeten Bilder auf. Aus kreativer Sicht ermöglicht es außerdem mehr Kontrolle über den Prozess: Ihr steuert die kreative Erzeugung, anstatt die kreative Handlungsmacht an generische Maschinen abzugeben.

In diesem Tutorial trainiert ihr ein LoRA auf [Replicate](https://replicate.com/), einer Plattform, auf der ihr das im Browser tun könnt, und setzt es anschließend zusammen mit anderen Werkzeugen ein, um Bilder zu bearbeiten und zu animieren.

![LoRA Explained]({{ site.baseurl }}/tutorials/assets/AI_LoRAexplainedDE.png)



## Was ihr lernt

Am Ende dieses Tutorials könnt ihr:

- erklären, was ein LoRA ist und wie es sich von einem vollständigen Bildmodell unterscheidet
- einen kleinen, kohärenten Datensatz für einen Stil oder ein Motiv zusammenstellen
- ein LoRA auf Replicate trainieren, ohne Code zu schreiben
- Bilder mit eurem Trigger Word erzeugen und die Ergebnisse mit den Parametern des Modells anpassen
- Teile eines Bildes mit Inpainting ersetzen
- die Auflösung eines Bildes mit einem Upscaling-Modell erhöhen
- verstehen, wie erzeugte Bilder mit Image-to-Video-Modellen animiert werden können

## Vor dem Start

**Ihr braucht:**

- ein [GitHub](https://github.com)-Konto (kostenlos), mit dem ihr euch bei Replicate anmeldet
- eine Kreditkarte, um Guthaben auf euer Replicate-Konto zu laden
- einen Ordner mit 10 bis 20 Bildern (siehe unten)

Replicate ist nicht kostenlos, aber das Erzeugen einiger Bilder mit einem eigenen Modell kostet sehr wenig (siehe die [Preisseite](https://replicate.com/pricing)). Das Training eures eigenen LoRAs kostet in der Regel zwischen 1 und 2 US-Dollar. Die Videoerzeugung ist deutlich teurer, prüft die Preise also, bevor ihr ein Modell ausführt.

**Überlegt euch euren Datensatz.** Entscheidet, ob ihr einen **Stil** trainieren wollt (zum Beispiel den Look von Überwachungskamerabildern oder des Fotomodus eines Videospiels) oder ein **Motiv** (ein bestimmtes Objekt, einen Ort oder eine Figur). Sammelt dann Bilder, die diese Ästhetik teilen. Ihr könnt Screenshots aus einem Videospiel verwenden, Fotografien, die ihr selbst gemacht habt, oder Bilder, die ihr online findet. Was auch immer ihr verwendet, überlegt, woher die Bilder stammen:

- erwägt, eigene Bilder zu verwenden, anstatt nur angeeignete Bilder zu nutzen
- trainiert nicht mit dem Gesicht oder dem Werk einer Person, die dem nicht zugestimmt hat
- dokumentiert eure Quellen: Ihr solltet später sagen können, womit euer Modell trainiert wurde

## Experimente mit älteren Modellen

Bevor ihr mit aktuellen Modellen arbeitet, lohnt sich ein Blick darauf, woher sie kommen. Die [Old Models Foundation](https://www.oldmodels.org/sandbox) bewahrt generative KI-Modelle von historischer und kultureller Bedeutung und stellt sie zur Verfügung. Auf ihrer Webseite könnt ihr frühere Generationen von Bildmodellen ausprobieren und vergleichen, wie stark sich ihre Ergebnisse von heutigen unterscheiden. Achtet darauf, wie diese Modelle funktionieren und welche ästhetischen Qualitäten sie haben, die neuere, glattere Modelle verloren haben.

## Replicate

[Replicate](https://replicate.com) ist eine Plattform, auf der Open-Source-Modelle für generative KI ausgeführt und, privat oder öffentlich, hochgeladen werden können, darunter auch Modelle, die mit eigenen Datensätzen feinabgestimmt wurden. Ihr könnt außerdem jedes öffentliche Modell ausführen, das auf der [Explore-Seite](https://replicate.com/explore) verfügbar ist.

![Replicate]({{ site.baseurl }}/tutorials/assets/AI_ReplicateOverview.png)


Alternativen:

- [fal.ai](https://fal.ai/explore/best-lora-trainers)
- [CivitAI](https://education.civitai.com/using-civitai-the-on-site-lora-trainer/)
- [Krea](https://www.krea.ai/train)

Diese Plattformen bieten ein ähnliches LoRA-Training mit anderen Oberflächen und Preisen.

## Euer eigenes LoRA trainieren

Dieser Abschnitt folgt der Anleitung von Replicate, [Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux), und gibt sie sinngemäß wieder. Sie verwendet die FLUX-Modellfamilie. Replicate beschreibt Fine-Tuning als Möglichkeit, eine Version eines Bildmodells zu erhalten, die durchgehend einen bestimmten Stil erzeugt oder immer eine bestimmte Figur oder ein bestimmtes Motiv enthält. Dafür braucht es kein tiefes technisches Wissen: Der gesamte Prozess lässt sich im Browser durchführen.

### 1. Euren Datensatz vorbereiten

Sammelt **10 bis 20 Bilder** mit einem ähnlichen Look and Feel. Laut Replicate liegt das technische Minimum bei nur zwei Bildern, aber etwa zehn sind eine sinnvolle Untergrenze für gute Ergebnisse. Mehr Bilder können das Ergebnis verbessern, verlangsamen aber das Training.

![LoRA Dataset]({{ site.baseurl }}/tutorials/assets/AI_LoRADataset.png)

- JPG-, PNG- und WebP-Dateien funktionieren alle. Verwendet wenn möglich eine Auflösung von 1024 × 1024 Pixeln oder höher. Dateinamen und Seitenverhältnisse spielen keine Rolle.
- Strebt **Vielfalt innerhalb der Kohärenz** an: Wenn ihr ein Motiv trainiert, variiert Umgebung, Licht und Blickwinkel; wenn ihr einen Stil trainiert, variiert den Inhalt, aber behaltet die visuelle Sprache bei.

Legt eure Bilder in einen Ordner und komprimiert ihn zu einer einzigen **.zip**-Datei.

![LoRA Dataset Zipped]({{ site.baseurl }}/tutorials/assets/AI_LoRADatasetZip.png)


### 2. Ein Trigger Word wählen

Zusammen mit den Bildern wählt ihr ein **Trigger Word**, das ihr später in euren Prompts schreibt, um das LoRA zu „aktivieren“, zum Beispiel: `photo of MYTRGGR walking through a market`.

Replicates Tipps für die Wahl:

- wählt ein einzigartiges, erfundenes Wort, wie ein Wunschkennzeichen (z. B. `MY_UNIQ_TRGGR`)
- verwendet kein Wort, das in irgendeiner Sprache existiert (wie *dog* oder *cyberpunk*), da das Modell damit bereits etwas verbindet
- vermeidet `TOK`, ein sehr verbreitetes Trigger Word, das mit anderen Fine-Tunes kollidieren kann, wenn ihr sie später kombinieren wollt
- Großbuchstaben sind optional, helfen aber, das Trigger Word vom Rest des Prompts abzuheben

### 3. Das Modell trainieren

1. Geht zu [replicate.com/replicate/fast-flux-trainer/train](https://replicate.com/replicate/fast-flux-trainer/train)
2. Wählt im Feld **destination** ein Modell > **Create a new model** und gebt einen Namen ein. Euer Modell kann öffentlich oder privat sein.
3. Ladet eure .zip-Datei im Feld **input_images** hoch.
4. Gebt in **trigger_word** das gewählte Trigger Word ein.
5. Wählt in **lora_type** je nach Datensatz **subject** oder **style**.
6. Belasst **training_steps** (unter den erweiterten Optionen) beim Standardwert 1000. Replicate warnt, dass weniger Schritte dem Modell euer Konzept nicht richtig beibringen, während mehr Schritte Zeit und Kosten erhöhen, ohne viel zu verbessern.
7. Belasst die übrigen Felder bei ihren Standardwerten und klickt auf **Create training**.

![LoRA Training]({{ site.baseurl }}/tutorials/assets/AI_LoRATraining.png)

Das Training wird pro Sekunde Rechenzeit abgerechnet. Als Replicates Anleitung geschrieben wurde, dauerte ein Training mit etwa 20 Bildern und 1000 Schritten rund zwei Minuten und kostete etwa 1,50 USD. Preise ändern sich, prüft also die aktuellen Tarife auf der Preisseite. Wartet, bis das Training abgeschlossen ist. Das ist ein guter Moment für eine Pause.

**Das Training schlägt auf einem Mac fehl?** Versteckte „Geisterdateien“, die macOS erzeugt, können den Upload stören. Öffnet das Terminal, wechselt mit `cd` in den Ordner, der euren Datensatzordner enthält, und gebt ein: `dot_clean LORA_FOLDER_NAME`. Komprimiert den Ordner danach erneut und ladet die neue Datei hoch.


### 4. Bilder mit eurem Modell erzeugen

Wenn das Training abgeschlossen ist, könnt ihr auf **Run trained model** klicken, um das Modell im Browser zu verwenden, oder auf **Download weights**, um das LoRA anderswo einzusetzen (zum Beispiel in einem lokalen Tool wie ComfyUI). Ihr erreicht euer Modell jederzeit auch über [replicate.com/models](https://replicate.com/models), indem ihr auf seinen Namen klickt.

Schreibt einen Prompt, der euer Trigger Word enthält. FLUX folgt langen, beschreibenden Prompts gut: Je detaillierter eure Beschreibung, desto besser. Wenn euch die Ideen ausgehen, empfiehlt Replicate, ein Sprachmodell zu bitten, zehn detaillierte, abwechslungsreiche Prompts zu schreiben, die alle euer Trigger Word enthalten.

![LoRA Generating Images]({{ site.baseurl }}/tutorials/assets/AI_LoRAGeneratingImages.png)

### Parameter

Wenn das Training gut verlaufen ist, sollte euer Modell auf sein Trigger Word reagieren, aber rechnet damit, einige Zeit mit der Feinabstimmung eurer Ergebnisse zu verbringen. Das sind die wichtigsten Parameter:

- `prompt`: beschreibt das gewünschte Bild. Denkt daran, das Trigger Word eures LoRAs aufzunehmen.
- `image`: ladet optional ein Bild hoch, das als Ausgangspunkt für die Erzeugung dient.
- `width` und `height`: die Größe des erzeugten Bildes in Pixeln.
- `num_outputs`: wie viele Bilder auf einmal erzeugt werden.
- `prompt_strength`: wenn ihr ein `image` angebt, legt dieser Wert fest, wie stark euer Prompt es beeinflusst (0 bis 1). Niedrige Werte bleiben nah am Originalbild.
- `lora_scale`: wie stark euer eigenes Fine-Tuning das Ergebnis beeinflusst (-1 bis 3). Niedrigere Werte ergeben einen subtileren Effekt, höhere einen extremeren, und negative Werte bewegen sich von eurem Stil weg.

**Tipp:** Ändert immer nur einen Parameter und notiert, was ihr geändert habt, damit ihr versteht, was jeder einzelne bewirkt.

## Inpainting

Inpainting ist eine Technik, um Teile eines Bildes zu ersetzen oder zu reparieren. Sie füllt fehlende oder beschädigte Bereiche auf oder entfernt ein unerwünschtes Objekt, um ein vollständiges Bild herzustellen. Mit generativen Modellen könnt ihr damit auch einen ausgewählten Bereich durch etwas ganz Neues ersetzen.

1. Geht zum [Replicate Playground](https://replicate.com/playground)
2. Wählt das Modell **flux-fill-pro**
3. Ladet ein Bild hoch oder gebt die Bild-URL ein (jedes mit eurem LoRA erzeugte Bild hat eine URL, die ihr im JSON-Tab eures Outputs findet)
4. Wählt im Feld **mask** die Option **Inpainting > Open inpainting canvas**
5. Passt mit den Werkzeugen am oberen Rand der Zeichenfläche die Pinselgröße an
6. Malt über den gesamten Bereich, den ihr ersetzen wollt, und klickt auf **Save mask**
7. Schreibt im **prompt** eine einfache Beschreibung dessen, was in diesem Bereich erscheinen soll, zum Beispiel „a boy with pink hair“
8. Erhöht für größere Änderungen den Wert für **guidance** (für das Ersetzen von Haaren funktioniert ein Wert von 30 gut)

Sobald ihr einen guten Ausgangspunkt habt, kopiert die **seed**-Nummer eures Ergebnisses und fügt sie in das Feld **seed** ein. So bleibt die Komposition stabil, während ihr den Prompt oder den guidance-Wert anpasst, und ihr könnt die Ergebnisse vergleichen.

![LoRA Inpainting]({{ site.baseurl }}/tutorials/assets/AI_LoRAInpainting.png)

## Upscaling

Upscaling erhöht die Auflösung eines Bildes. KI wird eingesetzt, um das Bild zu verbessern, indem sie Details hinzufügt und Artefakte korrigiert.

Stellt euch ein kleines, etwas unscharfes Foto vor, das ihr größer und klarer machen wollt, etwa wenn ihr ein Foto im Passbildformat zu einem Poster vergrößert, ohne an Qualität zu verlieren. Herkömmliche Methoden würden das Foto vergrößern, aber es würde dabei auch unschärfer. KI-Upscaling-Modelle funktionieren wie eine geschickte Künstlerin, die das Foto nicht nur vergrößert, sondern auch auf kluge Weise Details ergänzt, damit die größere Version scharf und klar aussieht. Beachtet, dass diese Details vom Modell *erfunden* werden, ein Punkt, der sich bei der Arbeit mit Fotografien zu diskutieren lohnt.

Zwischen Upscaling und Bildrestaurierung gibt es außerdem große Überschneidungen. KI-Modelle für die Restaurierung beheben Makel, entfernen Rauschen und ergänzen Details, was sich gut für den Upscaling-Prozess eignet.

Verschiedene Upscaling-Modelle dienen unterschiedlichen Zwecken. Probiert die Optionen aus und vergleicht ihre jeweiligen Stärken: Gesichtsrestaurierung, Kreativität, Schärfeverbesserung und so weiter. Ihr findet sie in Replicates [Super-Resolution-Kollektion](https://replicate.com/collections/super-resolution) und könnt mehr dazu in der Anleitung [Upscale images with AI models](https://replicate.com/docs/guides/run/upscale-images-with-ai-models) lesen.

![Replicate Upscale]({{ site.baseurl }}/tutorials/assets/AI_ReplicateUpscale.png)


## Image to Video

Ihr könnt euer LoRA verwenden, um eine Reihe konsistenter Bilder zu erzeugen (zum Beispiel verschiedene Momente derselben Szene oder derselben Figur) und diese anschließend mit [Image-to-Video-Modellen](https://replicate.com/collections/text-to-video) zu animieren. Ladet ein Standbild als Startbild hoch, beschreibt im Prompt die gewünschte Bewegung, und das Modell erzeugt einen kurzen Clip.

<video muted autoplay controls playsinline width="100%">
<source src="{{ site.baseurl }}/tutorials/assets/AI_LoRAtoVideo.mp4" type="video/mp4">
</video>

Beachtet, dass dies der **teuerste** Schritt in diesem Tutorial ist: Die Videoerzeugung kostet viel mehr als das Erzeugen von Standbildern. Prüft den Preis eines Modells auf seiner Seite, bevor ihr es ausführt, beginnt mit kurzen Clips und testet eure Ideen zuerst im Kleinen.

## Weitere Ressourcen

- [Replicate: Fine-tune an image model](https://replicate.com/docs/get-started/fine-tune-with-flux)
- [Replicate: Working with LoRAs](https://replicate.com/docs/guides/extend/working-with-loras)
- [Replicate: Kollektion von FLUX-Fine-Tunes](https://replicate.com/collections/flux-fine-tunes), zur Inspiration

## Übung: einen Stil trainieren

1. Wählt einen Stil oder ein Motiv und sammelt 10 bis 20 Bilder, die ihr selbst gemacht habt oder verwenden dürft (Ausnahme für den jungen Justin Bieber).
2. Komprimiert den Ordner, wählt ein Trigger Word und trainiert euer LoRA auf Replicate.
3. Erzeugt mindestens zehn Bilder mit eurem Trigger Word. Variiert den Prompt und führt denselben Prompt mit einem niedrigen und einem hohen `lora_scale` aus.
4. Wählt euer bestes Ergebnis. Ändert mit Inpainting ein Element darin und skaliert das fertige Bild hoch.
5. Vergleicht eure Ergebnisse mit euren Trainingsbildern: Was hat das Modell aufgenommen, was ignoriert und was erfunden? Gibt es eure Bilder wieder oder einen Durchschnitt davon? Was verrät es darüber, wie ihr sie gesammelt und gerahmt habt?

**Optionale Zusatzaufgabe: den Datensatz „brechen“.** Trainiert ein zweites LoRA mit einem bewusst engen oder merkwürdigen Datensatz: nur ein Blickwinkel, nur unscharfe Bilder, nur eine Farbe. Stellt die Idee des Fotorealismus infrage, zu der diese Systeme ihre Nutzer:innen oft unmerklich lenken. Beobachtet, wie das Modell das, was ihr ihm gegeben habt, übertreibt und verzerrt, und entscheidet, ob diese Verzerrung zum Gegenstand eurer Arbeit werden kann. Wenn ihr weitergehen wollt, verwandelt eure gelungensten Bilder mit einem Image-to-Video-Modell in einen kurzen Clip.

## Bonus: Concept Hijacking

Ein LoRA lernt nicht allein aus Bildern, sondern aus Bildern *und ihren Captions* (Bildunterschriften). Beim Training verbindet das Modell, was es sieht, mit den Wörtern, die es beschreiben. Deshalb empfiehlt Replicate ein erfundenes Trigger Word: Es gibt eurem Konzept einen Namen, den das Modell noch nicht kennt.

Ihr könnt auch das Gegenteil tun und eure Bilder an ein Wort binden, das das Modell bereits gut kennt. Das nennt man manchmal **Concept Hijacking** (Konzept-Entführung) oder **Caption Swapping** (Caption-Tausch): Ein Wort, das normalerweise etwas Bestimmtes erzeugt, erzeugt plötzlich etwas anderes.

Trainiert zum Beispiel ein LoRA mit Fotografien von Bäumen, beschriftet aber jedes Bild mit „a photo of a flower“. Das Modell lernt, dass eine „flower“ wie ein Baum aussieht. Gebt danach einen Prompt für eine Blume ein und schaut, was passiert.

Erwartet keinen sauberen Tausch. Wahrscheinlicher sind Hybride, etwa Blumen mit Stamm und Krone oder Bäume mit Blütenblättern, und bei jedem Seed andere Ergebnisse. Wie stark der Effekt ausfällt, hängt von der Anzahl der Bilder, den Trainingsschritten, der Einheitlichkeit eurer Captions und dem `lora_scale` ab, mit dem ihr erzeugt. Verwandte Wörter (ein Blumenstrauß, ein Garten) können ebenfalls betroffen sein, weil das Modell sie mit dem gekaperten Wort verbindet. Ein LoRA wird nach dem Laden auf jeden Prompt angewendet, der Effekt hängt also nicht von einem besonderen Trigger Word ab.

Der Künstler Sunny Attias hat dieses Verfahren in *Compromised Unit* (2024) eingesetzt. Wie er arbeitet, erklärt er in [diesem Video](https://www.youtube.com/watch?v=6mH9CO1nOK8), das Teil des Programms [Screen Walks](https://screenwalks.com/) ist. Es lohnt sich, es anzusehen, bevor ihr die folgenden Schritte ausprobiert.

1. Sammelt 10 bis 20 Bilder des Motivs, das ihr kapern wollt, zum Beispiel Bäume.
2. Schreibt für jedes Bild eine Caption in eine **.txt**-Datei mit demselben Namen wie das Bild: `tree_01.jpg` wird durch `tree_01.txt` beschriftet. Verwendet das Wort, das ihr kapern wollt, zum Beispiel `a photo of a flower`, und haltet die Captions einheitlich.
3. Legt die Bilder und die .txt-Dateien zusammen in einen Ordner und komprimiert ihn zu einer .zip-Datei.
4. Schaltet auf der Trainingsseite die Option **autocaptioning** aus. Sonst beschreibt das Captioning-Modell von Replicate eure Bilder selbst, anstatt eure Captions zu verwenden.
5. Das Feld **trigger_word** ist weiterhin erforderlich: Gebt das Wort ein, das ihr kapert, zum Beispiel `flower`.
6. Erzeugt nach dem Training Bilder mit Prompts, die das gekaperte Wort enthalten, ohne besonderes Trigger Word, zum Beispiel „a flower in a vase“ oder „a field of flowers“. Vergleicht die Ergebnisse mit denselben Prompts auf dem FLUX-Basismodell und probiert verschiedene `lora_scale`-Werte aus.

*Probiert aus:* Kapert ein Wort mit starker visueller Identität (eine Blume, ein Gesicht, ein Auto) und eines mit schwacher (ein Gefühl, einen Ortsnamen). In welchem Fall leistet das Modell mehr Widerstand? Was verrät das darüber, wie es Wörter und Bilder verbindet?

</div>