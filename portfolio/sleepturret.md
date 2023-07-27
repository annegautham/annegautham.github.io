---
layout: detailpage
title: Automatic Sleep Detection Water Turret
description: Jul 2022 — Present
---

As a late night coffee addict, I built a water turret that fires at me if it detects that I'm drowsy. This is a continuation of my <a href="https://annegautham.github.io/portfolio/laserturret">Facial Recognition Laser Turret</a>. It was also a project for my high school senior year ML course.

<br>

The device consists of the following:

* <strong>Arduino Uno</strong> to controll all the electronics
* <strong>12V Water Pump w/ Tubing</strong> to fire water through a nozzle! A 5V pump would actually be better as to not require a...
* <strong>5-12V Relay</strong> connected to outlet and water pump
* <strong>USB Camera</strong> for OpenCV Contouring to recalibrate and track face
* <strong>Water Bottle</strong> to carry the water for firing. I used an old caramel macchiato container
* <strong>2 Hobby Servos w/ Pan Tilt</strong> for moving the camera and firing nozzle

<br>

![](/assets/images/portfolio/sleepturretpantilt.png)
![](/assets/images/portfolio/sleepturretcameramount.png)
<div class="caption">Pan tilt mechanism and the camera mount</div>

<br>

![](/assets/images/portfolio/cruderelay.png)
![](/assets/images/portfolio/sleepturretworkingrelay.png)
![](/assets/images/portfolio/sleepturretoutletconnection.png)
<div class="caption">I soldered a 2 pin outlet connector to the relay (need to heatshrink it) and connected the other side to the water pump. The relay is controlled by an Arduino, allowing the device to control when to fire the water.</div>

<br>

![](/assets/images/portfolio/sleepturretcomputer.png)
<div class="caption">Program running on computer, but assembly not complete. The water pump fires through nozzle when an ML algorithm determines that the user is drowsy. A Python script sends data through a serial to the Arduino, which controls servos to keep the camera focused on the user.</div>

<br>

![](/assets/images/portfolio/sleepturretoverview.png)
<div class="caption">Final assembly of prototype 1! A second version will be more compact and hopefully self-contained. That is, I plan to integrate a Raspberry Pi for onboard processing instead of requiring it to be hooked up to a computer.</div>