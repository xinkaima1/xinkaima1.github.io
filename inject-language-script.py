#!/usr/bin/env python3
"""Inject language-switcher.js script tag into all HTML files in _site/"""
import os
import sys
import re

def inject_script():
    site_dir = '_site'
    script_tag = '  <script src="/assets/js/language-switcher.js"></script>\n'
    
    count = 0
    for root, dirs, files in os.walk(site_dir):
        for f in files:
            if f.endswith('.html'):
                path = os.path.join(root, f)
                try:
                    with open(path, 'r', encoding='utf-8') as fp:
                        content = fp.read()
                    
                    # Only inject if not already present
                    if 'language-switcher.js' in content:
                        continue
                    
                    # Try to inject before </body>
                    body_patterns = [r'</body>', r'</body\s*>', r'</BODY>']
                    injected = False
                    
                    for pattern in body_patterns:
                        if re.search(pattern, content):
                            content = re.sub(pattern, script_tag + r'</body>', content, count=1)
                            injected = True
                            break
                    
                    if not injected:
                        # Fallback: append to end of file
                        content += '\n' + script_tag
                    
                    with open(path, 'w', encoding='utf-8') as fp:
                        fp.write(content)
                    
                    count += 1
                    print(f'Injected: {path}')
                except Exception as e:
                    print(f'Error processing {path}: {e}', file=sys.stderr)
    
    print(f'\nTotal files injected: {count}')

if __name__ == '__main__':
    inject_script()
