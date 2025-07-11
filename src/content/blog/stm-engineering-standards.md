---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: Engineering Standards
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: Engineering Standards
---

Engineering standards and protocols were systematically applied throughout the STM design to ensure safety, reliability, and interoperability. For example, we adhered to IPC (Institute for Printed Circuits) guidelines for PCB design, which are known to reduce errors and improve manufacturing consistency. By following such standards, the project aligned with industry best practices, minimizing defects and ensuring compatibility across components and suppliers.

## PCB Layout and Footprint Standards

The printed-circuit board layout followed established IPC standards. In particular, IPC-2221B (the Generic Standard on Printed Board Design) was used to set materials, trace width, spacing, and clearance rules. IPC-2221B defines minimum conductor spacing as a function of voltage to avoid dielectric breakdown or dendritic growth, so we sized trace gaps to meet its requirements even for low-voltage sections. This ensured robust insulation margins and reduced risk of arcing. IPC-2221B also covers thermal management (e.g. copper area for heat dissipation) and testability, helping to improve board quality. Compliance with these IPC rules reduced layout errors and enhanced overall PCB quality.

For land patterns and component pads, we applied IPC-7351 guidelines. IPC-7351 specifies optimum pad dimensions and ``courtyard'' clearances (minimum electrical and mechanical spacing) for SMD components. By using these standard footprints, every pad and solder-mask opening met IPC recommendations.

## Electrical Safety and Regulatory Compliance

Electrical safety guidelines were also considered. Although our STM operates at relatively low DC voltages, we designed the power system with reference to international safety standards. In the European context, the Low Voltage Directive (2014/35/EU) sets essential requirements for equipment operating between 50–1000V AC (75–1500V DC). By designing with adequate insulation, fusing, and creepage distances, we ensured compliance with this directive’s intent and made the device CE-marking ready. At a higher level, IEC 61010 (Safety Requirements for Electrical Equipment for Measurement and Laboratory Use) was consulted to mitigate hazards of shock, fire, or mechanical injury. IEC 61010 defines protective measures (double insulation, earth grounding, etc.) for lab instruments. Following it improved user safety (e.g. proper enclosure and grounding of any exposed metal) and reduced risk of accidental shock.

## Software Practices and Real-Time OS Design

On the firmware side, structured software practices were followed. The control software was partitioned into well-defined tasks under FreeRTOS, a widely-used real-time operating system. FreeRTOS is designed with an emphasis on reliability and a small footprint. Using FreeRTOS provided a robust, priority-based scheduler to manage the scanning loop, feedback control, and communication tasks deterministically. The RTOS enforced timing constraints and isolated tasks, reducing the chance of race conditions or priority inversion. We applied general embedded coding guidelines (akin to MISRA-style rules) to avoid undefined behavior and enforce consistent style, enhancing maintainability. FreeRTOS’s design (with proven robustness on 40+ architectures) gave us confidence that context switching and interrupt handling would be reliable under load. Overall, following FreeRTOS architecture and coding conventions increased firmware robustness and predictability.

## Communication Protocols

Standard communication protocols were used for inter-module interfaces to maximize compatibility:

- UART, I2C, SPI: We used universal bus protocols for on-board devices. UART (asynchronous serial) was used for debug consoles and simple point-to-point links. I\textsuperscript{2}C (two-wire serial) connected slow peripherals (temperature sensor) allowing multi-drop wiring. SPI (four-wire serial) was chosen for high-speed ADC/DAC comms. These protocols are ubiquitous in embedded systems due to their simplicity and ease of integration. Their use ensured that off-the-shelf modules (sensors, microcontrollers, etc.) could interface without custom protocols. For example, I\textsuperscript{2}C’s addressable bus supports multiple devices on shared lines, reducing wiring complexity, while SPI provides full-duplex high-throughput communication.
- Web Communication (HTTP/WebSocket): The user interface was implemented over TCP/IP using standard protocols. We used HTTP/1.1 for basic requests and a WebSocket connection for real-time feedback. WebSocket (RFC 6455) defines a bidirectional, low-latency communication channel over a single TCP connection. This protocol was chosen to enable the PC browser to receive live data and to send commands without repeatedly polling. Using WebSockets (with an initial HTTP handshake) ensures broad compatibility with web clients and allows interactive, event-driven data flow. Employing these standardized web protocols also facilitates future extensions (e.g. adding HTTPS or WebRTC) with minimal changes.

## Signal Integrity and EMC Practices

Signal integrity and EMI mitigation were critical because the STM measures very small currents. We implemented several hardware best practices:

- Ground and Power Planes: Each 4 PCB (except Power Supply) included a continuous ground plane. Solid ground planes provide a low-impedance return path, shielding signal traces from external interference. In practice, we routed sensitive analog signals on an inner layer adjacent to a ground plane to contain their fields. Copper pours (flood fills) were added around sensitive circuits and between digital and analog sections. These ground pours act as local planes, reducing noise coupling and creating uniform reference voltages. All grounds were tied at a single star point to minimize ground loops (though we found many conflicting opinions online)
- Guard Traces and Shielding: High-impedance nodes (such as the STM tip bias line) were flanked by grounded guard traces (a.k.a.\ guard rings). Guard traces run parallel to a signal line and capture leakage or interference before it reaches the node. This technique effectively confines electric fields, reducing crosstalk and external EMI on critical inputs. In some areas we also placed metal shielding cans or isolated compartments (grounded Faraday shields) over preamplifiers to block RF pickup.
- Decoupling: Decoupling capacitors (ceramic/film) were placed close to all IC power pins to suppress high-frequency noise. A ferrite bead was used on power supply lines to block EMI from noisy sources. These passive components form low-pass filters that keep switching noise out of sensitive areas. Together, these measures (ground planes, pours, guards, and decoupling) greatly improved signal fidelity and ensured the amplifier outputs remained stable.

## Mechanical & Assembly Standards

While we aimed to follow best practices in mechanical design, our build process leaned more toward iterative prototyping than strict adherence to standards. Many of the mechanical components—such as the scan head, vibration isolation system, and enclosure—were developed through rapid trial-and-error in the shop. Though we measured twice (or thrice) and cut once, many parts were adjusted on the fly based on fit, function, or material availability.

Despite this prototyping-heavy approach, we made conscious efforts to follow good conventions. For example, PCB and chassis connectors were selected to meet standard voltage and current ratings, and where mains power was involved, we used an IEC-compliant entry module with integrated fusing for safety. The jumper pins and test points on the PCB were silkscreen labeled (e.g. J1, TP2) and consistently referenced in the schematics, reflecting the practice of standard electronic documentation.

Cable harnesses were built using color-coded wires (for the most part, we actually had to use all blue wires for our power supply connections, leading to some happy debugging) guidelines to safely carry expected currents without excessive voltage drop or overheating. Mechanical fasteners (e.g., M2.5, M3, zipties) followed ISO metric sizing so we could interface with standard standoffs and mounting hardware. That said, some mechanical assemblies—particularly the steel scan head and vibration isolation frame—were fabricated using salvaged materials and whatever tooling was available at the time (manual lathe, vertical mill, CNC, hand filing).

Ultimately, while the result may not yet meet 'bulk' manufacturing or ISO 9001 quality standards, our janky mechanical design worked reliably. It was grounded in sound engineering practice—even if occasionally held together by hot glue, threadlock, and a bit of hope.
