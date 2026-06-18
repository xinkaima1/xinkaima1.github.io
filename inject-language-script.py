#!/usr/bin/env python3
"""Inject language-switcher.js script tag into all HTML files in _site/"""
import os
import sys

def inject_script():
    site_dir = '_site'
    script_tag = '  <script src="/assets/js/language-switcher.js"></script>\n'
    target_tag = '</body>'
    
    count = 0
    for root, dirs, files in os.walk(site_dir):
        for f in files:
            if f.endswith('.html'):
                path = os.path.join(root, f)
                try:
                    with open(path, 'r', encoding='utf-8') as fp:
                        content = fp.read()
                    
                    # Only inject if not already present
                    if script_tag.strip() not in content and target_tag in content:
                        content = content.replace(target_tag, script_tag + target_tag, 1)
                        with open(path, 'w', encoding='utf-8') as fp:
                            fp.write(content)
                        count += 1
                        print(f'Injected: {path}')
                except Exception as e:
                    print(f'Error processing {path}: {e}', file=sys.stderr)
    
    print(f'\nTotal files injected: {count}')

if __name__ == '__main__':
    inject_script()
