---
title: "Z-Transform"
author: Gautham Anne
order: 4
pubDatetime: 2025-09-25T12:00:00Z
description: Zzzzz-transform
tags:
  - DSP
---

## Table of Contents

## Introduction to the Z-Transform

The **Z-Transform** is a fundamental tool in digital signal processing that extends the concept of the Discrete-Time Fourier Transform (DTFT) to handle a broader class of signals. Where the DTFT exists only on the unit circle in the complex plane, the Z-Transform operates over a region of the complex $z$-plane.

### Definition

For a discrete-time signal $x[n]$, the Z-Transform is defined as:

$$X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

where $z$ is a complex variable. This can be viewed as the DTFT of the signal $x[n]r^{-n}$ evaluated at $z = re^{j\omega}$:

$$X(z) = X(re^{j\omega}) = \text{DTFT}\{x[n]r^{-n}\}$$

### Geometric Interpretation

The Z-Transform extends the frequency domain analysis by:

- **Unit Circle**: The DTFT corresponds to $|z| = 1$ (unit circle)
- **Complex Plane**: The Z-Transform exists over regions in the complex $z$-plane
- **Frequency Mapping**: We essentially wrap the linear frequency axis around the unit circle

## Region of Convergence (ROC)

The **Region of Convergence** is the set of all complex values $z$ for which $X(z)$ converges:

$$\text{ROC} = \{z \in \mathbb{C} : \sum_{n=-\infty}^{\infty} |x[n]||z|^{-n} < \infty\}$$

### Properties of ROC

1. **Ring or Disk**: ROC is always a ring or disk in the $z$-plane
2. **No Poles**: ROC cannot contain any poles of $X(z)$
3. **DTFT Existence**: DTFT exists if and only if ROC includes the unit circle

### Examples of ROC

#### Right-Sided Exponential Signal

For $x[n] = a^n u[n]$ (where $u[n]$ is the unit step):

$$X(z) = \sum_{n=0}^{\infty} a^n z^{-n} = \sum_{n=0}^{\infty} \left(\frac{a}{z}\right)^n = \frac{1}{1 - az^{-1}} = \frac{z}{z-a}$$

**ROC**: $|z| > |a|$ (exterior of circle with radius $|a|$)

#### Left-Sided Exponential Signal

For $x[n] = -a^n u[-n-1]$:

$$X(z) = \frac{z}{z-a}$$

**ROC**: $|z| < |a|$ (interior of circle with radius $|a|$)

#### Two-Sided Signal

For a combination of right-sided and left-sided exponentials:
$$x[n] = b^n u[n] + c^n u[-n-1]$$

If $|c| < |b|$, then **ROC**: $|c| < |z| < |b|$ (annular region)

## Rational Z-Transforms

Most practical Z-transforms are **rational functions**:

$$X(z) = \frac{P(z)}{Q(z)} = \frac{\sum_{k=0}^M b_k z^{-k}}{\sum_{k=0}^N a_k z^{-k}}$$

where $P(z)$ and $Q(z)$ are polynomials in $z$.

### Poles and Zeros

- **Zeros**: Values of $z$ where $X(z) = 0$ (roots of numerator)
- **Poles**: Values of $z$ where $X(z) = \infty$ (roots of denominator)

For a rational transform with $M$ zeros and $N$ poles:

- If $M < N$: $(N-M)$ zeros at $z = 0$
- If $M > N$: $(M-N)$ poles at $z = 0$

### Pole-Zero Plot Example

Consider:
$$X(z) = \frac{2z^2 - (b+a)z}{(z-a)(z-b)}$$

- **Zeros**: $z = 0, z = \frac{b+a}{2}$
- **Poles**: $z = a, z = b$
- **ROC**: Depends on signal causality and stability requirements

## Inverse Z-Transform

### Partial Fraction Expansion

For $M \geq N$ with distinct poles:

$$X(z) = \sum_{r=0}^{M-N} B_r z^{-r} + \sum_{k=1}^{N} \frac{A_k}{1 - d_k z^{-1}}$$

where:

- $B_r$ coefficients obtained by long division
- $A_k$ are residues: $A_k = (1 - d_k z^{-1})X(z)\Big|_{z=d_k}$
- $d_k$ are the pole locations

### Multiple Poles

For a pole of order $s$ at $z = d_i$:

$$X(z) = \sum_{m=1}^{s} \frac{C_m}{(1 - d_i z^{-1})^m} + \text{other terms}$$

### Methods for Inverse Transform

1. **Partial Fraction Expansion**
2. **Power Series Expansion** (long division)
3. **Residue Method** (contour integration)
4. **Table Lookup** with properties

## Z-Transform Properties

### Linearity

$$ax_1[n] + bx_2[n] \leftrightarrow aX_1(z) + bX_2(z)$$
**ROC**: At least $R_1 \cap R_2$

### Time Shifting

$$x[n-k] \leftrightarrow z^{-k}X(z)$$
**ROC**: Same as $X(z)$ (except possibly $z = 0$ or $z = \infty$)

### Scaling in Z-Domain

$$a^n x[n] \leftrightarrow X(z/a)$$
**ROC**: $|a|R$ where $R$ is the ROC of $X(z)$

### Time Reversal

$$x[-n] \leftrightarrow X(z^{-1})$$
**ROC**: $1/R$ where $R$ is the ROC of $X(z)$

### Convolution

$$x_1[n] * x_2[n] \leftrightarrow X_1(z)X_2(z)$$
**ROC**: At least $R_1 \cap R_2$

### Initial Value Theorem

If $x[n]$ is causal:
$$x[0] = \lim_{z \to \infty} X(z)$$

### Final Value Theorem

If $x[n]$ is causal and $(z-1)X(z)$ has no poles on or outside unit circle:
$$\lim_{n \to \infty} x[n] = \lim_{z \to 1} (z-1)X(z)$$

## System Analysis with Z-Transform

### System Function

For a linear time-invariant system with impulse response $h[n]$:
$$H(z) = \sum_{n=-\infty}^{\infty} h[n] z^{-n}$$

**Input-Output Relationship**: $Y(z) = H(z)X(z)$

### Difference Equations

Linear constant-coefficient difference equation:
$$\sum_{k=0}^{N} a_k y[n-k] = \sum_{k=0}^{M} b_k x[n-k]$$

Taking Z-transform:
$$\sum_{k=0}^{N} a_k z^{-k} Y(z) = \sum_{k=0}^{M} b_k z^{-k} X(z)$$

**System Function**:
$$H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{k=0}^{M} b_k z^{-k}}{\sum_{k=0}^{N} a_k z^{-k}}$$

### Stability and Causality

- **Causal System**: ROC is exterior of outermost pole
- **Stable System**: ROC includes unit circle
- **Causal and Stable**: All poles inside unit circle

### Example: Second-Order System

$$y[n] - 1.5y[n-1] + 0.5y[n-2] = x[n]$$

**System Function**:
$$H(z) = \frac{1}{1 - 1.5z^{-1} + 0.5z^{-2}} = \frac{z^2}{z^2 - 1.5z + 0.5}$$

**Poles**: $z = 1, z = 0.5$

For stability and causality: ROC must be $|z| > 1$

## Connection to Frequency Response

When the ROC includes the unit circle:
$$H(e^{j\omega}) = H(z)\Big|_{z=e^{j\omega}}$$

This gives the **frequency response** of the system, relating input and output in the frequency domain.
