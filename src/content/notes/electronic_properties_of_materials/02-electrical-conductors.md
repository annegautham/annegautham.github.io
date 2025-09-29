---
title: Electrical Conductors and Electronic Band Theory
author: Gautham Anne
pubDatetime: 2025-07-01T12:00:00Z
description: Comprehensive study of electrical conductors, electronic band theory, quantum mechanics of electrons in crystals, and the fundamental models describing electronic properties of materials
tags:
  - ssp
---

## Table of Contents

## Classification of Materials by Electrical Conductivity

### Fundamental Categories

Materials can be classified into four primary categories based on their electrical conductive properties:

#### 1. **Solids**

- **Metals**: High conductivity ($10^6 - 10^8$ S/m)
- **Semiconductors**: Variable conductivity ($10^{-6} - 10^3$ S/m)
- **Insulators**: Very low conductivity ($< 10^{-10}$ S/m)

#### 2. **Liquids**

- **Electrolytes**: Ionic conductivity
- **Liquid metals**: Electronic conductivity
- **Pure liquids**: Generally insulating

#### 3. **Gases**

- **Ionized gases**: Can be highly conductive
- **Most powerful electrical switches** due to rapid ionization/deionization
- **Plasma**: Fourth state of matter with free electrons and ions

#### 4. **Plasma**

- Fully ionized gas with equal numbers of positive and negative charges
- Extremely high conductivity approaching that of metals

### Historical Significance: The Germanium Case Study

The development of **germanium semiconductors** revolutionized electronics and radar technology:

- **Purity Requirements**: Small amounts of impurities (parts per billion) dramatically alter conductivity
- **Doping Effect**: Controlled addition of impurities can increase conductivity by orders of magnitude
- **Radar Technology**: Germanium diodes became essential components in radar receivers during WWII
- **Foundation of Electronics**: Led to the development of transistors and modern semiconductor devices

**Conductivity Range**: Pure germanium has resistivity ~0.5 Ω·m, but doped germanium can achieve resistivities as low as $10^{-4}$ Ω·m.

## Quantum Mechanical Description of Electrons in Crystals

### Fundamental Assumptions

The quantum mechanical treatment of electrons in crystalline solids is based on several key assumptions:

#### 1. **Non-Free Electron Model**

Electrons in crystals are **not free particles** but are constrained by the crystal structure and interactions.

#### 2. **Electrostatic Interactions**

Electrons experience complex electrostatic potentials from:

- **Lattice ions**: Coulomb attraction to positive nuclei
- **Other electrons**: Coulomb repulsion and exchange interactions
- **Core electrons**: Screening effects from inner shell electrons

#### 3. **Periodic Potential**

The total electrostatic potential has the same periodicity as the crystal lattice:
$$U(\mathbf{r}) = U(\mathbf{r} + \mathbf{R})$$
where $\mathbf{R}$ is any lattice vector.

#### 4. **Band Structure Solutions**

Solutions to the Schrödinger equation in this periodic potential yield **electronic band structures**, which determine all electronic properties of the solid.

### The Tight-Binding Approximation

#### Physical Foundation

The tight-binding model provides intuitive understanding of how atomic orbitals combine to form electronic bands:

**Isolated Atoms**: When atoms are far apart (>> 1 nm), electrons are localized around individual nuclei with discrete energy levels determined by atomic quantum mechanics.

**Crystal Formation**: As atoms approach each other to form a solid (typical spacing ~0.3 nm for semiconductors), several phenomena occur:

1. **Wavefunction Overlap**: Electron wavefunctions from neighboring atoms begin to overlap significantly
2. **Energy Level Splitting**: Each atomic energy level splits into multiple closely-spaced levels
3. **Band Formation**: With $N$ atoms, each atomic level splits into $N$ closely-spaced levels forming a continuous band

#### Mathematical Description

For a system of $N$ identical atoms, an atomic orbital $\phi(\mathbf{r} - \mathbf{R}_i)$ centered at site $\mathbf{R}_i$ combines to form Bloch states:

$$\psi_k(\mathbf{r}) = \frac{1}{\sqrt{N}} \sum_{i=1}^{N} e^{i\mathbf{k} \cdot \mathbf{R}_i} \phi(\mathbf{r} - \mathbf{R}_i)$$

