---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: Firmware
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: STM Firmware
---

Firmware is mostly split into two parts: $\textbf{Frontend}$ and $\textbf{Backend}$. Frontend refers to the code that the user interfaces with, which is on a web server hosted on the ESP32. Backend refers to postprocessing and controls that result in data collection. On a high level, the user chooses the metrics and configurations of the scans through the website; the ESP32 forwards them to the Teensy microcontroller, which controls the electronics to raster the tip across the sample. The collected data is sent back to the ESP32, where it is ideally displayed on the website again for viewing. We were able to achieve motor control, tip control and piezo deformation, frontend-backend data link communication success, and GUI integration. While we did make significant progress to the firmware development as a whole, we were not able to collect line scans and post-process the line scans onto the GUI.

## Table of Contents

## Frontend

The complete data journey begins in the browser, travels through the ESP32's WebSocket stack, crosses a UART link, and finally lands inside the Teensy’s real-time interrupt that drives the piezoelectric scanners. When a user adjusts a control on the HTML/JavaScript frontend, the page serializes that action as a short ASCII command whose first two characters form a fixed opcode (EN, SS, KP, and so on), and whose optional numeric suffix encodes the parameter value in plain decimal. The browser delivers this string over a WebSocket connection to port 81 on the ESP32.

Inside the ESP32 firmware, the WebSocketsServer callback `onWsEvent()` fires on the network thread; it trims any stray whitespace, appends a line-feed (because the Teensy parser treats '\textbackslash n' as the end-of-command delimiter), and enqueues the result into a FreeRTOS queue called `teensyQueue` using `xQueueSend`. That queue holds up to ten String objects—more than enough headroom for a burst of rapid clicks—and because queue operations are atomic, the networking stack never blocks on UART I/O.

A dedicated task, `teensySenderTask`, is pinned to core 1, given a 4 kB stack, and assigned priority 1. In an infinite loop it sleeps inside `xQueueReceive`; as soon as a message appears it wakes, calls `Serial2.print(msg)`, and returns to the blocked state. UART2 is configured for 9600 baud, 8-N-1 framing, on GPIO 16 (RX) and 17 (TX), so one command byte departs every 104 \textmu s—far slower than Wi-Fi latency but plenty fast for human interaction. Because all UART writes originate from this single task, other FreeRTOS activities—file serving from SPIFFS, TCP maintenance, or Wi-Fi power-save beacons—cannot collide with the serial peripheral.

On the network side, the ESP32 frontend connects to a WPA2-Enterprise system such as `eduroam`. During setup, the firmware connects using PEAP credentials (`EAP\_IDENTITY`, `EAP\_USERNAME`, `EAP\_PASSWORD`), and allows the hardware to complete the EAP exchange. A watchdog timer resets the board if the association has not completed within approximately thirty seconds, preventing the system from hanging in areas with weak coverage. Once an IP lease is obtained, the code writes the address to the USB console, mounts SPIFFS, and starts the HTTP and WebSocket services.

The frontend logic is split across four small modules. `server.cpp` exposes the root route "/", which streams `/index.html` from SPIFFS, allowing webpage updates without reflashing. It also bootstraps a WebSocketsServer on port 81 and installs `onWsEvent()` as the text-frame handler. `tasks.cpp` then spins up two FreeRTOS jobs on core 1: `teensySenderTask`, which drains the queue and writes to Serial2, and an optional `serialTask` for the high-speed data link. The `loop()` function simply calls `ws.loop()` as all heavy lifting occurs in background tasks.

The HTML/JavaScript served from SPIFFS is minimal: buttons for "Enable Scan", "Disable Scan", "Engage Tip", sliders for PID gains and set-point, and a console window to reflect WebSocket activity. Each control emits a two-character opcode: e.g., clicking "Enable Scan" sends `EN`, while adjusting proportional gain sends `KP200`. These strings pass through the queue, UART, and reach the Teensy’s `serialCommand()` dispatcher. Responses are echoed back via WebSocket to confirm reception.

## Backend

On the Teensy 4.0, the main loop calls `checkSerial()` every iteration. This function reads full strings using `ESPSerial.readStringUntil('\textbackslash n')`, trims the string, and sends it to `serialCommand()`.

`serialCommand()` extracts the two-letter opcode and routes it accordingly. Configuration commands like `SS` (scan size), `LR` (line rate), and `IP` (pixels per line) pause scanning, update parameters via helper functions, and resume scanning if previously active. Shared variables are modified inside `noInterrupts()`/`interrupts()` blocks for atomicity. Simpler commands (`KP`, `KI`, `SP`, `SB`) update global variables directly. Actuator commands like `TE`, `TR`, and `MP`/`MN` invoke high-level routines for motor or piezo movement.

During scanning, the `incrementScan()` ISR fires every . It reads the 16-bit LTC2326 ADC, applies a logarithmic conversion to the tunnel current, performs the PI control loop, and updates 20-bit DAC targets for X, Y, and Z axes. These are dithered to 16-bit with a sigma--delta modulator, clamped, and sent via SPI to the DAC8814. Simultaneously, `zAvg` and `eAvg` are accumulated and written to either `data1` or `data2` (ping-pong buffers).

Each scan line includes 512 pixels 2 channels 4 bytes = 4096 bytes. Once filled, the ISR toggles buffers, raises `sendData`, and increments the line counter.

In the main loop, when `sendData` is true, the Teensy appends a two-byte line number, calculates a CRC-16 checksum (poly 0x8408, seed 0xFFFF), prepends a sync word (0xAA 0x55), and streams the resulting 8194-byte packet over UART. On the ESP32, `serialTask()` detects this packet via a two-byte sync automaton, verifies the CRC, and forwards valid data to the browser via `ws.binary()`.

Currently, only every 100th pixel is printed to the USB console, but in future, the entire payload can be rendered to a JavaScript typed array and visualized using WebGL or Canvas.

Three reliability features ensure robustness:

- FreeRTOS queues decouple WebSocket activity from UART transmission, absorbing latency.
- Ping-pong buffers allow uninterrupted ISR execution.
- Sync headers and CRC-16 allow re-synchronization and data integrity verification.

## Current Status and Next Steps

The firmware can move the tip, collect raw height/error values, and stream scan-line packets to the ESP32. However, live image rendering remains unimplemented. The missing step is a browser-side postprocessor that reconstructs packets into 2D arrays and applies a color map.

Once UART stability is confirmed at higher baud rates, the plan is to send each verified packet as a WebSocket binary frame. A simple JavaScript front-end will map the Z-values to grayscale and render the live scan. Completing this pipeline will finalize the STM's full firmware architecture, from user input to live imaging.
