---
title: Zero-Order Optimization Techniques
author: Gautham Anne
order: 2
pubDatetime: 2025-07-01T12:00:00Z
description: Some notes on zero-order optimzation techniques
tags:
  - ML
---

## Table of Contents

## Description

Algorithms to find the minimum of a function, where _order_ denotes the number of derivatives used.

- **First-order methods**: gradient-based.
- **Zero-order methods**: derivative-free.

## Cost Functions

Let

$$
g: \mathbb{R}^n \to \mathbb{R},
$$

where $g(\mathbf{w})$ is a scalar and $\mathbf{w} = [w_1, w_2, \dots, w_n]^T$ is an $n$-dimensional vector.

**Example:**

$$
g(\mathbf{w}) = \|\mathbf{w}\|^2 = \sum_{i=1}^n w_i^2 = \mathbf{w}^T \mathbf{w}.
$$

Typical optimization problem:

$$
\min_{\mathbf{w}} g(\mathbf{w}).
$$

## Optimality Conditions

- $\mathbf{w}^*$ is a **global minimum** if  
  $g(\mathbf{w}^*) \leq g(\mathbf{w}), \quad \forall \mathbf{w}$

- $\mathbf{w}^*$ is a **global maximum** if  
  $g(\mathbf{w}^*) \geq g(\mathbf{w}), \quad \forall \mathbf{w}$

## A Naïve Approach

Evaluate $g(\mathbf{w})$ at many points (uniformly or randomly sampled) and choose the smallest value.

- Problem: in high dimensions, sampling requires exponentially more points to cover the same volume (the “curse of dimensionality”).

## General Framework

1. Start at $\mathbf{w}_0$ (random selection in domain).
2. Find a descent direction $\mathbf{d}$.
3. Update: $\mathbf{w}_{k} = \mathbf{w}_{k-1} + \mathbf{d}_{k-1}$.
4. Repeat until convergence.

- **Exploration vs. exploitation tradeoff:**
  - Start with large steps to explore.
  - Gradually shrink step size to converge.

## Example: Random Search

At step $k$, pick random directions $\{\mathbf{d}^p\}_{p=1}^P$.

1. Evaluate  
   $s = \arg\min_{p} g(\mathbf{w}^{k-1} + \mathbf{d}^p)$

2. If  
   $g(\mathbf{w}^{k-1} + \mathbf{d}^s) < g(\mathbf{w}^{k-1})$  
   then update  
   $\mathbf{w}^k = \mathbf{w}^{k-1} + \mathbf{d}^s$.

- Variants: **coordinate search** vs. **descent search**.