**Energy Dispersion**: The energy becomes k-dependent:
$$E(k) = E_{\text{atomic}} - t\sum_{\delta} e^{i\mathbf{k} \cdot \boldsymbol{\delta}}$$
where $t$ is the hopping integral and $\boldsymbol{\delta}$ represents nearest-neighbor vectors.

#### Critical Interatomic Distance

**Equilibrium Spacing**: Most semiconductors form stable crystals at approximately **3 Å** (0.3 nm) interatomic spacing, representing an optimal balance between:

- **Attractive forces**: Coulomb attraction, covalent bonding
- **Repulsive forces**: Pauli exclusion, core electron repulsion

## Mathematical Framework: From Atoms to Bands

### Potential Energy Landscapes

#### Single Atom Potential

For an isolated atom, the potential energy is:
$$U_{\text{atom}}(r) = -\frac{Ze^2}{4\pi\varepsilon_0 r}$$
where $Z$ is the nuclear charge.

#### One-Dimensional Crystal Potential

For a 1D chain of atoms with lattice constant $a$:
$$U_{\text{crystal}}(x) = \sum_{n=-\infty}^{\infty} U_{\text{atom}}(x - na)$$

#### Simplified Model Potential

At the limit of zero interatomic distance, the potential approaches a constant value rather than diverging to $-\infty$, leading to the **nearly free electron model**.

### Wavefunction Solutions

The transition from atomic to crystalline wavefunctions involves:

1. **Atomic Wavefunctions**: $\psi_{\text{atomic}}(r) = R_{nl}(r)Y_l^m(\theta,\phi)$
2. **Linear Combinations**: Form Bloch states as linear combinations
3. **Exponential Modulation**: Include plane wave factors for momentum

## The Bloch Theorem: Foundation of Band Theory

### Statement of the Theorem

For a periodic potential $U(\mathbf{r}) = U(\mathbf{r} + \mathbf{R})$, where $\mathbf{R}$ is any lattice vector, the solutions to the Schrödinger equation have the form:

$$\psi_{n\mathbf{k}}(\mathbf{r}) = e^{i\mathbf{k} \cdot \mathbf{r}} u_{n\mathbf{k}}(\mathbf{r})$$

where $u_{n\mathbf{k}}(\mathbf{r})$ has the same periodicity as the lattice:
$$u_{n\mathbf{k}}(\mathbf{r} + \mathbf{R}) = u_{n\mathbf{k}}(\mathbf{r})$$

### Derivation and Physical Meaning

#### Schrödinger Equation with Periodic Potential

$$-\frac{\hbar^2}{2m}\nabla^2\psi + U(\mathbf{r})\psi = E\psi$$

#### Periodicity Condition

The key insight is that $U(\mathbf{r}) = U(\mathbf{r} + \mathbf{R})$ leads to:
$$\psi(\mathbf{r} + \mathbf{R}) = e^{i\mathbf{k} \cdot \mathbf{R}}\psi(\mathbf{r})$$

#### Decomposition of the Wavefunction

The Bloch wavefunction contains two independent components:

1. **Plane Wave Component**: $e^{i\mathbf{k} \cdot \mathbf{r}}$

   - Represents the **momentum** of the electron
   - Provides **translational symmetry**
   - **Slowly varying** on the scale of the lattice

2. **Periodic Component**: $u_{n\mathbf{k}}(\mathbf{r})$
   - Has the **periodicity of the lattice**
   - **Rapidly varying** on atomic scales
   - Determines the **band index** $n$

### Free Electron Limit

#### Special Case: Zero Potential

When $U(\mathbf{r}) = 0$, the Schrödinger equation becomes:
$$-\frac{\hbar^2}{2m}\nabla^2\psi = E\psi$$

#### Solution

The solution is a pure plane wave:
$$\psi(\mathbf{r}) = A_0 e^{i\mathbf{k} \cdot \mathbf{r}}$$

Substituting back:
$$-\frac{\hbar^2}{2m}(-k^2)A_0 e^{i\mathbf{k} \cdot \mathbf{r}} = EA_0 e^{i\mathbf{k} \cdot \mathbf{r}}$$

#### Dispersion Relation

