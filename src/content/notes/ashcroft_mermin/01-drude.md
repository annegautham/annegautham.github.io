---
title: "Drude Theory of Metals"
order: 1
description: Drude made a theory.
---

# Drude Theory of Metals

## Table of Contents

## Metals

Metals occupy a special place in solid state physics. They share striking properties:

- High electrical and thermal conductivity
- Ductility, malleability, and metallic luster

Although most solids are nonmetallic, metals have played a central role in theory from the late 19th century onward. The metallic state is considered a fundamental state of matter — over two-thirds of elements are metals.

To understand nonmetals, it's often necessary to understand metals first (e.g. copper vs. salt).

Over the past 100+ years, physicists have built models to describe metals both qualitatively and quantitatively.

This chapter introduces the **Drude model** (ca. 1900):

- Simple, intuitive picture of metallic conduction
- Useful for rough estimates, still in use today
- Fails to explain some key experiments and deeper phenomena

---

## Basic Assumptions of the Drude Model

- After the discovery of the electron (1897), Drude applied kinetic theory of gases to metals, modeling them as a **gas of electrons**.
- In simplest kinetic theory:
  - Electrons are like gas molecules → rigid spheres moving in straight lines until they collide.
  - Collisions are instantaneous and no forces act between them except during collisions.

### Electrons in a Metal

- A metal contains both:
  - Light, mobile **valence electrons**
  - Heavy, immobile **positive ions**
- When atoms condense into a metal:
  - Valence electrons become **delocalized** → form an electron gas
  - Core electrons + nucleus = immobile **ion background**

### Electron Density

Drude treated conduction electrons as a gas of particles of mass $m$. Their density:

$$
n = 0.6022 \times 10^{24} \cdot \frac{Z \rho_m}{A}  \text{(in cm}^{-3}\text{)}
$$

Where:

- $Z$: conduction electrons per atom
- $\rho_m$: mass density in g/cm³
- $A$: atomic mass

Also used: **Wigner-Seitz radius** $r_s$ — radius of a sphere per conduction electron:

$$
\frac{V}{N} = \frac{1}{n} = \frac{4\pi r_s^3}{3} \Rightarrow r_s = \left( \frac{3}{4\pi n} \right)^{1/3}
$$

### Key Assumptions of Drude Theory

1. **Independent electron approximation**:
   - Ignore electron-electron and electron-ion interactions during collisions.
   - Each electron moves freely between collisions.

2. **Collisions are instantaneous**:
   - Modeled as abrupt velocity changes (like bouncing off hard walls).
   - No gradual scattering — just sudden redirection.

3. **Collision rate**:
   - Probability of collision per time = $1/\tau$
   - After each collision, an electron emerges with a **random velocity**, unrelated to its prior motion.

4. **Local thermal equilibrium**:
   - Electrons regain thermal distribution after each collision.
   - Hotter regions → faster electrons emerge.

Despite its simplicity, the Drude model gives a surprisingly good first approximation to electron behavior in metals, especially for:

- Estimating conductivity
- Understanding basic scattering processes
- Building intuition for metallic transport

### Table: Free Electron Densities

| Element | $Z$ | $n \ (10^{22}/\text{cm}^3)$ | $r_s$ (Å) | $r_s / a_0$ |
| ------- | --- | --------------------------- | --------- | ----------- |
| Li      | 1   | 4.70                        | 1.72      | 3.25        |
| Na      | 1   | 2.65                        | 2.08      | 3.93        |
| Cu      | 1   | 8.47                        | 1.41      | 2.67        |
| Be      | 2   | 24.7                        | 0.99      | 1.87        |
| Al      | 3   | 18.1                        | 1.10      | 2.07        |

---

## DC Electrical Conductivity of a Metal

Ohm's Law:

$$
V = IR
$$

Drude theory aims to estimate $R$ from microscopic principles. To eliminate geometry dependence, we define **resistivity** $\rho$ via:

$$
\mathbf{E} = \rho \mathbf{j}
$$

### Current Density

Let current $I$ flow through a wire of length $L$, cross-sectional area $A$:

$$
j = \frac{I}{A}
$$

Using $V = \rho j L \Rightarrow R = \rho \frac{L}{A}$

Drude model: electrons of charge $-e$, number density $n$, average velocity $\mathbf{v}$:

