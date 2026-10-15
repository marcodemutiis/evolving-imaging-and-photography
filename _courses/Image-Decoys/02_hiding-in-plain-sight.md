---
layout: lesson
title: "Hiding in Plain Sight"
title_de: "Hiding in Plain Sight"
course_id: image-decoys
course_title: "Image Decoys"
course_title_de: "Image Decoys"
lesson_number: 3
published: true
---

<div class="lang-en" markdown="1">

This first cluster focuses on tactics that exploit the visibility and ubiquity of images to encode secret messages. These projects rely on images that are publicly accessible – from Google Street View scenes to viral pictures of Kim Kardashian, from the permanent collection of an art museum to a global company logo. Their open circulation is their greatest power in the economy of attention and the logics of branding and marketing, but at the same time their greatest weakness. Artists exploit this accessibility and virality to turn images into encrypted carriers of data through different technologies and operations that layer additional information within, or on top of, existing surfaces.

## Maddy Varner, [*Kardashian Krypt*](https://cargocollective.com/maddyv/KARDASHIAN-KRYPT), 2014
![Maddy Varner]({{ site.baseurl }}/courses/Image-Decoys/assets/img/varner2.jpg)
<figcaption>Maddy Varner, screenshot from Kardashian Krypt, 2014</figcaption>

In Kardashian Krypt (2014), creative technologist and data journalist Maddy Varner uses steganography to embed hidden text within appropriated photographs from Kim Kardashian’s social media. Steganography – from the Greek for "covered writing" – is the practice of concealing information within another file or medium so that the hidden content is undetectable to anyone not looking for it, distinguishing it from cryptography, which scrambles a message but leaves its presence visible. In digital images, this is commonly achieved by altering pixel values at a level imperceptible to the human eye – for instance, modifying the least significant bits of a pixel's colour data to encode text or files – so that the image appears visually unchanged while carrying an embedded payload readable only with the corresponding decoding key or software. By smuggling invisible content through the hyper-circulated image of a celebrity, Varner subversively engages with the culture of online surveillance, obsession, and overexposure – turning the attention economy against itself. Because of their ubiquity, images of celebrities become the perfect decoy to circulate undetected by human eyes – precisely because the eye has already learned to stop looking at them as anything other than spectacle. Only those who possess the corresponding decoding key can retrieve the hidden text, so the image continues to function as ordinary celebrity content for every other viewer, and for every algorithm, scanning it.

## Amy Suo Wu, [*Greetings from the Invisible Borderlands*](https://amysuowu.net/greetings-from-the-invisible-borderlands/), 2016
![Amy Suo Wu]({{ site.baseurl }}/courses/Image-Decoys/assets/img/suowu.jpeg)
<figcaption>Amy Suo Wu, from <em>Greetings from the Invisible Borderlands</em>, 2016</figcaption>

A similar tactic appears in artist Amy Suo Wu’s Greetings from the Invisible Borderlands (2016), where analogue printed postcards act as keys for content on the screen. When matched with images from specific coordinates on Google Street View, the postcards, placed on the computer monitor, reveal secret messages and transform an innocuous format of communication into an access point for encrypted knowledge. The work revives a centuries-old cryptographic technique known as the Cardan grille, in which a perforated sheet is laid over a larger, innocuous text: only the words or letters exposed through its cut-out holes form the concealed message, while the surrounding text serves as cover. Wu translates this pre-digital method of concealment into a hybrid analogue-digital system, in which the postcard becomes the grille and the Street View image becomes the cover text. Collapsing four centuries of steganographic practice, the project bridges paper correspondence with networked images. In both Wu’s and Varner’s approaches, legibility is conditional: what appears ubiquitous, mundane or decorative becomes critical only when activated through a precise system of decoding.

<iframe width="800" height="450" src="https://player.vimeo.com/video/201556654?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Tactics and Poetics of Invisibility"></iframe>

***

## Tutorial