This yields the free electron dispersion relation:
$$E = \frac{\hbar^2 k^2}{2m} = \frac{p^2}{2m}$$

#### de Broglie Relationship

The momentum-wavelength relationship is fundamental:
$$p = \frac{h}{\lambda} = \frac{h \cdot k}{2\pi} = \hbar k$$

#### Kinetic Energy

For free electrons, all energy is kinetic:
$$E_{\text{kinetic}} = \frac{p^2}{2m} = E - U = E \quad \text{(since } U = 0\text{)}$$

This **dispersion relation** connects momentum (or k-vector) to energy and is fundamental to understanding electronic properties.

## Kronig-Penney Model: Exact Solution for Periodic Potentials

### Model Setup

The Kronig-Penney model provides an exactly solvable example of electrons in a periodic potential, consisting of:

**Periodic Square Well Potential:**

```tikz
\begin{tikzpicture}[scale=0.8]
\draw[thick,->] (-4,0) -- (4,0) node[right] {$x$};
\draw[thick,->] (-4,0) -- (-4,3) node[above] {$U(x)$};

% Draw the periodic potential
\draw[thick,blue] (-4,0) -- (-3,0) -- (-3,2) -- (-2,2) -- (-2,0) -- (-1,0) -- (-1,2) -- (0,2) -- (0,0) -- (1,0) -- (1,2) -- (2,2) -- (2,0) -- (3,0) -- (3,2) -- (4,2);

% Labels for potential heights
\node[left] at (-4,2) {$U_0$};
\node[left] at (-4,0) {$0$};

% Width labels
\draw[<->] (-2,-0.3) -- (-1,-0.3);
\node[below] at (-1.5,-0.3) {$a$};
\draw[<->] (-3,-0.5) -- (-2,-0.5);
\node[below] at (-2.5,-0.5) {$b$};
\draw[<->] (-3,-0.7) -- (-1,-0.7);
\node[below] at (-2,-0.7) {$P = a + b$};

% Potential labels
\node[blue] at (-2.5,1) {$U_0$};
\node[blue] at (-0.5,1) {$U_0$};
\node[blue] at (1.5,1) {$U_0$};
\end{tikzpicture}
```

</script>
</div>

**Model Parameters:**

- **Potential Wells**: Width $a$, potential $U = 0$
- **Potential Barriers**: Width $b$, potential $U = U_0 > 0$
- **Period**: $P = a + b$

### Region-Specific Schrödinger Equations

#### Region I: Inside Wells ($0 < x < a$)

$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} = E\psi$$

Defining $\alpha^2 = \frac{2mE}{\hbar^2}$:
$$\frac{d^2\psi}{dx^2} + \alpha^2\psi = 0$$

**General Solution**:
$$\psi_I(x) = A\sin(\alpha x) + B\cos(\alpha x)$$

#### Region II: Inside Barriers ($-b < x < 0$)

$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + U_0\psi = E\psi$$

Defining $\beta^2 = \frac{2m(U_0 - E)}{\hbar^2}$ (assuming $E < U_0$):
$$\frac{d^2\psi}{dx^2} - \beta^2\psi = 0$$

**General Solution**:
$$\psi_{II}(x) = C e^{\beta x} + D e^{-\beta x}$$

### Boundary Conditions and Continuity

#### Continuity Requirements

1. **Wavefunction Continuity**: $\psi$ must be continuous at all interfaces
2. **Derivative Continuity**: $\frac{d\psi}{dx}$ must be continuous (ensuring current conservation)
3. **Bloch Periodicity**: $\psi(x + P) = e^{ikP}\psi(x)$
4. **Derivative Periodicity**: $\frac{d\psi}{dx}\Big|_{x+P} = e^{ikP}\frac{d\psi}{dx}\Big|_x$

#### Boundary Condition at $x = 0$

From continuity:
$$B = C + D$$
$$\alpha A = \beta(C - D)$$

#### Periodic Boundary Conditions

These lead to a system of four linear equations in four unknowns $(A, B, C, D)$.

### The Kronig-Penney Dispersion Relation

#### Final Result

After applying all boundary conditions and requiring non-trivial solutions, we obtain:

$$-\frac{\alpha^2 + \beta^2}{2\alpha\beta}\sin(\alpha a)\sinh(\beta b) + \cos(\alpha a)\cosh(\beta b) = \cos(k(a+b))$$

#### Physical Interpretation

- **Left Side**: Depends only on energy $E$ through $\alpha$ and $\beta$
- **Right Side**: Depends only on crystal momentum $k$
- **Constraint**: The right side must be between -1 and +1 for real solutions

#### Dimensionless Parameters

Introducing dimensionless variables:

- **Reduced Energy**: $\varepsilon = \frac{E}{U_0}$
- **Characteristic Parameter**: $\alpha_0 = \sqrt{\frac{2mU_0}{\hbar^2}}$

The dispersion relation becomes:
$$P(\varepsilon) = \cos(k(a+b))$$

where $P(\varepsilon)$ is the left-hand side expressed in terms of $\varepsilon$.

### Energy Band Structure

#### Allowed and Forbidden Bands

**Allowed Bands**: Energy ranges where $|P(\varepsilon)| \leq 1$

- Electrons can propagate with real $k$ values
- Form continuous energy bands

**Forbidden Bands (Band Gaps)**: Energy ranges where $|P(\varepsilon)| > 1$

- No real solutions for $k$
- Electrons cannot exist at these energies

#### Band Edge Conditions

- **Band Edge**: Where $P(\varepsilon) = \pm 1$
- **Band Center**: Where $P(\varepsilon) = 0$
- **Effective Mass**: Determined by curvature $\frac{d^2E}{dk^2}$ near band edges

### Connection to Real Materials

#### Limiting Cases

1. **Free Electron Limit** ($U_0 \to 0$):
   $$E = \frac{\hbar^2 k^2}{2m}$$

2. **Strong Potential Limit** ($U_0 \gg E$):

   - Tight-binding behavior
   - Narrow bands with large gaps

3. **Nearly Free Electrons** ($U_0$ small):
   - Band gaps open at Brillouin zone boundaries
   - Explains metal-insulator transitions

#### Physical Significance

The Kronig-Penney model demonstrates how:

- **Periodic potentials** naturally lead to **band structures**
- **Energy gaps** arise from **wave interference** effects
- **Electronic properties** depend on the **relationship between Fermi energy and band structure**

## Brillouin Zones and Band Structure

### Energy-Momentum Relations in Crystals

The **energy-momentum relation** $E(\mathbf{k})$ is only valid within specific regions of momentum space known as **Brillouin Zones**.

#### Brillouin Zone Definition

A **Brillouin Zone** is the primitive unit cell of the reciprocal lattice, constructed by:

1. Placing the origin at a reciprocal lattice point
2. Drawing vectors to nearest neighbor lattice points
3. Constructing perpendicular bisecting planes
4. The first Brillouin zone is the smallest volume enclosed by these planes

### Crystallographic Symmetry Points and Directions

#### Notation Convention

**Roman Letters**: Denote high-symmetry **points** in k-space
**Greek Letters**: Denote high-symmetry **directions** (lines) in k-space

#### FCC Brillouin Zone Structure

For face-centered cubic lattices (common in semiconductors), important symmetry points include:

- **Γ (Gamma)**: Zone center at $\mathbf{k} = (0,0,0)$
- **X**: Zone boundary points along principal axes
- **L**: Zone boundary points along face diagonals
- **K**: Zone boundary points along edges

### Direct vs. Indirect Band Gap Semiconductors

#### Direct Band Gap

**Condition**: The valence band maximum and conduction band minimum occur at the **same k-value**

- Usually both extrema are located at the Γ point
- **Examples**: GaAs, InP, GaN
- **Optical Properties**: Strong light absorption and emission

#### Indirect Band Gap

**Condition**: The valence band maximum and conduction band minimum occur at **different k-values**

- **Silicon**: Valence band maximum at Γ, conduction band minimum near X point
- **Germanium**: Valence band maximum at Γ, conduction band minimum at L point
- **Optical Properties**: Weaker optical transitions (require phonon assistance)

#### Significance for Electronic Devices

**Energy Bands**: Exist for all semiconductors, determining electrical and optical properties

**Band Gaps**:

- Present in semiconductors and insulators
- **Absent in metals** - this is why metals don't have energy gaps like semiconductors