$$
\mathbf{j} = -ne \mathbf{v}
$$

### Deriving Drude Conductivity

Electrons have random thermal motion, so net velocity averages to zero. In an electric field $\mathbf{E}$, they drift opposite to the field with an average velocity:

$$
\mathbf{v}_{\text{avg}} = -\frac{e \tau}{m} \mathbf{E}
$$

So from $\mathbf{j} = -ne \mathbf{v}_{\text{avg}}$:

$$
\mathbf{j} = \left( \frac{ne^2 \tau}{m} \right) \mathbf{E} = \sigma \mathbf{E}
$$

with:

$$
\sigma = \frac{ne^2 \tau}{m},  \rho = \frac{1}{\sigma}
$$

### Estimating Relaxation Time

Rearranging:

$$
\tau = \frac{m}{\rho ne^2}
$$

This allows $\tau$ to be estimated from experimental resistivity.

### Resistivity vs Temperature

Table 1.2: Selected values of $\rho$ (μΩ⋅cm)

| Element | $\rho$(77 K) | $\rho$(273 K) | $\rho$(373 K) | $\rho/T$ ratio |
| ------- | -----------: | ------------: | ------------: | -------------: |
| Cu      |          0.2 |          1.56 |           2.2 |           1.05 |
| Ag      |          0.3 |          1.59 |           2.3 |           1.00 |
| Au      |          0.6 |           2.2 |           3.2 |           1.03 |
| Al      |          0.4 |           2.7 |           4.3 |           1.06 |
| Fe      |          2.2 |            10 |            14 |           0.96 |

- Resistivity rises roughly linearly with $T$ at room temp.
- Drops steeply as $T \to 0$

$$
\tau = \left( \frac{m}{\rho n e^2} \right) \sim \left( \frac{r_s}{a_0} \right)^2 \times 10^{-14} \, \text{sec}
$$

- At room temperature, $\tau \sim 10^{-14} \, \text{sec}$
- A more intuitive idea: estimate the **mean free path**, $\ell = \bar{v} \tau$, the average distance an electron travels between collisions

### Drude Relaxation Times (Approximate, $10^{-14}$ sec)

| Element | 77 K | 273 K | 373 K |
| ------- | ---: | ----: | ----: |
| Cu      |   67 |   2.4 |   1.8 |
| Ag      |   20 |   2.0 |   1.5 |
| Au      |   12 |   2.1 |   1.6 |
| Al      |  6.4 |  0.80 |  0.55 |
| Fe      | 0.92 |  0.46 |  0.32 |

- Relaxation time decreases with increasing temperature
- At low $T$, scattering is dominated by impurities/defects
- At high $T$, phonon scattering dominates

### Time-Dependent View: Momentum and Collisions

- Average electron velocity: $\mathbf{v} = \mathbf{p}(t)/m$
- So current density is:

$$
\mathbf{j} = -\frac{ne \mathbf{p}(t)}{m}
$$

To model $\mathbf{p}(t)$, assume:

- Electrons collide randomly with a probability $dt/\tau$
- Between collisions, motion evolves under external fields (electric, magnetic)

### Evolution of Electron Momentum

- Total momentum per electron satisfies:

$$
\mathbf{p}(t+dt) = \left(1 - \frac{dt}{\tau} \right) [ \mathbf{p}(t) + \mathbf{f}(t)dt ]
$$

where $\mathbf{f}(t)$ is the force per electron due to external fields.

Taking the limit as $dt \to 0$:

$$
\frac{d\mathbf{p}(t)}{dt} = -\frac{\mathbf{p}(t)}{\tau} + \mathbf{f}(t)
$$

This is the **Drude momentum equation** — Newton’s second law with a damping term due to collisions.

---

## Hall Effect and Magnetoresistance

In 1879, E. H. Hall tested whether magnetic forces act on:

- The whole wire (current), or
- Just the moving electrons

He reasoned: if a magnetic field deflects moving charges, they should shift sideways in the conductor → causing a transverse **voltage**. Hall was able to measure this.

### Lorentz Force and Setup

Electric field $\mathbf{E}_x$ drives current density $j_x$ in the $x$-direction.  
Magnetic field $\mathbf{H}$ points in the $z$-direction.

Lorentz force on electrons:

