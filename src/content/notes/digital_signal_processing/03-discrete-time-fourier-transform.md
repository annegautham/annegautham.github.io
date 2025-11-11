---
title: Fourier Transform Properies
author: Gautham Anne
order: 3
pubDatetime: 2025-09-25T12:00:00Z
description: DTFT theory, existence conditions, Gibbs phenomenon
tags:
  - DSP
---

## Table of Contents

## Existence Conditions for Discrete-Time Fourier Transform

### Mathematical Conditions for DTFT Existence

The **Discrete-Time Fourier Transform (DTFT)** exists for a sequence $x[n]$ if certain summability conditions are satisfied.

#### Absolutely Summable Sequences

**Condition**: $\sum_{n=-\infty}^{\infty} |x[n]| < \infty$

**Mathematical Guarantee**: If $x[n]$ is absolutely summable, then:
$$X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}$$

converges **uniformly** for all $\omega$, and $X(e^{j\omega})$ is **continuous** and **bounded**.

**Examples**:

1. **Exponential decay**: $x[n] = a^n u[n]$ where $|a| < 1$
2. **Finite duration**: $x[n] = 0$ for $|n| > N$

#### Square Summable Sequences (Finite Energy)

**Condition**: $\sum_{n=-\infty}^{\infty} |x[n]|^2 < \infty$

**Convergence**: The DTFT exists in the **mean-square sense**:
$$\lim_{N \to \infty} \int_{-\pi}^{\pi} \left|X(e^{j\omega}) - \sum_{n=-N}^{N} x[n] e^{-j\omega n}\right|^2 d\omega = 0$$

**Critical Example**: **Ideal Low-Pass Filter**
$$h_{\text{ideal}}[n] = \frac{\sin(\omega_c n)}{\pi n}, \quad n \neq 0$$
$$h_{\text{ideal}}[0] = \frac{\omega_c}{\pi}$$

**Summability Analysis**:

- $\sum_{n=-\infty}^{\infty} |h_{\text{ideal}}[n]| = \infty$ (not absolutely summable)
- $\sum_{n=-\infty}^{\infty} |h_{\text{ideal}}[n]|^2 < \infty$ (square summable)

### Gibbs Phenomenon: Mathematical Analysis

#### Definition and Cause

**Gibbs Phenomenon** occurs when approximating **discontinuous functions** with **finite Fourier series**. The overshoot near discontinuities does **not diminish** as more terms are added.

**Mathematical Description**: For a jump discontinuity, the **maximum overshoot** is approximately:
$$\text{Overshoot} \approx 0.089 \times (\text{Jump Height})$$

This corresponds to about **8.9% overshoot** regardless of the number of terms in the partial sum.

#### Ideal Low-Pass Filter Example

**Frequency Response**:

$$
H(e^{j\omega}) = \begin{cases}
1 & |\omega| \leq \omega_c \\
0 & \omega_c < |\omega| \leq \pi
\end{cases}
$$

**Truncated Impulse Response**:

$$
h_N[n] = \begin{cases}
\frac{\sin(\omega_c n)}{\pi n} & |n| \leq N \\
0 & |n| > N
\end{cases}
$$

**Frequency Response of Truncated Filter**:
$$H_N(e^{j\omega}) = \sum_{n=-N}^{N} h_N[n] e^{-j\omega n}$$

**Gibbs Overshoot**: Near $\omega = \omega_c$, the maximum overshoot is:
$$\max_{\omega} |H_N(e^{j\omega})| \approx 1.089$$

**Key Insight**: The **height of ripples remains constant** as $N \to \infty$, but their **width decreases**, ensuring that the **integral of the error converges** to zero.

## Fundamental Properties of the Discrete-Time Fourier Transform

### 1. Linearity Property

**Mathematical Statement**:
$$ax_1[n] + bx_2[n] \xleftrightarrow{\text{DTFT}} aX_1(e^{j\omega}) + bX_2(e^{j\omega})$$

**Proof**: Direct from the definition of DTFT:
$$\mathcal{F}\{ax_1[n] + bx_2[n]\} = \sum_{n=-\infty}^{\infty} (ax_1[n] + bx_2[n]) e^{-j\omega n}$$
$$= a\sum_{n=-\infty}^{\infty} x_1[n] e^{-j\omega n} + b\sum_{n=-\infty}^{\infty} x_2[n] e^{-j\omega n} = aX_1(e^{j\omega}) + bX_2(e^{j\omega})$$

