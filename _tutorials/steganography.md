---
title: "Steganography"
title_de: "Steganography"
description: "Learn how to hide text and images inside ordinary images with Steghide and a few simple tools, and how to get them back out again."
description_de: ""
order: 2
published: true
---

<div class="lang-en" markdown="1">

## Overview

Steganography is the practice of hiding information inside something else, so that nobody suspects it is there. A letter written in invisible ink, a message tucked inside a hollow object and a secret stored in the pixels of a photograph are all examples. In this tutorial you will learn how to hide text inside an image, how to hide an image inside an image, and how to get both back out again.

![An illustration of how photogrammetry works]({{ site.baseurl }}/tutorials/assets/SG_NorthKorean-USS-Pueblo.jpg)
<figcaption>North Korean Propaganda Photograph of prisoners of USS Pueblo, 1968. The soldiers were flipping the middle finger, as way to covertly protest their captivity in North Korea, and the propaganda on their treatment and guilt. The North Koreans for months photographed them without knowing the real meaning of flipping the middle finger, while the soldiers explained that the sign meant good luck in Hawaii.</figcaption>


<blockquote>Steganography is the practice of hiding a message so that nobody suspects it exists. This sets it apart from cryptography, which scrambles a message into a code that only the holder of a key can read. An encrypted message cannot be read, but it still looks like a secret. Steganography hides the message inside something ordinary, such as a picture, so that the act of communicating goes unnoticed.

The practice is not solely connected to digital communication but spans thousands of years and encompasses diverse fromates and materials. Classical accounts by Greek historian Herodotus in 440 BC tell of a message concealed beneath a servant's regrown hair. In the late fifteenth century Johannes Trithemius wrote Steganographia, a book that reads like a treatise on magic but deals with hidden writing. Art historians have claimed to find concealed letters, numbers and even a musical score in paintings by Leonardo, Michelangelo and Bosch. In the twentieth century spies shrank photographs into microdots, a prisoner of war stitched a Morse code message into the border of an embroidery, and in 1968 the crew of the USS Pueblo, photographed for North Korean propaganda, made rude gestures at the camera that their captors did not recognise at first.

In digital images, the most common technique is least significant bit (LSB) substitution, which replaces the least important bit of each colour value with a bit of the hidden message. The change is too small to see. Designers of such methods have to balance four competing demands: capacity, imperceptibility, robustness and security. Improving one usually weakens the others. Researchers are now hiding data in other media too, including the geometry of 3D meshes.

