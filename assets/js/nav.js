(function () {
  var links = document.querySelectorAll('.nav a[data-section]');
  var sections = ['experience', 'projects']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!links.length || !sections.length) return;
  var current;
  function update() {
    var line = window.innerHeight * 0.35;
    var active = 'top';
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) active = s.id;
    });
    if (active === current) return;
    current = active;
    links.forEach(function (a) {
      if (a.dataset.section === active) a.setAttribute('aria-current', active === 'top' ? 'page' : 'location');
      else a.removeAttribute('aria-current');
    });
  }
  var queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
