---
author: Gautham Anne
pubDatetime: 2025-07-13T15:17:06
title: Matrix Multiplication with Systolic Arrays in SystemVerilog
featured: false
draft: false
tags:
  - digital systems design
description: Systolic array multiplication!
---

## Table of Contents

## Systolic Array Concept

We know how important matrix multiplication is for basically any system, whether you are fine-tuning an LLM or running a edge detection filter on an image, you are essentially multiplying matrices.

However, the standard algorithm ($C = A \times B$) is computationally expensive ($O(N^3)$). Worse, it is memory bandwidth bound. In a standard CPU architecture, you spend more time fetching the datafrom RAM than you do actually multiplying it. The _Systolic Array_ multiplication method solves this problem, and it is the architecture behind some of the newer 'TPU' and other AI accelerators. In this post, I'll attempt to break down how to implement one from scratch in SystemVerilog, as well as design a testbench to verify my design, and do synthesis in Synplify Premier for the Intel V Cyclone.

## Compute vs. Memory

In a standard processor, data travels back and forth by

- Fetching A from memory
- Fetching B from memory
- Multiplying
- Storing the result

In a systolic architecture, data flows like 'blood through a heart' (hence systolic), in which a data point is read from memoroy once, injected into a grid of procesors, and passes from neighbor to neighbor. A single memory read fuels $N$ different calculations.

## Architecture

There's several wasys to organize a systolic array. In my implementation `matmul.sv`, used an **Output Stationary** architecture.
This is how it works:

- The PEs are fixed: the hardware consists of an $N \times N$ grid of Processing Elements (PEs). The PE at position `(row, col)` is responsible for calculating the result $C_{row,col}$.
- Accumulator stays put: the partial sum sits inside the PE registers and growscycle by cycle. It never moves until the calculation is finished.
- Inputs Flow: Matrix $A$ 'flows' from left to right, and Matrix $B$ 'flows' from top to bottom, in which every clock cycle, a PE does 3 things simultaneously:
  - Takes $A$ from its left and $B$ value from its top.
  - It adds $A \times B$ to its local sum
  - It passes $A$ to its right neighbor and $B$ to its bottom neighbor.

### Skeing the Data

If we simply fed all of Matrix $A$ into the left side of the rray at the same time (Cycle 0), the math would actually break. I'll illustrate this with an example:

Consider $C_{0,1}$ (Row 0, Col 1). It needs to multiply $A_{0,0}$ by $B_{0,1}$.

- $A_{0,0}$ enters the array at Column 0 at time $T=0$.
- It takes 1 clock cycle to move to Column 1.
- Therefore, $A_{0,0}$ arrives at Column 1 at time $T=1$.

This means $B_{0,1}$ _must not_ enter the array at $T=0$. It has to wait until $T=1$ so it meets $A_{0,0}$ at the exact right moment.

To satisfy this for every cell, we must **skew** the input matrices into a diagonal "wavefront."

- Row 0 starts at $T=0$.
- Row 1 starts at $T=1$.
- Row 2 starts at $T=2$.

This ensures that all the $A_{i,k}$ and $B_{i,k}$ collide inside the PE $(i,j)$ at the correct clock cycle.

## Staging Buffers

Our FPGA stores matrices in BRAM. A standard BRAM is either single ported or dual ported, meaning we can only read 1 or 2 words per clock cycle. However, our $8 \times 8$ Systolic Array has 8 rows and 8 columns. TO feed the array continuously, we need to make supply 8 new words of $A$ and 8 new words of $B$ every clock cycle.

To solve this, I decided to make split the operation into two phases:

1. Loading Phase - we spend $N^2$ cycles reading Matrix A $N^2$ cycles reading Matrix B one word at a time from memory, storing them into local registers (`A_buf` and `B_buf`).
2. Compute Phase - once the data is locally cached, we have a sort of infinite bandwidth in the chip, where we can rad from all rows of `A_buf` simultaneously to supply to the systolic array. The implementation handles this as two states `LOAD_A` and `LOAD_B` in an FSM.

However, BRAMs have a read latency of one clock cycle. My state machine logic has to account for the pipeline stages as follows:

1. Cycle T: FSM issues Address 0 (count equals 1)
2. Cycle T+1: BRAM sees Address 0 and data is fetched internally.
3. Cycle T+2: Data 0 appears on `a_dout` and FSM is now at `count = 3`.

To write teh data to the correct location in the local buffer, I calcuate an index based on the current counter minus the latency delay:

```verilog
if (a_count >= 2) begin
    // We are at count 2, but the data arriving is from count 0 (Address 0)
    int idx = a_count - 2;
    A_buf[idx / N][idx % N] <= a_dout;
end
```

## Systolic Pulse

The entire operation is driven by a single signed integer counter, `t`. This represents the current time step of the systolic wave.

- **t starts at 0** when we enter the `SYSTOLIC` state.
- **t increments by 1** every clock cycle.
- **t ends at 3N - 2** (roughly 3 times the dimension of the matrix).

Why $3N$?

1.  It takes $N$ cycles for the "wave" to start on the first row and finally reach the last row.
2.  It takes $N$ cycles for data to propagate across the array.
3.  We need a buffer period to ensure the final partial sums effectively flush out.

Recall that we cannot feed all the rows simultaneously, so Row 1 must start 1 cycle later than Row 0.

We _could_ build a massive bank of shift registers to delay the inputs, but that seemed wasteful, so instead we can temporally index.

We calculate the buffer index dynamically based on the current time ($t$) and the row number ($r$).

```verilog
// Inside the SYSTOLIC state
for (int rr = 0; rr < N; rr++) begin
    // The "Skew" Equation
    kA = t - rr;

    // Only inject if the index is valid (within the matrix)
    if (kA >= 0 && kA < N)
        a_in[rr] = A_buf[rr][kA];
    else
        a_in[rr] = 0; // Inject zeros if outside the valid window
end
```
