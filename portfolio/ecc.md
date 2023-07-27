---
layout: detailpage
title: Elliptic Curve Cryptography Implementation
description: May 2023
---

For my final project in my Linux & Cybersecurity class, I developed an ECC Algorithm from scratch in Java. You can find the code <a href="https://github.com/annegautham/ECC">here</a>.

<br>

![](/assets/images/portfolio/nistcurves.png)
![](/assets/images/portfolio/nistpoints.png)
<div class="caption">Some NIST curves that I've programmed into the algorithm. They are a set of curves from the FIPS 186-3 standard that are recommended for US federal government use. They were chosen by repeatedly selecting a random seed, and then checking the resulting curve against known attacks.
</div>


<br>

![](/assets/images/portfolio/mainframeoverview.png)
![](/assets/images/portfolio/mainframeKeyGen.png)
![](/assets/images/portfolio/mainframe1.png)
![](/assets/images/portfolio/mainframe2.png)
![](/assets/images/portfolio/mainframedecrypted.png)
<div class="caption">I developed a mainframe that allows the user to input paramters for the ECC (or choose from built in curves). The program generates private and public keys, which can be saved. For example, I encrypted and decrypted a txt file which contained "Hello I love linux, wink wink wink."</div>

<br>

```java
public class PublicKey {
    private EllipticCurve c;
    private ECPoint P_K;

    public PublicKey(EllipticCurve c, ECPoint P_K) {
        this.c = c;
        this.P_K = P_K;
    }
   
    public PublicKey(String pathFile){
        try {
            List<String> lines = Files.readAllLines(Paths.get(pathFile), StandardCharsets.UTF_8);
            BigInteger a = new BigInteger(lines.get(0),16);
            BigInteger b = new BigInteger(lines.get(1),16);
            BigInteger p = new BigInteger(lines.get(2),16);
            BigInteger g1 = new BigInteger(lines.get(3),16);
            BigInteger g2 = new BigInteger(lines.get(4),16);
            BigInteger p_k1 = new BigInteger(lines.get(5),16);
            BigInteger p_k2 = new BigInteger(lines.get(6),16);
            EllipticCurve eC = new EllipticCurve(a, b, p, new ECPoint(g1,g2));
            ECPoint eCP = new ECPoint(p_k1,p_k2);
            this.c = eC;
            this.P_K = eCP;
        } catch (Exception e){
            
        } 
    }
    
    public EllipticCurve getCurve() {
        return c;
    }
    
    public void setCurve(EllipticCurve c) {
        this.c = c;
    }

    public ECPoint getKey() {
        return P_K;
    }

    public void setKey(ECPoint P_K) {
        this.P_K = P_K;
    }
    
    public ECPoint getBasePoint() {
        return c.getBasePoint();
    }
    
    /**
     * Save the current key to a *.pub file represents Microsoft Publisher document file format */
    public void saveToFile(String path) {
        
        BigInteger a = c.getA();
        BigInteger b = c.getB();
        BigInteger p = c.getP();
        BigInteger g1 = c.getBasePoint().x;
        BigInteger g2 = c.getBasePoint().y;
        BigInteger p_k1 = P_K.x;
        BigInteger p_k2 = P_K.y;
        try {
            PrintStream ps = new PrintStream(new File(path));
            ps.println(a.toString(16));
            ps.println(b.toString(16));
            ps.println(p.toString(16));
            ps.println(g1.toString(16));
            ps.println(g2.toString(16));
            ps.println(p_k1.toString(16));
            ps.println(p_k2.toString(16));
            ps.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
```
<div class="caption">The public key for El Gamal Elliptic Curve Cryptography. The key consists of: c, the elliptic curve used in the calculations, P_K, the point obtained from k * G, where k is the corresponding private key, and G is the base point of c.</div>

<br>

```java
public class PrivateKey {
    private EllipticCurve c;
    private BigInteger k;
    
    public PrivateKey(EllipticCurve c, BigInteger k) {
        this.c = c;
        this.k = k;
    }
    
    public PrivateKey(String pathFile){
        try {
            List<String> lines = Files.readAllLines(Paths.get(pathFile), StandardCharsets.UTF_8);
            BigInteger a = new BigInteger(lines.get(0),16);
            BigInteger b = new BigInteger(lines.get(1),16);
            BigInteger p = new BigInteger(lines.get(2),16);
            BigInteger g1 = new BigInteger(lines.get(3),16);
            BigInteger g2 = new BigInteger(lines.get(4),16);
            BigInteger k = new BigInteger(lines.get(5),16);
            EllipticCurve eC = new EllipticCurve(a, b, p, new ECPoint(g1,g2));
            this.c = eC;
            this.k = k;
        } catch (Exception e){
            
        }
    }
    
    public void setCurve(EllipticCurve c) {
        this.c = c;
    }
    
    public EllipticCurve getCurve() {
        return c;
    }
    
    public void setKey(BigInteger k) {
        this.k = k;
    }
    
    public BigInteger getKey() {
        return k;
    }
    
    public ECPoint getBasePoint() {
        return c.getBasePoint();
    }
    
    /**
     * Save the current key to a *.pri file - basically contains a binary index of all resources
     *  in a Windows application, stores localized resources
     * figured that VSCOde can interpret it well - you do not need to access this because
     *  the output is to the screen anyway - it was helpful for decrypting stuff!
     */
    public void saveToFile(String path) {
        BigInteger a = c.getA();
        BigInteger b = c.getB();
        BigInteger p = c.getP();
        BigInteger g1 = c.getBasePoint().x;
        BigInteger g2 = c.getBasePoint().y;
        BigInteger k = this.k;
        try {
            PrintStream ps = new PrintStream(new File(path));
            ps.println(a.toString(16));
            ps.println(b.toString(16));
            ps.println(p.toString(16));
            ps.println(g1.toString(16));
            ps.println(g2.toString(16));
            ps.println(k.toString(16));
            ps.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
```
<div class="caption"> The private key of the El Gamal Elliptic Curve Cryptography. The key consists of: c, the elliptic curve used in the calculations, k is the private key, a randomly-generated integer, satisfying 1 <= k < p-1.</div>

<br>

![](/assets/images/portfolio/publicKey.png)
![](/assets/images/portfolio/privateKey.png)
![](/assets/images/portfolio/encrypted.png)
![](/assets/images/portfolio/decrypted.png)
<div class="caption">The generated public and private keys and the encrypted/decrypted messages.</div>
