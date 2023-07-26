---
layout: detailpage
title: Elliptic Curve Cryptography Implementation
description: June 2023
---

For my final project in my Linux & Cybersecurity class, I developed an ECC Algorithm from scratch in Java. You can find the code <a href="https://github.com/annegautham/ECC">here</a>.

<br>

![](/assets/images/portfolio/nistcurves.png)
![](/assets/images/portfolio/nistpoints.png)
<div class="caption">Some NIST curves that I've programmed into the algorithm. They are a set of curves from the FIPS 186-3 standard that are recommended for US federal government use. They were chosen by repeatedly selecting a random seed, and then checking the resulting curve against known attacks
</div>


<br>

![](/assets/images/portfolio/mainframeoverview.png)
![](/assets/images/portfolio/mainframeKeyGen.png)
![](/assets/images/portfolio/mainframe1.png)
![](/assets/images/portfolio/mainframe2.png)
![](/assets/images/portfolio/mainframedecrypted.png)
<div class="caption">I developed a mainframe that allows the user to input paramters for the ECC (or choose from built in curves). The program generates private and public keys, which can be saved. For example, I encrypted and decrypted a txt file which contained "Hello I love linux, wink wink wink."</div>

<br>

![](/assets/images/portfolio/publicKey.png)
![](/assets/images/portfolio/privateKey.png)
![](/assets/images/portfolio/encrypted.png)
![](/assets/images/portfolio/decrypted.png)
<div class="caption">The generated public and private keys and the encrypted/decrypted messages.</div>
