---
title: Electrical Conductors
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Electrical Conductors
tags:
  - materials
---

## Table of Contents

Classes: Solids, Liquids, Gasses (Most powerful switches), Plasma

Insulators, Semiconductors, Conductors

- Conductivities as a function of materials classes
- Famous case with Germanium - a little bit of impurities in the semiconductors can make hem very conductive
- Germanium diodes are very good radar receiver (radar development)

## Electrons in a Crystal

### Assumptions

1. Electrons in a crystal are not free
2. They experience electrostatic potential from lattice ions and other electroncs
3. The total potential is periodic, with the same periodicity oas the lattice
4. The solutions of the Schrodinger equation are the 'band structures' for solids

### Tight-Binding Approximation

Qualitatively, the potential around a nuclei is the electrostatic potential. Electrons of far apart atoms are primarily around a single atom and at specific energy levels.
However, atoms are very close in a solid (sub-nanometer range), and hence, their electrons are no longer local.

Thus, in solids, an electron wavefunction overlaps with many atoms. This feature significantly affects the resonanting (allowed) electron energy levels. When you couple multiple oscillators (coupled potential wells of atoms), mathematically enforces a splitting of these energy levels.

As the distance between the atoms reduces, the electron wavefunction ovverlaps with many atoms. As the interatomic distance decreases, the energy bands split. There exists a specific distance where solids are form (most semiconductors at 3 angstroms).

## Mathematical

diagram of potential of single atom, potential of 1d crystical, and simplification of potential at 0 interatomic distance, the potential is 0 instead of -infinity.

prof converts wavefunctino into exponential format... introduces free space differential equation that solution is a wavefunction form...

## The Bloch Theorem

Potential $U(x) = U(x+P)$ 2. Putting the above potential in the Schrodinger's Equation, yields

$\frac{\bar{h}^2}{2m} laplacianp * phi + [E-U(x,y,z)]phi = 0$, the only way to get a stable potential is the following equalities:
phi(x+P) = e^ikP phi (x)

phi(x) = e^ikx u(x); u(x+P) = u(x)
=> periodic potential yields periodic wavefunction... duh

3. Wavefunction contains two independent parts: a slow varying part (the phase) e^ikx, and a fast varying part u(x).
