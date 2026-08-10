// Subtle fade-in on scroll — does NOT affect scroll behavior at all.
// Elements with class "fade-in" start invisible and appear smoothly
// as they enter the viewport. Completely non-blocking.
//
// Apple Design §1 + §14: dynamic stagger delay, respects prefers-reduced-motion.

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    // Apple Design §14: if user prefers reduced motion, show everything instantly
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    // If IntersectionObserver is not supported, show everything immediately
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    // Apple Design §4: dynamic stagger — each consecutive child gets 80ms more delay
    var staggerMs = 80;
    var groups = {};

    targets.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var parentId = parent.getAttribute('data-stagger-group') || parent.tagName + '_' + Array.prototype.indexOf.call(parent.parentElement ? parent.parentElement.children : [], parent);
      if (!groups[parentId]) groups[parentId] = 0;
      el.style.transitionDelay = (groups[parentId] * staggerMs) + 'ms';
      groups[parentId]++;
    });

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
        threshold: 0.1,   // Trigger when 10% visible
        rootMargin: '0px 0px -30px 0px' // Slight offset so it feels natural
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  });
})();
