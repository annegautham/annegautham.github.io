---
title: First-Order Optimization Techniques
author: Gautham Anne
order: 3
description: Some notes on first-order optimzation techniques
tags:
  - ML
---

## Table of Contents

## Introduction

This section details fundamental optimization algorithms used to tackle machine learning problems. First-order optimality conditions codify how the first derivatives characterize the minima of functions. We'll explore fundamental concepts related to hyperplanes and, in particular, the first-order Taylor series approximation.

## First-Order Optimality Condition

When the derivative of a function is zero at a point, that point is a potential minimum. Analogously, for multi-input functions, any $N$-dimensional point $\mathbf{v}$ where every partial derivative of $g$ is zero is a potential minimum. This system of $N$ equations is referred to as the first-order system of equations:

$$\frac{\partial g}{\partial w_1}(\mathbf{v}) = 0, \quad \frac{\partial g}{\partial w_2}(\mathbf{v}) = 0, \quad \ldots, \quad \frac{\partial g}{\partial w_N}(\mathbf{v}) = 0$$

We can also write the first-order system more compactly using gradient notation as:
$$\nabla g(\mathbf{v}) = \mathbf{0}_{N \times 1}$$

This useful characterization of minimum points is the first-order analog to the zero-order condition for optimality. However, there are two problems with the first-order characterization of minima:

- It is virtually impossible to solve a general function's first-order system of equations "by hand" (algebraically for closed-form solutions)
- It only defines global minima for convex functions (like quadratics), and also captures maxima and saddle points of nonconvex functions. These minima, maxima, and saddle points are referred to as _stationary_ or _critical_ points of a function.

### Coordinate Descent and the First-Order Optimality Condition

While solving the first-order system simultaneously is often impossible, it is sometimes possible to solve it sequentially. This approach is called coordinate descent and is effective when each of the $N$ equations can be solved in closed form.

To solve the first-order system sequentially, we initialize an input $\mathbf{w}^0$ and begin by updating the first coordinate by solving:
$$\frac{\partial g}{\partial w_1}(\mathbf{w}^0) = 0$$

for the optimal weight $w_1^*$. All other weights are kept at their initial values. We then update the first coordinate of vector $\mathbf{w}^0$ with the solution $w_1^*$. Continuing this pattern, we update the $n$-th weight by solving:
$$\frac{\partial g}{\partial w_n}(\mathbf{w}^{n-1}) = 0$$

for $w_n^*$. After sweeping through all $N$ weights a single time, we can refine the solution by sweeping through weights again. At the $k$-th such sweep, we update the $n$-th weight by solving:
$$\frac{\partial g}{\partial w_n}(\mathbf{w}^{N(k-1)+n-1}) = 0$$

## Geometry of First-Order Taylor Series

Here, we describe characteristics of hyperplanes including directions of steepest ascent and steepest descent. We then study the first-order Taylor series approximation to a function.

### Anatomy of Hyperplanes

A general $N$-dimensional hyperplane is characterized as:
$$h(w_1, w_2, w_3, \ldots, w_N) = a + b_1w_1 + b_2w_2 + \cdots + b_Nw_N$$

where $a$ as well as $b_1$ through $b_N$ are all scalar parameters. We can rewrite $h$ more compactly as:
$$h(\mathbf{w}) = a + \mathbf{b}^T\mathbf{w}$$

where $\mathbf{b}$ and $\mathbf{w}$ are vectors.

Notice that the hyperplane is an $N$-dimensional object living in an $(N+1)$-dimensional ambient space, whose input space is $N$-dimensional.

### Steepest Ascent/Descent Directions

When $N = 1$, there are only two directions for $w$ to 'move' in. Moving right or left yields an ascent (or descent) direction for any arbitrary hyperplane $h$. In the case where $N > 1$, however, there are infinitely many directions to move in, and some that preserve the value of $h$. Thus, it is logical to ask whether we can find the direction that produces the largest ascent (or descent), commonly referred to as the _direction of steepest ascent/descent_.

We aim to find the unit direction $\mathbf{d}$ such that the value of $h(\mathbf{w}^0 + \mathbf{d})$ is maximal. In other words, we aim to solve:
$$\max_{\mathbf{d}} h(\mathbf{w}^0 + \mathbf{d})$$
subject to $\|\mathbf{d}\| = 1$.

Note that $h(\mathbf{w}^0 + \mathbf{d})$ can be written as:
$$h(\mathbf{w}^0 + \mathbf{d}) = a + \mathbf{b}^T(\mathbf{w}^0 + \mathbf{d}) = a + \mathbf{b}^T\mathbf{w}^0 + \mathbf{b}^T\mathbf{d}$$

where the first two terms on the right-hand side are constant with respect to $\mathbf{d}$.