$$
\mathbf{F} = -\frac{e}{c} \, \mathbf{v} \times \mathbf{H}
$$

- Electrons deflect in $-y$ direction
- Accumulate on one side → build up transverse electric field $\mathbf{E}_y$
- This transverse field cancels Lorentz force in steady state

### Measured Quantities

Two main observables:

1. **Magnetoresistance** (longitudinal):

   $$
   \rho(H) = \frac{E_x}{j_x}
   $$

2. **Hall Coefficient**:
   $$
   R_H = \frac{E_y}{j_x H}
   $$

- Negative $R_H$ implies negative charge carriers (electrons)
- Surprisingly, **some metals** show **positive** $R_H$

### Equation of Motion with $\mathbf{H}$ Field

Total force per electron:

$$
\frac{d\mathbf{p}}{dt} = -e \left( \mathbf{E} + \frac{\mathbf{p}}{mc} \times \mathbf{H} \right) - \frac{\mathbf{p}}{\tau}
$$

Steady-state: $\frac{d\mathbf{p}}{dt} = 0$

Break into components:

$$
\begin{aligned}
0 &= -eE_x - \omega_c p_y - \frac{p_x}{\tau} \\
0 &= -eE_y + \omega_c p_x - \frac{p_y}{\tau}
\end{aligned}
$$

Where cyclotron frequency:

$$
\omega_c = \frac{eH}{mc}
$$

### Current Components

From $\mathbf{j} = -ne\mathbf{v} = -\frac{ne}{m}\mathbf{p}$, we get:

$$
\begin{aligned}
\sigma_0 E_x &= \omega_c \tau \, j_y + j_x \\
\sigma_0 E_y &= -\omega_c \tau \, j_x + j_y
\end{aligned}
$$

- $\sigma_0$ is the Drude conductivity with no magnetic field
- The angle $\phi$ between $\mathbf{E}$ and $\mathbf{j}$ is the **Hall angle**:
  $$
  \tan \phi = \omega_c \tau
  $$

### Table: Hall Coefficients at High Fields

| Metal | Valence | $-1/R_H n e c$ |
| ----- | ------- | -------------- |
| Li    | 1       | 0.8            |
| Na    | 1       | 1.1            |
| K     | 1       | 1.2            |
| Rb    | 1       | 1.1            |
| Cs    | 1       | 0.9            |
| Cu    | 1       | 1.5            |
| Ag    | 1       | 1.3            |
| Au    | 1       | 1.5            |
| Be    | 2       | $-0.2$         |
| Mg    | 2       | $-0.4$         |
| In    | 3       | $-0.3$         |
| Al    | 3       | $-0.3$         |

- For alkali metals, Drude’s prediction works well: one electron per atom.
- For multivalent metals (Be, Mg, In, Al), observed values **deviate** from simple theory — sometimes even suggesting **positive charge carriers**.

- $R_H$ depends only on **carrier type and density**
- Surprisingly, in real materials:
  - $R_H$ often deviates from the Drude prediction
  - Depends on magnetic field strength and sample preparation
- **Quantum theory** is required to explain deviations

Drude model predicts:

$$
R_H = -\frac{1}{nec}
$$

### Cyclotron Frequency and Magnetic Effects

The cyclotron frequency:

$$
\omega_c = \frac{eH}{mc} = 2\pi \nu_c
$$

With:

$$
\nu_c \ (\text{GHz}) = 2.80 \times H \ (\text{kG})
$$

- $\omega_c \tau$ is a dimensionless measure of magnetic field strength
- If $\omega_c \tau \ll 1$: field barely perturbs orbits
- If $\omega_c \tau \gtrsim 1$: strong deflection → major magnetic effects

---

## AC Electrical Conductivity of a Metal

Let the electric field oscillate with frequency $\omega$:

$$
\mathbf{E}(t) = \text{Re}\left[ \mathbf{E}(\omega) e^{-i\omega t} \right]
$$

Momentum equation:

$$
\frac{d\mathbf{p}}{dt} = -\frac{\mathbf{p}}{\tau} - e\mathbf{E}
$$

Assume steady-state solution:

$$
\mathbf{p}(t) = \text{Re}\left[ \mathbf{p}(\omega) e^{-i\omega t} \right]
$$

So that,

