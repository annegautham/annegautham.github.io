---
title: Inverter Design
author: Gautham Anne
order: 0
pubDatetime: 2025-07-01T12:00:00Z
description: A simple inverter design in Cadence Virtuoso.
tags:
  - digital systems design
---

## Table of Contents

## Creating a Project

Cadence uses a file hierarchy systems to make project management simple. There are 3 levels:

- Libraries: Project File, contains any devices you create that need to be linked to each otehr
- Cells: Directory that holds all designs related to a specific component.
- Views: Different types of designs you have for each cell.

In this tutorial, I create schematic, hspice, symbol, and layout views for a cell.

## Building a Schematic

Using a create -> instance tool, select the NMOS_VTG from the NCSU_Devices_Library. VTG stands for generic transition voltage. PMOS: Width: 600 nm, Length 50 nm, NMOS: Width: 400 nm, Length: 50 nm. Choose symbol view and click in schematic window to place.

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)

![alt text](image-19.png)

![alt text](image-20.png)
![alt text](image-21.png)
![alt text](image-22.png)

![alt text](image-23.png)

![alt text](image-24.png)

![alt text](image-25.png)

![alt text](image-26.png)

![alt text](image-27.png)

![alt text](image-28.png)
