---
author: Gautham Anne
pubDatetime: 2025-07-03T00:39:22
title: Design Description and Constraints
featured: false
draft: false
tags:
  - northwestern
  - scanning probe microscopy
description: Design Description and Constraints
---

This project presents the design and construction of a low-cost, air-operable Scanning Tunneling Microscope (STM) capable of sub-nanometer resolution. STMs detect quantum tunneling currents between a conductive tip and sample to image surfaces at atomic scale, but commercial systems are expensive and complex. Our goal was to build an educational STM for under \$300 using off-the-shelf components.

The system integrates three main subsystems: (1) custom PCBs including a ±15V Power Supply, Teensy 4.0-based Mainboard, low-noise Tunneling Amplifier, and an ESP32 Devkit for wireless GUI access; (2) a steel scan head with stepper-driven coarse approach and piezoelectric fine scanner; and (3) layered vibration isolation using springs, Viton damping, and eddy current brakes.

Firmware under development on the Teensy will control raster scanning, Z-axis feedback via PI control, and real-time image streaming to a PC. All of the subsystems are currently developed. We are currently in the process of debugging our Mainboard to raster across conductive samples. Parallel market research shows promise for educational and hobbyist use, with interest from students, teachers, and researchers.

We attempt to show that atomic-scale imaging is achievable with accessible hardware, offering a platform to explore quantum-scale phenomena.

- **Cost:** Our target budget was \$300, with an absolute ceiling of \$500. This extremely tight budget eliminated the use of expensive commercial components (such as piezo actuator stacks or a vacuum chamber) and mandated a do-it-yourself approach. For example, commercial STMs typically cost orders of magnitude more (\$20,000), but educational designs have demonstrated atomic-resolution operation under \$500. Consequently, we relied on low-cost materials and salvaged parts: repurposed piezo buzzer disks were used for tip positioning, and all mechanical parts were simple machined or off-the-shelf components. These choices minimized cost while still permitting tunneling measurements, at the expense of accepting compromises in actuator rigidity and overall performance.

- **Power Requirements:** The STM electronics were designed to run from a standard 115~VAC outlet, with internal transformers/regulators providing safe low-voltage rails for all analog and digital circuitry. Any high-voltage scheme (e.g.\ kilovolt-scale biasing) was explicitly avoided for safety and simplicity. In practice, our chosen piezo actuator (a large-displacement buzzer) operates on only ±15~V rather than the ±200~V typical of commercial piezo tubes. This allowed all servo and preamplifier circuits to remain at low voltages, eliminating the need for custom high-voltage power supplies and extensive insulation.

- **Performance Goals:** The STM was required to produce stable atomic-resolution images of highly-oriented pyrolytic graphite (HOPG) under ambient conditions. In contrast to UHV or cryogenic STMs, this removes vacuum and temperature requirements but places a priority on mechanical and electrical stability at room temperature. We therefore emphasized a very rigid scan head and robust vibration isolation. Vibration damping is known to be essential for STM operation. In our design, the scan head was mounted on spring-suspended plates with viscoelastic dampers to filter out building noise and ground motion. Even with a simpler low-cost actuator, these measures proved effective: a similar DIY STM design was able to image the hexagonal lattice of graphite at atomic resolution in air. In practice, ensuring clean HOPG cleavage and a sharp electrochemically-etched tungsten tip (coupled with careful cable shielding) was as important as the electronics for achieving the performance target.

- **Manufacturing and Tooling:** There were no formal size constraints (unlike a small vacuum chamber), so the design size was chosen for practicality and stiffness. However, fabrication was limited to the university’s machine shop resources (lathe, mill, drill press, waterjet). As a result, the scan head and support structures were designed as simple aluminum blocks and plates, easily cut and drilled by hand. For example, one DIY STM implementation describes making a two-inch aluminum scan block using only a hacksaw, drill press, and file. Precision adjustment screws and kinematic mounts were chosen to be off-the-shelf wherever possible. This hands-on fabrication approach (with no specialized CNC or EDM) dictated flat mating surfaces, straight holes, and conventional hardware, ensuring all parts could be produced within budget and on schedule.