**Applications**:

- Superposition principle for linear systems
- Decomposition of complex signals into simpler components

### 2. Time Shifting Property

**Mathematical Statement**:
$$x[n - n_0] \xleftrightarrow{\text{DTFT}} e^{-j\omega n_0} X(e^{j\omega})$$

**Proof**:
$$\mathcal{F}\{x[n - n_0]\} = \sum_{n=-\infty}^{\infty} x[n - n_0] e^{-j\omega n}$$

Let $m = n - n_0$, so $n = m + n_0$:
$$= \sum_{m=-\infty}^{\infty} x[m] e^{-j\omega (m + n_0)} = e^{-j\omega n_0} \sum_{m=-\infty}^{\infty} x[m] e^{-j\omega m} = e^{-j\omega n_0} X(e^{j\omega})$$

**Physical Interpretation**:

- **Magnitude**: $|X(e^{j\omega})|$ is unchanged
- **Phase**: Adds linear phase $-\omega n_0$
- **Group Delay**: $\tau_g = n_0$ (constant delay)

### 3. Frequency Shifting Property (Modulation)

**Mathematical Statement**:
$$e^{j\omega_0 n} x[n] \xleftrightarrow{\text{DTFT}} X(e^{j(\omega - \omega_0)})$$

**Proof**:
$$\mathcal{F}\{e^{j\omega_0 n} x[n]\} = \sum_{n=-\infty}^{\infty} e^{j\omega_0 n} x[n] e^{-j\omega n}$$
$$= \sum_{n=-\infty}^{\infty} x[n] e^{-j(\omega - \omega_0) n} = X(e^{j(\omega - \omega_0)})$$

**Applications**:

- **Amplitude Modulation**: $\cos(\omega_0 n) x[n] \leftrightarrow \frac{1}{2}[X(e^{j(\omega - \omega_0)}) + X(e^{j(\omega + \omega_0)})]$
- **Frequency Translation**: Shifting spectra for communication systems

### 4. Conjugate Symmetry Property

**For Real Sequences** ($x[n] \in \mathbb{R}$):
$$X(e^{j\omega}) = X^*(e^{-j\omega})$$

**Component-wise Analysis**:

- **Magnitude**: $|X(e^{j\omega})| = |X(e^{-j\omega})|$ (even function)
- **Phase**: $\arg[X(e^{j\omega})] = -\arg[X(e^{-j\omega})]$ (odd function)
- **Real Part**: $\text{Re}[X(e^{j\omega})] = \text{Re}[X(e^{-j\omega})]$ (even)
- **Imaginary Part**: $\text{Im}[X(e^{j\omega})] = -\text{Im}[X(e^{-j\omega})]$ (odd)

**Proof**: For real $x[n]$:
$$X^*(e^{-j\omega}) = \left(\sum_{n=-\infty}^{\infty} x[n] e^{j\omega n}\right)^* = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n} = X(e^{j\omega})$$

### 5. Time Reversal Property

**Mathematical Statement**:
$$x[-n] \xleftrightarrow{\text{DTFT}} X(e^{-j\omega})$$

**Proof**:
$$\mathcal{F}\{x[-n]\} = \sum_{n=-\infty}^{\infty} x[-n] e^{-j\omega n}$$

Let $m = -n$, so $n = -m$:
$$= \sum_{m=-\infty}^{\infty} x[m] e^{j\omega m} = X(e^{-j\omega})$$

**Graphical Interpretation**: Time reversal corresponds to **frequency reversal**.

### 6. Differentiation in Frequency

**Mathematical Statement**:
$$n x[n] \xleftrightarrow{\text{DTFT}} j \frac{d}{d\omega} X(e^{j\omega})$$

**Proof**: Starting with the DTFT definition:
$$X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}$$

Differentiating both sides with respect to $\omega$:
$$\frac{d}{d\omega} X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] \frac{d}{d\omega} e^{-j\omega n} = \sum_{n=-\infty}^{\infty} x[n] (-jn) e^{-j\omega n}$$
$$= -j \sum_{n=-\infty}^{\infty} n x[n] e^{-j\omega n} = -j \mathcal{F}\{n x[n]\}$$

