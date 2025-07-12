---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: Vibration Isolation
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: STM Vibration Isolation
---

## Table of Contents

## Description

Effective vibration isolation is essential for achieving atomic-resolution imaging in scanning tunneling microscopy. While our scan head is constructed to be highly rigid, even sub-nanometer relative motion between the tip and sample—particularly in the vertical direction—can significantly degrade image quality. High-frequency environmental vibrations, such as those induced by building infrastructure, HVAC systems, or distant road traffic, must therefore be attenuated well below the tunneling sensitivity threshold.

## Isolation Architecture and Modal Objectives

To mitigate mechanical noise, we constructed a multi-layer vibration isolation system composed of passive mechanical filters, viscoelastic damping elements, and eddy-current dampers. The scan head assembly rests atop a three-layer stack of steel disks, each 5inches in diameter and 0.5inches thick. Between each steel plate lies a viton O-ring spacer, cut from chemically inert perfluoroelastomer material. The viton provides viscoelastic damping, dissipating mechanical energy as heat through internal friction.

This steel–viton stack sits on an aluminum support plate, which is suspended via three vertical steel extension springs. The springs, each approximately 60cm in length, are symmetrically arranged to center the mass and prevent rotational coupling. Assuming an effective spring stiffness $k$ and total suspended mass $m$, the natural frequency $f_0$ of the suspended stage is given by:

$$
f_0 = \frac{1}{2\pi} \sqrt{\frac{k}{m}}.
$$

Based on estimates of $m \approx 4$kg and $k \approx 6$N/m per spring, the system’s resonant frequency is predicted to be:

$$
f_{0,\text{vertical}} \approx \frac{1}{2\pi} \sqrt{\frac{3k}{m}} \approx 2\text{Hz},
$$

with even lower resonance for lateral (horizontal) motion. Frequencies above this cutoff are attenuated as the system acts as a mechanical high-pass filter.

Here is the vibration isolation system from a top down view:

![model](@assets/images/stm-7_11_2025_IMAGES/vibTop.jpg)

## Eddy-Current Damping Layer

To further suppress resonant amplification and reduce ring-down time, we introduced a non-contact eddy-current damping stage. This consists of three stacks of neodymium hard drive magnets fixed beneath the suspended aluminum plate. When the plate moves, time-varying magnetic flux induces circulating currents (eddy currents) in the conductive aluminum base. By Lenz’s law, the induced current loops generate magnetic fields that oppose the plate’s motion, exerting a viscous-like damping force:

$$
F_d \propto -v,
$$

where $v$ is the velocity of the plate relative to the magnetic field. We actually didn't have time to integrate damping by our project deadline, but plan to do so in the near future.

## Electrical Decoupling and Cabling Strategy

To minimize mechanical coupling between the suspended mass and fixed infrastructure, all electrical connections—including the piezo leads, tunneling amplifier output, and sample bias—are routed with ultra-flexible 40AWG wires. These wires have minimal restoring force and high compliance, reducing their ability to transmit external vibrations to the scan head.

![model](@assets/images/stm-7_11_2025_IMAGES/40awg.png)

## Material Selection and Construction Details

The aluminum baseplate was reclaimed from a salvaged soldering apparatus and chosen for its low mass and ease of machining. The entire steel–viton stack is mounted onto a medium-density fiberboard (MDF) sheet via countersunk bolts. MDF was selected due to its damping properties and machinability. Eye hooks were screwed into the MDF to attach S-hooks, which suspend the assembly from a stable overhead frame. This frame allows the entire suspended mass to float freely, isolating the STM from vibrations above $\sim2$Hz in the vertical direction and $\sim1$Hz laterally.

## Performance and Expected Bandwidth

Our piezoelectric unimorph actuator, with a manufacturer stated mechanical resonance of approximately 6.3~kHz, is well above the dominant environmental noise frequencies. Thus, the passive damping stack and suspension system form a vibration isolation scheme with at least three decades of separation between environmental noise ($<$ 10 Hz) and STM actuation bandwidth (kHz regime). Initial qualitative testing confirms that low-frequency disturbances—such as footsteps or door motion—have minimal impact on the tunneling current when the isolation system is engaged.
