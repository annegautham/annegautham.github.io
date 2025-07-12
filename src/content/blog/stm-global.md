---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: "Aangstrom: Seeing Atoms!"
featured: true
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: Global directory page for my STM project (scanning tunneling microscope).
---

**tl;dr**: Built a functional scanning tunneling microscope. Iterating upon it to make it more stable (thermal drift) and robust against noise sources. Developing curriculum revolving around instrument to teach younger students surface science adjacent topics. **Need help** in the following: curriculum development, electrical/computer engineering, software developmnet. Reach out if interested (4.543 billion years of experience required).

---

So, atoms exist. But, of course, seeing is believing (RIP Santa Claus), so I've decided to build an instrument that lets you image atoms. Specifically, this instrument is known as a <a href = "https://en.wikipedia.org/wiki/Scanning_tunneling_microscope" target = "_blank">Scanning Tunneling Microscope</a> (STM). It belongs to a group of techniques known as scanning probe microscopy, where a small probe is scanned across a surface, obtaining information to post-process and render images. STM is a technique that takes advantage of quantum electron tunneling from an atomically sharp tip onto a conductive sample. Using some fancy feedback control of piezos, we can actually resolve individual atoms.

Typical commercial microscopes that are used in research labs cost upwards of \$8,000 (for low end models), and ~\$50,000 (for higher end models). If I were to drop a couple grand for funsies, I'd become even more of a burden on my parents. Thus, the project requirements are as follows:

- Low-Cost (~\$300)
- Should be able resolve atomically flat conductive
  materials like HOPG, gold, silicon, specially prepared samples
- "Easy to use"

I came across Dan Berard's (very well documented) <a href="https://dberard.com/home-built-stm/">project</a> my senior year of high school, but I lacked the prereq knowledge to implement it then. This post documents my journey attempting to improve on Berard's design. I am gatekeeping some information (sorry) since it is still under development! Contact me if you want some more information!

Some of the following pages sound super formal for blog posts, which is a result of me copying and pasting from my EE327 (Electronic System Design II) final report. Working on make it more concise...

---

# Version 1

## [Design Overview + Constraints](/posts/stm-design-overview)

## [Engineering Standards](/posts/stm-engineering-standards)

## [Theory Of Operation](/posts/stm-theory-of-operation)

## Mechanical Design Pages

## Electrical Design Pages

### [Power Supply](/posts/stm-power-supply)

### [Tunneling Amplifier](/posts/stm-tunneling-amplifier)

### [Mainboard](/posts/stm-mainboard)

## Software Design Pages

### [Feedback Control](/posts/stm-feedback-control)

### [Firmware](/posts/stm-firmware)

---

![model](@assets/images/stm-7_11_2025_IMAGES/model.png)
