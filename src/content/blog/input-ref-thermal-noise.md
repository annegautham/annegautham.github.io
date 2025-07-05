---
author: Gautham Anne
pubDatetime: 2024-09-05T03:29:22
title: Calculate Input Ref. Thermal Noise for Any Circuit!
featured: true
draft: false
tags:
  - thermal noise
  - mathematica
description: Some work I did at my UROP this past summer!
---

Hola peepsicles! So, a lot of what I was learning about this past summer revolved around optimizing circuit topology with respect to thermal noise. See my previous article for some more background!

Specifically, I spent time learning about various methods of circuit synthesis (Foster-Cauer synthesis, Multiport Synthesis - Brune's method, etc). Of course, much of my work was purely exploratory, and I spent most of my time developing the necessary mathematical tools to understand concepts. My advisor phrased it as learning to think 'precisely', which I've come to appreciate over the course of the summer.

This is a post explaining a script I made in Mathematica. It calculates the 'input-referred' thermal noise for any circuit with strictly passive elements (resistors, capacitors, inductors).

## Table of Contents

## TLDR & Usage

Will update with an example. For now:
![placeholder](@assets/images/placeholder.png)

## Introduction

In this post, I will dissect a Mathematica function `calcInputRefVNoise`, which computes the input-referred thermal noise Power Spectral Density (PSD) for an aribitrary circuit given its SPICE netlist. The code leverages principles of circuit graph theory using incidence (cutset) and admittance matrices to derive a symbolic expression for noise. I'll attempt to explain each part of the code in detail, assuming the reader has some background in circuit analysis and noise fundamentals.

## Parsing and Preprocessing the SPICE Netlist

The function first begins by importing and cleaning the SPICE netlist text:

```mathematica
fileContent = Import[filePath, "Text"];
lines = StringSplit[fileContent, "\n"];
netlistLines = Drop[lines, 1];
netlistLines = Drop[netlistLines, -2];
netlist = StringTrim[netlistLines];
```

The first and last two lines are dropped (often a title/comment in SPICE).

`StringTrim` is applied to remove and leading/trailing whitespace on each remaining line, and the remaining `netlist` is a list of cleaned strings, each representing one circuit element's definition in SPICE format. For example, `netlist` may look like

```mathematica
{"R1 1 2 1k", "C1 2 0 1u", "L1 2 3 5m", ...}
```

Each entry is a component definition that follows this convention: `{Name, Node1, Node2, Value}`.

## Tokenizing Components and Identifying Nodes

Next, the code tokenizes each netlist line into its constituent parts (component name, nodes, value, etc.) and gathers all unique node identifiers:

```mathematica
components = StringSplit[#, " "] & /@ netlist;
nodes = Union[Flatten[components[[All, 2 ;; 3]]]] // DeleteCases["0"];
nodes = Append[nodes, "0"];
nodeOrder = Association[Thread[nodes -> Range[Length[nodes]]]];
numNodes = Length[nodes];
```

- **Tokenization:** `components = StringSplit[#, " "] & /@ netlist` splits each line by spaces. This produces a list of lists. For example, `"R1 1 2 1k"` becomes `{"R1", "1", "2", "1k"}`. `components[[i]]` has the format `{Name, Node1, Node2, Value}` for each element.
- **Gathering nodes:** The code then extracts all node labels appearing in the second and third positions of each component definition (`components[[All, 2 ;; 3]]`). These correspond to the two nodes that each element connects. It uses Flatten to combine all node labels and Union to get unique node names. Then it uses `DeleteCases["0"]` to exclude the ground node `"0"` at first. In SPICE netlists, node `"0"` typically denotes the reference ground.
- **Reincluding GND:** After collecting all non-ground nodes, it appends `"0"` explicitly to the node list. This ensures the ground node is not repeated and is included as the last entry.
- **Node order mapping:** `nodeOrder` is an association (hash map) mapping each node name to an index (row number) in the incidence matrix to be constructed. We have numbered the nodes in order of the `nodes` list. The total number of nodes, including ground, is `numNodes = Length[nodes]`.

At this point, nodes might be something like `{"1", "2", "3", ..., "0"}`. The ground node "0" is placed at the end. The ordering is important later. By mapping node labels to indices, the code can easily reference matrix rows by node name.

## Incidence Matrix Construction (Node-Branch Matrix)

Using the node list, the code builds an **incidence matrix** that describes how each branch (component) connects to the nodes:

```mathematica
incidenceMatrix = ConstantArray[0, {numNodes, Length[netlist]}];
incidenceMatrix = Module[{incMat = incidenceMatrix},
  MapIndexed[(
      incMat[[ nodeOrder[#1[[1]]], #2[[1]] ]] = 1;
      incMat[[ nodeOrder[#1[[2]]], #2[[1]] ]] = -1;
    ) &, components[[All, {2, 3}]]];
  incMat
];
A = Most[incidenceMatrix];
```

- **Matrix dimensions:** We initialize `incidenceMatrix` as a `numNodes × B` zero matrix, where `B = Length[netlist]` is the number of branches (components). Rows correspond to nodes (including ground) and columns correspond to circuit elements.
- **Filling in +1 and -1:** The code iterates over each component’s node pair using MapIndexed. For each component (the iteration provides the node pair as `#1` and the component index as `#2`):
  - `#1[[1]]` is the first node of that component, `#1[[2]]` is the second node.
  - Using `nodeOrder`, it finds the row indices for these node names.
  - It sets the matrix entry at (row = first node, column = this component) to +1.
  - It sets the entry at (row = second node, column = this component) to -1.

After this, each column of the `incidenceMatrix` has exactly two nonzero entries: a +1 for the node where the branch current is considered to leave, and a -1 for the node where the branch current enters (based on an assumed orientation). All other entries are 0 (the branch is not incident on those nodes). This corresponds to a directed graph representation of the circuit: each branch is oriented from its first-listed node towards its second-listed node.

- **Reduced incidence matrix (A):** Finally, `A = Most[incidenceMatrix]` creates a reduced incidence matrix by dropping the last row (which corresponds to the ground node `"0"`). This is a standard step in network analysis: the full incidence matrix is singular (the sum of all rows is zero, since every branch leaving one node enters another). By removing the reference node, we obtain an $(n-1) \times B$ matrix $A$ that is full rank. This matrix $A$ acts as the fundamental cutset matrix for the circuit graph (each row can be viewed as a KCL equation for a non-ground node).

**A quick mathematical note:** The incidence matrix $A$ (after dropping ground) will have dimensions $(n-1) \times B$. If we treat branch currents as oriented according to the incidence signs, the matrix relates branch currents $\mathbf{i}_b$ to node currents (KCL) as $$i_n = Ai_b$$, where $\mathbf{i}_n$ is an $(n-1)$-vector of net currents injected into each non-ground node. Each row of $A$ enforces Kirchhoff’s Current Law (KCL) at that node: the sum of currents leaving the node (positive entries) minus the sum entering (negative entries) equals the net injection (which will be zero for passive branches unless an independent current source is connected).

## Computing Admittances and Thermal Noise of Components

The next portion of code defines a helper to obtain each component’s admittance (in the Laplace domain) and its thermal noise PSD, then applies it to all components:

```mathematica
admittanceAndNoisePowerMap[component_] := Module[{nestedAdmittances, nestedNoisePSDs,
                                                 name, value, componentType},
  name = component[[1]];
  value = ToExpression[component[[4]]];
  componentType = StringTake[name, 1];
  (* Determine the admittance and noise PSD based on the component type *)
  nestedAdmittances = Switch[componentType,
    "C", s*value,        (* Capacitance: Admittance = s C *)
    "R", 1/value,        (* Resistance: Admittance = 1/R *)
    "L", 1/(s*value)     (* Inductance: Admittance = 1/(s L) *)
  ];
  nestedNoisePSDs = Switch[componentType,
    "R", 4*value*k*T,
    "C", 0,
    "L", 0
  ];
  {nestedAdmittances, nestedNoisePSDs}
];
{admittances, noisePSDs} = Transpose[admittanceAndNoisePowerMap /@ components];
branchAdmittances = DiagonalMatrix[admittances];
```

- **Component type identification:** For each component (one element of the tokenized components list):
  - It extracts the name (e.g., "R1", "C2") and takes the first character to identify the type (componentType = "R", "C", "L", etc.). This assumes a naming convention where resistors begin with "R", capacitors with "C", inductors with "L" (standard in SPICE).
  - It also reads the value string (4th token) and converts it to an expression/number via ToExpression. So "1k" becomes 1000, "1u" becomes 1e-6, etc.
- **Admittance (nestedAdmittances):** Using a `Switch` on the type:
  - Resistor (R): Admittance $Y = 1/R$. (Assuming the value is resistance in ohms, the admittance is the reciprocal in Siemens.)
  - Capacitor (C): Admittance $Y = s C$. In the Laplace domain, a capacitance $C$ has admittance $sC$ (where $s = \sigma + j\omega$ is the complex frequency). This treats capacitors as frequency-dependent admittances.
  - Inductor (L): Admittance $Y = \frac{1}{s L}$. Inductors are the dual of capacitors in this sense (impedance $sL$, so admittance $1/(sL)$).

- **Thermal noise PSD (nestedNoisePSDs):** Using another `Switch`:
  - Resistor (R): Thermal noise is included. The code uses 4 _ value _ k _ T. Here value is $R$ (resistance in Ω), $k$ presumably is Boltzmann’s constant $k_B$, and $T$ is absolute temperature. Thus 4 _ R _ k _ T corresponds to the one-sided voltage noise power spectral density $S_{v} = 4 k_B T R$ (in units of V²/Hz) for a resistor. This is the well-known Johnson–Nyquist noise formula for a resistor’s open-circuit voltage noise, and I provide a derivation here.
  - Capacitor (C): 0. An ideal capacitor does not generate thermal noise on its own (any noise in a capacitor comes from resistive elements, which can be modeled as an ESR).
  - Inductor (L): 0. Ideal inductors similarly are lossless and do not contribute thermal noise.

**Note:** The code assumes a single global temperature T and Boltzmann constant k are defined in the environment. It treats each resistor’s noise as an equivalent series voltage noise source with PSD $4k_BTR$. I could equally have used an equivalent parallel current noise $4k_B T / R$, but using the series voltage model aligns with the transfer function approach.

- **Collecting results:** The function returns a pair `{admittance, noisePSD}` for each component. By mapping this over all components and transposing, we get two lists:
  - `admittances`: a list of admittance expressions (each may be a function of $s$) for each branch in the same order as `components`.
  - `noisePSDs`: a list of noise PSD values for each branch (numerical or symbolic, e.g., $4kT\cdot 1000$ for a 1kΩ resistor, or $0$ for reactive components).

- **Diagonal admittance matrix:** `branchAdmittances = DiagonalMatrix[admittances]` creates a diagonal matrix $\mathbf{Y}_{\text{branch}}$ of size $B \times B$, whose diagonal entries are the admittances of each branch. This matrix represents the admittance of each element (with zeros off-diagonal since we assume no mutual coupling between distinct branches in this analysis).

## Nodal Admittance Equations and Solving for Transfer Functions

With the incidence matrix $A$ and the branch admittance matrix in hand, the code constructs the system equations and derives a transfer function matrix $G$. This matrix $G$ relates each branch’s noise source to the node voltages:

```mathematica
(* Calculate the transfer function matrix G *)
G = -1 * Inverse[A . branchAdmittances . Transpose[A]] . A . branchAdmittances;
```

Recall that:

- $A$ is the $(n-1) \times B$ reduced incidence (node-to-branch) matrix.
- $Y_{\text{branch}}$ is the $B \times B$ diagonal matrix of branch admittances.
  Thus, the product $A Y_{\text{branch}}A^T$ produces an $(n-1) \times (n-1)$ nodal admittance matrix for the network, often denoted $Y_{\text{node}}$. In fact,

$$
Y_{\text{node}} = A Y_{\text{branch}}A^T
$$

This matrix represents the conductance connections between nodes (it’s the graph-theoretic formulation of Kirchhoff’s nodal equations). It is generally invertible.

Now, consider how a series voltage source in a branch affects node voltages. Suppose branch $k$ (connecting node $p$ to node $q$) has a small voltage source $v_k$ in series (for noise, $v_k$ is the random noise voltage). In nodal analysis, a series voltage source can be handled by introducing an equivalent current source injection at the nodes. A voltage $v_k$ across an admittance $Y_k$ will drive a current $i = Y_k , v_k$ through that branch. That current enters one node and leaves the other, effectively injecting current $+Y_k v_k$ into one node and $-Y_k v_k$ into the other. This can be represented by an injection vector equal to $Y_k v_k$ times the column of $A$ corresponding to branch $k$. In superposition terms, the effect of branch $k$’s noise on the node voltages can be solved via the nodal admittance matrix:

- KCL equation: $Y_{\text{node}}V_n = AI_{\text{inj}}$, where $I_{\text{inj}}$ is the vector of injected currents at nodes. For a series source in branch $k$, $I_{\text{inj}} = Y_kv_k \cdot a_k$, with $a_k$ the $k$th column of $A$.
- Solve for $V_n$: $V_n = Y_{\text{node}}^{-1}AI_{\text{inj}} = Y_{\text{node}}^{-1}A (Y_kv_k{e}_k)$, where $e_k$ is the unit vector for branch $k$.
- The contribution of branch $k$’s source to node voltages is thus $(Y_{\text{node}}^{-1} A Y)_\text{col k}v_k$. If we define $G(s) = Y_{\text{node}}^{-1} A Y(s)$, then the $k$th column of $G$ multiplied by $v_k$ gives the node voltage solution due to source $k$.

The code includes a prefactor of `-1`, which arises from sign conventions in KCL for a voltage source insertion. In the formulation $A$ already encodes a +1 and -1 for the two nodes of each branch. When we moved the known source to the right side of the KCL equations, it enters with a negative sign (since $I_{\text{inj}} = Y_k * (+v_k)$ at one node and $-Y_k * v_k$ at the other, effectively we are subtracting the effect of the source from the KCL sum). The `-1` in the code makes $G(s)$ correspond to the transfer function from a _positive_ series voltage as the first node of the branch of the node voltages.

Thus, $G(s)$ is an $(n-1) \times B$ matrix of transfer functions. Its entry $G_{i,k}(s)$ represents the influence of branch $k$’s series noise source on node $i$’s voltage (except ground). In other words, if the $k$th branch has a noise voltage $v_k(s)$, then the voltage at node $i$ due to this source alone is $G_{i,k}(s) \cdot v_k(s)$.

$$
G(s) = -(AY(s)A^T)^{-1}AY(s)
$$

where $Y(s) = Y_{\text{branch}}$. Each column $k$ of $G(s)$ is essentially $Y_{\text{node}}^{-1} (Y_k a_k)$, which matches the derivation above.

This procedure is a cutset-based approach where KCL is applied. The matrix $A$ (reduced incidence) is closely related to the fundamental cutset matrix of the circuit graph, enforcing KCL. An alternative would be a KVL mesh/loop analysis using fundamental tie-set (loop) matrix $B$ to enforce KVL. This approach would for loop impedance matrices. I chose the nodal analysis since it was bit more intuitive with regards to current injection from noise sources.

## Frequency Domain Conversion of Transfer Functions

After deriving the symbolic transfer function matrix $G(s)$, the code converts it to the frequency domain by substituting $s = j\omega$ (where $j = \sqrt{-1}$):

```mathematica
Giw = G /. s -> I*w;
```

At this point, `Giw` is ready to be used for computing noise spectral densities. I was interested in the magnitude of these transfer functions since noise PSD contributions depend on the squared magnitude of transfer gains (because power spectral density of the output due to a source is the input PSD times the gain magnitude squared, for linear systems).

```mathematica
GMSquared = # * Conjugate[#] & /@ Giw;
```

- This uses a pure function `# * Conjugate[#]&` mapped over each element of Giw. In effect, for each complex entry $X$ in $G(i\omega)$, it computes $X \cdot X^*$, which is $|X|^2$, the magnitude squared. The result GMSquared is a matrix of the same dimensions as $G$, but now all entries are real, non-negative functions of $\omega$.
- If `Giw` is an $(n-1)\times B$ matrix with entries $G_{i,k}(j\omega)$, then GMSquared is an $(n-1)\times B$ matrix with entries $|G_{i,k}(j\omega)|^2$.

## Summing Noies Contributions

Finally, the code combines the squared gains with each branch’s noise PSD to compute the total noise at each node (except ground). This uses the principle of superposition for independent noise sources (RSS addition):

```mathematica
inputRefNoisePSDs = FullSimplify[
  GMSquared . noisePSDs,
  Assumptions -> Flatten[{
    Element[w, Reals], Element[R, Reals], Element[L, Reals], Element[C, Reals],
    Table[Element[ToExpression[symbol <> ToString(i)], Reals], {symbol, {"R", "L", "C"}}, {i, 1, 100}]
  }]
];
(* Return the input-referred noise PSDs *)
inputRefNoisePSDs
```

- `GMSquared . noisePSDs` performs a matrix–vector multiplication. GMSquared is $(n-1) \times B$, and noisePSDs is a length-$B$ column vector (of each branch’s noise PSD). The result `inputRefNoisePSDs` is a vector of length $(n-1)$ (one entry for each non-ground node).

The $i$th element of

$$
\sum_{k=1}^{B} \left| G_{i,k}(j\omega) \right|^2 S_k,
$$

where $S_k$ is the PSD of the noise source in branch $k$. This sum represents the total noise PSD at node $i$, contributed by all independent noise sources in the circuit, assuming they are uncorrelated (which thermal noise sources are).

If we denote the noise PSD at node $i$ as $S_{V_i}(\omega)$:

$$
S_{V_i}(\omega) = \sum_{k=1}^{B} \left| G_{i,k}(j\omega) \right|^2 S_k,
$$

for $i = 1,2,\dots,(n-1)$, where $S_{k}$ is the PSD of branch $k$'s noise source (e.g. $4k_BT R_k$ for a resistor, or 0 for noiseless components).

## FullSimplify & Assumptions

The code then uses FullSimplify with a set of assumptions to simplify the resulting expressions for noise PSDs. The assumptions include:

- Element[w, Reals]: treat the frequency variable $\omega$ as real (which it is, being a frequency).
- Element[R, Reals], Element[L, Reals], Element[C, Reals]: presumably declare that symbolic $R, L, C$ (if present) are real-valued.
- A table of assumptions for symbols of the form R1, R2, ..., C1, C2, ..., L1, L2, ... up to 100, also as real. This suggests the code anticipates component names like R1, C5, L10, etc., and ensures those values are treated as real numbers (physical component values).

These assumptions help Mathematica simplify the algebraic form of the noise PSD. For example, if an expression contains $(j\omega)^2$ it can simplify to $-\omega^2$ under these assumptions, etc. The end result is a simpler symbolic expression or vector of expressions for the noise PSD at each node as a function of frequency and component values.

The function returns `inputRefNoisePSDs`. This is the vector of noise spectral densities at each node. Often in amplifier noise analysis, we are often interested in the noise referred to the input node. If the netlist is arranged such that the first node (after ground) is the input of the circuit, then the first element of this vector would be the input-referred noise PSD of the entire circuit. In general, the vector form allows us to see noise at multiple nodes if needed.

## Future Features

While I know circuit simulators definitely incorporate features like AC noise analysis, total output/input referred noise over a bandwidth, PSD plots, etc., I'm not sure to what extent they are 'customizable'. This function could be a good starting point to incorporate some cooler features, such as parameter sensitivity of noise ($\frac{\partial S}{\partial R}$), self-heating thermal feedback into noise, quantum noise, Fisher information / estimation theory tools.

## Complete Function

```mathematica
calcInputRefVNoise[filePath_] :=
  Module[{fileContent, lines, netlistLines, netlist, components,
    nodes, nodeOrder, numNodes, incidenceMatrix, A,
    admittanceAndNoisePowerMap, admittances, branchAdmittances,
    noisePSDs, G, Giw, GMSquared,
    inputRefNoisePSDs},(*Import the SPICE netlist file as text*)
   fileContent = Import[filePath, "Text"];
   (*Split the content into individual lines*)
   lines = StringSplit[fileContent, "\n"];
   (*Remove the first line and last two lines (comments)*)
   netlistLines = Drop[lines, 1];
   netlistLines = Drop[netlistLines, -2];
   netlist = StringTrim[netlistLines];
   (*Parse the netlist into components*)
   components = StringSplit[#, " "] & /@ netlist;
   (*Extract unique nodes from the components,
   excluding the ground node "0"*)
   nodes =
    Union[Flatten[components[[All, 2 ;; 3]]]] // DeleteCases["0"];
   nodes = Append[nodes, "0"];
   nodeOrder = Association[Thread[nodes -> Range[Length[nodes]]]];
   numNodes = Length[nodes];
   incidenceMatrix = ConstantArray[0, {numNodes, Length[netlist]}];
   (*Incidence matrix based on the connections between nodes*)
   incidenceMatrix =
    Module[{incMat = incidenceMatrix},
     MapIndexed[(incMat[[nodeOrder[#1[[1]]], #2[[1]]]] = 1;
        incMat[[nodeOrder[#1[[2]]], #2[[1]]]] = -1;) &,
      components[[All, {2, 3}]]];
     incMat];
   A = Most[incidenceMatrix];
   (*Define a function to compute branch admittances and noise power s\
pectral densities (PSDs)*)
   admittanceAndNoisePowerMap[component_] :=
    Module[{nestedAdmittances, nestedNoisePSDs, name, value,
      componentType}, name = component[[1]];
     value = ToExpression[component[[4]]];
     componentType = StringTake[name, 1];
     (*Determine the admittance and noise PSD based on the component t\
ype*)nestedAdmittances =
      Switch[componentType, "C", s*value,(*Capacitance:Admittance=sC*)
       "R", 1/value,(*Resistance:Admittance=1/R*)
       "L", 1/(s*value)(*Inductance:Admittance=1/sL*)];
     nestedNoisePSDs =
      Switch[componentType, "R", 4*value*k*T, "C", 0, "L",
       0]; {nestedAdmittances, nestedNoisePSDs}];
   {admittances, noisePSDs} =
    Transpose[admittanceAndNoisePowerMap /@ components];
   branchAdmittances = DiagonalMatrix[admittances];
   (*Calculate the transfer function matrix G*)
   G = -1*
     Inverse[A . branchAdmittances . Transpose[A]] . A .
      branchAdmittances;
   Giw = G /. s -> I*w;
   (*Calculate|G|^2,the squared magnitude of the transfer function*)
   GMSquared = #*Conjugate[#] & /@ Giw;
   inputRefNoisePSDs =
    FullSimplify[GMSquared . noisePSDs,
     Assumptions ->
      Flatten[{Element[w, Reals], Element[R, Reals], Element[L, Reals],
         Element[C, Reals],
        Table[Element[ToExpression[symbol <> ToString[i]],
          Reals], {symbol, {"R", "L", "C"}}, {i, 1, 100}]}]];
   (*Return the input-referred noise PSDs*)
   inputRefNoisePSDs];
```
