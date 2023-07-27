---
layout: detailpage
title: Phouse, A Phone controlled Cursor
description: March - July 2022
---

After forgetting my computer mouse multiple times to robotics practices, where I'd need them for CAD (3D computer aided design), I decided to program an application that allows me to use my iPhone as a mouse! See the scripts <a href="https://github.com/annegautham/Phouse">here</a>!

<br>

Because I was relatively inexperienced with IOS app development (Swift), I attempted to use existing infrastructure. So, I stumbled upon <a href="https://phyphox.org/">Phyphox</a>, an IOS application that records phone sensor values. The sensors I decided to use were the onboard accelerometers, gyroscope, and magnetometer. 

<br>

![](/assets/images/portfolio/phouseoverall.png)

<br>

Phyphox allows the user to view the data real-time through an IP address (connected to same WiFi). The data exported to the url address is in the form of .json packets. I created a python script that translates raw accelerometr data received from the IP to mouse coordinates using the pyautogui library.

<br>

![](/assets/images/portfolio/accelero.png)

<br>

```python
import math
import pyautogui
import requests
import time
import json
from numpy import interp

pyautogui.FAILSAFE = False
IP = 'http://' + input("Enter IP Adress from PhyPhox: ")
IP_pos = ['accX', 'accY']
dt = 14
i = 1
k=1

def myround(x, base):
    return base * round(float(x) / base)

def move(x, y, t):
    pyautogui.moveRel(x, y, t)

while 1 == 1:
    i=1
    posXvals = [0]
    posYvals = [0]
    accXvals=[]
    accYvals=[]
    while i <= 1:
        url = IP + '/get?' + '&'.join(IP_pos)
        data_json = requests.get(url=url, timeout=5).json()
        acc_x_str = json.dumps(data_json['buffer']['accX']['buffer'])
        acc_y_str = json.dumps(data_json['buffer']['accY']['buffer'])
        acc_x_str = acc_x_str[1:-1]
        acc_y_str = acc_y_str[1:-1]
        acc_x_new = ''.join(acc_x_str)
        acc_y_new = ''.join(acc_y_str)
        acc_x_float_m = -1 * float(acc_x_new)
        acc_y_float_m = float(acc_y_new)
        myround(acc_x_float_m,0.25)
        myround(acc_y_float_m,0.5)

        if abs(acc_x_float_m) <0.525:
            acc_x_float_m = 0
        if abs(acc_y_float_m) < 0.525:
            acc_y_float_m = 0    

        acc_x_float_px = acc_x_float_m * k
        acc_y_float_px = acc_y_float_m * k
        accXvals.append(acc_x_float_px)
        accYvals.append(acc_y_float_px)
        i+=1

    for a in accXvals:
        posXvals.append(posXvals[-1] + 0.5 * a * dt ** 2)

    for b in accYvals:
        posYvals.append(posYvals[-1] + 0.5 * b * dt ** 2)
    print(posXvals)
    print(posYvals)
    absPosition = math.sqrt(posXvals[len(posXvals)-1]**2 + posYvals[len(posYvals)-1]**2)
    move(posXvals[len(posXvals)-1],posYvals[len(posYvals)-1],interp(absPosition,[0,1768],[0,0.68]))
```

<br>

Unfortunately, double integrating the accelerometer data does not perfectly translate into position coordinates! I'll never forget the +C on integration problems again. I tried 3 different versions with accelerometer datasets by applying a Gaussian buffer to the data to approximate the position of the mouse. While the results were better, they did not hold up to the precision standards required for CAD.

<br>

Thus, I transitioned into using gyroscope and magnetometer data, which was much more promising, since they relied on orientation and do not require integration steps, where the error is significantly multiplied.

<br>

```python
import pyautogui
import requests
import time
import json

pyautogui.FAILSAFE = False
IP = "http://CLASSIFIED HEE HEE HEE HAW"
IP_pos = ['magX', 'magY']
k=10
t=0.1
def move(x, y, t):
    pyautogui.moveRel(x, y, t)

while 1 == 1:
        url = IP + '/get?' + '&'.join(IP_pos)
        data_json = requests.get(url=url, timeout=5).json()

        gyr_x_str = json.dumps(data_json['buffer']['magX']['buffer'])
        gyr_y_str = json.dumps(data_json['buffer']['magY']['buffer'])
        gyr_x_str = gyr_x_str[1:-1]
        gyr_y_str = gyr_y_str[1:-1]
        gyr_x_new = ''.join(gyr_x_str)
        gyr_y_new = ''.join(gyr_y_str)
        gyr_x_float_m = float(gyr_x_new)-27.75
        gyr_y_float_m = -1* (float(gyr_y_new)+8)

        if abs(gyr_x_float_m)<12:
            gyr_x_float_m = 0
        if abs(gyr_y_float_m)<20:
            gyr_y_float_m =0

        pos_x = gyr_x_float_m * k
        pos_y = gyr_y_float_m * k
        move(pos_x,pos_y,t)
```
<br>
<div class="caption">Gyro script!</div>
<br>

```python
import pyautogui
import requests
import time
import json

pyautogui.FAILSAFE = False
IP = "http://CLASSIFIED HEE HEE HEE HAW"
IP_pos = ['magX', 'magY']
k=10
t=0.1
def move(x, y, t):
    pyautogui.moveRel(x, y, t)

while 1 == 1:
        url = IP + '/get?' + '&'.join(IP_pos)
        data_json = requests.get(url=url, timeout=5).json()

        gyr_x_str = json.dumps(data_json['buffer']['magX']['buffer'])
        gyr_y_str = json.dumps(data_json['buffer']['magY']['buffer'])
        gyr_x_str = gyr_x_str[1:-1]
        gyr_y_str = gyr_y_str[1:-1]
        gyr_x_new = ''.join(gyr_x_str)
        gyr_y_new = ''.join(gyr_y_str)
        gyr_x_float_m = float(gyr_x_new)-27.75
        gyr_y_float_m = -1* (float(gyr_y_new)+8)

        if abs(gyr_x_float_m)<12:
            gyr_x_float_m = 0
        if abs(gyr_y_float_m)<20:
            gyr_y_float_m =0

        pos_x = gyr_x_float_m * k
        pos_y = gyr_y_float_m * k
        move(pos_x,pos_y,t)
```
<br>
<div class="caption">Magnetometer script!</div>
<br>

![](/assets/images/portfolio/gyro.png)
![](/assets/images/portfolio/magno.png)

<br>

However, the user now has to rotate the phone into various orientation to move the mouse around, which can take a bit of getting used to, especially if your iPhone mouse is just a temporary solution. Furthermore, the Phyphox only transmits data from one sensor at a time, so adding a 'right and left click' feature or a 'scroll button' is pretty much impossible. 

<br>

<FONT COLOR="RED"> So, I decided to take what I've learned and develop an IOS application that integrates all of these features. The work is still in progress, but bluetooth connection to the computer is a key component of the app. I'm expecting to release it by December 2023. Stay tuned!