Source: [exo.substack.com/p/the-exo-guide-to-data-cloaking](https://exo.substack.com/p/the-exo-guide-to-data-cloaking)
</blockquote>

<iframe width="800" height="450" src="https://www.youtube.com/embed/rufnWLVQcKg?si=D-F7sbbpcGs2yKfD" title="Admiral Jeremiah Denton Blinks Morse Code Warning as P.O.W." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<figcaption>Admiral Jeremiah Denton Blinks Morse Code Warning as P.O.W.</figcaption>


By the end of this tutorial you will be able to:

- explain the difference between steganography and cryptography
- hide a text message in an image and retrieve it with Steghide
- hide an image in an image and retrieve it
- explain why hidden data can disappear when an image is saved, converted or shared

## How information hides in an image

A digital image is a long list of numbers. Every pixel has a red, a green and a blue value between 0 and 255, and each value is stored as eight bits. The last bit, the least significant one, changes the brightness of that colour by at most 1 out of 255, a difference nobody can see. If you replace those last bits with the bits of a message, the picture looks the same but carries hidden data:

- A red value of 200 is stored as `11001000`.
- To hide the bit `1`, the last place is changed and the value becomes `11001001`, which is 201.

Not every format works like this. A JPEG does not store pixels but compressed values from which the pixels are calculated, so JPEG tools such as Steghide change those stored values instead. Either way, the hidden data lives in the exact numbers of the file. This has three consequences that you will meet again in this tutorial:

- **Capacity is limited.** A small image has room for only a small secret.
- **Fragile files.** Resizing, recompressing or converting an image rewrites the numbers, and the hidden data is lost.
- **Hidden is not the same as protected.** Steganography hides that a message exists, but it does not make the message unreadable. Steghide also encrypts your data with a passphrase, but some tools do not, and hidden data can often be found by specialised analysis ("steganalysis"). Do not use these methods to protect anything truly sensitive.

## Software & Tools

- <a href="https://steghide.com/">Steghide</a> (macOS, Linux): a free command-line program that hides any file inside a JPEG, BMP, WAV or AU file and protects it with a passphrase. This is the tool used in this tutorial. It does not accept PNG files.
- <a href="https://www.mankier.com/1/steghide">Steghide manual page</a>: the full list of commands and options.

Alternatives:

- <a href="https://stylesuxx.github.io/steganography/">Steganography Online</a> (browser): hides a text message in an image and reads it out again. It needs no installation, but it hides text only and does not encrypt the message.
- <a href="https://github.com/Planet-Source-Code/int-21-xiao-steganography-v1-0-the-real-one__1-61292">Xiao Steganography</a> (PC)
- <a href="https://www.embeddedsw.net/OpenPuff_Steganography_Home.html">OpenPuff</a> (PC) It supports a wide range of carrier files, several passwords and "deniable" steganography, where you can reveal a harmless decoy to hide that there is something more.

For hiding an image in an image, this tutorial also uses a short script in Python, a programming language, with the Pillow image library. This part is optional.

## Before you start

- **Choose a busy photograph as the cover image.** Photographs with texture, grain and detail hide changes well. Flat graphics, screenshots and smooth gradients show them more easily.
- **Use the right format.** Steghide works with JPEG and BMP images, not PNG. The Python method in this tutorial needs PNG, because only a lossless format keeps every bit.
- **Keep your original.** Always save the result as a new file, so that you still have the untouched cover image to compare with.
- **Keep the secret small.** The larger the secret, the more the cover image has to change. Text takes almost no room, but a photograph is large.
- **Choose a passphrase and remember it.** Without the passphrase, Steghide cannot retrieve your data, and there is no way to reset it. Do not send the passphrase together with the image.
- **Do not recompress.** Messaging apps, social platforms, email programs and cloud services often resize and recompress images, which destroys the hidden data. Send your result as a file or inside a zip archive, and test it.
- **Use it responsibly.** Steganography is used for watermarks, art, privacy and journalism, but also for hiding malware. Only hide things you are allowed to hide, on devices you are allowed to use.

## Hiding and retrieving a text message in an image

Steghide first compresses your message and encrypts it with your passphrase. It then scatters the result across the image, so that the image changes only slightly. To get the message back, Steghide needs the same passphrase.

### Install Steghide

On a Mac, the easiest way to install Steghide is with MacPorts:

1. Install the developer tools from Apple by typing `xcode-select --install` into Terminal (open it from Applications → Utilities) and following the instructions.
2. Download and run the installer for your macOS version from the <a href="https://www.macports.org/install.php">MacPorts website</a>. Then close Terminal and open it again.
3. In Terminal, type `sudo port install steghide` and press Enter.
4. Enter your Mac password and press Enter. Nothing appears on screen while you type, which is normal.
5. If Terminal asks whether to install dependencies, press `Y` and then Enter.
6. When it has finished, check the installation by typing `steghide --version`.

<!-- IMAGE: Terminal after a successful installation -->

On Linux (Debian or Ubuntu), type `sudo apt install steghide`. Steghide has no official installer for Windows. On a Windows PC use OpenPuff or Xiao Steganography instead (see the software list above).

### Hide a message

Put your cover image and a text file with your message in the same folder, for example `cover.jpg` and `secret.txt`. Open Terminal in that folder: type `cd ` (with a space after it), drag the folder from Finder into the Terminal window and press Enter. Then type the following command. Commands are case sensitive, so write `steghide` in lowercase:

```bash
steghide embed -cf cover.jpg -ef secret.txt -sf output.jpg
```

The command embeds the file `secret.txt` in `cover.jpg` and writes the result to a new file, `output.jpg`:

- `-cf` is the cover file, the image that will carry the secret.
- `-ef` is the file to embed.
- `-sf` is the stego file, the new image that Steghide creates. Always include it. Without it, Steghide changes your cover image in place.

Steghide asks you to enter a passphrase and then to repeat it. Nothing appears on screen while you type. When it is finished, open `cover.jpg` and `output.jpg` next to each other. You should not be able to see a difference.

<!-- IMAGE: Cover image and stego image side by side -->

### Check how much an image can hold

If the message is too long for the image, Steghide stops with an error. To check the room in an image before you start, type:

```bash
steghide info cover.jpg
```

Steghide shows the file format and the capacity, the amount of data the image can carry. It may also ask whether it should try to get information about embedded data. For an untouched cover image, answer `n`.

### Retrieve a message

To get the message back, type:

```bash
steghide extract -sf output.jpg -xf retrieved-secret.txt
```

The command extracts the hidden data from `output.jpg` and writes it to `retrieved-secret.txt`. Steghide asks for the passphrase. If it is correct, open `retrieved-secret.txt` to read your message. If you leave out `-xf`, Steghide saves the data under the file name it had when it was embedded. If the passphrase is wrong, Steghide reports an error and extracts nothing.

### Without the terminal: an online tool

If you cannot install Steghide, the browser tool <a href="https://stylesuxx.github.io/steganography/">Steganography Online</a> hides text in an image:

1. Open the tool and choose the option to encode a message.
2. Select your cover image (a PNG or JPG) and type your message. The longest possible message is limited by the size of the image.
3. Save the new image that the tool creates. Keep it as a PNG: saving it as a JPEG would destroy the message.
4. To read the message, open the decoder page and select the new image.

<!-- IMAGE: Steganography Online encode page -->

This tool does not encrypt your message. Anyone who puts the image into the decoder can read it, so write something you are happy for others to find.

## Hiding and retrieving an image in an image

There are two ways to hide a picture in a picture. You can store the secret image as a file inside the cover image, or you can mix the pixels of the two images. The first is simple and works with the tools you already have. The second is a good way to see how the hiding actually works.

### Method 1: embed an image file with Steghide

Steghide can hide any file, and an image is a file. The secret image is stored whole inside the cover image, so you get back exactly the file you put in. The only difficulty is size. An image file is much larger than a text message, so the cover image has to be large and the secret image has to be small.

First, make a small version of your secret image, for example 300 pixels wide, and save it as a JPEG with strong compression. In Preview on a Mac, use Tools → Adjust Size and then File → Export.

Second, check the capacity of your cover image with `steghide info cover.jpg` and compare it with the file size of the secret image. If the secret does not fit, make it smaller or choose a larger cover image.

Then hide the image, using the same command as for text but with the image as the file to embed:

```bash
steghide embed -cf cover.jpg -ef secret.jpg -sf output.jpg
```

To retrieve it, extract the hidden file and give it an image file name:

```bash
steghide extract -sf output.jpg -xf retrieved-secret.jpg
```

Open `retrieved-secret.jpg`: it is identical to the file you hid.

### Method 2 (optional): mix the pixels with Python

In this method you hide the secret image in the weakest bits of the cover image's colour values, like the example in the section above. This time you give up four bits per colour value. The four strongest bits of each value stay with the cover image, and the four strongest bits of the secret image take the place of the four weakest ones. The cover image barely changes, and the secret image comes back with fewer shades, but you can recognise it.

First install the Pillow image library: type `pip3 install pillow` in Terminal. Then save the following script as `hide_image.py`:

```python
"""Hide one image inside another image, and get it back.

Usage:
  python3 hide_image.py hide cover.png secret.png output.png
  python3 hide_image.py reveal output.png revealed.png
"""
import sys
from PIL import Image, ImageChops

BITS = 4  # how many bits per colour value the cover gives up to the secret (1-7)

KEEP = 0xFF & ~((1 << BITS) - 1)  # the cover's strongest bits (kept)
LOW = (1 << BITS) - 1             # the cover's weakest bits (replaced)
SHIFT = 8 - BITS


def hide(cover_path, secret_path, out_path):
    cover = Image.open(cover_path).convert("RGB")
    secret = Image.open(secret_path).convert("RGB").resize(cover.size)
    cover_strong = cover.point(lambda v: v & KEEP)
    secret_strong = secret.point(lambda v: v >> SHIFT)
    ImageChops.add(cover_strong, secret_strong).save(out_path, "PNG")


def reveal(stego_path, out_path):
    stego = Image.open(stego_path).convert("RGB")
    stego.point(lambda v: (v & LOW) << SHIFT).save(out_path, "PNG")


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) == 4 and args[0] == "hide":
        hide(args[1], args[2], args[3])
    elif len(args) == 3 and args[0] == "reveal":
        reveal(args[1], args[2])
    else:
        print(__doc__)
```

Put the script in the same folder as `cover.png` and `secret.png` (use two images with the same proportions, because the script stretches the secret to the size of the cover). Then type:

```bash
python3 hide_image.py hide cover.png secret.png output.png
python3 hide_image.py reveal output.png revealed.png
```

The first command creates `output.png`, which looks like the cover image. The second reads the hidden image out of it and saves it as `revealed.png`.

<!-- IMAGE: Cover, secret, output and revealed image side by side -->

Some things to try and to keep in mind:

- **Change `BITS`.** With `BITS = 2` the cover image changes even less, but the secret image comes back with only four shades per colour. With `BITS = 6` the secret is nearly perfect, but the cover image shows the strain.
- **Use PNG only.** If `output.png` is converted to a JPEG, resized or sent through a messenger that recompresses it, the secret is lost.
- **There is no passphrase.** Anyone who knows the trick can read the weak bits and see your secret. This method shows how the hiding works, but it does not protect anything.

## Troubleshooting

- **"command not found":** Terminal cannot find Steghide. Close and reopen Terminal and check the installation with `steghide --version`. If you still see the error, install again.
- **Steghide says the cover image is too small:** the secret is bigger than the cover can carry. Check the capacity with `steghide info`, then shorten the message, shrink the secret image or use a larger cover image.
- **Steghide does not accept your image:** it only works with JPEG, BMP, WAV and AU files. Convert a PNG to a JPEG first, for example with Export in Preview.
- **Nothing comes out when you extract:** the passphrase is wrong, or the image was changed after the data was hidden. Check that you are using the stego image itself, not a copy that was sent through a messenger or platform.
- **You can see the hidden data in the image:** use a busier cover photograph and a smaller secret.
- **Python reports an error about `PIL`:** Pillow is not installed. Type `pip3 install pillow` and try again.

## Exercise: hidden in plain sight

1. Choose a cover photograph of your own: a JPEG with plenty of detail, at least 1000 pixels wide. Keep the original.
2. Write a short message in a text file: a sentence or a few lines that belong with the picture, such as a caption, a confession, an instruction or a line from a text.
3. Hide the message in the photograph with Steghide. Put the cover image and the stego image side by side and compare them. Compare the file sizes as well. Can you tell which is which?
4. Hide a small image in a second cover image, with Method 1 or Method 2.
5. Test how fragile your images are. Send each stego image to yourself in a messenger, upload it to a platform, take a screenshot of it and save a copy in a different format. After each step, try to retrieve the hidden data. Note what survives and what does not.
6. Give a classmate one of the stego images and tell them the passphrase by a different route. Can they retrieve your secret?

**Optional challenge: a picture with a secret.** Make an image in which the hidden layer and the visible image speak to each other: the secret can contradict, comment on or complete what the picture shows. Decide how a viewer would find out that there is something to find, and how they would get it out. Present the picture together with the instructions.

</div>

<div class="lang-de" markdown="1">






</div>