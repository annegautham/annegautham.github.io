---
title: Foundations of Robot Motion
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Foundations of Robot Motion
tags:
  - Robotics
---

## Table of Contents

# Configuration Space

## Degrees of Freedom of a Rigid Body

In mechanical systems (and sometimes in electrical analogs), we often ask:  
**Where is the system located, and how is it oriented?**

The answer is expressed in terms of **degrees of freedom (DOFs)**: the minimum number of independent real-valued parameters required to specify the system’s configuration.

For robots, which we treat as assemblies of **rigid bodies**, these bodies are connected by **joints (or links)**. Because the bodies are rigid, only a small number of parameters is needed to fully describe their configuration.

The collection of all possible configurations is called the **configuration space (C-space)**, and its dimension is the number of degrees of freedom.

## Translational vs. Angular DOFs in $N$ Dimensions

There are two common ways to count DOFs for a rigid body in $N$-dimensional Euclidean space:

**Method 1 (classical counting):**

- The first point requires $N$ parameters.
- The second point requires $N-1$ (it must be distinct but constrained by the first).
- Continue down to $1$, for a total of
  $$
  \frac{N(N+1)}{2}
  $$
  DOFs.

Since $N$ of these are translational, the remaining

$$
\frac{N(N+1)}{2} - N = \frac{N(N-1)}{2}
$$

are angular DOFs.

**Method 2 (pairwise intuition):**

- A rigid body always has $N$ translational DOFs.
- Each angular DOF is defined by a plane spanned by two independent translation directions.
- Therefore, the number of angular DOFs is simply
  $$
  \binom{N}{2}.
  $$

Example: In 5D space, there are

$$
\binom{5}{2} = 10
$$

angular DOFs, in addition to the 5 translational ones.

## Grübler’s Formula

For general mechanisms, the **Grübler-Kutzbach criterion** provides the DOF count:

$$
\text{DOF} = m \, (N - 1 - J) + \sum_{i=1}^J f_i,
$$

where:

- $m$ = number of DOFs of an unconstrained rigid body (6 in 3D space, 3 in planar motion).
- $N$ = total number of links (including the ground).
- $J$ = number of joints.
- $f_i$ = degrees of freedom allowed by the $i$-th joint.

## Common Joint Types (3D Space)

- **Revolute (R):** 1 DOF
- **Prismatic (P):** 1 DOF
- **Helical (H):** 1 DOF
- **Cylindrical (C):** 2 DOF
- **Universal (U):** 2 DOF (two revolute joints with orthogonal axes)
- **Spherical (S):** 3 DOF

## Important Notes

- Constraints between two planar rigid bodies reduce DOFs based on relative motion limitations.
- Discrete states (e.g., “heads” or “tails”) are not DOFs — DOFs must be **continuous real parameters**.
- $P$ is sometimes used to denote the number of **controllable DOFs** (those actuated by inputs).

## Example: The Human Arm

The human arm (considering the **hand as a rigid body**) has **7 degrees of freedom**:

1. **Shoulder joint** – 3 DOFs (spherical)

   - flexion/extension
   - abduction/adduction
   - internal/external rotation

2. **Elbow joint** – 1 DOF

   - flexion/extension

3. **Forearm (radioulnar joint)** – 1 DOF

   - pronation/supination

4. **Wrist joint** – 2 DOFs
   - flexion/extension
   - radial/ulnar deviation (abduction/adduction)

**Total = 7 DOFs**

Another way of thinking about it is by supposing you 'fix' your hand to a grounded surface, like a table. Since your arm can still move, it must have more than 6 degrees of freedom. In particular, it can only move in one way, so 6 + 1 is 7.

From Grubler's formula, we have N = 5, m = 6, J = 7 => $6(5 - 1 - 7) + \sum_{i=1}^J f_i = 7$, so sum of freedoms provided by the joints is 25. In addition, constaints imposed by joints is $6\cdot4 - 7 = 17$.

## Spaces and Representations

### Charts and Atlases

**Charts** are local coordinate representations that handle singularities better than global representations. **Singular points** are locations where certain properties are not well-defined.

Multiple charts together form an **atlas**, providing complete coverage of the space. In general, we describe configuration spaces using more coordinates than strictly necessary, then subject them to appropriate constraints.

## Types of Constraints

### Holonomic vs. Nonholonomic Constraints

**Holonomic Constraints**: If there are $N$ coordinates and $k$ independent holonomic constraints, they reduce an $n$-dimensional configuration space to $(n-k)$ degrees of freedom.

**Pfaffian Constraints**: Constraints on velocity, such as $A(\theta)\dot{\theta} = 0$. These are **nonholonomic** if the velocity constraints do not restrict the configuration space itself.

### Task Space vs. Workspace

**Task Space**: The space in which a task is most naturally represented, independent of the specific robot design.

**Workspace**: The specification of the reachable space for a particular robot configuration.

### Representation Types

**Implicit Representation**: Uses more parameters than necessary (overcomplete)
**Explicit Representation**: Uses minimal parameters for complete description

## Example: Differential Drive Robot

Consider a differential drive robot with non-slip wheel constraints:

### System Analysis

1. **Controls**: The robot has **2 control inputs** - the left and right wheel speeds
2. **Velocity Constraints**: There are **3 Pfaffian constraints** on the system velocities
3. **Constraint Classification**:
   - **1 nonholonomic constraint**: No-slip rolling condition
   - **2 holonomic constraints**: Wheel-ground contact conditions

This constraint structure determines the robot's motion capabilities and planning requirements.
