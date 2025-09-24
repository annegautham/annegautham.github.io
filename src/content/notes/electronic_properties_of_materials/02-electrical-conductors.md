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

Solving Schrodinger equation for special case (no potential)

$hbar^2/2m * d^2phi/2x^2 + Epsi = 0$ => $hbar^2/2m * a_0(-ik)^2e^" + Ea_0 e^""$ yielding $0hbar^2/2m*k^2 + E = 0$,
Relation between mass and wavelength (specifically momentum and lambda) only because p = h/lambda = h*k/2pi = hbar * k

Thus p^2/2m = E - U (Kinetic Energy) -> known as the dispersion relation (between momentum and energy)

## Kronig-Penney Model

3 - Dchrodinger equations for 0<x<a and -b<x<0 are:
d^2psi/dx^2 + a^2 psix = 0, a = sqrt(2mE/hbar^2)

psi_a(x) = A_asin(alphax) + B_a cos(alphax) (and same for B but with beta instead of alpha)

Thus B_a = B_b since boundary condition at x=0 requires continuity. Second continuity exploits periodic, and derivatives must also be continuous (because current of electron flowing is related to derivative of its wavefunction) -> thus 4 continuity equations as well (continuity of wavefunction and its derivative, continuity of the phase shift and derivative)

And finally, we get a Kronig Penney Model
-(a^2 + Betaa^2)/2alphabeta \* sin(alpha a) sin(beta b) + cos alpha a cosbeta b = cos(k(a+b))

and really, since alpha and beta are only dependent on E, the right side dependent only on momentum, so equation is basically a dispersion.

Now using epsilon = E/U_0, and let alpha_0 sqrt(2mU_0/hbar^2), similar to a particle inside a well problem, and we have a generalized dispersion relationship (unitless).

Thus, the possible energy bands that are available electrons need to fit into equation so that the LHS needs to be between -1 and 1
