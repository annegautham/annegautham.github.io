---
title: Semiconductors and Polymers
author: Gautham Anne
order: 4
pubDatetime: 2025-07-01T12:00:00Z
description: Classical theory of conduction, current density, and electron scattering mechanisms in metals
tags:
  - ssp
---

## Table of Contents

In some metals, the supply of metals is not enough to overcome the bandgap (filling electrons), so behaves like a normal metal. In an 'approximate' semiconductor, however, the fermi-level lies inside the bandgap itself.

Probability of occupation of an energy level in asemiconductor does not change, even in semi conductors...

However, there is no 'seat' for electrons to sit in in the band gap (density of states in bandgap is 0).

Semiconductors and Conductors have the 'same' exact physics. The Fermi-level is approximately in the middle of band, but there is a slight (negligible, for our purposes) deviation from the center due to the upper an d lower bands having a sllight difference in curvature.

At high temperature, silicon's semiconductor properties stops 'working'. Heating up semiconductors can decrease the size of bandgap (like in jet engine). In stead of silicon, we use diamond / silicon carbide at these regimes, where the band gap is increased so the semiconductor nature still exists. Photodetectors exist as their conductivity changes by light intensity.

## Polycrystalline Materials

### Growth Methods:

Single Crystal Czochralski Growth: melting of polysilicon doping - introduction of seed crytstal, beginning of crystal, crystal pulling, formed crystal with a residue of melted silicon (rotate wiring while pulling). If you cool down a boule too fast, then there will be defects (minimum thickness is 3rd of mm). Race - who can make bigger and bigger single crystals of silicon (used in high-end applications, such as solar cells in satellites). In other applications, no one has figured out a way to reduce cost of silicon single crystals.

## Conduction in Dielectrics

Dielectric materials are characterized by their ability to store electrical energy in an electric field while exhibiting minimal electrical conduction. However, under certain conditions, dielectrics can exhibit conduction mechanisms.

### Types of Conduction in Dielectrics

#### 1. Electronic Conduction

- Schottky Emission: Thermionic emission of electrons over potential barriers at metal-dielectric interfaces
- Poole-Frenkel Effect: Field-assisted thermal excitation of trapped electrons to the conduction band
- Fowler-Nordheim Tunneling: Quantum mechanical tunneling through triangular barriers at high electric fields

#### 2. Ionic Conduction

- Bulk Ionic Conduction: Movement of ions through crystal lattice defects or interstitial sites
- Interface Ionic Conduction: Enhanced ionic mobility at grain boundaries and interfaces
- Temperature Dependence: Follows Arrhenius behavior with activation energy

#### 3. Space Charge Limited Conduction (SCLC)

- Occurs when injected charge carriers exceed the intrinsic carrier density
- Current-voltage relationship: $J \propto V^2$ (for trap-free case)
- Important in thin film devices and organic electronics

### Breakdown Mechanisms

- Intrinsic Breakdown: Fundamental limit due to impact ionization
- Thermal Breakdown: Due to Joule heating and thermal runaway
- Electromechanical Breakdown: Mechanical failure due to electrostatic forces

## Conduction in Polymers

Polymers can exhibit a wide range of electrical properties, from highly insulating to highly conducting, depending on their molecular structure and processing.

### Classification of Polymers by Conductivity

#### 1. Insulating Polymers

- Examples: Polyethylene (PE), Polystyrene (PS), PMMA
- Conductivity: σ < 10⁻¹² S/cm
- Applications: Cable insulation, packaging, structural materials

#### 2. Semiconducting Polymers

- Examples: Polyacetylene, Polythiophene, Poly(p-phenylene vinylene) (PPV)
- Conductivity: 10⁻¹⁰ to 10² S/cm (depending on doping)
- Mechanism: π-conjugated backbone enables charge transport

#### 3. Conducting Polymers

- Examples: Doped polyacetylene, PEDOT:PSS, Polyaniline
- Conductivity: Up to 10⁵ S/cm
- Applications: Antistatic coatings, electromagnetic shielding, flexible electronics

### Charge Transport Mechanisms in Polymers

#### 1. Band Transport

- Conditions: High crystallinity, low temperature, high purity
- Characteristics: High mobility, temperature-independent at low T
- Mobility: Can exceed 1 cm²/V·s in high-quality organic single crystals

