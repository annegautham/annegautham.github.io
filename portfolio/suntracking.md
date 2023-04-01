---
layout: detailpage
title: Sun-Tracking Solar Panel
description: May 2018
---

For my final project in my high school AP Environmental Science class, I developed a fully-functional small-scale model of a sun-tracking solar panel. I designed and 3D printed the gearing and rotating platforms to give the panel 2 degrees of rotational freedom, and powered them with an Arduino.

<br>

![](/assets/images/portfolio/solar.jpg)
<div class="caption">Isometric CAD rendering of the design.</div>

<br>

![](/assets/images/portfolio/solar_side.jpg)
<div class="caption">Side-view CAD rendering of the design.</div>

<br>

![](/assets/images/portfolio/solar_top.jpg)
<div class="caption">Top-view CAD rendering of the design.</div>

<br>

I then wrote an OpenCV app in Java that communicated with the Arduino over the Serial interface, sending desired angle commands that were calculated based on a stream running to determine the relative position of the sun using a webcam fixed to the upper platform (shown in red on the CAD).


![](/assets/images/portfolio/solar_block.png)
<div class="caption">High-level block diagram of the system.</div>

<br>


![](/assets/images/portfolio/solar_real.png)
<div class="caption">The constructed system.</div>

<br>