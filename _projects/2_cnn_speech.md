---
layout: page
title: CNN Speech Emotion Recognition
description: Course project · log-Mel + PyTorch CNN on RAVDESS
img:
importance: 2
category: work
related_publications: false
---

## CNN Speech Emotion Recognition

A course project that treats log-Mel spectrograms as images and classifies **8 emotions** on the **RAVDESS** speech subset (1,440 clips) with a LeNet-style CNN in PyTorch. It was my first hands-on project in audio understanding.

- **Pipeline**: 48 kHz → 16 kHz resampling, 64-band log-Mel spectrogram (128 frames) → 3 × (Conv + ReLU + MaxPool) + 2 fully connected layers
- **Result**: **63.54%** test accuracy (183 / 288), 5.1× the 12.5% random baseline
- **Engineering note**: `MelSpectrogram(sample_rate=...)` only sets the frequency scale — it does not resample the waveform. Fixing the missing resampling raised test accuracy from 46.2% to 63.5%.
- Includes a full experiment report and line-by-line Chinese walkthroughs of the source code

[Source code and report →](https://github.com/xinkaima1/cnn-speech)
