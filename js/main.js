/* ==========================================================================
   CORE SITE SCRIPT & BEHAVIORS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language Swapping & Persistence
  initLanguage();

  // 2. Mobile Responsive Menu
  initMobileMenu();

  // 3. Theme Toggle & prefers-color-scheme Management
  initTheme();
});

/**
 * Initialize Language Settings (Arabic-first default)
 */
function initLanguage() {
  const toggleButtons = document.querySelectorAll('.lang-toggle-btn');
  const htmlEl = document.documentElement;

  // Read saved preference or default to Arabic ('ar')
  let currentLang = localStorage.getItem('lang') || 'ar';
  applyLanguage(currentLang);

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(currentLang);
    });
  });

  function applyLanguage(lang) {
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);

    // Update active class on toggle buttons
    toggleButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-target');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update HTML input placeholders dynamically
    document.querySelectorAll('[data-placeholder-ar]').forEach(input => {
      const arPlaceholder = input.getAttribute('data-placeholder-ar');
      const enPlaceholder = input.getAttribute('data-placeholder-en');
      input.placeholder = lang === 'ar' ? arPlaceholder : enPlaceholder;
    });

    // Dispatch custom event for layout adjustments if needed
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }
}

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


