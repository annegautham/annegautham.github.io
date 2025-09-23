---
title: Introduction
author: Gautham Anne
order: 1
pubDatetime: 2025-07-01T12:00:00Z
description: Adapted from Northwestern's EE475 (Machine Learning - Foundations, Algorithms, and Applications)
tags:
  - ML
---

## Table of Contents

# What is Machine Learning (ML)

## Distinctions

- **Artificial Intelligence (AI):**  
  The theory and development of computer systems that can perform tasks normally requiring human intelligence, such as visual perception, speech recognition, and decision-making.

- **Machine Learning (ML):**  
  An application of AI that provides systems with the ability to _automatically_ learn tasks and improve from experience without explicit programming. ML focuses on developing architectures that can process data in new ways and learn for themselves.

- **Deep Learning (DL):**  
  A subset of ML that uses hierarchical layers of artificial neural networks to carry out learning.

A machine learning algorithm is said to _learn_ from data if it improves its performance on a task with experience:

> _“A computer program is said to learn from experience $E$, with respect to some class of tasks $T$ and performance measure $P$, if its performance at tasks in $T$, as measured by $P$, improves with experience $E$.”_ (Mitchell, 1997)

- Philosophically: understanding ML means probing the principles that underlie intelligence.
- ML tasks are usually described in terms of how ML systems should process examples.

## Common ML Tasks

- **Classification:**  
  $f: \mathbb{R}^n \to \{1, \dots, k\}$

- **Classification with missing inputs:**  
  Either learn all possible mappings or the joint distribution of all inputs, which can then be marginalized over missing inputs.

- **Regression:**  
  $f: \mathbb{R}^n \to \mathbb{R}$

- **Other tasks:**
  - Transcription
  - Structured outputs
  - Anomaly detection (e.g., fraud detection: profile of user is built and monitored)
  - Synthesis and sampling (e.g., text-to-speech, procedural texture generation in video games)
  - Imputation of missing values
  - Denoising
  - Density or probability mass function estimation

## Performance Measures

Performance is task-specific. For **classification**, common metrics include:

- **Accuracy / Precision:**  
  $\dfrac{TP}{TP+FP}$

- **Recall / Sensitivity:**  
  $\dfrac{TP}{TP+FN}$

- **Specificity:**  
  $\dfrac{TN}{TN+FP}$

- **Error rate / similarity** measures.

## Types of Learning

- **Supervised learning:** labeled outputs exist.
- **Unsupervised learning:** no labels, discover hidden structure.
- **Semi-supervised learning:** some labeled, some unlabeled data.
- **Weakly supervised learning:** coarse-grained labels.
- **Self-supervised learning:** labels generated automatically from pretext tasks, often used in transfer learning.

---

## General Workflow of Training an Algorithm

1. Collect data
2. Design features
3. Train the model
4. Test the model (on unseen data)

## Common Applications

- **Targeted advertising** (recommend ads based on user data)
- **Recommender systems** (matrix completion, rank minimization)
- **Object detection and recognition** (driver-assist and self-driving cars)
- **Other examples:**
  - Inpainting / imputation of missing values
  - Image super-resolution
  - Robust face recognition
