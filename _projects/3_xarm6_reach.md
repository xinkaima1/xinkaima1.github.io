---
layout: page
title: xArm6 Reaching Simulation
description: Course project · PyBullet IK + trajectory tracking
img:
importance: 3
category: work
related_publications: false
---

## xArm6 Strawberry-Reaching Simulation

The positioning-accuracy verification part of an undergraduate course design on a bionic strawberry-picking manipulator, built with **PyBullet** under WSL2. It comes from my agricultural-engineering background.

- 6-DOF xArm6 URDF, position-only inverse kinematics, trapezoidal trajectory planning + position servo
- **5 / 5** target points converged; tracking error **0.29–0.88 mm** (5 mm threshold)
- **Scope**: pure simulation — no end-effector model, no grasping, contact or force control. The animated pick-and-place loop is a visual demo only.
- Includes CSV results, a demo video / GIF, key-frame figures and a full experiment guide

[Source code and results →](https://github.com/xinkaima1/xarm6-reach-lab)
