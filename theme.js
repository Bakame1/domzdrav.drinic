// Theme toggle — persists choice in localStorage
(function () {
  const STORAGE_KEY = 'theme';

  // Apply saved theme immediately (before paint) to avoid flash
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function isDark() {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'dark') return true;
      if (attr === 'light') return false;
      // No explicit theme → follow system
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function updateIcon() {
      // Show moon when light (click → dark), sun when dark (click → light)
      btn.textContent = isDark() ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateIcon();

    btn.addEventListener('click', function () {
      const next = isDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      updateIcon();
    });
  });
})();
