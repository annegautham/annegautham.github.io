---
title: Optical Properties of Conductors
author: Gautham Anne
order: 4
pubDatetime: 2025-07-01T12:00:00Z
description: Optical Properties of Metals and Electromagnetic Wave Propagation
tags:
  - ssp
---

## Table of Contents

## Electromagnetic Waves

### Fundamental Concepts

Running current through a wire can produce magnetic field around the wire. One expects that the presence of magnetic field would produce current as well, but only a change in magnetic field can produce current. This led to a speculation that probably a change in electric field can produce magnetic field as well. After all, current is nothing but moving charges, and charge can produce electric field.

### Maxwell's Equations

James Clark Maxwell (1831-1879) postulated that light is a combination of time varying (oscillating) electric and magnetic fields, and the propagation of light arises from a constant induction of one into another.

He came up with these equations (in MKS units):

$$\nabla \cdot \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \quad \nabla \times \mathbf{H} = \mathbf{J} + \frac{\partial \mathbf{D}}{\partial t}$$

$$\nabla \cdot \mathbf{D} = \rho, \quad \nabla \cdot \mathbf{B} = 0$$

Where:

- E is the electric field (V/m)
- H is the magnetic field (A/m)
- J is the current density (A/m²)
- ρ is the charge density (C/m³)
- D is the electric displacement flux density (C/m²)
- B is the magnetic flux density (webers/m²)

These are defined as:
$$\mathbf{D} = \varepsilon \mathbf{E}, \quad \mathbf{B} = \mu \mathbf{H}$$

Note: ε is permittivity and μ is permeability of the medium

## Propagation of Plane Electromagnetic Waves in an Insulator

### Wave Equation Derivation

Now if we assume a time varying magnetic field along x direction that is oscillating with frequency ω and travels with velocity v along z direction. The equation of this wave is as usual:

$$B(z,t) = B_0 e^{-i(\omega t - kz)} = B_0 e^{i(kz-\omega t)}$$

We can find the electric field along y direction from the first equation:

$$i\mathbf{k}E(z,t) = -\frac{\partial B}{\partial t} = i\omega B_0 e^{i(kz-\omega t)}$$

But $B = \mu H$ so: $E = \frac{\omega B}{\mu k}$

Let us assume there is no current J as light is inside an insulator. The second equation shows:

$$-i\mathbf{k}H(z,t) = \frac{\partial D}{\partial t} = \frac{\partial \varepsilon E}{\partial t} = -i\frac{\mu\omega \varepsilon E}{k} \frac{\partial E}{\partial t}$$

Using $D = \mu H$ and $B = B_0 e^{i(kz-\omega t)}$:

$$-k^2 \frac{B}{\mu} = \frac{\varepsilon\mu\omega^2 B}{k} \rightarrow k^2 = \varepsilon\mu\omega^2 \rightarrow k = \sqrt{\varepsilon\mu}\omega$$

### Speed of Light in Materials

$$v = \frac{\omega}{k} = \frac{1}{\sqrt{\varepsilon\mu}}$$

The speed calculated from $v = 1/\sqrt{\varepsilon\mu}$ is the speed of light, and it has NO REFERENCE! For example in vacuum:

$$c_{vacuum} = \frac{1}{\sqrt{\varepsilon_0\mu_0}} = (8.85×10^{-12} × 1.25×10^{-6})^{-1/2} = 300658411 \text{ m/sec}$$

It is interesting that the speed of light is accurately calculated from parameters related to electrostatics and magnetism - with no references, as predicted by relativity.

For almost all insulators, μ is about the vacuum value or μ₀. However, the permittivity can be very different, and so the speed of light in an insulator with permittivity ε is:

$$c = \frac{1}{\sqrt{\varepsilon\mu_0}} = \frac{c_{vacuum}}{n}$$

Where $n = \sqrt{\frac{\varepsilon}{\varepsilon_0}}$ is called the optical refractive index of the material. And the speed of light n times lower in the material than vacuum. Note that in many books, and here from now on, "ε" is used as a unit-less permittivity normalized to ε₀.

## Electromagnetic Waves in Conductors

### Modified Wave Equation

One can solve the Maxwell equations for a more general case in conductive material. The differential equation for the electric field along x that is propagating in the z direction will be:

$$c^2 \frac{\partial^2 E}{\partial z^2} = \frac{\partial^2 E}{\partial t^2} + \frac{\sigma}{\varepsilon_0} \frac{\partial E}{\partial t}$$

Where σ is the material conductivity.

The electric field is as usual a traveling wave so: $E(z,t) = E_0 e^{i(kz-\omega t)}$

Inserting this into the differential equation gives us:

$$\frac{c^2\omega^2}{\varepsilon_0} = -\omega^2 + \frac{\sigma}{\varepsilon_0}i\omega$$

$$-c^2k^2 = -\omega^2 + \frac{\sigma}{\varepsilon_0}i\omega \rightarrow n^2 = \varepsilon + \frac{\sigma}{\varepsilon_0\omega}i$$

n is obviously a complex number now! Let us call it n\* with the real part n and the imaginary part κ (sometimes called k, but we do not want to mix it with our k):

$$n^* = n + iκ$$

### Complex Refractive Index

So we have:
$$(n + iκ)^2 = \varepsilon + \frac{\sigma}{\varepsilon_0\omega} \rightarrow n^2 + 2niκ - κ^2 = \varepsilon + \frac{\sigma}{\varepsilon_0\omega}i$$

$$(n^2 - κ^2) + i2nκ = \varepsilon + \frac{\sigma}{\varepsilon_0\omega}i \rightarrow \begin{cases} \varepsilon = n^2 - κ^2 \\ \sigma = 2nκ\varepsilon_0\omega \end{cases}$$

And the wave equation will be:

$$E(z,t) = E_0 e^{i(k^*z-\omega t)} = E_0 e^{i(\frac{n^*\omega}{c}z-\omega t)}$$

$$E(z,t) = E_0 e^{i\omega(\frac{n+iκ}{c}z-t)} = E_0 e^{i\omega(\frac{nz}{c}-t)} e^{-\frac{\omega κz}{c}}$$

### Attenuation in Conductors

The wave amplitude decreases exponentially as it propagates through the conductor:

- The real part (n) determines the phase velocity
- The imaginary part (κ) determines the attenuation

The electric field amplitude decays as $e^{-\frac{\omega κz}{c}}$, meaning electromagnetic waves are attenuated in conducting materials.

### Skin Depth

The characteristic penetration depth (skin depth) is:

$$\delta = \frac{c}{\omega κ}$$

This represents the distance over which the electric field amplitude falls to 1/e of its surface value. For good conductors, this depth is typically very small, explaining why metals are opaque and reflective.
