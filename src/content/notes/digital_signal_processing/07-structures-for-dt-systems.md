---
title: Structures for Discrete-Time Systems
author: Gautham Anne
order: 3
pubDatetime: 2025-09-25T12:00:00Z
description: Transfo
---

## Table of Contents

## Introduction

There is a direct correspondence from LTI systems with rational system function to LCCDEs. How do we implement with D-T analog or digital hardware: system function must be converted to algorithm/structure that can be realized in the desired technology

Some Assumptions:

- Recursive computation (initial rest conditions)
- IIR, cannot use convolution
- Not the only algorithm for implementation
- Equivalent structures
  - Different results when numerical precision is limited
  - Different number of additions, multiplications, and delays
- Basic Operations: adders, multiplications, and delays

## Direct Forms

### Direct Form I

- Can break system into two parts (cascades of two subsystems)
- Can rearrange systems without changing system function
- Obtain different computational algorithm for implementing the same system
- Cuts the # of registers in half

After merging the registers, we can obtain Direct Form II (Canonic Form):

Given a difference equation, we can find minimum # of registers to implement form. Finite precision => order is important.

Closed paths that return to node by folllowing arrows - a node variable in a loop depends directly or indirectly on itself

- Feedback loops are necessary, not sufficient, to generate IIR responses
- If no loops, longest delay = total # of delay elements
