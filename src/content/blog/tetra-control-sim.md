---
author: Gautham Anne
pubDatetime: 2025-11-15T10:19:26
title: 3D 'Tetrahedral' Cubli Simulation
featured: false
draft: true
tags:
  - control theory
description: Tetrahedral Cubli Simulation.
---

## Table of Contents

## Intro

In middle school, I stumbled across this video of a <a href="https://www.youtube.com/watch?v=n_6p-1J551Y/">cube</a> that, using internal reaction wheels, can balance on a vertice, 'jump', and walk around, and found it really cool. Now, as I'm taking ME 449 (Robotic Manipulation) at Northwestern, I realized that I may have the necessary prerequisite knowledge to attempt to design my own version.

Because we're quirky, I decided to make a tetrahedral version, which would 4 reaction wheels (one is redundant, I'll explain more later). This past week, I've just been reading te papers related to controls and hardware development of the project, and developed a simulation. This will be the first of a series of blogs that document my end-to-end journey! Hopefully, I don't quit prematurely :').

This post documents the entire mathematical and simulation framework I’m using before I begin designing the hardware (motors, wheels, drivers, and the FPGA/MCU control stack). I hope this post will help you understand how a balancing robot (inverted pendulums) works.

## What Is a Tetrahedral Cubli?

The original ETH Zürich **Cubli** was a cube that used **three internal reaction wheels** to:

- jump up from a resting position
- balance on an edge or corner
- perform controlled “walks”

A **tetrahedral Cubli** is the same idea, but with **four wheels**, one aligned with each face normal. It balances on a **single vertex**, lifting all other vertices into the air.

- 3D rotational dynamics
- 4 actuators for 3 DOF (redundant)
- non-minimum phase behavior
- large gravity torques about the upright vertex
- high-bandwidth motor control

Before designing hardwarre, we need a mathematical model, a linearized controller, and a nonlinear simulator to answer questiosn like:

- How much torque does each wheel need?
- How fast must the wheels spin?
- How much current, voltage, and battery power do we need?
- How quickly can we stabilize a disturbance?
- How should we place the wheels?

In addition, I'm avid fan of Gravity Falls, and realized I could theme this project around Bill Cipher (I find that maintaining a theme helps me stay motivated).

## Overview of Modeling Process

Here's the general roadmap I'm following

### Step 1 - Represent Orientation with Small-Angle Rotation Vector

For small disturbances, the attitude can be approximated by a 3-vector

$$
\phi = (\phi_x,\;\phi_y,\;\phi_z).
$$

### Step 2 - Write down the Physics

Including:

- body rotation, gravity
- reaction wheel torques
- motor current dynamics
- wheel intertia dynamics

### Step 3 - Build nonlinear diff equations

Wrote these in a function called `tetra3d_dynamics.m`.

### Step 4 - Linearize around the Upright Equalibrium

Because LQR needs:

$$
\dot{x} = A x + B u.
$$

I wrote `build_tetra3d_AB.m`

### **Step 5 — Design an LQR controller**

LQR solves:

$$
\min_u \int_0^\infty (x^T Q x + u^T R u)\, dt.
$$

Giving:

$$
u = -Kx.
$$

### **Step 6 — Run the nonlinear simulation**

Using:

```matlab
simulate_tetra3d_lqr.m
```

### **Step 7 — Extract actuator requirements**

Directly from the sim:

- peak torque
- wheel speed
- current
- voltage

### **Step 8 — Animate the tetrahedron**

Using:

```matlab
animate_tetra3d.m
```

# 3. State Representation

The full state vector is:

$$
x =
\begin{bmatrix}
\phi \\
\omega_b \\
\omega_w \\
i
\end{bmatrix}
\in \mathbb{R}^{14}.
$$

Where:

- \( \phi \in \mathbb{R}^3 \): small-angle rotation vector
- \( \omega_b \in \mathbb{R}^3 \): body angular velocity
- \( \omega_w \in \mathbb{R}^4 \): wheel speeds
- \( i \in \mathbb{R}^4 \): motor currents

Control input is motor voltage:

$$
u = V \in \mathbb{R}^4.
$$

# 4. Reaction Wheel Geometry

Wheel axes based on tetrahedron outward normals:

$$
S = [s_1\; s_2\; s_3\; s_4] \in \mathbb{R}^{3 \times 4}.
$$

Wheel torque:

$$
\tau_i = K_t i_i.
$$

Body feels:

$$
\tau_{\text{wheel}} = -S(K_t i).
$$

# 5. Dynamics

### 5.1 Attitude kinematics

$$
\dot{\phi} = \omega_b.
$$

### 5.2 Body rotational dynamics

Gravity torque:

$$
\tau_g = G \sin(\phi).
$$

Body ODE:

$$
J_b \dot{\omega}_b = G\sin(\phi) - S(K_t i).
$$

### 5.3 Wheel dynamics

$$
J_w\, \dot{\omega}_{w,i} = K_t i_i.
$$

### 5.4 Motor current dynamics

$$
L_m \dot{i}_i = -R_m i_i - K_e\omega_{w,i} + V_i.
$$

# 6. MATLAB Implementation

## 6.1 Build linear model

```matlab
[A, B, params3d] = build_tetra3d_AB();
```

## 6.2 Nonlinear dynamics

```matlab
dx = tetra3d_dynamics(t, x, params3d);
```

## 6.3 LQR closed-loop simulation

```matlab
simulate_tetra3d_lqr
```

Performs:

- LQR computation
- voltage saturation
- nonlinear ODE integration
- plotting
- extraction of torque/speed/voltage/current requirements
- animation

## 6.4 Animation

```matlab
animate_tetra3d(t, X, params3d);
```

# 7. Results

For a tetrahedron roughly 6 inches:

- Peak torque: ~1 N·m
- Wheel speeds: 600–800 rpm
- Voltage: 12 V
- Current: ~8–10 A
- Settling time < 1 s

This somewhat matches the parameters used in the original cubli!
