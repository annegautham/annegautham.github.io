---
layout: detailpage
title: Low-Cost Electroencephalogram for Prediction of Neural Anomalies
description: Jul 2022 — Present
---

Under the mentorship of Professor George Verghese (MIT, Henry Ellis Warren Prof. of Electrical and Biomedical Engineering), I designed and implemented an electroencephalogram to predict neural anomalies. The project achieved both high accuracy and low cost with cost-effective components such as the AD622ANZ instrumentation amplifier and TL048x operational amplifier. 

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
![](/assets/images/portfolio/pcbSoldered.jpg)
<div class="caption">Due to powerline seepage, I designed and soldered a custom PCB to ensure the signal noise was as reduced as much as possible.</div>

<br>

![](/assets/images/portfolio/Heartbeat.png)
<div class="caption">Before studying brain signals, I decided to check if my circuit was functioning properly as an EKG/ECG (electrocardiogram). The above is a heartbeat recovered by my circuit from a patient.</div>

<br>

![](/assets/images/portfolio/gain.png)
<div class="caption">The final circuit performance: most gain present at 8-12 Hz, which is optimal, since alpha waves are in this range. Alpha waves were chosen to be recorded since they are prominently affected by seizures.</div>

<br>

![](/assets/images/portfolio/samplecode.png)
<div class="caption">Here's some extra sample code that applied a simple FFT on the incoming siganl and removed noise present from wire movement and galvanic skin frequencies (around 6 Hz).</div>

<br>

![](/assets/images/portfolio/sigVsim.png)
<div class="caption">In addition to making the circuit, I generated ictal (seizure state) signals noting the results of previous studies. The left figures are raw signals from non-ictal states recovered by my circuit, while the figures on the right are ictal simulations.</div>

<br>

![](/assets/images/portfolio/classifier.png)
![](/assets/images/portfolio/AUCcurve.png)
<div class="caption">I trained various classifiers (KNN, Logistic Regression, Stochastic Gradient Descent, Naive Bayes, Decision Tree, Random Forests, Gradient Boosting, Extremely Random Trees, and XGBoost) to differentiate simulated ictal states from recorded non-ictal states. Not much can be done to improve the prediction of the Extremely
Random Tree algorithm, but future work could attempt to optimize
hyperparameters.</div>

<br>

<FONT COLOR="RED"> Future work is centered on recording data from ictal patients and normalizing the Boston Children's Hospital Dataset to my circuit. In addition, an Arduino Uno (or any microcontroller with the atMega chip) may not have been the best choice, since the onboard ADC chip is known to be noisy. So, I'm integrating the circuit with a Raspberry Pi with an external ADC.

<br>

Finally, the current circuit is still subject to artifact signals unrelated to
the brain waves of interest. So, I'm currently studying the use of ICA to remove contamination of eye movement, blinks, muscle contractions, and EKG signal from the brain waves of interest. However, <a href="https://www.geeksforgeeks.org/ml-independent-component-analysis/">ICA</a> also assumes linear mixing of signals, which may make it less effective.

