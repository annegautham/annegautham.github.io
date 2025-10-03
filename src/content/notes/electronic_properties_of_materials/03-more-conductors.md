---
title: More on Conductors
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Classical theory of conduction, current density, and electron scattering mechanisms in metals
tags:
  - ssp
  - conductors
  - current-density
  - electron-scattering
---

## Table of Contents

## Current Density (Classical Perspective)

### Drift Velocity and Current

When electrons drift in a conductor under an applied electric field $E_x$, they acquire an average drift velocity $v_{dx}$ in the x-direction. The resulting **current density** is:

$$J_x = \frac{\Delta Q}{A\Delta t} = \frac{qNAv_{dx}\Delta t}{A\Delta t} = qNv_{dx}$$

where:

- $q$ = electron charge (magnitude)
- $N$ = number density of free electrons
- $v_{dx}$ = drift velocity in x-direction

This assumes constant effective mass $m^*$ due to non-relativistic conditions.

### Free Electron Model

In the classical free electron model, kinetic energy increases quadratically with momentum:

$$E = \frac{p^2}{2m} = \frac{\hbar^2 k^2}{2m}$$

Theoretically extending to infinity, though quantum effects modify this at high energies.

## Thermal Effects and Scattering

### Thermal Motion

Even without an external electric field, electrons possess significant **thermal energy**:

$$E_{\text{thermal}} \sim k_B T$$

At room temperature ($T \approx 300$ K):
$$k_B T \approx 26 \text{ meV} \approx 4.2 \times 10^{-21} \text{ J}$$

This corresponds to thermal velocities via:
$$\frac{1}{2}mv_{\text{thermal}}^2 \sim k_B T$$

### Random vs. Drift Motion

- **Random thermal motion**: $v_{\text{thermal}} \sim 10^6$ m/s
- **Drift velocity**: $v_{\text{drift}} \sim 10^{-2}$ m/s (cm/s order)

The drift represents a tiny bias superimposed on much larger random thermal motion.

## Classical Conduction Theory

### Equation of Motion with Scattering

The classical equation of motion for electrons includes a **friction term** representing scattering:

$$m\frac{dv}{dt} + \frac{mv}{\tau} = qE$$

where $\tau$ is the **relaxation time** (average time between scattering events).

### Steady-State Solution

At steady state ($dv/dt = 0$), the terminal drift velocity is:

$$v_d = \frac{q\tau E}{m} = \mu E$$

where $\mu = \frac{q\tau}{m}$ is the **mobility**.

### Time-Dependent Solution

For time-dependent fields, the complete solution is:

$$v(t) = v_d\left[1 - e^{-t/\tau}\right]$$

The system reaches $\sim 63\%$ of terminal velocity after time $\tau$.

### Conductivity

Using Ohm's law $\mathbf{J} = \sigma \mathbf{E}$:

$$\sigma = \frac{nq^2\tau}{m}$$

where $n$ is the electron density.

## Scattering Mechanisms

### Energy-Dependent Scattering

Higher energy electrons have **increased scattering probability** due to:

- Enhanced interaction cross-sections
- Access to more scattering channels
- Stronger coupling to lattice vibrations (phonons)

### Sources of Scattering

1. **Phonon scattering**: Interaction with lattice vibrations
2. **Impurity scattering**: Defects and foreign atoms
3. **Grain boundary scattering**: Polycrystalline interfaces
4. **Surface scattering**: Important in thin films

The classical model provides the foundation, though quantum mechanical treatments are needed for complete understanding of transport in metals.

## Metal Electrons under External Field

$$\Delta k = \tau * \frac{E(-q)}{\bar{h}}$$

J = qN_fv_f (N_f is the current density of all the electrons near fermi level (unbalanced electrons))...

### Density of State

- There was an implicit definiton of infinities (infinitely large crystal / single frequency of momentum vector yielding an infinitely large density of states)
- normalized density of states (g(E)) by energy/volume is a constnant (can be proved...)
- conductivity is j/E = q^2(g(E_f))v_f^2\*\tau
