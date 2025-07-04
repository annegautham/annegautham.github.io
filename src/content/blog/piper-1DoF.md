---
author: Gautham Anne
pubDatetime: 2024-03-12T06:10:00Z
title: Piper, a 1-DoF Robot
featured: false
draft: false
tags:
  - random
  - robotics
description: A random 1-DoF robot idea that can traverse 2D landscape.
---

So, I was binging YouTube and stumbled across this video about <a href = "https://www.youtube.com/watch?v=0QXrFUlFbQk">sprag clutches</a>. You can think about them as one-way bearings - the shaft will freely rotate in one direction, but is coupled to the outer rim in the other.

I then found a couple designs of these clutches on Thingiverse and GrabCAD and went ahead and printed a couple (PLA). <a href = "https://www.thingiverse.com/thing:4655900/">This one</a> printed the best, but I decided to make my own to play around with the tolerances.

![thingiverse sprag clutch](@assets/images/piper-1DoF/sprag.png)

Basically, how these printed ones work is that in one direction, the geometry jams the inner 'tapered cylinders' in one direction only due to the angled arrangement of the 4 arms. Then sprung the idea of making a single DoF robot that can traverse a 2D landscape by a 'waddling' like motion. If a motor body is attached to one bearing, and the shaft to another, taking each bearing to be a wheel of sorts, then the robot can pivot across each wheel. The drawing below is a trajectory the robot can take.

![example traj](@assets/images/piper-1DoF/traj.png)

Here's a simple setup demonstrating the bot. I added some rubber bands for traction. As you can see, there is still a ton of work to be done for optimizing the wheel performance to reduce slippage.

<div style="display: flex; justify-content: space-between; gap: 20px;">
    <div style="flex: 1;">
      <video controls width="100%">
        <source src="/files/piper-1DoF/left-pivot.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div style="flex: 1;">
      <video controls width="100%">
        <source src="/files/piper-1DoF/right-pivot.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>

Maybe I'll get back to this someday! Schoolwork is cooking me right now 0_0.

Ok bye.
