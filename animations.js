// Subtle fade-in on scroll — does NOT affect scroll behavior at all.
// Elements with class "fade-in" start invisible and appear smoothly
// as they enter the viewport. Completely non-blocking.

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    // If IntersectionObserver is not supported, show everything immediately
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      {
        threshold: 0.12,   // Trigger when 12% visible
        rootMargin: '0px 0px -40px 0px' // Slight offset so it feels natural
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  });
})();
