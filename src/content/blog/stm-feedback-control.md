---
author: Gautham Anne
pubDatetime: 2025-07-06T00:39:22
title: Feedback Control
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: STM Feedback Control
---

## Surface Topography via Constant-Current Scanning

In constant-current imaging, the STM feedback loop adjusts the tip height $z$ to hold $I$ at a setpoint. As the tip is raster-scanned laterally over the surface, the control electronics vary $z$ so that $I_{\rm measured}=I_{\rm set}$ at all $(x,y)$. Thus the recorded $z(x,y)$ is effectively the surface topography (apparent height). Concretely, the tip’s $z$-trajectory maps contours of constant tunneling current. Since $I\propto\exp(-2\kappa S)\int_0^{eV}\rho_s(E)\,dE$ (with $S=d-h(x,y)$ as the instantaneous gap, where $h(x,y)$ is surface height), the feedback enforces

$$
\exp\bigl[-2\kappa (d(x,y)-h(x,y))\bigr]\int_0^{eV}\rho_s(E)\,dE \;=\; \text{constant}
$$

For a homogeneous DOS, $\int_0^{eV}\rho_s(E)dE$ is uniform, so variations in $I$ are purely due to changes in $h(x,y)$; the tip height thus directly images geometric corrugations. In general, however, surface electronic inhomogeneity modulates $I$. In constant-current mode the topograph $z(x,y)$ therefore contains both geometric and electronic contrast. However, for many conducting samples, we can interpret the constant-$I$ height map an approximatino the true surface profile.

## Feedback Control in Constant-Current STM

Maintaining $I=I_{\rm set}$ requires a feedback controller acting on the tip–sample gap. Define the error signal $e(t)=I_{\rm set}-I(t)$. A common choice is a proportional-integral (PI) controller, whose output $u(t)$ (voltage to the $z$-piezo) is

$$
u(t)\;=\;K_P\,e(t)\;+\;K_I\int_0^t e(\tau)\,d\tau,
$$

with gains $K_P,K_I>0$. The proportional term $K_P e$ produces an immediate displacement proportional to the instantaneous error, providing fast corrective action, while the integral term eliminates any steady-state offset by accumulating past error (in effect giving infinite gain at zero frequency). In Laplace-domain notation, $U(s)=(K_P + K_I/s)E(s)$.

This controller drives the $z$-piezo, changing the gap $d$ (or equivalently $S=d-h$). As described by Aguirre {\it et al.}, “the output signal feeds the $z$ piezoelectric for moving [the tip] in a certain direction. As response, the $z$ piezo will suffer an elongation and will change the tip–sample distance $S$, and consequently will change the value of the tunnel current". A logarithmic amplifier is often placed in the current-to-voltage converter to linearize the exponential $I(d)$ relation. The net closed-loop system is designed so that, when $e=0$, the tip height exactly compensates surface features. In practice the controller bandwidth must be chosen to accommodate the mechanical resonances of the tip–piezo assembly and the desired scan speed. Proper tuning of $K_P,K_I$ ensures stability and fast tracking: roughly, larger $K_P$ speeds response but can excite resonances, while sufficient $K_I$ guarantees zero steady error.

In summary, the STM feedback loop (often implemented with a PI controller) continuously adjusts the tip voltage to drive $e(t)\to0$, thereby holding $I$ constant. The measured piezo voltage (or equivalently tip height) as a function of $(x,y)$ yields the surface topography. This feedback mechanism, combined with the exponential tunneling current law, gives the STM its ability to map surfaces with sub-nanometer vertical resolution.
