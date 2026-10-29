// Map consent — loads Google Maps iframe only after user clicks
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('load-map');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-src');
      if (!src) return;

      var wrap = btn.closest('.map-wrap');
      if (!wrap) return;

      // Remove consent UI
      var consent = wrap.querySelector('.map-consent');
      if (consent) consent.remove();

      // Create iframe
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = 'Google Maps — Dom zdravlja Drinić';
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);
    });
  });
})();

