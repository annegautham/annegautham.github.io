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
g(w) = a + b^Tw + w^Cw,

where input w is N-dimensional, a remains a constant, b is an Nx1 vector, and C being an NxN matrix (assuming symmetric for our purposes). Because this quadratic is defined along many dimensions, it can take on a wider variety of shapes than its single-input analog. The generailzation of the single-input test for convexity/cavity is no longer whether the _values_ of C are positive or negative, but rather whether the _eigenvalues_ of C are positive or negative. If the eigenvalues are all nonnegative, the function is convex, if all nonpositive, the function is concave, if all 0, it reduces to a linear function that is both concave and convex, and otheriwse (some positve, some negative), then it is neither concanve nor convex.

## Local Curvature and Second-Order Taylor Series

Another way to think about local convexity/cavity of a function g at a point is via its second-order Taylor approximation at that point, taking the form

h(w) = g(v) + d/dw(g) (w-v) + 1/2 d^2/dw^2 (g(w))(w-v)^2.

This is a true quadratic built using the first and second derivatives of g. Not only does the second-order approximation match the curvature of the underlying function at each point v in the function's domain, but if the function is convex/concave at that point, than it is convex/concave _everywhere_. This concept holds analogously for multi-input functions as well, since the second order series approximation is given by

h(w) = g(v) + grad g transpose (w-v) + 1/2 (w-v)^T _ hessian of g _ (w-v).

The distant regression on

## Newton's Method

### Descent Direction

### Algorithm

### Ensuring Numerical Stability

### Newton's method as a zero-finding algorithm

### Python Implementation

## Two Natural Weaknessess of Newton's Method

### Minimizing nonconvex function

### Scaling Limitations