$$
-i\omega \mathbf{p}(\omega) = -\frac{\mathbf{p}(\omega)}{\tau} - e\mathbf{E}(\omega)
$$

Current density:

$$
\mathbf{j}(\omega) = -\frac{ne\mathbf{p}(\omega)}{m} = \frac{ne^2 \tau}{m} \cdot \frac{\mathbf{E}(\omega)}{1 - i\omega \tau}
$$

Define frequency-dependent (AC) conductivity:

$$
\mathbf{j}(\omega) = \sigma(\omega)\mathbf{E}(\omega),
\sigma(\omega) = \frac{\sigma_0}{1 - i\omega\tau},
\sigma_0 = \frac{ne^2\tau}{m}
$$

### Electromagnetic Wave Propagation

We derive wave equations from Maxwell's laws:

$$
\nabla \cdot \mathbf{E} = 0,  \nabla \cdot \mathbf{H} = 0,
\nabla \times \mathbf{E} = -\frac{1}{c} \frac{\partial \mathbf{H}}{\partial t} \\
\nabla \times \mathbf{H} = \frac{4\pi}{c} \mathbf{j} + \frac{1}{c} \frac{\partial \mathbf{E}}{\partial t}
$$

Assume $e^{-i\omega t}$ time dependence and substitute $\mathbf{j} = \sigma(\omega) \mathbf{E}$:

$$
\nabla \times (\nabla \times \mathbf{E}) = -\nabla^2 \mathbf{E} = \frac{\omega^2}{c^2} \left( 1 + \frac{4\pi i \sigma}{\omega} \right) \mathbf{E}
$$

Wave equation with complex dielectric:

$$
\nabla^2 \mathbf{E} = \frac{\omega^2}{c^2} \epsilon(\omega) \mathbf{E},
\epsilon(\omega) = 1 + \frac{4\pi i \sigma}{\omega}
$$

### High-Frequency Limit and Plasma Frequency

If $\omega \tau \gg 1$, then:

$$
\sigma(\omega) \approx \frac{\sigma_0}{-i\omega\tau},
\epsilon(\omega) \approx 1 - \frac{\omega_p^2}{\omega^2}
$$

Define plasma frequency:

$$
\omega_p^2 = \frac{4\pi ne^2}{m}
$$

No propagation if $\omega < \omega_p$ (since $\epsilon < 0$).

Estimate:

$$
\omega_p \tau = 1.6 \times 10^2 \left( \frac{r_s}{a_0} \right)^{3/2} \left( \frac{1}{\rho_\mu} \right)
$$

### Transparency Threshold

Frequency and wavelength at which metals become transparent:

$$
\nu_p = \frac{\omega_p}{2\pi} = 11.4 \left( \frac{r_s}{a_0} \right)^{-3/2} \times 10^{15} \ \text{Hz}
$$

$$
\lambda_p = \frac{c}{\nu_p} = 0.26 \left( \frac{r_s}{a_0} \right)^{3/2} \times 10^3 \ \text{Å}
$$

Table 1.5: Transparency Threshold (approximate)

| Element | Theoretical $\lambda$ (10³ Å) | Observed $\lambda$ (10³ Å) |
| ------- | ----------------------------- | -------------------------- |
| Li      | 1.5                           | 2.0                        |
| Na      | 2.0                           | 2.1                        |
| K       | 2.8                           | 3.1                        |
| Rb      | 3.1                           | 3.6                        |
| Cs      | 3.5                           | 4.4                        |

### Plasma Oscillations (Plasmons)

Charge oscillations with time dependence $e^{-i\omega t}$.

From continuity and Gauss's law:

$$
\nabla \cdot \mathbf{j} = -\frac{\partial \rho}{\partial t} \Rightarrow \nabla \cdot \mathbf{j}(\omega) = i\omega \rho(\omega) \\
\nabla \cdot \mathbf{E}(\omega) = 4\pi \rho(\omega)
$$

Using $\mathbf{j}(\omega) = \sigma(\omega) \mathbf{E}(\omega)$:

$$
i\omega \rho(\omega) = 4\pi \sigma(\omega) \rho(\omega) \Rightarrow 1 + \frac{4\pi i \sigma(\omega)}{\omega} = 0
$$

Same condition as for electromagnetic wave propagation: $\epsilon(\omega) = 0$.

### Simple Plasma Oscillation Model

