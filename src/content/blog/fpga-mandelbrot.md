---
author: Gautham Anne
pubDatetime: 2025-10-25T20:48:34
title: Mandy, An FPGA-Based Mandelbrot Engine (Initial Thoughts)
featured: false
draft: false
tags:
  - digital design
description: Mandelbrot engine on an FPGA with HDMI output!
---

## Table of Contents

## Introduction

I've finally been able to find some time to try my hand at something I've wanted to build for a while: a real-time Mandelbrot renderer running entirely on an FPGA. Instead of floating-point math and shaders, this hardware perspective would allow me to build everything myself: fixed-point multipliers, squarers, escape-time logic, pixel-to-complex mapping, and eventually a VGA/HDMI output pipeline.

It’s basically turning a mathematical toy into a tiny hardware graphics engine. There are tons of software Mandelbrot explorers already (like <a href="https://math.hws.edu/eck/js/mandelbrot/MB.html">https://math.hws.edu/eck/js/mandelbrot/MB.html</a>), and a few FPGA attempts scattered across GitHub, but most of them are either super minimal proofs-of-concept or extremely optimized designs with almost no explanation. I wanted something in between — a clean, modular, fully understandable Mandelbrot engine that I can tweak, analyze, and eventually integrate into my larger graphics projects.

This first post focuses on the _idea_ and sets up the groundwork:

- what the Mandelbrot set actually is
- how the escape-time algorithm works
- how to translate the math into fixed-point hardware
- possible hiccups I'm wary of running into

Later posts will get into VGA/HDMI timings, fixed-point decisions, pipelining strategies, and my full Mandelbrot core.

## The Idea Behind the Mandelbrot Engine

Before touching Verilog, it’s worth understanding what the FPGA actually needs to compute. The Mandelbrot set is defined by a very simple iteration:

$$
z_{n+1} = z_n^2 + c,\quad z_0 = 0
$$

Here, each pixel on the screen corresponds to a complex value $c$. To determine its color, you iterate the formula and check whether the value “escapes.”

### Breaking it into real and imaginary parts

Let $z_n = x_n + i y_n$ and $c = a + i b$.  
Expanding:

$$
z_{n+1} = (x_n^2 - y_n^2 + a) + i(2 x_n y_n + b)
$$

So the FPGA no longer sees complex numbers — it just implements these two scalar recurrences:

$$
x_{n+1} = x_n^2 - y_n^2 + a
$$

$$
y_{n+1} = 2 x_n y_n + b
$$

The escape condition becomes:

$$
x_n^2 + y_n^2 > 4
$$

That’s it.  
All Mandelbrot rendering boils down to: multiplying, squaring, adding, and checking a threshold.

## Why Fixed-Point (and not floating point)

Most small FPGA's don't have built in floating point hardware. So instead of floats, everything is stored in a fixed-point format like Q3.13:

- 1 sign bit
- 2 integer bits
- 13 fractional bits

This keeps the multipliers simple and deterministic, and when you multiply 2 Q-format numbers:

- the product grows in bit-width
- you shift right to restore the original fixed-point scale
- and pipeline stays synchronus

## Mapping screen pixels to the complex plane

For a screen coordinate $(p_x, p_y)$, the FPGA computes:

$$
a = x_\text{min} + \frac{p_x}{W}(x_\text{max} - x_\text{min})
$$

$$
b = y_\text{min} + \frac{p_y}{H}(y_\text{max} - y_\text{min})
$$

where:

- $(x_\text{min}, x_\text{max})$ is the visible horizontal range
- $(y_\text{min}, y_\text{max})$ is the visible vertical range
- $W, H$ are the screen resolution

All of these constants are stored as fixed-point values too.

Choosing these ranges matters since they determine how many integer bits the fixed-point format needs, which affects multiplier widths, DSP usage, and timing.

## Design Choices: FP format, Pipeline Layout, and Hardware

### Picking a Fixed-Point Format

Every value in the Mandelbrot engine must fit inside a signed fixed-point format. However, the key question is "How many integer bits vs. how many fractional bits"..

Since the mandelbrot set mostly lives inside:

- $x \in [-2.5, 1.0]$
- $y \in [-1.5, 1.5]$

So we need enough integer range to represent about $\pm 3$. That suggests 2–3 integer bits are enough.

Fractional precision determines image clarity and how “smooth” the boundaries appear in deep zooms.

| Format    | Total Bits | Range | Fraction Resolution | Notes                             |
| --------- | ---------- | ----- | ------------------- | --------------------------------- |
| **Q3.13** | 16-bit     | ~±4   | $2^{-13}$           | Great balance, fits small FPGAs   |
| **Q4.12** | 16-bit     | ~±8   | $2^{-12}$           | Slightly more headroom            |
| **Q2.14** | 16-bit     | ±2    | $2^{-14}$           | Higher precision, narrow range    |
| **Q5.11** | 16-bit     | ~±16  | $2^{-11}$           | For extreme zooms or wide windows |

I figured Q3.13 provides a good range for the standard Mandelbrot view, high enough precisions for zooming capabilities, and multiplies the fit nicely into the 16x16 -> 32 bit DSP operations.

After each multiplication, we can simply bitshift right by 13 bits to restore scaling.

### Overflow and Saturation Strats

From playing around with various simulators and other implementations online, I learned multipliers will overflow internally if not controlled, and determined the following solutions:

1. **Wrap-around (default)**
   - Cheaper in logic
   - Works fine for Mandelbrot because escape decisions happen long before wrap-around causes issues

2. **Saturation**
   - Clamps outputs on overflow
   - Uses more LUTs, not usually needed

Most HDL Mandelbrot cores simply use the wrap-around method since the escape radius (4.0) is small and deterministic.

### Tang Nano 9k

I had a Tang Nano 9k on hand (from Alibaba, these are around $10!), but I figured it'd be pretty good for my uses:

It has

- 8 DSP blocks
- 9k LUTs
- a built-in HDMI transmitter (via DVI over PMOD), which has an _internal_ serializer that lets me outpiut TMDS signals without needing a seperate chip!
- Runs around 25-40 MHz! I plan to use a 640x480 and a 60f
- Small enough that it forces me to think about pipelining a bit more (can't just parallelize everything)

### Iteration Pipeline Architecture

Each pixel needs multiple multiplications and additions per iteration. A naïve design would take many cycles per iteration, but I plan to pipeline...

A typical pipeline stage diagram:

## Rendering Strategies: Iteration-Budget per Pixel

I have 2 main design strategies:

1. Per-pixel iteration engine (simple)

- For each pixel, run the whole iteration loop
- Store the escape count
- Move to the next pixel

Pro: simplest to code  
Con: cannot reach real-time frame rates unless iteration count is low (<64)

2. Multiple pixels in flight (pipelined engine)

- A new pixel enters the pipeline every few cycles
- Earlier pixels continue iterating in deeper pipeline stages

Pro: high throughput  
Con: harder finite-state machine & memory flow (but we got it eyy)

I want to be able to output at 640x480 at 60Hz (which is pretty standard). Standard VGA timing uses a pixel clock about

$$
f_\text{pixel} \approx 25.175\ \text{MHz}
$$
