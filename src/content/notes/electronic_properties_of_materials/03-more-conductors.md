---
title: More on Conductors
author: Gautham Anne
order: 3
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

### Drift Velocity and Current Relationship

When electrons drift in a conductor under an applied electric field $\mathbf{E}$, they acquire an average drift velocity $\mathbf{v}_d$. The fundamental relationship for current density is:

$$\mathbf{J} = n(-e)\mathbf{v}_d = ne\mathbf{v}_d$$

where:

- $n$ = number density of free electrons (electrons/m³)
- $e$ = elementary charge magnitude ($1.602 \times 10^{-19}$ C)
- $\mathbf{v}_d$ = drift velocity vector

#### Derivation from First Principles

Consider charge flow through a cross-sectional area $A$ in time $\Delta t$:

$$\text{Charge flux} = \frac{\Delta Q}{A \Delta t} = \frac{n \cdot A \cdot v_d \Delta t \cdot e}{A \Delta t} = nev_d$$

Therefore: $J = nev_d$

### Free Electron Model

In the classical free electron model, the energy-momentum relationship is parabolic:

$$E(\mathbf{k}) = \frac{\hbar^2|\mathbf{k}|^2}{2m^*}$$

where $m^*$ is the effective mass accounting for:

- Band structure effects
- Periodic potential of the crystal lattice
- Many-body interactions

The velocity of electrons is given by:
$$\mathbf{v} = \frac{1}{\hbar}\nabla_{\mathbf{k}}E(\mathbf{k}) = \frac{\hbar\mathbf{k}}{m^*}$$

## Thermal Effects and Electron Motion

### Thermal Energy Distribution

Even without external fields, electrons possess significant thermal kinetic energy:

$$\langle E_{\text{thermal}} \rangle = \frac{3}{2}k_B T$$

At room temperature ($T = 300$ K):
$$k_B T = 25.9 \text{ meV} = 4.14 \times 10^{-21} \text{ J}$$

The thermal velocity can be estimated from equipartition:
$$\frac{1}{2}m^*v_{\text{th}}^2 = \frac{3}{2}k_B T \quad \Rightarrow \quad v_{\text{th}} = \sqrt{\frac{3k_B T}{m^*}}$$

For electrons in copper: $v_{\text{th}} \approx 1.2 \times 10^6$ m/s

### Velocity Scales: Thermal vs. Drift

The contrast between thermal and drift motion is dramatic:

| Motion Type    | Typical Velocity                    | Physical Origin        |
| -------------- | ----------------------------------- | ---------------------- |
| Thermal motion | $v_{\text{th}} \sim 10^6$ m/s       | Random thermal energy  |
| Drift motion   | $v_d \sim 10^{-4}$ to $10^{-2}$ m/s | Applied electric field |

This means:
$$\frac{v_d}{v_{\text{th}}} \sim 10^{-8} \text{ to } 10^{-6}$$

The drift represents an infinitesimal bias on chaotic thermal motion.

## Drude Model of Electrical Conduction

### Equation of Motion with Scattering

The Drude model treats conduction electrons as classical particles subject to:

$$m^*\frac{d\mathbf{v}}{dt} + \frac{m^*\mathbf{v}}{\tau} = -e\mathbf{E}$$

This Newton's equation includes:

- Acceleration term: $m^*\frac{d\mathbf{v}}{dt}$
- Friction term: $\frac{m^*\mathbf{v}}{\tau}$ (phenomenological scattering)
- Driving force: $-e\mathbf{E}$ (electric field)

where $\tau$ is the relaxation time (mean time between scattering events).

### Steady-State Solution

At equilibrium ($\frac{d\mathbf{v}}{dt} = 0$), the drift velocity becomes:

$$\mathbf{v}_d = -\frac{e\tau}{m^*}\mathbf{E} = \mu_e\mathbf{E}$$

The electron mobility is:
$$\mu_e = \frac{e\tau}{m^*} \quad \text{(m²/V·s)}$$

### Transient Response

For time-dependent fields, the complete solution is:

$$\mathbf{v}(t) = \mathbf{v}_d\left[1 - e^{-t/\tau}\right] + \mathbf{v}_0 e^{-t/\tau}$$

Key time scales:

- Response time: $\tau \sim 10^{-14}$ s (femtoseconds)
- Reaches steady state in $\sim 3\tau$

### Drude Conductivity Formula

Combining with current density $\mathbf{J} = ne\mathbf{v}_d$:

$$\mathbf{J} = ne\mu_e\mathbf{E} = \sigma\mathbf{E}$$

The Drude conductivity is:
$$\boxed{\sigma = \frac{ne^2\tau}{m^*}}$$

This fundamental relationship connects:

- Microscopic parameters: $n$, $e$, $\tau$, $m^*$
- Macroscopic property: $\sigma$

