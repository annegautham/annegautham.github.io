---
author: Gautham Anne
pubDatetime: 2025-12-17T20:48:34
title: FPGA-Based Mandelbrot Engine
featured: false
draft: true
tags:
  - digital design
description: Using my previous HDMI driver for the Gowin GW1NR-9 FPGA, I wrote a couple verilog modules to render mandelbrot sets real time.
---

Recently I made a [lightweight HDMI Driver](/posts/nano9k-hdmi) implemented on the Gowin Tang Nano 9k. I'm working on making a Mandelbrot (and a more general fractal) engine. I found this idea on <a href="https://people.ece.cornell.edu/land/courses/ece5760/LABS/s2019/lab3_mandelbrot.html">Bruce Land's Cornell ECE 5760 Lab Site</a> and thought it would be fun to make.

## Table of Contents

## Limitations

Since I am running everything on the Tang Nano and not the standard DE-10 Nano board, I'm running into some fun challenges.

Specifically, the Mandelbrot math requires calculating $Z^2 = (Re+Im \cdot i)^2$. In hardware, this expansion $(Re^2-Im^2)+(2 \cdot Re \cdot Im)i$ requires 3 multipliers per iteration:

- `z_re * z_re`
- `z_im * z_im`
- `z_re * z_im`

The fundamental limitations are that

- Gowin's GW1NR-9 has 20 DSPs (Multipliers) as opposed to the 112 available on the DE-10. This means that the DE-10 can fit 30-40 pipeline stages, while the Tang Nano only fits 6.
- DE10 allows for massive unrolling, while Tang Nano requires efficient reuse, since the number of Logic Cells (LUTs) on the nano9k i s8,640, while the DE-10 has 110,000.
- DE10 can fit a 640x480 frame buffer inside the FGPA fast RAM since it has ~500KB (+1GB ext. DDR) of BRAM while the nano9k cannot (has ~58KB of BRAM).

## Baby's First Steps

Just to illustrate the output, I wrote `mandelbrot.v`, which is a 1st pass of a piplined (spatially unrolled) mandelbrot solver.

```verilog
module mandelbrot #(
    parameter MAX_ITER = 5,   // Limit to 6 to fit in Tang Nano 9K DSPs (20 total)
    parameter WIDTH = 10,
    parameter HEIGHT = 10
)(
    input wire clk,
    input wire rst_n,
    input wire [WIDTH-1:0] x,
    input wire [HEIGHT-1:0] y,
    input wire active,
    output reg [7:0] color
);

    // Q3.14 Format: 1 sign, 3 integer, 14 fraction.
    // 1.0 = 16384
    reg signed [17:0] c_re_init, c_im_init;
    reg active_init;

    // X Scale: (3.0 / 640) * 16384 = 76.8  -> Use 77
    // Y Scale: (2.4 / 480) * 16384 = 81.92 -> Use 82
    // X Offset: -2.0 * 16384 = -32768
    // Y Offset: -1.2 * 16384 = -19661
    always @(posedge clk) begin
        c_re_init <= (x * 18'sd77) - 18'sd32768;
        c_im_init <= (y * 18'sd82) - 18'sd19661;
        active_init <= active;
    end

    reg signed [17:0] z_re [0:MAX_ITER];
    reg signed [17:0] z_im [0:MAX_ITER];
    reg signed [17:0] c_re [0:MAX_ITER];
    reg signed [17:0] c_im [0:MAX_ITER];
    reg [4:0] iter_count [0:MAX_ITER];
    reg valid [0:MAX_ITER];


    always @(posedge clk or negedge rst_n) begin
        if(!rst_n) begin
            z_re[0] <= 0; z_im[0] <= 0;
            c_re[0] <= 0; c_im[0] <= 0;
            iter_count[0] <= 0; valid[0] <= 0;
        end else begin
            z_re[0] <= 0;
            z_im[0] <= 0;
            c_re[0] <= c_re_init;
            c_im[0] <= c_im_init;
            iter_count[0] <= 0;
            valid[0] <= active_init;
        end
    end


    genvar i;
    generate
        for (i = 0; i < MAX_ITER; i = i + 1) begin : stage
            // 18-bit * 18-bit = 36-bit Result (Q6.28 Format)
            wire signed [35:0] z_re_sq = z_re[i] * z_re[i];
            wire signed [35:0] z_im_sq = z_im[i] * z_im[i];
            wire signed [35:0] z_mix   = z_re[i] * z_im[i];

            // Divergence Check: (Re^2 + Im^2) > 4.0
            // 4.0 in Q6.28 format is (4 * 2^28) = 1,073,741,824
            wire divergence = (z_re_sq + z_im_sq) >= 36'sd1073741824;

            always @(posedge clk or negedge rst_n) begin
                if (!rst_n) begin
                    z_re[i+1] <= 0; z_im[i+1] <= 0;
                    c_re[i+1] <= 0; c_im[i+1] <= 0;
                    iter_count[i+1] <= 0; valid[i+1] <= 0;
                end else begin
                    // Pass C and Valid down the pipe
                    c_re[i+1] <= c_re[i];
                    c_im[i+1] <= c_im[i];
                    valid[i+1] <= valid[i];

                    if (!divergence) begin
                        // Z_next = Z^2 + C
                        // Shift Q6.28 down to Q3.14 (>>> 14)
                        z_re[i+1] <= ((z_re_sq - z_im_sq) >>> 14) + c_re[i];
                        z_im[i+1] <= ((z_mix <<< 1)       >>> 14) + c_im[i];
                        iter_count[i+1] <= iter_count[i] + 1;
                    end else begin
                        // Lock values if diverged
                        z_re[i+1] <= z_re[i];
                        z_im[i+1] <= z_im[i];
                        iter_count[i+1] <= iter_count[i];
                    end
                end
            end
        end
    endgenerate

    always @(posedge clk) begin
        // Output result
        color <= valid[MAX_ITER] ? {iter_count[MAX_ITER], 3'b000} : 8'h00;
    end

endmodule
```

### Coordinate Mapping

`c_re_init <= (x * 18'sd77) - 18'sd32768;`
This section converts my screen coordinates (from 0 to 640) into the complex number plane (roughly -2.0 to 1.0). It uses fixed point math (Q3.14), where 18'sd77 is the scaling factor (zoom level), and 18'sd32768 is my offset (panning to center of the image).

### Hardware Unrolling `generate` block

This is the part that currently kills my resources.

```verilog
genvar i;
generate
    for (i = 0; i < MAX_ITER; i = i + 1) begin : stage
        // ... instantiates hardware ...
    end
endgenerate
```

This tells the synthesizer to copy and paste the logic inside this block `MAX_ITER` times. If `MAX_ITER` is 5, it creates Stages 0 to Stage 4. Each stage requires 3 multipliers, so the totla cost is 15 multipliers. Tang Nano 9k has 20 multipliers, so my upper limit is currently `MAX_ITER` = 6.

### Math Engine

Inside each stage, I perform the standard Mandelbrot operation $Z_{n+1} = Z_{n}^2 + C$. I also bit shift `>>> 14` to normalize the fixed-point numbers after multiplication, since Q3.14 \* Q3.14 is Q6.28.

### Output
