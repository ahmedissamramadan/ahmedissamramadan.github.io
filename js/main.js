/* ==========================================================================
   CORE SITE SCRIPT & BEHAVIORS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Responsive Menu
  initMobileMenu();

  // 2. Theme Toggle & prefers-color-scheme Management
  initTheme();
});

/**
 * Mobile responsive menu logic
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('open');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

/**
 * Color Theme Toggle & Sync (Dark Theme Default)
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

  if (!metaColorScheme) return;

  // Set default theme from localStorage or default to dark
  let currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // React to system prefers-color-scheme changes if no pinned preference exists
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    metaColorScheme.content = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      // Visual toggles inside button icon
      const darkIcon = themeToggle.querySelector('.theme-icon-dark');
      const lightIcon = themeToggle.querySelector('.theme-icon-light');
      if (darkIcon && lightIcon) {
        if (theme === 'dark') {
          darkIcon.style.display = 'none';
          lightIcon.style.display = 'block';
        } else {
          darkIcon.style.display = 'block';
          lightIcon.style.display = 'none';
        }
      }
    }
  }
}


