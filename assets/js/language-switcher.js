// Language switcher — single floating button
// URL mapping: English / <-> Chinese /about-zh/
(function () {
  'use strict';

  var PATH = window.location.pathname;

  // Determine current language and compute target URL
  function getState() {
    // Chinese page
    if (PATH === '/about-zh/' || PATH.indexOf('/about-zh') === 0) {
      return { lang: 'zh', target: '/', label: '\uD83C\uDDFA\uD83C\uDDF8 EN', title: 'Switch to English' };
    }
    // English page (including homepage /)
    return { lang: 'en', target: '/about-zh/', label: '\uD83C\uDDE8\uD83C\uDDF3 \u4E2D\u6587', title: '\u5207\u6362\u4E3A\u4E2D\u6587' };
  }

  var state = getState();

  // Create ONE button
  var btn = document.createElement('a');
  btn.id = 'lang-switcher-btn';
  btn.href = state.target;
  btn.textContent = state.label;
  btn.title = state.title;
  btn.style.cssText =
    'position:fixed;top:70px;right:24px;z-index:99999;' +
    'background:#ffffff;color:#333333;padding:8px 18px;' +
    'border-radius:20px;box-shadow:0 2px 12px rgba(0,0,0,0.18);' +
    'cursor:pointer;font-size:14px;font-weight:600;' +
    'text-decoration:none;border:1px solid #d0d7de;' +
    'transition:transform 0.2s,box-shadow 0.2s;' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
    'user-select:none;display:inline-block;line-height:1.6;';

  btn.addEventListener('mouseenter', function () {
    btn.style.transform = 'translateY(-1px)';
    btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
  });
  btn.addEventListener('mouseleave', function () {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
  });

  // Prevent duplicate buttons (guard against double injection)
  function appendOnce() {
    if (document.getElementById('lang-switcher-btn')) return;
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendOnce);
  } else {
    appendOnce();
  }
})();
