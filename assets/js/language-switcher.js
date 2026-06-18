// Language switcher for al-folio theme
// Injects a language toggle button into the navbar

(function() {
  'use strict';

  function injectButton() {
    // Find the toggle-container li (contains theme toggle button)
    var toggleContainer = document.querySelector('.toggle-container');
    if (!toggleContainer) {
      // Try again after a short delay
      setTimeout(injectButton, 200);
      return;
    }

    // Check if button already exists
    if (document.getElementById('lang-toggle-li')) {
      return;
    }

    // Determine current language
    var path = window.location.pathname;
    var isChinese = path.includes('/about-zh/') || path.includes('/zh/');

    // Create new li element
    var li = document.createElement('li');
    li.id = 'lang-toggle-li';
    li.className = 'nav-item';

    // Create button
    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.type = 'button';
    btn.title = isChinese ? 'Switch to English' : '切换到中文';
    btn.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换到中文');
    btn.style.cssText = 'background:none; border:none; cursor:pointer; padding:8px 12px; font-size:14px; color:inherit;';
    btn.innerHTML = isChinese ? '🇺🇸 EN' : '🇨🇳 中文';

    // Click handler
    btn.addEventListener('click', function() {
      var currentPath = window.location.pathname;

      if (currentPath.includes('/about-zh/')) {
        // Currently on Chinese About, switch to English
        window.location.href = '/about/';
      } else if (currentPath.includes('/about/')) {
        // Currently on English About, switch to Chinese
        window.location.href = '/about-zh/';
      } else if (currentPath.includes('/zh/')) {
        // On other Chinese pages, switch to English
        window.location.href = currentPath.replace('/zh/', '/');
      } else {
        // On English pages, switch to Chinese
        window.location.href = '/zh' + (currentPath === '/' ? '/' : currentPath);
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