Therefore, maximizing the value of $h(\mathbf{w}^0 + \mathbf{d})$ is equivalent to maximizing $\mathbf{b}^T\mathbf{d}$, which can be written using the inner product as:
$$\mathbf{b}^T\mathbf{d} = \|\mathbf{b}\| \|\mathbf{d}\| \cos(\theta)$$

Note that $\mathbf{b}$ does not change with respect to $\mathbf{d}$, and $\|\mathbf{d}\| = 1$. Thus, we aim to:
$$\max_{\mathbf{d}} \cos(\theta)$$

It is clear that the maximality condition occurs when $\theta = 0$, or equivalently, when $\mathbf{d} = \frac{\mathbf{b}}{\|\mathbf{b}\|}$. Similarly, the minimality condition occurs when $\mathbf{d} = -\frac{\mathbf{b}}{\|\mathbf{b}\|}$.

### The Gradient

A multi-input function $g(\mathbf{w})$ can be approximated locally around a given point $\mathbf{w}^0$ by the hyperplane:
$$h(\mathbf{w}) = g(\mathbf{w}^0) + \nabla g(\mathbf{w}^0)^T(\mathbf{w} - \mathbf{w}^0)$$

This can be rewritten in the form $h(\mathbf{w}) = a + \mathbf{b}^T\mathbf{w}$, where:

- $a = g(\mathbf{w}^0) - \nabla g(\mathbf{w}^0)^T\mathbf{w}^0$
- $\mathbf{b} = \nabla g(\mathbf{w}^0)$

This hyperplane is tangent to $g$ at the point $\mathbf{w}^0$. Because $h$ is designed to approximate $g$ near $\mathbf{w}^0$, its steepest ascent and descent directions also tell us the direction to travel to increase or decrease the value of the underlying function $g$ itself at/near $\mathbf{w}^0$.

The **gradient** $\nabla g(\mathbf{w}^0)$ therefore points in the direction of steepest ascent, while $-\nabla g(\mathbf{w}^0)$ points in the direction of steepest descent.

## Computing Gradients Efficiently

We can compute the derivative of relatively simple functions like $g(w) = \sin(w^2)$ easily by applying differentiation rules and derivatives of elementary functions. However, for complicated functions common in machine learning, we need _automatic differentiation_ tools as an alternative to manual computation.

For **Python**, popular automatic differentiation libraries include:

- `autograd` - Simple and lightweight automatic differentiation
- `JAX` - High-performance automatic differentiation with GPU support
- `PyTorch` - Deep learning framework with built-in autodiff
- `TensorFlow` - Another deep learning framework with automatic differentiation

These tools compute gradients using the chain rule systematically, enabling efficient optimization of complex multi-layer functions.

## Gradient Descent

We have established that the negative gradient of a function computed at a particular point always defines a valid descent direction at that point. We can construct a local optimization method consisting of steps of the general form:
$$\mathbf{w}^k = \mathbf{w}^{k-1} + \alpha \mathbf{d}^k$$

By employing the negative gradient as the descent direction $\mathbf{d}^k = -\nabla g(\mathbf{w}^{k-1})$, the sequence of steps takes the form:
$$\mathbf{w}^k = \mathbf{w}^{k-1} - \alpha \nabla g(\mathbf{w}^{k-1})$$

Provided an appropriate step size $\alpha$, this iterative process will converge to a point near the local minimum of the target function $g$. This is known as the **gradient descent algorithm**.

Gradient descent is often far superior to local zero-order optimization methods and is the most popular optimization algorithm used in machine learning. This superiority stems from the fact that the descent direction (via the gradient) is almost always easier to compute than seeking out a descent direction at random, particularly as the dimension of the input space increases.

### Step Length Choices

As with all local optimization methods, the step length or learning rate parameter $\alpha$ needs to be carefully chosen. For gradient descent, the most common choices include:

1. **Fixed step size**: Using a constant $\alpha$ value for each step of a gradient descent run
2. **Diminishing step size**: Using a decreasing step size like $\alpha = \frac{1}{k}$ at the $k$-th step

In both cases, the aim is to choose $\alpha$ to induce the most rapid minimization possible.

**Mathematical considerations for step size:**

- Too large: $\alpha > \frac{2}{\lambda_{\max}}$ where $\lambda_{\max}$ is the largest eigenvalue of the Hessian (for quadratic functions)
- Too small: Convergence becomes unnecessarily slow
- Optimal: $\alpha = \frac{2}{\lambda_{\min} + \lambda_{\max}}$ for quadratic functions

### Oscillation in Cost Function History

In practice, we use the cost function history plot to tune the step length parameter $\alpha$. When analyzing the cost function history, it is not ultimately important that the plot is strictly decreasing. What is critically important is finding a value of $\alpha$ that allows the algorithm to find the lowest value efficiently.

The _best_ choice of $\alpha$ for a given minimization problem may cause the algorithm to 'hop around' and not induce a strict descent at every step, but still converge to the optimal solution faster than a more conservative choice.

