---
author: Gautham Anne
pubDatetime: 2025-12-11T13:06:42Z
title: Machine Learning for Nonlinear Dynamics of Mechanical Systems
featured: false
draft: false
tags:
  - ML
  - mechanical oscillators
  - vibrations
description: My final project for EE375/475 (Machine Learning) at Northwestern!
---

Most of the time (uhh being generous), mechanical systems behave exactly how you expect them to: you excite a mode, it rings down, and motion fades away. However, in systems with extremely low dissipation, that idea, while true, is more complicated to model. Specifically, a clean oscillator turns into something richer and harder to reason about. Currently, in the Quantum Atom Optics group at Northwestern, I'm studying the dynamics of a particular type of system: diamagnetically levitated quartz particles. These are ultra-high-Q mechanical oscillators that can ring for days. Over thse large time scales, frequencies start drifting in ways that don't fit a simple exponential decay, so I needed a way to classify modes (6 modes, 1 for each degree of freedom). Here's a related <a href="https://www.arxiv.org/abs/2601.01384">paper</a> I helped write on the subject for a deeper explanation.

![quadratic decay behavior](@assets/images/ee475-final-project/quad-decay.png)
_Figure 1: Example of a 'quadratic' decay (not exponential) of energy in a single mode_

I also wanted a way to let the data speak for it self and automatically surface when something new in the behavior of the particle was happening, without having to spend time hardcoding thresholds. I decided to apply the skills learned in my machine learning class (EE375) to help me tackle this problem, and the result is the pipeline described in this post! Happy reading!

## Table of Contents

## Introduction

The goal of this project is to build a data-driven pipeline that can automatically surface these behaviors. Rather than hand-labeling events or tuning thresholds, I wanted a workflow that starts from raw displacement data, extracts physically meaningful features, and then lets structure emerge naturally using unsupervised machine learning.

<div class="download-list">
  <div class="download-item">
    <span class="file-name">AnneGautham_FinalProject.zip</span>
    <a class="download-btn" href="/files/ee475-final-project/AnneGautham_EE475_FinalProject.zip" download title="Download file">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24">
        <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V4" />
      </svg>
    </a>
  </div>
</div>

## Experimental Context

Without revealing too much about the experimental procedure (paper coming out soon!), I'll try to put the data in context of the work. Motion of a particle is read out using a quadrant photodiode analysis of pixel data (from a camera recording, 30 fps), which provides a time-domain displacement signal along orthogonal axes. Because the particle has extremely low dissipation, its mechanical modes ring for long times, making it an ideal platform for studying weak nonlinear effects. In practice, the data acquisition is broken into many short recordings. Each recording coresponds to a time-domain signal, and from this, a spectrogram, but gaps between the recordings exist. Thus, any meaningful analysis has to take into consideration a discontinuous dataset.

![levitated cube](@assets/images/ee475-final-project/lev.png)
_Figure 2: Example levitaded cube with assymetries in both trap (magnetic potential well) and geometry of cube that contribute to nonlinearities._

### Raw Data

Each recording produces a spectrogram with several visible peaks corresponding to various mechanical modes (and their harmonics). The modes were matched to the physics of the objects from theoretical estimates (as outlined in <a href="https://arxiv.org/pdf/2510.09490"> this paper</a>). The spectrogram segments were stitched into a long continuous dataset, where each segment is rescaled onto a standardized time window and shifted into place using known delays between recordings.

![spectrogram](@assets/images/ee475-final-project/spec.png)
_Figure 3: Spectrogram of a single instance of time-domain signal_

### Tracking Mechanical Modes

Once the stitched spectrogram is available, the next challenge is tracking the individual mechancial modes over time. However, simple peak picking only works if the modes are well-seperated and stationary. In long experiments, modes can drift, cross, or recurrently exchange amplitude (FPUT behavior). In these cases, naive peak selection can jump between the modes or lose track of them entirely.

To address this, I implemented a cost-based mode tracking algorithm. At each time slice of teh spectrogram, all candidate peaks are indentified and assigned a cost relative to the previous frequency of a given mode:

$$
\text{cost} = \omega_f|f-f_{prev}|-\omega_A A
$$

