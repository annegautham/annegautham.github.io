---
layout: detailpage
title: Facial Recognition Laser Turret
description: Aug 2020
---

Inspired from a Michael Reeves video, I decided to build a laser turret that fires at specific people (my roomate!) utilizing OpenCV contouring. Code and imagery available <a href="https://github.com/annegautham/FacialRecog_LaserTurret">here</a>.

<br>

![](/assets/images/portfolio/laserturretSchematic.png)
![](/assets/images/portfolio/overallLaserTurret.jpg)
![](/assets/images/portfolio/insideLaserTurret.jpg)
![](/assets/images/portfolio/laserPanTilt.jpg)
<div class="caption">Schematics and various views of crude contraption. It's a basic prototype of my even more advanced project, Sleep Detection Water Turret. Essentially, the hardware is a USB camera mounted to a pan tilt servo mechanism and a laser diode. All of this is powered by an Arduino.</div>

<br>

'''
import cv2
import serial,time
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap=cv2.VideoCapture(0)

ArduinoSerial=serial.Serial('com3',9600,timeout=0.1)

time.sleep(1)

while cap.isOpened():
    ret, frame= cap.read()
    frame=cv2.flip(frame,1)  #mirror the image
    #print(frame.shape)
    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    faces= face_cascade.detectMultiScale(gray,1.1,6)  #face detection
    for x,y,w,h in faces:
        #sending coordinates to Arduino serial
        string='X{0:d}Y{1:d}'.format((x+w//2),(y+h//2))
        print(string)
        ArduinoSerial.write(string.encode('utf-8'))
        #plot the center of the face
        cv2.circle(frame,(x+w//2,y+h//2),2,(0,255,0),2)
        #plot the roi
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,0,255),3)
    #plot the squared region
    cv2.rectangle(frame,(640//2-30,480//2-30),
                 (640//2+30,480//2+30),
                  (255,255,255),3)
    #out.write
    cv2.imshow('img',frame)
    

    # press q to quit
    if cv2.waitKey(10)&0xFF== ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
'''

<br>

<div class="caption">Python code that transmits servo adjustment values to Arduino over serial port. Essentially, the camera tracks distance from center of face to the center of frame, which is relayed to pan tilt mechanism. Had to calibrate based on distance face was to the camera.</div>

<br>


#includeServo.h

Servo x, y;
int width = 640, height = 480;  // total resolution of the video
int xpos = 120, ypos = 140;  // initial positions of both Servos
int laserPin = 11;
int buzzerPin = 8;
void setup() {
  Serial.begin(9600);
  x.write(xpos);
  y.write(ypos);
  x.attach(9);
  y.attach(10);
  pinMode(laserPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

const int angle = 3;   // degree of increment or decrement

void loop() {
  if (Serial.available() > 0)
  {
    int x_mid, y_mid;
    if (Serial.read() == 'X')
    {
      x_mid = Serial.parseInt();  // read center x-coordinate
      if (Serial.read() == 'Y')
        y_mid = Serial.parseInt(); // read center y-coordinate
    }
  // Adjusting Servo
    if (x_mid > width / 2 + 30)
      xpos += angle;
    if (x_mid < width / 2 - 30)
      xpos -= angle;
    if (y_mid < height / 2 + 30)
      ypos -= angle;
    if (y_mid > height / 2 - 30)
      ypos += angle;


    // if the servo degree is outside its range
    if (xpos >= 180)
      xpos = 180;
    else if (xpos <= 0)
      xpos = 0;
    if (ypos >= 180)
      ypos = 180;
    else if (ypos <= 0)
      ypos = 0;

    x.write(xpos);
    y.write(ypos);
    fire();
    }
}
'''
void fire(){
    digitalWrite(laserPin, HIGH);
    tone(buzzerPin,2200);
    tone(buzzerPin,1000);
    tone(buzzerPin,500);
    tone(buzzerPin,200);
    tone(buzzerPin,500);
    delayMicroseconds(10000);
    noTone(buzzerPin);
    delayMicroseconds(10000);
    tone(buzzerPin,2200); 
    tone(buzzerPin,1000);
    delayMicroseconds(10000);
    noTone(buzzerPin);
    delayMicroseconds(10000);
    tone(buzzerPin,100); 
    delayMicroseconds(10000);
    noTone(buzzerPin);
    delayMicroseconds(10000);
    tone(buzzerPin,100); 
    delayMicroseconds(10000);
    noTone(buzzerPin);
    delayMicroseconds(10000);
}
'''

<br>

<div class="caption">Simple Arduino script to move servos to position values received from serial port. Fire() function defines buzzer and laser activation inspired from Star Wars effects.</div>