#### 2. Hopping Transport

- Variable Range Hopping (VRH): Mott's T^(-1/4) temperature dependence
- Nearest Neighbor Hopping: Thermally activated with Arrhenius behavior
- Polaron Transport: Formation of localized charge-lattice distortions

#### 3. Multiple Trapping and Release (MTR)

- Mechanism: Charge carriers trap and detrap during transport
- Characteristics: Dispersive transport, frequency-dependent mobility
- Applications: Understanding organic field-effect transistors (OFETs)

### Doping in Conjugated Polymers

#### p-Type Doping (Electron Acceptors)

- Dopants: I₂, FeCl₃, TCNQ, F4TCNQ
- Effect: Creates holes (positive polarons/bipolarons)
- Conductivity Enhancement: Several orders of magnitude increase

#### n-Type Doping (Electron Donors)

- Dopants: Alkali metals (Na, K), reducing agents
- Effect: Creates electrons (negative polarons/bipolarons)
- Challenges: Air sensitivity, limited stability

## Organic Light-Emitting Diodes (OLEDs)

OLEDs represent a revolutionary display and lighting technology based on the electroluminescence of organic compounds.

### OLED Structure and Operation

#### Basic Device Structure

```
Cathode (Al, Ca/Al, LiF/Al)
    ↓
Electron Transport Layer (ETL)
    ↓
Emissive Layer (EML)
    ↓
Hole Transport Layer (HTL)
    ↓
Hole Injection Layer (HIL)
    ↓
Anode (ITO, PEDOT:PSS)
    ↓
Substrate (Glass, Plastic)
```

#### Operating Principle

1. Charge Injection: Electrons from cathode, holes from anode
2. Charge Transport: Through respective transport layers
3. Exciton Formation: Electron-hole recombination in emissive layer
4. Light Emission: Radiative decay of excitons

### Types of OLED Emitters

#### 1. Fluorescent Emitters (First Generation)

- Mechanism: Singlet exciton emission
- Efficiency: ~25% internal quantum efficiency (IQE)
- Examples: Alq₃, NPD, TPD
- Advantages: Simple synthesis, good color purity

#### 2. Phosphorescent Emitters (Second Generation)

- Mechanism: Triplet exciton harvesting via heavy atom effect
- Efficiency: Up to 100% IQE
- Examples: Ir(ppy)₃, PtOEP, Ir(MDQ)₂(acac)
- Challenges: Triplet-triplet annihilation, roll-off at high brightness

#### 3. TADF Emitters (Third Generation)

- Mechanism: Thermally Activated Delayed Fluorescence
- Efficiency: Up to 100% IQE without heavy metals
- Examples: 4CzIPN, DACT-II, TXO-TPA
- Advantages: Pure organic, cost-effective, tunable emission

### OLED Performance Parameters

#### Efficiency Metrics

- External Quantum Efficiency (EQE): Photons out per electron in
- Current Efficiency: Luminance per current density (cd/A)
- Power Efficiency: Luminance per electrical power (lm/W)
- Color Rendering Index (CRI): Quality of color reproduction

#### Operational Stability

- T₅₀ Lifetime: Time for brightness to decay to 50% of initial value
- Degradation Mechanisms:
  - Chemical degradation of organic materials
  - Electrode migration
  - Moisture and oxygen ingress
- Encapsulation: Critical for device lifetime

### OLED Applications

#### Display Applications

- Smartphone Screens: Samsung AMOLED, Apple Super Retina
- Television Displays: LG OLED TVs, Sony BRAVIA OLED
- Wearable Devices: Smartwatches, fitness trackers
- Automotive Displays: Dashboard displays, taillights

#### Lighting Applications

- General Illumination: Panel lights, architectural lighting
- Decorative Lighting: Flexible and transparent panels
- Automotive Lighting: Taillights, interior ambient lighting

### Future Developments

#### Emerging Technologies

- Quantum Dot OLEDs (QD-OLEDs): Enhanced color gamut and efficiency
- Perovskite LEDs: Solution-processable, high efficiency
- Micro-OLEDs: Ultra-high pixel density for AR/VR applications

#### Manufacturing Innovations

- Inkjet Printing: Large-area, low-cost production
- Roll-to-Roll Processing: Flexible substrate manufacturing
- Laser Patterning: High-resolution pixel definition
