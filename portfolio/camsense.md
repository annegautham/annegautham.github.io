---
layout: detailpage
title: CamSense, An Emotion Based Camera
description: Nov - Jan 2023
---
For my final project in high school Engineering, I developed CamSense, somewhat inspired from the GoogleGlass, that takes pictures based on your response to external stimuli! You can find some scripts I wrote <a href="https://github.com/annegautham/CamSense">here</a>. Note that it's not completely updated! 

<br>

The 'emotion' sensing capability was measured through a pulse sensor. Obviously, heart rate cannot adequately describe the complex composition of human emotion, but I'm integrating my EEG project with the goggles.

<br>

<iframe height="600px" width="100%" src="/assets/documents/portfolio/engProposal.pdf"></iframe>
<div class="caption">Here was my class proposal presentation (indeed quite wacky).</div>

<br>

The glove enables the user to select

* <strong>Manual Mode</strong>, in which the user can take pictures by pressing a button.
* <strong>Autonomous Mode</strong>, in which pictures are taken and transmitted to the cloud once the emotion sensing 'threshold' is surpassed.

<br>

Note that the current prototype cannot accurately distinguish between emotion states. It only distinguishes between an 'active' state and a 'rest' state. For example, jogging or encountering Pennywise the Dancing Clown would have similar registrations. 

<br>


![](/assets/images/portfolio/gloveangle1.jpg)
![](/assets/images/portfolio/gloveangle2.jpg)
<div class="caption">The accompanying glove that transmits heart rate (from pulse sensor) along with switch state to determinte mode. The palm (not shown) has a button, that upon pressing in manual mode, takes pictures.</div>

<br>

![](/assets/images/portfolio/brainstormingelectronics.jpg)
<div class="caption">Electronics associated with the project are shown. I used a radio transmitter and receiver so that the camera (Esp32 Cam) can receive signals regarding heart rate and switch state from glove without requiring a wired connection. I initially used a bluetooth module, but after some trial and error, figured out that it had less range, especially given the frequency range of the radio.</div>

<br>

![](/assets/images/portfolio/radiotest.jpg)
<div class="caption">Successful radio test!</div>

<br>

![](/assets/images/portfolio/gloveinprogress.jpg)
<div class="caption">Glove in progress...</div>

<br>

![](/assets/images/portfolio/goggles.jpg)
<div class="caption">Goggles with Esp32 Cam + Radio Receiver w/ antenna. A bit messy!</div>

<br>

![](/assets/images/portfolio/completegoggles.jpg)
<div class="caption">Completed 1st prototype! Updates coming soon...</div>