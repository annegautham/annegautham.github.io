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

To determine whether a general single-input function $g(w)$ is convex or concave at a point, we check its curvature (or second derivative information at that point), assuming it is twice differentiable at that point. If the second derivative is greater than or equal to 0, or less than or equal to 0, then $g$ is said to be convex, or concave at $v$. For multi-input function, the analog is checking whether the Hessian of the function is positive-definite, positive semi-definite, or non positive-definite, relating to its eigenvalues.

More specifically, a stationary point $v$ of a multi-input function $g(\mathbf{w})$ is:

- a local (or global) minimum if all eigenvalues of Hessian are positive
- a local (or global) maximum if all eigenvalues of Hessian are negative
- a _saddle_ point if the eigenvalues are of mixed values (some negative, some positive)

## The Geometry of Second-Order Taylor Series

### The general shape of SI quadratic functions

The basic formula for a quadratic function with a single input takes the form $g(w) = a + bw + cw^2$, where $a$, $b$, and $c$ are all constant values controlling the shape of the function. In particular, the constant $c$ controls the convexity or concavity of the function.

### The general shape of MI quadratic functions

The multi-input quadratic function takes a form that is completely generalized from the single-input case, which can be written as
$$g(\mathbf{w}) = a + \mathbf{b}^T\mathbf{w} + \mathbf{w}^T C \mathbf{w}$$

where input $\mathbf{w}$ is $N$-dimensional, $a$ remains a constant, $\mathbf{b}$ is an $N \times 1$ vector, and $C$ being an $N \times N$ matrix (assuming symmetric for our purposes). Because this quadratic is defined along many dimensions, it can take on a wider variety of shapes than its single-input analog. The generalization of the single-input test for convexity/concavity is no longer whether the _values_ of $C$ are positive or negative, but rather whether the _eigenvalues_ of $C$ are positive or negative. If the eigenvalues are all nonnegative, the function is convex, if all nonpositive, the function is concave, if all 0, it reduces to a linear function that is both concave and convex, and otherwise (some positive, some negative), then it is neither concave nor convex.

## Local Curvature and Second-Order Taylor Series

Another way to think about local convexity/concavity of a function $g$ at a point is via its second-order Taylor approximation at that point, taking the form

$$h(w) = g(v) + \frac{d}{dw}g(v) (w-v) + \frac{1}{2} \frac{d^2}{dw^2} g(v)(w-v)^2$$

This is a true quadratic built using the first and second derivatives of $g$. Not only does the second-order approximation match the curvature of the underlying function at each point $v$ in the function's domain, but if the function is convex/concave at that point, then it is convex/concave _everywhere_. This concept holds analogously for multi-input functions as well, since the second order series approximation is given by

$$h(\mathbf{w}) = g(\mathbf{v}) + \nabla g(\mathbf{v})^T (\mathbf{w}-\mathbf{v}) + \frac{1}{2} (\mathbf{w}-\mathbf{v})^T \nabla^2 g(\mathbf{v}) (\mathbf{w}-\mathbf{v})$$

## Newton's Method

Since the first order Taylor series approximation yields the local optimization framework of gradient descent, it seems natural that higher order approximations may yield similar descent algorithms.

### Descent Direction

We can compute stationary points of quadratics easily using the first-order condition for optimality. To get $\mathbf{w}^*$ from
$$\mathbf{w}^* = \mathbf{v} - \frac{\frac{d}{dw}g(\mathbf{v})}{\frac{d^2}{dw^2} g(\mathbf{v})}$$
we move from $\mathbf{v}$ in the direction given by $-\frac{\frac{d}{dw} g(\mathbf{v})}{\frac{d^2}{dw^2} g(\mathbf{v})}$. This is formalized as

$$\mathbf{w}^* = \mathbf{v} - [\nabla^2 g(\mathbf{v})]^{-1} \nabla g(\mathbf{v})$$

This is direct analog of the single-input solution and reduces to it when $N = 1$. Thus, to get to stationary point $\mathbf{w}^*$, we move from $\mathbf{v}$ in direction given by $-[\nabla^2 g(\mathbf{v})]^{-1} \nabla g(\mathbf{v})$. Repeated travel to points defined by stationary point of the second order approximation. For convex functions, each quadratic approximation's stationary point seems to lower original function's evaluation, and could provide an efficient algorithm to minimize cost function - known as Newton's method.

### Algorithm

Repeatedly taking steps to stationary points of second order Taylor approximations of a function - at the $k$th step of this process for single input, we can make a second order approximation centered at $w^{k-1}$ as
$$h(w) = g(w^{k-1}) + \frac{d}{dw}g(w^{k-1}) (w-w^{k-1}) + \frac{1}{2} \frac{d^2}{dw^2} g(w^{k-1}) (w-w^{k-1})^2$$
and solve for its stationary point to update $w^k$ as

$$w^k = w^{k-1} - \frac{\frac{d}{dw}g(w^{k-1})}{\frac{d^2}{dw^2}g(w^{k-1})}$$

Not hard to determine a multi-input analog. Notice that Newton's update formula requires an inversion of an $N \times N$ Hessian matrix, where $N$ is the input dimension. However, in practice, $\mathbf{w}^k$ is found via solving the equivalent symmetric system of equations.

$$\nabla^2 g(\mathbf{w}^{k-1}) \mathbf{p} = \nabla g(\mathbf{w}^{k-1})$$

