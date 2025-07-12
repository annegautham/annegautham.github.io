---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: Scan Head
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: STM Scan Head
---

## Table of Contents

## Description

![model](@assets/images/stm-7_11_2025_IMAGES/scanHead.png)

The scan head is the heart of the STM, designed for maximum rigidity, thermal stability, and kinematic symmetry to ensure nanometer-scale positioning with minimal drift and vibration sensitivity. Our scan head features a compact circular architecture, machined from steel to exploit its high stiffness. Fabrication was performed in the Ford Prototyping Lab using a combination of manual turning, CNC milling, and vertical milling. This hybrid manufacturing approach enabled us to achieve dimensional tolerances within $\pm5$ thou, ensuring coaxial alignment between the piezo actuator, tip, and sample. Here is a model and the actual implementation of the scan head:

![model](@assets/images/stm-7_11_2025_IMAGES/fullscanhead.png)

## Mechanical Grounding and Amplifier Isolation

Although steel is not an electrical insulator, it was chosen for its mechanical stability. To prevent unwanted leakage currents or ground loops—which could corrupt femtoampere-level tunneling signals—we isolated the tunneling preamplifier from the scan head using a 3D-printed dielectric mount. The amplifier’s ground plane is tied to a separate analog reference potential, and all high-impedance inputs are shielded with a driven guard strategy. By physically decoupling mechanical and electrical ground domains, we reduce susceptibility to EMI and leakage-induced drift.

## Fine Positioning via Quadrant Piezo Unimorph

Sub-nanometer precision in the lateral $(x, y)$ and vertical $(z)$ directions is provided by a piezoelectric unimorph disk actuator segmented into four independent quadrants. The disk, fabricated from lead zirconate titanate (PZT), bends in response to an applied electric field via the inverse piezoelectric effect. We actually decided to use the common guitar pickups, since their relatively high resonance peak (6.3 kHz) allowed us to operate in 'rigid' regimes. Let $d_{31}$ be the transverse piezoelectric strain coefficient. Then the radius of curvature $R$ of the bending disk is related to the applied voltage $V$ as:

$$
\frac{1}{R} \propto \frac{d_{31} \cdot V}{t},
$$

where $t$ is the thickness of the piezo layer. Displacement $\Delta z$ at the center is approximately:

$$
\Delta z \approx \frac{a^2}{2R} \propto \frac{a^2 d_{31} V}{2t},
$$

where $a$ is the disk radius. With quadrant voltages $V_{1}$ to $V_{4}$, the differential bending between quadrants induces motion in the $x$, $y$, and $z$ directions according to:

$$
\begin{aligned}
x &\propto V_1 - V_2, \\
y &\propto V_3 - V_4, \\
z &\propto V_1 + V_2 + V_3 + V_4.
\end{aligned}
$$

To extend vertical displacement and reduce parasitic capacitance near the tunneling junction, a ceramic standoff was super glue to the disk center. This standoff:

- Amplifies horizontal motion mechanically via leverage,
- Electrically isolates the tip from piezo electrodes,
- Minimizes thermal drift due to similar thermal expansion coefficient to the piezo material.

The STM tip is mounted at the free end of this standoff, ensuring that all mechanical and electrical motion originates from a single, rigid reference point within the scanner assembly.

## Symmetry and Modal Considerations

The radial symmetry of both coarse and fine positioning subsystems ensures minimal coupling between orthogonal motion directions. The compact circular geometry also minimizes mechanical moment arms and higher-order vibration modes, improving rejection of external disturbances.

_Example of cut piezo (left), and mounted sample (right)_
![model](@assets/images/stm-7_11_2025_IMAGES/piezo_sample.png)
