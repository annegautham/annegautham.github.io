---
layout: detailpage
title: Voice Activated Neopixel Strips
description: Oct 2023
---

My college dorm room was looking a bit boring, apart from these posters my roomate and I put up:
<br>

![](/assets/images/portfolio/sneezyVader.jpg)
![](/assets/images/portfolio/spaceChimp.jpg)
![](/assets/images/portfolio/guinness.jpg)

<br>
So, I decided to spice it up through a voice activated RGB Neopixel setup! I found enough in the Mechatronics Lab to span about 1/2 the room's perimeter!
<br>
First, I programmed a Raspberry Pi Pico to adjust the brightness and color of the strip. I've preprogrammed the colors of red, orange, yellow, green, blue, violet, indigo, white, and black (off). The brightness is controlled by a potentiometer and the color is toggled through a push-button.
<br>

![](/assets/images/portfolio/rgbLightsprototype.jpg)

<br>
Here's how the different settings look so far:
<br>

![](/assets/images/portfolio/whiteLight.png)
![](/assets/images/portfolio/redLight.png)
![](/assets/images/portfolio/orangeLight.png)
![](/assets/images/portfolio/greenLight.png)
![](/assets/images/portfolio/blueLight.png)
![](/assets/images/portfolio/purpleLight.png)
![](/assets/images/portfolio/pinkLight.png)

<br>
There's a bit of skewing towards red in color combinations that require it, due to red needing the lowest energy (hence, the yellowish hue in the white light image). I'm currently integrating the Wake Word voice recognition algorithm with an Adafruit Electret Microphone Amplifier onto the pico. I'll keep y'all updated on the progress.

