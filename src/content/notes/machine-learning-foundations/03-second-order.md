---
title: Second-Order Optimization Techniques
author: Gautham Anne
order: 4
pubDatetime: 2025-07-01T12:00:00Z
description: Some notes on second-order optimzation techniques
tags:
  - ML
---

## Table of Contents

## Second-Order Optimality Condition

To determine whether a general single-input function g(w) is convex or concave at a point, we check its curvature (or second derivative information at that point), assuming it is twice differentiable at that point. If the second derivateive is greater than or equal to 0, or less than or equal to 0, then g is said to be convex, or concave at v. For multi-input function, the analog is checking whether the Hessian of the function is positive-definite, positive semi-definite, or non positive-defininte, relating to its eigenvalues.

More specifically, a stationary point v of a multi-input function g(w) is:

- a local (or global) minimum if all eigenvalues of Hessian are positive
- a local (or global) maximum if all eigenvalues of Hessian are negative
- a _saddle_ point if the eigenvalues are of mixed values (some negative, some positive)

## The Geometry of Second-Order Taylor Series

### The general shape of SI quadratic functions

The basic formula for a quadratic function with a single input takes the form g(w) = a + bw + cw^2, where a, b, and c are all constant values controlling the shape of the function. In particular, the constant c controls the convexity or concavity of the function.

### The general shape of MI quadratic functions

The multi-input quadratic function takes a form that is completely generalized from the single-input case, which can be written as
g(w)