## Scattering Mechanisms in Metals

### Energy Dependence of Scattering

Higher energy electrons exhibit enhanced scattering due to:

1. Larger interaction cross-sections $\sigma_s \propto E^{\alpha}$ where $\alpha > 0$
2. Access to additional scattering channels at higher energies
3. Increased coupling strength to lattice vibrations

The scattering rate follows:
$$\frac{1}{\tau(E)} = \sum_i \frac{1}{\tau_i(E)}$$

### Primary Scattering Sources

#### 1. Phonon Scattering (Electron-Phonon Interaction)

Temperature-dependent scattering from lattice vibrations:
$$\frac{1}{\tau_{ph}} \propto T \quad \text{(high temperature)}$$

At low temperatures: $\frac{1}{\tau_{ph}} \propto T^5$ (Bloch-Grüneisen regime)

#### 2. Impurity Scattering

Temperature-independent scattering from:

- Substitutional atoms
- Interstitial defects
- Vacancies

$$\frac{1}{\tau_{imp}} = \text{constant}$$

#### 3. Grain Boundary Scattering

Important in polycrystalline materials:
$$\frac{1}{\tau_{gb}} \propto \frac{v_F}{L_{grain}}$$

where $L_{grain}$ is the average grain size.

#### 4. Surface Scattering

Dominant in thin films when thickness $t < l_{mfp}$:
$$\frac{1}{\tau_{surf}} \propto \frac{v_F}{t}$$

### Matthiessen's Rule

Total scattering rate combines all mechanisms:
$$\boxed{\frac{1}{\tau_{total}} = \frac{1}{\tau_{ph}} + \frac{1}{\tau_{imp}} + \frac{1}{\tau_{gb}} + \frac{1}{\tau_{surf}}}$$

This leads to temperature-dependent resistivity:
$$\rho(T) = \rho_0 + \rho_{ph}(T)$$

where $\rho_0$ is the residual resistivity (impurities, defects).

## Quantum Mechanical Treatment of Conduction

### Semiclassical Dynamics

Under an external electric field, electrons near the Fermi surface experience a momentum shift:

$$\Delta \mathbf{k} = -\frac{e\mathbf{E}\tau}{\hbar}$$

The current density arises from electrons near $E_F$ with unbalanced momentum distribution:

$$\mathbf{J} = -e \sum_{\mathbf{k}} \mathbf{v}(\mathbf{k}) f(\mathbf{k}) = -e n_F \mathbf{v}_F \Delta k$$

where:

- $n_F$ = density of electrons at Fermi level
- $\mathbf{v}_F$ = Fermi velocity
- $\Delta k$ = momentum displacement

### Density of States and Conductivity

The density of states per unit energy per unit volume is:

$$g(E) = \frac{1}{2\pi^2}\left(\frac{2m^*}{\hbar^2}\right)^{3/2}\sqrt{E}$$

For a 3D free electron gas: $g(E) \propto \sqrt{E}$

The quantum mechanical conductivity becomes:
$$\sigma = e^2 g(E_F) v_F^2 \tau = \frac{ne^2\tau}{m^*}$$

This recovers the Drude result with quantum mechanical justification.

### Dimensional Effects

#### 3D Systems

Density of states: $g_{3D}(E) \propto E^{1/2}$

#### 2D Systems

For quantum wells or thin films:
$$g_{2D}(E) = \frac{m^*}{\pi\hbar^2} = \text{constant}$$

#### 1D Systems

For quantum wires:
$$g_{1D}(E) \propto E^{-1/2}$$

The dimensionality dramatically affects transport properties and density of states.

## Temperature Dependence of Electronic Properties

### Fermi Energy Temperature Dependence

The Fermi energy in metals is remarkably stable against temperature variations:

$$E_F(T) = E_F(0)\left[1 - \frac{\pi^2}{12}\left(\frac{k_B T}{E_F(0)}\right)^2\right]$$

For typical metals: $\frac{k_B T}{E_F} \sim 10^{-2}$ at room temperature.

#### Zero Temperature Limit

$$E_F(0) = \frac{\hbar^2}{2m^*}\left(3\pi^2 n\right)^{2/3}$$

This fundamental relationship connects electron density to Fermi energy.

### Average Electronic Energy

The average energy of conduction electrons is:
$$\langle E \rangle = \frac{3}{5}E_F \quad \text{at } T = 0$$

At finite temperature, thermal broadening around $E_F$ occurs over energy scale $k_B T$.

### Electronic Heat Capacity

The electronic contribution to specific heat:
$$C_V = \gamma T = \frac{\pi^2}{3}k_B^2 g(E_F) T$$

where $\gamma$ is the Sommerfeld coefficient. This linear temperature dependence distinguishes electronic from phononic contributions ($C_{phonon} \propto T^3$ at low T).