Therefore: $\mathcal{F}\{n x[n]\} = j \frac{d}{d\omega} X(e^{j\omega})$

**Applications**:

- Computing moments of signals
- Analyzing signal energy distribution

### 7. Parseval's Theorem

**Mathematical Statement**:
$$\sum_{n=-\infty}^{\infty} |x[n]|^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |X(e^{j\omega})|^2 d\omega$$

**Physical Interpretation**: **Total energy** in time domain equals **total energy** in frequency domain.

**Proof**: Using the inverse DTFT:
$$x[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) e^{j\omega n} d\omega$$

The energy is:
$$\sum_{n=-\infty}^{\infty} |x[n]|^2 = \sum_{n=-\infty}^{\infty} x[n] x^*[n]$$
$$= \sum_{n=-\infty}^{\infty} x[n] \left(\frac{1}{2\pi} \int_{-\pi}^{\pi} X^*(e^{j\omega}) e^{-j\omega n} d\omega\right)$$
$$= \frac{1}{2\pi} \int_{-\pi}^{\pi} X^*(e^{j\omega}) \left(\sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}\right) d\omega$$
$$= \frac{1}{2\pi} \int_{-\pi}^{\pi} |X(e^{j\omega})|^2 d\omega$$

### 8. Generalized Parseval's Theorem (Cross-Correlation)