Assume slab of $N$ electrons displaced by $d$:

- Surface charge: $\sigma = \pm nde$
- Electric field: $E = 4\pi nde$
- Equation of motion:
  $$
  Nm \ddot{d} = -Ne(4\pi nde) = -4\pi ne^2 N d
  $$

→ Harmonic oscillator at $\omega_p$.

Plasmons observable via electron energy loss spectroscopy.

---

## Thermal Conductivity of a Metal

### Wiedemann–Franz Law

One of the Drude model’s key successes was explaining the Wiedemann–Franz law:

$$
\frac{\kappa}{\sigma} \propto T
$$

This states that the ratio of thermal conductivity $\kappa$ to electrical conductivity $\sigma$ is proportional to $T$. The constant of proportionality is the **Lorenz number**:

$$
\frac{\kappa}{\sigma T} = L \approx 2.22 \times 10^{-8}~\text{W} \cdot \Omega/\text{K}^2
$$

This relationship holds remarkably well across many metals.

### Experimental Values

| Element | $\kappa$ (273 K) | $\kappa/\sigma T$ (273 K) | $\kappa/\sigma T$ (373 K) |
| ------- | ---------------- | ------------------------- | ------------------------- |
| Cu      | 3.85             | 2.20                      | 2.29                      |
| Ag      | 4.18             | 2.31                      | 2.38                      |
| Au      | 3.10             | 2.32                      | 2.36                      |
| Fe      | 0.80             | 2.61                      | 2.88                      |
| Tl      | 0.50             | 2.75                      | 2.75                      |

Units:

- $\kappa$: W/cm·K
- $\kappa/\sigma T$: W·Ω/K²

### Heat Conduction in Metals

Drude assumed:

- Heat is carried by conduction electrons, not ions
- Electron collisions randomize direction
- Temperature gradient leads to a net thermal current

Thermal current density (Fourier’s Law):

$$
\vec{j}^q = -\kappa \nabla T
$$

### Microscopic Picture

Electrons from hotter side carry more energy than those from colder side. Assume:

- Electrons come equally from left ($x - vt$) and right ($x + vt$)
- Energy per electron: $\varepsilon(T)$

Thermal current density:

$$
j^q = \frac{1}{2}nv[\varepsilon(T[x - vt]) - \varepsilon(T[x + vt])]
$$

For small gradients:

$$
j^q = nv^2 \tau \frac{d\varepsilon}{dT} \left(-\frac{dT}{dx}\right)
$$

In 3D:

$$
j^q = \frac{1}{3}v^2 \tau c_v (-\nabla T)  \text
{(Eq. 1.50)}
$$

$$
\kappa = \frac{1}{3}v^2 \tau c_v
$$

### Wiedemann–Franz from Drude

Using:

- $c_v = \frac{3}{2}n k_B$
- $v^2 = \frac{3k_B T}{m}$

We get:

$$
\frac{\kappa}{\sigma} = \frac{3}{2}\left(\frac{k_B}{e}\right)^2 T
$$

$$
\frac{\kappa}{\sigma T} = \frac{3}{2}\left(\frac{k_B}{e}\right)^2 = 1.11 \times 10^{-8}~\text{W} \cdot \Omega/\text{K}^2
$$

This is **half** the experimental value. Drude's estimate was off due to errors in both $c_v$ and $v^2$, which accidentally canceled.

### Thermoelectric Field (Seebeck Effect)

A temp gradient also produces an electric field:

$$
\vec{E} = Q \nabla T
$$

For no net current ($v_Q + v_E = 0$), use:

- Drift from temp gradient:

  $$
  v_Q = -\tau \frac{d}{dx} \left( \frac{v^2}{2} \right) = -\tau v \frac{dT}{dx}  \text{(1D)}
  $$

  $$
  v_Q = -\frac{\tau}{6} \frac{dv^2}{dT} \nabla T  \text{(3D)}
  $$

- Drift from electric field:
  $$
  v_E = -\frac{eE\tau}{m}
  $$

To cancel, require:

$$
Q = -\frac{1}{3e} \frac{d}{dT} \left( \frac{mv^2}{2} \right) = -\frac{c_v}{3ne}
$$

$$
Q = -\frac{k_B}{2e} \approx -0.43 \times 10^{-4}~\text{V/K}
$$
