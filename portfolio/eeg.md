---
layout: detailpage
title: Low-Cost Electroencephalogram for Prediction of Neural Anomalies
description: Jul 2022 — Present
---

I designed and implemented an electroencephalogram to predict neural anomalies. Under the mentorship of Professor George Verghese (MIT, Henry Ellis Warren Prof. of Electrical and Biomedical Engineering), the project achieved both high accuracy and low cost with cost-effective components such as the AD622ANZ instrumentation amplifier and TL048x operational amplifier. 

<br>

My work is available <a href="https://www.techrxiv.org/articles/preprint/The_Design_and_Implementation_of_a_Low-Cost_Electroencephalogram_to_Predict_Neural_Disorders/21651470">here</a>.

<br>

<iframe height="600px" width="100%" src="/assets/documents/portfolio/EEG_Paper_Biomedical_Circuits_Transactions.pdf"></iframe>
<div class="caption">Paper submitted to IEE Transactions on Biomedical Circuits and Systems</div>

<br>

Signal processing software and hardware filters were implemented. I aim to make this design a closed loop system and BCI (BrainComputer-Interface) compatible. Most of the information required to design the device was self-studied from MIT OCW graduate courses taught by Professor Alan V. Oppenheim. Here are the links to the course home pages: <a href="https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/pages/introduction/">Signals and Systems</a> & <a href="https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/pages/introduction/">Digital Signal Processing</a>.

<br>

In addition, I supplemented the video lectures with <i><a href="https://www.amazon.com/Signals-Systems-Inference-Alan-Oppenheim/dp/0133943283">Signals, Systems, and Inference</a></i> by Professor Oppenheim and my mentor, Professor Verghese.

<br>

![](/assets/images/portfolio/schematic.jpg)
<div class="caption">Schematic of EEG. Electrode outputs to patient. Circuit powered by two 9V batteries, which unfortunately added to some powerline interference, requiring software filters.</div>

<br>

![](/assets/images/portfolio/10-20.png)
<div class="caption">Noninvasive gold plated electrodes are attached to the patients scalp at T7 and T8 locations shown above according to the 10-20 system.</div>

<br>

![](/assets/images/portfolio/breadboardprototype.jpg)
<div class="caption">3rd Breadboard prototype (unfortunately burned out 2 amplifiers prior). The green elastic (physiotherapy resistance band) holds the electrodes snug onto the patients head. Note that the serial battery packs are 3.7*2 = 7.4 V, not 9V as I designed in the schematic. This was due to powerline seeping in the breadboard, which I couldn't reduce.</div>

<br>

![](/assets/images/portfolio/PCB.png)
![](/assets/images/portfolio/pcbSoldered.png)
<div class="caption">Due to powerline seepage, I designed and soldered a custom PCB to ensure the signal noise was as reduced as much as possible.</div>

<br>



![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)
![](/assets/images/portfolio/breadboardprototype.jpg)