**Mathematical Statement**:
$$\sum_{n=-\infty}^{\infty} x_1[n] x_2^*[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X_1(e^{j\omega}) X_2^*(e^{j\omega}) d\omega$$

**Applications**:

- **Cross-correlation** in frequency domain
- **Matched filtering** for signal detection
- **Power spectral density** calculations

### 9. Convolution Theorem

**Mathematical Statement**:
$$x_1[n] * x_2[n] \xleftrightarrow{\text{DTFT}} X_1(e^{j\omega}) \cdot X_2(e^{j\omega})$$

**Proof**:
$$\mathcal{F}\{x_1[n] * x_2[n]\} = \mathcal{F}\left\{\sum_{k=-\infty}^{\infty} x_1[k] x_2[n-k]\right\}$$
$$= \sum_{n=-\infty}^{\infty} \left(\sum_{k=-\infty}^{\infty} x_1[k] x_2[n-k]\right) e^{-j\omega n}$$

Changing the order of summation:
$$= \sum_{k=-\infty}^{\infty} x_1[k] \sum_{n=-\infty}^{\infty} x_2[n-k] e^{-j\omega n}$$

Using the time-shifting property:
$$= \sum_{k=-\infty}^{\infty} x_1[k] e^{-j\omega k} X_2(e^{j\omega}) = X_1(e^{j\omega}) X_2(e^{j\omega})$$

**Dual Property**:
$$x_1[n] \cdot x_2[n] \xleftrightarrow{\text{DTFT}} \frac{1}{2\pi} X_1(e^{j\omega}) * X_2(e^{j\omega})$$

### 10. Filter Design Applications

#### High-Pass from Low-Pass Transformation

**Method 1**: **Spectral Inversion**
If $h_{LP}[n]$ is a low-pass filter, then:
$$h_{HP}[n] = \delta[n] - h_{LP}[n]$$

**Frequency Domain**: $H_{HP}(e^{j\omega}) = 1 - H_{LP}(e^{j\omega})$

**Method 2**: **Frequency Shifting**
$$h_{HP}[n] = (-1)^n h_{LP}[n] = e^{j\pi n} h_{LP}[n]$$

**Frequency Domain**: $H_{HP}(e^{j\omega}) = H_{LP}(e^{j(\omega - \pi)})$

This **shifts** the low-pass response by $\pi$ radians, converting passband to stopband and vice versa.

#### Band-Pass Filter Design

**Method**: Combine frequency shifting with low-pass prototype:
$$h_{BP}[n] = 2h_{LP}[n] \cos(\omega_0 n)$$

where $\omega_0$ is the **center frequency** and $h_{LP}[n]$ has cutoff $\omega_c$.

**Result**: Band-pass filter centered at $\omega_0$ with bandwidth $2\omega_c$.

## Advanced DTFT Concepts and Applications

### Fourier Transform of Periodic Sequences

#### Mathematical Treatment

For a periodic sequence $x[n]$ with period $N$:
$$x[n + N] = x[n] \text{ for all } n$$

The DTFT contains **impulses** (Dirac deltas) at harmonic frequencies:
$$X(e^{j\omega}) = 2\pi \sum_{k=0}^{N-1} X[k] \delta(\omega - \frac{2\pi k}{N})$$

where $X[k]$ are the **Discrete Fourier Series (DFS) coefficients**:
$$X[k] = \frac{1}{N} \sum_{n=0}^{N-1} x[n] e^{-j2\pi kn/N}$$

#### Connection to DFS and DFT

**Discrete Fourier Series**: Represents periodic sequences in frequency domain
**Discrete Fourier Transform**: Computes samples of DTFT for finite-length sequences

**Relationship**: DFT is samples of DTFT:
$$X[k] = X(e^{j\omega})\Big|_{\omega = 2\pi k/N}$$

### Windowing Effects and Spectral Leakage

#### Rectangular Window Analysis

When analyzing finite-length data, we implicitly multiply by a rectangular window:
$$x_w[n] = x[n] \cdot w[n]$$

where $w[n] = 1$ for $0 \leq n \leq N-1$ and $w[n] = 0$ elsewhere.

**Frequency Domain Effect**:
$$X_w(e^{j\omega}) = \frac{1}{2\pi} X(e^{j\omega}) * W(e^{j\omega})$$

**Rectangular Window DTFT**:
$$W(e^{j\omega}) = e^{-j\omega(N-1)/2} \frac{\sin(\omega N/2)}{\sin(\omega/2)}$$

#### Spectral Leakage Phenomenon

**Cause**: Windowing spreads spectral energy from discrete frequencies across the frequency spectrum.

**Mathematical Description**: A pure sinusoid becomes:
$$\cos(\omega_0 n) \rightarrow \frac{1}{2\pi} \cdot \frac{\sin(\omega N/2)}{\sin(\omega/2)} * [\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$$

**Mitigation Strategies**:

1. **Longer observation windows** (reduce main lobe width)
2. **Smooth window functions** (reduce side lobe levels)
3. **Zero-padding** (interpolate spectrum)

### Sampling Theory and Aliasing

#### Discrete-Time Sampling of Continuous-Time Signals

**Sampling Relationship**:
$$x[n] = x_c(nT)$$

where $x_c(t)$ is the continuous-time signal and $T$ is the sampling period.

**Frequency Domain Relationship**:
$$X(e^{j\omega}) = \frac{1}{T} \sum_{k=-\infty}^{\infty} X_c\left(j\frac{\omega - 2\pi k}{T}\right)$$

#### Nyquist Criterion and Anti-Aliasing

**Nyquist Frequency**: $\omega_N = \pi$ (normalized) or $f_N = \frac{1}{2T}$ Hz

**Aliasing Condition**: If $X_c(j\Omega) \neq 0$ for $|\Omega| > \pi/T$, then aliasing occurs.

**Anti-Aliasing Filter**: Low-pass filter with cutoff at $\pi/T$ before sampling:

$$
H_{AA}(j\Omega) = \begin{cases}
T & |\Omega| \leq \pi/T \\
0 & |\Omega| > \pi/T
\end{cases}
$$

### Z-Transform Relationship

#### Connection to DTFT

The **Z-transform** is a generalization of the DTFT:
$$X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

**DTFT as Special Case**: $X(e^{j\omega}) = X(z)\Big|_{z = e^{j\omega}}$

#### Region of Convergence (ROC)

**Absolute Convergence**: $\sum_{n=-\infty}^{\infty} |x[n] r^{-n}| < \infty$ for $r$ in ROC

**DTFT Existence**: DTFT exists if and only if unit circle is in ROC

#### Poles and Zeros Analysis

**Rational Z-Transform**:
$$H(z) = \frac{\sum_{k=0}^M b_k z^{-k}}{\sum_{k=0}^N a_k z^{-k}} = \frac{B(z)}{A(z)}$$

**Frequency Response**: $H(e^{j\omega})$ obtained by evaluating $H(z)$ on unit circle

**Geometric Interpretation**:

- **Zeros**: Points where $H(z) = 0$
- **Poles**: Points where $H(z) = \infty$
- **Magnitude**: Distance from unit circle to poles/zeros affects $|H(e^{j\omega})|$

This comprehensive framework provides the mathematical foundation for advanced digital signal processing techniques and applications in communications, audio processing, and system analysis.
