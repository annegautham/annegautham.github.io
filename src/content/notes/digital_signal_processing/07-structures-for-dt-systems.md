---
title: Structures for Discrete-Time Systems
author: Gautham Anne
order: 3
pubDatetime: 2025-09-25T12:00:00Z
description: Transfo
---

## Table of Contents

## Introduction

There is a direct correspondence from LTI systems with rational system function to LCCDEs. How do we implement with D-T analog or digital hardware: system function must be converted to algorithm/structure that can be realized in the desired technology

Some Assumptions:

- Recursive computation (initial rest conditions)
- IIR, cannot use convolution
- Not the only algorithm for implementation
- Equivalent structures
  - Different results when numerical precision is limited
  - Different number of additions, multiplications, and delays
- Basic Operations: adders, multiplications, and delays

## Direct Forms

### Direct Form I

- Can break system into two parts (cascades of two subsystems)
- Can rearrange systems without changing system function
- Obtain different computational algorithm for implementing the same system
- Cuts the # of registers in half

After merging the registers, we can obtain Direct Form II (Canonic Form):

Given a difference equation, we can find minimum # of registers to implement form. Finite precision => order is important.

Closed paths that return to node by folllowing arrows - a node variable in a loop depends directly or indirectly on itself

- Feedback loops are necessary, not sufficient, to generate IIR responses
- If no loops, longest delay = total # of delay elements

Sample domain implies periodicity... To sample Fourier Transform and see what happens:

Clear that the FDFT samples with the fourier transform (changes sign, jumps by pi)
Picking arbitrary period (M > Length of the pulse)
Padding with zeroes allows more samples...

Properties of DFT:

(same as properties of discrete time fourier series)
Linearity is implied but assumed that N = max(N1, N2),

Circular shift (x[n-m]) maniupulation of DFT is done first in DFS

DFT symmetry properties (x*[n] -> X*[(-k)_N])

Can be written as a periodic conjugate symmetryic component and perioidic conjugate antisymmetric component...

Show how FFT is efficient algorithm for cmoputing the DFT:

- Compute N-point DFTs
- Compute Product XH
- COmpute inverse N-point DFT of Y

so that y = x[n] circ conv h[n]

Circular Convolution as linear convolution wiht Aliasing:
For any f[n] <-> sample the fourier transform

Rather than increasing computation, sampling in DFT makes aliasing in time domain (make sampling really fast then we decrease aliasing affect)

Use Block Convolutions: segment signal into sections of length L >> P,
so that xr[n] is shifted, use circular convolution with N >= L+P (overlapp-add method..)

Overlap Save Methods:

Use circular convolution and keep part that corresponds to linear convolution

- L-point segments of x[N], L-point circular convolution
- First P points are incorrect, keep L-P+1 that are correc

For symmetric signals - need to pad with zeroes in middle of signal...

Need to prealias signals and take DFT to get the fewer samples of DTFT...

Discrete Cosine Transform:
Used in JPEG:

Create a 2N (flip every other one) of the original signal (no discontinuities...)

Taking DFT of that signal - resulting DFT has only N useful parameters -> periodicity is really only N points...
The DFT may be complex, but the DCT is real, same amount of computation of DFT...

Number of computations, even though computing 2N dct is same amount of computation..

DCT error truncation error remains small due to setting number of cofficient to 0 -> although dft is increasing errors almost immediately.

Provides more compaction.