### Convergence Criteria

In principle, we can wait for gradient descent to get sufficiently close to a stationary point by ensuring the magnitude of the gradient is sufficiently small:
$$\|\nabla g(\mathbf{w}^k)\| < \epsilon$$

Other formal convergence criteria include:

1. **Step size criterion**: Halt when steps no longer make sufficient progress:
   $$\|\mathbf{w}^k - \mathbf{w}^{k-1}\| < \epsilon$$

2. **Function value criterion**: Stop when function evaluations no longer differ substantially:
   $$|g(\mathbf{w}^k) - g(\mathbf{w}^{k-1})| < \epsilon$$

3. **Maximum iterations**: Set a maximum number of iterations to prevent infinite loops

The tolerance $\epsilon$ and maximum iteration count are typically set based on computational constraints and desired precision.

### Example

```python
# import automatic differentiator to compute gradient module
from autograd import grad

# gradient descent function
def gradient_descent (g, alpha, max_its , w):

    # compute gradient module using autograd
    gradient = grad(g)

    # gradient descent loop
    weight_history = [w] # weight history container
    cost_history = [g(w)] # cost function history container
    for k in range( max_its ):

        # evaluate the gradient
        grad_eval = gradient (w)

        # take gradient descent step
        w = w - alpha* grad_eval

        # record weight and cost
        weight_history .append (w)
        cost_history .append (g(w))

    return weight_history , cost_history
```

## Two Natural Weaknesses of Gradient Descent

Like any vector, the negative gradient consists of both direction and magnitude. Depending on the function being minimized, either one of these attributes, or both, can present significant challenges:

### 1. Oscillating Direction Problem

The direction of the negative gradient can rapidly oscillate during optimization, often producing _zig-zag_ steps that take considerable time to reach minima. This occurs when:

- The condition number $\kappa = \frac{\lambda_{\max}}{\lambda_{\min}}$ is large
- The function has elongated contours (elliptical level sets)

**Mathematical insight**: For a quadratic function $g(\mathbf{w}) = \frac{1}{2}\mathbf{w}^T\mathbf{Q}\mathbf{w}$, the convergence rate is governed by:
$$\left\|\mathbf{w}^k - \mathbf{w}^*\right\| \leq \left(\frac{\kappa - 1}{\kappa + 1}\right)^k \|\mathbf{w}^0 - \mathbf{w}^*\|$$

### 2. Vanishing Gradient Problem

The magnitude of gradients can vanish rapidly at stationary points, leading to gradient descent crawling slowly near minima and saddle points. This manifests as:
$$\|\nabla g(\mathbf{w}^k)\| \to 0 \text{ as } \mathbf{w}^k \to \mathbf{w}^*$$

**Practical implications**: These problems are particularly prevalent in machine learning because many objective functions have:

- Long flat regions where contours become increasingly parallel
- High-dimensional parameter spaces with poor conditioning
- Complex loss landscapes with multiple local minima and saddle points

## Advanced Topics and Extensions

### Convergence Analysis for Convex Functions

For strongly convex functions with Lipschitz continuous gradients, gradient descent enjoys guaranteed convergence rates. Specifically, if $g$ is $\mu$-strongly convex and $L$-smooth, then:
$$g(\mathbf{w}^k) - g(\mathbf{w}^*) \leq \left(1 - \frac{\mu}{L}\right)^k [g(\mathbf{w}^0) - g(\mathbf{w}^*)]$$

This shows **linear convergence** with rate $\rho = 1 - \frac{\mu}{L}$.

### Line Search Methods

Instead of using a fixed step size, **line search** methods adaptively choose $\alpha^k$ at each iteration by solving:
$$\alpha^k = \arg\min_{\alpha > 0} g(\mathbf{w}^{k-1} - \alpha \nabla g(\mathbf{w}^{k-1}))$$

Popular line search conditions include:

- **Armijo condition**: $g(\mathbf{w}^k) \leq g(\mathbf{w}^{k-1}) - c_1 \alpha^k \|\nabla g(\mathbf{w}^{k-1})\|^2$
- **Wolfe conditions**: Armijo + $\nabla g(\mathbf{w}^k)^T \mathbf{d}^k \geq c_2 \nabla g(\mathbf{w}^{k-1})^T \mathbf{d}^k$

### Momentum and Acceleration

**Classical momentum** modifies the update rule to:
$$\mathbf{v}^k = \beta \mathbf{v}^{k-1} - \alpha \nabla g(\mathbf{w}^{k-1})$$
$$\mathbf{w}^k = \mathbf{w}^{k-1} + \mathbf{v}^k$$

**Nesterov acceleration** provides even better convergence rates:
$$\mathbf{w}^k = \mathbf{w}^{k-1} - \alpha \nabla g(\mathbf{w}^{k-1} + \beta(\mathbf{w}^{k-1} - \mathbf{w}^{k-2}))$$
