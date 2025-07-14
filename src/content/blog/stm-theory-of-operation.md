---
author: Gautham Anne
pubDatetime: 2025-07-04T00:39:22
title: STM Theory of Operation
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: STM Theory of Operation
---

## Tunneling Current Derivation

The scanning tunneling microscope (STM) relies on quantum tunneling of electrons across the vacuum gap between a sharp metal tip and a conductive sample. In a one-dimensional (1D) model, an electron with energy $E$ approaching a potential barrier of height $U_0>\!E$ over a width $d$ satisfies the time-independent Schrödinger equation $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dz^2} +U(z)\psi=E\psi$. Using the WKB approximation, the decaying wavefunction under the barrier implies a transmission probability

$$
T \;\approx\; \exp\!\Bigl(-2\int_0^d \kappa(z)\,dz\Bigr),
\quad \kappa(z)=\sqrt{\frac{2m[U(z)-E]}{\hbar^2}}.
$$

For a rectangular vacuum barrier of height $U_0=\phi$ (on the order of the work function) and assuming $E\approx E_F\ll\phi$, $\kappa$ is approximately constant. Thus $T\approx \exp(-2\kappa d)$ with $\kappa=\sqrt{2m\phi}/\hbar$. The resulting tunneling current $I$ is proportional to the transmission probability times the number of available electrons. To leading order at low temperature and small bias $V$, Bardeen’s formalism (as simplified by Tersoff–Hamann) yields

$$
I(V)\;\propto\; e^{-2\kappa d}\int_0^{eV}\rho_s(E)\,dE,
$$

where $\rho_s(E)$ is the sample’s electronic density of states (DOS) and the tip DOS is assumed constant. In practice one often writes $I\approx I_0\,e^{-2\kappa d}V$, showing the exponential decay with distance. Here $\kappa=\sqrt{2m\bar\phi}/\hbar$ uses the average work function $\bar\phi$ of tip and sample. This formalism shows that the tunneling current depends both on tip-sample separation and on the integral of the sample’s DOS from the Fermi level to $eV$.

## Exponential Dependence on Tip–Sample Separation

From the above derivation, $I(d)\propto e^{-2\kappa d}$, so the tunneling current decays exponentially with increasing gap $d$. Equivalently,

$$
I(d)\;=\;I(d_0)\,\exp\bigl[-2\kappa\,(d-d_0)\bigr].
$$

Typical metal work functions $\phi\sim4$–$6\,$eV give $\kappa\approx\sqrt{2m\phi}/\hbar\sim10^{10}\text{m}^{-1}$ (i.e.\ $\sim10\text{ nm}^{-1}$). Thus increasing $d$ by $0.1\,$nm (1) multiplies $I$ by $\exp(-2\kappa\cdot0.1\,{\rm nm})$, on the order of $e^{-2}\sim0.14$ or roughly a factor of ten reduction. More precisely, experiments find roughly an order-of-magnitude change per 0.1 nm increment of gap. This extreme sensitivity underpins the STM’s ability to resolve atomic-scale height variations: a small $\sim0.01\,$nm change in $d$ can alter $I$ by a significant percentage. For analysis, one often linearizes by writing $\ln I\approx -2\kappa d + \text{const}$, so that $\partial \ln I/\partial d = -2\kappa$. This shows that in constant-current mode, the tip height $d$ responds logarithmically to changes in surface height.