[Steganography Tutorial](https://www.evolving.photography/tutorials/steganography/)


***

Other works in this cluster use augmented reality to overlay hidden or disruptive content onto visible, highly regulated spaces. These works exploit a basic mechanism of marker-based AR: an app is trained to recognize a specific image – its distinctive shapes, edges, and colour patterns – as a reference target: once the camera feed matches that pattern with sufficient confidence, the app calculates the target's position and orientation in real time and anchors a digital layer precisely on top of it. The more distinctive and consistently reproduced an image is, the more reliable a marker it makes. This means that the very qualities that make an image valuable for branding or institutional recognition (a painting's canonical status, a logo's consistency across applications) are exactly what make it exploitable as an anchor for unauthorized content.

## [MoMAR](https://momar.gallery/), 2018 –
![MoMAR]({{ site.baseurl }}/courses/Image-Decoys/assets/img/momar.webp)
<figcaption>one of the works from MoMA turned into an AR marker by a MoMAR artist</figcaption>

Since [2018](https://www.vice.com/en/article/moma-augmented-reality-exhibit-jackson-pollock-were-from-the-internet/), the MoMAR artist collective has staged a series of interventions within the New York Museum of Modern Art's Estée and Joseph Lauder Gallery by turning canonical artworks from the permanent collection into AR markers. Downloading a custom app developed by the artists, museum visitors are able to view digital artworks layered on top of the originals: Jackson Pollocks and other works from the museum's collection became sites of intervention and reappropriation. 

![MoMAR]({{ site.baseurl }}/courses/Image-Decoys/assets/img/momar.gif)
<figcaption>one of the works from MoMA turned into an AR marker by a MoMAR artist</figcaption>

In the 2019 edition of the show, titled Open to the Public, artist Erin Ko's La Barrera used the gallery's Pollocks as markers for an AR collage reflecting on distraction and the signal-to-noise ratio of contemporary attention, while the Japanese duo exonemo's Strokes triggered random painterly gestures to spill across the museum's walls each time the piece was activated – a mischievous echo of the abstract expressionist canvases they were anchored to. MoMAR operates as an unauthorized gallery, effectively transforming MoMA's curated space, governed by institutional gatekeeping, into an open, playful, discursive, and more democratic platform. 


Joseph Hocking and Mark Skwarek, [*The leak in your home town*](https://theleakinyourhometown.wordpress.com/), 2010
![Joseph Hocking and Mark Skwarek]({{ site.baseurl }}/courses/Image-Decoys/assets/img/hocking-skwarek.jpeg)
<figcaption>Joseph Hocking and Mark Skwarek, view of <em>The leak in your home town</em>, 2010</figcaption>


As early as 2010, artists Joseph Hocking and Mark Skwarek developed The Leak in Your Hometown, an AR app that projected visuals of the Deepwater Horizon oil spill whenever a smartphone camera detected a BP logo – turning the company's own corporate identity into a trigger for protest, repurposing the very ubiquity of its branding against it. Viewers who pointed their smartphone at any BP logo in the world would be confronted with broken pipes bursting out of the logo itself, oil plume billowing upward in a real-time reenactment of one of the most disastrous spills in U.S. history, staged directly onto the company's own trademark. Once again, the qualities that make an image an asset for branding and marketing – its consistency, recognisability, and wide distribution – become the vulnerability that the artists exploit: the same features that let a logo function as a marketing tool let it function as an AR marker for critical reappropriation. Both MoMAR and the project by Hocking and Skwarek demonstrate how even the most familiar or institutional images can be hijacked to reveal hidden realities, turning augmented visibility into a tactic of resistance.

***

## Tutorial

[AR Marker Image Tutorial](https://www.evolving.photography/tutorials/AR-marker-image/)


***

While some of these projects rely on the algorithmic properties of networked images – encoding data in an image file that circulates across global networks, or using photographic maps that can be summoned by inputting specific GPS coordinates on a browser – others add layers to static physical images through the computational properties of AR image tracking. Despite this technical divergence, what unites these projects is not a shared technology but a shared understanding of visibility and access as sites of tactical intervention, exploited through the codes and algorithms that govern how images are read, tracked, and circulated. All of the projects in this cluster use publicly accessible images as covert communication channels, leveraging visibility itself as a form of camouflage. They demonstrate how even the most familiar, institutional, or mundane images can be hijacked to carry alternate meanings – activating what might otherwise go unnoticed. These images hide in plain sight not by retreating from view, but by embedding critique beneath, or on top of, the surface of representation. In doing so, they function as image decoys: slipping past human and machine detection to deliver subversive counter-narratives from within the dominant visual order.



## Assignment

Create your own *Hiding in Plain Sight* image project inspired by the examples seen in class. Use either steganography or AR marker images to smuggles information through images. 
Upload your name, a description of your project and some iages to the [share document](https://docs.google.com/document/d/16iRfE4wmEdfgtDQ03-WwIJDvqvegzwPMfz8YotXb-Zk/edit?tab=t.0)

</div>

<div class="lang-de" markdown="1">

Dieser erste Cluster konzentriert sich auf Taktiken, die die Sichtbarkeit und Allgegenwart von Bildern nutzen, um geheime Botschaften zu verschlüsseln. Die Projekte stützen sich auf öffentlich zugängliche Bilder – von Google-Street-View-Szenen bis zu viralen Fotos von Kim Kardashian, von der Dauerausstellung eines Kunstmuseums bis zum Logo eines global agierenden Unternehmens. Ihre offene Zirkulation ist in der Ökonomie der Aufmerksamkeit und in den Logiken von Branding und Marketing ihre größte Stärke, zugleich aber auch ihre größte Schwäche. Künstler:innen nutzen diese Zugänglichkeit und Viralität, um Bilder in verschlüsselte Datenträger zu verwandeln – mithilfe unterschiedlicher Technologien und Verfahren, die zusätzliche Informationen in oder auf bestehenden Oberflächen ablegen.

## Maddy Varner, [*Kardashian Krypt*](https://cargocollective.com/maddyv/KARDASHIAN-KRYPT), 2014
![Maddy Varner]({{ site.baseurl }}/courses/Image-Decoys/assets/img/varner2.jpg)
<figcaption>Maddy Varner, screenshot from Kardashian Krypt, 2014</figcaption>

In Kardashian Krypt (2014) setzt die Creative Technologist und Datenjournalistin Maddy Varner Steganografie ein, um versteckten Text in angeeigneten Fotografien aus Kim Kardashians Social-Media-Auftritten einzubetten. Steganografie – aus dem Griechischen für „verdecktes Schreiben“ – bezeichnet die Praxis, Informationen so in einer anderen Datei oder einem anderen Medium zu verbergen, dass der versteckte Inhalt für alle, die nicht gezielt danach suchen, nicht erkennbar ist. Das unterscheidet sie von der Kryptografie, die eine Nachricht zwar verschlüsselt, ihre Existenz aber sichtbar lässt. Bei digitalen Bildern gelingt dies üblicherweise, indem Pixelwerte in einem für das menschliche Auge nicht wahrnehmbaren Maß verändert werden – etwa durch die Modifikation der niederwertigsten Bits der Farbdaten eines Pixels, um Text oder Dateien zu codieren. Das Bild erscheint visuell unverändert, trägt aber eine eingebettete Nutzlast, die sich nur mit dem passenden Schlüssel oder der entsprechenden Software auslesen lässt. Indem Varner unsichtbare Inhalte durch das hyperzirkulierende Bild eines Celebrities schleust, setzt sie sich auf subversive Weise mit der Kultur der Online-Überwachung, der Obsession und der Überbelichtung auseinander – und wendet die Aufmerksamkeitsökonomie gegen sich selbst. Aufgrund ihrer Allgegenwart werden Bilder von Prominenten zum perfekten Köder (*Decoy*), um unbemerkt vor menschlichen Augen zu zirkulieren – gerade weil das Auge bereits gelernt hat, sie nur noch als Spektakel wahrzunehmen. Nur wer den passenden Schlüssel besitzt, kann den versteckten Text abrufen. Für alle anderen Betrachter:innen und für jeden Algorithmus, der es scannt, funktioniert das Bild weiterhin als gewöhnlicher Celebrity-Content.

## Amy Suo Wu, [*Greetings from the Invisible Borderlands*](https://amysuowu.net/greetings-from-the-invisible-borderlands/), 2016
![Amy Suo Wu]({{ site.baseurl }}/courses/Image-Decoys/assets/img/suowu.jpeg)
<figcaption>Amy Suo Wu, from <em>Greetings from the Invisible Borderlands</em>, 2016</figcaption>

Eine ähnliche Taktik findet sich in Amy Suo Wus Greetings from the Invisible Borderlands (2016), wo analog gedruckte Postkarten als Schlüssel für Inhalte auf dem Bildschirm dienen. Werden sie auf den Computermonitor gelegt und mit Bildern von bestimmten Koordinaten in Google Street View abgeglichen, enthüllen die Postkarten geheime Botschaften und verwandeln ein harmloses Kommunikationsformat in einen Zugangspunkt zu verschlüsseltem Wissen. Die Arbeit belebt eine jahrhundertealte kryptografische Technik wieder, die als Cardan-Schablone (*Cardan grille*) bekannt ist: Ein perforiertes Blatt wird über einen größeren, unverfänglichen Text gelegt, und nur die durch die ausgeschnittenen Öffnungen sichtbaren Wörter oder Buchstaben bilden die verborgene Nachricht, während der umgebende Text als Tarnung dient. Wu überträgt diese vordigitale Methode der Verschleierung in ein hybrides analog-digitales System, in dem die Postkarte zur Schablone und das Street-View-Bild zum Tarntext wird. Indem das Projekt vier Jahrhunderte steganografischer Praxis zusammenzieht, verbindet es Briefkorrespondenz mit vernetzten Bildern. Sowohl bei Wu als auch bei Varner ist Lesbarkeit an Bedingungen geknüpft: Was allgegenwärtig, banal oder dekorativ erscheint, wird erst kritisch, wenn es durch ein präzises System der Entschlüsselung aktiviert wird.

<iframe width="800" height="450" src="https://player.vimeo.com/video/201556654?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Tactics and Poetics of Invisibility"></iframe>

***

## Tutorial

[Steganografie-Tutorial](https://www.evolving.photography/tutorials/steganography/)


***

Andere Arbeiten dieses Clusters nutzen Augmented Reality, um verborgene oder störende Inhalte über sichtbare, stark regulierte Räume zu legen. Sie machen sich einen grundlegenden Mechanismus des markerbasierten AR zunutze: Eine App wird darauf trainiert, ein bestimmtes Bild – seine charakteristischen Formen, Kanten und Farbmuster – als Referenzziel zu erkennen. Sobald der Kamerastrom dieses Muster mit ausreichender Sicherheit wiedererkennt, berechnet die App Position und Ausrichtung des Ziels in Echtzeit und verankert eine digitale Ebene exakt darauf. Je markanter und je einheitlicher reproduziert ein Bild ist, desto verlässlicher funktioniert es als Marker. Das bedeutet, dass genau jene Eigenschaften, die ein Bild für Branding oder institutionelle Wiedererkennung wertvoll machen (der kanonische Status eines Gemäldes, die Konsistenz eines Logos über verschiedene Anwendungen hinweg), es zugleich als Anker für nicht autorisierte Inhalte ausnutzbar machen.

## [MoMAR](https://momar.gallery/), 2018 –
![MoMAR]({{ site.baseurl }}/courses/Image-Decoys/assets/img/momar.webp)
<figcaption>one of the works from MoMA turned into an AR marker by a MoMAR artist</figcaption>

Seit [2018](https://www.vice.com/en/article/moma-augmented-reality-exhibit-jackson-pollock-were-from-the-internet/) inszeniert das Künstler:innenkollektiv MoMAR eine Reihe von Interventionen in der Estée and Joseph Lauder Gallery des New Yorker Museum of Modern Art, indem es kanonische Werke der Dauerausstellung in AR-Marker verwandelt. Mit einer von den Künstler:innen entwickelten App können Museumsbesucher:innen digitale Kunstwerke betrachten, die über die Originale gelegt sind: Jackson Pollocks und andere Werke aus der Sammlung des Museums wurden so zu Orten der Intervention und Wiederaneignung.

![MoMAR]({{ site.baseurl }}/courses/Image-Decoys/assets/img/momar.gif)
<figcaption>one of the works from MoMA turned into an AR marker by a MoMAR artist</figcaption>

In der Ausgabe von 2019 mit dem Titel Open to the Public nutzte Erin Ko in La Barrera die Pollocks der Galerie als Marker für eine AR-Collage, die über Ablenkung und das Signal-Rausch-Verhältnis zeitgenössischer Aufmerksamkeit reflektiert. Das japanische Duo exonemo ließ in Strokes bei jeder Aktivierung der Arbeit zufällige malerische Gesten über die Wände des Museums fließen – ein schelmisches Echo der abstrakt-expressionistischen Gemälde, auf denen sie verankert waren. MoMAR funktioniert als nicht autorisierte Galerie und verwandelt den kuratierten, von institutioneller Zugangskontrolle bestimmten Raum des MoMA in eine offene, spielerische, diskursive und demokratischere Plattform.


Joseph Hocking und Mark Skwarek, [*The leak in your home town*](https://theleakinyourhometown.wordpress.com/), 2010
![Joseph Hocking and Mark Skwarek]({{ site.baseurl }}/courses/Image-Decoys/assets/img/hocking-skwarek.jpeg)
<figcaption>Joseph Hocking and Mark Skwarek, view of <em>The leak in your home town</em>, 2010</figcaption>


Bereits 2010 entwickelten die Künstler Joseph Hocking und Mark Skwarek The Leak in Your Hometown, eine AR-App, die Bilder der Ölkatastrophe der Deepwater Horizon einblendete, sobald eine Smartphone-Kamera ein BP-Logo erkannte. Die Corporate Identity des Unternehmens wurde so zum Auslöser für Protest, und die Allgegenwart seines Brandings wandte sich gegen es selbst. Wer sein Smartphone auf ein beliebiges BP-Logo irgendwo auf der Welt richtete, sah geborstene Rohre aus dem Logo selbst hervorbrechen und eine Ölfahne nach oben quellen – eine Echtzeit-Nachstellung einer der verheerendsten Ölkatastrophen der US-Geschichte, direkt auf das Markenzeichen des Konzerns inszeniert. Einmal mehr werden die Eigenschaften, die ein Bild zum Gewinn für Branding und Marketing machen – seine Konsistenz, Wiedererkennbarkeit und weite Verbreitung –, zur Schwachstelle, die die Künstler ausnutzen: Dieselben Merkmale, die ein Logo als Marketinginstrument funktionieren lassen, lassen es auch als AR-Marker für kritische Wiederaneignung funktionieren. MoMAR und das Projekt von Hocking und Skwarek zeigen gleichermaßen, wie selbst die vertrautesten oder institutionellsten Bilder gekapert werden können, um verborgene Realitäten offenzulegen – und machen augmentierte Sichtbarkeit zu einer Taktik des Widerstands.

***

## Tutorial

[AR-Marker-Bild-Tutorial](https://www.evolving.photography/tutorials/AR-marker-image/)


***

Während sich einige dieser Projekte auf die algorithmischen Eigenschaften vernetzter Bilder stützen – etwa indem sie Daten in einer Bilddatei codieren, die über globale Netzwerke zirkuliert, oder fotografische Karten nutzen, die sich durch die Eingabe bestimmter GPS-Koordinaten im Browser aufrufen lassen –, fügen andere statischen physischen Bildern durch die Rechenlogik des AR-Image-Trackings zusätzliche Ebenen hinzu. Trotz dieser technischen Divergenz verbindet die Projekte nicht eine gemeinsame Technologie, sondern ein gemeinsames Verständnis von Sichtbarkeit und Zugang als Orten taktischer Intervention, die durch jene Codes und Algorithmen ausgenutzt werden, die bestimmen, wie Bilder gelesen, getrackt und verbreitet werden. Alle Projekte dieses Clusters verwenden öffentlich zugängliche Bilder als verdeckte Kommunikationskanäle und setzen Sichtbarkeit selbst als Form der Tarnung ein. Sie zeigen, wie selbst die vertrautesten, institutionellsten oder banalsten Bilder gekapert werden können, um alternative Bedeutungen zu tragen – und aktivieren damit, was sonst unbemerkt bliebe. Diese Bilder verstecken sich im Offensichtlichen (*hide in plain sight*), nicht indem sie sich dem Blick entziehen, sondern indem sie Kritik unter oder auf der Oberfläche der Repräsentation einbetten. So fungieren sie als Image Decoys: Sie schlüpfen an menschlicher wie maschineller Erkennung vorbei, um subversive Gegenerzählungen aus dem Inneren der dominanten visuellen Ordnung auszuliefern.



## Assignment

Entwickelt euer eigenes *Hiding in Plain Sight*-Bildprojekt, inspiriert von den im Kurs gezeigten Beispielen. Nutzt entweder Steganografie oder AR-Marker-Bilder, um Informationen durch Bilder zu schmuggeln.
Ladet euren Namen, eine Beschreibung eures Projekts und einige Bilder in das [Share-Dokument](https://docs.google.com/document/d/16iRfE4wmEdfgtDQ03-WwIJDvqvegzwPMfz8YotXb-Zk/edit?tab=t.0) hoch.

</div>