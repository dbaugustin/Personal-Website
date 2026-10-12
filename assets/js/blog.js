(function () {
  var chips = document.querySelectorAll('.chip');
  var items = document.querySelectorAll('.post-list.full li');
  var empty = document.querySelector('.empty');
  function apply(tag) {
    var shown = 0;
    items.forEach(function (li) {
      var on = !tag || (' ' + li.dataset.tags + ' ').indexOf(' ' + tag + ' ') > -1;
      li.hidden = !on;
      if (on) shown++;
    });
    document.querySelectorAll('.post-list.full').forEach(function (ul) {
      var visible = ul.querySelectorAll('li:not([hidden])').length;
      ul.hidden = !visible;
      ul.previousElementSibling.hidden = !visible;
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.tag === tag ? 'true' : 'false'); });
    if (empty) empty.hidden = shown > 0;
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.dataset.tag); }); });
  var m = location.search.match(/[?&]tag=([^&]+)/);
  if (m) apply(decodeURIComponent(m[1]));
})();
