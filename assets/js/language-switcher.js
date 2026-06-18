// Language switcher for al-folio
// Injects a language toggle button next to the theme toggle button

(function() {
  'use strict';

  function injectButton() {
    // Find the toggle-container li (contains theme toggle)
    var toggleContainer = document.querySelector('.toggle-container');
    if (!toggleContainer) {
      // Try again later
      setTimeout(injectButton, 200);
      return;
    }

    // Check if button already exists
    if (document.getElementById('lang-toggle-li')) {
      return;
    }

    // Create new li element
    var li = document.createElement('li');
    li.id = 'lang-toggle-li';
    li.className = 'nav-item';

    // Create button
    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.type = 'button';
    btn.title = 'Switch language';
    btn.style.cssText = 'background:none; border:none; cursor:pointer; padding:8px 12px; font-size:14px;';
    btn.innerHTML = '🇨🇳 中';

    // Click handler
    btn.addEventListener('click', function() {
      var path = window.location.pathname;
      if (path.includes('/about-zh/')) {
        window.location.href = '/about/';
      } else if (path.includes('/about/')) {
        window.location.href = '/about-zh/';
      } else if (path.includes('/zh/')) {
        window.location.href = path.replace('/zh/', '/');
      } else {
        window.location.href = '/zh' + (path === '/' ? '/' : path);
      }
    });

    li.appendChild(btn);

    // Insert before toggle-container
    toggleContainer.parentNode.insertBefore(li, toggleContainer);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
