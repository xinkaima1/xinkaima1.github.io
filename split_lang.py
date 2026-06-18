#!/usr/bin/env python3
"""
Split about.src.md into about.md (EN) and about-zh.md (ZH).
Reads _pages/about.src.md and generates both language versions.

Marker format in about.src.md body:
  [EN] line  → only in about.md
  [ZH] line  → only in about-zh.md
  (no marker) → included in BOTH files

Front matter is hardcoded per-language in this script.
"""

import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(BASE, '_pages', 'about.src.md')
OUT_EN = os.path.join(BASE, '_pages', 'about.md')
OUT_ZH = os.path.join(BASE, '_pages', 'about-zh.md')

# ---- Front matter templates (hardcoded per language) ----
FM_EN = """---
layout: about
title: about
permalink: /
subtitle: <a href='https://www.jlu.edu.cn/'>Jilin University</a>. Changchun, China.

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>College of Biological and Agricultural Engineering</p>
    <p>Jilin University</p>
    <p>Changchun, Jilin, China</p>

selected_papers: false
social: true
announcements:
  enabled: true
  scrollable: true
  limit: 5
latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

"""

FM_ZH = """---
layout: about
title: 关于我
permalink: /about-zh/
subtitle: <a href='https://www.jlu.edu.cn/'>吉林大学</a>. 长春, 中国.

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>生物与农业工程学院</p>
    <p>吉林大学</p>
    <p>中国, 吉林, 长春</p>

selected_papers: false
social: true
announcements:
  enabled: true
  scrollable: true
  limit: 5
latest_posts:
  enabled: false
  scrollable: true
  limit: 3
---

"""

def split_body(src_path):
    """Read src, return (en_lines, zh_lines)."""
    with open(src_path, 'r', encoding='utf-8') as f:
        # Skip front matter (first --- to second ---)
        text = f.read()
    match = re.match(r'^---\n.*?\n---\n(.*)$', text, re.DOTALL)
    if match:
        body = match.group(1)
    else:
        body = text

    en_lines = []
    zh_lines = []
    for line in body.split('\n'):
        stripped = line.lstrip()
        if stripped.startswith('[EN]'):
            en_lines.append(line.replace('[EN]', '', 1))
        elif stripped.startswith('[ZH]'):
            zh_lines.append(line.replace('[ZH]', '', 1))
        else:
            # No marker → include in both
            en_lines.append(line)
            zh_lines.append(line)
    return en_lines, zh_lines

def write_output(path, front_matter, body_lines):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(front_matter)
        f.write('\n'.join(body_lines).strip())
        f.write('\n')
    print(f'  ✓ {os.path.relpath(path, BASE)}')

en_lines, zh_lines = split_body(SRC)
write_output(OUT_EN, FM_EN, en_lines)
write_output(OUT_ZH, FM_ZH, zh_lines)
print('Done.')
