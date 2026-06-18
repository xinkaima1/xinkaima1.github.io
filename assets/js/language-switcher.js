// Language switcher for al-folio theme
// Injects a language toggle button into the navbar or as floating button

(function() {
  'use strict';

  function injectButton() {
    // Try to find the navbar first
    var navbar = document.querySelector('#navbar') || document.querySelector('.navbar');
    if (!navbar) {
      // Navbar not found, create floating button
      createFloatingButton();
      return;
    }

    // Find the toggle-container li (contains theme toggle button)
    var toggleContainer = navbar.querySelector('.toggle-container') || 
                          navbar.querySelector('[id*="toggle"]') ||
                          navbar.querySelector('.nav-item:last-child');
    
    if (!toggleContainer) {
      // Toggle container not found, try to find the theme toggle button
      var themeToggle = navbar.querySelector('#light-toggle') || 
                           navbar.querySelector('[id*="theme"]');
      if (themeToggle) {
        toggleContainer = themeToggle.closest('li') || themeToggle.parentNode;
      }
    }

    // Determine current language
    var path = window.location.pathname;
    var isChinese = path.includes('/about-zh/') || path.includes('/zh/');

    // Create button element
    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.type = 'button';
    btn.title = isChinese ? 'Switch to English' : '切换到中文';
    btn.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换到中文');
    btn.style.cssText = 'background:none; border:1px solid #ddd; border-radius:4px; cursor:pointer; padding:6px 10px; font-size:13px; color:inherit; margin-left:8px;';
    btn.innerHTML = isChinese ? '🇺🇸 EN' : '🇨🇳 中文';

    // Click handler
    btn.addEventListener('click', function() {
      var currentPath = window.location.pathname;

      if (currentPath.includes('/about-zh/')) {
        window.location.href = '/about/';
      } else if (currentPath.includes('/about/')) {
        window.location.href = '/about-zh/';
      } else if (currentPath.includes('/zh/')) {
        window.location.href = currentPath.replace('/zh/', '/');
      } else {
        window.location.href = '/zh' + (currentPath === '/' ? '/' : currentPath);
      }
    });

    // Try to insert into navbar
    if (toggleContainer && toggleContainer.parentNode) {
      // Insert before toggle-container
      toggleContainer.parentNode.insertBefore(btn, toggleContainer);
      console.log('Language switcher: injected into navbar');
    } else {
      // Fallback: append to navbar
      var navbarNav = navbar.querySelector('.navbar-nav') || navbar;
      if (navbarNav) {
        navbarNav.appendChild(btn);
        console.log('Language switcher: appended to navbar');
      } else {
        // Final fallback: create floating button
        createFloatingButton();
      }
    }
  }

  function createFloatingButton() {
    // Check if button already exists
    if (document.getElementById('lang-float-btn')) {
      return;
    }

    var path = window.location.pathname;
    var isChinese = path.includes('/about-zh/') || path.includes('/zh/');

    var btn = document.createElement('div');
    btn.id = 'lang-float-btn';
    btn.innerHTML = isChinese ? '🇺🇸 EN' : '🇨🇳 中文';
    btn.style.cssText = 'position:fixed;top:15px;right:80px;z-index:9999;background:#fff;color:#333;padding:8px 15px;border-radius:20px;box-shadow:0 2px 10px rgba(0,0,0,0.15);cursor:pointer;font-size:14px;font-weight:500;';
    
    btn.onclick = function() {
      var currentPath = window.location.pathname;
      if (currentPath.includes('/about-zh/')) {
        window.location.href = '/about/';
      } else if (currentPath.includes('/about/')) {
        window.location.href = '/about-zh/';
      } else if (currentPath.includes('/zh/')) {
        window.location.href = currentPath.replace('/zh/', '/');
      } else {
        window.location.href = '/zh' + (currentPath === '/' ? '/' : currentPath);
      }
    };

    document.body.appendChild(btn);
    console.log('Language switcher: created floating button');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(injectButton, 500);
    });
  } else {
    setTimeout(injectButton, 500);
  }
})();
