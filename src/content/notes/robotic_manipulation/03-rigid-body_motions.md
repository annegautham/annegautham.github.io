---
title: Rigid Body Motions
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Foundations of Rigid Body Motions
tags:
  - Robotics
---

## Table of Contents

## Rotation Matrices and SO(3)

### The Special Orthogonal Group SO(3)

Rotation matrices belong to the **Special Orthogonal Group SO(3)**, which has the properties:

- $R^T R = I$ (6 orthogonality constraints)
- $\det(R) = 1$ (determinant constraint)
- Uses 9 numbers with 6 constraints - an **implicit representation**

**Group Properties**:

- **Associativity**: $(R_1 R_2) R_3 = R_1 (R_2 R_3)$
- **Non-commutativity**: Generally $R_1 R_2 \neq R_2 R_1$
- **Identity element**: $I$ exists
- **Inverse**: Every rotation has an inverse $R^{-1} = R^T$

### Orientation Representation Comparison

#### Quaternions

- **Type**: Implicit representation (4 numbers for 3D space)
- **Constraint**: Unit quaternion ($||q|| = 1$)
- **Pros**: No singularities, fewest numbers without singularities, easy interpolation
- **Cons**: Hard to understand, dual representation (antipodal quaternions represent same orientation)

#### Roll-Pitch-Yaw (Euler Angles)

- **Type**: Explicit representation (3 numbers - minimal)
- **Pros**: Minimum number of parameters, intuitive
- **Cons**: Singularities exist (gimbal lock)

#### Rotation Matrices

- **Type**: Implicit representation (9 numbers with 6 constraints)
- **Pros**: No singularities in representation
- **Cons**: Many parameters, "snapping back" to satisfy constraints is non-trivial

## Angular Velocities and so(3)

### The Lie Algebra so(3)

The space **so(3)** is the tangent space to SO(3) - it represents the space of angular velocities. Since velocities are local quantities, they do **not have singularities**.

Any rotational velocity can be represented as an angular velocity $\omega \in \mathbb{R}^3$, which is the product of:

- A unit axis of rotation
- A scalar speed

The relationship is: $\dot{x} = \omega \times x$

### Skew-Symmetric Matrix Representation

The cross product can be converted to matrix multiplication using the **skew-symmetric matrix** $[\omega]$:
$$\omega \times x = [\omega]x$$

where $[\omega]$ is the skew-symmetric matrix representation of $\omega$. The space so(3) is called the **Lie algebra** of the Lie group SO(3).

### Rate of Change of Rotation Matrices

The rate of change of a rotation matrix is found by **pre-multiplying** with the so(3) representation. Similar to the cancellation of subscripts in rotation matrices, we can change frames of velocity vectors.

## Exponential Coordinates and Axis-Angle Representation

### Exponential Representation

The **axis-angle representation** describes orientation as:

- **Axis**: Direction to rotate about
- **Angle θ**: How far to rotate

This represents the orientation of one frame relative to another.

### Differential Equations and Matrix Exponentials

**Scalar case**:
$$\dot{x} = ax(t) \rightarrow x(t) = e^{at}x_0$$

where $e^{at} = 1 + at + \frac{(at)^2}{2!} + \frac{(at)^3}{3!} + \cdots$

**Vector case**:
$$\dot{x} = Ax \rightarrow x(t) = e^{At}x_0$$

**Integrating angular velocity**:
$$\dot{p} = \omega \times p = [\omega]p \rightarrow p(t) = e^{[\omega]t}p(0)$$

This integrates the angular velocity to find position over both time and angular displacement.

### Rodrigues' Formula

There exists a **closed-form solution** for the matrix exponential known as **Rodrigues' Formula**.

### Matrix Exponential and Logarithm

**Exponential map**: $[\hat{\omega}]\theta \in \text{so}(3) \rightarrow R \in \text{SO}(3)$

**Logarithm map**: $R \in \text{SO}(3) \rightarrow [\hat{\omega}]\theta \in \text{so}(3)$

These mappings allow us to integrate angular velocities to find orientation in space over time, transitioning between different orientations rather than decaying or growing.

## Homogenous Transformation Matrices

Special Euclidean group (SE(3)), constists of a rotation matrix and a 3 vector of positions. T = [R p; 0 1], T^-1 = [RT -RTp; 0 1].

3 uses of HT matrices: Tab tells us where b is relative to a. 2) change a refernce frame of a vector or frame 3) Displace a vector or frame: T = (R,p) = Trans(p)Rot($\hat{\omega}, \theta$). Any rigid body transformation can be represented on a screw axis (linear speed + angular speed) -> pitch = linear / angular speed, and speed along the screw. If the pitch is infinite (then we dont neeed any angualar motion to advance linearly). Generalization of angular velcocity...

## Twists

- What is the instantaneous linwae morion of the whole frame. Linear velocty of origin ofa frame that will be refeerebcedd bu the frame.

if theta.dot = 1

Can use transformation to change framew of refernce of a framee.

Va - [Ad_td] as an adjoiner.

Twists are 6 vectors. se(3) is lie algebra of SE(3), the lset of all possible Tdot when T = I

### Important Concepts

- for a screw axis {q, shat, h}. The unit twist axis is so that he angular momemntum is hard to change due to precesssions'

Thw dimension of space of screws: 5.

Application: screw axis of Sb in kinova robot arm:

SB = [0 1 0 0 0 0]'

Ss = [0 1 0 9.8 0 0]'

J2: Sb = [0 0 1 0 0 -717.3]

Ss = [0 0 1 275.5 0 0]

### Wrenches and Transformations

Power is independent

F_b = [Adj_T_ab]^T \* F_a

Example 1:

R = [ 0 0 1
1 0 0
0 1 0 ]

p = (0 4 -2)'

T = [R p
0 1]

Sa = (0 0 1 0 0 5)'
Sb = (0 1 0 0 5 -4)'

Tab' = e^{[S_a]\theta} _ Tab = Tab _ e^{[S_b]\theta}

Tab' =
[0 0 -1 0
-1 0 0 4
0 -1 0 0.5
0 0 0 1
]
