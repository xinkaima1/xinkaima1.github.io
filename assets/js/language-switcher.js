/**
 * Language Switcher - Floating Button
 * Adds a floating language switcher button to the page
 */
(function () {
  'use strict';

  // Only run on pages that have English/Chinese versions
  const pageMap = {
    '/': '/about-zh/',
    '/about/': '/about-zh/',
    '/about-zh/': '/',
  };

  function getCurrentLang() {
    const path = window.location.pathname;
    if (path.includes('-zh/') || path.includes('/zh/')) return 'zh';
    return 'en';
  }

  function createFloatingButton() {
    // Check if button already exists
    if (document.getElementById('lang-float-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'lang-float-btn';
    btn.innerHTML = getCurrentLang() === 'en' ? '🇨🇳 中文' : '🇬🇧 EN';
    btn.title = getCurrentLang() === 'en' ? 'Switch to Chinese' : '切换到英文';
    btn.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 9999;
      padding: 10px 16px;
      background: var(--global-theme-color, #2c3e50);
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.3s;
    `;

    btn.onmouseover = function () {
      this.style.transform = 'scale(1.05)';
    };
    btn.onmouseout = function () {
      this.style.transform = 'scale(1)';
    };

    btn.onclick = function () {
      const target = pageMap[window.location.pathname] || '/about-zh/';
      window.location.href = target;
    };

    document.body.appendChild(btn);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingButton);
  } else {
    createFloatingButton();
  }
})();