### Ensuring Numerical Stability

Newton's method can become unstable when:

- The Hessian $\nabla^2 g(\mathbf{w})$ is singular or nearly singular (poor conditioning)
- The Hessian has negative eigenvalues (non-convex regions)

**Common fixes:**

- **Regularization**: Add $\lambda I$ to Hessian: $(\nabla^2 g + \lambda I) \mathbf{p} = \nabla g$
- **Line search**: Use step size $\alpha$: $\mathbf{w}^{k} = \mathbf{w}^{k-1} - \alpha \mathbf{p}$
- **Trust region methods**: Limit step size within a "trusted" region

### Newton's method as a zero-finding algorithm

Newton's method is fundamentally a **root-finding** algorithm for $f(x) = 0$:
$$x^{k} = x^{k-1} - \frac{f(x^{k-1})}{f'(x^{k-1})}$$

For optimization, we apply it to find roots of the gradient: $\nabla g(\mathbf{w}) = 0$:
$$\mathbf{w}^{k} = \mathbf{w}^{k-1} - [\nabla^2 g(\mathbf{w}^{k-1})]^{-1} \nabla g(\mathbf{w}^{k-1})$$

This connection shows why Newton's method can converge to saddle points or maxima - it finds any stationary point where $\nabla g = 0$.

### Python Implementation

```python
import numpy as np

def newton_optimization(grad_func, hess_func, w0, max_iter=50, tol=1e-6):
    """
    Newton's method for optimization
    """
    w = w0.copy()

    for i in range(max_iter):
        grad = grad_func(w)
        hess = hess_func(w)

        # Check convergence
        if np.linalg.norm(grad) < tol:
            print(f"Converged after {i} iterations")
            break

        # Solve linear system instead of inverting
        try:
            p = np.linalg.solve(hess, grad)
            w = w - p
        except np.linalg.LinAlgError:
            print("Singular Hessian - adding regularization")
            p = np.linalg.solve(hess + 1e-6*np.eye(len(w)), grad)
            w = w - p

    return w

# Example: minimize f(x,y) = x^2 + 2y^2
def grad_example(w):
    return np.array([2*w[0], 4*w[1]])

def hess_example(w):
    return np.array([[2, 0], [0, 4]])

# Usage
w_opt = newton_optimization(grad_example, hess_example, np.array([1.0, 1.0]))
```

## Two Natural Weaknesses of Newton's Method

### Minimizing nonconvex function

For **nonconvex functions**, Newton's method has serious limitations:

- **Saddle points**: Can converge to points where $\nabla g = 0$ but function is neither minimum nor maximum
- **Negative curvature**: When Hessian has negative eigenvalues, Newton direction may be an ascent direction
- **Local minima**: May get stuck in poor local minima instead of global minimum

**Example**: For $g(x) = x^4 - 2x^2$, starting near $x = 0$ converges to the saddle point at $x = 0$ instead of global minima at $x = \pm 1$.

### Scaling Limitations

Newton's method becomes **computationally prohibitive** for large-scale problems:

- **Memory**: Storing $N \times N$ Hessian requires $O(N^2)$ memory
- **Computation**: Computing Hessian takes $O(N^2)$ operations per function evaluation
- **Linear solve**: Solving $\nabla^2 g \mathbf{p} = \nabla g$ takes $O(N^3)$ operations

**Practical limits**:

- Feasible for $N < 10^3$ to $10^4$ variables
- For larger problems, use **quasi-Newton methods** (BFGS, L-BFGS) that approximate Hessian with $O(N^2)$ or $O(N)$ storage

## Regularized Newton's Method

Close to stationary point, then have a 0/0 situation...
To address this, we add a small epsilon addition to the denominator $\epsilon$.

To avoid division by zero, we can do wk+1 = wk - (grad^2(g(w^k)) + epsilon I)^-1 grad(g(w^k))

(svd), this addititon takes eigen values of hessian and moves them by epsilon...

Assuming that positive semi definite, then by adding epsilon, it avoides the division by 0 (having a matrix that is not invertible - we regularize it by adding the epsilon...) - modified svd..

Taking the general expression for newton's methond and addition of epsilon, take the quadratic local approdximaiton in the n dimensinoal space and modify the approximation that gies same iteration formula...

Obtain modified newton (regularized) by changing 2nd order approximation -- h(w) = g(w^k) + grad g(w^k)(w-wk) + 1/2 (w-wk)^2 grad^2(g(w)) (w-wk) + epsilon/2 \* ||w-wk||^2 (the l2 norm squared) -> by adding this term, we obtain modifed newtons - tells us that w should be close to wk

In general the idea of minimization:

attempt to find minimum of h1(w), but for whatever reason, we instead want to minimize
min(h1(w) + epsilon/2 h2(w)) -> by adding the stabilizing/regularizng term.

Why regularize? May want to incorporate knowledge about solution, might want to avoid overfitting.

- Homework... take gradient of h set

h1 = w1^2 - w2^2, h2 = w1^2 + w2^2

## Dealing with Scaling

A: Hessian free methods, subsample the Hessian only keeping the diagonal values - decouples directions allong each coordinate...

B: Quasi-Newton Methods. (appendix A)

f(x2)-f(x1)/x2-x1 as approximation to derivative, and can do something simular by writing H(x2-x1) is approximately gradient of f(x2) - gradient of f(x1).
