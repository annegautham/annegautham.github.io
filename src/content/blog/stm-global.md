---
author: Gautham Anne
pubDatetime: 2025-06-23T10:19:26
title: "Aangstrom: Seeing Atoms!"
featured: true
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: Global directory page for my STM project (scanning tunneling microscope).
---

**tl;dr**: Built a functional scanning tunneling electron microscope. Iterating upon it to make it more robust against noise sources & less janky. May develop curriculum revolving around instrument to teach younger students surface science adjacent topics. **Need help** in the following: curriculum development, electrical/computer engineering, software developmnet. Reach out if interested (4.543 billion years of experience required).

---

So, atoms exist. But, of course, seeing is believing (RIP Santa Claus), so I've decided to build an instrument that lets you image atoms. Specifically, this instrument is known as a <a href = "https://en.wikipedia.org/wiki/Scanning_tunneling_microscope" target = "_blank">Scanning Tunneling Microscope</a> (STM). It belongs to a group of techniques known as scanning probe microscopy, where a small probe is scanned across a surface, obtaining information to post-process and render images. STM is a technique that takes advantage of quantum electron tunneling from an atomically sharp tip onto a conductive sample. Using some fancy feedback control of piezos, we can actually resolve individual atoms.

Typical commercial microscopes that are used in research labs cost upwards of \$8,000 (for low end models), and ~\$50,000 (for higher end models). If I were to drop a couple grand for funsies, I'd become even more of a burden on my parents. Thus, the project requirements are as follows:

- Low-Cost (~\$300)
- Should be able resolve atomically flat conductive
  materials like HOPG, gold, silicon, specially prepared samples
- "Easy to use"

I came across Dan Berard's (this guy is awesome) <a href="https://dberard.com/home-built-stm/">project</a> my junior year of high school, but I lacked the prereq knowledge to build it then. This directory documents my journey attempting to make my own microscope (started 08/2024). I am gatekeeping some information (sorry) since it is still under development! Longterm: I want to release it as a kit for high school students - which would supplement a curriculum, either in school or an educational camp. Contact me if you want some more information!

Some of the following pages sound super formal for blog posts, which is a result of me copying and pasting from my EE327 (Electronic System Design II) final report. Working on make it more concise...

---

# Version 1 - Aangstrom (Updated 06/23/2025)

<div style="display: flex; align-items: center; gap: 2rem;">

<div style="flex: 1;">

## Overview

### [Design Overview + Constraints](/posts/stm-design-overview)

### [Engineering Standards](/posts/stm-engineering-standards)

### [Theory Of Operation](/posts/stm-theory-of-operation)

## Mechanical Design Pages

### [Scan Head](/posts/stm-scan-head)

### [Vibration Isolation](/posts/stm-vibration-isolation)

## Electrical Design Pages

### [Power Supply](/posts/stm-power-supply)

### [Tunneling Amplifier](/posts/stm-tunneling-amplifier)

### [Mainboard](/posts/stm-mainboard)

## Software Design Pages

### [Feedback Control](/posts/stm-feedback-control)

### [Firmware](/posts/stm-firmware)

## Image Gallery - More coming soon!

### HOPG (Highly Oriented Pyrolytic Graphite)

Example HOPG lattice (const. current mode, after some post processing to remove drift - attempting to streamline with <a href = "https://gwyddion.net/" target = "_blank">Gwyddion</a>).
![HOPG Lattice](@assets/images/stm-7_11_2025_IMAGES/hopg_lattice.png)

### Gold Films

### Sputtered Platinum

### Graphene on SiO<sub>2</sub>/Copper

</div>

<div style="flex-shrink: 0;">
  <img src="/files/stm_IMAGES/model.png" alt="model" style="max-width: 700px;" />
</div>

</div>

![327 Poster](@assets/images/stm-7_11_2025_IMAGES/327_poster.png)

---

# Version 2 - uhhh... on it

I’ve uncovered a couple of design headaches in V1: the “5V” stepper motors actually run much more smoothly at around 9 V, and those delicate 40 AWG wires—along with my patience—keep breaking far too easily.

Also, there's an inherent coupling between ground and the scan head through the cable going to the outlet, so I'm thinking about transitioning to powering the system on a 20V Li-Ion drill battery (or LiFePO<sub>4</sub> pack). I'm a little dissapointed the work spent on designing a custom power supply may be all for naught, but am glad I learned a ton.

I also started work on a more modular design for the scan head, enabling future integration of various types of microscopy, such an AFM head. See Dan Berard's (the GOAT) <a href="https://hackaday.io/project/5713-frequency-modulated-atomic-force-microscope" target = "_blank">project</a> for more information.