Here, $f$ is the candidate frequency, $f_{prev}$ is the previous tracked frequency, and $A$ is the normalized peak amplitude. This formulation favors the continuty in frequency while still allowing strong peaks to pyll the tracker when real mode interactions occur. Additional constraints are set in code to limit the maxiumum allowed frequency jump per time step.

![frequency drift of modes](@assets/images/ee475-final-project/freq_modes.png)
_Figure 4: Frequencies of mdoes drift over time_

## Adaptive Hilbert-Based Feature Extraction

Spectrogram amplitudes alone do not capture the dynamics of a system. Specifically, I need to extract the instantaneous amplitude, frequency, and phase information using an adapative (sliding window) Hilbert transform appraoch. For each tracked mode, I applied a narrow bandpass filter centered on the mode's instantaneous frequency, which is updated dynamically as the frequency drifts. Sliding a window across the time-domain signal, I computed the analytic signal and extracted

- amplitude envelopes
- instantaneous frequencies
- relative phase trajectories

The relative phases between mode pairs are also computed to analyze phase locking and nonlinear coupling behavior.

![relative phase behavior](@assets/images/ee475-final-project/rel_phase.png)
_Figure 5: Relative phase differences between each of the 3 modes._

## From Signals to Feature Vectors & Learning

At this point, each time index can be represented as freature vector containing

- tracked mode frequnecies,
- hilbert amplitude envelopes
- hilbert instantaneous freqeuencies
- pairwise relative phases

All the features are resampled then onto a common time base and normalized. More importantly, every feature as a distinct physical interpretation! Yay!

### Unspervised Learning

There are no ground truth labels for linear vs nonlinear behavior in this system, since transitions are often gradual or ambiguous (at least to me). Unspervised learning provides a way to ask the question: _do different parts of the experiment look dynamically different from one another?_

### UMAP: Strucuture in the Dynamics

To visualize the structure of the feature space, I use UMAP (Uniform Manifold Approximation and Projection). UMAP preserves local neighborhood relationships, making it well0suited for identifying distinct dynamical regimes. When the feature vectors are embedded into two dimensions, the data seperates into distinct clusters, indicating that the system occupies qualitatively distinct states over time. To illustrate this, I used a recording in which there was an obvious 'nonlinearity' due to a pulsive artifact (bumping into the setup) and attempted to seperate a 'linear' regime from a the noise source.

![umap embedding](@assets/images/ee475-final-project/embedding.png)
_Figure 6: UMAP embedding in two dimensional space_

### Clustering Dynamical Regimes

To formalize these groupings, I applied HDBSCAN, a density based clustering algorithm. HDBSCAN indentifies clusters of arbitrary shapes and labeles low-density regions as noise, which may correspond to transition periods between regimes. The resulting clusters align closely with visible changes in frequency drift, amplitude envelopes, and phase behavior.

![clustering](@assets/images/ee475-final-project/clustering.png)
_Figure 7: Clustering (quite obviously correct) shows two distinct clusters, each corresponding to a different dynamical regime._

## Back to Physics

The cluster boundaries actually correspond to physical events: frequency jumps, energy redistribution between modes, and phase reorganizatoin. PCA analysis actually shows that these events dominate some specific principle components, which can provide an interpreatable 'linear' and 'nonlinear' summary of dyanmics (similar to the sine sweep demodulation technique I described [here](/posts/sine-sweep-deconvolution)). It seems that these results suggest that the system undergoes transitions between weakly coupled and strongly coupled regimes, and the observed behavior seems consistent with nonlinear mode coupling and energy exchange reminscent of Fermi-Pasta-Ulam-Tsingou type dynamics in low-loss mechanical systems.

![relative phase behavior](@assets/images/ee475-final-project/total_amp.png)
_Figure 8: Total energy amplitude (spike corresponds to pulsive noise source)_

![relative phase behavior](@assets/images/ee475-final-project/pca.png)
_Figure 9: Extracted PCA amplitude components corresponding to a linear (blue) decaying behavior as well as a pulsive noise artifact (orange)._

I had a lot of fun learning about the different ML techniques commonly used in mode classification and learned a lot about relevant feature extraction and embeddings!
