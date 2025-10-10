---
title: "Sampling"
author: Gautham Anne
order: 3
pubDatetime: 2025-09-25T12:00:00Z
description: Sampling Theorems
tags:
  - DSP
---

## Table of Contents

## Intro to Sampling

Suppose you to need to reduce the dimension of data. For example, a camera may have 5000 pixels, and your display is 2000 pixels. What is the most efficient way to reduce dimension while keeping the image quality good?

## Sampling Continuous Time Signals

- $x_c(t): continuous-time signal$:

What happens when we sample?

Consider x_c(t) = exp(jOmega_1 t)

x[n] = x_c(nTs) = exp(j\OmegaTsn)

Statrted with ttwo seperate signals - difference between aliasing (ame period), in conduinuos time signals, the reconstruction is band-limited, and if you know that you started with low frequency signal, hyou can tell it is the lower freqency. Typically assumed it is low-passed signals.

Ideal COntinuous-to-Discrete (C/D) converter:

x_c(t) => (x) impoulse train to discrete sequence -> x[n] = x_c(nTs)

**Mathematical representation only leads to a simple derivation**

Then product of continuous time signal with impulse train doesn't converge - can do in the frequency domain instead, that gives us the signal in the frequncy domain...

X_c(j\Omega) is repeated -> the confusion with sinusoids can occur to every signal (due to decomposition),

There is aliasing if \Omega_s - \Omega_N < \Omega_N, so nyquist theorem insists that sampling frequncy is at leasy twice the signals frequency (if you know OG signal)

- Anti-aliasing does not recover high-frequency signals, just so that high w signals do not intefere with low frequencies
