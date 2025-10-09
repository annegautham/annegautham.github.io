---
title: Rigid Body Motions
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Forward Kinematics
tags:
  - Robotics
---

## Table of Contents

## Product of Exponentials Formula

For screw axes S expressed in {s}, the product of exponentials (PoE) in the space frame is:

$T(\theta) = exp([S1]\theta_1) ... exp([Sn]\theta_n) \cdot M$

Where M is the transformation Tsb(0) at the zero, or 'home', position (applying transformations from the most distal joint to the most proximal joint). For screw axes B expressed in {b}, the PoE is

$T(\theta) = M \cdot exp([B1]\theta_1)...exp([Bn]\theta_n)$

## Universal Robot Description Format

URDF is an XML file describing the kinematics, intertial properties, and geometry of a tree-structured robot (no closed loops).

Example RRRP:

[ 0 -1 0 19
-1 0 0 0
0 0 -1 -3
0 0 0 1
]

B1 = (0 0 -1 -19 0 0)
B2 = (0 0 -1 -9 0 0)
B3 = (0 0 -1 0 0 0)
B4 = (0 0 0 0 0 -1)

S1 = (0 0 1 0 0 0)
S2 = (0 1 0 0 0 0)
S3 = (0 0 1 0 0 0)
S4 = (0 1 0 -550 0 45)
S5 = (0 0 1 0 0 0)
S6 = (0 1 0 -910 0 0)
S7 = (0 0 1 0 0 0)
