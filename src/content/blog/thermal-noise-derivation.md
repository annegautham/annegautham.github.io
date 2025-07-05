---
author: Gautham Anne
pubDatetime: 2024-09-01T07:21:03
title: Derivation of Thermal Noise
featured: false
draft: false
tags:
  - none
description: A derivation of Nyquist's thermal noise result!
---

Hola peepsicles! So, a lot of what I was learning about this past summer revolved around optimizing circuit topology with respect to thermal noise. See <a href="https://annegautham.github.io/posts/input-ref-thermal-noise/">this post</a> for a function I implemented to calculate the thermal noise of any circuit at any node.

To verify my understanding on subject matter, I compiled a 'lecture note' on <a href="https://journals.aps.org/pr/abstract/10.1103/PhysRev.32.110/">Harry Nyquist's 1928 paper: Thermal Agitation of Electric Charge in Conductors</a>. I think it's a pretty elegant derivation, so here ya go!

## Table of Contents

## Motivation

Dr. Johnson experimentally discovered fluctuations of voltage noise across a resistor due to thermal agitation. Electrons within a conductor oscillate due to thermal energy, and thus, produce voltage noise across the resistor. This lecture note will derive the voltage noise as a function of temperature and resistance using principles from thermodynamics and circuit theory.

## Noise Dependence on T & R

Let's assume that resistor $R$ generates some voltage noise when in a thermal bath of temperature $T$. From the second law of thermodynamics, we know that no power can be extracted from produced voltage noise, since the temperature of the load is equal to the temperature of the resistor.

![setup](@assets/images/thermal-noise-derivation/setup.png)

Thus, the power dissipated in the load from the resistor is equal to the power dissipated in the resistor from the load. From this reasoning, we see that a thermal bath can only generate a voltage noise if the circuit object is capable of dissipating energy. Thus, only resistors can produce noise, while ideal inductors and ideal capacitors cannot. This means that only the real part of a complex impedance has any effect on the thermal noise.

## Transmission Line Model

Now, let's suppose that $R_1$ is connected to resistor $R_2$, with the same resistance $R_1 = R_2$, through a transmission line, at equal temperature $T$. We also have that the two resistors produce the same $\overline{v_n^2}$.

![transmision line](@assets/images/thermal-noise-derivation/transmission-line.png)

Then, we know that the power transferred from $R_1$ to $R_2$, denoted $P_{12}$, must equal the power transferred from $R_2$ to $R_1$, $P_{21}$. In addition, we know that

$$
P_{12} = \frac{\overline{v_n^2}}{4R}
$$

since we have a voltage divider over two resistors with equivalent resistance $R$.

Thus, we have

$$
dP = \frac{S_{v_n}(f)}{4R}df
$$

where f is frequency.

We can now ask, how much energy is being transferred through the transmission line? If the transmission line has length l, and the power is being transferred at velocity v, then we have

$$
dE = 2\frac{l}{v}dP= 2\frac{l}{v}\frac{S_{v_n}(f)}{4R}df
\tag{1}
$$

The factor of two comes from the fact that there are two trains of energy passing through the transmission line: one from $R_1$ to $R_2$, and the other traveling backwards. $\frac{l}{v}$ is the time it takes for the wave the propagate.

![standing waves](@assets/images/thermal-noise-derivation/standing-waves.png)

Instead of thinking about $P_{12}$ and $P_{21}$ as separate trains from $R_1$ to $R_2$ and $R_2$ to $R1$ we can instead interpret the energy transfer from the resistors as standing electromagnetic waves across the transmission line such that
$$l = n\frac{\lambda}{2} = n\frac{v}{2f}$$
where $n \in \mathbb{N}$ is the \# of modes of the wave, $\lambda$ is the wavelength, v is the velocity of propagation, and f is the associated frequency of the standing wave. Rearraging the equation yields
$f = n\frac{v}{2l}$
We also note that for a given $df$, we have $\frac{df}{\frac{v}{2l}} = \frac{2l df}{v} = m$ modes. Note that there are actually two mediums of energy stored within the transmission line: electric energy and magnetic energy storage. The equipartition theorem dictates that each degree of freedom has an associated $\frac{1}{2}kT$ of energy, so we have

$$
dE = \frac{1}{2}kT \cdot 2m = \frac{2ldf}{v}kT
\tag{2}
$$

Setting equations $(1)$ and $(2)$ equal to each other yields

$$
\frac{2ldf}{v}kT = \frac{2lS_{v_n}(f)}{v4R}df \implies \boxed{S_{v_n}(f) = 4kTR}
$$
